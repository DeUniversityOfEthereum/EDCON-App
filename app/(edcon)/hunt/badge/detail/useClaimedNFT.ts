import { getAlchemyNftDetail } from "@/api/alchemy";
import { getIykRefsDetail, postIykEventsMintSelf, postIykPhygitalsTransferPullable } from "@/api/iyk";
import { enum_web3_iyk_nft_type } from "@/enum/web3";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import type { IYK } from "@/api/iyk/typing";
type LocalSearchParams = {
	iykRef: string;
	contractAddress: string;
	tokenId: string;
	chainId: string;
	collectionName?: string;
	type: enum_web3_iyk_nft_type;
};

export const useClaimedNFT = () => {
	const { iykRef, contractAddress, tokenId, chainId, collectionName, type } = useLocalSearchParams<LocalSearchParams>();
	const [nftType, setNftType] = useState<enum_web3_iyk_nft_type>();
	const [tokenInfo, setTokenInfo] = useState<IYK.Refs.tokensDetail>();
	const [isClaimed, setClaimed] = useState(false);
	const [isClaimedPhygitals, setClaimedPhygitals] = useState(false);
	const [submitLoading, setSubmitLoading] = useState(false);
	const [submitDisabled, setSubmitDisabled] = useState(true);
	const [websiteUrl, setWebsiteUrl] = useState({
		basescan: "https://basescan.org",
		opensea: "https://opensea.io"
	});

	const queryClient = useQueryClient();
	const onInvalidateQueries = () => {
		const invalidKey = ["getAlchemyNftDetail", "getAlchemyNFTsForOwner", "getAlchemyOwnersForNFT"];
		queryClient.invalidateQueries({
			predicate: query => {
				return query.queryKey.some(it => invalidKey.includes(it as string));
			}
		});
	};

	const { data: iykData, isFetching: isFetchingIYK } = useQuery({
		queryKey: ["getIykRefsDetail", iykRef],
		queryFn: async () => await getIykRefsDetail(iykRef),
		enabled: !!iykRef
	});

	const { data: nftData, isFetching: isFetchingNFT } = useQuery({
		queryKey: ["getAlchemyNftDetail", tokenInfo?.contractAddress, tokenInfo?.tokenId],
		queryFn: async () =>
			await getAlchemyNftDetail("base", {
				contractAddress: tokenInfo?.contractAddress ?? "",
				tokenId: tokenInfo?.tokenId ?? "",
				refreshCache: "true"
			}),
		enabled: Boolean(tokenInfo?.contractAddress && tokenInfo?.tokenId)
	});

	const transfeMutation = useMutation({
		mutationKey: ["postIykPhygitalsTransfer"],
		mutationFn: async ({ otp, ...params }: IYK.Phygitals.PostParams & { otp: string }) =>
			await postIykPhygitalsTransferPullable(otp, params)
	});

	const mintSelfMutation = useMutation({
		mutationKey: ["postIykEventsMintSelf"],
		mutationFn: async ({ otp, ...params }: IYK.Events.PostParams & { otp: string }) =>
			await postIykEventsMintSelf(otp, params)
	});

	const onClaimed = () => {
		if (submitDisabled || submitLoading || transfeMutation.isSuccess || mintSelfMutation.isSuccess) return null;

		const transfeParams = {
			otp: tokenInfo?.otp ?? "",
			recipient: "My Wallet Address" ?? ""
		};
		if (nftType === enum_web3_iyk_nft_type.GuestbookEvents) {
			return mintSelfMutation.mutateAsync(transfeParams).then(res => {
				if (res.txnHash) {
					setClaimed(true);
					onInvalidateQueries();
				}
				return res;
			});
		} else {
			return transfeMutation.mutateAsync(transfeParams).then(res => {
				if (res.initialTxHash) {
					setClaimedPhygitals(true);
					onInvalidateQueries();
				}
				return res;
			});
		}
	};

	useEffect(() => {
		if (contractAddress && tokenId && chainId) {
			setTokenInfo({
				contractAddress,
				tokenId,
				chainId: Number(chainId),
				otp: ""
			});
		}
		setNftType(type);
	}, [chainId, contractAddress, tokenId, type]);

	useEffect(() => {
		if (!iykData) return;
		if (iykData?.guestbookEvents?.length) {
			setTokenInfo(iykData?.guestbookEvents?.[0]);
		} else {
			setTokenInfo(iykData?.linkedToken);
		}
	}, [iykData]);

	useEffect(() => {
		setSubmitLoading(transfeMutation.isPending || mintSelfMutation.isPending);
	}, [mintSelfMutation.isPending, transfeMutation.isPending]);

	useEffect(() => {
		if (!tokenInfo?.otp || isClaimed || isClaimedPhygitals) {
			setSubmitDisabled(true);
		} else {
			setSubmitDisabled(false);
		}
	}, [isClaimed, isClaimedPhygitals, tokenInfo?.otp]);

	useEffect(() => {
		const address = nftData?.contract?.address;
		const NftTokenId = nftData?.tokenId;
		if (address && NftTokenId) {
			setWebsiteUrl({
				basescan: `https://basescan.org/address/${address}`,
				opensea: `https://opensea.io/assets/base/${address}/${NftTokenId}`
			});
		}
	}, [nftData, nftType]);

	const [isLoading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(isFetchingIYK || isFetchingNFT);
	}, [isFetchingIYK, isFetchingNFT]);

	const isClaimedNft =
		nftType === enum_web3_iyk_nft_type.GuestbookEvents
			? isClaimed
			: nftType === enum_web3_iyk_nft_type.Phygitals
				? isClaimedPhygitals
				: false;

	return {
		isLoading,
		isClaimed,
		isClaimedPhygitals,
		isClaimedNft,
		isCanClaim: !submitDisabled,
		tokenInfo,
		nftData,
		nftType,
		websiteUrl,
		collectionName,
		onClaimed
	};
};
