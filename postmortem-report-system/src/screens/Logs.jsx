import { useState, useMemo } from "react";
import { useApp } from "../context/AppContext";
import Button from "../components/Button";
import LogItem from "../components/LogItem";

const card = "bg-white border border-gray-200 rounded-lg p-5";

export default function Logs() {
  const { logs, clearLogs } = useApp();
  const [filter, setFilter] = useState("All");

  const filteredLogs = useMemo(() => {
    return [...logs].reverse().filter((log) => {
      if (filter === "All") return true;
      if (filter === "Alerts") return log.type === "ALERT";
      if (filter === "Navigation") return log.type === "NAV";
      return true;
    });
  }, [logs, filter]);

  const alertCount = logs.filter((l) => l.type === "ALERT").length;
  const navCount = logs.filter((l) => l.type === "NAV").length;

  const filterBtn = (name) =>
    `px-4 py-1.5 rounded text-sm font-medium transition-colors ${
      filter === name
        ? "bg-gray-900 text-white"
        : "border border-gray-200 text-gray-500 hover:bg-gray-50"
    }`;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <header>
          <h1 className="text-2xl font-bold text-gray-900 font-mono">
            System Logs
          </h1>
          <p className="text-sm text-gray-400">Event history and diagnostics</p>
        </header>
        <Button label="Clear Logs" variant="ghost" onClick={clearLogs} />
      </div>

      <div className="flex gap-2 flex-wrap">
        <button type="button" className={filterBtn("All")} onClick={() => setFilter("All")}>
          All
        </button>
        <button
          type="button"
          className={filterBtn("Alerts")}
          onClick={() => setFilter("Alerts")}
        >
          Alerts
        </button>
        <button
          type="button"
          className={filterBtn("Navigation")}
          onClick={() => setFilter("Navigation")}
        >
          Navigation
        </button>
      </div>

      <div className="flex gap-6 flex-wrap text-xs text-gray-400">
        <span>
          Total Logs:{" "}
          <span className="font-mono font-bold text-gray-800">{logs.length}</span>
        </span>
        <span>
          Alerts:{" "}
          <span className="font-mono font-bold text-gray-800">{alertCount}</span>
        </span>
        <span>
          Navigation Events:{" "}
          <span className="font-mono font-bold text-gray-800">{navCount}</span>
        </span>
      </div>

      <div className={`${card} p-0 divide-y divide-gray-100`}>
        <div className="max-h-[480px] overflow-y-auto divide-y divide-gray-100">
          {filteredLogs.length === 0 ? (
            <p className="text-sm text-gray-400 py-10 text-center">
              No logs to display.
            </p>
          ) : (
            filteredLogs.map((log) => <LogItem key={log.id} log={log} />)
          )}
        </div>
      </div>
    </div>
  );
}
