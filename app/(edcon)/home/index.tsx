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
				<UButton title="GO" onPress={() => router.push("/(edcon)/hunt")} />
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
	}
});
