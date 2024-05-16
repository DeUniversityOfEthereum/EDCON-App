import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
	return {
		...config,
		name: "EDCON",
		slug: "EDCON",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./assets/images/icon.png",
		scheme: "EDCON-APP",
		userInterfaceStyle: "automatic",
		splash: {
			image: "./assets/images/splash.png",
			resizeMode: "contain",
			backgroundColor: "#ffffff"
		},
		assetBundlePatterns: ["**/*"],
		ios: {
			supportsTablet: true,
			buildNumber: "1.13",
			bundleIdentifier: "com.edcon.app"
		},
		android: {
			adaptiveIcon: {
				foregroundImage: "./assets/images/icon.png",
				backgroundColor: "#ffffff"
			},
			package: "com.edcon.app"
		},
		web: {
			bundler: "metro",
			output: "static",
			favicon: "./assets/images/icon.png"
		},
		plugins: ["expo-router", "expo-font"],
		experiments: {
			typedRoutes: true
		}
	};
};
