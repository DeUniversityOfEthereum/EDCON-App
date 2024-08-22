import { BackgroundGradient, ScrollSegment } from "@/app/(edcon)/components";
import EdconHuntNavigationBar from "@/app/(edcon)/hunt/components/NavigationBar";
import SectionContainer from "@/app/(edcon)/hunt/components/SectionContainer";
import { enum_web3_iyk_nft_type } from "@/enum/web3";
import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import Collections from "./Collections";
import { useEvents } from "./useEvents";

import type { EvnetProps } from "./useEvents";

export default function BadgeScreen() {
	const event = useEvents();
	const buttonItems = event.tabs;

	const [segmentIndex, setSegmentIndex] = useState(0);

	const onPressCollectionItem = (item: EvnetProps) => {
		const { contractAddress, tokenId, chainId } = item?.contract;
		router.navigate({
			pathname: "/(edcon)/hunt/badge/detail",
			params: {
				contractAddress,
				tokenId,
				chainId,
				collectionName: item?.nft?.collection?.name,
				type: enum_web3_iyk_nft_type.GuestbookEvents
			}
		});
	};

	const visibleCollections = event.showEvents;

	const sections = {
		collection: {
			text: "My Collection",
			detail: `${event.collectedTotal} / ${event.total}`
		},
		links: {
			text: "Links"
		}
	};

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />

			<BackgroundGradient />

			<EdconHuntNavigationBar />

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollContentContainer}
				refreshControl={<RefreshControl refreshing={event.isRefreshing} onRefresh={event.refresh} />}
			>
				<SectionContainer style={styles.heder} text={sections.collection.text} detail={sections.collection.detail}>
					<ScrollSegment
						items={buttonItems}
						selectedIndex={segmentIndex}
						spacing={4}
						bounces={false}
						itemContainerStyle={({ index }) => {
							return [styles.segmentItemContainer, { backgroundColor: index === segmentIndex ? "#7CD5EA" : "#fff" }];
						}}
						renderItem={({ item }) => {
							return <Text style={styles.contentTextAccent}>{item.label}</Text>;
						}}
						onChange={({ item, index }) => {
							event.onChangeTabs(item.value);
							setSegmentIndex(index);
						}}
					/>
					{event.isLoading ? (
						<ActivityIndicator />
					) : (
						<Collections
							data={visibleCollections ?? []}
							onPressItem={function (item) {
								onPressCollectionItem(item);
							}}
						/>
					)}
				</SectionContainer>
			</ScrollView>
		</View>
	);
}

const fonts = StyleSheet.create({
	poppins_24_500: {
		fontFamily: Fonts.Poppins_Medium,
		fontSize: 24
	}
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.light.grayBackground
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
		paddingTop: 32,
		gap: 32,
		paddingBottom: 32
	},

	heder: {
		paddingHorizontal: 16,
		gap: 24
	},

	headerTextContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between"
	},

	headerText: {
		...fonts.poppins_24_500
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

	//
	sectionContainer: {
		// marginTop: 32
	},

	locationContentContainer: {
		backgroundColor: "#FFFFFF",
		marginHorizontal: 16,
		paddingHorizontal: 16,
		paddingVertical: 8
	},
	locationItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: Colors.light.border,
		paddingVertical: 8
	},
	floorLine: {
		marginHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: Colors.light.border
	},
	// floating button
	scavengerHuntButton: {
		position: "absolute",
		right: -24,
		bottom: 20,
		height: 60
	},

	scavengerHuntImage: {
		width: "100%",
		minHeight: 1
	}
});
