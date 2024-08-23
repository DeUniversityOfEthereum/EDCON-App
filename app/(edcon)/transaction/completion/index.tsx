import ContractAddress from "@/components/contract/Address";
import ContractNFTDetail from "@/components/contract/NFTDetail";
import ContractTokenDetail from "@/components/contract/TokenDetail";
import ContractViewUrl from "@/components/contract/ViewUrl";
import { enum_web3_reward_type } from "@/enum/web3";
import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import { Text, View } from "@themed";
import { Image } from "expo-image";
import { ScrollView, StyleSheet } from "react-native";
import { useCompletion } from "./useCompletion";

export default function TransactionCompletion() {
	const { nftData, tokenInfo, rewardName, qrData, websiteUrl, currentPartnerType, isShowSuccess, tokenId } =
		useCompletion();

	return (
		<View style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={styles.scrollContentContainer}>
				<View style={styles.poweredByRow}>
					<Image source={currentPartnerType?.logo} style={{ height: 28, aspectRatio: currentPartnerType?.ratio }} />
					<Text style={styles.powerByText}>{`POWERED BY ${currentPartnerType?.name}`}</Text>
				</View>

				<View style={[styles.container, { paddingVertical: isShowSuccess ? 60 : 20 }]}>
					{isShowSuccess && (
						<View style={[styles.claimCompleted_titleContainer]}>
							<Text style={[styles.title]}>{"Success! You now own"}</Text>
							<Text style={[styles.name]}>
								{rewardName ?? ""}
								{qrData?.reward === enum_web3_reward_type.ERC20 && (
									<Text style={[styles.symbol]}> {tokenInfo?.symbol ? `(${tokenInfo?.symbol})` : ""}</Text>
								)}
							</Text>

							<Image
								style={styles.claimCompleted_balloon}
								source={require("@/assets/images/edcon/hunt/nft_balloon.png")}
							/>
						</View>
					)}

					{tokenId ? (
						<ContractNFTDetail title={"AceTCG | EDCON24 Promo" ?? ""} nftInfo={nftData} />
					) : (
						<ContractTokenDetail title={"AceTCG | EDCON24 Promo" ?? ""} rewardName={rewardName} tokenInfo={tokenInfo} />
					)}

					<ContractAddress address={qrData?.contractAddress} />
					<ContractViewUrl {...websiteUrl} />
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	scrollContentContainer: {
		paddingVertical: 24,
		minHeight: "80%"
	},
	poweredByRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 10
	},
	powerByText: {
		fontFamily: Fonts.Poppins_Bold,
		fontSize: 12,
		color: "#202020"
	},
	container: {
		justifyContent: "center",
		width: "100%"
	},
	claimCompleted_titleContainer: {
		gap: 12,
		alignItems: "center",
		marginBottom: 160
	},
	claimCompleted_balloon: {
		position: "absolute",
		left: 60,
		zIndex: -1,
		aspectRatio: 60 / 65,
		width: 60
	},
	title: {
		fontFamily: Fonts.Poppins_Bold,
		fontSize: 34,
		textAlign: "center"
	},
	name: {
		fontFamily: Fonts.Poppins_Bold,
		fontSize: 20
	},
	symbol: {
		color: Colors.light.gray6,
		fontFamily: Fonts.Poppins_Bold,
		fontSize: 20
	},
	social: {
		paddingHorizontal: 16,
		gap: 8,
		marginTop: 12
	}
});
