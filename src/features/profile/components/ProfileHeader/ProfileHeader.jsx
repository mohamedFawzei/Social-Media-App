import avatarDefault from "../../../../assets/images/Avatar/AvatarDefault.svg";
const ProfileHeader = ({ user, postsCount, onEditProfile, userPhotoProp }) => {
  const { name } = user || {};

  // Use photo if available
  const displayPhoto = userPhotoProp || user?.photo || avatarDefault;

  return (
    <div className="relative group/header">
      {/* Gradient */}
      <div className="h-80 bg-linear-to-br from-indigo-100 via-purple-100 to-slate-200 dark:from-indigo-900 dark:via-purple-900 dark:to-slate-900 relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-linear-to-t from-slate-50 via-transparent to-transparent opacity-90 dark:from-[#0f172a] dark:to-transparent transition-colors duration-500"></div>

        {/* Decorative Circles */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative -mt-32 z-10">
        <div className="flex flex-col md:flex-row items-end gap-8 mb-8">
          {/* Avatar Section */}
          <div className="relative group/avatar cursor-pointer">
            <div className="absolute -inset-1 bg-linear-to-br from-indigo-500 to-purple-500 rounded-[2.5rem] opacity-50 blur-md group-hover/avatar:opacity-100 transition-opacity duration-500"></div>
            <img
              src={displayPhoto}
              className="w-40 h-40 md:w-52 md:h-52 rounded-[2.2rem] object-cover border-4 border-slate-50 dark:border-[#0f172a] shadow-2xl relative z-10 transition-transform duration-500 group-hover/avatar:scale-[1.02] bg-white dark:bg-slate-800"
              alt="profile"
            />
          </div>

          {/* Profile Info Section */}
          <div className="flex-1 pb-6  text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter capitalize mb-3 drop-shadow-sm transition-colors duration-300">
              {name || "User"}
            </h2>

            {/* Stats & Actions */}
            <div className="flex flex-col md:flex-row items-end md:items-center gap-6 justify-between w-full">
              <div className="flex items-center gap-8">
                <StatItem label="Posts" value={postsCount} />
                <StatItem label="Followers" value={2750} />
                <StatItem label="Following" value={500} />
              </div>

              <div className="flex items-center  gap-3">
                <button
                  onClick={onEditProfile}
                  className="cursor-pointer px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-800 dark:hover:bg-slate-50 transition-colors shadow-lg active:scale-95 duration-200"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ label, value }) => (
  <div className="text-center md:text-left">
    <span className="block text-2xl font-black text-slate-900 dark:text-white tracking-tight transition-colors duration-300">
      {value}
    </span>
    <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider transition-colors duration-300">
      {label}
    </span>
  </div>
);

export default ProfileHeader;
