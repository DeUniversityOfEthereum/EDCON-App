import React, { useEffect, useRef } from "react";
import { FlatList, ViewProps, type ListRenderItemInfo } from "react-native";
import Button from "./Button";

type SegmentRenderItemInfo<ItemT> = {
	item: ItemT;
	index: number;
	selected: boolean;
};

type SegmentProps<T> = {
	items: T[];
	selectedIndex: number;
	spacing?: number;
	style?: ViewProps["style"];
	contentContainerStyle?: ViewProps["style"];
	itemContainerStyle?: (info: SegmentRenderItemInfo<T>) => ViewProps["style"];
	renderItem: (info: SegmentRenderItemInfo<T>) => React.ReactElement;
	onChange: (info: Omit<SegmentRenderItemInfo<T>, "selected">) => void;
};

type ScollSegmentProps<T> = {
	bounces?: boolean;
} & SegmentProps<T>;

export function ScrollSegment<T>(props: ScollSegmentProps<T>) {
	const renderItem = (info: ListRenderItemInfo<T>) => {
		const { item, index } = info;
		const selected = props.selectedIndex === index;
		const style = props.itemContainerStyle ? props.itemContainerStyle({ item, index, selected: selected }) : {};
		return (
			<Button
				key={`${index}`}
				style={style}
				onPress={() => {
					props.onChange({ item, index });
				}}
			>
				{props.renderItem({ item, index, selected })}
			</Button>
		);
	};

	const listRef = useRef<FlatList>(null);
	useEffect(() => {
		setTimeout(() => {
			if (props.selectedIndex >= 0 && props.selectedIndex < props.items.length) {
				listRef.current?.scrollToIndex({ index: props.selectedIndex, viewPosition: 0.5 });
			}
		}, 50);
	}, [props.items.length, props.selectedIndex]);

	return (
		<FlatList
			ref={listRef}
			style={[props.style, { overflow: "visible" }]}
			contentContainerStyle={[props.contentContainerStyle, { gap: props.spacing }]}
			bounces={props.bounces}
			// progressViewOffset={0.5}
			horizontal={true}
			showsHorizontalScrollIndicator={false}
			data={props.items}
			renderItem={renderItem}
			onScrollToIndexFailed={_info => {}}
		/>
	);
}
