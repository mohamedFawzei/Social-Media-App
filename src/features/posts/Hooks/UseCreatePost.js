import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../Api/Posts.api";
import { useNavigate } from "react-router-dom";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });

     
      setTimeout(() => navigate("/"), 1500);
    },
  });
};
