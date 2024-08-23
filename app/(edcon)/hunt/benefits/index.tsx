import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Path, Svg } from "react-native-svg";
import { default as BackgroundGradient } from "../../components/BackgroundGradient";
import { ScrollSegment } from "../../components/Segment";
import BagdeListItem from "../components/BagdeListItem";
import EdconHuntNavigationBar from "../components/NavigationBar";

export default function BenefitsScreen() {
	const buttonItems = [
		{ title: "ALL" },
		{ title: "UNLOCKED", renderIcon: () => <UnlockIcon16 /> },
		{ title: "LOCKED", renderIcon: () => <LockIcon16 /> }
	];

	const [segmentIndex, setSegmentIndex] = useState(0);

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />

			<BackgroundGradient />
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContentContainer}>
				<SafeAreaView>
					<EdconHuntNavigationBar />

					<View style={styles.mainContainer}>
						<Text style={styles.titleText}>{"Benefits"}</Text>

						<ScrollSegment
							items={buttonItems}
							selectedIndex={segmentIndex}
							spacing={4}
							bounces={false}
							itemContainerStyle={({ index }) => {
								return {
									...styles.segmentItemContainer,
									backgroundColor: index === segmentIndex ? "#7CD5EA" : "#fff"
								};
							}}
							renderItem={({ item }) => {
								return (
									<View style={styles.segmentItem}>
										{item.renderIcon && item.renderIcon()}
										<Text style={styles.contentTextAccent}>{item.title}</Text>
									</View>
								);
							}}
							onChange={({ index }) => {
								setSegmentIndex(index);
							}}
						/>

						<View style={styles.listContainer}>
							{[1, 2].map(item => (
								<BagdeListItem key={`${item}`} />
							))}
						</View>
					</View>
				</SafeAreaView>
			</ScrollView>
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

function UnlockIcon16() {
	return (
		<Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<Path
				d="M4.66667 6.66634H13.3333C13.7015 6.66634 14 6.96481 14 7.33301V13.9997C14 14.3679 13.7015 14.6663 13.3333 14.6663H2.66667C2.29848 14.6663 2 14.3679 2 13.9997V7.33301C2 6.96481 2.29848 6.66634 2.66667 6.66634H3.33333V5.99967C3.33333 3.42235 5.42267 1.33301 8 1.33301C9.827 1.33301 11.4087 2.38287 12.1749 3.91222L10.9821 4.50863C10.4348 3.41625 9.305 2.66634 8 2.66634C6.15905 2.66634 4.66667 4.15873 4.66667 5.99967V6.66634ZM3.33333 7.99967V13.333H12.6667V7.99967H3.33333ZM6.66667 9.99967H9.33333V11.333H6.66667V9.99967Z"
				fill="black"
			/>
		</Svg>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.light.grayBackground
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
		flex: 1,
		paddingBottom: 24
	},

	mainContainer: {
		marginTop: 48,
		paddingHorizontal: 16,
		gap: 24
	},

	titleText: {
		fontFamily: Fonts.poppins,
		fontSize: 24,
		lineHeight: 36
		// textAlign: "center"
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

	segmentItemContainer: {
		height: 42,
		borderRadius: 21,
		paddingHorizontal: 20
	},

	segmentItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6
	},

	list: {
		flex: 1
	},

	listContainer: {
		paddingHorizontal: 16,
		gap: 8
	}
});
