import React from 'react';
import { CheckCircle2, Clock, AlertCircle, Calendar } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: CheckCircle2,
      label: 'Completed Tasks',
      value: '24',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Clock,
      label: 'Pending Tasks',
      value: '12',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: AlertCircle,
      label: 'High Priority',
      value: '5',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: Calendar,
      label: 'Upcoming Meetings',
      value: '8',
      color: 'bg-blue-100 text-blue-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
          <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mb-4`}>
            <stat.icon className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
          <p className="text-gray-600">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;