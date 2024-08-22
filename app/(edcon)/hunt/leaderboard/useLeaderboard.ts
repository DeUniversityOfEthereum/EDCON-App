import { getLeaderboards } from "@/api/iyk";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import type { IYK } from "@/api/iyk/typing";
export type LeaderboardProps = IYK.Leaderboards.Data & { order: number };

export const useLeaderboard = () => {
	const [leaderboardsParams, setLeaderboardsParams] = useState({});
	const [list, setlist] = useState<LeaderboardProps[]>([]);

	const { data, isPending, refetch } = useQuery({
		queryKey: ["getLeaderboards", leaderboardsParams],
		queryFn: async () => await getLeaderboards(leaderboardsParams)
	});

	const onChangeType = () => {
		setLeaderboardsParams({});
	};

	useEffect(() => {
		const newlist =
			data?.map((it, i) => {
				return {
					...it,
					order: i + 1
				};
			}) ?? [];

		setlist(newlist.splice(0, Math.min(newlist.length, 100)));
	}, [data]);

	return {
		list,
		isPending,
		refetch,
		onChangeType
	};
};
