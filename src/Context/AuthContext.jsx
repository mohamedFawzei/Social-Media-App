import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import avatar from "../assets/images/Avatar/AvatarDefault.svg";
import { getUser } from "../features/auth/Api/Auth.api";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      // console.error("failed to parse user from local storage", error);
      return null;
    }
  });

  // logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhoto");
    setUser(null);
  };
  // save user data
  const saveUserData = () => {
    const encodedToken = localStorage.getItem("token");
    // console.log("token exists", !!encodedToken);
    if (encodedToken) {
      try {
        const decoded = jwtDecode(encodedToken);
        // console.log("Decoded token", decoded);
        // Ensure accurate check for expiration
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          logout();
          return;
        } else {
          // userId, id, _id, or a 'user' field
          let userId = decoded.userId || decoded.id || decoded._id;

          if (!userId && decoded.user) {
            if (typeof decoded.user === "string") {
              userId = decoded.user;
            } else {
              userId =
                decoded.user.id || decoded.user._id || decoded.user.userId;
            }
          }

          // console.log("extracted userId", userId);

          if (!userId) {
            // console.error(
            //   "Token structure",
            //   decoded,
            // );
            logout();
            return;
          }

          // Try to get full user object from storage first
          const storedUser = localStorage.getItem("user");
          let parsedUser = null;
          if (storedUser) {
            try {
              parsedUser = JSON.parse(storedUser);
              // console.log("stored user", parsedUser);
            } catch (e) {
              // console.error("Failed to stored user", e);
            }
          }

          const finalUser = {
            ...decoded,
            _id: userId,
            name:
              parsedUser?.name ||
              localStorage.getItem("userName") ||
              decoded.name,
            photo:
              parsedUser?.photo ||
              localStorage.getItem("userPhoto") ||
              decoded.photo,
            email:
              parsedUser?.email ||
              localStorage.getItem("userEmail") ||
              decoded.email,
          };
          // console.log("Final user object set in context", finalUser);
          localStorage.setItem("user", JSON.stringify(finalUser));
          setUser(finalUser);
        }
      } catch (error) {
        // console.error("Failed to decode token", error);
        logout();
      }
    }
  };

  // check user status
  const checkUserStatus = async () => {
    try {
      const res = await getUser();
      if (res.data && res.data.user) {
        setUser((prev) => {
          const newUser = { ...res.data.user };

          localStorage.setItem("user", JSON.stringify(newUser));
          if (newUser.name) localStorage.setItem("userName", newUser.name);
          if (newUser.photo) localStorage.setItem("userPhoto", newUser.photo);
          if (newUser.email) localStorage.setItem("userEmail", newUser.email);

          return newUser;
        });
      }
    } catch (error) {
      //console.error(" check user status", error);
    }
  };

  // init session
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      saveUserData();

      // get id
      try {
        const decoded = jwtDecode(token);
        let userId = decoded.userId || decoded.id || decoded._id;

        if (!userId && decoded.user) {
          if (typeof decoded.user === "string") {
            userId = decoded.user;
          } else if (typeof decoded.user === "object") {
            userId = decoded.user.id || decoded.user._id;
          }
        }

        if (userId) checkUserStatus(userId);
      } catch (e) {
        // console.error("Token decode error in effect", e);
      }
    }
  }, []);

  // login
  const login = (newToken, userData) => {
    //console.log("login called", { newToken, userData });
    localStorage.setItem("token", newToken);
    setToken(newToken);
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      // Also set individual items for legacy/fallback consistency
      if (userData.name) localStorage.setItem("userName", userData.name);
      if (userData.photo) localStorage.setItem("userPhoto", userData.photo);
      if (userData.email) localStorage.setItem("userEmail", userData.email);

      setUser(userData);
    } else {
      saveUserData();
      // If no user data was passed, try to fetch it from API
      // decode token again to get ID, or just call checkUserStatus since token is in localStorage now
      checkUserStatus();
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, user, login, logout, saveUserData, avatar }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
