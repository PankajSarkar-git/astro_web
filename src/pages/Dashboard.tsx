import ChartSection from "@/components/dashboard/ChartSection";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsGrid from "@/components/dashboard/StatsGrid";
import YearPicker from "@/components/dashboard/YearPicker";
import { fetchMonthlyProfit, fetchStats } from "@/store/dashboard/action";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const [year, setYear] = useState(new Date().getFullYear());
  const { stats, monthlyProfits, loading } = useAppSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchMonthlyProfit({ year }));
  }, [dispatch, year]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <DashboardHeader />

        <YearPicker year={year} onYearChange={setYear} />

        {stats && <StatsGrid stats={stats} loading={loading.stats} />}

        <ChartSection
          monthlyProfits={monthlyProfits}
          loading={loading.monthly}
        />
      </div>
    </div>
  );
}
