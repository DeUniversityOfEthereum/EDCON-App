import { toast } from "@/components/toast/Toast";
import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import { UPressable } from "@u";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Circle, ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";
import { useClaimedNFT } from "./useClaimedNFT";

import { BackgroundGradient, ScrollSegment } from "@/app/(edcon)/components";

import { useEvents } from "@/app/(edcon)/hunt/badge/useEvents";
import EdconHuntNavigationBar from "@/app/(edcon)/hunt/components/NavigationBar";
import SectionContainer from "@/app/(edcon)/hunt/components/SectionContainer";

export default function BadgeDetailScreen() {
	const { isClaimed, nftData, websiteUrl, onClaimed, isCanClaim: canClaim } = useClaimedNFT();
	const event = useEvents();

	const onClaimLink = async () => {
		const res = await onClaimed();
		if (res === null) {
			toast.current?.error("Fail to Claim");
		}
	};

	const info = {
		title: "EDCON 2024 Scavenger Hunt",
		description: "claim your reward"
	};

	const segmentItems = [{ title: "CLAIM", key: "claim", onPress: onClaimLink }];

	const sections = {
		claimed: {
			text: "Held By",
			detail: nftData?.contract?.address ?? ""
		},
		nft: {
			text: "NFT Description",
			description: nftData?.description ?? "",
			buttons: [
				{
					text: "View on Basescan",
					link: websiteUrl.basescan
				},
				{
					text: "View on Opensea",
					link: websiteUrl.opensea
				}
			]
		},
		createBy: {
			text: "Create By"
		}
	};

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />

			<BackgroundGradient />

			<EdconHuntNavigationBar />

			<ScrollView
				contentContainerStyle={styles.scrollContentContainer}
				refreshControl={<RefreshControl refreshing={event.isRefreshing} onRefresh={event.refresh} />}
			>
				<SafeAreaView edges={["bottom", "left", "right"]} style={{ gap: 24 }}>
					<View style={styles.poweredByRow}>
						<IykLogoIcon />
						<Text style={styles.powerByText}>{"IYK"}</Text>
					</View>

					<View style={styles.mainContainer}>
						<View style={{ gap: 6 }}>
							<Text style={styles.contentText}>{info.title}</Text>
							<Text style={styles.titleText}>{nftData?.name}</Text>
						</View>

						<View style={styles.badgeContainer}>
							{!isClaimed && canClaim && (
								<ScrollSegment
									items={segmentItems}
									selectedIndex={-1}
									bounces={false}
									itemContainerStyle={() => {
										const backgroundColor = canClaim ? "#FFFFFF" : "#E8EBEF";
										return { height: 42, borderRadius: 21, backgroundColor: backgroundColor };
									}}
									renderItem={function ({ item }) {
										return (
											<View>
												<Text style={[styles.contentTextAccent, { opacity: canClaim ? 1 : 0.5 }]}>{item.title}</Text>
											</View>
										);
									}}
									onChange={({ item }) => {
										item.onPress?.();
									}}
								/>
							)}

							<Image
								style={{ width: "100%", height: 400 }}
								contentFit="contain"
								source={{ uri: nftData?.image?.originalUrl?.trim() }}
							/>
						</View>
					</View>

					<SectionContainer style={styles.sectionContainer} text={sections.nft.text}>
						<Text style={fonts.poppins_14_400}>{sections.nft.description}</Text>
					</SectionContainer>

					<SectionContainer style={styles.sectionContainer}>
						<View style={styles.nftLinkContainer}>
							{sections.nft?.buttons
								?.filter(it => it.link)
								?.map(it => (
									<UPressable key={it.text} style={styles.nftLinkButton}>
										<Text style={styles.nftLinkButtonText}>{it.text}</Text>
										<ArrowRightLineIcon />
									</UPressable>
								))}
						</View>
					</SectionContainer>
				</SafeAreaView>
			</ScrollView>
		</View>
	);
}

function IykLogoIcon() {
	return (
		<Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
			<G clipPath="url(#clip0_4014_13170)">
				<Circle cx="14" cy="14" r="14" fill="#222222" />
				<Path
					d="M18.0484 11.3495L14.5581 13.2312V9.33337H13.4413V13.2312L9.95101 11.3495L9.39258 12.1559L12.8828 14.172L9.39258 16.1881L9.95101 16.9946L13.4413 15.1129V19.0107H14.5581V15.1129L18.0484 16.9946L18.6068 16.1881L15.1166 14.172L18.6068 12.1559L18.0484 11.3495Z"
					fill="white"
				/>
			</G>
			<Defs>
				<ClipPath id="clip0_4014_13170">
					<Rect width="28" height="28" fill="white" />
				</ClipPath>
			</Defs>
		</Svg>
	);
}

function ArrowRightLineIcon() {
	return (
		<Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
			<Path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M11.5303 5.46978L11 4.93945L9.93934 6.00011L10.4697 6.53044L13.1893 9.25011H5H4.25V10.7501H5H13.1893L10.4697 13.4698L9.93934 14.0001L11 15.0608L11.5303 14.5304L15.5303 10.5304L16.0607 10.0001L15.5303 9.46978L11.5303 5.46978Z"
				fill="#1A1A1A"
			/>
		</Svg>
	);
}

const fonts = StyleSheet.create({
	poppins_24_500: {
		fontFamily: Fonts.Poppins_Medium,
		fontSize: 24
	},
	poppins_14_500: {
		fontFamily: Fonts.Poppins_Medium,
		fontSize: 14
	},
	poppins_12_500: {
		fontFamily: Fonts.Poppins_Medium,
		fontSize: 12
	},
	poppins_14_400: {
		fontFamily: Fonts.Poppins_Regular,
		fontSize: 14
	}
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.light.grayBackground
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
		borderColor: Colors.light.border,
		borderWidth: StyleSheet.hairlineWidth
	},

	background: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: -1
	},

	poweredByRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingTop: 16
	},
	powerByText: {
		fontFamily: Fonts.Poppins_Bold,
		fontSize: 12,
		color: "#202020"
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
		paddingBottom: 24
	},

	mainContainer: {
		paddingHorizontal: 16
	},

	descriptionContainer: {},

	titleText: {
		fontFamily: Fonts.poppins,
		fontSize: 24,
		lineHeight: 36
	},

	contentText: {
		fontFamily: Fonts.poppins,
		fontSize: 14,
		lineHeight: 21,
		letterSpacing: -0.4
	},

	textCenter: {
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

	badgeContainer: {
		width: "100%",
		alignItems: "center"
	},

	badgeImageWrapper: {
		width: "100%",
		aspectRatio: 1,
		backgroundColor: "#00000019",
		overflow: "hidden"
	},

	badgeListHeaderText: {
		fontFamily: Fonts.poppins,
		fontSize: 20,
		fontWeight: "500",
		marginBottom: 12
	},

	badgeListContainer: {
		paddingHorizontal: 16
	},

	sectionContainer: {
		gap: 24,
		paddingHorizontal: 16
	},
	sectionSeparatorLine: {
		borderColor: "#0000001A",
		borderBottomWidth: 1,
		height: 1
	},

	nftContainer: {
		marginTop: 32,
		paddingHorizontal: 16
	},
	nftText: {},
	nftDetail: {},
	nftLinkContainer: {
		gap: 16
	},
	nftLinkButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4
	},
	nftLinkButtonText: {
		color: "#202020",
		...fonts.poppins_24_500
	},

	// collection
	collectionContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		rowGap: 24
	},
	collectionItem: {
		gap: 8,
		justifyContent: "center"
	},
	collectionItemText: {
		textAlign: "center"
	}
});
