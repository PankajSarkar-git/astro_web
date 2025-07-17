import { BarChart3, ImageIcon, SearchIcon, User2Icon } from "lucide-react";

/**
 * Returns sidebar sections with items.
 * Currently includes only Dashboard and Astrologers.
 */
export const useSidebarData = () => {
  const baseItems = [
    {
      label: "Dashboard",
      icon: BarChart3,
      path: "/dashboard",
      hasSubItems: false,
      color: SIDEBAR_COLORS.dashboard.primary,
      bgColor: SIDEBAR_COLORS.dashboard.background,
    },
    {
      label: "Astrologers",
      icon: User2Icon,
      path: "/astrologers",
      hasSubItems: false,
      color: SIDEBAR_COLORS.astrologers.primary,
      bgColor: SIDEBAR_COLORS.astrologers.background,
    },
    {
      label: "Search User",
      icon: SearchIcon,
      path: "/search-user",
      hasSubItems: false,
      color: SIDEBAR_COLORS.astrologers.primary,
      bgColor: SIDEBAR_COLORS.astrologers.background,
    },
    {
      label: "Banner",
      icon: ImageIcon,
      path: "/banner",
      hasSubItems: false,
      color: SIDEBAR_COLORS.astrologers.primary,
      bgColor: SIDEBAR_COLORS.astrologers.background,
    },
  ];

  return [
    {
      section: "",
      items: baseItems,
    },
  ];
};

/**
 * Sidebar item colors for consistent theming.
 */
export const SIDEBAR_COLORS = {
  dashboard: {
    primary: "#3B82F6",       // Blue
    background: "#EFF6FF",    // Light blue
    hover: "#DBEAFE",
  },
  astrologers: {
    primary: "#10B981",       // Emerald
    background: "#ECFDF5",    // Light emerald
    hover: "#D1FAE5",
  },
} as const;
