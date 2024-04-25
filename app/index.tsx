import { tasks } from "@/config/tasks";
import Colors from "@constants/Colors";
import { UButton, USafeAreaProvider } from "@u";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
	return (
		<USafeAreaProvider>
			<ScrollView>
				<View style={style.container}>
					{tasks.map(task => (
						<View key={task.id} style={style.task}>
							<Text style={style.title}>{task.title}</Text>
							<UButton style={style.button} title="GO" onPress={() => router.push(task.route)} />
						</View>
					))}
				</View>
			</ScrollView>
		</USafeAreaProvider>
	);
}

const style = StyleSheet.create({
	container: {
		paddingVertical: 24,
		backgroundColor: Colors.light.pageBg,
		height: "100%",
		justifyContent: "space-between"
	},
	task: {
		padding: 24
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 12
	},
	button: {}
});
