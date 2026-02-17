import { genUUID } from "@/shared/lib/genUUID";
import type { ReactNode } from "react";
import { create } from "zustand";

export type ModalSize = "sm" | "md" | "lg";

export type ModalPayload = {
    title?: string;
    content: ReactNode;
    size?: ModalSize;
    dismissible?: boolean;
};

export type ToastVariant = "default" | "success" | "warning" | "error";

export type ToastPayload = {
    id?: string;
    title: string;
    message?: string;
    variant: ToastVariant;
    durationMs?: number;
};

export type ToastItem = Required<Omit<ToastPayload, "id">> & { id: string };

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

    // Modal
    modal: (Required<Pick<ModalPayload, "content">> & ModalPayload) | null;
    openModal: (payload: ModalPayload) => void;
    closeModal: () => void;

    // Toast
    toasts: ToastItem[];
    toast: (payload: ToastPayload) => void;
    dismissToast: (id: string) => void;
    clearToasts: () => void;
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

    // Modal
    modal: null,
    openModal: (payload) =>
        set({ modal: { size: "md", dismissible: true, ...payload } }),
    closeModal: () => set({ modal: null }),

    // Toast
    toasts: [],
    toast: (payload: ToastPayload) => {
        const id = payload.id ?? genUUID();
        const item: ToastItem = {
            id,
            title: payload.title,
            message: payload.message ?? "",
            variant: payload.variant ?? "default",
            durationMs: payload.durationMs ?? 3500,
        };

        set((s) => ({ toasts: [...s.toasts, item] }));
        return id;
    },
    dismissToast: (id) =>
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
    clearToasts: () => set({ toasts: [] }),
}));
