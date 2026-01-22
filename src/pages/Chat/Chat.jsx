import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, MoreVertical } from "lucide-react";
import { contacts } from "../../Data/Contacts";
import { useEffect, useRef } from "react";
import { useHeaderAnimation } from "../../Hooks/useHeaderAnimation";

const Chat = () => {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  useHeaderAnimation(headerRef, "mobile");

  useEffect(() => {
    document.title = "Socail App | Messages";
  }, []);

  return (
    <section className="chat min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white pb-20 transition-colors duration-300">
      {/* Header */}
      <div
        ref={headerRef}
        className="fixed md:static top-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 min-h-16 py-3 flex items-center justify-between pt-[calc(env(safe-area-inset-top)+12px)] md:pt-4 md:bg-transparent md:border-none md:mb-6"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors lg:hidden text-slate-600 dark:text-slate-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold lg:text-2xl">Messages</h1>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-1 lg:hidden">
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors text-slate-600 dark:text-slate-300">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors text-slate-600 dark:text-slate-300">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2">
          <button className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/*  mobile Section */}
      <div className="mobileSection pt-28 md:pt-0">
        {/* Active Now */}
        <div className="px-4 py-4">
          <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
            Active Now
          </h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {contacts
              .filter((c) => c.status === "online")
              .map((contact) => (
                <div
                  key={contact.id}
                  className="flex flex-col items-center gap-1 shrink-0"
                >
                  <div className="relative">
                    <img
                      src={contact.img}
                      alt={contact.name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-white dark:ring-slate-800 shadow-sm"
                    />
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-slate-50 dark:border-slate-950 rounded-full"></div>
                  </div>
                  <span className="text-xs text-slate-600 dark:text-slate-300 w-14 truncate text-center font-medium">
                    {contact.name.split(" ")[0]}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Messages List */}
        <div className="px-2">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white dark:hover:bg-white/5 transition-colors active:scale-[0.98] duration-200 cursor-pointer"
            >
              <div className="relative shrink-0">
                <img
                  src={contact.img}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover bg-slate-200 dark:bg-slate-800"
                />
                {contact.status === "online" && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-50 dark:border-slate-950 rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-200 text-[15px]">
                    {contact.name}
                  </h3>
                  <span className="text-xs text-slate-500">{contact.time}</span>
                </div>
                <p
                  className={`text-sm truncate ${contact.status === "online" ? "text-slate-900 dark:text-slate-100 font-medium" : "text-slate-500 dark:text-slate-400"}`}
                >
                  {contact.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Chat;
