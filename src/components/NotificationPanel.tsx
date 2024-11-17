import React from 'react';
import { Bell, Mail, Calendar, AlertCircle } from 'lucide-react';

const NotificationPanel: React.FC = () => {
  const notifications = [
    {
      id: 1,
      type: 'meeting',
      message: 'Design team meeting in 15 minutes',
      time: '9:45 AM',
      priority: 'high',
    },
    {
      id: 2,
      type: 'email',
      message: 'New email from John regarding project timeline',
      time: '9:30 AM',
      priority: 'medium',
    },
    {
      id: 3,
      type: 'alert',
      message: 'Project deadline approaching in 2 days',
      time: '9:15 AM',
      priority: 'high',
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return Calendar;
      case 'email':
        return Mail;
      case 'alert':
        return AlertCircle;
      default:
        return Bell;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="absolute right-0 top-8 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">Notifications</h3>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {notifications.map((notification) => {
          const Icon = getIcon(notification.type);
          return (
            <div
              key={notification.id}
              className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex gap-3">
                <div className={`${getPriorityColor(notification.priority)} p-2 rounded-lg`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{notification.message}</p>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 text-center border-t border-gray-100">
        <button className="text-sm text-indigo-600 hover:text-indigo-700">
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationPanel;