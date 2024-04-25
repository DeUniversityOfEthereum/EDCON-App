/* 使用 
直接js调用
toast.current?.error("test");

或者引入组件
<Toast icon="error" message="test" />
**/
import Fonts from "@constants/Fonts";
import { Text, View } from "@themed";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Modal, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

type iconType = "success" | "error" | "warning";
type ToastProps = { icon?: iconType; message?: string };
interface ToastRef {
	success: (msg: string) => void;
	error: (msg: string) => void;
	warning: (msg: string) => void;
}

export const toast: { current: ToastRef | null } = { current: null };
export function Toast({ icon = "success", message }: ToastProps) {
	const [msg, setMsg] = useState(message);
	const [type, setType] = useState(icon);
	const [visible, setVisible] = useState(message ? true : false);
	const toastRef = useRef<ToastRef>(null);

	useImperativeHandle(toastRef, () => {
		return {
			success: (content: string) => {
				return onShow(content, "success");
			},
			error: (content: string) => {
				return onShow(content, "error");
			},
			warning: (content: string) => {
				return onShow(content, "warning");
			}
		};
	});

	useEffect(() => {
		toast.current = toastRef.current;
	}, []);

	useEffect(() => {
		if (visible) {
			setTimeout(() => {
				setVisible(false);
			}, 2000);
		}
	}, [visible]);

	const onShow = (content: string, iconType: iconType) => {
		setMsg(content);
		setType(iconType);
		setVisible(true);
	};

	if (!visible) return null;

	function onGetIcon() {
		switch (type) {
			case "success":
				return <SuccessIcon />;
			case "error":
				return <ErrorIcon />;
			case "warning":
				return <WarningIcon />;
			default:
				return "";
		}
	}

	return (
		<Modal animationType="fade" visible={visible} transparent={true}>
			<View style={styles.container}>
				<View style={styles.toast}>
					<View style={styles.icon}>{onGetIcon()}</View>
					<Text style={styles.message}>{msg}</Text>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", alignItems: "center" },
	icon: {
		width: 42,
		height: 42
	},
	toast: {
		flexDirection: "column",
		backgroundColor: "rgba(18, 19, 20, 0.60)",
		paddingHorizontal: 24,
		paddingVertical: 16,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		width: 136,
		height: 132
	},
	message: {
		color: "#fff",
		marginTop: 16,
		fontSize: 20,
		fontFamily: Fonts.Inter_700Bold
	}
});

function SuccessIcon() {
	return (
		<Svg width="43" height="42" viewBox="0 0 43 42" fill="none">
			<Path
				d="M21.5 42C33.098 42 42.5 32.598 42.5 21C42.5 9.40202 33.098 0 21.5 0C9.90202 0 0.5 9.40202 0.5 21C0.5 32.598 9.90202 42 21.5 42ZM11 21.6195L13.1195 19.5L18.5 24.879L29.8775 13.5L32 15.6225L18.5 29.121L11 21.6195Z"
				fill="white"
			/>
		</Svg>
	);
}

function ErrorIcon() {
	return (
		<Svg width="43" height="43" viewBox="0 0 43 43" fill="none">
			<Path
				d="M21.9023 42.1553C33.5003 42.1553 42.9023 32.7533 42.9023 21.1553C42.9023 9.55729 33.5003 0.155273 21.9023 0.155273C10.3044 0.155273 0.902344 9.55729 0.902344 21.1553C0.902344 32.7533 10.3044 42.1553 21.9023 42.1553Z"
				fill="white"
			/>
			<Path
				d="M21.9994 17.5003L27.939 11.5605L30.9088 14.5304L24.9692 20.4701L30.9088 26.4097L27.939 29.3796L21.9994 23.4399L16.0597 29.3796L13.0898 26.4097L19.0296 20.4701L13.0898 14.5304L16.0597 11.5605L21.9994 17.5003Z"
				fill="#6D6D6E"
			/>
		</Svg>
	);
}

function WarningIcon() {
	return (
		<Svg width="43" height="43" viewBox="0 0 43 43" fill="none">
			<Path
				d="M21.4023 42.1553C33.0003 42.1553 42.4023 32.7533 42.4023 21.1553C42.4023 9.55729 33.0003 0.155273 21.4023 0.155273C9.80436 0.155273 0.402344 9.55729 0.402344 21.1553C0.402344 32.7533 9.80436 42.1553 21.4023 42.1553Z"
				fill="white"
			/>
			<Path d="M23.5008 27.4553H19.3008V31.6553H23.5008V27.4553Z" fill="#6D6D6E" />
			<Path d="M23.5008 10.6553H19.3008V23.2553H23.5008V10.6553Z" fill="#6D6D6E" />
		</Svg>
	);
}
