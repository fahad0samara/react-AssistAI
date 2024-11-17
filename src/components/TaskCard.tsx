import React from 'react';
import { Calendar, Clock, Trash2, CheckCircle } from 'lucide-react';

interface TaskCardProps {
  id: string;
  title: string;
  time: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  participants?: string[];
  onDelete: () => void;
  onComplete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  time,
  date,
  priority,
  participants,
  onDelete,
  onComplete,
}) => {
  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[priority]}`}>
          {priority}
        </span>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
      </div>

      {participants && (
        <div className="mt-3 flex -space-x-2">
          {participants.map((participant, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center"
            >
              <span className="text-xs font-medium text-indigo-800">
                {participant.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={onComplete}
          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          title="Mark as complete"
        >
          <CheckCircle className="w-5 h-5" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete task"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;