import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const FloatingInput = ({
  type = "text",
  name,
  placeholder,
  register,
  error,
  label,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full mb-4 relative">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block ml-1">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          onClick={(e) => {
            if (type === "date") e.currentTarget.showPicker();
          }}
          {...register(name)}
          {...props}
          className={`
            w-full px-5 py-4 rounded-xl border-2 outline-none transition-all duration-300
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            bg-gray-50 dark:bg-gray-800 
            text-gray-900 dark:text-white
            
            /* Date Specific Styling */
            ${type === "date" ? "cursor-pointer min-h-[58px]" : ""}
            
            /* Dark Mode Support for Native Date Picker */
            dark:scheme-dark
            [&::-webkit-calendar-picker-indicator]:cursor-pointer
            [&::-webkit-calendar-picker-indicator]:opacity-60
            dark:[&::-webkit-calendar-picker-indicator]:invert

            ${
              error
                ? "border-red-500 focus:border-red-500 bg-red-50 dark:bg-red-900/10 pr-10"
                : "border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400"
            }
          `}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-5 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors cursor-pointer"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}

        {type === "date" && !error && (
          <div className="absolute top-1/2 right-5 -translate-y-1/2 text-gray-400 pointer-events-none">
            <i className="fa-regular fa-calendar"></i>
          </div>
        )}

        {error && type !== "password" && (
          <div className="absolute top-1/2 right-5 -translate-y-1/2 text-red-500 animate-pulse">
            <i className="fa-solid fa-circle-exclamation"></i>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-1.5 font-medium ml-2 flex items-center gap-1 animate-fadeIn">
          <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FloatingInput;
