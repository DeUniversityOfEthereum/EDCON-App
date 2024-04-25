import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import { Text, View } from "@themed";
import { forwardRef } from "react";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

import type { PressableProps } from "react-native";
type UButtonProps = {
	title?: string;
	children?: React.ReactNode;
	color?: "primary" | "warning" | "success" | "blue";
	size?: "sm" | "md" | "lg";
	variant?: "filled" | "outlined";
	loading?: boolean;
} & PressableProps;

export const UButton = forwardRef<null, UButtonProps>((props, ref) => {
	const {
		color = "primary",
		variant = "filled",
		size = "md",
		loading,
		disabled,
		title,
		children,
		...pressableProps
	} = props;

	return (
		<Pressable {...pressableProps} disabled={disabled || loading} ref={ref}>
			{({ pressed }) => (
				<View
					style={[
						style.container,
						{
							backgroundColor: disabled ? Colors.light.grayc : variant === "filled" ? Colors.light[color] : "#fff",
							paddingHorizontal: size === "sm" ? 16 : 24,
							height: size === "sm" ? 40 : size === "lg" ? 64 : 54,
							borderWidth: variant === "outlined" ? 1 : 0,
							borderColor: Colors.light.border,
							opacity: loading ? 0.8 : 1
						},
						pressed && variant === "filled" && style.filled_pressed,
						pressed && variant === "outlined" && style.outlined_pressed
					]}
				>
					{loading ? (
						<ActivityIndicator color={variant === "filled" ? "#fff" : Colors.light[color]} />
					) : (
						children ?? (
							<Text
								style={[
									style.title,
									{
										color: disabled ? "#fff" : variant === "filled" ? "#fff" : Colors.light[color],
										fontSize: size === "sm" ? 12 : size === "lg" ? 18 : 16
									},
									pressed && variant === "outlined" && color === "primary" && style.outlined_primary_pressed,
									pressed && variant === "outlined" && color === "warning" && style.outlined_warning_pressed
								]}
							>
								{title}
							</Text>
						)
					)}
				</View>
			)}
		</Pressable>
	);
});

const style = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 9999
	},
	title: {
		fontFamily: Fonts.Inter_700Bold,
		fontWeight: "700"
	},
	filled_pressed: {
		backgroundColor: "#603FED"
	},
	outlined_pressed: {
		backgroundColor: Colors.light.primaryLight2
	},
	outlined_primary_pressed: {
		color: "#603FED"
	},
	outlined_warning_pressed: {
		color: "#E03553"
	}
});
