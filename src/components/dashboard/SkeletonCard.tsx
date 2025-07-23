import { Card, CardContent } from "../ui/card";

const SkeletonCard = () => {
  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 bg-slate-200 rounded-2xl animate-pulse"></div>
            <div className="w-16 h-8 bg-slate-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="w-24 h-4 bg-slate-200 rounded animate-pulse"></div>
            <div className="w-full h-2 bg-slate-200 rounded animate-pulse"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;