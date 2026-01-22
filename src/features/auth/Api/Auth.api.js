import api from "../../../Lib/Axios";

// signin
export const signinApi = (data) => api.post(`/users/signin`, data);

// google signin
export const googleSigninApi = (googleToken) => {
  return api.post(`/users/signin`, { token: googleToken });
};

// signup
export const signupApi = (data) => api.post(`/users/signup`, data);

// upload profile photo
export const uploadProfilePhoto = (formData) =>
  api.put(`/users/upload-photo`, formData);

// change password
export const changePassword = (data) =>
  api.patch(`/users/change-password`, data);

// get user
export const getUser = () => api.get(`/users/profile-data`);
export const getUserProfileFromPosts = (userId) =>
  api.get(`/users/${userId}/posts?limit=1`);

// update user info
export const updateUserInfo = (data) => api.patch(`/users/update-info`, data);
