import { MoreVertical, Trash2, Edit3 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import { useAuth } from "../../../../Context/AuthContext";

const PostHeader = ({
  user,
  formattedDate,
  postId,
  onEditClick,
  onDeleteClick,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const { user: currentUser } = useAuth();
  const isMyPost = user?._id === currentUser?._id;
  // Close Menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setShowMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between mb-5 relative">
      <div className="flex items-center gap-3">
        <div className="relative group">
          <img
            src={user?.photo}
            className="w-12 h-12 rounded-xl object-cover"
            alt="avatar"
            loading="lazy"
            onError={(e) => {
              e.target.src =
                "https://linked-posts.routemisr.com/uploads/default-profile.png";
            }}
          />
          <div className="absolute inset-0 rounded-xl bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 dark:text-slate-100 text-[16px] hover:text-indigo-500 cursor-pointer transition-colors capitalize duration-300">
            {user?.name}
          </h4>
          <span className="text-[12px] text-slate-500 dark:text-slate-400 font-medium italic">
            {formattedDate}
          </span>
        </div>
      </div>

      {isMyPost && (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 p-2 hover:bg-slate-200 dark:hover:bg-white/5 rounded-xl transition-all duration-300 cursor-pointer"
          >
            <MoreVertical
              size={20}
              className="hover:-rotate-90 transition-transform duration-300"
            />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
              <button
                onClick={onEditClick}
                className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
              >
                <Edit3 size={16} /> Edit Post
              </button>
              <button
                onClick={onDeleteClick}
                className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 text-sm text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors border-t border-slate-100 dark:border-white/5"
              >
                <Trash2 size={16} /> Delete Post
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostHeader;
