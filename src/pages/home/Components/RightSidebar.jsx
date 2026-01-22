import { useNavigate } from "react-router-dom";
import { Search, MoreHorizontal, Video } from "lucide-react";
import { contacts } from "../../../Data/Contacts";
import img1 from "../../../assets/images/Ads/React.jpg";
import img2 from "../../../assets/images/Ads/Design.jpg";

const RightSidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="hidden lg:block w-[280px] fixed right-0 top-20 h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar p-4 xl:pr-8 [direction:rtl]">
      <div className="[direction:ltr]">
        {/* Sponsored */}
        <h3 className="text-slate-500 dark:text-slate-400 font-bold text-[15px] mb-4">
          Sponsored
        </h3>

        <div className="mb-6 space-y-4">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
            <img
              src={img1}
              className="w-28 h-28 rounded-xl object-cover"
              alt="ad"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-slate-700 dark:text-slate-200 font-semibold text-sm mb-1">
                React Hooks Tips
              </h4>
              <p className="text-slate-500 text-xs truncate">
                Clean UI Inspiration
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
            <img
              src={img2}
              className="w-28 h-28 rounded-xl object-cover"
              alt="ad"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-slate-700 dark:text-slate-200 font-semibold text-sm mb-1">
                Design Masterclass
              </h4>
              <p className="text-slate-500 text-xs truncate">Design Trends</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-white/5 my-4"></div>

        {/* Contacts Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-500 dark:text-slate-400 font-bold text-[15px]">
            Contacts
          </h3>
          <div className="flex gap-2">
            <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
              <Video size={16} />
            </button>
            <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
              <Search size={16} />
            </button>
            <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* Contacts List */}
        <div className="space-y-1">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => navigate("/chat")}
              className="flex items-center  gap-3 p-2.5 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
            >
              <div className="relative shrink-0">
                <img
                  src={contact.img}
                  alt={contact.name}
                  className="w-10 h-10 rounded-full object-cover object-top ring-2 ring-transparent group-hover:ring-indigo-500/30 transition-all"
                />
                {contact.status === "online" && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-50 dark:border-[#0f172a] rounded-full"></div>
                )}
              </div>
              <span className="text-slate-700 dark:text-slate-200 font-medium text-[14px]">
                {contact.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
