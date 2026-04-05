import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Button from "../components/Button";
import StatusBadge from "../components/StatusBadge";
import SensorCard from "../components/SensorCard";

const card = "bg-white border border-gray-200 rounded-lg p-5";
const cardTitle =
  "text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4";

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    systemActive,
    speed,
    sensors,
    decisionStatus,
    controlStatus,
    startSystem,
    stopSystem,
    triggerAlert,
  } = useApp();

  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900 font-mono">
          Dashboard
        </h1>
        <p className="text-sm text-gray-400">Real-time system overview</p>
      </header>

      <div className={`${card} p-0 overflow-hidden`}>
        <div className="grid grid-cols-3 divide-x divide-gray-200">
          <div className="px-6 py-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
              System Status
            </p>
            <StatusBadge
              label={systemActive ? "Active" : "Idle"}
              variant={systemActive ? "active" : "inactive"}
            />
          </div>
          <div className="px-6 py-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
              Speed
            </p>
            <p className="text-xl font-mono font-bold text-gray-900">
              {speed} km/h
            </p>
          </div>
          <div className="px-6 py-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
              Decision
            </p>
            <StatusBadge
              label={decisionStatus}
              variant={decisionStatus === "Moving" ? "active" : "inactive"}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={card}>
          <h2 className={cardTitle}>Control Status</h2>
          <div className="space-y-0">
            {[
              ["Steering", controlStatus.steering],
              ["Acceleration", controlStatus.acceleration],
              ["Brake", controlStatus.brake],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between items-center py-2 border-b border-gray-100"
              >
                <span className="text-sm text-gray-500">{k}</span>
                <span className="text-sm font-medium text-gray-800 font-mono">
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={card}>
          <h2 className={cardTitle}>Sensor Status</h2>
          <div className="space-y-3">
            <SensorCard name="Camera" status={sensors.camera} />
            <SensorCard name="LiDAR" status={sensors.lidar} />
            <SensorCard name="Radar" status={sensors.radar} />
          </div>
        </div>
      </div>

      <div className={card}>
        <h2 className={cardTitle}>System Controls</h2>
        <div className="flex gap-3 flex-wrap">
          <Button
            label="Start System"
            variant="primary"
            disabled={systemActive}
            onClick={startSystem}
          />
          <Button
            label="Stop System"
            variant="outline"
            disabled={!systemActive}
            onClick={stopSystem}
          />
        </div>
        <div className="mt-4">
          <Button
            label="Simulate Obstacle Alert"
            variant="ghost"
            onClick={() => {
              triggerAlert();
              navigate("/alert");
            }}
          />
          <p className="text-xs text-gray-400 mt-2">
            Simulates an obstacle detection event and triggers the alert screen.
          </p>
        </div>
      </div>
    </div>
  );
}
