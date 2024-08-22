import { BackgroundGradient } from "@/app/(edcon)/components";
import EdconHuntNavigationBar from "@/app/(edcon)/hunt/components/NavigationBar";
import SectionContainer from "@/app/(edcon)/hunt/components/SectionContainer";
import Colors from "@constants/Colors";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View } from "react-native";
import RemainingLocations from "./Locations";

export default function LocationListScreen() {
	return (
		<View style={styles.container}>
			<StatusBar style="auto" />

			<BackgroundGradient />

			<EdconHuntNavigationBar title={"Map"} />

			<ScrollView contentContainerStyle={styles.scrollContentContainer}>
				<SectionContainer style={styles.sectionContainer}>
					<RemainingLocations />
				</SectionContainer>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.light.grayBackground
		// alignItems: 'center',
		// justifyContent: 'center',
	},

	gobackIcon: {
		width: 48,
		height: 48,
		borderRadius: 40,
		borderColor: Colors.light.border,
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

	sectionContainer: {
		marginTop: 32
	}
});
