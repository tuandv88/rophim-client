import { create } from "zustand";

interface AppState {
  isMobileMenuOpen: boolean;
  searchDraft: string;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  setSearchDraft: (value: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isMobileMenuOpen: false,
  searchDraft: "",
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  setSearchDraft: (value) => set({ searchDraft: value }),
}));
