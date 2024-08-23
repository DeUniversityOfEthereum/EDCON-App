import { useState } from "react";
import { ColorValue, StyleSheet, ViewProps } from "react-native";
import { View } from "../Themed";

type ShadowOptions = {
	backgroundColor?: ColorValue;
	shadowColor?: ColorValue;
	shadowRadius?: number;
	shadowOffset?: { width: number; height: number };
	shadowOpacity?: number;
	borderColor?: ColorValue;
	borderWidth?: number;
	borderRadius?: number;
};

export function ShadowContainer(props: { opt?: ShadowOptions }) {
	const {
		backgroundColor = "#FFFFFF",
		shadowColor = "#000000",
		shadowRadius = 1,
		shadowOffset = { width: 3, height: 3 },
		borderColor = "#000000",
		borderRadius = -1,
		borderWidth = 1
	} = props.opt ?? {};
	const [size, setSize] = useState({ width: 0, height: 0 });
	// if (Platform.OS === "ios") {
	// 	return null;
	// }
	return (
		<View style={[styles.shadowContainer, { zIndex: -1 }]} onLayout={e => setSize(e.nativeEvent.layout)}>
			<View
				style={{
					position: "absolute",
					...size,
					borderColor: shadowColor,
					borderWidth: shadowRadius,
					top: shadowOffset.width + shadowRadius,
					left: shadowOffset.height + shadowRadius,
					backgroundColor: shadowColor,
					borderRadius: borderRadius > 0 ? borderRadius : size.height * 0.5
				}}
			/>
			<View
				style={{
					...size,
					borderColor: borderColor,
					borderWidth: borderWidth,
					backgroundColor: backgroundColor,
					borderRadius: borderRadius > 0 ? borderRadius : size.height * 0.5
				}}
			/>
		</View>
	);
}

export function ShadowCard(props: { opt?: ShadowOptions } & ViewProps) {
	return (
		<View style={props.style}>
			<ShadowContainer opt={props.opt} />
			{props.children}
		</View>
	);
}

const styles = StyleSheet.create({
	shadowContainer: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
	}
});
