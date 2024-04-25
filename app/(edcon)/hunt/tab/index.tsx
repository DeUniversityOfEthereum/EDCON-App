import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Path, Svg } from "react-native-svg";
import BadgeScreen from "../badge";
import BenefitsScreen from "../benefits";
import TabHuntScreen from "../hunt";

type TarBarIconProps = { focused: boolean; color: string; size: number };

const Tab = createBottomTabNavigator();
export function TabScreen() {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarActiveTintColor: "#000"
			}}
		>
			<Tab.Screen
				name="Collection"
				component={BadgeScreen}
				options={_props => {
					return {
						tabBarIcon: props2 => BookmarkLineIcon24(props2),
						headerShown: false
					};
				}}
			/>
			<Tab.Screen
				name="Benefits"
				component={BenefitsScreen}
				options={_props => {
					return {
						tabBarIcon: props2 => GiftIcon24(props2),
						headerShown: false
					};
				}}
			/>
			<Tab.Screen
				name="Hunt"
				component={TabHuntScreen}
				options={_props => {
					return {
						tabBarIcon: props2 => TreasureMapLineIcon24(props2),
						headerShown: false
					};
				}}
			/>
		</Tab.Navigator>
	);
}

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

function GiftIcon24({ focused }: TarBarIconProps) {
	const fill = "black";
	const fillOpacity = focused === false ? "0.4" : "1";
	return (
		<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<Path
				d="M14.5039 2.00293C16.4369 2.00293 18.0039 3.56993 18.0039 5.50293C18.0039 6.04013 17.8829 6.54907 17.6666 7.00397L21.0039 7.00293C21.5562 7.00293 22.0039 7.45064 22.0039 8.00293V12.0029C22.0039 12.5552 21.5562 13.0029 21.0039 13.0029H20.0039V21.0029C20.0039 21.5552 19.5562 22.0029 19.0039 22.0029H5.00391C4.45163 22.0029 4.00391 21.5552 4.00391 21.0029V13.0029H3.00391C2.45163 13.0029 2.00391 12.5552 2.00391 12.0029V8.00293C2.00391 7.45064 2.45163 7.00293 3.00391 7.00293L6.34122 7.00397C6.12494 6.54907 6.00391 6.04013 6.00391 5.50293C6.00391 3.56993 7.57092 2.00293 9.50391 2.00293C10.4839 2.00293 11.3698 2.40569 12.0051 3.05471C12.638 2.40569 13.5239 2.00293 14.5039 2.00293ZM18.0039 13.0029H6.00391V20.0029H18.0039V13.0029ZM20.0039 9.00293H4.00391V11.0029H20.0039V9.00293ZM9.50391 4.00293C8.67549 4.00293 8.00391 4.6745 8.00391 5.50293C8.00391 6.28262 8.5988 6.92338 9.35945 6.99606L9.50391 7.00293H11.0039V5.50293C11.0039 4.72323 10.409 4.08248 9.64837 4.00979L9.50391 4.00293ZM14.5039 4.00293L14.3594 4.00979C13.6463 4.07794 13.0789 4.64536 13.0107 5.35847L13.0039 5.50293V7.00293H14.5039L14.6483 6.99606C15.409 6.92338 16.0039 6.28262 16.0039 5.50293C16.0039 4.72323 15.409 4.08248 14.6483 4.00979L14.5039 4.00293Z"
				fill={fill}
				fillOpacity={fillOpacity}
			/>
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

export default function EDCONScreen() {
	return (
		<>
			<TabScreen />
		</>
	);
}
