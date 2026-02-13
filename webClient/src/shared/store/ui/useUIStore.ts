import { create } from "zustand";

type UIState = {
    // Desktop collapse
    isSidebarCollapsed: boolean;
    toggleSidebarCollapsed: () => void;
    setSidebarCollapsed: (v: boolean) => void;

    // Mobile drawer
    isSidebarMobileOpen: boolean;
    openSidebarMobile: () => void;
    closeSidebarMobile: () => void;
    toggleSidebarMobile: () => void;
};

export const useUIStore = create<UIState>((set) => ({
    // Desktop collapse
    isSidebarCollapsed: false,
    toggleSidebarCollapsed: () =>
        set((s) => ({ isSidebarCollapsed: !s.isSidebarCollapsed })),
    setSidebarCollapsed: (v) => set({ isSidebarCollapsed: v }),

    // Mobile drawer
    isSidebarMobileOpen: false,
    openSidebarMobile: () => set({ isSidebarMobileOpen: true }),
    closeSidebarMobile: () => set({ isSidebarMobileOpen: false }),
    toggleSidebarMobile: () =>
        set((s) => ({ isSidebarMobileOpen: !s.isSidebarMobileOpen })),
}));
