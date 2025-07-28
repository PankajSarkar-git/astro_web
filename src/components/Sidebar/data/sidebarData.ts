import { 
  BarChart3, 
  Image, 
  Search, 
  Users, 
  Wallet,
  Star,
  MessageCircle,
  Calendar,
  Settings,
  TrendingUp 
} from "lucide-react";

/**
 * Returns sidebar sections with items.
 * Enhanced with better icons and color scheme.
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
      icon: Star, // More thematic than User2Icon
      path: "/astrologers",
      hasSubItems: false,
      color: SIDEBAR_COLORS.astrologers.primary,
      bgColor: SIDEBAR_COLORS.astrologers.background,
    },
    {
      label: "Search User",
      icon: Search, // Cleaner than SearchIcon
      path: "/search-user",
      hasSubItems: false,
      color: SIDEBAR_COLORS.search.primary,
      bgColor: SIDEBAR_COLORS.search.background,
    },
    {
      label: "Banner",
      icon: Image, // Cleaner than ImageIcon
      path: "/banner",
      hasSubItems: false,
      color: SIDEBAR_COLORS.banner.primary,
      bgColor: SIDEBAR_COLORS.banner.background,
    },
    {
      label: "Withdraw",
      icon: Wallet, // More appropriate than CreditCard
      path: "/withdraw",
      hasSubItems: false,
      color: SIDEBAR_COLORS.withdraw.primary,
      bgColor: SIDEBAR_COLORS.withdraw.background,
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
 * Enhanced sidebar item colors for consistent theming.
 * Each section now has its own distinct color scheme.
 */
export const SIDEBAR_COLORS = {
  dashboard: {
    primary: "#3B82F6",       // Blue - Analytics/Data
    background: "#EFF6FF",    // Light blue
    hover: "#DBEAFE",
  },
  astrologers: {
    primary: "#8B5CF6",       // Purple - Mystical/Spiritual
    background: "#F3E8FF",    // Light purple
    hover: "#E9D5FF",
  },
  search: {
    primary: "#06B6D4",       // Cyan - Discovery/Search
    background: "#ECFEFF",    // Light cyan
    hover: "#CFFAFE",
  },
  banner: {
    primary: "#F59E0B",       // Amber - Visual/Creative
    background: "#FFFBEB",    // Light amber
    hover: "#FEF3C7",
  },
  withdraw: {
    primary: "#10B981",       // Emerald - Money/Success
    background: "#ECFDF5",    // Light emerald
    hover: "#D1FAE5",
  },
} as const;

// Optional: Additional icons you might want to use for future sections
export const ADDITIONAL_ICONS = {
  chat: MessageCircle,
  appointments: Calendar,
  settings: Settings,
  analytics: TrendingUp,
  users: Users,
} as const;