import Svg, { Path } from "react-native-svg";
import { IconPorps } from "./typing";

export default function TiwtterIcon16(props: IconPorps) {
	const { color = "white" } = props;
	return (
		<Svg style={props.style} width="16" height="16" viewBox="0 0 16 16" fill="none">
			<Path
				d="M12.1352 1.5H14.3406L9.52257 7.00667L15.1906 14.5H10.7526L7.27657 9.95533L3.29926 14.5H1.09259L6.24593 8.61L0.808594 1.5H5.35926L8.50123 5.654L12.1352 1.5ZM11.3612 13.18H12.5832L4.69526 2.75067H3.38393L11.3612 13.18Z"
				fill={color}
			/>
		</Svg>
	);
}
