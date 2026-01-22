const AuthBanner = ({
  imgSrc,
  title,
  subtitle,
  description,
  isRightSide = false,
}) => {
  return (
    <header
      className={`relative h-[35vh] w-full lg:h-auto lg:w-1/2 shrink-0 overflow-hidden group 
      ${isRightSide ? "order-1 lg:order-2" : ""}
      `}
    >
      <img
        src={imgSrc}
        alt={subtitle}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-indigo-900/60 mix-blend-multiply dark:bg-black/70 transition-colors duration-300" />

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center z-10 p-10 text-center lg:px-20
        ${isRightSide ? "lg:items-end lg:text-right" : "lg:items-start lg:text-left"}`}
      >
        <h1 className="text-white text-3xl lg:text-5xl font-bold drop-shadow-lg mb-2">
          {title}
        </h1>
        <h2 className="text-indigo-400 text-5xl lg:text-7xl font-extrabold tracking-widest drop-shadow-lg uppercase">
          {subtitle}
        </h2>
        <p
          className={`hidden lg:block text-gray-200 mt-6 text-lg max-w-md leading-relaxed opacity-90 
          ${isRightSide ? "text-end" : "text-start"} `}
        >
          {description}
        </p>
      </div>
    </header>
  );
};

export default AuthBanner;
