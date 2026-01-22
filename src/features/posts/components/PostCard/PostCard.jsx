import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import PostHeader from "../PostHeader/PostHeader";
import PostActions from "../PostActions/PostActions";
import CommentItem from "../comment/CommentItem/CommentItem";
import CommentInput from "../comment/CommentInput/CommentInput";
import CommentModal from "../comment/CommentModal/CommentModal";
import EditPostModal from "../../../auth/components/modals/EditPostModal/EditPostModal";
import DeletePostModal from "../../../auth/components/modals/DeletePostModal/DeletePostModal";

const PostCard = ({ post }) => {
  // console.log(post);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user, body, image, createdAt, comments = [] } = post || {};

  const formattedDate = useMemo(() => {
    if (!createdAt) return "Just Now";
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${month}-${day}-${year} at ${hours}:${minutes} ${ampm}`;
  }, [createdAt]);

  return (
    <div className="post-card mb-5 overflow-visible">
      <div className="bg-slate-100 dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-white/5 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-500 group/card shadow-sm">
        <div className="p-6">
          {/* Header */}
          <PostHeader
            user={user}
            formattedDate={formattedDate}
            postId={post?._id}
            onEditClick={() => setIsEditModalOpen(true)}
            onDeleteClick={() => setIsDeleteModalOpen(true)}
          />

          {/* Body*/}
          <article
            onClick={() => navigate(`/post/${post?._id}`)}
            className="cursor-pointer group/body"
          >
            <p className="text-slate-800 dark:text-slate-200 text-[15px] leading-relaxed mb-5 px-1">
              {body}
            </p>
            {image && (
              <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-white/5 mb-5 shadow-sm bg-slate-200 dark:bg-white/5">
                <img
                  src={image}
                  className="w-full h-auto max-h-125 object-cover"
                  alt="post"
                />
              </div>
            )}
          </article>

          {/* Comments*/}
          <div className="mt-6 space-y-3">
            {comments[0] && (
              <CommentItem comment={comments[0]} postId={post?._id} />
            )}
            <CommentInput postId={post?._id} />
            {comments.length > 1 && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-2 ml-4 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors cursor-pointer"
              >
                View all {comments.length} comments
              </button>
            )}
          </div>

          {/* Actions */}
          <PostActions
            postId={post?._id}
            authorId={user?._id}
            commentsCount={comments.length}
            onCommentClick={() => setIsModalOpen(true)}
            onEditClick={() => setIsEditModalOpen(true)}
            onDeleteClick={() => setIsDeleteModalOpen(true)}
          />
        </div>
        {/* Comment Modal */}
        <CommentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          comments={comments}
          postId={post?._id}
        />
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
          postId={post?._id}
        />
      </div>
    </div>
  );
};

export default PostCard;
