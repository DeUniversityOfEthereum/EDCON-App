import React, { forwardRef, useState } from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";

import type { TouchableOpacityProps, ViewStyle } from "react-native";

type ButtonProps = {
	activeOpacity?: number;
} & TouchableOpacityProps;

export const Button = forwardRef<null, ButtonProps>(({ activeOpacity = 0.8, onPress, style, children }, ref) => {
	const [pressStatus, setPressStatus] = useState(false);
	const _onPressIn = () => {
		setPressStatus(true);
	};
	const _onPressOut = () => {
		setPressStatus(false);
	};

	return (
		<TouchableOpacity
			activeOpacity={activeOpacity}
			style={[styles.container, style]}
			onPress={onPress}
			onPressIn={_onPressIn}
			onPressOut={_onPressOut}
			ref={ref}
		>
			<View
				style={[
					styles.background,
					{ borderRadius: (style as ViewStyle).borderRadius },
					pressStatus ? { backgroundColor: "#0002" } : {}
				]}
			/>
			{children}
		</TouchableOpacity>
	);
});

export default Button;

const styles = StyleSheet.create({
	container: {
		overflow: "hidden",
		// height: 74,
		borderRadius: 40,
		justifyContent: "center",
		alignItems: "center"
	},

	background: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	}
});
