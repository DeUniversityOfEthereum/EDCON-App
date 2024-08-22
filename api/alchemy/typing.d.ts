export namespace Alchemy {
	export namespace Metadata {
		type Mint = {
			mintAddress: string;
			blockNumber: number;
			timestamp: string;
			transactionHash: string;
		};

		type Raw = {
			tokenUri: string;
			metadata: Metadata;
			error: string;
		};

		type Metadata = {
			name: string;
			collection: string;
			description: string;
			image: string;
			iyk_metadata_version: string;
			attributes: Attribute[];
			media_gallery: Mediagallery[];
			customField: string;
		};

		type Mediagallery = {
			media: string;
			type: string;
		};

		type Attribute = {
			trait_type: string;
			value: string;
		};

		type Image = {
			cachedUrl: string;
			thumbnailUrl: string;
			pngUrl: string;
			contentType: string;
			size: string;
			originalUrl: string;
		};

		type Contract = {
			address: string;
			name: string;
			symbol: string;
			totalSupply: string;
			tokenType: string;
			contractDeployer: string;
			deployedBlockNumber: number;
			openSeaMetadata: OpenSeaMetadata;
			isSpam: string;
			spamClassifications: any[];
		};

		type OpenSeaMetadata = {
			floorPrice: string;
			collectionName: string;
			collectionSlug: string;
			safelistRequestStatus: string;
			imageUrl: string;
			description: string;
			externalUrl: string;
			twitterUsername: string;
			discordUrl: string;
			bannerImageUrl: string;
			lastIngestedAt: string;
		};

		export type QueryData = {
			contractAddress: string;
			tokenId: string;
			tokenType?: "ERC721" | "ERC1155";
			tokenUriTimeoutInMs?: number;
			refreshCache?: "true" | "false";
		};

		type Collection = {
			name: string;
			slug: string;
			externalUrl: string | null;
			bannerImageUrl: string | null;
		};

		export type NFTData = {
			contract: Contract;
			tokenId: string;
			tokenType: string;
			name: string;
			description: string;
			tokenUri: string;
			image: Image;
			raw: Raw;
			collection: Collection;
			mint: Mint;
			owners: string[];
			timeLastUpdated: string;
		};

		type QueryTokensData = {
			contractAddress?: string;
			tokenId: string;
			tokenType?: "ERC721" | "ERC1155";
		};
		export type BatchQueryData = {
			tokens?: QueryTokensData[];
			tokenUriTimeoutInMs?: number;
			refreshCache?: boolean;
		};
		export type BatchNFTData = {
			nfts: NFTData[];
		};
	}
	export namespace Owner {
		type ValidAt = {
			blockNumber: number;
			blockHash: string;
			blockTimestamp: string;
		};

		export type OwnedNft = {
			contractAddress: string;
			tokenId: string;
			balance: string;
		};

		export type OwnedNftMetaData = {
			contract: Contract;
			tokenId: string;
			tokenType: string;
			name: string | string;
			description: string | string;
			tokenUri: string;
			image: Image;
			raw: Raw;
			collection: Collection;
			mint: Mint;
			owners: string;
			timeLastUpdated: string;
			balance: string;
			acquiredAt: AcquiredAt;
		};

		type AcquiredAt = {
			blockTimestamp: string;
			blockNumber: string;
		};

		type Mint = {
			mintAddress: string | string;
			blockNumber: string | number;
			timestamp: string | string;
			transactionHash: string | string;
		};

		type Collection = {
			name: string;
			slug: string;
			externalUrl: string;
			bannerImageUrl: string;
		};

		type Raw = {
			tokenUri: string;
			metadata: Metadata;
			error: string | string;
		};

		type Metadata = {
			name?: string;
			image?: string;
			symbol?: string;
			description?: string;
			attributes?: Attribute[];
			external_url?: string;
		};

		type Attribute = {
			value: string;
			key?: string;
			trait_type: string;
		};

		type Image = {
			cachedUrl: string | string;
			thumbnailUrl: string | string;
			pngUrl: string | string;
			contentType: string | string;
			size: string | number;
			originalUrl: string | string;
		};

		type Contract = {
			address: string;
			name: string;
			symbol: string;
			totalSupply: string;
			tokenType: string;
			contractDeployer: string;
			deployedBlockNumber: number;
			openSeaMetadata: OpenSeaMetadata;
			isSpam: boolean | string;
			spamClassifications: string[];
		};

		type OpenSeaMetadata = {
			floorPrice: string;
			collectionName: string;
			collectionSlug: string;
			safelistRequestStatus: string;
			imageUrl: string | string;
			description: string | string;
			externalUrl: string;
			twitterUsername: string;
			discordUrl: string;
			bannerImageUrl: string;
			lastIngestedAt: string;
		};

		export type NFTsQuery = {
			owner: string;
			contractAddresses: string[];
			withMetadata?: "true" | "false";
		};
		export type NFTsData<T> = {
			ownedNfts: T[];
			totalCount: number;
			validAt: ValidAt;
			pageKey: string;
		};

		export type OwnersForNFTQuery = {
			contractAddress: string;
			tokenId: string;
		};

		export type OwnersForNFTData = {
			owners: string[];
		};
	}
}
