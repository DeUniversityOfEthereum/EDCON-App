import dayjs from "dayjs";

export const formateDate = (value: Date, formate?: string) => {
	return dayjs(value).format(formate);
};
