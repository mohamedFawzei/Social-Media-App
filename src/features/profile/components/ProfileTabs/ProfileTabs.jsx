import { cn } from "../../../../Lib/Utils";

const ProfileTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "posts", label: "Posts" },
    { id: "media", label: "Media" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="flex items-center gap-8 border-b border-slate-200 dark:border-white/5 mb-8 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "pb-4 font-bold text-sm border-b-2 transition-colors cursor-pointer whitespace-nowrap px-2 outline-none",
              activeTab === tab.id
                ? "text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-500"
                : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;
