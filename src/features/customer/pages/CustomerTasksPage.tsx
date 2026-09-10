import React, { useState } from 'react';
import { useCustomerTasks, useTaskCategories } from '../hooks/useCustomerTasks';
import { TaskFilterOptions } from '../types/customer.types';
import { TaskFilters } from '../components/TaskFilters';
import { TaskList } from '../components/TaskList';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CustomerTasksPage: React.FC = () => {
  const [filters, setFilters] = useState<TaskFilterOptions>({
    status: 'ALL',
    sortBy: 'newest',
  });

  const { data: tasks = [], isLoading: isLoadingTasks } = useCustomerTasks(filters);
  const { data: categories = [] } = useTaskCategories();

  const handleResetFilters = () => {
    setFilters({
      status: 'ALL',
      sortBy: 'newest',
      search: '',
      categoryId: undefined,
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Posted Tasks"
        description="Track your task requests, inspect provider proposals, and review completed work."
        action={
          <Link to="/customer/tasks/new">
            <Button className="gap-2 bg-slate-900 text-white hover:bg-slate-800">
              <PlusCircle className="w-4 h-4" /> Create New Task
            </Button>
          </Link>
        }
      />

      <TaskFilters
        filters={filters}
        categories={categories}
        onChange={setFilters}
        onReset={handleResetFilters}
      />

      <TaskList tasks={tasks} isLoading={isLoadingTasks} />
    </div>
  );
};
