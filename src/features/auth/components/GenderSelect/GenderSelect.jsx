const GenderSelect = ({ register, error }) => {
  return (
    <div>
      <span className="text-gray-700 dark:text-gray-300 text-sm font-medium ml-1">
        Gender
      </span>
      <div className="flex gap-4 mt-2">
        {["male", "female"].map((g) => (
          <label key={g} className="cursor-pointer flex-1 group">
            <input
              type="radio"
              value={g}
              {...register("gender", { required: "Please select a gender" })}
              className="hidden peer"
            />
            <div
              className={`
                w-full py-3.5 text-center border-2 rounded-xl capitalize font-medium transition-all duration-200
                ${
                  error
                    ? "border-red-300 bg-red-50 text-red-500 dark:bg-red-900/10 dark:border-red-800"
                    : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-indigo-300 dark:hover:border-indigo-500"
                }
                peer-checked:bg-indigo-600 peer-checked:text-white peer-checked:border-indigo-600 peer-checked:shadow-lg
              `}
            >
              {g}
            </div>
          </label>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-xs mt-1.5 font-medium ml-1 flex items-center gap-1 animate-fadeIn">
          <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default GenderSelect;
