import { getTwitterInfo } from "@/api/auth";
import { Auth } from "@/api/auth/typing";
import { useAuthStore } from "@/lib/store/auth";
import { TWITTER_OAUTH_CLIENTID } from "@env";
import { useMutation } from "@tanstack/react-query";
import { UPressable } from "@u";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { useEffect } from "react";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
	authorizationEndpoint: "https://twitter.com/i/oauth2/authorize",
	tokenEndpoint: "https://twitter.com/i/oauth2/token",
	revocationEndpoint: "https://twitter.com/i/oauth2/revoke"
};

type LinkButtonProps = {
	children: React.ReactNode;
};

export default function LinkButton({ children }: LinkButtonProps) {
	const redirect_uri = "EDCON-APP://";
	const { userInfo, setUserInfo } = useAuthStore();
	const [request, response, promptAsync] = useAuthRequest(
		{
			clientId: TWITTER_OAUTH_CLIENTID,
			redirectUri: makeRedirectUri(),
			scopes: ["tweet.read", "users.read", "offline.access"]
		},
		discovery
	);

	const getTwitterInfoMutation = useMutation({
		mutationFn: async (params: Auth.Twitter.PostParams) => await getTwitterInfo(params),
		onSuccess(res) {
			if (res.code === 200) {
				console.log("getTwitter", res.data);
				const { username } = res.data;
				setUserInfo({ ...userInfo, x_account: username });
			}
		}
	});

	useEffect(() => {
		if (response?.type === "success") {
			const { code } = response.params;
			const params = {
				client_id: request?.clientId ?? "",
				code_verifier: request?.codeVerifier ?? "",
				redirect_uri,
				code
			};
			getTwitterInfoMutation.mutate(params);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [response, request]);

	return (
		<UPressable
			disabled={!request}
			onPress={() => {
				promptAsync();
			}}
		>
			{children}
		</UPressable>
	);
}
