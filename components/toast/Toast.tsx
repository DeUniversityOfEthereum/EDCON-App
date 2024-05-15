import Fonts from "@constants/Fonts";
import { Text, View } from "@themed";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Modal, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

type iconType = "success" | "error" | "warning" | "loading" | "text";
type ToastProps = { icon?: iconType; message: string };
interface ToastRef {
	success: (msg: string) => void;
	error: (msg: string) => void;
	warning: (msg: string) => void;
	loading: (msg: string) => void;
	text: (msg: string) => void;
}

export const toast: { current: ToastRef | null } = { current: null };
export function Toast({ icon = "text", message }: ToastProps) {
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
			},
			loading: (content: string) => {
				return onShow(content, "loading");
			},
			text: (content: string) => {
				return onShow(content, "text");
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
			case "loading":
				return <LoadingIcon />;
			default:
				return "";
		}
	}

	return (
		<Modal animationType="fade" visible={visible} transparent={true}>
			<View
				style={[
					styles.container,
					{
						minHeight: type === "text" ? "auto" : 132
					}
				]}
			>
				<View style={styles.toast}>
					{type !== "text" && <View style={styles.icon}>{onGetIcon()}</View>}
					<Text style={styles.message}>{msg}</Text>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		margin: 12
	},
	icon: {
		width: 42,
		height: 42,
		marginBottom: 16
	},
	toast: {
		flexDirection: "column",
		backgroundColor: "rgba(18, 19, 20, 0.60)",
		paddingHorizontal: 16,
		paddingVertical: 24,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		minWidth: 136
	},
	message: {
		color: "#fff",
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

function LoadingIcon() {
	return (
		<Svg width="43" height="43" viewBox="0 0 43 43" fill="none">
			<Path
				d="M21.4023 42.6855C33.0003 42.6855 42.4023 33.2835 42.4023 21.6855C42.4023 10.0876 33.0003 0.685547 21.4023 0.685547C9.80436 0.685547 0.402344 10.0876 0.402344 21.6855C0.402344 33.2835 9.80436 42.6855 21.4023 42.6855Z"
				fill="white"
			/>
			<Path
				d="M33.4023 21.6855C33.4023 24.0589 32.6986 26.379 31.38 28.3524C30.0614 30.3258 28.1873 31.8638 25.9945 32.7721C23.8018 33.6804 21.389 33.918 19.0613 33.455C16.7335 32.9919 14.5953 31.8491 12.9171 30.1708C11.2388 28.4926 10.0959 26.3544 9.63292 24.0266C9.1699 21.6989 9.40754 19.2861 10.3158 17.0933C11.224 14.9006 12.7621 13.0265 14.7355 11.7079C16.7089 10.3893 19.029 9.68555 21.4023 9.68555V12.8267C19.6502 12.8267 17.9375 13.3463 16.4806 14.3197C15.0238 15.2931 13.8883 16.6767 13.2178 18.2954C12.5473 19.9142 12.3719 21.6954 12.7137 23.4138C13.0555 25.1323 13.8993 26.7108 15.1382 27.9497C16.3771 29.1886 17.9556 30.0324 19.6741 30.3742C21.3925 30.716 23.1737 30.5406 24.7925 29.8701C26.4112 29.1995 27.7948 28.0641 28.7682 26.6073C29.7416 25.1504 30.2612 23.4377 30.2612 21.6855H33.4023Z"
				fill="#6D6D6E"
			/>
		</Svg>
	);
}
