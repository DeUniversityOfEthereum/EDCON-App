import { enum_web3_draw_nft_type } from "@/enum/web3";

import type { API } from "@/typings/api";

export namespace NFT {
	export namespace Draw {
		export type PostParams = {
			contract_address: string;
			token_id: string;
			chain_id: number;
			collection_name: string;
			txn_hash: string;
			wallet_address: string;
			/** 活动ID */
			related_id: string;
			type: enum_web3_draw_nft_type;
			message?: any;
		};
		export type PostRes = {};

		export type Query = {
			type: enum_web3_draw_nft_type;
			related_id: string;
			contract_address?: string;
			token_id?: string;
		} & API.PageRequest;

		export type QueryData = {
			id: number;
			user_id: number;
			contract_address: string;
			chain_id: number;
			token_id: string;
			collection_name: string;
			txn_hash: string;
			wallet_address: string;
			related_id: string;
			type: enum_web3_draw_nft_type;
			status: number;
			message?: any;
			created_at: string;
			updated_at: string;
		};
	}

	export namespace Exclusive {
		export type Params = {
			hash_key: string;
			message: any;
		};

		export type Query = {
			hash_key: string;
		};
		export type QueryData = {
			had_received: 0 | 1;
			message: any;
		};
	}

	export namespace ValidateSwagBag {
		export type Params = {
			type: number; // 1
			user_id: number;
		};

		export type Result = {
			/* 是否领取成功 */
			is_succ: boolean;
			/**
			 * 仅is_succ=false时存在
			 * 枚举值:1,2
			 */
			err_code: number;
		};
	}
}
