import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "../Api/Posts.api";

export const usePostDetails = (postId) => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => getSinglePost(postId),
    enabled: !!postId,
  });
};
