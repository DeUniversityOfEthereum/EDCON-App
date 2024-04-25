import { EButton } from "@/components/e";
import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View, type LayoutChangeEvent } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Defs, LinearGradient, Path, Rect, Stop, Svg, type NumberProp } from "react-native-svg";

import type { ParamListBase } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { Route } from "@react-navigation/routers";
type NavigationPorps = {
	navigation: NativeStackNavigationProp<ParamListBase>;
	route: Route<string>;
};

const rewardAttend = {
	image1: require("@/assets/images/edcon/edcon_reward_attend_1.png")
};
const data = {
	title: "Lorem ipsum dolor sit amet",
	beginDate: "2024-07-26T08:00:00.000Z",
	endDate: "2024-07-26T08:00:00.000Z",
	imageUrl:
		"https://s3-alpha-sig.figma.com/img/38da/7121/4200dc29ab598d69be09040a453b0205?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XF9zP-rg7vfi2uzxzYm9FVYsAc1QtpwaBMSITZ5SpVS5Zbh0hlazvAvRbRqGrP7DltXCCE80KGzvBeUpQBxaNb0pQZMLMl~8wNhWGfzceURp0XX8Fk~jaxi9Ie1kiv-vUD-yUtb56jGIxNEOE11OX8Untdu1WxiagwN7SisaCwj1x1HNOR8ODYMICED2U70pB0C0WLk08aJBX1k9p9lBli2QKO-uUSAnN2-60N1LiJ-hrtrKJ5F82e6bo7ZREwoh9kzsr3HawqQGqfo8Ajuiyy7DLKHCHo2Emr8ra2P1vT6TeZeHWabwkiP6AUHXntmFybGQemEXwRQa-sRagPD1Fg__",
	content:
		"Lorem ipsum dolor sit amet consectetur. Amet arcu sed tellus pellentesque porttitor sit ultrices et. Elit bibendum augue orci ultrices accumsan mi massa. Et ultrices tortor cursus suscipit."
};

export default function GiftAttendScreen(porps: NavigationPorps) {
	const goBack = () => {
		if (porps.navigation?.goBack) {
			porps.navigation.goBack();
		} else {
			router.back();
		}
	};

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<SafeAreaView style={styles.container}>
				<View style={styles.navigationBar}>
					<Pressable onPress={goBack}>
						<ArrowLeftIcon />
					</Pressable>

					<View style={styles.navigationTitleWrapper}>
						<Image
							style={styles.navigationTitleImage}
							source={{ uri: "https://ueth.s3.us-west-2.amazonaws.com/public/prod/app.ueth.org/logo.png" }}
						/>
						<Text style={styles.navigationTitle}>{"UETH"}</Text>
					</View>

					<Pressable
						onPress={() => {
							router.navigate("/(ueth)/notification");
						}}
					>
						<NotificationIcon24 />
					</Pressable>
				</View>

				<View style={styles.mainContainer}>
					<View style={styles.overlayer}>
						<TicketBackground />
					</View>

					<ScrollView showsVerticalScrollIndicator={false}>
						<Image style={styles.squareImage} source={{ uri: data.imageUrl }} />

						<Image style={styles.infoWrapperBottomImage} source={rewardAttend.image1} />

						<View style={styles.infoWrapper}>
							<View style={[styles.overlayer, styles.tiketInfoBackground]}>
								<InfoBackground />
							</View>

							{/* discount */}
							<View style={styles.discountWrapper}>
								<View style={styles.discountIconWrapper}>
									<DiscountPercentIcon />
								</View>

								<View>
									<Text style={styles.discountTitle}>{"-30%"}</Text>
									<Text style={styles.discountSubitle}>{"Discount"}</Text>
								</View>
							</View>

							<View style={styles.line} />

							<View style={styles.barcodeInfoWrapper}>
								<Image style={styles.barcode} />

								<Text style={styles.barcodeNo}>{"111 222 333"}</Text>
								<Text style={styles.barcodeDetail}>{"Validity of the cancellation code"}</Text>
								<Text style={styles.barcodeDate}>{"2024-07-26 15:00:00  -  2024-07-30 23:59:59"}</Text>
							</View>

							<View style={styles.line} />

							<View style={styles.ruleWrapper}>
								<Text style={styles.ruleText}>{"Rule specification"}</Text>
								<Text style={[styles.ruleText, { flex: 1 }]}>
									{
										"Lorem ipsum dolor sit amet consectetur. Elit bibendum augue orci ultrices accumsan mi massa. Et ultrices tortor cursus suscipit."
									}
								</Text>
							</View>
						</View>
					</ScrollView>
				</View>

				<EButton style={styles.cancelButton} title="Cancelled" type="primary" />
			</SafeAreaView>
		</View>
	);
}

function ArrowLeftIcon() {
	return (
		<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<Path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M13.6894 5.22532C14.0602 4.70629 14.7787 4.65373 15.2134 5.11385L15.3034 5.20915C15.6535 5.57971 15.6992 6.16386 15.4114 6.59031L10.9593 12.0336L15.4114 17.4094C15.6991 17.8358 15.6534 18.4199 15.3034 18.7905L15.2133 18.8858C14.7786 19.3459 14.0601 19.2934 13.6893 18.7743L8.60504 12.6802C8.33179 12.2977 8.33179 11.7696 8.60504 11.3871L13.6894 5.22532Z"
				fill="#222222"
			/>
		</Svg>
	);
}

function TicketBackground() {
	const [height, setHeight] = useState<NumberProp>("100%");
	const [width, setWidth] = useState<NumberProp>("100%");
	const onLayout = (e: LayoutChangeEvent) => {
		setHeight(e.nativeEvent.layout.height - 1.5);
		setWidth(e.nativeEvent.layout.width - 1.5);
	};

	return (
		<Svg width="100%" height="100%" fill="none" onLayout={onLayout}>
			<Rect x="0" y="0" width={width} height={height} rx="24" fill="url(#paint0_linear_2438_4255)" />
			<Rect
				x="1.25"
				y="0.75"
				width={width}
				height={height}
				rx="23.25"
				stroke="black"
				strokeOpacity="0.06"
				strokeWidth="1.5"
			/>
			<Defs>
				<LinearGradient id="paint0_linear_2438_4255" gradientUnits="userSpaceOnUse">
					<Stop stopColor="#FEFEFE" />
					<Stop offset="0.355" stopColor="#E9E9E9" />
					<Stop offset="0.525" stopColor="#F7F7F7" />
					<Stop offset="0.68" stopColor="#E7E7E7" />
					<Stop offset="1" stopColor="#EBEBEB" />
				</LinearGradient>
			</Defs>
		</Svg>
	);
}

function InfoBackground() {
	const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
	const borderRadius = 20;

	const onLayout = (e: LayoutChangeEvent) => {
		setSize(e.nativeEvent.layout);
	};

	const createPath = (width: number, height: number) => {
		return `M0.0419922 0
		H${width}
		V71.7166
		C${width - 7} 71.7166 ${width - 12.042} 77.798 ${width - 12.042} 85.2999
		C${width - 12.042} 92.8018 ${width - 7} 98.8832 ${width} 98.8832
		V${height - borderRadius}
		C${width} ${height - borderRadius / 2} ${width - borderRadius / 2} ${height} ${width - borderRadius} ${height}
		H20.042
		C8.99629 ${height} 0.0419922 ${height - borderRadius / 2}  0.0419922 ${height - borderRadius}
		V98.8837
		C6.66941 98.8837 12.042 92.8023 12.042 85.3004
		C12.042 77.7985 6.66941 71.7171 0.0419922 71.7171
		V0Z`;
	};

	const d = size.width > 0 ? createPath(size.width, size.height) : "";

	return (
		<Svg width="100%" height="100%" fill="none" onLayout={onLayout}>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d={d} //"M0.0419922 0H294.042V71.7166C287.415 71.7166 282.042 77.798 282.042 85.2999C282.042 92.8018 287.415 98.8832 294.042 98.8832V306C294.042 317.046 285.088 326 274.042 326H20.042C8.99629 326 0.0419922 317.046 0.0419922 306V98.8837C6.66941 98.8837 12.042 92.8023 12.042 85.3004C12.042 77.7985 6.66941 71.7171 0.0419922 71.7171V0Z"
				fill="white"
			/>
		</Svg>
	);
}

function DiscountPercentIcon() {
	return (
		<Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
			<Path
				d="M14.4471 2.59411C13.3258 1.63855 11.6766 1.63856 10.5554 2.5941L9.20733 3.74286C9.04716 3.87935 8.84803 3.96183 8.63826 3.97857L6.87278 4.11946C5.40424 4.23665 4.23812 5.40278 4.12093 6.8713L3.98005 8.63678C3.96332 8.84654 3.88081 9.04573 3.74432 9.20589L2.59556 10.5539C1.64002 11.6752 1.64003 13.3243 2.59558 14.4455L3.74434 15.7936C3.88081 15.9538 3.96329 16.1529 3.98004 16.3627L4.12095 18.1281C4.23814 19.5966 5.40428 20.7627 6.87282 20.8799L8.63827 21.0209C8.84803 21.0376 9.04713 21.1201 9.20729 21.2566L10.5553 22.4053C11.6766 23.3608 13.3258 23.3609 14.4471 22.4053L15.7951 21.2566C15.9552 21.1201 16.1543 21.0376 16.3641 21.0208L18.1296 20.8799C19.5981 20.7628 20.7642 19.5967 20.8815 18.1281L21.0223 16.3627C21.039 16.1529 21.1216 15.9537 21.258 15.7935L22.4068 14.4456C23.3624 13.3243 23.3624 11.6751 22.4068 10.5539L21.258 9.20585C21.1215 9.04568 21.0391 8.84654 21.0224 8.63679L20.8815 6.87131C20.7643 5.4028 19.5981 4.23663 18.1296 4.11945L16.3641 3.97856C16.1543 3.96182 15.9552 3.87935 15.7951 3.74286L14.4471 2.59411ZM15.3294 8.25718L16.7436 9.6714L9.67248 16.7425L8.25828 15.3282L15.3294 8.25718ZM10.7332 10.732C10.1474 11.3178 9.19762 11.3178 8.61183 10.732C8.02604 10.1463 8.02604 9.19652 8.61183 8.61073C9.19762 8.02494 10.1474 8.02494 10.7332 8.61073C11.319 9.19652 11.319 10.1463 10.7332 10.732ZM14.2687 16.3889C13.6829 15.8031 13.6829 14.8534 14.2687 14.2676C14.8545 13.6818 15.8042 13.6818 16.39 14.2676C16.9758 14.8534 16.9758 15.8031 16.39 16.3889C15.8042 16.9747 14.8545 16.9747 14.2687 16.3889Z"
				fill="#3FBDDB"
			/>
		</Svg>
	);
}

function NotificationIcon24() {
	return (
		<Svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ width: 24, height: 24 }}>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M21.9468 18.1591C21.7305 18.8081 21.1983 19.3053 20.5302 19.4528C19.1284 19.7622 17.7139 19.9944 16.2931 20.1494C15.5048 21.7218 13.8782 22.8012 11.9995 22.8012C10.1208 22.8012 8.49416 21.7218 7.70588 20.1494C6.28506 19.9944 4.87058 19.7622 3.46874 19.4528C2.80067 19.3053 2.26847 18.8081 2.05212 18.1591C1.52957 16.5914 1.93758 14.8631 3.10605 13.6946L3.79817 13.0025C4.42182 12.3788 4.6823 11.4738 4.49097 10.6129C3.42224 5.80359 7.07288 1.20117 11.9995 1.20117C16.9261 1.20117 20.5767 5.80359 19.508 10.6129C19.3167 11.4738 19.5771 12.3788 20.2008 13.0025L20.8929 13.6946C22.0614 14.8631 22.4694 16.5914 21.9468 18.1591ZM18.5037 14.6995L19.1959 15.3917C19.6649 15.8607 19.8616 16.5303 19.7315 17.1702C14.6339 18.2539 9.36506 18.2539 4.26748 17.1702C4.13738 16.5303 4.33405 15.8607 4.8031 15.3917L5.49522 14.6995C6.7035 13.4913 7.2018 11.7481 6.83382 10.0922C6.09417 6.76381 8.62664 3.60117 11.9995 3.60117C15.3723 3.60117 17.9048 6.76381 17.1651 10.0922C16.7972 11.7481 17.2955 13.4913 18.5037 14.6995Z"
				fill="#222222"
			/>
		</Svg>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.light.pageBg
		// alignItems: "center",
	},

	overlayer: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
	},

	navigationBar: {
		paddingHorizontal: 16,
		height: 44,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},

	navigationTitleWrapper: {
		flexDirection: "row",
		gap: 8,
		alignItems: "center"
	},

	navigationTitleImage: {
		width: 32,
		height: 32,
		resizeMode: "contain"
	},

	navigationTitle: {
		fontFamily: Fonts.Inter_600SemiBold,
		fontSize: 16
	},

	mainContainer: {
		flex: 1,
		marginHorizontal: 16,
		marginTop: 24,
		padding: 16
	},

	text: {
		fontFamily: Fonts.Inter_900Black,
		fontSize: 30,
		lineHeight: 36.31
	},

	squareImage: {
		width: "100%",
		aspectRatio: 1.15,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20
	},

	infoWrapperBottomImage: {
		width: 64,
		height: 83,
		position: "absolute",
		right: -8,
		bottom: 10
	},

	infoWrapper: {
		marginTop: 16,
		marginHorizontal: 15.5,
		paddingHorizontal: 16,
		gap: 16
	},

	tiketInfoBackground: {
		shadowOpacity: 0.15,
		shadowOffset: { width: 0, height: 6 },
		shadowColor: "#000000"
	},

	discountWrapper: {
		flexDirection: "row",
		marginTop: 16,
		gap: 16,
		alignSelf: "center"
	},

	discountIconWrapper: {
		height: 46,
		width: 44,
		borderWidth: 1,
		borderRadius: 8,
		overflow: "hidden",
		borderColor: "#CDF2F7",
		justifyContent: "center",
		alignItems: "center"
	},

	discountTitle: {
		fontFamily: Fonts.jomhuria,
		fontSize: 28,
		lineHeight: 28 * 0.6,
		paddingTop: 28 * 0.6 * 0.4
	},

	discountSubitle: {
		fontFamily: Fonts.poppins,
		fontSize: 14,
		lineHeight: 21
	},

	line: {
		left: 0,
		right: 0,
		height: 1,
		backgroundColor: "#efefef"
	},

	barcode: {
		width: "100%",
		height: 52,
		backgroundColor: "#efefef"
	},

	barcodeInfoWrapper: {
		gap: 4,
		alignItems: "center"
	},

	barcodeNo: {
		fontFamily: Fonts.Inter_500Medium,
		fontSize: 16
	},

	barcodeDetail: {
		fontFamily: Fonts.Inter_500Medium,
		fontSize: 13,
		opacity: 0.3
	},

	barcodeDate: {
		fontFamily: Fonts.Inter_500Medium,
		fontSize: 12,
		opacity: 0.3
	},

	ruleWrapper: {
		marginTop: -8,
		flexDirection: "row",
		gap: 8
	},

	ruleText: {
		fontFamily: Fonts.poppins,
		fontSize: 11,
		opacity: 0.2
	},

	cancelButton: {
		marginTop: 24,
		marginBottom: 24,
		alignSelf: "center",
		paddingHorizontal: 32
	}
});
