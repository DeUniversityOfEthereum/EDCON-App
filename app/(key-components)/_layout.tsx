import { View } from "@themed";
import { USafeAreaProvider } from "@u";
import { Slot } from "expo-router";

export default function HomeLayout() {
	return (
		<USafeAreaProvider>
			<View>
				<Slot />
			</View>
		</USafeAreaProvider>
	);
}
