import type { Href } from "expo-router";
type TaskProps = {
	id: number;
	title: string;
	description: string;
	route: Href<string>;
};

export const tasks: TaskProps[] = [
	{
		id: 1,
		title: "Issue #1 Implement a standardized unified identity mapping system",
		description: `Develop a unified identity mapping system that integrates with Dynamic API or Web3 Auth to link a user's wallet to their email address used during EDCON ticket purchase. The system should allow users to add additional wallets and ensure that this identity mapping can be standardized and reused across different events. It should also support portability, allowing other app developers to verify wallet ownership and display relevant assets in their apps.`,
		route: "/(auth)/home"
	},
	{
		id: 2,
		title: "Issue #2: Integrate Zora for Minting NFT Rewards as Scavenger Hunt Rewards",
		description: `Integrate the Zora platform to mint NFTs as rewards for participants of the scavenger hunt at EDCON. This will involve setting up the necessary interfaces and logic within the EDCON app to trigger NFT minting in response to specific interactions, such as NFC tapping/activation or QR code scanning, during the event.`,
		route: "/(edcon)/home"
	},
	{
		id: 3,
		title: "Issue #3: Live Event Airdrop Experience with QR Code Scanning and Reward Management",
		description: `Implement a live airdrop feature within the EDCON app that enables attendees to interactively claim rewards by scanning QR codes displayed during the event. The functionality should allow the app to capture QR codes, authenticate the claim, and securely store the rewards either on-chain in the user's wallet or within the app, based on the nature of the reward.`,
		route: "/(qrcode)/home"
	},
	{
		id: 4,
		title: "Issue #4: Open Source Key Components of the EDCON App for Community Reuse",
		description: `Phase 2 of the project involves preparing the EDCON app’s modular components for open source release. This includes documentation, cleaning up the codebase, and ensuring that the components are easily reusable for other community events.`,
		route: "/(key-components)/home"
	}
];
