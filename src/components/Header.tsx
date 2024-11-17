  import React, { useState } from 'react';
import { Bell, Search, Mic, X } from 'lucide-react';
import NotificationPanel from './NotificationPanel';
import VoiceCommandModal from './VoiceCommandModal';

interface HeaderProps {
  user: {
    name: string;
    avatar: string;
  };
  notifications: number;
}

const Header: React.FC<HeaderProps> = ({ user, notifications }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showVoiceCommand, setShowVoiceCommand] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user.name}</h1>
        <p className="text-gray-600">Here's your intelligent overview</p>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search or type a command..."
            className="pl-10 pr-12 py-2 w-64 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <button
            onClick={() => setShowVoiceCommand(true)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600"
          >
            <Mic className="w-5 h-5" />
          </button>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative"
          >
            <Bell className="w-6 h-6 text-gray-600" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
          
          {showNotifications && <NotificationPanel />}
        </div>
        
        <img
          src={user.avatar}
          alt="Profile"
          className="w-10 h-10 rounded-full ring-2 ring-indigo-500"
        />
      </div>

      {showVoiceCommand && (
        <VoiceCommandModal onClose={() => setShowVoiceCommand(false)} />
      )}
    </header>
  );
};

export default Header;