import clientHttp from "@request";

import type { API } from "@/typings/api";
import type { NFT } from "./typing";

/**
 * 保存领取NFT数据
 */
export const postNFTDraw = (params: NFT.Draw.PostParams) => {
	return clientHttp.post<API.Response<NFT.Draw.PostRes>>("/nft/draw", params);
};

/**
 * 获取领取NFT数据
 */
export const getNFTDrawRecords = (params: NFT.Draw.Query) => {
	return clientHttp.get<API.PageResponse<NFT.Draw.QueryData>>("/nft/draw_records", params);
};

/**
 * 保存扫码领取的nft数据
 */
export const postNFTExclusive = (params: NFT.Exclusive.Params) => {
	return clientHttp.post<API.Response<NFT.Exclusive.Params>>("/nft/edcon2024/exclusive", params);
};

/**
 * 是否已经领取
 */
export const getNFTExclusive = (params: NFT.Exclusive.Query) => {
	return clientHttp.get<API.Response<NFT.Exclusive.QueryData>>("/nft/edcon2024/exclusive", params);
};

/**
 * 扫码领取swag奖励
 */
export const postNFTValidateSwagBag = (params: NFT.ValidateSwagBag.Params) => {
	console.log("params", params);

	return clientHttp.post<API.Response<NFT.ValidateSwagBag.Result>>("/nft/validate_swag_bag", params);
};
