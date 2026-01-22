import { Link } from "react-router-dom";
import GoogleAuth from "../GoogleAuth/GoogleAuth";

const AuthFooter = ({
  text,
  linkText,
  to,
  onGoogleSuccess,
  isLoading,
  isGoogleTop = false,
}) => {
  const LinkContent = (
    <div className="text-center my-4">
      <p className="text-gray-600 dark:text-gray-400 transition-colors">
        {text}{" "}
        <Link
          to={to}
          className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline ml-1"
        >
          {linkText}
        </Link>
      </p>
    </div>
  );

  return (
    <footer>
      {isGoogleTop && (
        <div className="mb-6">
          <GoogleAuth onGoogleSuccess={onGoogleSuccess} isLoading={isLoading} />
        </div>
      )}

      {LinkContent}

      {!isGoogleTop && (
        <div className="mt-2">
          <GoogleAuth onGoogleSuccess={onGoogleSuccess} isLoading={isLoading} />
        </div>
      )}
    </footer>
  );
};

export default AuthFooter;
