import { postMessage } from "@/api/chat";
import { ShadowContainer } from "@/components/shadow/shadow";
import { useAuthStore } from "@/lib/store/auth";
import Colors from "@constants/Colors";
import Fonts from "@constants/Fonts";
import { EButton, ENavbar } from "@e";
import { useMutation } from "@tanstack/react-query";
import { Text, View } from "@themed";
import { UFormItem, UPressable } from "@u";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { RefObject, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import { BackgroundGradient } from "../components";
import { AIInput } from "./input";
import Loading from "./loading";

enum enum_role_type {
	AI = "ai",
	User = "user"
}

import type { Chat } from "@/api/chat/typing";
export type MsgItem = {
	id: string;
	msg: string;
	type: enum_role_type;
	error?: boolean;
	date?: string;
	isShowTime?: boolean;
};

export default function AIChatScreen() {
	const scrollRef = useRef() as RefObject<ScrollView>;
	const { userInfo } = useAuthStore();
	const [allMsg, setAllMsg] = useState([] as MsgItem[]);
	const [isShowTips, setIsShowTips] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const {
		handleSubmit,
		control,
		watch,
		setValue,
		formState: { isValid }
	} = useForm<{ msg: string }>({
		mode: "all",
		defaultValues: {
			msg: ""
		}
	});
	const msgWatch = watch("msg");

	const disabled = /^\s*$/.test(msgWatch);

	const postMessageMutation = useMutation({
		mutationFn: async (params: Chat.Message.PostParams) => await postMessage(params)
	});

	const OnLinkTo = async (content: string) => {
		setIsShowTips(false);
		setValue("msg", content);
	};

	const onSubmit = handleSubmit(async data => {
		if (!isValid) return;
		// console.log(data, "data");
		isShowTips && setIsShowTips(false);
		const isShowTime =
			allMsg.length === 0 || (allMsg.length > 0 && !dayjs().isSame(dayjs(allMsg[allMsg.length - 1].date), "day"));
		const currentTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
		setAllMsg(val => [
			...val,
			{
				id: currentTime,
				msg: data.msg,
				type: enum_role_type.User,
				date: currentTime,
				isShowTime: isShowTime
			}
		]);
		setIsLoading(true);
		setValue("msg", "");
		const params = {
			character_id: "edcon-assistant",
			user_id: userInfo.id.toString(),
			content: data.msg,
			timestamp: new Date().getTime(),
			channel: "ueth-app",
			sender: "alter-ego",
			session_id: "1"
		};
		await HandleSendMessage(params);
	});

	const HandleSendMessage = async (params: Chat.Message.PostParams) => {
		const response = await postMessageMutation.mutateAsync(params);
		if (response.content) {
			const content = response.content.replace(/\[idref:[^\]]+\]/g, ""); //去除[idref:xxx]等引用
			const newData = {
				id: response.response_id,
				msg: content,
				type: enum_role_type.AI,
				date: dayjs().format("YYYY-MM-DD HH:mm:ss")
			};
			setAllMsg(val => [...val, newData]);
		} else {
			setAllMsg(val => {
				return val.map((item, index) => (index === val.length - 1 ? { ...item, error: true } : item));
			});
		}
		setIsLoading(false);
	};

	// useEffect(() => {
	// 	return () => {
	// 		setChatRecord(allMsg.slice(-100)); //仅缓存100条
	// 		// setChatRecord([]);
	// 	};
	// }, [allMsg, setChatRecord]);

	useEffect(() => {
		//自动滚动到底部
		const keyboardDidShowListener =
			!isShowTips &&
			Keyboard.addListener("keyboardDidShow", () => {
				scrollRef?.current?.scrollToEnd();
			});
		return () => {
			keyboardDidShowListener && keyboardDidShowListener.remove();
		};
	}, [isShowTips]);

	return (
		<View style={styles.container}>
			<StatusBar style={"auto"} />
			<BackgroundGradient />
			<Image style={styles.top_image} source={require("@/assets/images/edcon/edcon_stamp_logo.png")} />
			<Image style={styles.right_image} source={require("@/assets/images/edcon/unicon.png")} />
			<SafeAreaView edges={["top", "left", "right"]}>
				<ENavbar
					leftOnPress={() => {
						if (isShowTips) {
							router.back();
						} else {
							setValue("msg", "");
							Keyboard.dismiss();
							setIsShowTips(true);
						}
					}}
					title={"Ask ANything"}
				/>
			</SafeAreaView>
			<KeyboardAvoidingView style={styles.flex_1} behavior={Platform.OS === "ios" ? "padding" : "height"}>
				<ScrollView
					ref={scrollRef}
					showsVerticalScrollIndicator={false}
					onContentSizeChange={() => {
						!isShowTips && scrollRef?.current?.scrollToEnd();
					}}
				>
					{isShowTips ? <Tips OnLinkTo={OnLinkTo} /> : <Message msg={allMsg} isLoading={isLoading} />}
				</ScrollView>

				<SafeAreaView edges={["bottom", "left", "right"]}>
					<UFormItem
						style={styles.w_100p}
						required
						name="msg"
						control={control}
						render={({ field }) => (
							<View style={styles.submmit}>
								<AIInput
									{...field}
									containerStyle={styles.flex_1}
									multiline={true}
									placeholder={"Ask me anything..."}
								/>
								<EButton style={[styles.button]} disabled={disabled} onPress={() => onSubmit()}>
									<SendIcon disabled={disabled} />
								</EButton>
							</View>
						)}
					/>
				</SafeAreaView>
			</KeyboardAvoidingView>
		</View>
	);
}

function Message({ msg, isLoading }: { msg: MsgItem[]; isLoading: boolean }) {
	return (
		<View style={styles.msg}>
			{msg.map(item => {
				return item.type === enum_role_type.User ? (
					<UserMsgItem key={item.id} item={item} />
				) : (
					<AIMsgItem key={item.id} item={item} />
				);
			})}
			{isLoading && <Loading />}
		</View>
	);
}

function UserMsgItem({ item }: { item: MsgItem }) {
	return (
		<View>
			{item.isShowTime && <Text style={styles.text}>{item?.date}</Text>}
			<View style={styles.right}>
				<View style={styles.user}>
					{item.error && <ErrorIcon />}
					<View style={[styles.msg_border, { backgroundColor: "#E1FAFF" }]}>
						<ShadowContainer opt={{ ...styles.msg_border, backgroundColor: "#E1FAFF" }} />
						<Text style={styles.fonts}>{item.msg}</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

function AIMsgItem({ item }: { item: MsgItem }) {
	return (
		<View style={styles.mv_8}>
			<View style={styles.msg_border}>
				<ShadowContainer opt={styles.msg_border} />
				<Text style={styles.fonts}>{item.msg}</Text>
			</View>
		</View>
	);
}

function Tips({ OnLinkTo }: { OnLinkTo: (content: string) => void }) {
	const tip = [
		{
			id: "1",
			title: "I need help with translation",
			content: ""
		},
		{
			id: "2",
			title: "I am a sponsor, I have questions",
			content: ""
		},
		{
			id: "3",
			title: "I am a speaker, I have questions",
			content: ""
		},
		{
			id: "4",
			title: "I am attending EDCON, I have questions",
			content: ""
		}
	];
	return (
		<View style={styles.tips}>
			<View style={styles.tips_title}>
				<Text style={styles.title}>{"How can I help you"}</Text>
				<Text style={styles.title}>{"my friend? 😊️"}</Text>
			</View>

			{tip.map(i => {
				return (
					<UPressable style={styles.tips_content} key={i.id} onPress={() => OnLinkTo(i.title)}>
						<View style={styles.flex_1}>
							<Text style={styles.item_title}>{i.title}</Text>
							{i.content && <Text style={styles.item_content}>{i.content}</Text>}
						</View>
						<RightTopIcon />
					</UPressable>
				);
			})}
		</View>
	);
}

function RightTopIcon() {
	return (
		<Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
			<Path
				d="M8.5 16L16.5 8M16.5 8H10.5M16.5 8V14"
				stroke="#776F69"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</Svg>
	);
}

function SendIcon({ disabled }: { disabled: boolean }) {
	return (
		<Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
			<Path
				d="M2.4468 9.31507C1.92426 9.14089 1.92013 8.85986 2.45755 8.68072L21.5437 2.31865C22.0722 2.14249 22.3753 2.4383 22.2272 2.95658L16.774 22.0428C16.623 22.5712 16.3184 22.5896 16.0951 22.0872L12.5006 13.9996L18.5006 5.99969L10.5007 11.9996L2.4468 9.31507Z"
				fill={disabled ? "#776F69" : "#FAFAFA"}
			/>
		</Svg>
	);
}

function ErrorIcon() {
	return (
		<Svg width="17" height="16" viewBox="0 0 17 16" fill="none">
			<G clip-path="url(#clip0_3381_5403)">
				<Path
					d="M16.5 8C16.5 3.58172 12.9183 1.35191e-06 8.5 0C4.08172 -2.44784e-06 0.500001 3.58172 0.5 8C0.499998 12.4183 4.08172 16 8.5 16C12.9183 16 16.5 12.4183 16.5 8ZM9.07143 3.42892V9.71429H7.92857V3.42892H9.07143ZM7.80776 11.4286H9.17919V12.8H7.80776V11.4286Z"
					fill="#E76446"
				/>
			</G>
			<Defs>
				<ClipPath id="clip0_3381_5403">
					<Rect width="16" height="16" fill="white" transform="translate(0.5)" />
				</ClipPath>
			</Defs>
		</Svg>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.light.grayBackground
	},

	tileText: {
		fontFamily: Fonts.Poppins_Regular,
		fontSize: 14
	},

	top_image: {
		width: 61,
		height: 89,
		position: "absolute",
		top: 130,
		left: 0
	},

	right_image: {
		width: 117,
		height: 117,
		position: "absolute",
		bottom: 120,
		right: 0
	},

	submmit: {
		flexDirection: "row",
		paddingHorizontal: 16,
		paddingTop: 12,
		gap: 12
	},

	button: {
		borderRadius: 100,
		borderColor: "#000",
		borderWidth: 1,
		paddingHorizontal: 0,
		height: 56,
		width: 56
	},

	msg: {
		height: "100%",
		justifyContent: "flex-end",
		paddingHorizontal: 16,
		paddingBottom: 10
	},
	text: {
		color: "rgba(28, 28, 30, 0.20)",
		fontFamily: Fonts.poppins,
		fontSize: 11,
		textAlign: "center",
		paddingTop: 40,
		paddingBottom: 24
	},
	user: {
		flexDirection: "row",
		gap: 12,
		alignItems: "center",
		marginVertical: 8
	},
	msg_border: {
		backgroundColor: "#E6EEFE",
		borderRadius: 16,
		borderColor: "#000",
		borderWidth: 1,
		maxWidth: 300,
		padding: 16
	},
	right: {
		alignItems: "flex-end"
	},
	fonts: {
		fontFamily: Fonts.poppins
	},
	p_16: {
		padding: 16
	},
	mv_8: {
		marginVertical: 8
	},
	tips: {
		marginTop: 8,
		paddingHorizontal: 16
	},
	tips_title: {
		marginTop: 80,
		marginBottom: 32
	},
	title: {
		fontFamily: Fonts.Poppins_Bold,
		fontSize: 32,
		textAlign: "center"
	},
	tips_content: {
		flexDirection: "row",
		gap: 12,
		padding: 24,
		backgroundColor: "#FFF",
		borderColor: Colors.light.border,
		borderWidth: 1,
		borderRadius: 36,
		marginBottom: 8
	},
	item_title: {
		fontFamily: Fonts.Poppins_Bold,
		fontSize: 16
	},
	item_content: {
		fontFamily: Fonts.poppins,
		color: "#776F69",
		fontSize: 14
	},
	history: {
		color: "#2589FF",
		textDecorationLine: "underline",
		textAlign: "center"
	},
	View: {
		marginTop: 20
	},
	w_100p: {
		width: "100%"
	},
	flex_1: {
		flex: 1
	}
});
