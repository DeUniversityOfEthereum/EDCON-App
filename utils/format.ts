import { cloneDeep, isArray, isObject, isString } from "lodash-es";

export const requestFormatTrim = <T>(val: T): T => {
	let res = cloneDeep<T>(val);

	if (isArray(res)) {
		for (const item of res) {
			if (isString(res[item])) {
				res[item] = `${res[item]}`.trim();
			}
		}
	} else if (isObject(res)) {
		for (const key in res) {
			if (Object.prototype.hasOwnProperty.call(res, key)) {
				if (isString(res[key])) {
					(res[key] as any) = `${res[key]}`.trim();
				}
			}
		}
	} else if (isString(res)) {
		(res as string) = `${res}`.trim();
	}

	return res;
};
