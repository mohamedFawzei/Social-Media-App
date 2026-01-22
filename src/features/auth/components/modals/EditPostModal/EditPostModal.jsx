import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X, Loader2, Sparkles, Image as ImageIcon } from "lucide-react";
import { updatePost } from "../../../../posts/Api/Posts.api";

const EditPostModal = ({ isOpen, onClose, post }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [fileError, setFileError] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    if (post) {
      setContent(post.body || "");
      setCurrentImage(post.image || "");
      setImage(null);
      setFileError("");
    }
  }, [post, isOpen]);

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => updatePost(post._id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
      onClose();
    },
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() && !image && !currentImage) return;

    const formData = new FormData();
    formData.append("body", content);
    if (image) {
      formData.append("image", image);
    } else if (!currentImage) {
      formData.append("removeImage", "true");
    }

    mutate(formData);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-4xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-white/5">
          <div className="flex items-center gap-2 text-indigo-500">
            <Sparkles size={20} />
            <h3 className="font-bold text-lg">Edit Post</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {fileError && (
            <div className="bg-rose-500/10 text-rose-500 p-3 rounded-xl text-sm font-bold flex items-center gap-2">
              <X
                size={14}
                className="cursor-pointer"
                onClick={() => setFileError("")}
              />
              {fileError}
            </div>
          )}

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's changing?"
            className="w-full h-32 bg-slate-50 dark:bg-black/20 p-4 rounded-2xl resize-none outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700 dark:text-slate-200"
            disabled={isPending}
          />

          {/* Current or New Image Preview */}
          {(currentImage || image) && (
            <div className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-black/20">
              <img
                src={image ? URL.createObjectURL(image) : currentImage}
                alt="preview"
                className="w-full h-48 object-cover opacity-80"
              />
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  setCurrentImage("");
                }}
                className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-rose-500 transition-colors"
                title="Remove image"
              >
                <X size={14} />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 text-sm font-bold text-indigo-500 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-500/10 px-3 py-2 rounded-xl transition-colors">
              <ImageIcon size={18} />
              <span>Change Image</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isPending}
              />
            </label>

            <button
              type="submit"
              disabled={
                isPending || (!content.trim() && !image && !currentImage)
              }
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
            >
              {isPending && <Loader2 size={16} className="animate-spin" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default EditPostModal;
