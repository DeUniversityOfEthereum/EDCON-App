import { BackgroundGradient } from "@/app/(edcon)/components";
import EdconHuntNavigationBar from "@/app/(edcon)/hunt/components/NavigationBar";
import Colors from "@constants/Colors";
import { View } from "@themed";
import { Slot, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TransactionLayout() {
	const onBack = () => {
		router.back();
	};
	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<BackgroundGradient />
			<EdconHuntNavigationBar onGoback={onBack} />
			<SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
				<View style={{ height: "100%" }}>
					<Slot />
				</View>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.light.grayBackground
	}
});
