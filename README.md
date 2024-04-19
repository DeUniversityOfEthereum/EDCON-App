# EDCON App: An Open-Source Revolution in Event Experience

The EDCON app is an open-source initiative designed to revolutionize the attendee experience at the Ethereum Developers Conference (EDCON). By integrating features such as digital ticketing, a comprehensive event schedule, multi-language AI chatbot support, Scavenger Hunt, and live airdrop claims, the app sets a new standard for event apps in the Web3 space.

 Its ultimate vision is to create a unified email and wallet identity infrastructure for seamless interaction across various events, allowing other ecosystem and event partners to leverage its features for an engaging conference experience, all while showcasing the transformative power of open-source collaboration.

The open-source ethos of the EDCON app underscores our commitment to transparency, collaboration, and innovation. By making the app’s codebase accessible to the wider ecosystem, we encourage developers globally to contribute their expertise, enhance the platform, and tailor it for diverse events. This cooperative model aims to develop a customizable and scalable event app framework suited for the varied needs of the Web3 ecosystem.

###  Development Environment:
- Platform: React Native for iOS and Android; React for the web app (Save to Home, similar to friend.tech)
- Immediate access through the web app version in case of app store approval delays

### Design: 
https://www.figma.com/file/a3SpGcRt2IjTaowXrYwXNi/EDCON-APP?type=design&node-id=2271%3A3815&mode=design&t=b7vmnENOxyqmpRdg-1 
## Key Features
### Ticket Verification & Wallet Creation:
- Email-based ticket retrieval and verification process* 
- Automatic wallet creation linked to the user's email using Dynamic API or Web3 Auth (we need to work with a partner who’s willing to contribute to the open source project instead of gate keeping their identity mapping) 
- User would have the option to link their existing wallets like MetaMask using Dynamic API or Web3 Auth and export the wallet created through EDCON app.

*For the open source version, we can create a ticketing verification process that doesn’t use the existing EDCON system.  

### Event Schedule and Favorites
- Comprehensive view of main sessions and community events
- Ability to add sessions to a favorites list for personalized experience

### Scavenger Hunt
- Interactive game mechanics: Utilize NFC technology and QR codes to create a city-wide scavenger hunt that encourages physical and digital exploration of the event space and local Shibuya area.
- Rewards system: Participants unlock rewards by reaching specific locations and interacting with NFC chips or scanning QR codes, with all achievements visible in an in-app 'passport.'
- Competitive elements: Include a leaderboard to foster a competitive spirit among participants, with top scorers receiving special prizes.
- Inspiration: ETHDenver's POAP implementation https://www.ethdenver.com/poap 

### Live Airdrop
- Engaging live events: Leverage moments during live performances or keynotes to distribute QR codes via big screens, allowing attendees to scan and claim digital or physical rewards directly within the app.
- Merch and NFT rewards: Include exclusive merchandise discounts or special NFTs as part of the airdrop rewards, adding value and excitement to the attendee experience.

### Venue Information
- Detailed maps and directions to guide attendees through the venue

### AI Chatbot:
- Multilingual support: The AI chatbot is equipped to handle inquiries in multiple languages, making the app accessible to an international audience.
- Event, city, and district information: The chatbot can answer questions ranging from schedule details to recommendations for dining and entertainment in Shibuya, enhancing the overall visitor experience.

### UETH Education Component
- Access to blockchain education: Integrate UETH’s blockchain and Web3 educational materials directly into the app, offering attendees opportunities to learn through interactive modules and real-time lectures.

#### UETH screens: 
https://www.figma.com/file/Iiz8j24hkzXSfnLyrW5pe0/UETH-UX-Design-(Copy)?type=design&node-id=0%3A1&mode=design&t=RZOnzBUgQoFhkmsf-1 


## Divide & Conquer 
### EDCON Engineering Team will take care of the following features 
- Ticketing retrieval + Verification 
- Blockchain 101 Learning Powered by UETH
- Event Schedule + Favorite events 
- Venue Information
- AI Chatbot 
- Rewards store  
- Push notifications

### Open Source Community Development
- Implement a standardized unified identity mapping system
- Integrate Zora for Minting NFT Rewards as Part of Scavenger Hunt
- Live Event Airdrop Experience
- Phase 2: Open source key components of the app for community reuse.
## Phases 
- Get EDCON App live
- Open source the key components of the app to be reusable by other communities  
## Future Considerations
The EDCON app is just the beginning. As the Web3 event space continues to grow, we envision this open-source project evolving into a versatile platform that supports a wide range of events, from conferences to meetups and beyond. With community-driven enhancements and integrations, the possibilities are endless. We're excited to see how this project will shape the future of event experiences and set a new standard for community engagement in the Web3 world.

## Open Issues for Community Development
#### Issue #1 Implement a standardized unified identity mapping system

### Description:
Develop a unified identity mapping system that integrates with Dynamic API or Web3 Auth to link a user's wallet to their email address used during EDCON ticket purchase. The system should allow users to add additional wallets and ensure that this identity mapping can be standardized and reused across different events. It should also support portability, allowing other app developers to verify wallet ownership and display relevant assets in their apps.

## Tasks:

### API Integration:
- Integrate with Dynamic API or Web3 Auth to establish a secure connection between user emails and blockchain wallets.
- Ensure the integration supports real-time updates and secure data handling.

### User Interface Development:
- Design and implement a user-friendly interface within the EDCON app for wallet management and linkages.
- Provide clear instructions and intuitive controls for users to add and manage their wallets.

### System Standardization:
- Develop guidelines and standards for identity mapping that can be easily adopted by other event organizers.
- Include documentation and configuration settings that are adjustable based on the needs of different events.

### Compatibility and Portability:
- Ensure the identity mapping system is compatible with other applications, enabling app developers to verify wallet ownership.
- Provide a method for other apps to securely query and display user-specific assets based on the mapped identity.

### Acceptance Criteria:
- Users can seamlessly link multiple wallets to their registered email and manage them through the EDCON app.
- Identity mapping maintains high security, ensuring user data is protected against unauthorized access.
- Documentation that allows other developers to integrate the identity system into their applications.
#### Issue #2: Integrate Zora for Minting NFT Rewards as Scavenger Hunt Rewards

### Description:
Integrate the Zora platform to mint NFTs as rewards for participants of the scavenger hunt at EDCON. This will involve setting up the necessary interfaces and logic within the EDCON app to trigger NFT minting in response to specific interactions, such as NFC tapping/activation or QR code scanning, during the event.

### Tasks:
- Connect with Zora's APIs to enable NFT minting directly through the app. https://api.zora.co/
- Develop and implement logic within the app that triggers NFT minting based on scavenger hunt interactions (NFC taps or QR code scans).
- Ensure that the minted NFTs are visible and claimable within the user’s profile in the EDCON app.

### Acceptance Criteria:
- NFT minting is triggered reliably after NFC tapping/activation or QR code scanning.
- Users can view and access their NFTs within the app and in their wallet without issues.
- Integration respects user privacy and security standards.

### Scavenger Hunt User Flow Specification:
### For Non-Ticket Owners:

Online Interaction:
- Scan a QR code to access the scavenger hunt on the EDCON app or website.
- Authenticate via email; automatically create a wallet and claim the associated NFT.

Physical Interaction:
- Interact with NFC-enabled devices to access the scavenger hunt.
- Authenticate and mint NFTs directly through the app upon NFC interaction.

### For EDCON Ticket Owners:

App Download and Ticket Verification:
 - Download and verify tickets within the EDCON app.
 - Seamless transition from the EDCON app to in app browser to participate in scavenger hunt without additional authentication.

Scavenger Hunt Participation and Reward Management:
 - Participate in the scavenger hunt through a dedicated URL within the app.
 - All claimed badges or NFTs are managed and displayed in the user's profile.
#### Issue #3: Live Event Airdrop Experience with QR Code Scanning and Reward Management

### Description: 
Implement a live airdrop feature within the EDCON app that enables attendees to interactively claim rewards by scanning QR codes displayed during the event. The functionality should allow the app to capture QR codes, authenticate the claim, and securely store the rewards either on-chain in the user's wallet or within the app, based on the nature of the reward.

### Tasks:
- Develop QR code scanning functionality that would open up the app from the camera app to app.
- Develop the logic for claiming rewards once a QR code is scanned. This includes verifying the validity of the claim to prevent duplicate or unauthorized claims.
- Implement a method to store rewards directly in the user’s wallet if the reward is blockchain-based, or within the app if it's a different type of reward (e.g., discounts, merchandise codes).
- Design and implement a user-friendly interface in the app where users can view and manage their claimed rewards.

### Acceptance Criteria:
- Rewards are correctly claimed and displayed in the user's app wallet.
#### Issue #4: Open Source Key Components of the EDCON App for Community Reuse

### Description:
Phase 2 of the project involves preparing the EDCON app’s modular components for open source release. This includes documentation, cleaning up the codebase, and ensuring that the components are easily reusable for other community events.

### Tasks:
- Identify key components of the EDCON app suitable for open source release.
- Refactor the code to ensure modularity and ease of understanding.
- Create comprehensive documentation and guidelines for using these components in other projects.

### Acceptance Criteria:
- Key components are fully documented and accessible.
- The open source components are adopted in other external projects
  
