import { tasks } from "@/config/tasks";
import { Text, View } from "@themed";
import { UButton } from "@u";
import { router } from "expo-router";
import { StyleSheet } from "react-native";

export default function QRCodeHomeScreen() {
	const task = tasks.find(it => it.id === 3);
	return (
		<View style={style.container}>
			<Text style={style.title}>{task?.title}</Text>
			<Text style={style.description}>{task?.description}</Text>
			<UButton title="GO" onPress={() => router.push("/(edcon)/gift")} />
		</View>
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
