import { MessageCircle, Share2 } from "lucide-react";
import FakeLikes from "../FakeLikes/FakeLikes";

const PostActions = ({ postId, commentsCount, onCommentClick }) => {
  return (
    <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/5 mt-5">
      <div className="flex gap-2">
        <FakeLikes postId={postId} initialCommentsCount={commentsCount} />

        <button
          onClick={onCommentClick}
          className="group flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:bg-indigo-500/10 text-slate-500 hover:text-indigo-500 active:scale-95 cursor-pointer"
        >
          <MessageCircle
            size={20}
            className="group-hover:fill-indigo-500 rotate-25 group-hover:scale-110 transition-all duration-300 group-hover:rotate-0"
          />
          <span className="text-sm font-bold">{commentsCount}</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2.5 rounded-xl transition-all hover:bg-emerald-500/10 text-slate-500 hover:text-emerald-500 active:scale-95 cursor-pointer">
          <Share2 size={20} className="hover:rotate-12 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default PostActions;
