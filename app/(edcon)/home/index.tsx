import { tasks } from "@/config/tasks";
import { Text, View } from "@themed";
import { UButton, USafeAreaProvider } from "@u";
import { router } from "expo-router";
import { StyleSheet } from "react-native";

export default function EdconHomeScreen() {
	const task = tasks.find(it => it.id === 2);
	return (
		<USafeAreaProvider>
			<View style={style.container}>
				<Text style={style.title}>{task?.title}</Text>
				<Text style={style.description}>{task?.description}</Text>
				<View style={style.actions}>
					<UButton title="Scavenger Hunt" onPress={() => router.push("/(edcon)/hunt")} />
					<UButton title="AceTCG" onPress={() => router.push("/(edcon)/transaction")} />
				</View>
			</View>
		</USafeAreaProvider>
	);
}

const style = StyleSheet.create({
	container: {
		padding: 24
	},
	title: {
		fontSize: 20,
		fontWeight: "bold"
	},
	description: {
		fontSize: 14,
		marginVertical: 24
	},
	actions: {
		gap: 16
	}
});
