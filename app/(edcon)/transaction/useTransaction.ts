import { getConferenceActivityData } from "@/api/activity";
import { getNFTExclusive } from "@/api/nft";
import { postEncryption, postExecuteTransaction } from "@/api/poc";
import { enum_web3_reward_type } from "@/enum/web3";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";

import type { POC } from "@/api/poc/typing";
type LocalSearchParams = {
	data: string;
	type: enum_web3_reward_type;
};

export function useTransaction() {
	const { data: hash_key } = useLocalSearchParams<LocalSearchParams>();
	const [qrCodeData, setQrCodeData] = useState<POC.Decrypt.PostRes["decryptedMessage"]>();

	const { data: exclusiveData, isSuccess: exclusiveIsSuccess } = useQuery({
		queryKey: ["getNFTExclusive", hash_key],
		queryFn: async () => await getNFTExclusive({ hash_key: hash_key }),
		enabled: Boolean(hash_key)
	});

	/** 获取hash存储的数据 */
	const { data: conferenceActivityData, isSuccess } = useQuery({
		queryKey: ["getConferenceActivityData", hash_key],
		queryFn: async () => {
			return await getConferenceActivityData({ key: hash_key, type: 1 });
		},
		enabled: Boolean(hash_key)
	});

	const encryptionMutation = useMutation({
		mutationKey: ["postEncryption"],
		mutationFn: async (params: POC.Decrypt.PostParams) => await postEncryption(params),
		onSuccess: ({ data }) => {
			if (data?.decryptedMessage) {
				setQrCodeData(data?.decryptedMessage);
			}
		}
	});

	const executeTransactionMutation = useMutation({
		mutationKey: ["postExecuteTransaction"],
		mutationFn: async (params: POC.ExecuteTransaction.PostParams) => await postExecuteTransaction(params),
		onSuccess: ({ code, data }) => {
			if (code === 200) {
				router.replace({
					pathname: "/(edcon)/transaction/completion",
					params: {
						result: JSON.stringify(qrCodeData),
						origin: "claimed",
						token_id: data.token_id
					}
				});
			}
		}
	});

	const onExecuteTransaction = useCallback(() => {
		if (qrCodeData && exclusiveData?.data) {
			if (exclusiveData?.data?.had_received !== 1) {
				const txParams = {
					...qrCodeData,
					hash_key: hash_key,
					recipientAddress: "My Address"
				};
				console.log("txParams", JSON.stringify(txParams));
				executeTransactionMutation.mutate(txParams);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [exclusiveData?.data, qrCodeData]);

	useEffect(() => {
		if (isSuccess && conferenceActivityData?.data) {
			encryptionMutation.mutate({ action: "decrypt", message: conferenceActivityData?.data });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess]);

	useEffect(() => {
		if (qrCodeData && exclusiveIsSuccess) {
			onExecuteTransaction();
		}
	}, [onExecuteTransaction, qrCodeData, exclusiveIsSuccess]);

	useEffect(() => {
		if (!hash_key) {
			return router.replace("/(edcon)/transaction/completion");
		}
	}, [hash_key]);

	return {
		onExecuteTransaction
	};
}
