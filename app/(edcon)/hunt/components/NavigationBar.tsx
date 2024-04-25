import Fonts from "@constants/Fonts";
import { router } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { Path, Svg } from "react-native-svg";
import { Button } from "../../components/Button";

type EdconHuntNavigationBarProps = {
	settingsShown?: boolean;
};
const edconBarIcon = require("@/assets/images/edcon/nav_title_edcon.png");

export default function EdconHuntNavigationBar(props: EdconHuntNavigationBarProps) {
	return (
		<View style={styles.navigationHeader}>
			<Button
				style={styles.gobackIcon}
				onPress={() => {
					router.back();
				}}
			>
				<ArrowLeftLineIcon />
			</Button>

			<View style={[styles.background, styles.center]}>
				<Image source={edconBarIcon} />
			</View>

			{props.settingsShown !== false && (
				<Button style={styles.gobackIcon} onPress={() => {}}>
					<SettingsIcon32 />
				</Button>
			)}
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

function SettingsIcon32() {
	return (
		<Svg width="32" height="33" viewBox="0 0 32 33" fill="none">
			<Path
				d="M4.45261 23.1673C3.87628 22.169 3.44369 21.1273 3.14844 20.0658C4.44506 19.4042 5.33296 18.0561 5.33296 16.5006C5.33296 14.9463 4.4464 13.599 3.15137 12.9369C3.747 10.789 4.87809 8.78868 6.48632 7.15367C7.7076 7.94587 9.31913 8.04078 10.6663 7.26299C12.0135 6.4852 12.737 5.04212 12.6616 3.58838C14.8817 3.01312 17.1796 3.03371 19.3375 3.59182C19.2633 5.0444 19.9868 6.48582 21.3329 7.26299C22.6801 8.04075 24.2916 7.94587 25.5128 7.15375C26.2844 7.94014 26.9703 8.83567 27.5467 9.83394C28.1229 10.8322 28.5556 11.874 28.8508 12.9354C27.5541 13.597 26.6663 14.9451 26.6663 16.5006C26.6663 18.055 27.5528 19.4022 28.8479 20.0643C28.2523 22.2122 27.1212 24.2125 25.5129 25.8475C24.2916 25.0554 22.6801 24.9605 21.3329 25.7382C19.9857 26.5159 19.2623 27.9591 19.3376 29.4129C17.1176 29.9881 14.8197 29.9675 12.6618 29.4094C12.7359 27.9567 12.0124 26.5154 10.6663 25.7382C9.31917 24.9605 7.70772 25.0553 6.48645 25.8474C5.71489 25.061 5.02896 24.1655 4.45261 23.1673ZM11.9996 23.4289C13.4548 24.269 14.4999 25.5973 15.0004 27.1215C15.6648 27.1847 16.3336 27.1857 16.9981 27.1237C17.4984 25.5986 18.5437 24.2694 19.9996 23.4289C21.4555 22.5882 23.1293 22.3477 24.7003 22.6769C25.0861 22.1323 25.4197 21.5526 25.6972 20.9457C24.6275 19.7501 23.9996 18.1809 23.9996 16.5006C23.9996 14.8203 24.6275 13.2513 25.6972 12.0557C25.5584 11.7543 25.4051 11.458 25.2372 11.1673C25.0693 10.8766 24.8893 10.5956 24.6977 10.3249C23.1276 10.6533 21.4548 10.4125 19.9996 9.57239C18.5444 8.73226 17.4995 7.4039 16.9988 5.87972C16.3345 5.81651 15.6656 5.8156 15.0012 5.87755C14.5008 7.4026 13.4555 8.73184 11.9996 9.57239C10.5437 10.413 8.86993 10.6536 7.29904 10.3244C6.91313 10.8689 6.5795 11.4486 6.30208 12.0555C7.37174 13.2511 7.99962 14.8203 7.99962 16.5006C7.99962 18.1809 7.37177 19.7499 6.30208 20.9455C6.44089 21.2469 6.59418 21.5433 6.76202 21.8339C6.92985 22.1246 7.10986 22.4055 7.30149 22.6763C8.87169 22.3479 10.5445 22.5887 11.9996 23.4289ZM15.9996 20.5006C13.7905 20.5006 11.9996 18.7098 11.9996 16.5006C11.9996 14.2915 13.7905 12.5006 15.9996 12.5006C18.2088 12.5006 19.9996 14.2915 19.9996 16.5006C19.9996 18.7098 18.2088 20.5006 15.9996 20.5006ZM15.9996 17.8339C16.736 17.8339 17.3329 17.237 17.3329 16.5006C17.3329 15.7642 16.736 15.1673 15.9996 15.1673C15.2632 15.1673 14.6663 15.7642 14.6663 16.5006C14.6663 17.237 15.2632 17.8339 15.9996 17.8339Z"
				fill="black"
			/>
		</Svg>
	);
}

const styles = StyleSheet.create({
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

	titleText: {
		fontFamily: Fonts.poppins,
		fontSize: 24,
		lineHeight: 36,
		textAlign: "center"
	}
});
