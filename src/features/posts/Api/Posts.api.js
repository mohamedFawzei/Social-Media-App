import api from "../../../Lib/Axios";

// get all posts
export const getAllPosts = async (page = 1, limit = 10) => {
  try {
    const { data } = await api.get("/posts", {
      params: {
        page,
        limit,
        sort: "-createdAt",
      },
    });

    return data;
  } catch (error) {
    // console.error("Failed to fetch", error);

    throw error;
  }
};

// get single post
export const getSinglePost = async (postId) => {
  const { data } = await api.get(`/posts/${postId}`);
  return data.post;
};

// get user posts
export const getUserPosts = async (userId) => {
  const { data } = await api.get(`/users/${userId}/posts`);
  return data.posts;
};

// create post
export const createPost = async (postData) => {
  const { data } = await api.post("/posts", postData);
  return data;
};
// delete post
export const deletePost = async (postId) => {
  const { data } = await api.delete(`/posts/${postId}`);
  return data;
};

// update post
export const updatePost = async (postId, postData) => {
  const { data } = await api.put(`/posts/${postId}`, postData);
  return data;
};

// add comment
export const addComment = async (postData) => {
  const { data } = await api.post(`/comments`, postData);
  return data;
};

// delete comment
export const deleteComment = async (postId, commentId) => {
  const { data } = await api.delete(`/posts/${postId}/comments/${commentId}`);
  return data;
};

// update comment
export const updateComment = async (postId, commentId, commentData) => {
  const { data } = await api.put(
    `/posts/${postId}/comments/${commentId}`,
    commentData,
  );
  return data;
};
