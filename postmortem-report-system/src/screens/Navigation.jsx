import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Button from "../components/Button";

const card = "bg-white border border-gray-200 rounded-lg p-5";
const cardTitle =
  "text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4";

const modeDesc = {
  Eco: "Optimized for energy efficiency and smooth deceleration.",
  Normal: "Balanced performance for everyday urban driving.",
  Sport: "Aggressive acceleration and dynamic response.",
};

export default function Navigation() {
  const navigate = useNavigate();
  const { systemActive, startNavigation } = useApp();
  const [destinationInput, setDestinationInput] = useState("");
  const [selectedMode, setSelectedMode] = useState("Normal");

  const canStart = systemActive && destinationInput.trim().length > 0;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900 font-mono">
          Navigation
        </h1>
        <p className="text-sm text-gray-400">
          Plan and start your autonomous route
        </p>
      </header>

      <div className="min-h-56 flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="w-10 h-10 border-2 border-gray-300 rounded mb-3" aria-hidden />
        <p className="text-sm text-gray-400 font-mono">Map View Placeholder</p>
        <p className="text-xs text-gray-300 mt-1">Live map will render here</p>
      </div>

      <div className={card}>
        <h2 className={cardTitle}>Destination</h2>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-mono text-gray-800 focus:outline-none focus:border-gray-500"
          placeholder="Enter destination address..."
          value={destinationInput}
          onChange={(e) => setDestinationInput(e.target.value)}
        />
      </div>

      <div className={card}>
        <h2 className={cardTitle}>Driving Mode</h2>
        <div className="flex flex-wrap gap-2">
          {["Eco", "Normal", "Sport"].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setSelectedMode(m)}
              className={`px-5 py-2 rounded text-sm font-medium transition-colors ${
                selectedMode === m
                  ? "bg-gray-900 text-white"
                  : "border border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">{modeDesc[selectedMode]}</p>
      </div>

      <div className={card}>
        <Button
          label="Start Navigation"
          variant="primary"
          fullWidth
          disabled={!canStart}
          onClick={() => {
            startNavigation(destinationInput.trim(), selectedMode);
            navigate("/");
          }}
        />
        {!systemActive && (
          <p className="text-xs text-gray-400 mt-2">
            ⚠ System must be active before starting navigation.
          </p>
        )}
      </div>
    </div>
  );
}
