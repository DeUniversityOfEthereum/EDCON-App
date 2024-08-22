export namespace Auth {
	export namespace Login {
		export type PostParams = {
			email: string;
			password: string;
		};
		export type PostRes = {
			expired_at: number;
			is_register: number;
			token: string;
		};
	}

	export type UserInfo = {
		id: number;
		account: string;
		name: string;
		email: string;
		avatar: string;
		is_email_verified: boolean;
		is_auto_email: number;
		role: number;
		role_str: string;
		eth_address: string;
		blockchain_level: number;
		language: string;
		is_poa: number;
		is_share_twitter: boolean;
		is_bind_github: number;
		updatedAt: string;
		badge: {
			no: string;
			img: string;
			is_acquire: boolean;
			level: number;
			score_record_challenge_wait_num: number;
			score_log_not_pass_num: number;
		}[];
		x_account: string;
	};

	export namespace Web3Auth {
		export type AuthData = {
			token: string;
		};
	}

	export namespace Twitter {
		export type PostParams = {
			redirect_uri: string;
			code: string;
			client_id: string;
			code_verifier: string;
		};
		export type InfoData = {
			username: string;
		};
	}
}
