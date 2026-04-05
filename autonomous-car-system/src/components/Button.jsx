const variants = {
  primary: "bg-gray-900 text-white hover:bg-gray-700",
  danger: "bg-gray-800 text-white border border-gray-500 hover:bg-gray-600",
  outline: "border border-gray-900 text-gray-900 hover:bg-gray-100",
  ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
};

export default function Button({
  label,
  onClick,
  variant = "primary",
  disabled = false,
  fullWidth = false,
}) {
  const base =
    "px-4 py-2 rounded text-sm font-medium transition-colors duration-150";
  const v = variants[variant] || variants.primary;
  const dis = disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : "";
  const w = fullWidth ? "w-full" : "";
  return (
    <button
      type="button"
      className={`${base} ${v} ${dis} ${w}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
