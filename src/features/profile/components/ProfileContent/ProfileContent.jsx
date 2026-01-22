import { Camera, FileText } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import PostCard from "../../../posts/components/PostCard/PostCard";
import PostSkeleton from "../../../posts/components/PostSkeleton/PostSkeleton";

const ProfileContent = ({ activeTab, posts, isLoading, mediaPosts }) => {
  const navigate = useNavigate();

  // Loading State
  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 mt-8">
        <PostSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 min-h-[300px]">
      {/* 1. POSTS TAB */}
      {activeTab === "posts" && (
        <InfiniteScroll
          dataLength={posts.length}
          next={() => {}}
          hasMore={false}
          loader={
            <div className="mt-8">
              <PostSkeleton />
            </div>
          }
          endMessage={
            posts.length > 0 && (
              <div className="py-12 flex flex-col items-center justify-center text-center opacity-50">
                <div className="w-16 h-1 bg-linear-to-r from-transparent via-slate-500 to-transparent rounded-full mb-4"></div>
                <p className="text-slate-400 font-medium text-sm">
                  You've reached the end
                </p>
              </div>
            )
          }
        >
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
            {posts.length === 0 && <EmptyState type="posts" />}
          </div>
        </InfiniteScroll>
      )}

      {/* 2. MEDIA TAB */}
      {activeTab === "media" && (
        <div className="animate-in fade-in zoom-in-95 duration-300">
          {mediaPosts.length > 0 ? (
            <div className="grid grid-cols-3 gap-1 md:gap-4">
              {mediaPosts.map((post) => (
                <div
                  key={post._id}
                  className="relative group cursor-pointer aspect-square overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800"
                  onClick={() => navigate(`/post/${post._id}`)}
                >
                  <img
                    src={post.image}
                    alt="Media content"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"></div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState type="media" />
          )}
        </div>
      )}
    </div>
  );
};


const EmptyState = ({ type }) => {
  const content = {
    posts: {
      icon: <FileText size={40} className="text-slate-400" />,
      title: "No posts yet",
      desc: "Share your first moment!",
    },
    media: {
      icon: <Camera size={40} className="text-slate-400" />,
      title: "No media yet",
      desc: "Photos appear here.",
    },
  };
  const { icon, title, desc } = content[type];

  return (
    <div className="text-center py-20 bg-white/50 dark:bg-slate-800/30 rounded-[2.5rem] border border-dashed border-slate-300 dark:border-white/5 backdrop-blur-sm transition-colors">
      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200 dark:border-white/5 text-2xl transition-colors">
        {icon}
      </div>
      <p className="text-slate-900 dark:text-slate-400 font-bold text-lg mb-2 transition-colors">
        {title}
      </p>
      <p className="text-slate-500 text-sm max-w-xs mx-auto">{desc}</p>
    </div>
  );
};

export default ProfileContent;
