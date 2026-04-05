import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${
    isActive
      ? "text-white underline underline-offset-4"
      : "text-gray-400 hover:text-white"
  }`;

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between">
      <span className="text-sm font-mono font-bold tracking-widest">ACSS</span>
      <div className="flex items-center gap-6">
        <NavLink to="/" end className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/navigation" className={linkClass}>
          Navigation
        </NavLink>
        <NavLink to="/alert" className={linkClass}>
          Alert
        </NavLink>
        <NavLink to="/logs" className={linkClass}>
          Logs
        </NavLink>
      </div>
    </nav>
  );
}
