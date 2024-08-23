import SectionContainer from "@/app/(edcon)/hunt/components/SectionContainer";
import { View } from "@themed";
import { StyleSheet } from "react-native";
import { Path, Svg } from "react-native-svg";

type ViewUrlProps = {
	arbiscan?: string;
	zora?: string;
};
export default function ViewUrl(props: ViewUrlProps) {
	const { arbiscan, zora } = props;

	return (
		<View style={styles.container}>
			{arbiscan && (
				<SectionContainer
					text={"View on Arbiscan"}
					headerStyle={styles.sectionHeaderViewOn}
					indicator={<ArrowRightLineIcon />}
				/>
			)}

			{zora && (
				<SectionContainer
					text={"View on Zora"}
					headerStyle={styles.sectionHeaderViewOn}
					indicator={<ArrowRightLineIcon />}
				/>
			)}
		</View>
	);
}

function ArrowRightLineIcon() {
	return (
		<Svg width="16" height="14" viewBox="0 0 16 14" fill="none">
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M9.68995 1.21015L8.7 0.220203L6.7201 2.2001L7.71005 3.19005L10.1201 5.6001H1.5H0.1V8.4001H1.5H10.1201L7.71005 10.8102L6.7201 11.8001L8.7 13.78L9.68995 12.7901L14.4899 7.99005L15.4799 7.0001L14.4899 6.01015L9.68995 1.21015Z"
				fill="#1A1A1A"
			/>
		</Svg>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 24
	},
	sectionHeaderViewOn: {
		justifyContent: "flex-start",
		alignItems: "center",
		gap: 8
	}
});
