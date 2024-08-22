import { debounce } from "lodash-es";
import { forwardRef } from "react";
import { Pressable } from "react-native";

import type { PressableProps } from "react-native";
type UPressableProps = {
	wait?: number;
} & PressableProps;

export const UPressable = forwardRef<null, UPressableProps>((props, ref) => {
	const { wait = 300, onPress, ...pressableProps } = props;

	const debounceOnPress = debounce(onPress ? onPress : () => {}, wait);

	return (
		<Pressable {...pressableProps} onPress={debounceOnPress} ref={ref}>
			{props.children}
		</Pressable>
	);
});
