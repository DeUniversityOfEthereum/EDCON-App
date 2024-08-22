import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { StatusBar } from "expo-status-bar";
import { FlatList, ListRenderItemInfo, RefreshControl, StyleSheet, Text, View } from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";
dayjs.extend(relativeTime);

import { BackgroundGradient } from "@/app/(edcon)/components";
import { ImageBackground } from "expo-image";
import EdconHuntNavigationBar from "../components/NavigationBar";

import { useLeaderboard } from "./useLeaderboard";

import type { LeaderboardProps } from "./useLeaderboard";

export default function LeaderboardScreen() {
	const { list, isPending, refetch } = useLeaderboard();

	const renderHeader = () => {
		return (
			<>
				<View style={styles.mainContainer}>
					<ImageBackground
						style={[styles.topImage, styles.center]}
						source={require("@/assets/images/edcon/hunt/board/board_banner.png")}
					>
						<Text style={[fonts.poppins_24_700, styles.topText]}>{"🏆EDCON 2024 Scavenger Hunt Leaderboard"}</Text>
					</ImageBackground>

					<View style={[styles.deadDateContainer, { justifyContent: "space-between" }]}>
						<View style={styles.deadDateContainer}>
							<View style={[styles.deadDateIconContainer, styles.center]}>
								<DeadDateIcon />
							</View>
							<View>
								<Text style={fonts.poppins_14_500}>{"0 day"}</Text>
								<Text style={[fonts.poppins_14_500, styles.deadDateDetail]}>{"Remaining time"}</Text>
							</View>
						</View>

						<View>
							<Text style={fonts.poppins_14_500}>{"Current Rank"}</Text>
							<Text style={[fonts.poppins_14_500, styles.deadDateDetail, { textAlign: "right" }]}>{"--"}</Text>
						</View>
					</View>
				</View>
				<ListHeader rows={["#", "USER", "NFTS Held"]} />
			</>
		);
	};
	return (
		<View style={styles.container}>
			<StatusBar style="auto" />

			<BackgroundGradient />

			<EdconHuntNavigationBar title={"Leaderboard"} />

			<FlatList
				// style={{ flex: 1 }}
				refreshControl={<RefreshControl colors={[Colors.light.primary]} refreshing={isPending} onRefresh={refetch} />}
				ListHeaderComponent={renderHeader()}
				contentContainerStyle={styles.listContainer}
				data={list}
				keyExtractor={(item, index) => `${index}`}
				renderItem={info => {
					return <BoardItem info={info} />;
				}}
			/>
		</View>
	);
}

function ListHeader(props: { rows: string[] }) {
	// ["#", "USER", "NFTS Held"]
	const { rows } = props;
	return (
		<View style={styles.listHeader}>
			<Text style={[fonts.poppins_11_500, styles.listItemRankText]}>{rows[0]}</Text>
			<Text style={[fonts.poppins_14_500, styles.listItemRankText]}>{rows[1]}</Text>
			<Text style={[fonts.poppins_14_500, styles.listItemRankText]}>{rows[2]}</Text>
		</View>
	);
}

function BoardItem(props: { info: ListRenderItemInfo<LeaderboardProps> }) {
	const { item, index } = props.info;
	const backgroundColor = index % 2 === 0 ? "#FFFFFF" : "#F5FDFF00";
	const rankIcon = () => {
		switch (item.order) {
			case 1:
				return <RankOrder1Icon />;
			case 2:
				return <RankOrder2Icon />;
			case 3:
				return <RankOrder3Icon />;
			default:
				return <Text style={[fonts.poppins_11_500, styles.listItemRankText]}>{item.order}</Text>;
		}
	};
	return (
		<View style={[styles.listItem, { backgroundColor }]}>
			<View style={[styles.listItemImage, { backgroundColor: index >= 3 ? Colors.light.edconPrimary : "FFFFFF00" }]}>
				{rankIcon()}
			</View>
			<Text numberOfLines={1} ellipsizeMode="middle" style={styles.listItemUser}>
				{item?.name ?? ""}
			</Text>
			<Text>{item.points ?? ""}</Text>
		</View>
	);
}

const fonts = StyleSheet.create({
	poppins_16_500: {
		fontFamily: Fonts.Poppins_Medium,
		fontSize: 16
	},
	poppins_14_500: {
		fontFamily: Fonts.Poppins_Medium,
		fontSize: 14
	},
	poppins_12_500: {
		fontFamily: Fonts.Poppins_Medium,
		fontSize: 12
	},
	poppins_11_500: {
		fontFamily: Fonts.Poppins_Medium,
		fontSize: 11
	},
	poppins_24_700: {
		fontFamily: Fonts.Poppins_Bold,
		fontSize: 16
	}
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.light.grayBackground
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	marginHorizontal: {
		marginHorizontal: 16
	},
	background: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: -1
	},
	overlayer: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
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

	mainContainer: {
		marginTop: 32,
		paddingHorizontal: 16,
		gap: 24
	},

	topImage: {
		width: "100%",
		aspectRatio: 360 / 128
	},
	topText: {
		color: "#FFFFFF",
		width: "50%",
		textAlign: "center"
	},

	titleText: {
		fontFamily: Fonts.poppins,
		fontSize: 24,
		lineHeight: 36
		// textAlign: "center"
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

	segmentItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6
	},

	list: {
		flex: 1
	},

	listContainer: {
		// paddingHorizontal: 16,
		// gap: 8
		// flex: 1
	},
	listHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: 56,
		width: "100%",
		paddingHorizontal: 16
	},
	listItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: 40,
		paddingHorizontal: 16
	},

	listItemImage: {
		width: 24,
		aspectRatio: 1,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center"
	},

	listItemRankText: {
		color: "#00000099"
	},

	listItemUser: {
		width: "70%"
	},

	// dead date
	deadDateContainer: {
		flexDirection: "row",
		gap: 8
	},
	deadDateIconContainer: {
		width: 44,
		aspectRatio: 1,
		borderColor: "#E764463D",
		borderWidth: 1,
		borderRadius: 8
	},
	deadDateDetail: {
		color: "#00000099"
	},

	claimButton: {
		marginHorizontal: 16,
		marginVertical: 10
	}
});

function DeadDateIcon() {
	return (
		<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<Path
				d="M17.6177 5.9681L19.0711 4.51472L20.4853 5.92893L19.0319 7.38231C20.2635 8.92199 21 10.875 21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13C3 8.02944 7.02944 4 12 4C14.125 4 16.078 4.73647 17.6177 5.9681ZM11 8V14H13V8H11ZM8 1H16V3H8V1Z"
				fill="#EB5851"
			/>
		</Svg>
	);
}

function RankOrder1Icon() {
	return (
		<Svg width="24" height="25" viewBox="0 0 24 25" fill="none">
			<Path d="M5 20.9138L8.2 20.3052L9.8 23.1452L12.4 17.668L7.4 15.4365L5 20.9138Z" fill="#94A5C5" />
			<Path
				d="M18.8008 20.9138L15.6008 20.3052L14.0008 23.1452L11.4008 17.668L16.4008 15.4365L18.8008 20.9138Z"
				fill="#65789B"
			/>
			<Path
				d="M18.7955 4.80849C18.8712 4.85281 18.9437 4.90195 19.0131 4.95591C19.0824 5.00988 19.1479 5.0682 19.2097 5.13088C19.2715 5.19356 19.329 5.26006 19.3822 5.33039C19.4354 5.40071 19.4838 5.47425 19.5276 5.55102C19.5712 5.62779 19.6098 5.70712 19.6433 5.789C19.6767 5.8709 19.7048 5.95466 19.7274 6.04028C19.75 6.1259 19.767 6.21265 19.7784 6.30054C19.7898 6.38842 19.7955 6.47668 19.7955 6.56532V13.3516C19.7955 13.4403 19.7898 13.5286 19.7784 13.6165C19.767 13.7043 19.75 13.791 19.7274 13.8766C19.7048 13.9623 19.6767 14.0461 19.6433 14.128C19.6098 14.2099 19.5712 14.2892 19.5276 14.3659C19.4838 14.4427 19.4354 14.5162 19.3822 14.5866C19.329 14.6569 19.2715 14.7234 19.2097 14.7861C19.1479 14.8488 19.0824 14.9071 19.0131 14.961C18.9437 15.015 18.8712 15.0642 18.7955 15.1085L13.0013 18.5016C12.9256 18.5459 12.8474 18.5851 12.7666 18.619C12.6859 18.6529 12.6033 18.6813 12.5189 18.7043C12.4345 18.7273 12.349 18.7445 12.2623 18.7561C12.1757 18.7676 12.0887 18.7734 12.0013 18.7734C11.9139 18.7734 11.8269 18.7676 11.7402 18.7561C11.6536 18.7445 11.568 18.7273 11.4836 18.7043C11.3992 18.6813 11.3166 18.6529 11.2359 18.619C11.1552 18.5851 11.0769 18.5459 11.0013 18.5016L5.20703 15.1085C5.13135 15.0642 5.05884 15.015 4.98951 14.961C4.92018 14.9071 4.85461 14.8488 4.79282 14.7861C4.73103 14.7234 4.67353 14.6569 4.62033 14.5866C4.56712 14.5162 4.51867 14.4427 4.47498 14.3659C4.43129 14.2892 4.39272 14.2099 4.35927 14.128C4.32583 14.0461 4.2978 13.9623 4.27518 13.8766C4.25256 13.791 4.23555 13.7043 4.22414 13.6165C4.21273 13.5286 4.20703 13.4403 4.20703 13.3516V6.56532C4.20703 6.47668 4.21273 6.38842 4.22414 6.30054C4.23555 6.21265 4.25256 6.1259 4.27518 6.04028C4.2978 5.95466 4.32583 5.8709 4.35927 5.789C4.39272 5.70712 4.43129 5.62779 4.47498 5.55102C4.51867 5.47425 4.56712 5.40071 4.62032 5.33039C4.67353 5.26006 4.73103 5.19356 4.79282 5.13088C4.85461 5.0682 4.92018 5.00988 4.98951 4.95591C5.05884 4.90195 5.13135 4.85281 5.20703 4.80849L11.0013 1.41534C11.0769 1.37102 11.1552 1.3319 11.2359 1.29797C11.3166 1.26405 11.3992 1.23562 11.4836 1.21268C11.568 1.18974 11.6536 1.17248 11.7402 1.16091C11.8269 1.14934 11.9139 1.14355 12.0013 1.14355C12.0887 1.14355 12.1757 1.14934 12.2623 1.16091C12.349 1.17248 12.4345 1.18974 12.5189 1.21268C12.6033 1.23562 12.6859 1.26405 12.7666 1.29797C12.8474 1.3319 12.9256 1.37102 13.0013 1.41534L18.7955 4.80849Z"
				fill="url(#paint0_linear_4301_2867)"
			/>
			<Path d="M10.5721 6.65137V5.50737H12.8601V13.5264H11.5951V6.65137H10.5721Z" fill="white" />
			<Defs>
				<LinearGradient
					id="paint0_linear_4301_2867"
					x1="15.1198"
					y1="2.178"
					x2="11.9146"
					y2="18.7567"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#FFE7A7" />
					<Stop offset="1" stopColor="#F6BF29" />
				</LinearGradient>
			</Defs>
		</Svg>
	);
}

function RankOrder2Icon() {
	return (
		<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<Path d="M5 20.7692L8.2 20.1607L9.8 23.0007L12.4 17.5235L7.4 15.292L5 20.7692Z" fill="#94A5C5" />
			<Path
				d="M18.8008 20.7692L15.6008 20.1607L14.0008 23.0007L11.4008 17.5235L16.4008 15.292L18.8008 20.7692Z"
				fill="#65789B"
			/>
			<Path
				d="M18.7955 4.66396C18.8712 4.70828 18.9437 4.75742 19.0131 4.81138C19.0824 4.86535 19.1479 4.92367 19.2097 4.98635C19.2715 5.04903 19.329 5.11553 19.3822 5.18585C19.4354 5.25618 19.4838 5.32972 19.5276 5.40649C19.5712 5.48325 19.6098 5.56258 19.6433 5.64447C19.6767 5.72637 19.7048 5.81013 19.7274 5.89575C19.75 5.98137 19.767 6.06812 19.7784 6.15601C19.7898 6.24389 19.7955 6.33215 19.7955 6.42079V13.2071C19.7955 13.2958 19.7898 13.384 19.7784 13.4719C19.767 13.5598 19.75 13.6465 19.7274 13.7321C19.7048 13.8178 19.6767 13.9016 19.6433 13.9835C19.6098 14.0653 19.5712 14.1447 19.5276 14.2214C19.4838 14.2982 19.4354 14.3717 19.3822 14.442C19.329 14.5123 19.2715 14.5789 19.2097 14.6415C19.1479 14.7042 19.0824 14.7625 19.0131 14.8165C18.9437 14.8705 18.8712 14.9196 18.7955 14.964L13.0013 18.357C12.9256 18.4014 12.8474 18.4406 12.7666 18.4745C12.6859 18.5084 12.6033 18.5368 12.5189 18.5598C12.4345 18.5827 12.349 18.6 12.2623 18.6115C12.1757 18.6231 12.0887 18.6289 12.0013 18.6289C11.9139 18.6289 11.8269 18.6231 11.7402 18.6115C11.6536 18.6 11.568 18.5827 11.4836 18.5598C11.3992 18.5368 11.3166 18.5084 11.2359 18.4745C11.1552 18.4406 11.0769 18.4014 11.0013 18.357L5.20703 14.964C5.13135 14.9196 5.05884 14.8705 4.98951 14.8165C4.92018 14.7625 4.85461 14.7042 4.79282 14.6415C4.73103 14.5789 4.67353 14.5123 4.62033 14.442C4.56712 14.3717 4.51867 14.2982 4.47498 14.2214C4.43129 14.1447 4.39272 14.0653 4.35927 13.9835C4.32583 13.9016 4.2978 13.8178 4.27518 13.7321C4.25256 13.6465 4.23555 13.5598 4.22414 13.4719C4.21273 13.384 4.20703 13.2958 4.20703 13.2071V6.42079C4.20703 6.33215 4.21273 6.24389 4.22414 6.15601C4.23555 6.06812 4.25256 5.98137 4.27518 5.89575C4.2978 5.81013 4.32583 5.72637 4.35927 5.64447C4.39272 5.56258 4.43129 5.48325 4.47498 5.40649C4.51867 5.32972 4.56712 5.25618 4.62032 5.18585C4.67353 5.11553 4.73103 5.04903 4.79282 4.98635C4.85461 4.92367 4.92018 4.86535 4.98951 4.81138C5.05884 4.75742 5.13135 4.70828 5.20703 4.66396L11.0013 1.27081C11.0769 1.22649 11.1552 1.18736 11.2359 1.15344C11.3166 1.11952 11.3992 1.09109 11.4836 1.06815C11.568 1.0452 11.6536 1.02795 11.7402 1.01638C11.8269 1.00481 11.9139 0.999023 12.0013 0.999023C12.0887 0.999023 12.1757 1.00481 12.2623 1.01638C12.349 1.02795 12.4345 1.0452 12.5189 1.06815C12.6033 1.09109 12.6859 1.11952 12.7666 1.15344C12.8474 1.18736 12.9256 1.22649 13.0013 1.27081L18.7955 4.66396Z"
				fill="url(#paint0_linear_4301_2874)"
			/>
			<Path
				d="M11.5299 10.3128C12.1459 9.7115 12.5786 9.2165 12.8279 8.82784C13.0773 8.43917 13.2019 8.05417 13.2019 7.67284C13.2019 7.2915 13.0956 6.99084 12.8829 6.77084C12.6703 6.5435 12.3366 6.42984 11.8819 6.42984C11.4566 6.42984 11.1266 6.57284 10.8919 6.85884C10.6573 7.1375 10.5326 7.5225 10.5179 8.01384H9.30792C9.32992 7.1485 9.57926 6.49217 10.0559 6.04484C10.5399 5.59017 11.1523 5.36284 11.8929 5.36284C12.6996 5.36284 13.3303 5.5755 13.7849 6.00084C14.2396 6.41884 14.4669 6.97617 14.4669 7.67284C14.4669 8.17884 14.3166 8.68484 14.0159 9.19084C13.7226 9.6895 13.2093 10.2982 12.4759 11.0168L11.1339 12.3368H14.6649V13.3818H9.31892V12.4688L11.5299 10.3128Z"
				fill="white"
			/>
			<Defs>
				<LinearGradient
					id="paint0_linear_4301_2874"
					x1="15.1198"
					y1="2.03347"
					x2="11.9146"
					y2="18.6121"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#C1CEE6" />
					<Stop offset="1" stopColor="#4167AD" />
				</LinearGradient>
			</Defs>
		</Svg>
	);
}

function RankOrder3Icon() {
	return (
		<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<Path d="M5 20.7692L8.2 20.1607L9.8 23.0007L12.4 17.5235L7.4 15.292L5 20.7692Z" fill="#94A5C5" />
			<Path
				d="M18.8008 20.7692L15.6008 20.1607L14.0008 23.0007L11.4008 17.5235L16.4008 15.292L18.8008 20.7692Z"
				fill="#65789B"
			/>
			<Path
				d="M18.7955 4.66396C18.8712 4.70828 18.9437 4.75742 19.0131 4.81138C19.0824 4.86535 19.1479 4.92367 19.2097 4.98635C19.2715 5.04903 19.329 5.11553 19.3822 5.18585C19.4354 5.25618 19.4838 5.32972 19.5276 5.40649C19.5712 5.48325 19.6098 5.56258 19.6433 5.64447C19.6767 5.72637 19.7048 5.81013 19.7274 5.89575C19.75 5.98137 19.767 6.06812 19.7784 6.15601C19.7898 6.24389 19.7955 6.33215 19.7955 6.42079V13.2071C19.7955 13.2958 19.7898 13.384 19.7784 13.4719C19.767 13.5598 19.75 13.6465 19.7274 13.7321C19.7048 13.8178 19.6767 13.9016 19.6433 13.9835C19.6098 14.0653 19.5712 14.1447 19.5276 14.2214C19.4838 14.2982 19.4354 14.3717 19.3822 14.442C19.329 14.5123 19.2715 14.5789 19.2097 14.6415C19.1479 14.7042 19.0824 14.7625 19.0131 14.8165C18.9437 14.8705 18.8712 14.9196 18.7955 14.964L13.0013 18.357C12.9256 18.4014 12.8474 18.4406 12.7666 18.4745C12.6859 18.5084 12.6033 18.5368 12.5189 18.5598C12.4345 18.5827 12.349 18.6 12.2623 18.6115C12.1757 18.6231 12.0887 18.6289 12.0013 18.6289C11.9139 18.6289 11.8269 18.6231 11.7402 18.6115C11.6536 18.6 11.568 18.5827 11.4836 18.5598C11.3992 18.5368 11.3166 18.5084 11.2359 18.4745C11.1552 18.4406 11.0769 18.4014 11.0013 18.357L5.20703 14.964C5.13135 14.9196 5.05884 14.8705 4.98951 14.8165C4.92018 14.7625 4.85461 14.7042 4.79282 14.6415C4.73103 14.5789 4.67353 14.5123 4.62033 14.442C4.56712 14.3717 4.51867 14.2982 4.47498 14.2214C4.43129 14.1447 4.39272 14.0653 4.35927 13.9835C4.32583 13.9016 4.2978 13.8178 4.27518 13.7321C4.25256 13.6465 4.23555 13.5598 4.22414 13.4719C4.21273 13.384 4.20703 13.2958 4.20703 13.2071V6.42079C4.20703 6.33215 4.21273 6.24389 4.22414 6.15601C4.23555 6.06812 4.25256 5.98137 4.27518 5.89575C4.2978 5.81013 4.32583 5.72637 4.35927 5.64447C4.39272 5.56258 4.43129 5.48325 4.47498 5.40649C4.51867 5.32972 4.56712 5.25618 4.62032 5.18585C4.67353 5.11553 4.73103 5.04903 4.79282 4.98635C4.85461 4.92367 4.92018 4.86535 4.98951 4.81138C5.05884 4.75742 5.13135 4.70828 5.20703 4.66396L11.0013 1.27081C11.0769 1.22649 11.1552 1.18736 11.2359 1.15344C11.3166 1.11952 11.3992 1.09109 11.4836 1.06815C11.568 1.0452 11.6536 1.02795 11.7402 1.01638C11.8269 1.00481 11.9139 0.999023 12.0013 0.999023C12.0887 0.999023 12.1757 1.00481 12.2623 1.01638C12.349 1.02795 12.4345 1.0452 12.5189 1.06815C12.6033 1.09109 12.6859 1.11952 12.7666 1.15344C12.8474 1.18736 12.9256 1.22649 13.0013 1.27081L18.7955 4.66396Z"
				fill="url(#paint0_linear_4301_2881)"
			/>
			<Path
				d="M12.3611 8.36584C13.1017 8.4245 13.6811 8.67017 14.0991 9.10284C14.5171 9.5355 14.7261 10.1185 14.7261 10.8518C14.7261 11.6438 14.4767 12.2708 13.9781 12.7328C13.4867 13.1948 12.8121 13.4258 11.9541 13.4258C11.1767 13.4258 10.5351 13.2242 10.0291 12.8208C9.5304 12.4102 9.26273 11.8235 9.22607 11.0608H10.4801C10.5094 11.4495 10.6524 11.7685 10.9091 12.0178C11.1657 12.2598 11.5214 12.3808 11.9761 12.3808C12.4381 12.3808 12.8011 12.2452 13.0651 11.9738C13.3364 11.7025 13.4721 11.3285 13.4721 10.8518C13.4721 10.3825 13.3401 10.0158 13.0761 9.75184C12.8121 9.4805 12.4491 9.34484 11.9871 9.34484H10.8541V8.45384L12.8341 6.40784H9.61107V5.36284H14.3521V6.31984L12.3611 8.36584Z"
				fill="white"
			/>
			<Defs>
				<LinearGradient
					id="paint0_linear_4301_2881"
					x1="15.1198"
					y1="2.03347"
					x2="11.9146"
					y2="18.6121"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stop-color="#FFDCA7" />
					<Stop offset="1" stop-color="#F67F29" />
				</LinearGradient>
			</Defs>
		</Svg>
	);
}
