import { Loader2 } from "lucide-react";

const SubmitButton = ({
  isLoading,
  text,
  loadingText = "Processing",
  className = "",
}) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full rounded-xl bg-indigo-600 py-4 text-white font-bold text-lg shadow-lg shadow-indigo-500/30 
                  hover:bg-indigo-700 hover:shadow-indigo-500/50 hover:-translate-y-1 transition-all duration-300 
                  disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center ${className}`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          {loadingText}
          <Loader2 className="h-6 w-6 animate-spin" />
        </span>
      ) : (
        text
      )}
    </button>
  );
};

export default SubmitButton;
