"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SidebarState {
  readonly isCollapsed: boolean;
}

interface SidebarActions {
  toggle: () => void;
  collapse: () => void;
  expand: () => void;
}

type SidebarStore = SidebarState & SidebarActions;

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isCollapsed: false,
      toggle:  () => set((s) => ({ isCollapsed: !s.isCollapsed })),
      collapse: () => set({ isCollapsed: true }),
      expand:   () => set({ isCollapsed: false }),
    }),
    {
      name:    "dsmes-sidebar",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
