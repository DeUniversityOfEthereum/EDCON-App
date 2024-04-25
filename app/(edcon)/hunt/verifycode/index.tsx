import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import { EButton } from "@e";
import { UFormItem, UInput, USendCodeCountdown } from "@u";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useForm } from "react-hook-form";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Path, Svg } from "react-native-svg";
import { default as BackgroundGradient } from "../../components/BackgroundGradient";
import EdconHuntNavigationBar from "../components/NavigationBar";

const huntEmail = require("@/assets/images/edcon/edcon_email_image_1.png");

export default function VerificationScreen() {
	const {
		// handleSubmit:,
		control,
		// watch,
		formState: { errors }
	} = useForm<{ code: string }>({
		mode: "all",
		defaultValues: {
			code: ""
		}
	});

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />

			<BackgroundGradient />
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
				<SafeAreaView>
					<EdconHuntNavigationBar settingsShown={false} />

					<View style={styles.mianContainer}>
						<View style={styles.imageContainer}>
							<Image style={styles.image} source={huntEmail} />
						</View>

						<View style={styles.textContainer}>
							<Text style={styles.titleText}>{"Let’s set up your collection"}</Text>
							<Text style={styles.contentText}>
								{"Enter the "}
								<Text style={styles.contentTextAccent}>{"verification code "}</Text>
								{" you received to verify your email "}
							</Text>
						</View>

						<UFormItem
							style={{ width: "100%" }}
							errors={errors.code}
							name="code"
							control={control}
							rules={{
								required: "required"
							}}
							render={({ field }) => (
								<View style={styles.codeContainer}>
									<View style={styles.w_50}>
										<UInput
											{...field}
											icon={<CodeIcon />}
											style={styles.w_60}
											inputMode="numeric"
											placeholder={"Code"}
										/>
									</View>
									<View style={styles.w_50}>
										<USendCodeCountdown
											color="blue"
											submitBefore={() => {
												return Boolean("eamil");
											}}
											api={() => Promise.resolve(true)}
											params={{ email: "email", scope: "1" }}
										/>
									</View>
								</View>
							)}
						/>

						<EButton
							title={"Verification"}
							type="primary"
							style={styles.submitButton}
							onPress={() => {
								router.navigate({ pathname: "/(edcon)/hunt/tab" });
							}}
						/>
					</View>
				</SafeAreaView>
			</ScrollView>
		</View>
	);
}

function CodeIcon() {
	return (
		<Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<Path
				d="M13.6 2.39941C14.3381 2.39941 14.9427 2.97053 14.9962 3.69493L15 3.79941V12.1994C15 12.9375 14.4289 13.5421 13.7045 13.5956L13.6 13.5994H2.4C1.66195 13.5994 1.05728 13.0283 1.00384 12.3039L1 12.1994V3.79941C1 3.06136 1.57111 2.4567 2.29552 2.40325L2.4 2.39941H13.6ZM13.6 3.79941H2.4V12.1994H13.6V3.79941ZM11.5 9.39941C11.8866 9.39941 12.2 9.7128 12.2 10.0994C12.2 10.4584 11.9298 10.7543 11.5816 10.7947L11.5 10.7994H4.5C4.1134 10.7994 3.8 10.486 3.8 10.0994C3.8 9.74042 4.07023 9.44456 4.41837 9.40412L4.5 9.39941H11.5ZM5.2 7.29941C5.5866 7.29941 5.9 7.6128 5.9 7.99941C5.9 8.38602 5.5866 8.69941 5.2 8.69941H4.5C4.1134 8.69941 3.8 8.38602 3.8 7.99941C3.8 7.6128 4.1134 7.29941 4.5 7.29941H5.2ZM8.35 7.29941C8.73661 7.29941 9.05 7.6128 9.05 7.99941C9.05 8.35841 8.77978 8.65427 8.43164 8.69471L8.35 8.69941H7.65C7.26339 8.69941 6.95 8.38602 6.95 7.99941C6.95 7.64042 7.22022 7.34456 7.56836 7.30412L7.65 7.29941H8.35ZM11.5 7.29941C11.8866 7.29941 12.2 7.6128 12.2 7.99941C12.2 8.38602 11.8866 8.69941 11.5 8.69941H10.8C10.4134 8.69941 10.1 8.38602 10.1 7.99941C10.1 7.6128 10.4134 7.29941 10.8 7.29941H11.5ZM5.2 5.19941C5.5866 5.19941 5.9 5.51282 5.9 5.89941C5.9 6.2584 5.62977 6.55427 5.28163 6.5947L5.2 6.59941H4.5C4.1134 6.59941 3.8 6.28601 3.8 5.89941C3.8 5.54043 4.07023 5.24456 4.41837 5.20412L4.5 5.19941H5.2ZM8.35 5.19941C8.73661 5.19941 9.05 5.51282 9.05 5.89941C9.05 6.28601 8.73661 6.59941 8.35 6.59941H7.65C7.26339 6.59941 6.95 6.28601 6.95 5.89941C6.95 5.51282 7.26339 5.19941 7.65 5.19941H8.35ZM11.5 5.19941C11.8866 5.19941 12.2 5.51282 12.2 5.89941C12.2 6.2584 11.9298 6.55427 11.5816 6.5947L11.5 6.59941H10.8C10.4134 6.59941 10.1 6.28601 10.1 5.89941C10.1 5.54043 10.3702 5.24456 10.7184 5.20412L10.8 5.19941H11.5Z"
				fill="#CCCCCC"
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

	mianContainer: {
		marginTop: 24,
		paddingHorizontal: 16,
		alignItems: "center",
		gap: 24
	},

	imageContainer: {
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

	inputText: {
		fontFamily: Fonts.poppins,
		fontSize: 14,
		lineHeight: 21,
		letterSpacing: -0.4
	},

	contentTextAccent: {
		fontFamily: Fonts.Poppins_Bold,
		fontSize: 14,
		lineHeight: 21
	},

	codeContainer: {
		gap: 12,
		flexDirection: "row"
	},

	w_50: {
		flex: 1
	},
	w_60: {
		flex: 1
	},

	submitButton: {
		paddingHorizontal: 32
	}
});
