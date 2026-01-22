import { useGoogleLogin } from "@react-oauth/google";

const GoogleAuth = ({ onGoogleSuccess, isLoading }) => {
  // --- Google Login Handler ---
  const loginWithGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => {
      // console.log(codeResponse);
      if (onGoogleSuccess) {
        onGoogleSuccess(codeResponse);
      }
    },
    // onError: (error) => console.log("Google Login Failed:", error),
  });

  return (
    <div className="mt-8 text-center mb-3">
      {/* Title */}
      <p className="text-gray-500 dark:text-gray-400 mb-5 text-sm font-medium tracking-wide">
        OR LOG IN BY
      </p>

      {/* Buttons Container */}
      <div className="flex justify-center gap-6">
        {/* --- Google Button --- */}
        <button
          type="button"
          onClick={() => loginWithGoogle()}
          disabled={isLoading}
          className="group w-14 h-14 cursor-pointer rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700  
                     flex items-center justify-center transition-all duration-300 
                     hover:scale-110 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-900"
        >
          <i className="fa-brands fa-google  text-blue-600 text-xl transition-transform group-hover:rotate-12"></i>
        </button>

        {/* --- Facebook Button --- */}
        <button
          type="button"
          disabled={isLoading}
          className="group w-14 h-14 cursor-pointer rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700  
                     flex items-center justify-center transition-all duration-300 
                     hover:scale-110 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-900"
        >
          <i className="fa-brands fa-facebook-f text-blue-600 text-xl transition-transform group-hover:rotate-12"></i>
        </button>
      </div>
    </div>
  );
};

export default GoogleAuth;
