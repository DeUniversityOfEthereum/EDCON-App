import Colors from "@/constants/Colors";
import Fonts from "@constants/Fonts";
import { forwardRef } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "../Themed";

import type { PressableProps, ViewProps } from "react-native";
type EButtonProps = {
	title?: string;
	type?: "white" | "primary";
	icon?: React.ReactNode;
	style?: ViewProps["style"];
	children?: React.ReactNode;
} & Omit<PressableProps, "children" | "style">;

export const EButton = forwardRef<null, EButtonProps>((props, ref) => {
	const { title, type, icon, ...pressableProps } = props;
	return (
		<Pressable
			{...pressableProps}
			style={({ pressed }) => [
				styles.button,
				props.style,
				type === "primary"
					? { backgroundColor: pressed ? Colors.light.edconPrimaryLight2 : Colors.light.edconPrimary }
					: {}
			]}
			ref={ref}
		>
			{props.children}
			{!props.children && (icon ?? null)}
			{!props.children && title && <Text style={styles.edconButtonText}>{title}</Text>}
		</Pressable>
	);
});

const styles = StyleSheet.create({
	button: {
		height: 48,
		borderRadius: 100,
		paddingHorizontal: 24,
		backgroundColor: "#FFFFFF",
		borderColor: "#000000",
		borderWidth: StyleSheet.hairlineWidth,
		overflow: "visible",
		shadowColor: "#000000",
		shadowRadius: 1,
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 1,
		flexDirection: "row",
		alignItems: "center",
		gap: 8
	},
	edconButtonText: {
		fontFamily: Fonts.Inter_700Bold,
		fontSize: 16
	}
});
