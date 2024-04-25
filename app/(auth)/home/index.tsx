import { tasks } from "@/config/tasks";
import { Text, View } from "@themed";
import { StyleSheet } from "react-native";

export default function AuthHomeScreen() {
	const task = tasks.find(it => it.id === 1);
	return (
		<View style={style.container}>
			<Text style={style.title}>{task?.title}</Text>
			<Text style={style.description}>{task?.description}</Text>
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
		marginTop: 24
	}
});
