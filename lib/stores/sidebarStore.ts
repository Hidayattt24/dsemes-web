"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SidebarState {
  readonly isCollapsed: boolean;
  readonly isMobileOpen: boolean;
}

interface SidebarActions {
  toggle: () => void;
  collapse: () => void;
  expand: () => void;
  toggleMobile: () => void;
  closeMobile: () => void;
  openMobile: () => void;
}

type SidebarStore = SidebarState & SidebarActions;

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isCollapsed: false,
      isMobileOpen: false,
      toggle:  () => set((s) => ({ isCollapsed: !s.isCollapsed })),
      collapse: () => set({ isCollapsed: true }),
      expand:   () => set({ isCollapsed: false }),
      toggleMobile: () => set((s) => ({ isMobileOpen: !s.isMobileOpen })),
      closeMobile: () => set({ isMobileOpen: false }),
      openMobile: () => set({ isMobileOpen: true }),
    }),
    {
      name:    "dsmes-sidebar",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
