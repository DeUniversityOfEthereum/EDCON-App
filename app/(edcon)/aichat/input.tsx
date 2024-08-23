import { ShadowContainer } from "@/components/shadow/shadow";
import Fonts from "@/constants/Fonts";
import Colors from "@constants/Colors";
import { View } from "@themed";
import { forwardRef } from "react";
import { StyleSheet, TextInput } from "react-native";

import type { TextInputProps, ViewProps, ViewStyle } from "react-native";
type AIInputProps = {
	container?: {
		style?: ViewProps;
	};
	containerStyle?: ViewStyle;
	icon?: React.ReactNode;
	onChange?: TextInputProps["onChangeText"];
} & Omit<
	TextInputProps,
	"inlineImageLeft" | "inlineImagePadding" | "clearButtonMode" | "underlineColorAndroid" | "onChange" | "onChangeText"
>;

export const AIInput = forwardRef<null, AIInputProps>((props, ref) => {
	const { container, icon, onChange, ...inputProps } = props;

	return (
		<View
			{...container}
			style={[
				style.container,
				props.containerStyle,
				{
					paddingVertical: inputProps.multiline ? 12 : 2
				}
			]}
		>
			<ShadowContainer opt={style.container} />

			{icon && <View style={style.icon}>{icon}</View>}

			<TextInput
				{...inputProps}
				ref={ref}
				onChangeText={onChange}
				style={[
					style.input,
					{
						width: inputProps.multiline ? "100%" : icon ? "86%" : "94%",
						height: inputProps.multiline ? "auto" : 48,
						maxHeight: 106,
						lineHeight: inputProps.multiline ? 24 : undefined
					},
					props.style
				]}
				placeholderTextColor={Colors.light.placeholder}
				onFocus={e => {
					props?.onFocus?.(e);
				}}
				onBlur={e => {
					props.onBlur?.(e);
				}}
			/>
		</View>
	);
});

const style = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderRadius: 30,
		paddingHorizontal: 24,
		backgroundColor: "#fff",
		borderColor: "#000000"
	},
	input: {
		padding: 0,
		fontFamily: Fonts.Inter_700Bold,
		fontWeight: "700",
		fontSize: 16,
		color: Colors.light.input
	},
	icon: {
		marginRight: 8,
		flexShrink: 0
	},
	clearIcon: {
		marginLeft: 8,
		flexShrink: 0,
		transform: "scale(1.25)"
	}
});
