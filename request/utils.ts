import { TOKEN_EXPIRED_AT_STORE_KEY, TOKEN_STORE_KEY } from "@/config";
import { enum_contentType, enum_x_source_id } from "@/enum/http";
import { BASE_API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { toast } from "@toast";
import { router } from "expo-router";
import { cloneDeep } from "lodash-es";
import qs from "qs";
import { Platform } from "react-native";

export const formatUrl = (url: string) => {
	return `${BASE_API_URL}${url}`;
};

export const getAuthorizationToken = async () => {
	const token = (await AsyncStorage.getItem(TOKEN_STORE_KEY)) ?? "";
	const tokenExpiredAt = (await AsyncStorage.getItem(TOKEN_EXPIRED_AT_STORE_KEY)) ?? "";
	if (Number(tokenExpiredAt) && Date.now() / 1000 < Number(tokenExpiredAt)) {
		return token ? `Bearer ${token}` : "";
	} else {
		return "";
	}
};

export const getLanguage = async () => {
	return "en";
};

export const getStringParams = (params: Record<string, any>) => {
	const paramsCopy = cloneDeep(params);
	for (const key in paramsCopy) {
		if (paramsCopy[key] === "" || paramsCopy[key] === undefined) {
			paramsCopy[key] = null;
		}
	}
	return qs.stringify(paramsCopy, { skipNulls: true });
};

export const handleRequestHeaders = async (content_type: enum_contentType) => {
	return {
		"Content-Type": content_type,
		Authorization: await getAuthorizationToken(),
		Language: await getLanguage(),
		"x-source-id":
			Platform.OS === "ios"
				? enum_x_source_id.ios
				: Platform.OS === "android"
					? enum_x_source_id.android
					: enum_x_source_id.web
	};
};

/**
 * 处理错误信息
 */
export const handleError = (res: { code: number; message: string; data: any }) => {
	if (res.code !== 200) {
		toast.current?.text(res.message);
		if (res.code === 401) {
			router.replace("/(auth)/login");
		}
	}
};

export const handleResponse = async (response: globalThis.Response) => {
	if (response.ok) {
		const contentType = response.headers.get("content-type");
		if (contentType && contentType.includes("application/json")) {
			const res = await response.json();
			handleError(res);
			return res;
		}
		const res = {
			code: response.status,
			data: response.text(),
			message: response.statusText
		};

		handleError(res);
		return res;
	} else {
		try {
			const resData = await response.json();
			const res = {
				message: resData.message,
				data: null,
				code: resData.code
			};
			handleError(res);
			return res;
		} catch (error) {
			const res = {
				message: response.statusText,
				data: null,
				code: response.status
			};
			handleError(res);
			return res;
		}
	}
};
