interface LoadingSpinnerProps {
  message?: string;
}
const LoadingSpinner = ({
  message = "Loading analytics...",
}: LoadingSpinnerProps) => {
  return (
    <div className="h-80 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-slate-600 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
