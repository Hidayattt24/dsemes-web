import { ROUTES } from "./routes";

/**
 * Sidebar navigation items.
 * Add / remove items here — SidebarNavbar reads this array.
 */
export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly icon: string; // Material Symbols name
}

export const MAIN_NAV_ITEMS: readonly NavItem[] = [
  { label: "Dashboard",                 href: ROUTES.DASHBOARD,                 icon: "grid_view"           },
  { label: "Data Pasien",               href: ROUTES.DATA_PASIEN,               icon: "person"              },
  { label: "Pemantauan Catatan Pasien", href: ROUTES.PEMANTAUAN_CATATAN_PASIEN, icon: "monitor_heart"       },
  { label: "Manajemen Edukasi",         href: ROUTES.MANAJEMEN_EDUKASI,         icon: "school"              },
  { label: "Manajemen Kuisioner",       href: ROUTES.MANAJEMEN_KUISIONER,       icon: "quiz"                },
  { label: "Administrator",             href: ROUTES.ADMINISTRATOR,             icon: "admin_panel_settings" },
] as const;

export const BOTTOM_NAV_ITEMS: readonly NavItem[] = [
  { label: "Pengaturan", href: ROUTES.PENGATURAN, icon: "settings" },
] as const;
