import { EButton, ETouchable } from "@/components/e";
import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Path, Svg } from "react-native-svg";

const data = {
	title: "Lorem ipsum dolor sit amet",
	beginDate: "2024-07-26T08:00:00.000Z",
	endDate: "2024-07-26T08:00:00.000Z",
	imageUrl:
		"https://s3-alpha-sig.figma.com/img/38da/7121/4200dc29ab598d69be09040a453b0205?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XF9zP-rg7vfi2uzxzYm9FVYsAc1QtpwaBMSITZ5SpVS5Zbh0hlazvAvRbRqGrP7DltXCCE80KGzvBeUpQBxaNb0pQZMLMl~8wNhWGfzceURp0XX8Fk~jaxi9Ie1kiv-vUD-yUtb56jGIxNEOE11OX8Untdu1WxiagwN7SisaCwj1x1HNOR8ODYMICED2U70pB0C0WLk08aJBX1k9p9lBli2QKO-uUSAnN2-60N1LiJ-hrtrKJ5F82e6bo7ZREwoh9kzsr3HawqQGqfo8Ajuiyy7DLKHCHo2Emr8ra2P1vT6TeZeHWabwkiP6AUHXntmFybGQemEXwRQa-sRagPD1Fg__",
	content:
		"Lorem ipsum dolor sit amet consectetur. Amet arcu sed tellus pellentesque porttitor sit ultrices et. Elit bibendum augue orci ultrices accumsan mi massa. Et ultrices tortor cursus suscipit."
};

export default function GifeDetailScreen() {
	const insets = useSafeAreaInsets();

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />

			{/* navigationBar */}
			<View style={[styles.navigationBar, { paddingTop: insets.top }]}>
				<View style={styles.navigationHeader}>
					<ETouchable
						style={styles.gobackIcon}
						onPress={() => {
							router.back();
						}}
					>
						<ArrowLeftLineIcon />
					</ETouchable>
				</View>
			</View>

			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContentContainer}>
				<SafeAreaView>
					<View style={{ marginTop: -insets.top }}>
						<View style={styles.navigationBackground} />
						<Image style={styles.squareImage} source={{ uri: data.imageUrl }} />
					</View>

					<View style={styles.contentContainer}>
						<Text style={styles.title}>{data.title.toLocaleUpperCase()}</Text>

						{/* date */}
						<View style={styles.row}>
							<View style={styles.dateSquare}>
								<View style={styles.dateSquareMonthWrapper}>
									<Text>{"Jul"}</Text>
								</View>
								<View style={styles.dateSquareDayWrapper}>
									<Text>{"26"}</Text>
								</View>
							</View>

							<View>
								<Text style={styles.date}>{"Friday, July 26"}</Text>
								<Text style={styles.time}>{"9:00 AM to 10:00 AM PDT"}</Text>
							</View>
						</View>

						{/* discount */}
						<View style={styles.row}>
							<View style={styles.discountWrapper}>
								<DiscountPercentIcon />
							</View>

							<View>
								<Text style={styles.date}>{"-30%"}</Text>
								<Text style={styles.time}>{"Discount"}</Text>
							</View>
						</View>

						{/* location */}
						<View style={styles.row}>
							<View style={styles.locationWrapper}>
								<LocationIcon />
							</View>

							<View>
								<Text style={styles.date}>{"Yoyogi National Gymnasium"}</Text>
								<Text style={styles.time}>{"2 Chome-1-1 Jinnan, Shibuya City"}</Text>
							</View>
						</View>

						<Text style={styles.contentText}>{data.content}</Text>

						<EButton
							style={styles.claimButton}
							type="primary"
							title="Claim Now"
							onPress={() => {
								router.push("/(edcon)/gift/attend");
							}}
						/>
					</View>
				</SafeAreaView>
			</ScrollView>
		</View>
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

function LocationIcon() {
	return (
		<Svg width="24" height="25" viewBox="0 0 24 25" fill="none">
			<Path
				d="M6.72 17.14C6.97461 17.0657 7.24829 17.0957 7.48083 17.2232C7.71338 17.3507 7.88574 17.5654 7.96 17.82C8.03426 18.0746 8.00434 18.3483 7.87681 18.5808C7.74929 18.8134 7.53461 18.9857 7.28 19.06C6.78 19.206 6.42 19.36 6.189 19.5C6.427 19.643 6.803 19.803 7.325 19.952C8.48 20.282 10.133 20.5 12 20.5C13.867 20.5 15.52 20.282 16.675 19.952C17.198 19.803 17.573 19.643 17.811 19.5C17.581 19.36 17.221 19.206 16.721 19.06C16.4704 18.9825 16.2603 18.8096 16.136 18.5786C16.0117 18.3476 15.9831 18.077 16.0564 17.8251C16.1298 17.5733 16.2991 17.3603 16.528 17.2321C16.7569 17.104 17.0269 17.0709 17.28 17.14C17.948 17.335 18.56 17.585 19.03 17.906C19.465 18.205 20 18.726 20 19.5C20 20.283 19.452 20.808 19.01 21.107C18.532 21.429 17.907 21.68 17.224 21.875C15.846 22.27 14 22.5 12 22.5C10 22.5 8.154 22.27 6.776 21.875C6.093 21.68 5.468 21.429 4.99 21.107C4.548 20.807 4 20.283 4 19.5C4 18.726 4.535 18.205 4.97 17.906C5.44 17.585 6.052 17.335 6.72 17.14ZM12 2.5C13.9891 2.5 15.8968 3.29018 17.3033 4.6967C18.7098 6.10322 19.5 8.01088 19.5 10C19.5 12.568 18.1 14.656 16.65 16.14C16.035 16.768 15.39 17.309 14.797 17.755C14.203 18.201 12.845 19.037 12.845 19.037C12.5874 19.1834 12.2963 19.2604 12 19.2604C11.7037 19.2604 11.4126 19.1834 11.155 19.037C10.4808 18.6467 9.82907 18.2187 9.203 17.755C8.54554 17.2641 7.92611 16.7242 7.35 16.14C5.9 14.656 4.5 12.568 4.5 10C4.5 8.01088 5.29018 6.10322 6.6967 4.6967C8.10322 3.29018 10.0109 2.5 12 2.5ZM12 8C11.4696 8 10.9609 8.21071 10.5858 8.58579C10.2107 8.96086 10 9.46957 10 10C10 10.5304 10.2107 11.0391 10.5858 11.4142C10.9609 11.7893 11.4696 12 12 12C12.5304 12 13.0391 11.7893 13.4142 11.4142C13.7893 11.0391 14 10.5304 14 10C14 9.46957 13.7893 8.96086 13.4142 8.58579C13.0391 8.21071 12.5304 8 12 8Z"
				fill="#EB5851"
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.light.grayBackground
		// alignItems: 'center',
		// justifyContent: 'center',
	},

	navigationBar: {
		position: "absolute",
		zIndex: 1
	},

	navigationBackground: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0, // -insets.top,
		bottom: 0,
		backgroundColor: "#5BC9E3"
	},

	navigationHeader: {
		flexDirection: "row",
		height: 48,
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16
	},

	headerTitle: {
		fontFamily: Fonts.jomhuria,
		fontSize: 64,
		textAlign: "center",
		color: "#FFFFFF"
	},

	gobackIcon: {
		width: 48,
		height: 48,
		borderRadius: 40,
		borderColor: "#00000019",
		borderWidth: StyleSheet.hairlineWidth,

		backgroundColor: "#FFFFFF"
	},

	scrollContentContainer: {
		paddingBottom: 24,
		backgroundColor: "#FFFFFF",
		minHeight: "100%"
	},

	squareImage: {
		width: "100%",
		aspectRatio: 1
	},

	contentContainer: {
		marginTop: -30,
		padding: 24,
		backgroundColor: "#FFFFFF",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20
	},

	title: {
		fontFamily: Fonts.jomhuria,
		fontSize: 64,
		lineHeight: 64 * 0.6,
		paddingTop: 64 * 0.6 * 0.4
	},

	row: {
		flexDirection: "row",
		marginTop: 16,
		gap: 16
	},

	dateSquare: {
		height: 46,
		width: 44,
		borderWidth: 1,
		borderColor: "#7CD5EA",
		borderRadius: 8,
		overflow: "hidden"
	},

	dateSquareMonthWrapper: {
		height: 16,
		justifyContent: "center",
		backgroundColor: "#7CD5EA",
		alignItems: "center"
	},

	dateSquareDayWrapper: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},

	discountWrapper: {
		height: 46,
		width: 44,
		borderWidth: 1,
		borderRadius: 8,
		overflow: "hidden",
		borderColor: "#CDF2F7",
		justifyContent: "center",
		alignItems: "center"
	},

	locationWrapper: {
		height: 46,
		width: 44,
		borderWidth: 1,
		borderRadius: 8,
		overflow: "hidden",
		borderColor: "rgba(231, 100, 70, 0.24)",
		justifyContent: "center",
		alignItems: "center"
	},

	date: {
		fontFamily: Fonts.jomhuria,
		fontSize: 28,
		lineHeight: 28 * 0.6,
		paddingTop: 28 * 0.6 * 0.4
	},

	time: {
		fontFamily: Fonts.poppins,
		fontSize: 14,
		lineHeight: 21
	},

	contentText: {
		fontFamily: Fonts.Poppins_Regular,
		fontSize: 14,
		color: "#09244B",
		lineHeight: 19.6,
		marginTop: 24
	},

	claimButton: {
		alignSelf: "center",
		paddingHorizontal: 32,
		marginTop: 32
	}
});
