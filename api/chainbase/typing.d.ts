export namespace Chainbase {
	export namespace TokenMetadata {
		type Url = {
			name: string;
			url: string;
		};

		type Logo = {
			uri: string;
			width: number;
			height: number;
		};

		export type Query = {
			contract_address: string;
			chain_id: string;
		};

		export type Data = {
			contract_address: string;
			decimals: number;
			name: string;
			symbol: string;
			total_supply: string;
			logos: Logo[];
			urls: Url[];
			current_usd_price: number;
		};
	}
}
