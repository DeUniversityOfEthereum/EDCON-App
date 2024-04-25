import { View } from "@themed";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

type USafeAreaProviderProps = {
	children?: React.ReactNode;
};

export function USafeAreaProvider(props: USafeAreaProviderProps) {
	const insets = useSafeAreaInsets();
	return (
		<SafeAreaProvider>
			<View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>{props.children}</View>
		</SafeAreaProvider>
	);
}
