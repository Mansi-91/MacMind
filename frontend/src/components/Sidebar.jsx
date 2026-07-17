import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  FolderOpen,
  Bot,
  Copy,
  Settings,
  Brain,
} from "lucide-react";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Files",
      path: "/files",
      icon: FolderOpen,
    },
    {
      name: "AI Search",
      path: "/ai-search",
      icon: Bot,
    },
    {
      name: "Duplicates",
      path: "/duplicates",
      icon: Copy,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="w-72 min-h-screen bg-slate-900 text-white flex flex-col shadow-xl">

      {/* Logo */}

      <div className="p-8 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Brain size={34} className="text-indigo-400" />

          <div>
            <h1 className="text-2xl font-bold">MacMind</h1>
            <p className="text-slate-400 text-sm">
              Desktop Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl mb-3 transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />

              <span className="font-medium">{item.name}</span>
            </NavLink>
          );
        })}

      </nav>

      {/* Footer */}

      <div className="p-6 border-t border-slate-800">
        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-sm text-slate-400">
            Version
          </p>

          <h3 className="font-semibold mt-1">
            MacMind v1.0
          </h3>

          <p className="text-xs text-slate-500 mt-2">
            AI-powered Desktop Analytics
          </p>
        </div>
      </div>

    </div>
  );
}

export default Sidebar;