import { createContext, useContext, useState, useCallback } from "react";

const AppContext = createContext(null);

const initialObstacle = {
  type: "Pedestrian",
  distance: "12m",
  riskLevel: "High",
  response: "Braking",
};

export function AppProvider({ children }) {
  const [systemActive, setSystemActive] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [sensors] = useState({
    camera: "Online",
    lidar: "Online",
    radar: "Online",
  });
  const [decisionStatus, setDecisionStatus] = useState("Stopped");
  const [controlStatus, setControlStatus] = useState({
    steering: "Neutral",
    acceleration: "None",
    brake: "None",
  });
  const [destination, setDestination] = useState("");
  const [drivingMode, setDrivingMode] = useState("Normal");
  const [navigationActive, setNavigationActive] = useState(false);
  const [alertActive, setAlertActive] = useState(false);
  const [obstacle, setObstacle] = useState(initialObstacle);
  const [logs, setLogs] = useState([]);

  const addLog = useCallback((type, message) => {
    setLogs((prev) => [
      ...prev,
      {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        type,
        message,
      },
    ]);
  }, []);

  const startSystem = useCallback(() => {
    setSystemActive(true);
    setSpeed(40);
    setDecisionStatus("Moving");
    setControlStatus({
      steering: "Neutral",
      acceleration: "Accelerating",
      brake: "None",
    });
    addLog("INFO", "System activated. Vehicle is now moving.");
  }, [addLog]);

  const stopSystem = useCallback(() => {
    setSystemActive(false);
    setSpeed(0);
    setDecisionStatus("Stopped");
    setControlStatus({
      steering: "Neutral",
      acceleration: "None",
      brake: "None",
    });
    setNavigationActive(false);
    addLog("INFO", "System deactivated. Vehicle stopped.");
  }, [addLog]);

  const startNavigation = useCallback(
    (dest, mode) => {
      setNavigationActive(true);
      setDestination(dest);
      setDrivingMode(mode);
      addLog(
        "NAV",
        "Navigation started to: " + dest + " | Mode: " + mode
      );
    },
    [addLog]
  );

  const triggerAlert = useCallback(() => {
    setAlertActive(true);
    setObstacle({ ...initialObstacle });
    setControlStatus((prev) => ({
      ...prev,
      brake: "Braking",
    }));
    addLog(
      "ALERT",
      "Obstacle detected: Pedestrian at 12m. Risk: High. Response: Braking."
    );
  }, [addLog]);

  const emergencyStop = useCallback(() => {
    setSystemActive(false);
    setAlertActive(false);
    setSpeed(0);
    setDecisionStatus("Stopped");
    setControlStatus({
      steering: "Neutral",
      acceleration: "None",
      brake: "None",
    });
    addLog("SYSTEM", "Emergency stop executed. All systems halted.");
  }, [addLog]);

  const recalculateRoute = useCallback(() => {
    setAlertActive(false);
    setObstacle((prev) => ({ ...prev, response: "Re-routing" }));
    addLog("NAV", "Route recalculation triggered after obstacle detection.");
  }, [addLog]);

  const clearLogs = useCallback(() => setLogs([]), []);

  const value = {
    systemActive,
    speed,
    sensors,
    decisionStatus,
    controlStatus,
    destination,
    drivingMode,
    navigationActive,
    alertActive,
    obstacle,
    logs,
    startSystem,
    stopSystem,
    startNavigation,
    triggerAlert,
    emergencyStop,
    recalculateRoute,
    clearLogs,
    addLog,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppContext };

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
