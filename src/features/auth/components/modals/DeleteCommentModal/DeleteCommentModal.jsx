import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash2 } from "lucide-react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { deleteComment } from "../../../../posts/Api/Posts.api";

const DeleteCommentModal = ({ onClose, comment }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteComment(comment.postId, comment._id),
    onSuccess: () => {
      toast.success("Comment deleted");
      // Update the cache
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
      onClose();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete comment");
    },
  });

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 999999 }}
    >
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 text-center">
          <div className="w-14 h-14 bg-rose-100 dark:bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-500">
            <Trash2 size={26} />
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Delete Comment?
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 px-4">
            Are you sure you want to delete this comment? This action cannot be
            undone.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm"
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              onClick={() => mutate()}
              className="flex-1 py-2.5 px-4 bg-rose-500 text-white font-bold rounded-xl hover:bg-rose-600 transition-colors flex items-center justify-center gap-2 text-sm"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default DeleteCommentModal;
