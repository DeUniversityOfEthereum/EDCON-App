import { Ticket } from "@/api/ticket/typing";
import { FAVORITE_EVNNTS_STORE_KEY } from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Slice = {
	favoriteSet: Set<string>;
	setFavorite: (set: Set<string>) => void;

	tickets: Array<Ticket.Info>;
	setTickets: (set: Array<Ticket.Info>) => void;

	bindedTicket: Ticket.Info | undefined;
	setBindedTicket: (set: Ticket.Info) => void;
};

export const atuhSliceName = "ueth-auth";

export const useUserStore = create(
	persist<Slice>(
		set => ({
			favoriteSet: new Set(),
			setFavorite: val => {
				const s = JSON.stringify(val);
				set({ favoriteSet: val });
				AsyncStorage.setItem(FAVORITE_EVNNTS_STORE_KEY, s);
			},

			tickets: [],
			setTickets: val => {
				set({ tickets: val });
			},

			bindedTicket: undefined,
			setBindedTicket: val => {
				set({ bindedTicket: val });
				console.log(JSON.stringify(val));
			}
		}),
		{
			name: atuhSliceName,
			storage: createJSONStorage(() => (Platform.OS === "web" ? localStorage : AsyncStorage))
		}
	)
);
