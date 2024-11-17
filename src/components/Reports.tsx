import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import type { Task } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ReportsProps {
  tasks: Task[];
}

const Reports: React.FC<ReportsProps> = ({ tasks }) => {
  const tasksByPriority = tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const tasksByCategory = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const priorityData = {
    labels: Object.keys(tasksByPriority),
    datasets: [
      {
        label: 'Tasks by Priority',
        data: Object.values(tasksByPriority),
        backgroundColor: ['#EF4444', '#F59E0B', '#10B981'],
      },
    ],
  };

  const categoryData = {
    labels: Object.keys(tasksByCategory),
    datasets: [
      {
        label: 'Tasks by Category',
        data: Object.values(tasksByCategory),
        backgroundColor: [
          '#6366F1',
          '#8B5CF6',
          '#EC4899',
          '#F97316',
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Task Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Tasks by Priority</h3>
            <div className="h-64">
              <Pie data={priorityData} />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Tasks by Category</h3>
            <div className="h-64">
              <Bar
                data={categoryData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Task Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <h3 className="font-medium text-indigo-900">Total Tasks</h3>
            <p className="text-3xl font-bold text-indigo-600">{tasks.length}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium text-green-900">Completed Tasks</h3>
            <p className="text-3xl font-bold text-green-600">
              {tasks.filter(task => task.status === 'completed').length}
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-medium text-yellow-900">Pending Tasks</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {tasks.filter(task => task.status === 'pending').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;