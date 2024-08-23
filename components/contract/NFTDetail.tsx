import SectionContainer from "@/app/(edcon)/hunt/components/SectionContainer";
import TwitterIcon from "@/components/svg/twitter";
import WebSiteIcon from "@/components/svg/website/icon";
import Fonts from "@constants/Fonts";
import { Text, View } from "@themed";
import { UPressable } from "@u";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet } from "react-native";

import type { Alchemy } from "@/api/alchemy/typing";
type NFTDetailProps = {
	title: string;
	nftInfo?: Alchemy.Metadata.NFTData;
};

export default function NFTDetail(props: NFTDetailProps) {
	const { title, nftInfo } = props;

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
	let originalUrl = nftInfo?.image.originalUrl;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.subTitle}>{nftInfo?.name}</Text>

			<UPressable style={styles.nftbgImg}>
				<Image contentFit="contain" style={styles.nftImg} source={originalUrl?.trim()} />
			</UPressable>

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
			<SectionContainer style={styles.nftDetailTitle} text={"NFT Description"}>
				<Text style={styles.nftDetail}>{nftInfo?.description}</Text>
			</SectionContainer>
		</View>
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
		fontFamily: Fonts.Poppins_Bold,
		fontSize: 19,
		paddingHorizontal: 16
	},
	nftbgImg: {
		paddingTop: 24,
		justifyContent: "center",
		alignItems: "center"
	},
	nftImg: {
		aspectRatio: 1,
		width: "100%"
	},
	// claimed by
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
