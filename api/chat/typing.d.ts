export namespace Chat {
	export namespace Message {
		export type PostParams = {
			character_id: string;
			user_id: string;
			content: string;
			timestamp: number;
			channel: string;
			sender: string;
		};
		export type PostRes = {
			character_id: string;
			user_id: string;
			content: string;
			timestamp: number;
			channel: string;
			sender: string;
			session_id: string;
			model: string;
			base64_encoded_image: string;
			image_url: string;
			retool_content: string;
			sourceless_content: string;
			unaltered_content: string;
			sources: [
				{
					idref: string;
					source_title: string;
					source_type: string;
					source_location: string;
				}
			];
			retool_sources: [
				{
					idref: string;
					source_title: string;
					source_type: string;
					source_location: string;
				}
			];
			language: string;
			name: string;
			voice_id: string;
			audio_response_url: string;
			display_intention: boolean;
			intention: string;
			response_id: string;
		};
	}
}
