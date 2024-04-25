import React, { forwardRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import type { TouchableOpacityProps, ViewStyle } from "react-native";
type ETouchableProps = {
	activeOpacity?: number;
} & TouchableOpacityProps;

export const ETouchable = forwardRef<null, ETouchableProps>(
	({ activeOpacity = 0.8, onPress, style, children }, ref) => {
		var [pressStatus, setPressStatus] = useState(false);
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
						{ borderRadius: (style as ViewStyle)?.borderRadius ?? 24 },
						pressStatus ? { backgroundColor: "#0002" } : {}
					]}
				/>
				{children}
			</TouchableOpacity>
		);
	}
);

const styles = StyleSheet.create({
	container: {
		overflow: "hidden",
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
