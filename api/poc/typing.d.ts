import { enum_web3_reward_type } from "@/enum/web3";

export namespace POC {
	export namespace Decrypt {
		export type PostParams = {
			action: "decrypt";
			message: string;
		};
		type ArgsValue = {
			amount: number;
			tokenId?: number;
			startFrom?: number;
		};
		export type PostRes = {
			decryptedMessage: {
				contractAddress: string;
				method: string;
				reward: enum_web3_reward_type;
				argsValue: ArgsValue;
				chainId: string;
			};
		};
	}
	export namespace ExecuteTransaction {
		export type PostParams = {
			recipientAddress: string;
			contractAddress: string;
			method: string;
			reward: string;
			chainId: string;
			hash_key: string;
			argsValue: Decrypt.ArgsValue;
		};
		export type PostRes = {
			data: any;
			token_id: string;
		};
	}
}
