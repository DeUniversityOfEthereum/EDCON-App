import clientHttp from "@request";

import type { API } from "@/typings/api";
import type { Auth } from "./typing";

export const postAuthLogin = (params: Auth.Login.PostParams) => {
	return clientHttp.post<API.Response<Auth.Login.PostRes>>("/auth/login", params);
};

export const getAuthUser = () => {
	return clientHttp.get<API.Response<Auth.UserInfo>>("/auth/user");
};

export const getAuthUserWeb3Auth = () => {
	return clientHttp.get<API.Response<Auth.Web3Auth.AuthData>>("/auth/user/web3auth");
};

export const getTwitterInfo = (params: Auth.Twitter.PostParams) => {
	return clientHttp.put<API.Response<Auth.Twitter.InfoData>>("/user/bind_twitter", params);
};
