import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { mockNotifications } from '../mockData';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const unreadNotifications = mockNotifications.filter(notification => !notification.read);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left: Mobile Menu Button */}
        <button
          className="rounded p-2 text-slate-500 hover:bg-slate-100 md:hidden"
          onClick={toggleSidebar}
        >
          <Menu size={24} />
        </button>

        {/* Center: Search Bar */}
        <div className="hidden flex-1 md:mx-8 md:flex">
          <div className="relative w-full max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search creators, campaigns..."
              className="input pl-10"
            />
          </div>
        </div>

        {/* Right: Notifications */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="rounded p-2 text-slate-500 hover:bg-slate-100">
              <Bell size={20} />
              {unreadNotifications.length > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {unreadNotifications.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;