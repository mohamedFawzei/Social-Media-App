import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signupApi, googleSigninApi } from "../Api/Auth.api";
import { AuthContext } from "../../../Context/AuthContext";

export function useAuthRegister() {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const createAcc = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await signupApi(data);
      if (res.data.message === "success") {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const loginGoogle = async (googleResponse) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await googleSigninApi(googleResponse.access_token);

      const user = res.data.user;
      const token = res.data.token;

      // Use context login
      login(token, user);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Google Sign-in failed");
    } finally {
      setIsLoading(false);
    }
  };

  return { createAcc, loginGoogle, error, isLoading };
}
