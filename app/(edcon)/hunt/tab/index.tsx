import Colors from "@/constants/Colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";
import BadgeScreen from "../badge";
import LeaderboardScreen from "../leaderboard";
import MapScreen from "../map";

type TarBarIconProps = { focused: boolean; color: string; size: number };

const Tab = createBottomTabNavigator();
const tabContentHeight = 64;

export enum enum_hunt_tab_route_name {
	Collection = "(edcon)/hunt/badge/index",
	Leaderboard = "(edcon)/hunt/leaderboard/index",
	Map = "(edcon)/hunt/map/index"
}

export function TabScreen() {
	const insets = useSafeAreaInsets();

	const tabs = {
		collection: {
			title: "Collection"
		},
		leaderboard: {
			title: "Leaderboard"
		},
		map: {
			title: "Map"
		}
	};

	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: [
					Platform.select({
						android: { paddingBottom: 4, paddingHorizontal: 16 },
						default: {}
					}),
					{
						backgroundColor: Colors.light.grayBackground
					},
					{ minHeight: tabContentHeight + insets.bottom }
				],
				tabBarActiveTintColor: "#000"
			}}
		>
			<Tab.Screen
				name={enum_hunt_tab_route_name.Collection}
				component={BadgeScreen}
				options={_props => {
					return {
						tabBarIcon: props2 => BookmarkLineIcon24(props2),
						title: tabs.collection.title,
						headerShown: false
					};
				}}
			/>
			<Tab.Screen
				name={enum_hunt_tab_route_name.Leaderboard}
				component={LeaderboardScreen}
				options={_props => {
					return {
						tabBarIcon: props2 => LeaderboardIcon(props2),
						title: tabs.leaderboard.title,
						headerShown: false
					};
				}}
			/>
			<Tab.Screen
				name={enum_hunt_tab_route_name.Map}
				component={MapScreen}
				options={_props => {
					return {
						tabBarIcon: props2 => TreasureMapLineIcon24(props2),
						title: tabs.map.title,
						headerShown: false
					};
				}}
			/>
		</Tab.Navigator>
	);
}

// const styles = StyleSheet.create({
// 	gobackIcon: {
// 		width: 48,
// 		height: 48,
// 		borderRadius: 40,
// 		borderColor: "#00000019",
// 		borderWidth: StyleSheet.hairlineWidth,

// 		backgroundColor: "#FFFFFF",
// 		justifyContent: "center",
// 		alignItems: "center"
// 	},

// 	headerBackground: {
// 		flex: 1,
// 		backgroundColor: Colors.light.grayBackground
// 	}
// });

// function GoBack(props: { onPress: () => void }) {
// 	return (
// 		<Pressable style={[styles.gobackIcon, { marginLeft: 16 }]} onPress={props.onPress}>
// 			<ArrowLeftLineIcon />
// 		</Pressable>
// 	);
// }

// function Header(props: { title?: () => React.ReactNode; left?: () => React.ReactNode; right?: () => React.ReactNode }) {
// 	const insets = useSafeAreaInsets();
// 	return (
// 		<View style={{ paddingTop: insets.top, backgroundColor: Colors.light.grayBackground }}>
// 			<View style={{ height: 44, justifyContent: "center", flexDirection: "row" }}>
// 				<View style={{ flex: 1, justifyContent: "center" }}>{props.left?.() ?? null}</View>
// 				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>{props.title?.() ?? null}</View>
// 				<View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>{props.right?.() ?? null}</View>
// 			</View>
// 		</View>
// 	);
// }

function BookmarkLineIcon24({ focused }: TarBarIconProps) {
	const fill = "black";
	const fillOpacity = focused === false ? "0.4" : "1";

	return (
		<Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
			<Path
				d="M5.5 2H19.5C20.0523 2 20.5 2.44772 20.5 3V22.1433C20.5 22.4194 20.2761 22.6434 20 22.6434C19.9061 22.6434 19.814 22.6168 19.7344 22.5669L12.5 18.0313L5.26559 22.5669C5.03163 22.7136 4.72306 22.6429 4.57637 22.4089C4.52647 22.3293 4.5 22.2373 4.5 22.1433V3C4.5 2.44772 4.94772 2 5.5 2ZM18.5 4H6.5V19.4324L12.5 15.6707L18.5 19.4324V4Z"
				fill={fill}
				fillOpacity={fillOpacity}
			/>
		</Svg>
	);
}

function LeaderboardIcon(props: TarBarIconProps) {
	const { focused } = props;
	const fill = "black";
	const fillOpacity = focused === false ? "0.4" : "1";
	return (
		<Svg width="24" height="25" viewBox="0 0 24 25" fill="none">
			<G clipPath="url(#clip0_4301_3094)">
				<Path
					d="M6.77124 22.9973C5.31487 22.9973 3.85578 22.9973 2.35156 22.9973C2.35156 19.5955 2.35156 16.1868 2.35156 12.7063C3.83962 12.7063 5.28235 12.7063 6.77124 12.7063C6.77124 16.1375 6.77124 19.5446 6.77124 22.9973ZM14.1505 22.9851C12.7231 22.9851 11.2711 22.9851 9.78403 22.9851C9.78403 16.1264 9.78403 9.29023 9.78403 2.36133C11.2559 2.36133 12.6768 2.36133 14.1505 2.36133C14.1505 9.21861 14.1505 16.073 14.1505 22.9851ZM21.6683 23.0046C20.2043 23.0046 18.7613 23.0046 17.2636 23.0046C17.2636 18.3158 17.2636 13.617 17.2636 8.8564C18.7102 8.8564 20.1666 8.8564 21.6683 8.8564C21.6683 13.5651 21.6683 18.2655 21.6683 23.0046Z"
					stroke={fill}
					strokeOpacity={fillOpacity}
					strokeWidth="2"
				/>
			</G>
			<Defs>
				<ClipPath id="clip0_4301_3094">
					<Rect width="24" height="24" fill="white" transform="translate(0 0.361328)" />
				</ClipPath>
			</Defs>
		</Svg>
	);
}

function TreasureMapLineIcon24({ focused }: TarBarIconProps) {
	const fill = "black";
	const fillOpacity = focused === false ? "0.4" : "1";
	return (
		<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<Path
				d="M14.9352 7.20369L8.93524 4.20369L4 6.31879V18.9669L9.06476 16.7963L15.0648 19.7963L20 17.6812V5.03308L14.9352 7.20369ZM2 5L9 2L15 5L21.303 2.2987C21.5569 2.18992 21.8508 2.30749 21.9596 2.56131C21.9862 2.62355 22 2.69056 22 2.75827V19L15 22L9 19L2.69696 21.7013C2.44314 21.8101 2.14921 21.6925 2.04043 21.4387C2.01375 21.3765 2 21.3094 2 21.2417V5ZM6 11H8V13H6V11ZM10 11H12V13H10V11ZM15.9981 10.9374L17.2355 9.7L18.2962 10.7607L17.0588 11.9981L18.2962 13.2355L17.2355 14.2962L15.9981 13.0588L14.7607 14.2962L13.7 13.2355L14.9374 11.9981L13.7 10.7607L14.7607 9.7L15.9981 10.9374Z"
				fill={fill}
				fillOpacity={fillOpacity}
			/>
		</Svg>
	);
}

// export default MyTabs

export default function EDCONScreen() {
	return (
		<>
			<TabScreen />
		</>
	);
}
