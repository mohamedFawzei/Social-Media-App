import { useMemo, useState } from "react";
import { Heart } from "lucide-react";

const FakeLikes = ({ postId, initialCommentsCount }) => {
  // --- Fake Likes ---
  const initialFakeLikes = useMemo(() => {
    if (!postId) return 0;
    const seed = postId.charCodeAt(postId.length - 1);
    return seed * 3 + (initialCommentsCount || 0);
  }, [postId, initialCommentsCount]);

  const [likesCount, setLikesCount] = useState(initialFakeLikes);
  const [isLikedLocally, setIsLikedLocally] = useState(false);

  const handleLikeToggle = (e) => {
    e.stopPropagation();
    if (isLikedLocally) {
      setLikesCount((prev) => prev - 1);
      setIsLikedLocally(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setIsLikedLocally(true);
    }
  };

  return (
    <button
      onClick={handleLikeToggle}
      className={`group cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:bg-rose-500/10 active:scale-95 ${
        isLikedLocally ? "text-rose-500" : "text-slate-500"
      }`}
    >
      <Heart
        size={20}
        className={`transition-all duration-300  ${
          isLikedLocally
            ? "fill-rose-500 scale-110"
            : "group-hover:fill-rose-500 group-hover:scale-110"
        }`}
      />
      <span className="text-sm font-bold">{likesCount}</span>
    </button>
  );
};

export default FakeLikes;
