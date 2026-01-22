import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../../Posts/Api/Posts.api";

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
      toast.success("Post deleted successfully");
    },
  });
};
