import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useTaskStore } from '../store/taskStore';
import type { Task } from '../types';

const Calendar: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);
  
  const events = tasks.map((task: Task) => ({
    id: task.id,
    title: task.title,
    start: `${task.date}T${task.time}`,
    backgroundColor: task.priority === 'high' ? '#EF4444' : 
                    task.priority === 'medium' ? '#F59E0B' : '#10B981',
    extendedProps: {
      description: task.description,
      participants: task.participants,
      category: task.category,
    },
  }));

  const handleEventClick = (info: any) => {
    const event = info.event;
    alert(`
      ${event.title}
      Time: ${event.start.toLocaleTimeString()}
      Description: ${event.extendedProps.description}
      Participants: ${event.extendedProps.participants?.join(', ')}
    `);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Calendar</h2>
      <div className="h-[600px]">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={events}
          eventClick={handleEventClick}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
        />
      </div>
    </div>
  );
};

export default Calendar;