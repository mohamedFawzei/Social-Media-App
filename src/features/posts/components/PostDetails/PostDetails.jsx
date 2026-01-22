import { ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { usePostDetails } from "../../Hooks/UsePostDetails";
// components
import CommentInput from "../comment/CommentInput/CommentInput";
import CommentItem from "../comment/CommentItem/CommentItem";
import PostActions from "../PostActions/PostActions";
import PostHeader from "../PostHeader/PostHeader";
import PostSkeleton from "./../PostSkeleton/PostSkeleton";
import EditPostModal from "../../../auth/components/modals/EditPostModal/EditPostModal";
import DeletePostModal from "../../../auth/components/modals/DeletePostModal/DeletePostModal";

const PostDetails = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const highlightCommentId = location.state?.highlightCommentId;

  const { data: post, isLoading } = usePostDetails(postId);

  const [visibleComments, setVisibleComments] = useState(4);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Auto scroll to highlighted comment
  useEffect(() => {
    if (post?.comments && highlightCommentId) {
      const index = post.comments.findIndex(
        (c) => c._id === highlightCommentId,
      );
      if (index >= visibleComments) {
        setVisibleComments(index + 5);
      }
    }
  }, [post?.comments, highlightCommentId]);

  const formattedDate = useMemo(() => {
    if (!post?.createdAt) return "Just Now";
    const date = new Date(post.createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${month}-${day}-${year} at ${hours}:${minutes} ${ampm}`;
  }, [post?.createdAt]);
  if (isLoading)
    return (
      <div className=" flex items-center justify-center min-h-screen">
        <PostSkeleton />
      </div>
    );

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-slate-400">
        <div className="text-xl font-bold mb-2">Post not found</div>
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
        >
          Go Back
        </button>
      </div>
    );
  }

  const comments = post?.comments || [];
  const hasMoreComments = visibleComments < comments.length;

  return (
    <div className="max-w-2xl mx-auto pt-10 pb-20 px-4">
      {/* Back btn*/}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 cursor-pointer transition-colors font-medium"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-white/5 overflow-hidden shadow-xl shadow-slate-200/60 dark:shadow-2xl dark:shadow-black/50 transition-colors duration-300">
        <div className="p-6">
          {/* Header*/}
          <PostHeader
            user={post.user}
            formattedDate={formattedDate}
            postId={post._id}
            onEditClick={() => setIsEditModalOpen(true)}
            onDeleteClick={() => setIsDeleteModalOpen(true)}
          />

          {/* body*/}
          <p className="text-slate-700 dark:text-slate-300 mb-5 leading-relaxed text-[16px]">
            {post.body}
          </p>

          {post.image && (
            <img
              src={post.image}
              className="w-full rounded-4xl mb-5 shadow-lg border border-slate-100 dark:border-white/5"
              alt="post content"
            />
          )}
        </div>

        {/* Actions */}
        <PostActions
          postId={post._id}
          commentsCount={comments.length}
          onCommentClick={() => {
            document
              .querySelector('input[placeholder*="Add a comment"]')
              ?.focus();
          }}
        />

        {/* Comment input*/}
        <div className="p-6 bg-slate-50 dark:bg-white/5 border-t border-b border-slate-100 dark:border-white/5">
          <CommentInput postId={postId} />
        </div>

        {/* comment list*/}
        <div className="p-6 space-y-4 bg-white dark:bg-transparent">
          <h4 className="text-slate-900 dark:text-white font-bold mb-4 px-2 flex items-center gap-2">
            Comments{" "}
            <span className="text-slate-400 font-normal">
              ({comments.length})
            </span>
          </h4>

          {comments.slice(0, visibleComments).map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
              highlight={comment._id === highlightCommentId}
            />
          ))}

          {/* show more comments */}
          {hasMoreComments && (
            <button
              onClick={() => setVisibleComments((prev) => prev + 5)}
              className="w-full py-3 mt-4 text-sm font-bold text-indigo-400 hover:text-indigo-300 hover:bg-white/5 rounded-2xl transition-all cursor-pointer"
            >
              Show more comments ({comments.length - visibleComments} left)
            </button>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <EditPostModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        post={post}
      />
      {/* Delete Modal */}
      <DeletePostModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        postId={post._id}
      />
    </div>
  );
};

export default PostDetails;
