import { contractNetwork, getAlchemyNftDetail } from "@/api/alchemy";
import { getChainbaseV1TokenMetadata } from "@/api/chainbase";
import { enum_web3_reward_type } from "@/enum/web3";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

enum enum_activity_scan_type {
	ZkSync = "ZkSync",
	Ace = "Ace"
}

import type { Alchemy } from "@/api/alchemy/typing";
import type { Chainbase } from "@/api/chainbase/typing";
import type { POC } from "@/api/poc/typing";
type LocalSearchParams = {
	result: string;
	activity: enum_activity_scan_type;
	/** 领取成功跳转过来 */
	origin?: "claimed";
	/** erc721/erc1155必须要有 */
	token_id?: string;
};
type PartnersTypeProps = {
	key: enum_activity_scan_type;
	name: string;
	logo: string;
	ratio: number;
};

const partnersTypeMap = new Map<enum_activity_scan_type, PartnersTypeProps>([
	[
		enum_activity_scan_type.Ace,
		{
			key: enum_activity_scan_type.Ace,
			name: "AceTCG",
			logo: require("@/assets/images/partners/Ace.png"),
			ratio: 1
		}
	],
	[
		enum_activity_scan_type.ZkSync,
		{
			key: enum_activity_scan_type.ZkSync,
			name: "Zksync",
			logo: require("@/assets/images/partners/ZkSync.png"),
			ratio: 4 / 1
		}
	]
]);

const isNFTTokenTypes = [enum_web3_reward_type.ERC721, enum_web3_reward_type.ERC1155];
export function useCompletion() {
	const { result, activity, origin, token_id } = useLocalSearchParams<LocalSearchParams>();

	const [rewardName, setRewardName] = useState<string>();
	const [tokenInfo, setTokenInfo] = useState<Chainbase.TokenMetadata.Data>();
	const [nftInfo, setNftInfo] = useState<Alchemy.Metadata.NFTData>();
	const [currentPartnerType, setCurrentPartnerType] = useState<PartnersTypeProps>();
	const isShowSuccess = Boolean(origin);

	const [qrData, setQrData] = useState<POC.Decrypt.PostRes["decryptedMessage"]>();

	const [tokenId, setTokenId] = useState<number>();
	const [websiteUrl, setWebsiteUrl] = useState({
		arbiscan: "",
		zora: ""
	});

	const { data: nftData } = useQuery({
		queryKey: ["getAlchemyNftDetail", qrData?.contractAddress, tokenId],
		queryFn: async () =>
			await getAlchemyNftDetail(contractNetwork.get(String(qrData?.chainId)) ?? "eth", {
				contractAddress: qrData?.contractAddress ?? "",
				tokenId: String(tokenId) ?? "",
				refreshCache: "true"
			}),
		enabled: Boolean(qrData?.contractAddress && tokenId && isNFTTokenTypes?.includes(qrData?.reward))
	});

	const { data: tokenData } = useQuery({
		queryKey: ["getChainbaseV1TokenMetadata", qrData?.contractAddress, qrData?.chainId],
		queryFn: async () => {
			const res = await getChainbaseV1TokenMetadata({
				contract_address: qrData?.contractAddress ?? "",
				chain_id: qrData?.chainId ?? ""
			});
			return res;
		},
		enabled: Boolean(qrData?.contractAddress && qrData?.chainId && qrData?.reward === enum_web3_reward_type.ERC20)
	});

	useEffect(() => {
		if (!result) {
			router.replace("/");
			return;
		} else {
			const resultValue = JSON.parse(`${result}`);
			setQrData(resultValue);
			if (token_id) {
				setTokenId(Number(token_id));
			}
		}
	}, [result, token_id]);

	useEffect(() => {
		setWebsiteUrl({
			arbiscan: `https://arbiscan.io/address/${qrData?.contractAddress}`,
			zora: tokenId ? `https://zora.co/collect/arb:${qrData?.contractAddress}/${tokenId}` : ""
		});
	}, [qrData?.contractAddress, tokenId]);

	useEffect(() => {
		setTokenInfo(tokenData?.data);
		if (qrData?.reward === enum_web3_reward_type.ERC20) {
			const { amount } = qrData.argsValue;
			if (amount) {
				setRewardName(`${amount}`);
			}
		}
	}, [qrData?.argsValue, qrData?.reward, tokenData]);

	useEffect(() => {
		setNftInfo(nftData);
		if (qrData?.reward && isNFTTokenTypes.includes(qrData?.reward) && nftData?.name) {
			setRewardName(`${nftData?.name}`);
		}
	}, [nftData, qrData?.reward]);

	useEffect(() => {
		const currentData = partnersTypeMap?.get(activity);
		setCurrentPartnerType(currentData);
	}, [activity]);

	return {
		nftData,
		tokenInfo,
		nftInfo,
		qrData,
		rewardName,
		websiteUrl,
		currentPartnerType,
		isShowSuccess,
		tokenId
	};
}
