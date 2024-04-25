import { useEffect, useRef, useState } from "react";
import { UButton } from "./Button";

type USendCodeCountdownProps<T> = {
	params: T;
	api: (params: T) => Promise<boolean>;
	submitBefore?: () => boolean;
	/**
	 * @default 60
	 */
	value?: number;
	color?: "blue" | undefined;
};

export function USendCodeCountdown<T>(props: USendCodeCountdownProps<T>) {
	const { value = 60, params, api, submitBefore } = props;
	const [count, setCount] = useState(0);
	const [disabled, setDisabled] = useState(false);
	const timer = useRef<NodeJS.Timeout>();

	const resetCountdown = () => {
		if (count <= 0) {
			const res = submitBefore?.() ?? true;
			res &&
				api?.(params).then(apiRes => {
					if (apiRes) {
						setCount(value);
						startCountdown();
					}
				});
		}
	};

	const startCountdown = () => {
		timer.current = setInterval(() => {
			setCount(val => {
				if (val > 0) {
					return val - 1;
				} else {
					return 0;
				}
			});
		}, 1000);
	};

	const stopCountdown = () => {
		clearInterval(timer.current);
	};

	useEffect(() => {
		return () => {
			stopCountdown();
		};
	}, [timer]);

	useEffect(() => {
		setDisabled(count !== 0);
	}, [count]);

	return (
		<UButton
			color={props.color}
			variant="outlined"
			disabled={disabled}
			title={count > 0 ? `${count}S` : "Send"}
			onPress={() => resetCountdown()}
		/>
	);
}
