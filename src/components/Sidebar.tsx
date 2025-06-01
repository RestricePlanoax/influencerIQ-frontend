import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Megaphone, 
  Mail, 
  CreditCard, 
  BarChart2, 
  Settings,
  X
} from 'lucide-react';

interface SidebarProps {
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ closeSidebar }) => {
  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/creators', name: 'Creator Discovery', icon: <Users size={20} /> },
    { path: '/campaigns', name: 'Campaigns', icon: <Megaphone size={20} /> },
    { path: '/outreach', name: 'Outreach & CRM', icon: <Mail size={20} /> },
    { path: '/payments', name: 'Payments', icon: <CreditCard size={20} /> },
    { path: '/analytics', name: 'Analytics', icon: <BarChart2 size={20} /> },
    { path: '/settings', name: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Logo and close button (mobile only) */}
      <div className="flex items-center justify-between border-b border-slate-200 p-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white">
            <Megaphone size={20} />
          </div>
          <span className="text-xl font-bold text-slate-800">InfluenceIQ</span>
        </div>
        <button 
          className="rounded p-1 text-slate-500 hover:bg-slate-100 md:hidden"
          onClick={closeSidebar}
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
            onClick={() => closeSidebar()}
          >
            <span className={({ isActive }) => isActive ? 'text-primary-600' : 'text-slate-500'}>
              {item.icon}
            </span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-slate-200">
            <img 
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="User" 
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800">Sarah Johnson</p>
            <p className="text-xs text-slate-500">Marketing Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;