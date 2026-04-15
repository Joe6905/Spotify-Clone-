import React from 'react';
import { Home, Search, Library, PlusSquare, Heart, Music2, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const navItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Search, label: 'Search' },
    { icon: Library, label: 'Your Library' },
  ];

  const secondaryItems = [
    { icon: PlusSquare, label: 'Create Playlist' },
    { icon: Heart, label: 'Liked Songs' },
  ];

  return (
    <div className="w-64 bg-surface-dark border-r border-brand-900/20 flex flex-col h-full p-6">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-600/20">
          <Music2 className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">Joi Music</span>
      </div>

      <nav className="space-y-6 flex-1">
        <div className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group",
                item.active 
                  ? "bg-brand-600/10 text-brand-400" 
                  : "text-brand-300/60 hover:text-brand-300 hover:bg-brand-900/20"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                item.active ? "text-brand-500" : "group-hover:text-brand-400"
              )} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="pt-6 border-t border-brand-900/20 space-y-1">
          {secondaryItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-brand-300/60 hover:text-brand-300 hover:bg-brand-900/20 transition-all group"
            >
              <item.icon className="w-5 h-5 group-hover:text-brand-400 transition-colors" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <button 
        onClick={onLogout}
        className="mt-auto flex items-center gap-4 px-4 py-3 rounded-xl text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all group"
      >
        <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="font-medium">Logout</span>
      </button>
    </div>
  );
};
