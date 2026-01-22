import { Outlet, useLocation } from "react-router-dom";
import DesktopNavbar from "../../components/navbar/DesktopNavbar/DesktopNavbar";
import MobileNavbar from "../../components/navbar/MobileNavbar/MobileNavbar";

const MainLayout = () => {
  const location = useLocation();
  const isChatPage = location.pathname === "/chat";
  const isCreatePost = location.pathname === "/create-post";
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <DesktopNavbar />
      </div>

      {/* Main Content */}
      <main
        className={`${isChatPage ? "pt-0 pb-0 md:pt-17" : "pt-0 pb-24 md:pb-8"} ${isCreatePost ? "pt-2 md:pt-15" : " "} w-full`}
      >
        <Outlet />
      </main>

      {/* Mobile Navbar */}
      <div className="md:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
};

export default MainLayout;
