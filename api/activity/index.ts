import clientHttp from "@request";

import type { API } from "@/typings/api";
import type { Activity } from "./typing";

export const getActivity = (params: Activity.Params) => {
	return clientHttp.get<API.Response<Activity.Data>>("/conference_activity/detail", params);
};

export const getConferenceActivityData = (params: Activity.Hash.Query) => {
	return clientHttp.get<API.Response<Activity.Hash.HashData>>("/conference_activity/data", params);
};
