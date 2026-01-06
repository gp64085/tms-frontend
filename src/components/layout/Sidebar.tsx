import { useState, type FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Truck,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  X,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: FunctionComponent<SidebarProps> = ({ isOpen, onClose }) => {
  const [expandedMenu, setExpandedMenu] = useState<string | null>("shipments");
  const { logout } = useAuth();

  const toggleSubmenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  const linkClass =
    "flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-800 hover:text-white transition-colors rounded-lg mx-2 my-1 text-sm font-medium";
  const activeClass = "bg-blue-600 text-white shadow-lg shadow-blue-900/50";

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out border-r border-slate-800
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:h-screen
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xl font-bold text-blue-500">
            <Truck className="fill-current" />
            <span>TMS.io</span>
          </div>
          <button onClick={onClose} className="text-gray-400 md:hidden">
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex flex-col gap-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {/* Simple Item */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          {/* Item with Submenu (Requirement) */}
          <div>
            <button
              onClick={() => toggleSubmenu("shipments")}
              className={`${linkClass} w-[93%] justify-between group`}
            >
              <div className="flex items-center gap-3">
                <Truck size={20} />
                Shipments
              </div>
              {expandedMenu === "shipments" ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            {/* Submenu Items */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                expandedMenu === "shipments" ? "max-h-40" : "max-h-0"
              }`}
            >
              <div className="py-2 mx-4 mb-2 border rounded-lg bg-slate-950/50 border-slate-800/50">
                <NavLink
                  to="/shipments/active"
                  className="block px-4 py-2 mx-2 text-sm text-gray-400 rounded hover:text-white hover:bg-slate-800/50"
                >
                  Active Loads
                </NavLink>
                <NavLink
                  to="/shipments/history"
                  className="block px-4 py-2 mx-2 text-sm text-gray-400 rounded hover:text-white hover:bg-slate-800/50"
                >
                  History
                </NavLink>
              </div>
            </div>
          </div>

          <NavLink
            to="/drivers"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            <Users size={20} />
            Drivers
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            <Settings size={20} />
            Settings
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 text-xs font-bold rounded-full bg-linear-to-tr from-blue-500 to-purple-500">
              JD
            </div>
            <div className="text-sm">
              <div className="font-medium">John Doe</div>
              <div className="text-xs text-slate-500">Admin User</div>
            </div>
            <div className="ml-4" onClick={logout}>
              <LogOut className="cursor-pointer hover:text-red-600" size={20} />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
