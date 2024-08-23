import { Button } from "@/app/(edcon)/components";
import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import { router } from "expo-router";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Animated, StyleProp, StyleSheet, Text, TextProps, View, ViewProps, ViewStyle } from "react-native";
import Svg, { Path } from "react-native-svg";
import { EDot } from "./Dot";

import type { Route } from "expo-router";
type UNavbarProps = {
	title?: string | React.ReactNode;
	titleStyle?: TextProps["style"];
	route?: Route<string>;
	right?: React.ReactNode;
	rightStyle?: ViewProps["style"];
	customTitle?: React.ReactNode;
	style?: StyleProp<ViewStyle>;
	leftShown?: boolean;
	leftOnPress?: () => void;
	rightOnPress?: () => void;
	rightBadgeShwon?: boolean;
};

export interface ENavbarRef {
	changeBackground: (value: number) => void;
}

export const useENavbarRef = useRef<ENavbarRef>;

export const ENavbar = forwardRef<ENavbarRef, UNavbarProps>((props, ref) => {
	const { route, title, right, rightStyle, customTitle, leftShown = true } = props;
	const onRouter = () => {
		if (!leftShown) {
			return;
		}
		if (props.leftOnPress) {
			props.leftOnPress();
		} else if (route) {
			router.push(route);
		} else {
			router.back();
		}
	};

	const onRight = () => {
		if (props.rightOnPress) {
			props.rightOnPress();
		}
	};
	const colorAni = new Animated.Value(0);
	const bgcolor = colorAni.interpolate({ inputRange: [0, 1], outputRange: ["#F4F1F500", "#F4F1F5"] });

	useImperativeHandle(ref, () => {
		return {
			changeBackground: value => {
				colorAni.setValue(value);
			}
		};
	});

	return (
		<Animated.View style={[styles.wrapper, props.style, { backgroundColor: bgcolor }]}>
			<View style={styles.content}>
				<View style={styles.leftContainer}>
					{leftShown && (
						<Button style={[styles.icon, { opacity: leftShown ? 1 : 0 }]} onPress={() => onRouter()}>
							<ArrowLeftLineIcon />
						</Button>
					)}
				</View>

				{customTitle !== undefined ? (
					customTitle
				) : (
					<Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
						{title}
					</Text>
				)}
				{/* </View> */}

				<View style={styles.rightContainer}>
					{props.rightOnPress ? (
						<View>
							<Button style={[rightStyle ?? styles.icon, { opacity: right ? 1 : 0 }]} onPress={onRight}>
								{right}
							</Button>
							{props.rightBadgeShwon && <EDot />}
						</View>
					) : (
						right
					)}
				</View>
			</View>
		</Animated.View>
	);
});

function ArrowLeftLineIcon() {
	return (
		<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<Path
				d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"
				fill="black"
			/>
		</Svg>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: 16
		// marginVertical: 8
	},
	content: {
		height: 48,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	leftContainer: {
		flex: 1
	},
	rightContainer: {
		flex: 1,
		alignItems: "flex-end"
	},
	titleContainer: {
		flex: 2,
		alignItems: "center"
	},
	center: {
		alignItems: "center",
		justifyContent: "center"
	},
	icon: {
		width: 40,
		height: 40,
		borderRadius: 40,
		borderColor: Colors.light.border,
		// borderWidth: StyleSheet.hairlineWidth,
		borderWidth: 1,
		backgroundColor: "#FFFFFF",
		alignItems: "center",
		justifyContent: "center"
	},
	title: {
		// flex: 2,
		paddingHorizontal: 12,
		textAlign: "center",
		fontSize: 18,
		fontWeight: "bold",
		fontFamily: Fonts.Inter_600SemiBold
	}
});
