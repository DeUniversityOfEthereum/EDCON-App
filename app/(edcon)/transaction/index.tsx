import ETHLogoLoading from "@/components/contract/EthLogoLoading";
import Fonts from "@constants/Fonts";
import { Text, View } from "@themed";
import { Image } from "expo-image";
import { ScrollView, StyleSheet } from "react-native";
import { useTransaction } from "./useTransaction";

export default function Transaction() {
	useTransaction();

	return (
		<ScrollView contentContainerStyle={styles.scrollContentContainer}>
			<Image style={styles.overviewHeadImage} source={require("@/assets/images/edcon/hunt/logo_edcon.png")} />
			<View style={styles.titleContainer}>
				<Text style={styles.title}>{"🎉 EDCON 2024 Exclusive Rewards"}</Text>
			</View>
			<View style={styles.ethLogoContainer}>
				<ETHLogoLoading />
			</View>
			<View style={styles.processing}>
				<Text style={styles.processingTitle}>{`Processing...`}</Text>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scrollContentContainer: {
		paddingVertical: 24,
		minHeight: "80%"
	},
	titleContainer: {
		alignItems: "center"
	},
	title: {
		fontSize: 38,
		textTransform: "uppercase",
		fontFamily: Fonts.Jomhuria_Regular
	},
	overviewHeadImage: {
		aspectRatio: 300 / 70,
		marginHorizontal: 30
	},
	ethLogoContainer: {
		alignItems: "center",
		marginVertical: 40
	},
	processing: {
		alignItems: "center"
	},
	processingTitle: {
		fontFamily: Fonts.Poppins_Bold,
		fontSize: 24
	}
});
