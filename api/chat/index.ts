import clientHttp from "@request";

import type { Chat } from "./typing";

export const postMessage = (params: Chat.Message.PostParams) => {
	return clientHttp.post<Chat.Message.PostRes>("/alterego/message/new_message", params);
};
