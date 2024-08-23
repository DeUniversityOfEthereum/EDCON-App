import { StyleSheet } from "react-native";
import { View, ViewProps } from "../Themed";

type EDotProps = {
	shown?: boolean;
} & ViewProps;

export function EDot(props: EDotProps) {
	const { shown = true } = props;
	if (!shown) return null;
	return <View style={[styles.redDot, props.style]} />;
}

const styles = StyleSheet.create({
	redDot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		overflow: "hidden",
		backgroundColor: "#FF5C79",
		position: "absolute",
		right: 0,
		top: 0
	}
});
