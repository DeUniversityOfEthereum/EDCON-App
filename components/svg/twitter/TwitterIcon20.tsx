import { View } from "react-native";
import TiwtterIcon16 from "./TwitterIcon16";

import { IconPorps } from "./typing";

export default function TiwtterIcon20(props: IconPorps) {
	return (
		<View
			style={[
				{
					width: 20,
					aspectRatio: 1,
					borderRadius: 10,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "black"
				},
				props.style
			]}
		>
			<TiwtterIcon16 color={props.color} />
		</View>
	);
}
