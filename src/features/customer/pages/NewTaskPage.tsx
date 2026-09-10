import React from 'react';
import { CreateTaskWizard } from '../components/CreateTaskWizard';
import { PageHeader } from '@/components/common/PageHeader';

export const NewTaskPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Post a Task"
        description="Fill out task details, budget, and location to publish to the marketplace."
      />
      <CreateTaskWizard />
    </div>
  );
};
