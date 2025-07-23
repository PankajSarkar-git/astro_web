import { TrendingUp } from "lucide-react";
import ChartContainer, { type MonthlyProfit } from "./ChartContainer";

interface ChartSectionProps {
  monthlyProfits: MonthlyProfit[];
  loading: boolean;
}

const ChartSection = ({ monthlyProfits, loading }:ChartSectionProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">
          Monthly Profit Overview
        </h2>
      </div>

      <ChartContainer monthlyProfits={monthlyProfits} loading={loading} />
    </div>
  );
};

export default ChartSection;
