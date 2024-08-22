import Colors from "@constants/Colors";
import { Text, View } from "@themed";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import { Path, Svg } from "react-native-svg";
import { UButton } from "./Button";

import type { ViewStyle } from "react-native";
type UModalProps = {
	open?: boolean;
	title?: string;
	content?: string | React.ReactNode;
	cancelText?: string;
	confirmText?: string;
	actions?: boolean;
	showCancelButton?: boolean;
	showConfirmButton?: boolean;
	children?: React.ReactNode;
	showClose?: boolean;
	closeOnClickModal?: boolean;
	bodyStyle?: ViewStyle;
	bodyContentStyle?: ViewStyle;
	maskStyle?: ViewStyle;
	onCancel?: () => Promise<boolean>;
	onConfirm?: () => Promise<boolean>;
	onClose?: () => void;
};

export type UDialogRef = {
	onShow: () => void;
	onClose: () => void;
};

export const UModal = forwardRef<UDialogRef, UModalProps>((props, ref) => {
	const {
		closeOnClickModal = true,
		showClose = true,
		open = false,
		actions = true,
		showCancelButton = true,
		showConfirmButton = true
	} = props;

	const [isOpen, setIsOpen] = useState(open);
	const [cancelLoading, setCancelLoading] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);

	const onClose = () => {
		setIsOpen(false);
		props?.onClose?.();
	};

	const onCancel = () => {
		if (cancelLoading || confirmLoading) return;
		if (props.onCancel) {
			setCancelLoading(true);
			props
				.onCancel?.()
				.then(res => {
					res && onClose();
				})
				.finally(() => setCancelLoading(false));
		} else {
			onClose();
		}
	};

	const onConfirm = () => {
		if (cancelLoading || confirmLoading) return;
		if (props.onConfirm) {
			setConfirmLoading(true);
			props
				.onConfirm?.()
				.then(res => {
					res && onClose();
				})
				.finally(() => setConfirmLoading(false));
		} else {
			onClose();
		}
	};

	const handleClose = () => {
		if (closeOnClickModal) {
			onClose();
		}
	};

	useEffect(() => {
		setIsOpen(open);
	}, [open]);

	useImperativeHandle(ref, () => {
		return {
			onShow() {
				setIsOpen(true);
			},
			onClose() {
				setIsOpen(false);
			}
		};
	}, []);

	return (
		<Modal visible={isOpen} transparent animationType="fade" hardwareAccelerated onRequestClose={() => onClose()}>
			<View style={style.wrapper}>
				<Pressable style={[style.mask, props.maskStyle]} onPress={() => handleClose()} />
				<View style={[style.body, props.bodyStyle]}>
					<View style={[style.bodyContent, props.bodyContentStyle]}>
						{props.title && <Text style={style.mainTitle}>{props.title}</Text>}
						{props.content && <Text style={style.mainContent}>{props.content}</Text>}
						{props.children && <View>{props.children}</View>}
						{actions && (
							<View style={style.mainActions}>
								{showConfirmButton && (
									<UButton loading={confirmLoading} title={props.confirmText ?? "Submit"} onPress={() => onConfirm()} />
								)}
								{showCancelButton && (
									<UButton
										loading={cancelLoading}
										variant="outlined"
										title={props.cancelText ?? "Cancel"}
										onPress={() => onCancel()}
									/>
								)}
							</View>
						)}
					</View>
					{showClose && (
						<View style={style.closeFooter}>
							<Pressable style={style.closeButton} onPress={() => onClose()}>
								<CloseIcon />
							</Pressable>
						</View>
					)}
				</View>
			</View>
		</Modal>
	);
});

function CloseIcon() {
	return (
		<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<Path
				d="M18.8836 5.11409C19.359 5.58952 19.449 6.27032 18.0227 7.6966L13.7185 12.0008L18.0227 16.305C19.449 17.7312 19.359 18.412 18.8836 18.8875C18.4081 19.3629 17.7273 19.4529 16.3011 18.0266L11.9969 13.7225L7.69269 18.0266C6.26642 19.4529 5.58561 19.3629 5.11019 18.8875C4.63476 18.412 4.54474 17.7312 5.97102 16.3049L10.2752 12.0008L5.97102 7.69661C4.54474 6.27033 4.63476 5.58953 5.11019 5.1141C5.58561 4.63868 6.26641 4.54866 7.69269 5.97494L11.9969 10.2791L16.3011 5.97493C17.7273 4.54865 18.4081 4.63867 18.8836 5.11409Z"
				fill={Colors.light.primary}
			/>
		</Svg>
	);
}

const style = StyleSheet.create({
	wrapper: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center"
	},
	mask: {
		position: "absolute",
		left: 0,
		top: 0,
		width: "100%",
		height: "100%",
		backgroundColor: Colors.light.mask
	},
	body: {
		width: "90%"
	},
	bodyContent: {
		width: "100%",
		paddingVertical: 24,
		paddingHorizontal: 16,
		backgroundColor: "#fff",
		borderRadius: 24,
		borderWidth: 1,
		borderColor: Colors.light.border
	},
	mainTitle: {
		color: "#000",
		fontSize: 18,
		fontWeight: "700",
		textAlign: "center"
	},
	mainContent: {
		marginTop: 24,
		color: "#000",
		fontSize: 16,
		fontWeight: "400"
	},
	mainActions: {
		rowGap: 24,
		marginTop: 24
	},
	closeFooter: {
		marginTop: 16,
		justifyContent: "center",
		alignItems: "center"
	},
	closeButton: {
		width: 40,
		height: 40,
		borderRadius: 999,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center"
	}
});
