import { Card, CardContent } from "../ui/card";
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  gradient: string;
  bgGradient: string;
  prefix?: string;
}
const StatCard = ({ title, value, icon, gradient, bgGradient, prefix = "" }:StatCardProps) => {
  return (
    <Card className="group hover:scale-105 transition-all duration-300 border-0 shadow-lg hover:shadow-2xl">
      <CardContent className={`p-6 bg-gradient-to-br ${bgGradient} relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
        
        <div className="relative space-y-4">
          <div className="flex items-center justify-between">
            <div className={`p-3 bg-gradient-to-r ${gradient} rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {icon}
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-slate-800 group-hover:scale-110 transition-transform duration-300">
                {prefix}{typeof value === 'number' ? value.toLocaleString() : value}
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-600">{title}</h3>
            <div className="w-full h-1 bg-white/30 rounded-full mt-2">
              <div className={`h-full bg-gradient-to-r ${gradient} rounded-full w-3/4 group-hover:w-full transition-all duration-700`}></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard