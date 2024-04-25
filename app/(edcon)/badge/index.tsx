import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Path, Svg } from "react-native-svg";
import { Button } from "../components/Button";

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

export default function BadgeListScreen() {
	const width = Dimensions.get("window").width;
	const row = 3;
	const itemWidth = (width - (row - 1) * 24 - 16 * 2) / row;
	const gotCount = collections.reduce<number>((previousValue, currentValue) => {
		return previousValue + currentValue.got;
	}, 0);

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
				<SafeAreaView>
					<View style={styles.navigationHeader}>
						<Button
							style={styles.gobackIcon}
							onPress={() => {
								router.back();
							}}
						>
							<ArrowLeftLineIcon />
						</Button>
						<Text style={styles.headerTitle}>{"MY COLLECTION"}</Text>
						<Text style={styles.collectionheadText}>{`${gotCount} / ${collections.length}`}</Text>
					</View>

					<View style={styles.mainContainer}>
						<View style={styles.gridContainer}>
							{collections.map((colection, i) => {
								return (
									<View key={i} style={[styles.collectionItem, { opacity: colection.got === 1 ? 1 : 0.2 }]}>
										<Image
											style={{
												width: itemWidth,
												height: itemWidth,
												borderRadius: itemWidth * 0.5,
												backgroundColor: "#CCCCCC"
											}}
										/>
										<Text style={styles.collectionItemText}>{colection.name}</Text>
									</View>
								);
							})}
						</View>
					</View>
				</SafeAreaView>
			</ScrollView>
		</View>
	);
}

function ArrowLeftLineIcon() {
	return (
		<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<Path
				d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"
				fill="black"
			/>
		</Svg>
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
		borderWidth: StyleSheet.hairlineWidth,

		backgroundColor: "#FFFFFF"
	},

	mainContainer: {
		marginTop: 8,
		paddingHorizontal: 16
	},

	gridContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between"
	},

	// collection
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
