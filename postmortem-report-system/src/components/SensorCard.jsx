import StatusBadge from "./StatusBadge";

function badgeVariant(status) {
  if (status === "Online") return "active";
  if (status === "Offline") return "alert";
  if (status === "Degraded") return "warning";
  return "inactive";
}

export default function SensorCard({ name, status }) {
  return (
    <div className="border border-gray-200 rounded p-4 flex items-center justify-between bg-white">
      <span className="text-sm font-medium text-gray-700">{name}</span>
      <StatusBadge label={status} variant={badgeVariant(status)} />
    </div>
  );
}
