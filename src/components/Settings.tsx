import React from 'react';

interface SettingsProps {
  user: {
    name: string;
    avatar: string;
  };
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Settings</h2>
      <div className="text-center p-4 bg-indigo-50 rounded-lg">
        <p>Settings panel coming soon!</p>
      </div>
    </div>
  );
};

export default Settings;