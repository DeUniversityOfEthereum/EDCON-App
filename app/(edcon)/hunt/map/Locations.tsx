import { UPressable } from "@/components/u";
import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import { Linking, Platform, StyleSheet, Text, View } from "react-native";
import { Path, Svg } from "react-native-svg";

export default function RemainingLocations() {
	const list = [
		{
			event_name: "Event Name 1",
			adress_name: "Address Name 1",
			date: "Date",
			latitude: 0,
			longitude: 0
		},
		{
			event_name: "Event Name 2",
			adress_name: "Address Name 2",
			date: "Date",
			latitude: 0,
			longitude: 0
		},
		{
			event_name: "Event Name 3",
			adress_name: "Address Name 3",
			date: "Date",
			latitude: 0,
			longitude: 0
		}
	];

	return (
		list &&
		list?.length > 0 && (
			<>
				<SectionHeader text={"Remaining Locations"} />
				<View style={styles.locationContentContainer}>
					{list?.map((item, index) => {
						return <RemainingLocationItem key={index} item={item} />;
					})}
				</View>
			</>
		)
	);
}
function SectionHeader(props: { text: string }) {
	return (
		<View style={styles.heder}>
			<Text style={fonts.poppins_24_500}>{props.text}</Text>
		</View>
	);
}

function RemainingLocationItem(props: { item: any }) {
	const { item } = props;
	const onLink = () => {
		if (item?.map_url) {
			Linking.openURL(item.map_url);
		}
	};

	return (
		<View style={styles.locationItem}>
			<View style={styles.locationItemLeftContainer}>
				<Text style={fonts.poppins_16_500}>{item.event_name}</Text>
				<Text style={fonts.poppins_14_500}>{"0 miles"}</Text>
				<Text style={fonts.poppins_12_400}>{item.adress_name}</Text>
			</View>
			<UPressable style={styles.locationItemRightIndicator} onPress={onLink}>
				<ArrowRightUpIcon />
			</UPressable>
		</View>
	);
}

const fonts = StyleSheet.create({
	poppins_24_500: {
		fontFamily: Fonts.Poppins_Medium,
		fontSize: 24
	},
	poppins_16_500: {
		fontFamily: Fonts.Poppins_Medium,
		fontSize: 16
	},
	poppins_14_500: {
		fontFamily: Fonts.Poppins_Medium,
		fontSize: 14
	},
	poppins_12_400: {
		fontFamily: Fonts.Poppins_Regular,
		fontSize: 12
	}
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.light.grayBackground
		// alignItems: 'center',
		// justifyContent: 'center',
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

	heder: {
		gap: 24
	},

	headerTextContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between"
	},

	headerText: {
		fontFamily: Fonts.poppins,
		fontSize: 24,
		lineHeight: 36
		// textAlign: "center"
	},

	//
	locationContentContainer: {
		backgroundColor: "#FFFFFF",
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

	locationItemLeftContainer: {
		gap: 8,
		flex: 1
	},

	locationItemRightIndicator: {
		minHeight: Platform.select({ android: 48, default: 44 }),
		justifyContent: "center"
	}
});

function ArrowRightUpIcon() {
	return (
		<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<Path
				d="M16.0052 9.41421L7.39858 18.0208L5.98438 16.6066L14.591 8H7.00519V6H18.0052V17H16.0052V9.41421Z"
				fill="#1B1C1D"
			/>
		</Svg>
	);
}
