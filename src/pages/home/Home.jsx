import { useEffect, useRef } from "react";
import { useHeaderAnimation } from "../../Hooks/useHeaderAnimation";
import MobileHeader from "../../components/navbar/MobileHeader/MobileHeader";
import Feed from "../../features/posts/components/Feed/Feed";
import LeftSidebar from "./Components/LeftSidebar";
import RightSidebar from "./Components/RightSidebar";

const Home = () => {
  const headerRef = useRef(null);
  useHeaderAnimation(headerRef, "mobile");

  useEffect(() => {
    document.title = "Home | Posts";
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] transition-colors duration-500 font-sans selection:bg-indigo-500/30">
      {/* Mobile Header Hidden on Desktop */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 block md:hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800"
      >
        <MobileHeader />
      </header>

      {/* Main Layout */}
      <main className="relative z-10 pt-20 pb-24 lg:pt-24 lg:pb-12 min-h-screen">
        <div className="container mx-auto px-0 sm:px-4 lg:px-6">
          <div className="lg:grid lg:grid-cols-[280px_1fr_280px] xl:grid-cols-[300px_1fr_300px] gap-6 xl:gap-8 items-start justify-center">
            {/* Left Sidebar Desktop Only */}
            <aside className="hidden lg:block sticky top-24 h-[calc(100vh-6rem)]">
              <LeftSidebar />
            </aside>

            {/* Feed */}
            <section className="w-full max-w-xl mx-auto lg:max-w-none">
              <Feed />
            </section>

            {/* Right Sidebar Desktop Only */}
            <aside className="hidden lg:block sticky top-24 h-[calc(100vh-6rem)]">
              <RightSidebar />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
