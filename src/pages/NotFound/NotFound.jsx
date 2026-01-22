import { Compass, Ghost, Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#121214] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-md w-full">
        {/* Visual Icon Section */}
        <div className="flex justify-center mb-8 relative">
          <div className="animate-bounce duration-300">
            <Ghost
              size={100}
              className="text-indigo-500/40"
              strokeWidth={1.5}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-[140px] font-black text-white/5 select-none tracking-tighter">
              404
            </h1>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Lost in Space?
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed capitalize">
            We Couldn't Find That Page, Try Searching or go to home
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold transition-all active:scale-[0.98] shadow-lg shadow-indigo-600/20"
          >
            <Home size={20} />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 px-8 py-4 rounded-2xl font-bold transition-all"
          >
            <Compass size={20} />
            Go Back
          </button>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 text-slate-600 text-xs font-medium uppercase tracking-[0.2em]">
        Error Code: 404_NOT_FOUND
      </div>
    </div>
  );
};

export default NotFound;
