import { TOKEN_EXPIRED_AT_STORE_KEY, TOKEN_STORE_KEY } from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Auth } from "@/api/auth/typing";
export type AuthSlice = {
	token: string;
	tokenExpiredAt: string;
	userInfo: Auth.UserInfo;
	walletAddress: string;
	setToken: (value: AuthSlice["token"]) => void;
	setTokenExpiredAt: (value: AuthSlice["tokenExpiredAt"]) => void;
	setUserInfo: (value: AuthSlice["userInfo"]) => void;
	setWalletAddress: (val: AuthSlice["walletAddress"]) => void;
	LoginOut: () => void;
};

export const useAuthStore = create(
	persist<AuthSlice>(
		set => ({
			token: "",
			tokenExpiredAt: "",
			userInfo: {} as AuthSlice["userInfo"],
			walletAddress: "",
			setToken: val => {
				AsyncStorage.setItem(TOKEN_STORE_KEY, val);
				set({ token: val });
			},
			setTokenExpiredAt: val => {
				AsyncStorage.setItem(TOKEN_EXPIRED_AT_STORE_KEY, val);
				set({ tokenExpiredAt: val });
			},
			setUserInfo: val => {
				set({ userInfo: val });
			},
			LoginOut: () => {
				AsyncStorage.removeItem(TOKEN_STORE_KEY);
				AsyncStorage.removeItem(TOKEN_EXPIRED_AT_STORE_KEY);
				set({ token: "", tokenExpiredAt: "", userInfo: { id: 0 } as AuthSlice["userInfo"] });
			},
			setWalletAddress: val => {
				set({ walletAddress: val });
			}
		}),
		{
			name: "edcoon-app-auth",
			storage: createJSONStorage(() => (Platform.OS === "web" ? localStorage : AsyncStorage))
		}
	)
);
