import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { default as BackgroundGradient } from "../../components/BackgroundGradient";
import { ScrollSegment } from "../../components/Segment";
import EdconHuntNavigationBar from "../components/NavigationBar";

const collections = [
	{
		id: 1,
		name: "Lorem ipsum 1",
		got: 1
	},
	{
		id: 2,
		name: "Lorem ipsum 2",
		got: 1
	},
	{
		id: 3,
		name: "Lorem ipsum 3",
		got: 0
	},
	{
		id: 4,
		name: "Lorem ipsum 4",
		got: 0
	},
	{
		id: 5,
		name: "Lorem ipsum 5",
		got: 0
	},
	{
		id: 6,
		name: "Lorem ipsum 6",
		got: 0
	},
	{
		id: 7,
		name: "Lorem ipsum 7",
		got: 0
	}
];

export default function BadgeScreen() {
	const buttonItems = [{ title: "ALL" }, { title: "COLLECTED" }, { title: "AVAILABLE" }];

	const width = Dimensions.get("window").width;
	const row = 3;
	const itemWidth = (width - (row - 1) * 24 - 16 * 2) / row;
	const gotCount = collections.reduce<number>((previousValue, currentValue) => {
		return previousValue + currentValue.got;
	}, 0);

	const [segmentIndex, setSegmentIndex] = useState(0);

	const onPressCollectionItem = (item: Record<string, any>) => {
		router.navigate({ pathname: "/(edcon)/hunt/badgeDetail", params: item });
	};

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />

			<BackgroundGradient />
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContentContainer}>
				<SafeAreaView>
					<EdconHuntNavigationBar />

					<View style={styles.heder}>
						<View style={styles.headerTextContainer}>
							<Text style={styles.titleText}>{"My Collection"}</Text>
							<Text style={styles.titleText}>{`${gotCount} / ${collections.length}`}</Text>
						</View>

						<ScrollSegment
							items={buttonItems}
							selectedIndex={segmentIndex}
							spacing={4}
							bounces={false}
							itemContainerStyle={({ index }) => {
								return {
									...styles.segmentItemContainer,
									backgroundColor: index === segmentIndex ? "#7CD5EA" : "#fff"
								};
							}}
							renderItem={item => {
								return <Text style={styles.contentTextAccent}>{item.title}</Text>;
							}}
							onChange={selectedIndex => {
								setSegmentIndex(selectedIndex);
							}}
						/>
					</View>

					<View style={styles.collectionContainer}>
						{collections.map((collection, i) => {
							return (
								<Pressable
									key={i}
									style={[styles.collectionItem, { opacity: collection.got === 1 ? 1 : 0.2 }]}
									onPress={onPressCollectionItem}
								>
									<Image
										style={{
											width: itemWidth,
											height: itemWidth,
											borderRadius: itemWidth * 0.5,
											backgroundColor: "#CCCCCC"
										}}
									/>
									<Text style={styles.collectionItemText}>{collection.name}</Text>
								</Pressable>
							);
						})}
					</View>
				</SafeAreaView>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.light.grayBackground
		// alignItems: 'center',
		// justifyContent: 'center',
	},

	navigationHeader: {
		flexDirection: "row",
		height: 48,
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16
	},

	headerTitle: {
		fontFamily: Fonts.Inter_600SemiBold,
		fontSize: 16
	},

	tileText: {
		fontFamily: Fonts.Poppins_Regular,
		fontSize: 14
	},

	gobackIcon: {
		width: 48,
		height: 48,
		borderRadius: 40,
		borderColor: "#00000019",
		borderWidth: StyleSheet.hairlineWidth

		// backgroundColor: "#FFFFFF"
	},

	background: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: -1
	},

	center: {
		alignItems: "center",
		justifyContent: "center"
	},

	image: {
		width: "100%",
		height: "100%",
		resizeMode: "contain"
	},

	scrollContentContainer: {
		flex: 1,
		paddingBottom: 24
	},

	heder: {
		marginTop: 48,
		paddingHorizontal: 16,
		gap: 24
	},

	headerTextContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between"
	},

	titleText: {
		fontFamily: Fonts.poppins,
		fontSize: 24,
		lineHeight: 36,
		textAlign: "center"
	},

	contentText: {
		fontFamily: Fonts.poppins,
		fontSize: 14,
		lineHeight: 21,
		letterSpacing: -0.4,
		textAlign: "center"
	},

	inputText: {
		fontFamily: Fonts.poppins,
		fontSize: 14,
		lineHeight: 21,
		letterSpacing: -0.4
	},

	contentTextAccent: {
		fontFamily: Fonts.Poppins_Bold,
		fontSize: 14,
		lineHeight: 21
	},

	segmentItemContainer: {
		height: 42,
		borderRadius: 21,
		paddingHorizontal: 20
	},

	segmentItemText: {},

	// collection
	collectionContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		marginHorizontal: 16
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
		justifyContent: "center",
		marginTop: 24
	},

	collectionItemText: {
		textAlign: "center"
	}
});
