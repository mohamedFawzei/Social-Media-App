import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import PageLoader from "./src/components/Ui/PageLoader";

// layouts & pages
import MainLayout from "./src/layouts/MainLayout/MainLayout";
const CreatePost = lazy(() => import("./src/pages/CreatePost/CreatePost"));
const Home = lazy(() => import("./src/pages/home/Home"));
const Login = lazy(() => import("./src/pages/Login/Login"));
const NotFound = lazy(() => import("./src/pages/NotFound/NotFound"));
const Profile = lazy(() => import("./src/pages/Profile/Profile"));
const Register = lazy(() => import("./src/pages/Register/Register"));
const Chat = lazy(() => import("./src/pages/Chat/Chat"));

// guards & redirects
import GuestRoute from "./src/components/Guards/GuestRoute";
import ProtectedRoute from "./src/components/Guards/ProtectedRoute";
import RootRedirect from "./src/components/Redirects/RootRedirect";
import PostDetails from "./src/features/posts/components/PostDetails/PostDetails";

// routes
export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: (
      <Suspense fallback={<PageLoader />}>
        <NotFound />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <RootRedirect />,
      },
      {
        element: <GuestRoute />,
        children: [
          {
            path: "login",
            element: (
              <Suspense fallback={<PageLoader />}>
                <Login />
              </Suspense>
            ),
          },
          {
            path: "register",
            element: (
              <Suspense fallback={<PageLoader />}>
                <Register />
              </Suspense>
            ),
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <MainLayout />,
            children: [
              {
                path: "home",
                element: (
                  <Suspense fallback={<PageLoader />}>
                    <Home />
                  </Suspense>
                ),
              },
              {
                path: "profile",
                element: (
                  <Suspense fallback={<PageLoader />}>
                    <Profile />
                  </Suspense>
                ),
              },
              {
                path: "create-post",
                element: (
                  <Suspense fallback={<PageLoader />}>
                    <CreatePost />
                  </Suspense>
                ),
              },
              {
                path: "post/:postId",
                element: (
                  <Suspense fallback={<PageLoader />}>
                    <PostDetails />
                  </Suspense>
                ),
              },
              {
                path: "chat",
                element: (
                  <Suspense fallback={<PageLoader />}>
                    <Chat />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
]);
