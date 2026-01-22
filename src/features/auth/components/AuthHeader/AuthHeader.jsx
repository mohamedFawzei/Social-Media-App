const AuthHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-8 mt-3 text-center lg:text-left">
      <h3 className="text-gray-900 dark:text-white text-3xl lg:text-4xl font-bold transition-colors mb-4">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mt-2 transition-colors">
        {subtitle}
      </p>
    </div>
  );
};

export default AuthHeader;
