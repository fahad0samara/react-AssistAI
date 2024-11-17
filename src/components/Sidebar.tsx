import React from 'react';
import { Calendar, Mail, Clock, BarChart2, Settings, Home, BrainCircuit } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'email', icon: Mail, label: 'Email' },
    { id: 'reminders', icon: Clock, label: 'Reminders' },
    { id: 'reports', icon: BarChart2, label: 'Reports' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="h-screen
      
     w-64 bg-indigo-900 text-white p-6">
      <div className="flex items-center gap-3 mb-10">
        <BrainCircuit className="w-8 h-8" />
        <span className="text-xl font-bold">AssistAI</span>
      </div>
      
      <nav>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`flex items-center gap-3 w-full p-3 rounded-lg mb-2 transition-colors ${
              activeView === item.id
                ? 'bg-indigo-800 text-white'
                : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;