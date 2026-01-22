import { useState, useContext } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../../../../Lib/Axios";
import { AuthContext } from "../../../../../Context/AuthContext";

const CommentInput = ({ postId }) => {
  const [commentText, setCommentText] = useState("");
  const [status, setStatus] = useState(null);
  const { user, avatar } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { mutate: addComment, isPending } = useMutation({
    mutationFn: (newComment) => api.post("/comments", newComment),
    onSuccess: (data, variables) => {
      setStatus("success");
      setCommentText("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      // Save for Profile 
      try {
        const newLocalComment = {
          _id: Date.now().toString(), 
          content: variables.content,
          createdAt: new Date().toISOString(),
          user: user,
          postId: postId,
          source: "local",
        };
        const existing = JSON.parse(
          localStorage.getItem("user_comments") || "[]",
        );
        localStorage.setItem(
          "user_comments",
          JSON.stringify([newLocalComment, ...existing]),
        );
      } catch (e) {
        // console.error("Failed to save comment locally", e);
      }

      setTimeout(() => setStatus(null), 2500);
    },
    onError: () => {
      setStatus("error");
      setTimeout(() => setStatus(null), 3000);
    },
  });

  const handleSend = () => {
    if (!commentText.trim() || isPending) return;
    addComment({ content: commentText, post: postId });
  };

  return (
    <div className="relative w-full">
      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: -45, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`absolute left-0 right-0 mx-auto w-fit px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 font-bold text-white text-xs z-50 ${
              status === "success" ? "bg-emerald-500" : "bg-rose-500"
            }`}
          >
            {status === "success" ? (
              <CheckCircle2 size={14} />
            ) : (
              <AlertCircle size={14} />
            )}
            {status === "success" ? "Comment Added!" : "Failed to Sent!"}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3 bg-slate-100 dark:bg-white/10 p-2 rounded-2xl focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all w-full">
        <img
          src={user?.photo || avatar}
          className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-white/10"
          alt="profile"
        />
        <div className="relative flex-1">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isPending}
            placeholder={isPending ? "Posting..." : "Add a comment..."}
            className="w-full bg-transparent border-none outline-none text-sm text-slate-900 dark:text-slate-100 px-2"
          />
          <button
            onClick={handleSend}
            disabled={isPending || !commentText.trim()}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-indigo-500 p-1.5"
          >
            {isPending ? (
              <div className="w-4 h-4 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
            ) : (
              <Send
                size={18}
                className="hover:rotate-45 duration-300 cursor-pointer"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
