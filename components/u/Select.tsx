import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import { Text, View } from "@themed";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { Animated, FlatList, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Path, Svg } from "react-native-svg";

import type { FlatListProps } from "react-native";
import type { SvgProps } from "react-native-svg";
type ItemProps = {
	label: string;
	value: string;
};
type USelectProps = {
	value: string;
	icon?: React.ReactNode;
	placeholder?: string | undefined;
	size?: "sm" | "md" | "lg";
	list: ItemProps[];
	renderItem?: FlatListProps<ItemProps>["renderItem"];
	onChange?: (value: string) => void;
};
type ListItemProps = {
	item: ItemProps;
	value: string;
	onChange?: (value: string) => void;
};

export const USelect = forwardRef<null, USelectProps>((props, ref) => {
	const { size, icon, list, value, onChange, renderItem } = props;

	const [valueLabel, setValueLabel] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [borderColor] = useState(new Animated.Value(0));
	const [dialogOpacity] = useState(new Animated.Value(0));

	const onClear = () => {
		handleChange("");
	};

	const handleChange = (newValue: string) => {
		onChange?.(newValue);
		setIsOpen(false);
	};

	const onAnimated = useCallback(
		(toValue: number) => {
			Animated.timing(borderColor, {
				toValue: toValue,
				duration: 300, // 过渡时间
				useNativeDriver: false
			}).start();

			Animated.timing(dialogOpacity, {
				toValue: toValue,
				duration: 150, // 过渡时间
				useNativeDriver: false
			}).start();
		},
		[borderColor, dialogOpacity]
	);

	const buttonBorderColor = borderColor.interpolate({
		inputRange: [0, 1],
		outputRange: [Colors.light.border, Colors.light.primary] // 定义初始颜色和焦点时的颜色
	});

	const opacityValue = dialogOpacity.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 1]
	});

	useEffect(() => {
		onAnimated(isOpen ? 1 : 0);
		return () => {
			onAnimated(0);
		};
	}, [isOpen, onAnimated]);

	useEffect(() => {
		const info = list.find(it => it.value === value);
		setValueLabel(info?.label ?? "");
	}, [value, list]);

	return (
		<View style={style.wrapper}>
			<Animated.View style={[style.buttonView, { borderColor: buttonBorderColor }]}>
				<Pressable
					ref={ref}
					style={[style.button, { height: size === "sm" ? 40 : size === "lg" ? 64 : 48 }]}
					onPress={() => setIsOpen(!isOpen)}
				>
					{icon && <View style={style.buttonIcon}>{icon}</View>}
					<Text style={style.buttonText} numberOfLines={1} ellipsizeMode="tail">
						{valueLabel ?? props.placeholder}
					</Text>
					{!!value && (
						<View style={style.clearIcon}>
							<TouchableOpacity onPress={() => onClear()}>
								<ClearIcon />
							</TouchableOpacity>
						</View>
					)}
				</Pressable>
			</Animated.View>

			{isOpen && (
				<Animated.View
					style={[style.dialogWrapprer, { top: size === "sm" ? 40 : size === "lg" ? 64 : 48, opacity: opacityValue }]}
				>
					<View style={style.dialogContent}>
						<FlatList
							data={list}
							renderItem={
								renderItem ? renderItem : ({ item }) => <ListItem value={value} item={item} onChange={handleChange} />
							}
						/>
					</View>
				</Animated.View>
			)}
		</View>
	);
});

function ListItem(props: ListItemProps) {
	const { item, value, onChange } = props;
	const isSelected = item.value === value;
	return (
		<Pressable style={[style.listItem]} onPress={() => onChange?.(item.value)}>
			{isSelected && <SelectIcon fill={isSelected ? Colors.light.primary : "#fff"} style={style.listItemIcon} />}
			<Text
				style={[style.listItemText, isSelected ? { color: Colors.light.primary } : {}]}
				numberOfLines={1}
				ellipsizeMode="tail"
			>
				{item.label}
			</Text>
		</Pressable>
	);
}

function ClearIcon() {
	return (
		<Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<Path
				d="M12.5255 3.47455C12.2131 3.16213 11.7066 3.16213 11.3941 3.47455L8.00003 6.86866L4.60592 3.47455C4.2935 3.16213 3.78697 3.16213 3.47455 3.47455C3.16213 3.78697 3.16213 4.2935 3.47455 4.60592L6.86866 8.00003L3.47455 11.3941C3.16213 11.7066 3.16213 12.2131 3.47455 12.5255C3.78697 12.8379 4.2935 12.8379 4.60592 12.5255L8.00003 9.1314L11.3941 12.5255C11.7066 12.8379 12.2131 12.8379 12.5255 12.5255C12.8379 12.2131 12.8379 11.7066 12.5255 11.3941L9.1314 8.00003L12.5255 4.60592C12.8379 4.2935 12.8379 3.78697 12.5255 3.47455Z"
				fill="#ccc"
			/>
		</Svg>
	);
}

function SelectIcon(props: SvgProps) {
	const { style, ...otherProps } = props;
	return (
		<Svg {...otherProps} viewBox="0 0 20 20" style={[{ width: 20, height: 20 }, style]}>
			<Path
				fillRule="evenodd"
				d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
				clipRule="evenodd"
			/>
		</Svg>
	);
}

const style = StyleSheet.create({
	wrapper: {
		zIndex: 120
	},
	buttonView: {
		borderWidth: 1,
		borderColor: Colors.light.border,
		borderRadius: 9999
	},
	button: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 24
	},
	buttonIcon: {
		marginRight: 8,
		flexShrink: 0
	},
	buttonText: {
		width: "86%",
		fontFamily: Fonts.Inter_700Bold,
		fontWeight: "700",
		fontSize: 16,
		color: Colors.light.input,
		height: 48,
		lineHeight: 48
	},
	clearIcon: {
		marginLeft: 8,
		flexShrink: 0,
		transform: "scale(1.25)"
	},
	dialogWrapprer: {
		position: "absolute",
		top: 48,
		left: 0,
		zIndex: 100,
		width: "100%",
		minHeight: 80,
		maxHeight: 240,
		paddingVertical: 12
	},
	dialogContent: {
		width: "100%",
		minHeight: "100%",
		backgroundColor: "#fff",
		borderRadius: 8,
		borderColor: Colors.light.border,
		borderWidth: 1
	},
	listItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 24,
		height: 40
	},
	listItemIcon: {
		position: "absolute",
		left: 4
	},
	listItemText: {
		fontSize: 16,
		paddingLeft: 4
	}
});
