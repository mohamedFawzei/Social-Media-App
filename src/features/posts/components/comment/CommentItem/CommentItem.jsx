import { useContext, useMemo, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../../../../Context/AuthContext";
import { Pencil, Trash2 } from "lucide-react";
import EditCommentModal from "../../../../auth/components/modals/EditCommentModal/EditCommentModal";
import DeleteCommentModal from "../../../../auth/components/modals/DeleteCommentModal/DeleteCommentModal";

const CommentItem = ({ comment, postId, highlight }) => {
  const { user, avatar } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const commentRef = useRef(null);

  useEffect(() => {
    if (highlight) {
      setIsHighlighted(true);
      //  delay
      setTimeout(() => {
        commentRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);

      const timer = setTimeout(() => {
        setIsHighlighted(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [highlight]);

  //  comment object with postId
  const commentForEdit = useMemo(() => {
    return { ...comment, postId: postId || comment.postId };
  }, [comment, postId]);

  const formattedCommentDate = useMemo(() => {
    if (!comment?.createdAt) return "Just now";

    const date = new Date(comment.createdAt);
    const diff = (new Date() - date) / 1000;

    if (diff < 60) return "Just now";
    if (diff < 86400) {
      return date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [comment?.createdAt]);

  const isOwner = user?._id === comment.commentCreator?._id;

  return (
    <>
      <div
        ref={commentRef}
        className={`group/comment relative flex gap-3 px-4 py-3 rounded-2xl transition-all duration-500 animate-in fade-in ${
          isHighlighted
            ? "bg-indigo-500/20 ring-2 ring-indigo-500 shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)] scale-[1.02]"
            : "bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-white/10"
        }`}
      >
        <img
          src={comment.commentCreator?.photo || avatar}
          alt="comment-user"
          className="w-8 h-8 rounded-xl object-cover ring-1 ring-black/5 bg-slate-200 dark:bg-slate-800 shrink-0"
          onError={(e) => {
            e.target.src = avatar;
          }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-bold text-slate-900 dark:text-slate-200 truncate">
              {comment.commentCreator?.name}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 font-medium shrink-0">
                {formattedCommentDate}
              </span>
              {isOwner && (
                <div className="flex items-center gap-1 opacity-0 group-hover/comment:opacity-100 transition-opacity">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 rounded-full text-slate-400 hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                    title="Edit comment"
                  >
                    <Pencil size={12} strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={() => setIsDeleting(true)}
                    className="p-1 rounded-full text-slate-400 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                    title="Delete comment"
                  >
                    <Trash2 size={12} strokeWidth={2.5} />
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5 whitespace-pre-wrap break-word">
            {comment.content}
          </p>
        </div>
      </div>

      {isEditing && (
        <EditCommentModal
          comment={commentForEdit}
          onClose={() => setIsEditing(false)}
        />
      )}

      {isDeleting && (
        <DeleteCommentModal
          comment={commentForEdit}
          onClose={() => setIsDeleting(false)}
        />
      )}
    </>
  );
};

export default CommentItem;
