import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Button from "../components/Button";
import StatusBadge from "../components/StatusBadge";

const card = "bg-white border border-gray-200 rounded-lg p-5";
const cardTitle =
  "text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4";

export default function Alert() {
  const navigate = useNavigate();
  const { alertActive, obstacle, emergencyStop, recalculateRoute } = useApp();

  if (!alertActive) {
    return (
      <div className="p-6 max-w-2xl mx-auto space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-gray-900 font-mono">
            Alert Monitor
          </h1>
          <p className="text-sm text-gray-400">
            Obstacle detection and system response
          </p>
        </header>

        <div className={`${card} text-center py-12`}>
          <p className="text-4xl font-mono text-gray-300 mb-4" aria-hidden>
            —
          </p>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            No Active Alerts
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            System is operating normally. No obstacles detected.
          </p>
          <Button
            label="Back to Dashboard"
            variant="outline"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900 font-mono">
          Alert Monitor
        </h1>
        <p className="text-sm text-gray-400">
          Obstacle detection and system response
        </p>
      </header>

      <div className="bg-gray-900 text-white rounded-lg p-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-bold font-mono">⚠ OBSTACLE DETECTED</p>
          <p className="text-sm text-gray-300 mt-1">
            Immediate system response has been initiated.
          </p>
        </div>
        <StatusBadge label={obstacle.riskLevel} variant="alert" />
      </div>

      <div className={card}>
        <h2 className={cardTitle}>Obstacle Details</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            ["Type", obstacle.type],
            ["Distance", obstacle.distance],
            ["Risk Level", obstacle.riskLevel],
          ].map(([lab, val]) => (
            <div key={lab}>
              <p className="text-xs text-gray-400 uppercase">{lab}</p>
              <p className="text-sm font-mono font-semibold text-gray-800">
                {val}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={card}>
        <h2 className={cardTitle}>System Response</h2>
        <p className="text-3xl font-bold font-mono text-gray-900 text-center py-4">
          {obstacle.response}
        </p>
        <div className="w-full h-1 bg-gray-200 rounded overflow-hidden">
          <div className="w-3/4 h-full bg-gray-700 rounded" />
        </div>
      </div>

      <div className={card}>
        <h2 className={cardTitle}>Actions</h2>
        <div className="flex flex-col gap-3">
          <Button
            label="Emergency Stop"
            variant="danger"
            fullWidth
            onClick={() => {
              emergencyStop();
              navigate("/");
            }}
          />
          <Button
            label="Recalculate Route"
            variant="outline"
            fullWidth
            onClick={() => {
              recalculateRoute();
              navigate("/navigation");
            }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Emergency stop will halt all vehicle operations immediately.
        </p>
      </div>
    </div>
  );
}
