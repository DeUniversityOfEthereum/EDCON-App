import { enum_web3_alchemy_network } from "@/enum/web3";
import { ALCHEMY_API_KEY } from "@env";
import clientHttp from "@request";

import type { Alchemy } from "./typing";
type AlchemyNetworkType = "eth" | "base" | "polygon" | "zkSync" | "zkSync-sepolia" | "arb-mainnet";

export const contractNetwork = new Map<string, AlchemyNetworkType>([
	["1", "eth"],
	["8453", "base"],
	["137", "polygon"],
	["324", "zkSync"],
	["300", "zkSync-sepolia"],
	["42161", "arb-mainnet"]
]);

const apiMap = new Map<AlchemyNetworkType, { apikey: string; network: enum_web3_alchemy_network }>([
	[
		"eth",
		{
			apikey: ALCHEMY_API_KEY,
			network: enum_web3_alchemy_network.eth
		}
	],
	[
		"base",
		{
			apikey: ALCHEMY_API_KEY,
			network: enum_web3_alchemy_network.base
		}
	],
	[
		"polygon",
		{
			apikey: ALCHEMY_API_KEY,
			network: enum_web3_alchemy_network.polygon
		}
	],
	[
		"zkSync",
		{
			apikey: ALCHEMY_API_KEY,
			network: enum_web3_alchemy_network.zkSync
		}
	],
	[
		"zkSync-sepolia",
		{
			apikey: ALCHEMY_API_KEY,
			network: enum_web3_alchemy_network["zkSync-sepolia"]
		}
	],
	[
		"arb-mainnet",
		{
			apikey: ALCHEMY_API_KEY,
			network: enum_web3_alchemy_network["arb-mainnet"]
		}
	]
]);

export const getAlchemyNftDetail = (type: AlchemyNetworkType, params: Alchemy.Metadata.QueryData) => {
	const networkData = apiMap.get(type);
	return clientHttp.get<Alchemy.Metadata.NFTData>(
		`https://${networkData?.network}.g.alchemy.com/nft/v3/${ALCHEMY_API_KEY}/getNFTMetadata`,
		params
	);
};

export const getAlchemyNftDetailBatch = (type: AlchemyNetworkType, params: Alchemy.Metadata.BatchQueryData) => {
	const networkData = apiMap.get(type);
	return clientHttp.post<Alchemy.Metadata.BatchNFTData>(
		`https://${networkData?.network}.g.alchemy.com/nft/v3/${ALCHEMY_API_KEY}/getNFTMetadataBatch`,
		params
	);
};

export const getAlchemyNFTsForOwner = <Query extends Alchemy.Owner.NFTsQuery>(
	type: AlchemyNetworkType,
	params: Query
) => {
	const networkData = apiMap.get(type);
	return clientHttp.get<
		Alchemy.Owner.NFTsData<
			Query["withMetadata"] extends "true" ? Alchemy.Owner.OwnedNftMetaData : Alchemy.Owner.OwnedNft
		>
	>(`https://${networkData?.network}.g.alchemy.com/nft/v3/${ALCHEMY_API_KEY}/getNFTsForOwner`, params);
};

export const getAlchemyOwnersForNFT = (type: AlchemyNetworkType, params: Alchemy.Owner.OwnersForNFTQuery) => {
	const networkData = apiMap.get(type);
	return clientHttp.get<Alchemy.Owner.OwnersForNFTData>(
		`https://${networkData?.network}.g.alchemy.com/nft/v3/${ALCHEMY_API_KEY}/getOwnersForNFT`,
		params
	);
};
