import { MessageCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";
import avatar from "../../../assets/images/Avatar/AvatarDefault.svg";
import { useAuth } from "../../../Context/AuthContext";
const MobileHeader = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-16 py-3 px-4 flex items-center justify-between pt-[calc(env(safe-area-inset-top)+12px)] transition-colors w-full">
      {/* Logo Area */}
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">S</span>
        </div>
        <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          Social App
        </span>
      </Link>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-white transition-colors border border-slate-200 dark:border-white/5">
          <Search size={20} />
        </button>

        <Link
          to="/chat"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-indigo-500 hover:text-indigo-600 dark:hover:text-white transition-all border border-slate-200 dark:border-white/5 relative group"
        >
          <MessageCircle size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-[#0f172a] animate-pulse"></span>
        </Link>

        <Link
          to="/profile"
          className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/10 ml-1"
        >
          <img
            src={user?.photo || avatar}
            alt="Profile"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = avatar;
            }}
          />
        </Link>
      </div>
    </div>
  );
};

export default MobileHeader;
