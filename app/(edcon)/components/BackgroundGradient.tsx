import { Image, StyleSheet, View } from "react-native";
import { Defs, LinearGradient, Rect, Stop, Svg } from "react-native-svg";
const backgroundImg = require("@/assets/images/edcon/edcon_background_noise.png");

function BackgroundGradient() {
	return (
		<View style={styles.background}>
			<Svg style={styles.container}>
				<Rect width="100%" height="105%" fill="url(#paint0_linear_2273_4401)" />
				<Defs>
					<LinearGradient
						id="paint0_linear_2273_4401"
						x1="196.5"
						y1="0"
						x2="196.5"
						y2="852"
						gradientUnits="userSpaceOnUse"
					>
						<Stop stopColor="#F5FDFF" />
						<Stop offset="1" stopColor="#E0FAFF" />
					</LinearGradient>
				</Defs>
			</Svg>
		</View>
	);
}

export default function Background() {
	return (
		<View style={styles.background}>
			<BackgroundGradient />
			<Image source={backgroundImg} />
		</View>
	);
}

const styles = StyleSheet.create({
	background: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	},

	container: {
		flex: 1
	}
});
