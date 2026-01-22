import { useMemo } from "react";
import { useUserPosts } from "../../posts/Hooks/UseUserPosts";

export const useProfileData = (user) => {
  const userId = user?._id;

  // 1. Fetch User Posts
  const { data: posts, isLoading } = useUserPosts(userId);
  const allPosts = posts || [];

  // 3.  Media Posts
  const mediaPosts = useMemo(() => {
    return allPosts.filter((post) => post.image);
  }, [allPosts]);

  return {
    posts: allPosts,
    mediaPosts,

    isLoading,
  };
};
