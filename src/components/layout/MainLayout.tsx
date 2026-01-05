import { useState } from "react";
import { Menu, Search } from "lucide-react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* 1. Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* 2. Main Content Area */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        {/* Horizontal Menu / Top Bar */}
        <header className="z-10 flex items-center justify-between h-16 px-4 bg-white border-b sm:px-6">
          <div className="flex items-center gap-4">
            {/* Hamburger Trigger (Mobile Only) */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 text-gray-600 rounded-lg hover:bg-gray-100 md:hidden"
            >
              <Menu size={24} />
            </button>

            {/* Search Bar (Optional Polish) */}
            <div className="hidden justify-center sm:flex items-center bg-gray-100 rounded-full px-4 py-1.5 w-64 border border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full ml-2 text-sm bg-transparent border-none outline-none focus:ring-0"
              />
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 overflow-auto sm:p-6 lg:p-8">
          <div className="h-full mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
