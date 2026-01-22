import { useState, useRef, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  User,
  Plus,
  LogOut,
  Settings,
  PenLine,
  Lock,
} from "lucide-react";
import avatar from "../../../assets/images/Avatar/AvatarDefault.svg";
import { useNavbarAnimation } from "../../../Hooks/UseNavbarAnimation";
import { AuthContext } from "../../../Context/AuthContext";
import SettingsModal from "../../../features/auth/components/modals/SettingsModal/SettingsModal";
// home - Profile - Create
// Change Password - Update Info - Logout
// ---------------- NAV ITEMS ----------------
const navItems = [
  { icon: <Home />, label: "Home", path: "/home" },
  { icon: <Plus size={28} />, label: "Add Post", path: "/create-post" },
  { icon: <User />, label: "Profile", path: "/profile" },
];

const MobileNavbar = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState("general");
  const navigate = useNavigate();
  const indicatorRef = useRef(null);
  const iconRefs = useRef([]);
  const profileRef = useRef(null);
  const location = useLocation();
  const { logout, user } = useContext(AuthContext);
  // user object structure
  const { name: userName, photo: userPhoto } = user || {};
  // ---------------- sync active tab ----------------
  useEffect(() => {
    const index = navItems.findIndex((item) => item.path === location.pathname);
    if (index !== -1) setActiveTab(index);
  }, [location.pathname]);

  // ---------------- close profile  ----------------
  useEffect(() => {
    const handleOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, []);

  // ---------------- gsap  ----------------
  useNavbarAnimation({
    activeTab,
    isProfileOpen,
    indicatorRef,
    iconRefs,
  });
  // ---------------- logout ----------------
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav
      role="navigation"
      className="fixed bottom-0 left-0 w-full flex justify-center pb-4 z-50"
    >
      <div className="relative w-full max-w-md h-16 bg-white rounded-3xl shadow-lg flex justify-between px-6 dark:bg-slate-800 transition-colors">
        {/* ---------------- indicator ---------------- */}
        <div
          ref={indicatorRef}
          className="
            absolute
            left-1/2
            -top-6
            h-14 w-14
            bg-purple-600 dark:bg-purple-500
            rounded-full
            -translate-x-1/2
            z-0
          "
        />

        {/* ---------------- nav items ---------------- */}
        {navItems.map((item, index) => (
          <Link
            key={item.path}
            to={item.path}
            aria-current={activeTab === index ? "page" : undefined}
            onClick={() => {
              setActiveTab(index);
              setIsProfileOpen(false);
            }}
            className="w-12 flex flex-col items-center justify-center z-20"
          >
            <div
              ref={(el) => (iconRefs.current[index] = el)}
              className="text-slate-400 dark:text-slate-300"
            >
              {item.icon}
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-300">
              {item.label}
            </span>
          </Link>
        ))}

        {/* ---------------- profile ---------------- */}
        <div
          ref={profileRef}
          className="relative w-12 flex items-center justify-center z-30"
        >
          <button
            aria-expanded={isProfileOpen}
            onClick={() => setIsProfileOpen((p) => !p)}
            className="
              w-12 h-12
              flex flex-col items-center justify-center
              text-slate-400
              focus:outline-none
              translate-y-1
            "
          >
            <Settings />
            <span className="text-[10px]">Settings</span>
          </button>

          {/* ---------------- dropdown ---------------- */}
          {isProfileOpen && (
            <div className="absolute bottom-full mb-3 right-0 w-64 bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden dark:bg-slate-800 dark:text-white dark:shadow-black/20 border border-slate-100 dark:border-slate-700 ring-1 ring-black/5 dark:ring-white/5 animate-in fade-in slide-in-from-bottom-2 duration-200 z-50">
              <Link to="/profile">
                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center gap-4 hover:bg-slate-50/80 dark:hover:bg-slate-700/50 transition-colors">
                  <div className="size-11 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center overflow-hidden shrink-0 ring-2 ring-white dark:ring-slate-800 shadow-sm">
                    <img
                      src={userPhoto || avatar}
                      alt="profile"
                      className="size-full object-cover"
                    />
                  </div>
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
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-slate-700/50 dark:hover:text-white rounded-xl transition-all"
                >
                  <PenLine
                    size={18}
                    className="text-slate-400 dark:text-slate-500"
                  />{" "}
                  Update Info
                </button>
                {/* Change Pass */}
                <button
                  onClick={() => {
                    setSettingsTab("security");
                    setIsSettingsOpen(true);
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-slate-700/50 dark:hover:text-white rounded-xl transition-all"
                >
                  <Lock
                    size={18}
                    className="text-slate-400 dark:text-slate-500"
                  />{" "}
                  Change Password
                </button>

                <div className="h-px bg-slate-100 dark:bg-slate-700 my-1 mx-2"></div>

                {/* LogOut */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-500/80 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                >
                  <LogOut size={18} /> Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        initialTab={settingsTab}
      />
    </nav>
  );
};

export default MobileNavbar;
