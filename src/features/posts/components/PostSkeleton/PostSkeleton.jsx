const PostSkeleton = () => (
  <div className="dark:bg-slate-700 bg-slate-300 p-4 rounded-lg shadow-md w-full max-w-lg mx-auto mb-10 animate-pulse">
    {/* Header */}
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 dark:bg-slate-500 bg-slate-200 rounded-full"></div>
      <div className="flex-1">
        <div className="h-3 dark:bg-slate-500 bg-slate-200 rounded w-1/3 mb-2"></div>
        <div className="h-2 dark:bg-slate-500 bg-slate-200 rounded w-1/4"></div>
      </div>
    </div>
    {/* Post Image Area */}
    <div className="h-60 dark:bg-slate-500 bg-slate-200 rounded-lg mb-4"></div>
    {/* Content Lines */}
    <div className="h-3 dark:bg-slate-500 bg-slate-200 rounded w-full mb-2"></div>
    <div className="h-3 dark:bg-slate-500 bg-slate-200 rounded w-4/5"></div>
  </div>
);

export default PostSkeleton;
