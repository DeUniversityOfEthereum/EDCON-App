import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { Ellipse, Path, Svg } from "react-native-svg";

export default function ETHLogo() {
	const scaleValue = useRef(new Animated.Value(1)).current;
	const translateYValue = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const p1 = Animated.parallel([
			Animated.timing(scaleValue, {
				toValue: 3,
				duration: 1000,
				easing: Easing.linear,
				useNativeDriver: true
			}),
			Animated.timing(translateYValue, {
				toValue: 30,
				duration: 1000,
				easing: Easing.linear,
				useNativeDriver: true
			})
		]);
		const p2 = Animated.parallel([
			Animated.timing(scaleValue, {
				toValue: 1,
				duration: 1000,
				easing: Easing.linear,
				useNativeDriver: true
			}),
			Animated.timing(translateYValue, {
				toValue: 0,
				duration: 1000,
				easing: Easing.linear,
				useNativeDriver: true
			})
		]);

		const startAnimation = () => {
			Animated.loop(Animated.sequence([p1, p2])).start();
		};

		startAnimation();
	}, [scaleValue, translateYValue]);

	return (
		<>
			<Animated.View style={{ transform: [{ translateY: translateYValue }] }}>
				<Svg width="115" height="203" viewBox="0 0 115 203" fill="none">
					<Path d="M57.4999 0V127.064L0 95.5789L57.4999 0Z" fill="#7CD5EA" />
					<Path d="M57.5001 0V127.064L115 95.5789L57.5001 0Z" fill="#A3ECFD" />
					<Path d="M57.4999 71.0593L0 95.2775L57.4999 127.064V71.0593Z" fill="#97E2F3" />
					<Path d="M57.5001 71.0593L115 95.2775L57.5001 127.064V71.0593Z" fill="#CDF5FF" />
					<Path d="M57.5 202.338V137.479L0.709961 105.987L57.5 202.338Z" fill="#97E2F3" />
					<Path d="M57.5 202.338V137.479L114.29 105.987L57.5 202.338Z" fill="#AFF0FF" />
				</Svg>
			</Animated.View>

			<Animated.View style={{ marginTop: 40, transform: [{ scaleX: scaleValue }] }}>
				<Svg width="29" height="8" viewBox="0 0 29 8" fill="none">
					<Ellipse cx="14.985" cy="4.26953" rx="14" ry="3.5" fill="#C9F3FE" />
				</Svg>
			</Animated.View>
		</>
	);
}
