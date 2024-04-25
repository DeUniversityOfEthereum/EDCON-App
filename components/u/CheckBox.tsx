import Colors from "@constants/Colors";
import { forwardRef } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Path, Svg } from "react-native-svg";

import type { PressableProps, StyleProp, ViewStyle } from "react-native";

type UCheckBoxProps = {
	value: boolean;
	style?: StyleProp<ViewStyle>;
	onChange?: (value: boolean) => void;
} & PressableProps;

export const UCheckBox = forwardRef<null, UCheckBoxProps>((props, ref) => {
	const onChange = () => {
		props?.onChange && props?.onChange(!props.value);
	};

	return (
		<Pressable
			{...props}
			ref={ref}
			style={[
				style.checkedIconWrapper,
				props.style,
				{ backgroundColor: props.value ? Colors.light.primary : "#fff" },
				props.disabled === true ? { borderColor: "#CCCCCC" } : {}
			]}
			onPress={() => onChange()}
		>
			<CheckedIcon />
		</Pressable>
	);
});

const style = StyleSheet.create({
	checkedIconWrapper: {
		alignItems: "center",
		justifyContent: "center",
		width: 16,
		height: 16,
		borderWidth: 1,
		borderColor: Colors.light.border,
		borderRadius: 9999
	}
});

function CheckedIcon() {
	return (
		<Svg width="12" height="13" viewBox="0 0 12 13" fill="none">
			<Path
				d="M4.84826 7.91077L3.0112 6.07371C2.89663 5.95914 2.74123 5.89477 2.5792 5.89477C2.24179 5.89477 1.96826 6.1683 1.96826 6.50571C1.96826 6.66774 2.03263 6.82314 2.1472 6.93771L5.13626 9.92677L9.89012 4.05435C9.98208 3.94075 10.0323 3.79902 10.0323 3.65287V3.61011C10.0323 3.28131 9.76572 3.01477 9.43692 3.01477C9.26611 3.01477 9.10352 3.08814 8.99051 3.21622L4.84826 7.91077Z"
				fill="white"
			/>
		</Svg>
	);
}
