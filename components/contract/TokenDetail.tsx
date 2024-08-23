import TwitterIcon from "@/components/svg/twitter";
import WebSiteIcon from "@/components/svg/website/icon";
import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import { Text, View } from "@themed";
import { UPressable } from "@u";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { Path, Svg } from "react-native-svg";

import type { Chainbase } from "@/api/chainbase/typing";
type TokenDetailProps = {
	title: string;
	rewardName?: string;
	tokenInfo?: Chainbase.TokenMetadata.Data;
};

export default function TokenDetail(props: TokenDetailProps) {
	const { title, tokenInfo, rewardName } = props;
	const links = [
		{
			icon: <TwitterIcon.icon20 />,
			linkURL: "https://x.com/edcon2024"
		},
		{
			icon: <WebSiteIcon />,
			linkURL: `https://edcon.io`
		}
	];

	const openURL = (url: string) => {
		router.navigate({ pathname: "/web/", params: { url: url } });
	};

	const imgInfo = tokenInfo?.logos?.[0];

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<View style={styles.subTitle}>
				{imgInfo?.uri && (
					<Image
						style={[
							styles.subTitleImg,
							imgInfo?.width && imgInfo?.height ? { aspectRatio: imgInfo?.width / imgInfo?.height } : {}
						]}
						source={imgInfo?.uri}
					/>
				)}

				<Text style={styles.subTitleName}>{tokenInfo?.name} </Text>
				<Text style={styles.subTitleSymbol}>{tokenInfo?.symbol ? `(${tokenInfo?.symbol})` : ""}</Text>
				<View style={styles.subTitleIcon}>
					<ArrowIcon />
				</View>
			</View>

			<Text style={styles.amount}>{rewardName ?? ""}</Text>

			<View style={styles.claimedContainer}>
				<View style={styles.claimedTextContainer}>
					<Text style={styles.claimedText}>{"Held By"}</Text>
					<Text style={styles.claimedDetail} numberOfLines={1} ellipsizeMode="middle">
						{"My address"}
					</Text>
				</View>
				<View style={styles.claimedRightContainer}>
					{links.map((item, index) => {
						return (
							<UPressable
								key={index}
								style={styles.claimedButton}
								onPress={() => {
									openURL(item.linkURL);
								}}
							>
								{item.icon}
							</UPressable>
						);
					})}
				</View>
			</View>
		</View>
	);
}

function ArrowIcon() {
	return (
		<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<Path
				d="M12.0001 2L14.6267 3.91602L17.8779 3.90983L18.8767 7.00385L21.5106 8.90985L20.5001 12L21.5106 15.0901L18.8767 16.9961L17.8779 20.0902L14.6267 20.084L12.0001 22L9.37342 20.084L6.12222 20.0902L5.12342 16.9961L2.4895 15.0901L3.50007 12L2.4895 8.90985L5.12342 7.00385L6.12222 3.90983L9.37342 3.91602L12.0001 2Z"
				fill="#2589FF"
			/>
			<Path d="M8.5 12L11 14.5L16 9.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
		</Svg>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%"
	},
	title: {
		fontFamily: Fonts.Poppins_Medium,
		fontSize: 14,
		paddingHorizontal: 16
	},
	subTitle: {
		paddingTop: 6,
		paddingHorizontal: 16,
		flexDirection: "row",
		alignItems: "center",
		gap: 4
	},
	subTitleImg: {
		width: 32
	},
	subTitleName: {
		fontFamily: Fonts.Poppins_Regular,
		fontWeight: "500",
		fontSize: 24,
		lineHeight: 34
	},
	subTitleSymbol: {
		color: Colors.light.gray6,
		fontFamily: Fonts.Poppins_Regular,
		fontWeight: "500",
		fontSize: 24,
		lineHeight: 34
	},
	subTitleIcon: {},
	amount: {
		marginTop: 24,
		marginBottom: 16,
		paddingHorizontal: 16,
		fontFamily: Fonts.Poppins_Regular,
		fontWeight: "500",
		fontSize: 24
	},
	claimedContainer: {
		flexDirection: "row",
		borderTopWidth: 0.5,
		borderBottomWidth: 0.5,
		borderColor: "#C2C2C2",
		paddingHorizontal: 16
	},
	claimedTextContainer: {
		gap: 8,
		paddingVertical: 8,
		flex: 1,
		fontFamily: Fonts.Poppins_Medium,
		fontSize: 12
	},
	claimedText: {
		color: "#666666"
	},
	claimedDetail: {
		width: "50%",
		fontFamily: Fonts.Poppins_Regular,
		fontSize: 14
	},
	claimedRightContainer: {
		flexDirection: "row",
		alignItems: "center"
	},
	claimedButton: {
		width: 30,
		aspectRatio: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	nftDetailTitle: {
		marginTop: 24,
		gap: 0,
		marginBottom: 16
	},
	nftDetail: {
		fontFamily: Fonts.Poppins_Regular,
		fontSize: 14
	},
	linkButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4
	},
	linkText: {
		fontFamily: Fonts.Poppins_Bold,
		fontSize: 14
	}
});
