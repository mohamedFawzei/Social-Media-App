import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPosts } from "../Api/Posts.api";

export const usePosts = () => {
  return useInfiniteQuery({
    queryKey: ["posts", "infinite"],
    initialPageParam: 1,

    queryFn: ({ pageParam }) => getAllPosts(pageParam),

    getNextPageParam: (lastPage) => {
      const pageInfo = lastPage?.paginationInfo;

      if (!pageInfo) return undefined;

      return pageInfo.currentPage < pageInfo.numberOfPages
        ? pageInfo.currentPage + 1
        : undefined;
    },

    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
