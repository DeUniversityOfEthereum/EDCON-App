import clientHttp from "@/request";
import { API } from "@/typings/api";
import { Ticket } from "./typing";

export const getUserTicketListWithEmail = (params: Ticket.ListWithEmailParams) => {
	return clientHttp.get<API.Response<Ticket.ListRes>>(`/user/ticket_by_email`, params);
};

export const getUserTicketList = (params: Ticket.ListParams) => {
	return clientHttp.get<API.Response<Ticket.ListRes>>(`/user/ticket`, params);
};

export const bindTiket = (params: Ticket.BindParams) => {
	return clientHttp.post<API.Response<Ticket.BindRes>>(`/user/bind_ticket`, params);
};

export const getBindedTicket = (params: Ticket.BoundParams) => {
	return clientHttp.get<API.Response<Ticket.BoundRes>>(`/user/bound_ticket`, params);
};
