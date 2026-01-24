import {
  Bookmark,
  Calendar,
  ChevronDown,
  Clock,
  Layout,
  PlayCircle,
  Store,
  Users,
  Users2,
} from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import img1 from "../../../assets/images/Shortcuts/Img2.jpg";
import img2 from "../../../assets/images/Shortcuts/Laptop.jpg";
import img3 from "../../../assets/images/Shortcuts/React.jpg";
const LeftSidebar = () => {
  const { user, avatar } = useContext(AuthContext);
  const navigate = useNavigate();
  const { name: userName, photo: userPhoto } = user || {};

  const menuItems = [
    { icon: Users, label: "Friends", color: "text-blue-400" },
    { icon: Clock, label: "Memories", color: "text-blue-400" },
    { icon: Bookmark, label: "Saved", color: "text-purple-400" },
    { icon: Users2, label: "Groups", color: "text-blue-400" },
    { icon: PlayCircle, label: "Video", color: "text-blue-400" },
    { icon: Store, label: "Marketplace", color: "text-blue-400" },
    { icon: Calendar, label: "Events", color: "text-red-400" },
    { icon: Layout, label: "Feeds", color: "text-blue-400" },
  ];

  return (
    <div className="hidden lg:block w-[280px] fixed left-0 top-20 h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar p-4 xl:pl-8 bg-transparent transition-colors">
      <div className="space-y-2">
        {/* User Profile Link */}
        <div
          onClick={() => navigate(`/profile/${user?._id}`)}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
        >
          <img
            src={userPhoto || avatar}
            alt="profile"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-transparent group-hover:ring-indigo-500/50 transition-all"
          />
          <span className="text-slate-700 dark:text-slate-200 font-bold text-[15px]">
            {userName || "User"}
          </span>
        </div>

        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
          >
            <item.icon size={22} className={item.color} />
            <span className="text-slate-600 dark:text-slate-300 font-medium text-[15px]">
              {item.label}
            </span>
          </div>
        ))}

        <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
            <ChevronDown
              size={20}
              className="text-slate-600 dark:text-slate-400"
            />
          </div>
          <span className="text-slate-600 dark:text-slate-300 font-medium text-[15px]">
            See more
          </span>
        </div>

        <div className="border-t border-slate-200 dark:border-white/5 my-4 mx-2"></div>

        {/* Shortcuts Section */}
        <h3 className="text-slate-500 font-bold text-[13px] px-3 mb-2 uppercase tracking-wide">
          Your Shortcuts
        </h3>

        {/* Fake groups */}
        {[
          {
            img: img3,
            name: "React Developers",
          },
          {
            img: img2,
            name: "Design Community",
          },
          { img: img1, name: "Gaming Hub" },
        ].map((shortcut, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
          >
            <img
              src={shortcut.img}
              className="w-10 h-10 rounded-lg object-cover"
              alt="shortcut"
            />
            <span className="text-slate-600 dark:text-slate-300 font-medium text-[15px]">
              {shortcut.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 px-4 text-xs text-slate-500 leading-relaxed">
        <ul className="text-xs">
          {" "}
          <p className="text-md">
            © All rights reserved {new Date().getFullYear()} Mohamed Fawzi - UI
            & Code{" "}
          </p>
          <li>
            Email:{" "}
            <a
              href="mailto:muhammadfawzei@gmail.com"
              target="_blank"
              className="hover:text-slate-400 duration-300"
            >
              muhammadfawzei@gmail.com
            </a>
          </li>
          <li>
            Phone: {<br></br>}
            <a
              href="tel:+201066587947"
              target="_blank"
              className="hover:text-slate-400 duration-300"
            >
              01066587947
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
