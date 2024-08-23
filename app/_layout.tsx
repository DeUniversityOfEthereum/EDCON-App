import QueryClientProvider from "@/components/queryclient/Providers";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@constants/Colors";
import {
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
	Inter_900Black,
	useFonts
} from "@expo-google-fonts/inter";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export const customFonts = {
	"Jomhuria-Regular": require("@/assets/fonts/Jomhuria-Regular.ttf"),
	"Poppins-Black": require("@/assets/fonts/popins/Poppins-Black.ttf"),
	"Poppins-BlackItalic": require("@/assets/fonts/popins/Poppins-BlackItalic.ttf"),
	"Poppins-Bold": require("@/assets/fonts/popins/Poppins-Bold.ttf"),
	"Poppins-BoldItalic": require("@/assets/fonts/popins/Poppins-BoldItalic.ttf"),
	"Poppins-ExtraBold": require("@/assets/fonts/popins/Poppins-ExtraBold.ttf"),
	"Poppins-ExtraBoldItalic": require("@/assets/fonts/popins/Poppins-ExtraBoldItalic.ttf"),
	"Poppins-ExtraLight": require("@/assets/fonts/popins/Poppins-ExtraLight.ttf"),
	"Poppins-ExtraLightItalic": require("@/assets/fonts/popins/Poppins-ExtraLightItalic.ttf"),
	"Poppins-Italic": require("@/assets/fonts/popins/Poppins-Italic.ttf"),
	"Poppins-Light": require("@/assets/fonts/popins/Poppins-Light.ttf"),
	"Poppins-LightItalic": require("@/assets/fonts/popins/Poppins-LightItalic.ttf"),
	"Poppins-Medium": require("@/assets/fonts/popins/Poppins-Medium.ttf"),
	"Poppins-MediumItalic": require("@/assets/fonts/popins/Poppins-MediumItalic.ttf"),
	"Poppins-Regular": require("@/assets/fonts/popins/Poppins-Regular.ttf"),
	"Poppins-SemiBold": require("@/assets/fonts/popins/Poppins-SemiBold.ttf"),
	"Poppins-SemiBoldItalic": require("@/assets/fonts/popins/Poppins-SemiBoldItalic.ttf"),
	"Poppins-Thin": require("@/assets/fonts/popins/Poppins-Thin.ttf"),
	"Poppins-ThinItalic": require("@/assets/fonts/popins/Poppins-ThinItalic.ttf")
};

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "/index"
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_600SemiBold,
		Inter_700Bold,
		Inter_900Black,
		...customFonts
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	const colorScheme = useColorScheme();
	const darkTheme = {
		dark: true,
		colors: Colors.dark
	};
	const defaultTheme = {
		dark: false,
		colors: Colors.light
	};

	return (
		<QueryClientProvider>
			<ThemeProvider value={colorScheme === "dark" ? darkTheme : defaultTheme}>
				<Stack screenOptions={{ headerShown: false }} />
			</ThemeProvider>
		</QueryClientProvider>
	);
}
