export namespace IYK {
	export namespace ChipGroups {
		export type ListData = {
			id: number;
			name: string;
			createdAt: string;
		};
	}

	export namespace Refs {
		export type PoapEvent = {
			id: number;
			poapEventId: number;
			otp: string;
			status: string;
		};

		export type tokensDetail = {
			contractAddress: string;
			chainId: number;
			tokenId: string;
			otp: string;
		};

		export type Detail = {
			uid: string;
			isValidRef: boolean;
			linkedToken: tokensDetail;
			poapEvents: PoapEvent[];
			guestbookEvents: tokensDetail[];
		};
	}

	export namespace Phygitals {
		export type PostParams = {
			/** ETH address or ENS name to transfer ownership to */
			recipient: string;
		};
		export type PostRes = {
			initialTxHash: string;
		};
	}

	export namespace Events {
		export type Query = {
			contractId: number;
		};

		export type PostParams = {
			/** ETH address or ENS name to transfer ownership to */
			recipient: string;
		};
		export type PostRes = {
			txnHash: string;
		};

		export type Contract = {
			id: number;
			contractAddress: string;
			chainId: number;
			tokenId: string;
		};

		export type EventData = {
			id: number;
			name: string;
			contract: Contract;
			createdAt: string;
		};
	}

	export namespace Otps {
		export type LinkedToken = {
			contractAddress: string;
			chainId: number;
			tokenId: string;
		};
		export type Detail = {
			otp: string;
			isExpired: boolean;
			expiresAt: string;
			createdAt: string;
			type: string;
			linkedToken: LinkedToken;
		};
	}

	export namespace Leaderboards {
		export type Query = {};
		export type Data = {
			eth_address: string;
			leaderboard: string;
			name: string;
			points: number;
		};
	}
}
