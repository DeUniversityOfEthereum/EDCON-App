import { getAuthUser, getAuthUserWeb3Auth, postAuthLogin } from "@/api/auth";

import { regexp_email } from "@/utils/regexp";
import { WEB3AUTH_CLIENTID, WEB3AUTH_VERIFIER_NAME } from "@env";
import { useAuthStore } from "@store/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { View } from "@themed";
import { UButton, UFormItem, UInput } from "@u";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import Web3Auth from "@web3auth/single-factor-auth-react-native";
import { decode as atob } from "base-64";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Path, Svg } from "react-native-svg";

import type { Auth } from "@/api/auth/typing";
type LoginPrams = Auth.Login.PostParams & {};
type parsedTokenProps = {
	aud: string;
	email: string;
	exp: number;
	iat: number;
	iss: string;
	name: string;
	sub: string;
};
const verifier = WEB3AUTH_VERIFIER_NAME;
const clientId = WEB3AUTH_CLIENTID;

const web3auth = new Web3Auth(SecureStore, {
	clientId,
	web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET
});

const privateKeyProvider = new EthereumPrivateKeyProvider({
	config: {
		/*
		pass the chain config that you want to connect with.
		all chainConfig fields are required.
		*/
		chainConfig: {
			chainNamespace: CHAIN_NAMESPACES.EIP155,
			chainId: "0x1",
			rpcTarget: "https://rpc.ankr.com/eth",
			displayName: "Ethereum Mainnet",
			blockExplorerUrl: "https://etherscan.io",
			ticker: "ETH",
			tickerName: "Ethereum"
		}
	}
});

export default function LoginScreen() {
	const { setToken, setTokenExpiredAt, setUserInfo, setWalletAddress } = useAuthStore();
	const [provider, setProvider] = useState<IProvider | null>(null);
	const [loggedIn, setLoggedIn] = useState<boolean>(false);

	useEffect(() => {
		const init = async () => {
			try {
				// IMP START - SDK Initialization
				await web3auth.init(privateKeyProvider);
				setProvider(web3auth.provider);
				// IMP END - SDK Initialization

				if (web3auth.connected) {
					setLoggedIn(true);
				}
			} catch (error) {
				console.log(error, "mounted caught");
			}
		};
		init();
	}, []);

	const parseToken = (token: string) => {
		try {
			const base64Url = token.split(".")[1];
			const base64 = base64Url.replace("-", "+").replace("_", "/");
			return JSON.parse(atob(base64 || ""));
		} catch (err) {
			console.log(err);
			return null;
		}
	};

	const queryClient = useQueryClient();

	const userInfoMutation = useMutation({
		mutationFn: async () => getAuthUser(),
		onSuccess(data) {
			if (data.data) {
				setUserInfo(data.data);
			}
		}
	});

	const web3AuthQuery = useQuery({
		queryKey: ["getAuthUserWeb3Auth"],
		queryFn: getAuthUserWeb3Auth,
		enabled: false
	});

	const onAfterLogin = (tokenInfo: Auth.Login.PostRes) => {
		setToken(tokenInfo.token);
		setTokenExpiredAt(`${tokenInfo.expired_at}`);
		queryClient.invalidateQueries();
		userInfoMutation.mutate();
		web3AuthQuery.refetch().then(async authData => {
			// Assuming authData.data is the token
			const idToken = authData.data?.data?.token;
			if (!idToken) {
				console.log("No idToken found");
				return;
			}
			const parsedToken: parsedTokenProps = parseToken(idToken);
			const verifierId = parsedToken.email;
			try {
				await web3auth!.connect({
					verifier, // e.g. `web3auth-sfa-verifier` replace with your verifier name, and it has to be on the same network passed in init().
					verifierId, // e.g. `Yux1873xnibdui` or `name@email.com` replace with your verifier id(sub or email)'s value.
					idToken: idToken
				});
				const accounts = (await provider?.request({ method: "eth_accounts" })) as string[];
				if (accounts.length === 0) {
					throw new Error("No accounts found");
				}
				const publicAddress = accounts[0];
				setWalletAddress(publicAddress);
				// The address has been retrieved and stored in the store. You can start processing your business logic from here.
			} catch (error) {
				console.log("connect error: ", error);
			}

			setProvider(web3auth.provider);
		});
		// Use the provider and loggedIn state to show the user that they are logged in and use the provider to interact with the blockchain
		console.log("provider", provider);
		console.log("logged in", loggedIn);
	};

	const loginMutation = useMutation({
		mutationFn: async (params: Auth.Login.PostParams) => await postAuthLogin(params),
		onSuccess(data) {
			if (data.code === 200) {
				onAfterLogin(data.data);
			} else {
				loginMutation.reset();
			}
		}
	});

	const {
		control,
		handleSubmit,
		formState: { errors, isValid }
	} = useForm<LoginPrams>({
		defaultValues: {
			email: "",
			password: ""
		}
	});

	const onSubmit = handleSubmit(data => {
		// if (loginMutation.isSuccess) return;
		if (!isValid) return;
		loginMutation.mutate(data);
	});

	return (
		<View style={style.login}>
			<UFormItem
				required
				name="email"
				control={control}
				errors={errors.email}
				rules={{
					required: "Email is required",
					pattern: {
						value: regexp_email,
						message: "Email is not a valid Email"
					}
				}}
				render={({ field }) => <UInput {...field} placeholder={"Email"} icon={<AccountIcon />} />}
			/>
			<UFormItem
				required
				name="password"
				control={control}
				errors={errors.password}
				rules={{
					required: "Password is required"
				}}
				render={({ field }) => (
					<UInput {...field} placeholder={"Password"} secureTextEntry={true} icon={<PasswordIcon />} />
				)}
			/>

			<UButton color="primary" variant="filled" title={"Login"} onPress={() => onSubmit()} />
		</View>
	);
}

const style = StyleSheet.create({
	login: {
		borderRadius: 24,
		padding: 24
	}
});

function AccountIcon() {
	return (
		<Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12.7965 5.5998C12.7965 8.25077 10.6475 10.3998 7.99653 10.3998C5.34556 10.3998 3.19653 8.25077 3.19653 5.5998C3.19653 2.94884 5.34556 0.799805 7.99653 0.799805C10.6475 0.799805 12.7965 2.94884 12.7965 5.5998ZM11.1965 5.5998C11.1965 7.36712 9.76384 8.79981 7.99653 8.79981C6.22922 8.79981 4.79653 7.36712 4.79653 5.5998C4.79653 3.83249 6.22922 2.3998 7.99653 2.3998C9.76384 2.3998 11.1965 3.83249 11.1965 5.5998Z"
				fill="#CCCCCC"
			/>
			<Path
				d="M3.97787 13.0733C6.63529 12.6109 9.35846 12.6109 12.0159 13.0733C12.0701 13.0827 12.2063 13.1074 12.321 13.1279C12.7709 13.2166 13.1443 13.4807 13.3686 13.8366C13.4388 13.9479 13.5041 14.0641 13.5695 14.1805C13.7582 14.5161 13.948 14.8537 14.2588 15.0829C14.6414 15.365 15.1975 15.1045 15.1969 14.6434L15.1967 14.5664C15.169 13.1398 14.1095 11.9217 12.645 11.6328C12.5334 11.6129 12.3615 11.5816 12.303 11.5714C9.45572 11.0759 6.53804 11.0759 3.6908 11.5714C3.63224 11.5816 3.46031 11.6129 3.34873 11.6328C1.8843 11.9217 0.824801 13.1398 0.797082 14.5664L0.796875 14.6434C0.796278 15.1045 1.35238 15.365 1.73499 15.0829C2.04572 14.8537 2.23553 14.5161 2.42423 14.1805C2.48966 14.0641 2.55497 13.9479 2.62513 13.8366C2.84946 13.4807 3.22288 13.2166 3.67271 13.1279C3.78743 13.1074 3.92366 13.0827 3.97787 13.0733Z"
				fill="#CCCCCC"
			/>
		</Svg>
	);
}

function PasswordIcon() {
	return (
		<Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<Path
				d="M8.0026 8.00016C7.63441 8.00016 7.33594 8.29864 7.33594 8.66683V11.3335C7.33594 11.7017 7.63441 12.0002 8.0026 12.0002C8.3708 12.0002 8.66927 11.7017 8.66927 11.3335V8.66683C8.66927 8.29864 8.3708 8.00016 8.0026 8.00016Z"
				fill="#CCCCCC"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4.0026 5.3335V5.33463C3.22599 5.34002 2.78176 5.37121 2.42796 5.55148C2.05163 5.74323 1.74567 6.04919 1.55392 6.42552C1.33594 6.85334 1.33594 7.41339 1.33594 8.5335V11.4668C1.33594 12.5869 1.33594 13.147 1.55392 13.5748C1.74567 13.9511 2.05163 14.2571 2.42796 14.4488C2.85578 14.6668 3.41583 14.6668 4.53594 14.6668H11.4693C12.5894 14.6668 13.1494 14.6668 13.5773 14.4488C13.9536 14.2571 14.2595 13.9511 14.4513 13.5748C14.6693 13.147 14.6693 12.5869 14.6693 11.4668V8.5335C14.6693 7.41339 14.6693 6.85334 14.4513 6.42552C14.2595 6.04919 13.9536 5.74323 13.5773 5.55148C13.2235 5.37121 12.7792 5.34002 12.0026 5.33463V5.3335C12.0026 3.12436 10.2117 1.3335 8.0026 1.3335C5.79347 1.3335 4.0026 3.12436 4.0026 5.3335ZM10.6693 5.3335C10.6693 3.86074 9.47536 2.66683 8.0026 2.66683C6.52985 2.66683 5.33594 3.86074 5.33594 5.3335H10.6693ZM3.33092 6.68965C3.59753 6.66787 3.95388 6.66683 4.53594 6.66683H11.4693C12.0513 6.66683 12.4077 6.66787 12.6743 6.68965C12.7985 6.6998 12.8736 6.71254 12.9193 6.72329C12.941 6.7284 12.9543 6.73269 12.9616 6.73526C12.9685 6.73774 12.9719 6.73949 12.9719 6.73949C13.0974 6.80341 13.1994 6.9054 13.2633 7.03084C13.2633 7.03084 13.265 7.03428 13.2675 7.04121C13.2701 7.04843 13.2744 7.06179 13.2795 7.0835C13.2902 7.12913 13.303 7.20428 13.3131 7.32848C13.3349 7.59509 13.3359 7.95144 13.3359 8.5335V11.4668C13.3359 12.0489 13.3349 12.4052 13.3131 12.6719C13.303 12.7961 13.2902 12.8712 13.2795 12.9168C13.2744 12.9385 13.2701 12.9519 13.2675 12.9591C13.265 12.966 13.2633 12.9695 13.2633 12.9695C13.1994 13.0949 13.0974 13.1969 12.9719 13.2608L12.9703 13.2616C12.9687 13.2623 12.9659 13.2635 12.9616 13.2651C12.9543 13.2676 12.941 13.2719 12.9193 13.277C12.8736 13.2878 12.7985 13.3005 12.6743 13.3107C12.4077 13.3325 12.0513 13.3335 11.4693 13.3335H4.53594C3.95388 13.3335 3.59753 13.3325 3.33092 13.3107C3.20672 13.3005 3.13157 13.2878 3.08594 13.277C3.06423 13.2719 3.05088 13.2676 3.04366 13.2651C3.03672 13.2626 3.03328 13.2608 3.03328 13.2608C2.90784 13.1969 2.80585 13.0949 2.74193 12.9695C2.74193 12.9695 2.74018 12.966 2.73771 12.9591C2.73513 12.9519 2.73084 12.9385 2.72573 12.9168C2.71498 12.8712 2.70224 12.7961 2.69209 12.6719C2.67031 12.4052 2.66927 12.0489 2.66927 11.4668V8.5335C2.66927 7.95144 2.67031 7.59509 2.69209 7.32848C2.70224 7.20428 2.71498 7.12913 2.72573 7.0835C2.73084 7.06179 2.73513 7.04843 2.73771 7.04121C2.74018 7.03428 2.74193 7.03084 2.74193 7.03084C2.80585 6.9054 2.90784 6.80341 3.03328 6.73949C3.03328 6.73949 3.03672 6.73774 3.04366 6.73526C3.05088 6.73269 3.06423 6.7284 3.08594 6.72329C3.13157 6.71254 3.20672 6.6998 3.33092 6.68965Z"
				fill="#CCCCCC"
			/>
		</Svg>
	);
}
