/* eslint-disable @typescript-eslint/no-unused-vars */
import { regexp_email } from "@/utils/regexp";
import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import { EButton } from "@e";
import { UFormItem, UInput } from "@u";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useForm } from "react-hook-form";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Path, Svg } from "react-native-svg";
import { default as BackgroundGradient } from "../../components/BackgroundGradient";
import EdconHuntNavigationBar from "../components/NavigationBar";

const huntEmail = require("@/assets/images/edcon/edcon_email_image_1.png");
export default function EmailScreen() {
	const {
		handleSubmit,
		control,
		watch,
		formState: { errors }
	} = useForm<{ email: string }>({
		mode: "all",
		defaultValues: {
			email: ""
		}
	});

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />

			<BackgroundGradient />
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
				<SafeAreaView>
					<EdconHuntNavigationBar settingsShown={false} />

					<View style={styles.mainContainer}>
						<View style={styles.largeImageContainer}>
							<Image style={styles.image} source={huntEmail} />
						</View>

						<View style={styles.textContainer}>
							<Text style={styles.titleText}>{"Let’s set up your collection"}</Text>
							<Text style={styles.contentText}>
								{"Enter the "}
								<Text style={styles.contentTextAccent}>{"Email"}</Text>
								{" you want to use for your collection"}
							</Text>
						</View>

						<UFormItem
							style={styles.inputFormItem}
							required
							name="email"
							control={control}
							errors={errors.email}
							rules={{
								required: "required",
								pattern: {
									value: regexp_email,
									message: "required"
								}
							}}
							render={({ field }) => (
								<UInput
									{...field}
									style={styles.inputText}
									focusBorderColor={"#D9D9D9"}
									placeholder={"Enter your email"}
									icon={<EmailIcon24 />}
								/>
							)}
						/>

						<EButton
							title={"Link Address"}
							type="primary"
							style={styles.submitButton}
							onPress={() => {
								router.navigate({ pathname: "/(edcon)/hunt/verifycode" });
							}}
						/>
					</View>
				</SafeAreaView>
			</ScrollView>
		</View>
	);
}

function EmailIcon24() {
	return (
		<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<Path
				d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"
				fill="black"
			/>
		</Svg>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.light.grayBackground
		// alignItems: 'center',
		// justifyContent: 'center',
	},

	navigationHeader: {
		flexDirection: "row",
		height: 48,
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16
	},

	headerTitle: {
		fontFamily: Fonts.Inter_600SemiBold,
		fontSize: 16
	},

	tileText: {
		fontFamily: Fonts.Poppins_Regular,
		fontSize: 14
	},

	gobackIcon: {
		width: 48,
		height: 48,
		borderRadius: 40,
		borderColor: "#00000019",
		borderWidth: StyleSheet.hairlineWidth

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

	center: {
		alignItems: "center",
		justifyContent: "center"
	},

	image: {
		width: "100%",
		height: "100%",
		resizeMode: "contain"
	},

	mainContainer: {
		marginTop: 24,
		paddingHorizontal: 16,
		alignItems: "center",
		gap: 24
	},

	largeImageContainer: {
		width: 120,
		height: 120
	},

	textContainer: {
		gap: 8
	},

	titleText: {
		fontFamily: Fonts.poppins,
		fontSize: 24,
		lineHeight: 36,
		textAlign: "center"
	},

	contentText: {
		fontFamily: Fonts.poppins,
		fontSize: 14,
		lineHeight: 21,
		letterSpacing: -0.4,
		textAlign: "center"
	},

	contentTextAccent: {
		fontFamily: Fonts.Poppins_Bold,
		fontSize: 14,
		lineHeight: 21
	},

	inputFormItem: {
		width: "100%"
	},

	inputText: {
		fontFamily: Fonts.poppins,
		fontSize: 14,
		lineHeight: 21,
		letterSpacing: -0.4
	},

	submitButton: {
		paddingHorizontal: 32
	}
});
