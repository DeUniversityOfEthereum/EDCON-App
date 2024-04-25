import Colors from "@constants/Colors";
import { Text, View } from "@themed";
import { Controller } from "react-hook-form";
import { StyleSheet } from "react-native";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

import type { ControllerProps, FieldPath, FieldValues, GlobalError, UseControllerProps } from "react-hook-form";
import type { TextStyle, ViewStyle } from "react-native";
type UFormItemProps<T extends FieldValues, TName extends FieldPath<T>> = {
	label?: string;
	required?: boolean;
	errors?: GlobalError;
	style?: ViewStyle;
	labelStyle?: TextStyle;
	border?: boolean;
} & ControllerProps<T, TName> &
	UseControllerProps<T, TName>;

export function UFormItem<T extends FieldValues, TName extends FieldPath<T>>(props: UFormItemProps<T, TName>) {
	const { name, control, rules, label, required, errors, style, labelStyle, render } = props;
	return (
		<View key={name} style={[defaultStyle.formItem, style]}>
			{label && (
				<View style={defaultStyle.labelContainer}>
					{required && <Text style={defaultStyle.required}>*</Text>}
					<Text style={[defaultStyle.labelText, labelStyle]}>{label}</Text>
				</View>
			)}

			<View>
				<Controller name={name} control={control} rules={rules} render={render} />
			</View>
			<View style={defaultStyle.messageContainer}>
				{errors?.message && <WarnIcon />}
				<Text style={defaultStyle.message}>{errors?.message}</Text>
			</View>
		</View>
	);
}

function WarnIcon() {
	return (
		<Svg width="16" height="16" viewBox="0 0 16 16" fill={"none"}>
			<G clip-path="url(#clip0_2273_10064)">
				<Path
					d="M16 8C16 3.58172 12.4183 1.35191e-06 8 0C3.58172 -2.44784e-06 1.35191e-06 3.58172 0 8C-2.44784e-06 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8ZM8.57143 3.42892V9.71429H7.42857V3.42892H8.57143ZM7.30776 11.4286H8.67919V12.8H7.30776V11.4286Z"
					fill={Colors.light.red}
				/>
			</G>
			<Defs>
				<ClipPath id="clip0_2273_10064">
					<Rect width="16" height="16" fill="white" />
				</ClipPath>
			</Defs>
		</Svg>
	);
}

const defaultStyle = StyleSheet.create({
	formItem: {
		position: "relative",
		paddingBottom: 24
	},
	labelContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16
	},
	labelText: {
		fontSize: 16,
		color: Colors.light.gray6,
		lineHeight: 24
	},
	required: {
		color: Colors.light.warning,
		width: 16,
		height: 18,
		lineHeight: 22,
		fontSize: 18,
		fontWeight: "700"
	},
	messageContainer: {
		position: "absolute",
		left: 0,
		bottom: 4,
		flexDirection: "row",
		alignItems: "center"
	},
	message: {
		paddingLeft: 8,
		fontSize: 12,
		color: Colors.light.red,
		textDecorationStyle: "solid",
		textDecorationLine: "underline"
	}
});
