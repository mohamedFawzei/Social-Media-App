import { useState, useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  User,
  Plus,
  LogOut,
  PenLine,
  Lock,
  MessageCircle,
} from "lucide-react";
import logo from "../../../assets/images/Logo/Logo.png";
import avatar from "../../../assets/images/Avatar/AvatarDefault.svg";
import { AuthContext } from "../../../Context/AuthContext";
import { useTheme } from "../../../Context/ThemeContext";
import SettingsModal from "../../../features/auth/components/modals/SettingsModal/SettingsModal";
import { useHeaderAnimation } from "../../../Hooks/useHeaderAnimation";

const navItems = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: Plus, label: "Add Post", path: "/create-post" },
  { icon: MessageCircle, label: "Messages", path: "/chat" },
  { icon: User, label: "Profile", path: "/profile" },
];

const DesktopNavbar = () => {
  const { pathname } = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState("general");

  // ---------------- Logic from MobileNavbar ----------------
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  //console.log("DesktopNavbar", user);

  const { name: userName, photo: userPhoto } = user || {};

  // console.log(
  //   "DesktopNavbar - userName",
  //   userName,
  //   "userPhoto",
  //   userPhoto,
  // );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ---------------- Scroll Animation ----------------
  const { theme } = useTheme();
  const headerRef = useRef(null);
  useHeaderAnimation(headerRef, "desktop");

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md shadow-sm transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 h-17 flex items-center justify-between">
        {/* ---------------- left ---------------- */}
        <div className="flex items-center gap-3">
          <div className=" flex items-center justify-center font-bold ">
            <Link className="cursor-pointer  w-35 " to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
        </div>

        {/* ---------------- CENTER ---------------- */}
        <nav className="flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex flex-col items-center justify-center w-17 h-13 rounded-lg transition font-bold ${
                  isActive
                    ? "text-purple-900"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                }`}
              >
                <Icon size={24} />
                {/* Label */}
                <span className="text-[11px] mt-0.5 leading-none">
                  {item.label}
                </span>

                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-purple-600 rounded-full dark:bg-purple-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ---------------- right ---------------- */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen((p) => !p)}
            className="
              w-9 h-9
              rounded-full
              bg-slate-100
              flex items-center justify-center
              hover:bg-slate-200 cursor-pointer dark:bg-slate-500 dark:hover:bg-slate-700 duration-300
              overflow-hidden
            "
          >
            {/*  Dynamic Photo  */}
            <img
              src={userPhoto || avatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden dark:bg-slate-800 dark:text-white dark:shadow-black/50 border border-slate-100 dark:border-slate-700 ring-1 ring-black/5 dark:ring-white/5 animate-in fade-in slide-in-from-top-2 duration-200">
              {/*  Header */}
              <Link to="/profile">
                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center gap-4 hover:bg-slate-50/80 dark:hover:bg-slate-700/50 transition-colors">
                  {/* Photo */}
                  <div className="size-11 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center overflow-hidden shrink-0 ring-2 ring-white dark:ring-slate-800 shadow-sm">
                    <img
                      src={userPhoto || avatar}
                      alt="avatar"
                      className="size-full object-cover"
                    />
                  </div>
                  {/* Name */}
                  <div className="overflow-hidden">
                    <p className="font-bold text-slate-800 dark:text-slate-100 text-[15px] truncate">
                      {userName || "User"}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      View Profile
                    </p>
                  </div>
                </div>
              </Link>

              <div className="p-2">
                {/* Update Info */}
                <button
                  onClick={() => {
                    setSettingsTab("general");
                    setIsSettingsOpen(true);
                    setIsProfileOpen(false);
                  }}
                  className="w-full px-3 py-2.5 flex gap-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-slate-700/50 dark:hover:text-white items-center rounded-xl transition-all"
                >
                  <PenLine
                    size={18}
                    className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 transition-colors"
                  />
                  Update Info
                </button>

                {/* Change Password */}
                <button
                  onClick={() => {
                    setSettingsTab("security");
                    setIsSettingsOpen(true);
                    setIsProfileOpen(false);
                  }}
                  className="w-full px-3 py-2.5 flex gap-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-slate-700/50 dark:hover:text-white items-center rounded-xl transition-all"
                >
                  <Lock
                    size={18}
                    className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 transition-colors"
                  />
                  Change Password
                </button>

                <div className="h-px bg-slate-100 dark:bg-slate-700 my-1 mx-2"></div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full px-3 py-2.5 flex gap-3 text-sm font-medium text-red-500/80 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 items-center rounded-xl transition-all"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        initialTab={settingsTab}
      />
    </header>
  );
};

export default DesktopNavbar;
