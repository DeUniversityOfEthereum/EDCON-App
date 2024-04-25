import React from "react";
import { ScrollView, View, ViewStyle } from "react-native";
import Button from "./Button";

type SegmentProps<T> = {
	items: T[];
	selectedIndex: number;
	spacing?: number;
	style?: ViewStyle;
	segmentStyle?: "1" | "2";
	itemContainerStyle?: (props: { item: T; index: number }) => ViewStyle;
	renderItem: (item: T, index: number) => React.ReactElement;
	onChange: (selectedIndex: number) => void;
};

type ScollSegmentProps<T> = {
	bounces?: boolean;
} & SegmentProps<T>;

export function Segment<T>(props: SegmentProps<T>) {
	const { items, selectedIndex, renderItem, onChange } = props;
	return (
		<View
			style={[
				{
					marginHorizontal: 15,
					padding: 4,
					backgroundColor: "#ffffff",
					flexDirection: "row",
					borderRadius: 16
				},
				props.style
			]}
		>
			{items.map((item, i) => {
				const style = props.itemContainerStyle ? props.itemContainerStyle({ item, index: i }) : {};

				return (
					<Button
						key={`${i}`}
						style={{
							flex: 1,
							backgroundColor: i === selectedIndex ? "#7CD5EA" : "#fff",
							borderRadius: 16,
							...style
						}}
						onPress={() => {
							onChange(i);
						}}
					>
						{renderItem(item, i)}
					</Button>
				);
			})}
		</View>
	);
}

export function ScrollSegment<T>(props: ScollSegmentProps<T>) {
	return (
		<ScrollView
			style={{ ...props.style, overflow: "visible" }}
			bounces={props.bounces}
			horizontal={true}
			showsHorizontalScrollIndicator={false}
		>
			{props.items.map((item, i) => {
				const style = props.itemContainerStyle ? props.itemContainerStyle({ item, index: i }) : {};
				return (
					<Button
						key={`${i}`}
						style={{
							...style,
							marginLeft: i === 0 ? 0 : props.spacing
						}}
						onPress={() => {
							props.onChange(i);
						}}
					>
						{props.renderItem(item, i)}
					</Button>
				);
			})}
		</ScrollView>
	);
}
