import Fonts from "@constants/Fonts";
import { isEmpty } from "lodash-es";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Path, Rect, Svg } from "react-native-svg";

import type { EvnetProps } from "./useEvents";

export default function Collections(props: { data: EvnetProps[]; onPressItem: (item: EvnetProps) => void }) {
	const onPressItem = (item: EvnetProps) => {
		props.onPressItem(item);
	};

	const width = Dimensions.get("window").width;
	const columnCount = 3;
	const columnGap = 24;
	const itemWidth = (width - (columnCount - 1) * columnGap - 16 * 2) / columnCount;

	return (
		<View style={[styles.collectionContainer, { gap: columnGap - 1 / columnCount }]}>
			{props.data.map((collection, i) => {
				const isCollected = collection.collectionStatus === "Collected";
				const opacity = isCollected ? 1 : 0.4;
				const imageURL = isEmpty(collection?.nft?.image?.originalUrl) ? undefined : collection?.nft?.image?.originalUrl;
				return (
					<Pressable
						key={i}
						style={[styles.collectionItem, { width: itemWidth, opacity }]}
						onPress={() => {
							onPressItem(collection);
						}}
					>
						<Image
							style={{
								width: itemWidth,
								aspectRatio: 1,
								borderRadius: itemWidth * 0.5,
								backgroundColor: "#00000019"
							}}
							resizeMode="contain"
							source={{ uri: imageURL?.trim() }}
						/>
						<Text style={styles.collectionItemText} numberOfLines={1} ellipsizeMode="middle">
							{collection.name}
						</Text>
						<View style={{ position: "absolute", top: 4, right: 4 }}>{isCollected && <CollectedIcon />}</View>
					</Pressable>
				);
			})}
			{!props.data.length && (
				<View style={styles.noMoreDataContainer}>
					<Text>{"No More"}</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	collectionContainer: {
		flexDirection: "row",
		flexWrap: "wrap"
	},

	collectionheadText: {
		fontFamily: Fonts.jomhuria,
		fontSize: 40,
		height: 24,
		lineHeight: 24,
		paddingTop: 24 * 0.3
	},

	collectionItem: {
		gap: 8,
		justifyContent: "center"
		// marginTop: 24
	},

	collectionItemText: {
		textAlign: "center",
		flex: 1
	},

	noMoreDataContainer: {
		alignItems: "center",
		width: "100%"
	}
});
function CollectedIcon() {
	return (
		<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<Rect x="2.40039" y="2.10706" width="19.2" height="19.2" rx="9.6" fill="#7CD5EA" />
			<Path
				d="M10.7266 13.9092L16.242 8.3938L17.0905 9.24232L10.7266 15.6063L6.9082 11.7879L7.75674 10.9394L10.7266 13.9092Z"
				fill="white"
			/>
		</Svg>
	);
}
