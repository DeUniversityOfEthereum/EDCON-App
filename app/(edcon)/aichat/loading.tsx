import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

export default function Loading() {
	const circle1Scale = useRef(new Animated.Value(1)).current;
	const circle2Scale = useRef(new Animated.Value(1)).current;
	const circle3Scale = useRef(new Animated.Value(1)).current;
	const circle1Color = useRef(new Animated.Value(0)).current;
	const circle2Color = useRef(new Animated.Value(0)).current;
	const circle3Color = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const animateCircle = (circleScale: Animated.Value, circleColor: Animated.Value, delay: number) => {
			Animated.loop(
				Animated.parallel([
					Animated.sequence([
						Animated.timing(circleScale, {
							toValue: 0.6,
							duration: 600,
							easing: Easing.linear,
							useNativeDriver: true,
							delay: delay
						}),
						Animated.timing(circleScale, {
							toValue: 1,
							duration: 600,
							easing: Easing.linear,
							useNativeDriver: true,
							delay: delay
						})
					]),
					Animated.sequence([
						Animated.timing(circleColor, {
							toValue: 0.6,
							duration: 600,
							easing: Easing.linear,
							useNativeDriver: true,
							delay: delay
						}),
						Animated.timing(circleColor, {
							toValue: 0,
							duration: 600,
							easing: Easing.linear,
							useNativeDriver: true,
							delay: delay
						})
					])
				])
			).start();
		};
		animateCircle(circle1Scale, circle1Color, 200);
		animateCircle(circle2Scale, circle2Color, 400);
		animateCircle(circle3Scale, circle3Color, 600);
	}, [circle1Scale, circle2Scale, circle3Scale, circle1Color, circle2Color, circle3Color]);

	return (
		<View style={styles.p_16}>
			<View style={styles.box}>
				<Animated.View
					style={[
						styles.dots,
						{
							backgroundColor: circle1Color.interpolate({
								inputRange: [0, 1],
								outputRange: ["rgba(37, 137, 255, 1)", "rgba(37, 137, 255, 0)"]
							}),
							transform: [{ scale: circle1Scale }]
						}
					]}
				/>
				<Animated.View
					style={[
						styles.dots,
						{
							backgroundColor: circle2Color.interpolate({
								inputRange: [0, 1],
								outputRange: ["rgba(37, 137, 255, 1)", "rgba(37, 137, 255, 0)"]
							}),
							transform: [{ scale: circle2Scale }]
						}
					]}
				/>
				<Animated.View
					style={[
						styles.dots,
						{
							backgroundColor: circle3Color.interpolate({
								inputRange: [0, 1],
								outputRange: ["rgba(37, 137, 255, 1)", "rgba(37, 137, 255, 0)"]
							}),
							transform: [{ scale: circle3Scale }]
						}
					]}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	p_16: {
		padding: 16
	},
	box: {
		width: 33,
		height: 10,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		flex: 1
	},
	dots: {
		width: 10,
		height: 10,
		borderRadius: 10
	}
});
