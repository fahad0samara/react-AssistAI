export interface Task {
  id: string;
  title: string;
  time: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  participants?: string[];
  status: 'pending' | 'completed' | 'overdue';
  category: 'meeting' | 'deadline' | 'reminder' | 'email';
  description?: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  preferences: {
    workingHours: {
      start: string;
      end: string;
    };
    timezone: string;
    notifications: boolean;
  };
}

export interface Notification {
  id: string;
  type: 'reminder' | 'meeting' | 'email' | 'alert';
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}