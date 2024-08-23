import { ColorValue } from "react-native";
import Svg, { Path } from "react-native-svg";

type Icon = {
	color?: ColorValue;
	color2?: ColorValue;
};

export default function Icon16(props: Icon) {
	const { color = "white", color2 = "#202020" } = props;
	return (
		<Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<Path
				d="M8 14C9.42003 14 10.5712 11.3137 10.5712 8C10.5712 4.68629 9.42003 2 8 2C6.57997 2 5.4288 4.68629 5.4288 8C5.4288 11.3137 6.57997 14 8 14Z"
				fill={color}
			/>
			<Path
				d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
				fill={color}
			/>
			<Path
				d="M8 14C9.42003 14 10.5712 11.3137 10.5712 8C10.5712 4.68629 9.42003 2 8 2M8 14C6.57997 14 5.4288 11.3137 5.4288 8C5.4288 4.68629 6.57997 2 8 2M8 14C11.3137 14 14 11.3137 14 8M8 14C4.68629 14 2 11.3137 2 8M8 2C4.68629 2 2 4.68629 2 8M8 2C11.3137 2 14 4.68629 14 8M2 8H14"
				stroke={color2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}
