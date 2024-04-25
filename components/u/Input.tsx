import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import { View } from "@themed";
import { forwardRef, useState } from "react";
import { Animated, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

import type { TextInputProps, ViewProps, ViewStyle } from "react-native";
type UInputProps = {
	container?: {
		style?: ViewProps;
	};
	containerStyle?: ViewStyle;
	focusBorderColor?: string;
	icon?: React.ReactNode;
	onChange?: TextInputProps["onChangeText"];
} & Omit<
	TextInputProps,
	"inlineImageLeft" | "inlineImagePadding" | "clearButtonMode" | "underlineColorAndroid" | "onChange" | "onChangeText"
>;

export const UInput = forwardRef<null, UInputProps>((props, ref) => {
	const { container, icon, onChange, ...inputProps } = props;
	const [borderColor] = useState(new Animated.Value(0));

	const onAnimated = (toValue: number) => {
		Animated.timing(borderColor, {
			toValue: toValue,
			duration: 300, // 过渡时间
			useNativeDriver: false
		}).start();
	};

	const inputBorderColor = borderColor.interpolate({
		inputRange: [0, 1],
		outputRange: [Colors.light.border, props.focusBorderColor ?? Colors.light.primary] // 定义初始颜色和焦点时的颜色
	});

	const onClear = () => {
		props?.onChange?.("");
	};

	return (
		<Animated.View
			{...container}
			style={[
				style.container,
				props.containerStyle,
				{
					borderColor: inputBorderColor,
					paddingVertical: inputProps.multiline ? 12 : 2
				}
			]}
		>
			{icon && <View style={style.icon}>{icon}</View>}

			<TextInput
				{...inputProps}
				ref={ref}
				onChangeText={onChange}
				style={[
					style.input,
					{
						width: inputProps.multiline ? "100%" : icon ? "86%" : "94%",
						height: inputProps.multiline ? "auto" : 48
					},
					props.style
				]}
				placeholderTextColor={Colors.light.placeholder}
				onFocus={e => {
					onAnimated(1);
					props?.onFocus?.(e);
				}}
				onBlur={e => {
					onAnimated(0);
					props.onBlur?.(e);
				}}
			/>

			{!!props?.value && !inputProps.multiline && (
				<View style={style.clearIcon}>
					<TouchableOpacity onPress={() => onClear()}>
						<ClearIcon />
					</TouchableOpacity>
				</View>
			)}
		</Animated.View>
	);
});

const style = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderRadius: 24,
		paddingHorizontal: 24,
		backgroundColor: "#fff"
	},
	input: {
		padding: 0,
		fontFamily: Fonts.Inter_700Bold,
		fontWeight: "700",
		fontSize: 16,
		lineHeight: 24,
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

function ClearIcon() {
	return (
		<Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<Path
				d="M12.5255 3.47455C12.2131 3.16213 11.7066 3.16213 11.3941 3.47455L8.00003 6.86866L4.60592 3.47455C4.2935 3.16213 3.78697 3.16213 3.47455 3.47455C3.16213 3.78697 3.16213 4.2935 3.47455 4.60592L6.86866 8.00003L3.47455 11.3941C3.16213 11.7066 3.16213 12.2131 3.47455 12.5255C3.78697 12.8379 4.2935 12.8379 4.60592 12.5255L8.00003 9.1314L11.3941 12.5255C11.7066 12.8379 12.2131 12.8379 12.5255 12.5255C12.8379 12.2131 12.8379 11.7066 12.5255 11.3941L9.1314 8.00003L12.5255 4.60592C12.8379 4.2935 12.8379 3.78697 12.5255 3.47455Z"
				fill="#ccc"
			/>
		</Svg>
	);
}
