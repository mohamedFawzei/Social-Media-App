import { useEffect, useState } from "react";
import { useCreatePost } from "../../features/posts/Hooks/UseCreatePost";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Image as ImageIcon,
  Send,
  X,
  Loader2,
  Sparkles,
  AlertCircle,
} from "lucide-react";

const CreatePost = () => {
  useEffect(() => {
    document.title = "Socail App | Add Post";
  }, []);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [fileError, setFileError] = useState("");

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending } = useCreatePost();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFileError("");

    if (file) {
      const maxSizeInBytes = 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        setFileError("Image is too large! Max size is 1MB.");
        setImage(null);
        e.target.value = null; 
        return;
      }
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fileError || !content.trim()) return;

    const formData = new FormData();
    formData.append("body", content);
    if (image) {
      formData.append("image", image);
    }

    mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["userPosts"]);
        navigate("/home");
      },
      onError: (error) => {
        if (error.response?.status === 413) {
          setFileError("Server rejected the image size. Try a smaller one.");
        }
      },
    });
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 pb-24 bg-slate-50 dark:bg-[#0f172a] transition-colors duration-300 overflow-x-hidden">
      <div className="w-full max-w-2xl relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 md:-top-20 md:-left-20 md:w-64 md:h-64 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 md:-bottom-20 md:-right-20 md:w-64 md:h-64 bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-700" />

        <div className="relative bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl rounded-3xl border border-slate-200 dark:border-white/10 p-6 md:p-10 shadow-2xl overflow-hidden transition-colors">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3.5 bg-linear-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl border border-indigo-100 dark:border-white/5">
              <Sparkles
                className="text-indigo-600 dark:text-indigo-400"
                size={24}
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Create New Post
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                Share your thoughts with the world
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {fileError && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-3">
                  <AlertCircle size={20} />
                  <span className="font-bold text-sm">{fileError}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFileError("")}
                  className="p-1 hover:bg-rose-500/20 rounded-full transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind today?"
              className="w-full min-h-[200px] bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-white p-6 rounded-3xl border border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium text-lg leading-relaxed"
              disabled={isPending}
            />

            {image && (
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 group">
                <img
                  src={URL.createObjectURL(image)}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="preview"
                />
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-rose-500 backdrop-blur-md p-2.5 rounded-full text-white transition-all transform hover:scale-110 cursor-pointer border border-white/10"
                >
                  <X size={20} />
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-200 dark:border-white/10">
              <label
                className={`flex items-center gap-3 text-slate-600 dark:text-slate-300 cursor-pointer px-4 py-3 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-slate-200 dark:hover:border-white/5 ${isPending ? "opacity-50 pointer-events-none" : ""}`}
              >
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-400">
                  <ImageIcon size={20} />
                </div>
                <span className="font-semibold text-sm">Add Photo</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  disabled={isPending}
                  onChange={handleImageChange}
                />
              </label>

              <button
                disabled={!content.trim() || isPending || !!fileError}
                className="w-full sm:w-auto px-8 py-3.5 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 transform active:scale-95 duration-200"
              >
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <span>Publish Post</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
