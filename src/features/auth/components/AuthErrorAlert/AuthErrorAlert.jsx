const AuthErrorAlert = ({ error, title = "Error" }) => {
  if (!error) return null;

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-3 animate-shake mb-6">
      <i className="fa-solid fa-triangle-exclamation text-red-500 text-xl"></i>
      <div>
        <h4 className="text-red-700 dark:text-red-400 font-bold text-sm">
          {title}
        </h4>
        <p className="text-red-600 dark:text-red-300 text-sm">{error}</p>
      </div>
    </div>
  );
};

export default AuthErrorAlert;
