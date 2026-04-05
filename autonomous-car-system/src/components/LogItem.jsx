const typeStyles = {
  INFO: "bg-gray-100 text-gray-600",
  ALERT: "bg-gray-800 text-white",
  NAV: "bg-gray-400 text-white",
  SYSTEM: "bg-gray-600 text-white",
};

export default function LogItem({ log }) {
  const tagClass =
    typeStyles[log.type] || "bg-gray-200 text-gray-700";
  return (
    <div className="flex items-start gap-3 py-2 border-b border-gray-100 text-sm">
      <span className="text-gray-400 text-xs font-mono whitespace-nowrap">
        {log.timestamp}
      </span>
      <span
        className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${tagClass}`}
      >
        {log.type}
      </span>
      <span className="text-gray-700 flex-1">{log.message}</span>
    </div>
  );
}
