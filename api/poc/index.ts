import clientHttp from "@request";

import type { API } from "@/typings/api";
import type { POC } from "./typing";

/**
 * 解码扫描的二维码数据
 */
export const postEncryption = async (params: POC.Decrypt.PostParams) => {
	return clientHttp.post<API.Response<POC.Decrypt.PostRes>>("/edconpoc/encryption", params);
};

/**
 * 领取NFT
 */
export const postExecuteTransaction = async (params: POC.ExecuteTransaction.PostParams) => {
	return clientHttp.post<API.Response<POC.ExecuteTransaction.PostRes>>("/edconpoc/executeTransaction", params);
};
