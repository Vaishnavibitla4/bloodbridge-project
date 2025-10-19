
export const Card = ({ children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
    {children}
  </div>
);

export const CardContent = ({ children }) => <div>{children}</div>;

export const Button = ({ children, className = "", variant, size, ...props }) => {
  let base =
    "rounded-lg flex items-center gap-2 transition font-medium " +
    (size === "sm" ? "px-2 py-1 text-sm" : "px-4 py-2");
  let styles =
    variant === "destructive"
      ? "bg-red-500 hover:bg-red-600 text-white"
      : variant === "outline"
      ? "border border-gray-400 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
      : "bg-blue-500 hover:bg-blue-600 text-white";

  return (
    <button {...props} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
};
