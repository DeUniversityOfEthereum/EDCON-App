import { getAlchemyNftDetailBatch } from "@/api/alchemy";
import { getIykEvents } from "@/api/iyk";
import { IYK_CONTRACT_ID } from "@env";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import type { Alchemy } from "@/api/alchemy/typing";
import type { IYK } from "@/api/iyk/typing";
export type EvnetProps = IYK.Events.EventData & {
	nft?: Alchemy.Metadata.NFTData;
	collectionStatus: "Collected" | "NotCollected";
};

type TabsProps = {
	label: string;
	value: EvnetProps["collectionStatus"] | "All";
};
export const useEvents = () => {
	const [events, setEvents] = useState<EvnetProps[]>();
	const [showEvents, setShowEvents] = useState<EvnetProps[]>();
	const [total, setTotal] = useState(0);
	const [collectedTotal, setCollectedTotal] = useState(0);
	const [isLoading, setLoading] = useState(true);
	const [isRefreshing, setRefreshing] = useState(false);

	const tabs: TabsProps[] = [
		{
			label: "ALL",
			value: "All"
		},
		{
			label: "Collected",
			value: "Collected"
		},
		{
			label: "AVAILABLE",
			value: "NotCollected"
		}
	];

	const {
		data: eventsData,
		isPending: eventPenging,
		refetch: eventRefetch
	} = useQuery({
		queryKey: ["getIykEvents", IYK_CONTRACT_ID],
		queryFn: async () => await getIykEvents({ contractId: Number(IYK_CONTRACT_ID) })
	});

	const {
		data: nftsData,
		isSuccess,
		refetch: nftRefetch
	} = useQuery({
		queryKey: ["getAlchemyNftDetailBatch", eventsData],
		queryFn: async () =>
			await getAlchemyNftDetailBatch("base", {
				tokens: eventsData?.map(it => ({ contractAddress: it.contract.contractAddress, tokenId: it.contract.tokenId })),
				refreshCache: true
			}),
		enabled: Boolean(eventsData?.length)
	});

	const onChangeTabs = (status: TabsProps["value"]) => {
		if (status === "All") {
			setShowEvents(events);
		} else {
			const list = events?.filter(it => it.collectionStatus === status);
			setShowEvents(list);
		}
	};

	useEffect(() => {
		setLoading(eventPenging);
	}, [eventPenging]);

	useEffect(() => {
		if (eventsData) {
			const list = eventsData?.map?.(it => {
				const nftInfo = nftsData?.nfts?.find(
					nft =>
						`${nft.contract.address}`.toLocaleLowerCase() === `${it.contract.contractAddress}`.toLocaleLowerCase() &&
						`${nft.tokenId}` === `${it.contract.tokenId}`
				);

				return {
					...it,
					nft: nftInfo,
					collectionStatus: "Collected"
				} as EvnetProps;
			});

			setEvents(list ?? []);
			setShowEvents(list ?? []);
		}
	}, [eventsData, isSuccess, nftsData?.nfts]);

	useEffect(() => {
		setTotal(events?.length ?? 0);
		const collectedList = events?.filter(it => it.collectionStatus === "Collected");
		setCollectedTotal(collectedList?.length ?? 0);
	}, [events]);

	const refresh = async () => {
		setRefreshing(true);
		await eventRefetch();
		await nftRefetch();
		setRefreshing(false);
	};

	return {
		events,
		showEvents,
		total,
		collectedTotal,
		tabs,
		onChangeTabs,
		refresh,
		isRefreshing,
		isLoading
	};
};
