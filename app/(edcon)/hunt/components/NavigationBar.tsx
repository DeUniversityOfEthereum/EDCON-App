import { Text } from "@/components/Themed";
import { UPressable } from "@/components/u";
import Fonts from "@constants/Fonts";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

import { Button } from "@/app/(edcon)/components";

type EdconHuntNavigationBarProps = {
	settingsShown?: boolean;
	title?: string;
	onGoback?: () => void;
};

export default function EdconHuntNavigationBar(props: EdconHuntNavigationBarProps) {
	const onTitlePress = () => {
		if (router.canGoBack()) {
			router.navigate("/edcon/");
		}
	};
	const onGoback = () => {
		if (props.onGoback) {
			props.onGoback();
		} else {
			router.back();
		}
	};

	return (
		<SafeAreaView edges={["top", "left", "right"]}>
			<View style={styles.navigationHeader}>
				<Button style={styles.gobackIcon} onPress={onGoback}>
					<ArrowLeftLineIcon />
				</Button>

				<View style={[styles.background, styles.center]}>
					<UPressable style={styles.titleContainer} onPress={onTitlePress}>
						{props.title ? (
							<Text style={styles.headerTitle}>{props.title}</Text>
						) : (
							<Image
								style={styles.navigationTitleImage}
								source={require("@/assets/images/edcon/nav_title_edcon.png")}
							/>
						)}
					</UPressable>
				</View>
			</View>
		</SafeAreaView>
	);
}

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
	navigationHeader: {
		flexDirection: "row",
		height: 48,
		justifyContent: "space-between",
		alignItems: "center"
	},

	headerTitle: {
		fontFamily: Fonts.Inter_600SemiBold,
		fontSize: 24
	},

	gobackIcon: {
		width: 48,
		height: 48,
		borderRadius: 40
		// borderColor: Colors.light.border,
		// borderWidth: StyleSheet.hairlineWidth

		// backgroundColor: "#FFFFFF"
	},

	background: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: -1
	},

	titleContainer: {},

	navigationTitleImage: {
		aspectRatio: 394 / 106,
		height: 41,
		resizeMode: "contain"
	},

	center: {
		alignItems: "center",
		justifyContent: "center"
	},

	image: {
		width: "100%",
		height: "100%",
		resizeMode: "contain"
	},

	titleText: {
		fontFamily: Fonts.poppins,
		fontSize: 24,
		lineHeight: 36,
		textAlign: "center"
	}
});
