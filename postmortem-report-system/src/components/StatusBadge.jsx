const variants = {
  active: "bg-gray-900 text-white",
  inactive: "bg-gray-200 text-gray-600",
  warning: "bg-gray-400 text-white",
  alert: "bg-gray-700 text-white",
};

export default function StatusBadge({ label, variant = "inactive" }) {
  const base =
    "inline-block px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase";
  const v = variants[variant] || variants.inactive;
  return <span className={`${base} ${v}`}>{label}</span>;
}
