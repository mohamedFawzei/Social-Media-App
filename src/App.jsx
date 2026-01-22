import { RouterProvider } from "react-router-dom";
import { router } from "../router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-200 selection:bg-indigo-500/30 transition-colors duration-300">
      <RouterProvider router={router} />
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;
