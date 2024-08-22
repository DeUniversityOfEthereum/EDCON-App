import { enum_contentType } from "@/enum/http";
import { handleResponse } from "@/request/utils";
import { requestFormatTrim } from "@/utils/format";
import { IYK_BASE_API_URL } from "@env";
import clientHttp from "@request";

import type { IYK } from "./typing";

export const getIykRefsDetail = (id: string) => {
	return clientHttp.get<IYK.Refs.Detail>(`/iyk/refs/${id}`);
};

export const getIykOtpsDetail = (id: string) => {
	return clientHttp.get<IYK.Otps.Detail>(`/iyk/otps/${id}`);
};

export const getIykEvents = (params: IYK.Events.Query) => {
	return clientHttp.get<IYK.Events.EventData[]>(`/iyk/events`, params);
};

export const getLeaderboards = (params: IYK.Leaderboards.Query) => {
	return clientHttp.get<IYK.Leaderboards.Data[]>(`/iyk/leaderboards/xxxx`, params);
};

export const postIykPhygitalsTransferPullable = async (
	otp: string,
	params: IYK.Phygitals.PostParams
): Promise<IYK.Phygitals.PostRes> => {
	const res = await fetch(`${IYK_BASE_API_URL}/phygitals/transfer/pullable`, {
		headers: {
			"x-iyk-code": otp,
			"Content-Type": enum_contentType.JSON
		},
		method: "POST",
		body: params && JSON.stringify(requestFormatTrim(params))
	});
	return await handleResponse(res);
};

export const postIykEventsMintSelf = async (
	otp: string,
	params: IYK.Events.PostParams
): Promise<IYK.Events.PostRes> => {
	const res = await fetch(`${IYK_BASE_API_URL}/events/mint/self`, {
		headers: {
			"x-iyk-code": otp,
			"Content-Type": enum_contentType.JSON
		},
		method: "POST",
		body: params && JSON.stringify(requestFormatTrim(params))
	});
	return await handleResponse(res);
};
