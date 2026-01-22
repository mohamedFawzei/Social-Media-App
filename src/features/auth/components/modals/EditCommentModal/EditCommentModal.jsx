import { useQueryClient } from "@tanstack/react-query";
import { Loader2, X } from "lucide-react";
import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { AuthContext } from "../../../../../Context/AuthContext";
import { updateComment } from "../../../../posts/Api/Posts.api";

const EditCommentModal = ({ comment, onClose }) => {
  const [content, setContent] = useState(comment.content);
  const [isPending, setIsPending] = useState(false);
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsPending(true);
    try {
      await updateComment(comment.postId, comment._id, { content });

      queryClient.invalidateQueries(["userPosts", user._id]);
      queryClient.invalidateQueries(["post", comment.postId]);

      onClose();
    } catch (error) {
      // console.error("Failed to update comment", error);
    } finally {
      setIsPending(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Edit Comment</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[120px] bg-slate-950/50 text-white p-4 rounded-2xl border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none placeholder:text-slate-600 font-medium"
            placeholder="Write your comment..."
            autoFocus
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-slate-300 font-bold hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                isPending || !content.trim() || content === comment.content
              }
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>Save Changes</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default EditCommentModal;
