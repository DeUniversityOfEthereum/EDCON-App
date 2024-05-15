import { enum_base_sort } from "@/enum/base";

export namespace API {
	export type PageRequest = {
		page?: number;
		per_page?: number;
		is_id_desc?: enum_base_sort;
		is_sort_desc?: enum_base_sort;
		is_updated_at_desc?: enum_base_sort;
	};

	export type PageMeta = {
		total: number;
		total_pages: number;
		page?: number;
		per_page?: number;
	};

	export type Response<T> = {
		code: number;
		data: T;
		message: string;
	};

	export type PageResponse<T> = {
		code: number;
		data: {
			list: T[];
			meta: PageMeta;
		};
		message: string;
	};

	export type ListResponse<T> = {
		code: number;
		data: T[];
		message: string;
	};
}
