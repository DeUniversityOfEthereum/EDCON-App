import Colors from "@constants/Colors";
import { Text, View } from "@themed";
import { UPressable } from "@u";
import { StyleSheet } from "react-native";
import { Mask, Path, Svg } from "react-native-svg";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

type AddressProps = {
	address?: string;
} & ViewProps;
export default function Address(props: AddressProps) {
	const { address } = props;

	return (
		<View style={[styles.addressContainer, props.style]}>
			<Text style={styles.addressTitle}>{"Contract Address"}</Text>
			<UPressable style={styles.addressContent}>
				<Text numberOfLines={1} ellipsizeMode="middle" style={{ width: "50%" }}>
					{address}
				</Text>
				<CopyIcon />
			</UPressable>
		</View>
	);
}

function CopyIcon() {
	return (
		<Svg width="16" height="17" viewBox="0 0 16 17" fill="none">
			<Mask id="path-1-inside-1_4014_13311" fill="white">
				<Path d="M4.33398 4.64389V3.10419C4.33398 2.58642 4.75372 2.16669 5.27148 2.16669H13.3965C13.9143 2.16669 14.334 2.58642 14.334 3.10419V11.2292C14.334 11.747 13.9143 12.1667 13.3965 12.1667H11.8394" />
			</Mask>
			<Path
				d="M3.33398 4.64389C3.33398 5.19617 3.7817 5.64389 4.33398 5.64389C4.88627 5.64389 5.33398 5.19617 5.33398 4.64389H3.33398ZM11.8394 11.1667C11.2871 11.1667 10.8394 11.6144 10.8394 12.1667C10.8394 12.719 11.2871 13.1667 11.8394 13.1667V11.1667ZM5.33398 4.64389V3.10419H3.33398V4.64389H5.33398ZM5.33398 3.10419C5.33398 3.13871 5.306 3.16669 5.27148 3.16669V1.16669C4.20143 1.16669 3.33398 2.03414 3.33398 3.10419H5.33398ZM5.27148 3.16669H13.3965V1.16669H5.27148V3.16669ZM13.3965 3.16669C13.362 3.16669 13.334 3.13871 13.334 3.10419H15.334C15.334 2.03414 14.4665 1.16669 13.3965 1.16669V3.16669ZM13.334 3.10419V11.2292H15.334V3.10419H13.334ZM13.334 11.2292C13.334 11.1947 13.362 11.1667 13.3965 11.1667V13.1667C14.4665 13.1667 15.334 12.2992 15.334 11.2292H13.334ZM13.3965 11.1667H11.8394V13.1667H13.3965V11.1667Z"
				fill="#333333"
				mask="url(#path-1-inside-1_4014_13311)"
			/>
			<Path
				d="M2.60352 5.33331H10.7285C10.9701 5.33331 11.166 5.52919 11.166 5.77081V13.8958C11.166 14.1374 10.9701 14.3333 10.7285 14.3333H2.60352C2.36189 14.3333 2.16602 14.1374 2.16602 13.8958V5.77081C2.16602 5.52919 2.36189 5.33331 2.60352 5.33331Z"
				stroke="#333333"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}

const styles = StyleSheet.create({
	addressContainer: {
		paddingTop: 24,
		paddingHorizontal: 16
	},
	addressTitle: {
		fontSize: 16,
		color: Colors.light.gray6
	},
	addressContent: {
		marginTop: 8,
		flexDirection: "row",
		alignItems: "center",
		gap: 8
	}
});
