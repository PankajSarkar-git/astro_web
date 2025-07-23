import { Calendar } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";


interface YearPickerProps {
  year: number;
  onYearChange: (year: number) => void;
}
const YearPicker = ({ year, onYearChange }:YearPickerProps) => {
  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/20">
        <Calendar className="w-5 h-5 text-indigo-600" />
        <Label htmlFor="year" className="text-slate-700 font-medium">
          Select Year
        </Label>
        <Input
          id="year"
          type="number"
          min="2000"
          max="2100"
          value={year}
          onChange={(e) => onYearChange(parseInt(e.target.value))}
          className="w-24 bg-white/50 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400/20"
        />
      </div>
    </div>
  );
};

export default YearPicker;
