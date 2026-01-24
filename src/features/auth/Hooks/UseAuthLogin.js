import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import { googleSigninApi, signinApi } from "../Api/Auth.api";

export function useAuthLogin() {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = async (responseData) => {
  //console.log("login response", responseData);

    const token = responseData.token;
    let user =
      responseData.user || responseData.data?.user || responseData.result;

    // extract user
    if (!user && responseData.data && !responseData.data.user) {
      user = responseData.data;
    }

    // save token
    const userToStore = user
      ? {
          name: user.name,
          photo: user.photo,
          email: user.email,
          _id: user._id || user.id,
          ...user,
        }
      : null;

    login(token, userToStore);

    if (!userToStore) {
      console.warn("No user object in response");
    }

    // navigate
    navigate("/home");
  };

  const loginAcc = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await signinApi(formData);

      await handleSuccess(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  const loginGoogle = async (googleResponse) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await googleSigninApi(googleResponse.access_token);
      await handleSuccess(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Google Sign-in failed");
    } finally {
      setIsLoading(false);
    }
  };

  return { loginAcc, loginGoogle, error, isLoading };
}
