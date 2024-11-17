import React, { useState } from 'react';
import { AlertCircle, Calendar as CalendarIcon } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Stats from './components/Stats';
import TaskCard from './components/TaskCard';
import TaskModal from './components/TaskModal';
import Calendar from './components/Calendar';
import Email from './components/Email';
import Reports from './components/Reports';
import Settings from './components/Settings';
import { useTaskStore } from './store/taskStore';

function App() {
  const [user] = useState({
    name: 'Alex',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  });

  const [activeView, setActiveView] = useState('dashboard');
  const [showTaskModal, setShowTaskModal] = useState(false);
  
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const completeTask = useTaskStore((state) => state.completeTask);

  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    addTask(newTask);
    setShowTaskModal(false);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'calendar':
        return <Calendar />;
      case 'email':
        return <Email />;
      case 'reports':
        return <Reports tasks={tasks} />;
      case 'settings':
        return <Settings user={user} />;
      default:
        return (
          <>
            <Stats tasks={tasks} />

            <section className="mt-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Upcoming Tasks</h2>
                  <p className="text-sm text-gray-600">Intelligently prioritized based on your schedule</p>
                </div>
                <button 
                  onClick={() => setShowTaskModal(true)}
                  className="btn btn-primary"
                >
                  Add New Task
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.filter(task => task.status === 'pending').map((task) => (
                  <TaskCard 
                    key={task.id} 
                    {...task} 
                    onDelete={() => deleteTask(task.id)}
                    onComplete={() => completeTask(task.id)}
                  />
                ))}
              </div>
            </section>

            <section className="mt-8 bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">AI Insights</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-lg">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">Schedule Optimization</p>
                    <p className="text-gray-600 text-sm">
                      Based on your work patterns, scheduling the client presentation for 11 AM tomorrow might lead to time pressure. Consider moving it to 2 PM for better preparation time.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">Meeting Efficiency</p>
                    <p className="text-gray-600 text-sm">
                      Your team's most productive meetings occur between 10 AM and 12 PM. I've adjusted your meeting suggestions accordingly.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 p-8">
        <Header user={user} notifications={3} />
        {renderContent()}
      </main>

      {showTaskModal && (
        <TaskModal 
          onClose={() => setShowTaskModal(false)}
          onSubmit={handleAddTask}
        />
      )}
    </div>
  );
}

export default App;