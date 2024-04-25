import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import { EButton, ETouchable } from "@e";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ColorValue, Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Circle, ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";
import { Button } from "../components/Button";

type Reward = { imageUrl: string; title: string };

const buttonItems = [
	{
		title: "SCAVENGER HUNT",
		backgroundColor: "#1FC492"
	},
	{
		title: "EDCON SWAG",
		backgroundColor: "#FFF59C"
	},
	{
		title: "FREE Merch",
		backgroundColor: "#FF5C79"
	}
];

const buttonItems2 = [
	{
		title: "SHIBUYA",
		backgroundColor: "#09244B",
		textColor: "#A0F4FF"
	},
	{
		title: "AIRDROP",
		backgroundColor: "#FDB0FF"
	},
	{
		title: "NFT",
		backgroundColor: "#FFFFFF"
	},
	{
		title: "Limited EDITION",
		backgroundColor: "#A0F4FF"
	}
];

const rewardItems = [
	{
		id: "1",
		imageUrl:
			"https://s3-alpha-sig.figma.com/img/66c9/10fd/aeb2ec79a07b721023faab71dce54258?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e6UbIM3BYVOx~aaJrcE8tmuAV2PfecvTcuMr3jIPvd0TaemI5TfPzjW46x4OqXd92R3ECNW9Sbx95A80rQQ9JxBs7kMm2X1Mh1w7ujdelMP5T~YQsLoIh4emsLk8ybeYpnfqgrVRShQUOOEpQ8qNfTNWHBIQNlUzp8JwM5d3YtvE5hD7MqVYtj9voDSAxod8raaf7RNlteYmN-YPlEBPgV9agHySNSOdrGWI~QlEIxp~Kdl53l4ousAaDeMQv3dy1H0y8tP0W~TGvrMeo0tlK3ZIT5QYYlPq4gr8VIPND61c56vqFssfuLxFQYc77eFfCB97MqDuYGYLTxg5T1fl0Q__",
		title: "Lorem ipsum"
	},
	{
		id: "2",
		imageUrl:
			"https://s3-alpha-sig.figma.com/img/66c9/10fd/aeb2ec79a07b721023faab71dce54258?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e6UbIM3BYVOx~aaJrcE8tmuAV2PfecvTcuMr3jIPvd0TaemI5TfPzjW46x4OqXd92R3ECNW9Sbx95A80rQQ9JxBs7kMm2X1Mh1w7ujdelMP5T~YQsLoIh4emsLk8ybeYpnfqgrVRShQUOOEpQ8qNfTNWHBIQNlUzp8JwM5d3YtvE5hD7MqVYtj9voDSAxod8raaf7RNlteYmN-YPlEBPgV9agHySNSOdrGWI~QlEIxp~Kdl53l4ousAaDeMQv3dy1H0y8tP0W~TGvrMeo0tlK3ZIT5QYYlPq4gr8VIPND61c56vqFssfuLxFQYc77eFfCB97MqDuYGYLTxg5T1fl0Q__",
		title: "Lorem ipsum"
	},
	{
		id: "3",
		imageUrl:
			"https://s3-alpha-sig.figma.com/img/035f/a79b/762f10ca3bd853cdc8906b03cbf730a6?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BawZN9AxJux3mg2YncExSAfpnEN7B9om0JnD5LSfWP3NXMSNyW5dMS01J~uIdfhlKfSZHBrAtSRTRITkALJmaZdQCvgjTnNbC3s3go6JKllIbzh~loy1c9BHOr7z-mQXMHm3pd6OmQq0T0EBV3U~z9IwO3Z5ItPmW8G1O1FqMK8WdkCub36ZEFu38t88UYFYnxibnDc3ikDD23sfVCFl70XwrzS4JFaALISU3WAcxs~OErayk6dFLzyA9FOcKx1ynK6OXhR1nTzyjl1hanRWrKu1AsduRbrtdzfJrQUZVG1KR1d8hkWdeMuXg46t7tJTSBJoyCODeVWctrMll3Pp2w__",
		title: "Lorem ipsum dolor sit"
	},
	{
		id: "4",
		imageUrl:
			"https://s3-alpha-sig.figma.com/img/035f/a79b/762f10ca3bd853cdc8906b03cbf730a6?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BawZN9AxJux3mg2YncExSAfpnEN7B9om0JnD5LSfWP3NXMSNyW5dMS01J~uIdfhlKfSZHBrAtSRTRITkALJmaZdQCvgjTnNbC3s3go6JKllIbzh~loy1c9BHOr7z-mQXMHm3pd6OmQq0T0EBV3U~z9IwO3Z5ItPmW8G1O1FqMK8WdkCub36ZEFu38t88UYFYnxibnDc3ikDD23sfVCFl70XwrzS4JFaALISU3WAcxs~OErayk6dFLzyA9FOcKx1ynK6OXhR1nTzyjl1hanRWrKu1AsduRbrtdzfJrQUZVG1KR1d8hkWdeMuXg46t7tJTSBJoyCODeVWctrMll3Pp2w__",
		title: "Lorem ipsum dolor sit"
	}
];

export default function GiftScreen() {
	const [rewards, setRewards] = useState<Reward[]>([]);

	const width = Dimensions.get("window").width;
	const padding = 16;
	const spacing = 16;
	const row = 2;
	const itemWidth = (width - (row - 1) * spacing - padding * 2) / row;

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<SafeAreaView>
				<View style={styles.navigationHeader}>
					<Button
						style={styles.gobackIcon}
						onPress={() => {
							router.back();
						}}
					>
						<ArrowLeftLineIcon />
					</Button>

					<Text style={styles.headerTitle}>{"Reward"}</Text>

					<Button style={styles.gobackIcon} onPress={() => {}}>
						<QrScanIcon24 />
					</Button>
				</View>

				<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
					<View style={styles.mainContainer}>
						<RenderRewards />

						{rewards.length === 0 && <NoDataView />}

						{rewards.length !== 0 && (
							<ScrollView contentContainerStyle={styles.girdContainder}>
								{rewardItems.map(item => {
									return <GirdItem key={item.id} itemSize={{ width: itemWidth }} item={item} />;
								})}
							</ScrollView>
						)}
					</View>
				</ScrollView>
				{/* 临时按钮，用与测试 */}
				<EButton
					style={{ position: "absolute", top: 90, left: 50 }}
					title="Load Data"
					onPress={() => {
						setRewards(rewardItems);
					}}
				/>
			</SafeAreaView>
		</View>
	);
}

function RenderRewards() {
	return (
		<View style={styles.reward}>
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				style={styles.rewardScrollWrapper}
				contentOffset={{ x: 80, y: 0 }}
				contentContainerStyle={[styles.rewardScrollContentContainer, { paddingLeft: 80 }]}
			>
				<RewardButton item={buttonItems[0]} />
				<RewardStarIcon />
				<RewardButton item={buttonItems[1]} />
				<RewardTriIcon />
				<RewardButton item={buttonItems[2]} />
				<RewardCircleIcon />
			</ScrollView>

			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				style={styles.rewardScrollWrapper}
				contentOffset={{ x: 90, y: 0 }}
				contentContainerStyle={[styles.rewardScrollContentContainer, { paddingLeft: 90 }]}
			>
				<RewardButton item={buttonItems2[0]} />
				<RewardStarIcon />
				<RewardButton item={buttonItems2[1]} />
				<RewardSquareIcon />
				<RewardButton item={buttonItems2[2]} />
				<RewardCircleIcon radius={35 / 2} />
				<RewardButton item={buttonItems2[3]} />
			</ScrollView>
		</View>
	);
}

function RewardButton(props: { item: Record<string, any>; onPress?: () => void }) {
	const { item } = props;
	return (
		<ETouchable style={[styles.rewardMenuButton, { backgroundColor: item.backgroundColor }]} onPress={props.onPress}>
			<StarIcon fillColor={item.textColor} />
			<Text style={[styles.rewardMenuButtonTitle, { color: item.textColor }]}>{item.title.toLocaleUpperCase()}</Text>
		</ETouchable>
	);
}

function NoDataView() {
	return (
		<View style={styles.noDataContainer}>
			<Image
				style={styles.noDataImage}
				source={{
					uri: "https://s3-alpha-sig.figma.com/img/e3de/7498/de7657a9bdb184f3ce7338e09ee7db9e?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ExuK3rCtutfP-ducJArZ0VvSJY718BD0SdAx1TaRRfiUXAMMluGNfqOHdLCxfCo-PIQWWK9UrFerSJCgsQ4-H86y3h3Scetv-Oe3dfUHTtYdV~f5wtFgpGWPwNhBDOYhXW5NrCW~rEJbWUKgo94LKV2xolD60CgU~0zmjmvyAUaD466Kq8307-Z~zdhEKUAfThSHjiHoH8j7z16J40w-fsI05M5nmNMoP7gCoja8OvhtZRf6ZXKhTs9Z~5mdb4hpi6jLxbl6Q8Ob8UTFwgahOxv1c6l-8MPXxDRWEUsdc2Du4UuuidEf9VgFrgOQoYRTsmENutpAaG5uL83pWs65cw__"
				}}
			/>

			<Text style={styles.noDataText}>
				{"It seems you don’t have rewards yet.\nStay tuned for QR codes in place to scan and earn rewards!"}
			</Text>

			<EButton icon={<QrScanIcon24 />} title="Scan QR Code" type="primary" />
		</View>
	);
}

function GirdItem(props: { itemSize: { width: number; height?: number }; item: { imageUrl: string; title: string } }) {
	const imageWidth = props.itemSize.width - styles.item.padding * 2;
	return (
		<ETouchable
			style={{ ...styles.item, ...props.itemSize }}
			onPress={() => {
				router.push("/(edcon)/gift/detail");
			}}
		>
			<View style={styles.itemImage}>
				<Image style={[{ width: imageWidth, height: imageWidth }]} source={props.item.imageUrl} />
			</View>
			<Text style={styles.itemText}>{props.item.title}</Text>
		</ETouchable>
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

function QrScanIcon24() {
	return (
		<Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
			<Path
				d="M15.5 3H21.5V8H19.5V5H15.5V3ZM9.5 3V5H5.5V8H3.5V3H9.5ZM15.5 21V19H19.5V16H21.5V21H15.5ZM9.5 21H3.5V16H5.5V19H9.5V21ZM3.5 11H21.5V13H3.5V11Z"
				fill="black"
			/>
		</Svg>
	);
}

function RewardCircleIcon({ fillColor = "#FDB0FF", radius = 27 }: { fillColor?: ColorValue; radius?: number }) {
	return (
		<Svg width={radius * 2} height={radius * 2} fill="none">
			<Circle cx={radius} cy={radius} r={radius} fill={fillColor} />
		</Svg>
	);
}

function RewardSquareIcon({}: { fillColor?: ColorValue }) {
	return (
		<Svg width="37" height="38" viewBox="0 0 37 38" fill="none">
			<Path d="M19.2778 0.872935L36.2901 20.1217L17.034 37.1275L0.0216531 17.8787L19.2778 0.872935Z" fill="#9FF8A2" />
		</Svg>
	);
}

function StarIcon({ fillColor }: { fillColor?: ColorValue }) {
	return (
		<Svg width="17" height="16" viewBox="0 0 17 16" fill="none">
			<G clip-path="url(#clip0_2395_4395)">
				<Path
					d="M7.61767 1.74264C7.84301 1.23598 8.53701 1.21131 8.80901 1.66664L8.84834 1.74264L9.54301 3.30598C10.1496 4.67059 11.1583 5.81749 12.4343 6.59331L12.649 6.71931L13.8823 7.41264C13.9804 7.46753 14.0631 7.54609 14.1231 7.64115C14.183 7.73621 14.2181 7.84475 14.2254 7.95689C14.2326 8.06902 14.2116 8.18118 14.1644 8.28314C14.1172 8.3851 14.0452 8.47363 13.955 8.54064L13.883 8.58731L12.649 9.28064C11.3473 10.0129 10.3001 11.1251 9.64767 12.4686L9.54301 12.694L8.84834 14.2573C8.62301 14.764 7.92901 14.7886 7.65701 14.3333L7.61767 14.2573L6.92301 12.694C6.31643 11.3294 5.30769 10.1825 4.03167 9.40664L3.81701 9.28064L2.58367 8.58731C2.48563 8.53242 2.40287 8.45386 2.34296 8.3588C2.28305 8.26374 2.24787 8.1552 2.24065 8.04307C2.23343 7.93093 2.25438 7.81877 2.3016 7.71681C2.34882 7.61485 2.42081 7.52633 2.51101 7.45931L2.58301 7.41264L3.81701 6.71931C5.11875 5.98707 6.16588 4.87482 6.81834 3.53131L6.92301 3.30598L7.61767 1.74264ZM13.7137 1.41398C14.0446 2.16571 14.6089 2.79082 15.323 3.19664C15.4297 3.25664 15.4297 3.40998 15.323 3.46998C14.6086 3.87586 14.044 4.50123 13.713 5.25331C13.7003 5.28162 13.6798 5.30566 13.6537 5.32253C13.6277 5.3394 13.5974 5.34838 13.5663 5.34838C13.5353 5.34838 13.505 5.3394 13.4789 5.32253C13.4529 5.30566 13.4323 5.28162 13.4197 5.25331C13.0886 4.50148 12.524 3.87636 11.8097 3.47064C11.7856 3.45689 11.7655 3.437 11.7516 3.413C11.7376 3.389 11.7303 3.36173 11.7303 3.33398C11.7303 3.30622 11.7376 3.27895 11.7516 3.25495C11.7655 3.23095 11.7856 3.21106 11.8097 3.19731C12.5242 2.79125 13.0888 2.16564 13.4197 1.41331C13.4323 1.385 13.4529 1.36095 13.4789 1.34408C13.505 1.32721 13.5353 1.31824 13.5663 1.31824C13.5974 1.31824 13.6277 1.32721 13.6537 1.34408C13.6798 1.36095 13.7003 1.385 13.713 1.41331L13.7137 1.41398Z"
					fill={fillColor ?? "black"}
				/>
			</G>
			<Defs>
				<ClipPath id="clip0_2395_4395">
					<Rect width="16" height="16" fill="white" transform="translate(0.899902)" />
				</ClipPath>
			</Defs>
		</Svg>
	);
}

function RewardStarIcon({ fillColor = "#2589FF" }: { fillColor?: ColorValue }) {
	return (
		<Svg width="32" height="35" viewBox="0 0 32 35" fill="none">
			<Path
				d="M15.6738 0C19.6727 4.56097 25.0952 7.63713 31.0618 8.72949L31.1738 8.75C29.1375 14.4056 29.1375 20.5944 31.1738 26.25L31.0618 26.2705C25.0952 27.3629 19.6727 30.439 15.6738 35C11.675 30.439 6.25246 27.3629 0.285885 26.2705L0.173828 26.25C2.21016 20.5944 2.21016 14.4056 0.173828 8.75L0.28588 8.72949C6.25246 7.63713 11.675 4.56097 15.6738 0Z"
				fill={fillColor}
			/>
		</Svg>
	);
}

function RewardTriIcon() {
	return (
		<Svg width="38" height="33" viewBox="0 0 38 33" fill="none">
			<Path d="M18.6738 0L37.2934 32.25H0.0542812L18.6738 0Z" fill="#FFC59C" />
		</Svg>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.light.grayBackground
		// alignItems: 'center',
		// justifyContent: 'center',
	},

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

	tileText: {
		fontFamily: Fonts.Poppins_Regular,
		fontSize: 14
	},

	gobackIcon: {
		width: 48,
		height: 48,
		borderRadius: 40,
		borderColor: "#00000019",
		borderWidth: StyleSheet.hairlineWidth,

		backgroundColor: "#FFFFFF"
	},

	mainContainer: {
		paddingHorizontal: 16
	},

	reward: {
		gap: 8,
		marginTop: 20,
		marginBottom: 20
	},

	rewardScrollWrapper: {
		height: 40,
		overflow: "visible"
	},

	rewardScrollContentContainer: {
		gap: 4,
		alignItems: "center"
	},

	rewardMenuButton: {
		flexDirection: "row",
		height: 40,
		borderRadius: 20,
		gap: 6,
		paddingHorizontal: 20,
		justifyContent: "center",
		alignItems: "center"
	},

	rewardMenuButtonTitle: {
		fontFamily: Fonts.Poppins_Bold,
		fontSize: 14
	},

	noDataContainer: {
		paddingHorizontal: 8,
		paddingTop: 64,
		alignItems: "center",
		gap: 24
	},

	noDataImage: {
		width: 120,
		height: 120
	},

	noDataText: {
		fontFamily: Fonts.Inter_400Regular,
		fontSize: 14,
		textAlign: "center",
		color: "#666666"
	},

	girdContainder: {
		gap: 10,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between"
	},

	item: {
		padding: 8,
		borderRadius: 12,
		backgroundColor: "#FFFFFF",
		justifyContent: "flex-start",
		alignItems: "flex-start"
	},

	itemImage: {
		width: "100%",
		aspectRatio: 1,
		borderRadius: 8,
		backgroundColor: "rgba(0,0,0,0.1)"
	},

	itemText: {
		fontFamily: Fonts.poppins,
		fontSize: 14,
		fontWeight: "500",
		margin: 8
	}
});
