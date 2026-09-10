import React from 'react';
import { Task } from '@/types';
import { TaskCard } from './TaskCard';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TaskListProps {
  tasks: Task[];
  isLoading?: boolean;
  onSelectTask?: (task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  isLoading,
  onSelectTask,
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingSpinner label="Loading tasks..." size="lg" className="py-16" />;
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="No tasks found"
        description="You haven't posted any tasks matching the current filters or search criteria."
        actionLabel="Post a New Task"
        onAction={() => navigate('/customer/tasks/new')}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onSelect={onSelectTask} />
      ))}
    </div>
  );
};
