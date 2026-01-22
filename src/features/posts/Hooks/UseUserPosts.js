import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "../Api/Posts.api";

export const useUserPosts = (userId) => {
  return useQuery({
    queryKey: ["user-posts", userId],
    enabled: !!userId,
    queryFn: () => getUserPosts(userId),
  });
};
