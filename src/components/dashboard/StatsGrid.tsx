import { DollarSign, IndianRupeeIcon, UserCheck, Users, Wallet } from "lucide-react";
import SkeletonCard from "./SkeletonCard";
import StatCard from "./StatCard";

interface StatsGridProps {
  stats: {
    totalUsers: number;
    totalAstrologers: number;
    totalUserWalletBalance: number;
    totalAstrologerWalletBalance: number;
    totalAdminWalletBalance:number;
  };
  loading: boolean;
}

const StatsGrid = ({ stats, loading }: StatsGridProps) => {
  const statsConfig = [
    {
      title: "Total Users",
      value: stats?.totalUsers,
      icon: <Users className="w-8 h-8" />,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      title: "Total Astrologers",
      value: stats?.totalAstrologers,
      icon: <UserCheck className="w-8 h-8" />,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
    },
    {
      title: "User Wallet Balance",
      value: stats?.totalUserWalletBalance,
      icon: <Wallet className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      prefix: "₹",
    },
    {
      title: "Astrologer Wallet Balance",
      value: stats?.totalAstrologerWalletBalance,
      icon: <DollarSign className="w-8 h-8" />,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      prefix: "₹",
    },
    {
      title: "Admin Wallet Balance",
      value: stats?.totalAdminWalletBalance,
      icon: <IndianRupeeIcon className="w-8 h-8" />,
      gradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-50 to-purple-50",
      prefix: "₹",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsConfig.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          gradient={stat.gradient}
          bgGradient={stat.bgGradient}
          prefix={stat.prefix}
        />
      ))}
    </div>
  );
};

export default StatsGrid;
