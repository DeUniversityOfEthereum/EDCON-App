import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import { ETouchable } from "@e";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Path, Svg } from "react-native-svg";
import { default as BackgroundGradient } from "../../components/BackgroundGradient";
import { ScrollSegment } from "../../components/Segment";
import EdconHuntNavigationBar from "../components/NavigationBar";

export default function BadgeDetailScreen() {
	const desc =
		"Oops, you're late and #Split#this collectible is no longer available to collect.#Split# Better luck next time!";
	const textCmps = desc.split("#Split#");

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />

			<BackgroundGradient />
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContentContainer}>
				<SafeAreaView>
					<EdconHuntNavigationBar />

					<View style={styles.mainContainer}>
						<Text style={styles.titleText}>{"Lorem ipsum"}</Text>

						<ScrollSegment
							items={[{ title: "MISSED" }]}
							selectedIndex={-1}
							bounces={false}
							itemContainerStyle={() => {
								return { height: 42, borderRadius: 21, paddingHorizontal: 20, backgroundColor: "#FFFFFF" };
							}}
							renderItem={function (item) {
								return (
									<View>
										<Text style={styles.contentTextAccent}>{item.title}</Text>
									</View>
								);
							}}
							onChange={function (): void {}}
						/>

						<View style={styles.badgeImageWrapper}>
							<Image style={{}} />
						</View>

						<View style={styles.textContainer}>
							<Text style={styles.contentText}>
								{textCmps[0]}
								<Text style={styles.contentTextAccent}>{textCmps[1]}</Text>
								{textCmps[2]}
							</Text>
						</View>
					</View>

					<View style={styles.badgeListContainer}>
						<Text style={styles.badgeListHeaderText}>{"This collectible unlocks"}</Text>

						<BagdeListItem />
					</View>
				</SafeAreaView>
			</ScrollView>
		</View>
	);
}

function BagdeListItem() {
	return (
		<View style={styles.badgeItemContainer}>
			<Image style={styles.badgeListItemImage} />
			<View style={styles.badgeItemRightContainer}>
				<Image style={styles.badgeListItemBagde} />
				<Text>{"EDCON Trivia"}</Text>
				<ETouchable style={styles.lockButton}>
					<LockIcon16 />
					<Text style={styles.lockButtonText}>{"Locked"}</Text>
				</ETouchable>
			</View>
		</View>
	);
}
function LockIcon16() {
	return (
		<Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<Path
				d="M12.6667 6.66634H13.3333C13.7015 6.66634 14 6.96481 14 7.33301V13.9997C14 14.3679 13.7015 14.6663 13.3333 14.6663L2.66667 14.6663C2.29848 14.6663 2 14.3679 2 13.9997L2 7.33301C2 6.96481 2.29848 6.66634 2.66667 6.66634H3.33333V5.99967C3.33333 3.42235 5.42267 1.33301 8 1.33301C10.5773 1.33301 12.6667 3.42235 12.6667 5.99967V6.66634ZM3.33333 7.99967L3.33333 13.333L12.6667 13.333V7.99967L3.33333 7.99967ZM7.33333 9.33301H8.66667L8.66667 11.9997H7.33333L7.33333 9.33301ZM11.3333 6.66634V5.99967C11.3333 4.15873 9.84093 2.66634 8 2.66634C6.15905 2.66634 4.66667 4.15873 4.66667 5.99967V6.66634L11.3333 6.66634Z"
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

	scrollContentContainer: {
		paddingBottom: 24
	},

	mainContainer: {
		marginTop: 48,
		paddingHorizontal: 16,
		alignItems: "center"
	},

	textContainer: {
		marginTop: 32
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

	badgeImageWrapper: {
		width: 220,
		height: 220,
		borderRadius: 110,
		backgroundColor: "#00000019",
		marginTop: 32
	},

	badgeListHeaderText: {
		fontFamily: Fonts.poppins,
		fontSize: 20,
		fontWeight: "500",
		marginBottom: 12
	},

	badgeListContainer: {
		marginTop: 48,
		paddingHorizontal: 16
	},

	/* BagdeListItem */
	badgeItemContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 24,
		backgroundColor: "#FFFFFF"
	},

	badgeListItemImage: {
		width: 100,
		height: 130,
		resizeMode: "contain",
		backgroundColor: "#efefef7f"
	},

	badgeItemRightContainer: {
		gap: 8
	},

	badgeListItemBagde: {
		width: 32,
		height: 32,
		borderRadius: 16,
		resizeMode: "contain",
		backgroundColor: "#efefef7f"
	},

	lockButton: {
		height: 34,
		borderRadius: 17,
		paddingHorizontal: 12,
		gap: 6,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: "#00000033",
		backgroundColor: "#FFFFFF",
		alignItems: "center",
		flexDirection: "row"
	},

	lockButtonText: {
		fontFamily: Fonts.Poppins_Bold,
		fontSize: 14
		// fontWeight: "600"
	}
});
