import { EButton } from "@/components/e";
import Fonts from "@constants/Fonts";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Path, Svg } from "react-native-svg";
import { default as BackgroundGradient } from "../components/BackgroundGradient";

const navigationBar = {
	edcon: require("@/assets/images/edcon/nav_title_edcon.png")
};

const hunt = {
	background: require("@/assets/images/edcon/edcon_background_noise.png"),
	image1: require("@/assets/images/edcon/edcon_hunt_image_1.png"),
	image2: require("@/assets/images/edcon/edcon_hunt_image_2.png")
};

export default function HuntScreen() {
	const data = {
		title: "Welcome",
		detail:
			"Welcome to the EDCON POAP Passport! Keep track of all the POAPs available, unlock Trivias, and put your Web3 knowledge to the test!"
	};

	const screenWidth = Dimensions.get("window").width;
	const padding = 16;
	const imageWidth = screenWidth - padding * 2;
	const imageHeight = imageWidth / (360 / 320);

	const insets = useSafeAreaInsets();
	const [checkboxSelected, setCheckboxSelected] = useState(false);

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />

			<BackgroundGradient />

			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={{ paddingTop: insets.top, alignItems: "center" }}>
					<Image source={navigationBar.edcon} />
				</View>

				<View style={styles.mainContainer}>
					<View style={{ width: imageWidth, height: imageHeight }}>
						<Image style={styles.image} source={hunt.image1} />
						<View style={[styles.overlayer, styles.center]}>
							<Image style={{ width: imageWidth * 0.6, height: imageWidth * 0.6 }} source={hunt.image2} />
						</View>
					</View>

					<View style={styles.textContainer}>
						<Text style={styles.titleText}>{data.title}</Text>
						<Text style={styles.contentText}>{data.detail}</Text>
					</View>

					<View style={styles.privacyContainer}>
						<Pressable
							style={[styles.checkbox, !checkboxSelected ? styles.checkboxNormal : {}]}
							onPress={() => {
								setCheckboxSelected(!checkboxSelected);
							}}
						>
							{checkboxSelected && <CheckboxIcon18 />}
						</Pressable>
						<Text style={[styles.contentText, { flex: 1 }]}>
							{"I have read and accepted the Terms & Conditions and Privacy Policy."}
						</Text>
					</View>

					<EButton
						title={"Start"}
						type="primary"
						style={styles.submitButtom}
						onPress={() => {
							router.navigate({ pathname: "/(edcon)/hunt/email" });
						}}
					/>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
		// alignItems: 'center',
		// justifyContent: 'center',
	},

	overlayer: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	},
	center: {
		justifyContent: "center",
		alignItems: "center"
	},
	image: {
		width: "100%",
		height: "100%",
		resizeMode: "contain"
	},

	mainContainer: {
		marginTop: 32,
		paddingHorizontal: 16,
		paddingBottom: 32,
		alignItems: "center"
	},

	textContainer: {
		alignItems: "center",
		marginTop: 40,
		gap: 8
	},

	titleText: {
		fontFamily: Fonts.poppins,
		fontSize: 24,
		lineHeight: 36
	},

	contentText: {
		fontFamily: Fonts.poppins,
		fontSize: 14,
		lineHeight: 21
	},

	privacyContainer: {
		marginTop: 32,
		flexDirection: "row",
		gap: 8
	},

	checkbox: {
		width: 24,
		height: 24,
		justifyContent: "center",
		alignItems: "center"
	},

	checkboxNormal: {
		borderWidth: 1,
		borderRadius: 5,
		borderColor: "#00000019"
	},

	submitButtom: {
		marginTop: 46,
		paddingHorizontal: 32
	}
});

function CheckboxIcon18() {
	return (
		<Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
			<Path
				d="M1 0H17C17.5523 0 18 0.44772 18 1V17C18 17.5523 17.5523 18 17 18H1C0.44772 18 0 17.5523 0 17V1C0 0.44772 0.44772 0 1 0ZM8.0026 13L15.0737 5.92893L13.6595 4.51472L8.0026 10.1716L5.17421 7.3431L3.75999 8.7574L8.0026 13Z"
				fill="#0075FF"
			/>
		</Svg>
	);
}
