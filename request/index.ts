import { enum_contentType } from "@/enum/http";
import { requestFormatTrim } from "@/utils/format";
import { isEmpty } from "lodash-es";
import { formatUrl, getStringParams, handleRequestHeaders, handleResponse } from "./utils";

/**
 * GET
 */
const get = async <T>(
	url: string,
	params: Record<string, any> = {},
	requestInit?: Omit<RequestInit, "headers" | "method">,
	content_type: enum_contentType = enum_contentType.JSON
): Promise<T> => {
	const getUrl = isEmpty(params) ? url : `${url}?${getStringParams(params)}`;
	const apiUrl = formatUrl(getUrl);
	const res = await fetch(apiUrl, {
		headers: await handleRequestHeaders(content_type),
		method: "GET",
		...requestInit
	});
	return await handleResponse(res);
};

/**
 * POST
 */
const post = async <T>(
	url: string,
	params: Record<string, any> = {},
	requestInit?: Omit<RequestInit, "headers" | "method" | "body">,
	content_type: enum_contentType = enum_contentType.JSON
): Promise<T> => {
	const apiUrl = formatUrl(url);
	const res = await fetch(apiUrl, {
		headers: await handleRequestHeaders(content_type),
		method: "POST",
		body: params && JSON.stringify(requestFormatTrim(params)),
		...requestInit
	});
	return await handleResponse(res);
};

/**
 * PUT
 */
const put = async <T>(
	url: string,
	params: Record<string, any> = {},
	requestInit?: Omit<RequestInit, "headers" | "method" | "body">,
	content_type: enum_contentType = enum_contentType.JSON
): Promise<T> => {
	const apiUrl = formatUrl(url);
	const res = await fetch(apiUrl, {
		headers: await handleRequestHeaders(content_type),
		method: "PUT",
		body: params && JSON.stringify(requestFormatTrim(params)),
		...requestInit
	});
	return await handleResponse(res);
};

/**
 * DELETE
 */
const remove = async <T>(
	url: string,
	params: Record<string, any> = {},
	requestInit?: Omit<RequestInit, "headers" | "method">,
	content_type: enum_contentType = enum_contentType.JSON
): Promise<T> => {
	const getUrl = isEmpty(params) ? url : `${url}?${getStringParams(params)}`;
	const apiUrl = formatUrl(getUrl);
	const res = await fetch(apiUrl, {
		headers: await handleRequestHeaders(content_type),
		method: "DELETE",
		...requestInit
	});
	return await handleResponse(res);
};

/**
 * upload
 */
const upload = async <T>(
	url: string,
	params: FormData,
	requestInit?: Omit<RequestInit, "headers" | "method" | "body">,
	content_type: enum_contentType = enum_contentType.FORM_DATA
): Promise<T> => {
	const apiUrl = formatUrl(url);
	const header = await handleRequestHeaders(content_type);
	const res = await fetch(apiUrl, {
		headers: {
			Language: header.Language,
			Authorization: header.Authorization,
			"x-source-id": header["x-source-id"]
		},
		method: "POST",
		body: params,
		...requestInit
	});
	return await handleResponse(res);
};

const clientHttp = {
	get,
	post,
	put,
	remove,
	upload
};

export default clientHttp;
