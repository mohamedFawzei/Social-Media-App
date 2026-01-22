import { useEffect, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { AuthContext } from "../../../../../Context/AuthContext";
import CommentInput from "../CommentInput/CommentInput";
import CommentItem from "../CommentItem/CommentItem";

const CommentModal = ({ isOpen, onClose, comments = [], postId }) => {
  const [visibleCount, setVisibleCount] = useState(10);
  const { avatar } = useContext(AuthContext);

  // Prevents the background from scrolling when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // reset state
  const handleClose = () => {
    setVisibleCount(10);
    onClose();
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-9999 touch-none"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-10000 bg-white dark:bg-slate-900 flex flex-col shadow-2xl overflow-hidden md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-full md:max-w-2xl md:bottom-5 md:rounded-[2.5rem] max-h-[85vh]"
          >
            {/* mobile UI */}
            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mt-4 mb-1 shrink-0" />

            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between shrink-0 cursor-default">
              <div className="w-10"></div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white text-center ">
                Comments{" "}
                <span className="text-slate-400 font-medium text-sm">
                  ({comments.length})
                </span>
              </h3>
              <button onClick={handleClose} className="p-2  ">
                <X
                  size={20}
                  className="text-slate-500 dark:text-slate-400 cursor-pointer hover:text-slate-700 dark:hover:text-slate-50 duration-300 transition-colors"
                />
              </button>
            </div>

            {/* Scrollable Comments  */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 overscroll-contain custom-scrollbar ">
              {comments.length > 0 ? (
                <>
                  {comments.slice(0, visibleCount).map((comment) => (
                    <CommentItem
                      key={comment._id}
                      comment={comment}
                      postId={postId}
                    />
                  ))}

                  {/* Load More  */}
                  {visibleCount < comments.length && (
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 10)}
                      className="w-full py-4 flex items-center justify-center gap-2 text-indigo-500 font-bold text-sm hover:bg-indigo-500/5 rounded-2xl transition-all cursor-pointer"
                    >
                      <ChevronDown size={18} />
                      Show more ({comments.length - visibleCount})
                    </button>
                  )}
                </>
              ) : (
                <div className="text-center py-20 text-slate-400">
                  No comments yet. Be the first to join!
                </div>
              )}
            </div>

            {/* Input Section */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/5 safe-area-bottom shrink-0">
              <CommentInput
                postId={postId}
                onCommentAdded={() => {
                  // console.log("Comment added ");
                }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default CommentModal;
