import { Text, View, ViewProps } from "@/components/Themed";
import { UPressable } from "@/components/u";
import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";

export default function SectionContainer(props: {
	style?: ViewProps["style"];
	headerStyle?: ViewProps["style"];
	text?: string;
	detail?: string;
	children?: ViewProps["children"];
	indicator?: ReactNode;
	onPress?: () => void;
}) {
	return (
		<View style={[styles.sectionContainer, props.style]}>
			{(props.text || props.detail) && (
				<UPressable disabled={props.onPress === undefined} onPress={props.onPress}>
					<View style={[styles.sectionTextContainer, props.headerStyle]}>
						{props.text && <Text style={[fonts.poppins_24_500]}>{props.text}</Text>}
						{props.detail && <Text style={[fonts.poppins_24_500]}>{props.detail}</Text>}
						{props.indicator}
					</View>
				</UPressable>
			)}
			{props.children}
		</View>
	);
}

const fonts = StyleSheet.create({
	poppins_24_500: {
		fontFamily: Fonts.Poppins_Medium,
		fontSize: 24
	},
	poppins_14_500: {
		fontFamily: Fonts.Poppins_Medium,
		fontSize: 14
	},
	poppins_12_500: {
		fontFamily: Fonts.Poppins_Medium,
		fontSize: 12
	},
	poppins_14_400: {
		fontFamily: Fonts.Poppins_Regular,
		fontSize: 14
	}
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.light.grayBackground
	},

	sectionContainer: {
		gap: 24,
		paddingHorizontal: 16
	},
	sectionTextContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	}
});
