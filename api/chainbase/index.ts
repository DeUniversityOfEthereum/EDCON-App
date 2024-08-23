import clientHttp from "@request";

import type { API } from "@/typings/api";
import type { Chainbase } from "./typing";

/**
 * 获取token信息
 */
export const getChainbaseV1TokenMetadata = async (params: Chainbase.TokenMetadata.Query) => {
	return clientHttp.get<API.Response<Chainbase.TokenMetadata.Data>>("/chainbase/v1/token/metadata", params);
};
