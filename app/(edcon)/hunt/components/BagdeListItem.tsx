import { ETouchable } from "@/components/e";
import Fonts from "@constants/Fonts";
import { Image, StyleSheet, Text, View } from "react-native";
import { Path, Svg } from "react-native-svg";

export default function BagdeListItem() {
	return (
		<View style={styles.container}>
			<View style={styles.badgeListItemImage} />
			<View style={styles.rightContainer}>
				<Image style={styles.badgeListItemBagde} />
				<Text>{"EDCON Trivia"}</Text>
				<ETouchable style={styles.lockButton}>
					<LockIcon16 />
					<Text style={styles.lockButtonText}>{"Locked"}</Text>
				</ETouchable>
			</View>
		</View>
	);
}

function LockIcon16() {
	return (
		<Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<Path
				d="M12.6667 6.66634H13.3333C13.7015 6.66634 14 6.96481 14 7.33301V13.9997C14 14.3679 13.7015 14.6663 13.3333 14.6663L2.66667 14.6663C2.29848 14.6663 2 14.3679 2 13.9997L2 7.33301C2 6.96481 2.29848 6.66634 2.66667 6.66634H3.33333V5.99967C3.33333 3.42235 5.42267 1.33301 8 1.33301C10.5773 1.33301 12.6667 3.42235 12.6667 5.99967V6.66634ZM3.33333 7.99967L3.33333 13.333L12.6667 13.333V7.99967L3.33333 7.99967ZM7.33333 9.33301H8.66667L8.66667 11.9997H7.33333L7.33333 9.33301ZM11.3333 6.66634V5.99967C11.3333 4.15873 9.84093 2.66634 8 2.66634C6.15905 2.66634 4.66667 4.15873 4.66667 5.99967V6.66634L11.3333 6.66634Z"
				fill="black"
			/>
		</Svg>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 24,
		backgroundColor: "#FFFFFF"
	},

	badgeListItemImage: {
		width: 100,
		height: 130,
		resizeMode: "contain",
		backgroundColor: "#efefef7f"
	},

	rightContainer: {
		gap: 8
	},

	badgeListItemBagde: {
		width: 32,
		height: 32,
		borderRadius: 16,
		resizeMode: "contain",
		backgroundColor: "#efefef7f"
	},

	lockButton: {
		height: 34,
		borderRadius: 17,
		paddingHorizontal: 12,
		gap: 6,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: "#00000033",
		backgroundColor: "#FFFFFF",
		alignItems: "center",
		flexDirection: "row"
	},

	lockButtonText: {
		fontFamily: Fonts.Poppins_Bold,
		fontSize: 14
		// fontWeight: "600"
	}
});
