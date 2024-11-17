import { create } from 'zustand';
import type { Task } from '../types';

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [
    {
      id: '1',
      title: 'Team Strategy Meeting',
      time: '10:00',
      date: new Date().toISOString().split('T')[0],
      priority: 'high',
      participants: ['John Doe', 'Sarah Smith', 'Mike Johnson'],
      status: 'pending',
      category: 'meeting',
      description: 'Quarterly strategy review with the product team',
    },
    {
      id: '2',
      title: 'Project Review',
      time: '14:30',
      date: new Date().toISOString().split('T')[0],
      priority: 'medium',
      participants: ['Emma Wilson', 'Alex Brown'],
      status: 'pending',
      category: 'deadline',
      description: 'Review Q1 project milestones and deliverables',
    },
  ],
  
  addTask: (newTask) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { ...newTask, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),
    
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
    
  completeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status: 'completed' } : task
      ),
    })),
    
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      ),
    })),
}));