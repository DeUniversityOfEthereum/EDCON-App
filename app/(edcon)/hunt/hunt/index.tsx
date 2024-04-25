import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import { USafeAreaProvider } from "@u";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { default as BackgroundGradient } from "../../components/BackgroundGradient";
import EdconHuntNavigationBar from "../components/NavigationBar";

export default function TabHuntScreen() {
	return (
		<View style={styles.container}>
			<StatusBar style="auto" />

			<BackgroundGradient />
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, paddingBottom: 24 }}>
				<USafeAreaProvider>
					<EdconHuntNavigationBar />
					<View style={styles.mainContainer}>
						<Text style={styles.titleText}>{"Hunt"}</Text>
					</View>
				</USafeAreaProvider>
			</ScrollView>
		</View>
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

	mainContainer: {
		marginTop: 48,
		paddingHorizontal: 16,
		gap: 24
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

	segmentItemText: {},

	// collection
	collectionContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between"
	},

	collectionheadText: {
		fontFamily: Fonts.jomhuria,
		fontSize: 40,
		height: 24,
		lineHeight: 24,
		paddingTop: 24 * 0.3
	},

	collectionItem: {
		gap: 8,
		justifyContent: "center",
		marginTop: 24
	}
});
