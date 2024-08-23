import { enum_base_language } from "@/enum/base";

export namespace Activity {
	export type Params = {
		code: string;
		conference_id: number;
		type: number;
	};

	export interface Data {
		id: number;
		title: string;
		description: string;
		conference_id: number;
		is_show: number;
		type: number;
		status: number;
		extend: Extend;
		start_date: string;
		end_date: string;
		created_at: string;
		updated_at: string;
	}

	export interface Extend {
		activity_link: Link[];
		activity_adress: Address[];
		activity_create: Create[];
		rule_img: Ruleimg[];
	}

	export interface Ruleimg {
		url: string;
		language: enum_base_language;
	}

	export interface Create {
		logo: string;
		name: string;
		sort: number;
		links: CreateLink[];
		is_show: number;
		description: string;
		contractAddress: string;
		tokenId: string;
	}

	export interface Address {
		date: string;
		sort: number;
		is_show: number;
		latitude: string;
		longitude: string;
		event_name: string;
		adress_name: string;
		contractAddress: string;
		tokenId: string;
		map_url: string;
	}

	export interface Link {
		name: string;
		sort: number;
		is_show: number;
		icon_url: string;
		link_url: string;
		description: string;
		contractAddress: string;
		tokenId: string;
	}

	export interface CreateLink {
		logo: string;
		link: string;
		name: string;
	}

	export namespace Hash {
		export type Query = {
			key?: string;
			type?: 1;
		};
		export type HashData = string;
	}
}
