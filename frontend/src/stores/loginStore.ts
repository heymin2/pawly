import { create } from "zustand";

interface LoginStore {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
}

export const useLoginStore = create<LoginStore>((set) => ({
  isLogin: false,
  login: () => set({ isLogin: true }),
  logout: () => set({ isLogin: false }),
}));
