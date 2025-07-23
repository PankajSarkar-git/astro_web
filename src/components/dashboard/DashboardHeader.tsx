import { TrendingUp } from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="text-center space-y-4">
      <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20">
        <TrendingUp className="w-6 h-6 text-indigo-600" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Dashboard Analytics
        </h1>
      </div>
      <p className="text-slate-600 text-lg">
        Welcome back! Here's what's happening with your business today.
      </p>
    </div>
  );
};

export default DashboardHeader;