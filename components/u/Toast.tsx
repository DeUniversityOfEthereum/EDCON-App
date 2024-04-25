import React, { PropsWithChildren } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { UButton } from "./Button";

type UToastProps = PropsWithChildren<{
	title: string;
	message: string;
	visible: boolean;
	confirmTitle?: string;
	cancelTitle?: string;
	onPress: () => void;
}>;

export function UToast(props: UToastProps) {
	const { title, message, visible, onPress, ...rest } = props;
	return (
		<Modal animationType="fade" transparent={true} visible={visible}>
			<View style={styles.container}>
				<View style={styles.card}>
					{title.length > 0 && <Text style={styles.text_18_700}>{title}</Text>}
					<Text style={styles.text_16_400}>{message}</Text>
					<UButton title={rest.confirmTitle ?? "Got it"} style={{ marginTop: 24 }} onPress={onPress} />
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0000007f",
		paddingHorizontal: 16,
		paddingTop: 44,
		paddingBottom: 60,
		justifyContent: "center"
	},

	card: {
		backgroundColor: "white",
		padding: 16,
		borderRadius: 24,
		paddingVertical: 24,
		paddingTop: 0,
		maxWidth: 500
	},

	backgroundContainer: {
		position: "absolute",
		width: "100%",
		height: "100%",
		backgroundColor: "#896DFF"
	},

	text_14_600: {
		fontSize: 14,
		fontWeight: "600"
	},

	text_16_700: {
		fontSize: 16,
		fontWeight: "700"
	},

	text_16_400: {
		fontSize: 16,
		fontWeight: "400",
		textAlign: "center",
		marginTop: 24
	},

	text_18_700: {
		fontSize: 18,
		fontWeight: "700",
		textAlign: "center"
	},

	center: {
		justifyContent: "center",
		alignItems: "center"
	}
});
