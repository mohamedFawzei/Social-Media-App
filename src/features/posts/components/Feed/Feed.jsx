// libs
import { Loader2 } from "lucide-react";
// hooks
import { usePosts } from "../../Hooks/UsePosts";
// components
import PostCard from "../PostCard/PostCard";
import InfiniteScroll from "react-infinite-scroll-component";
import PostSkeleton from "../PostSkeleton/PostSkeleton";
const Feed = () => {
  const { data, fetchNextPage, hasNextPage, status } = usePosts();

  const posts = data?.pages.flatMap((page) => page?.posts || []) || [];

  if (status === "pending") {
    return (
      <div className="flex flex-col gap-10">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  return (
    <div className="feed-container">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={
          <div className="flex flex-col gap-10 mt-10 animate-pulse">
            <PostSkeleton />
            <div className="flex justify-center py-4">
              <Loader2 className="animate-spin text-indigo-500" size={32} />
            </div>
          </div>
        }
        endMessage={
          <div className="text-center p-12 mt-10 border-t border-white/5">
            <p className="text-slate-500 font-bold italic tracking-wider">
              You have seen all the updates!
            </p>
          </div>
        }
        scrollThreshold={0.9}
      >
        <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {posts.map((post, index) => (
            <PostCard key={post._id} post={post} index={index} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Feed;
