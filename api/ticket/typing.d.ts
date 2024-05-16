import { enum_ticket_type_no } from "@/enum/ticket";

export namespace Ticket {
	export type ListWithEmailParams = {
		email: string;
		code: string;
	};

	export type ListParams = {
		/**
		 * @value 3 // 2024
		 */
		conference_id: number;
	};

	export type ListRes = {
		tickets: Info[];
	};

	export type Info = {
		id: string;
		conference_id: number;
		cert_id: enum_ticket_type_no;
		order_id: number;
		email: string;
		cert_no: string;
		form: string;
		cert: string;
		status: number;
		created_at: string;
		updated_at: string;
		origin: number;
		signin_user_id: number;
		signin_user: number;
		signin_at: string;
		uuid: string;
		country: string;
		can_bind: boolean;
	};

	export type BindParams = {
		email: string;
		ticket_id: number;
		conference_id: number;
	};

	export type BindRes = {};

	export type BoundParams = {
		conference_id: number;
	};

	export type BoundRes = {
		ticket: Info;
	};
}
