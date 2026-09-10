import React from 'react';
import { TaskFilterOptions } from '../types/customer.types';
import { TaskStatus, Category } from '@/types';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TaskFiltersProps {
  filters: TaskFilterOptions;
  categories: Category[];
  onChange: (newFilters: TaskFilterOptions) => void;
  onReset: () => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  filters,
  categories,
  onChange,
  onReset,
}) => {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4 mb-6">
      <div className="flex flex-col md:flex-row gap-3 items-center">
        {/* Search input */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Filter by keywords, tags, title..."
            value={filters.search || ''}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="pl-9 bg-slate-50 border-slate-200"
          />
        </div>

        {/* Category select */}
        <div className="w-full md:w-56">
          <Select
            value={filters.categoryId || ''}
            onChange={(e) => onChange({ ...filters, categoryId: e.target.value || undefined })}
            className="bg-slate-50 border-slate-200"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Select>
        </div>

        {/* Status select */}
        <div className="w-full md:w-48">
          <Select
            value={filters.status || 'ALL'}
            onChange={(e) =>
              onChange({
                ...filters,
                status: e.target.value as TaskStatus | 'ALL',
              })
            }
            className="bg-slate-50 border-slate-200"
          >
            <option value="ALL">All Statuses</option>
            <option value="OPEN">Open for Bids</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="DRAFT">Draft</option>
            <option value="CANCELLED">Cancelled</option>
          </Select>
        </div>

        {/* Sort select */}
        <div className="w-full md:w-48">
          <Select
            value={filters.sortBy || 'newest'}
            onChange={(e) =>
              onChange({
                ...filters,
                sortBy: e.target.value as 'newest' | 'budget_high' | 'budget_low',
              })
            }
            className="bg-slate-50 border-slate-200"
          >
            <option value="newest">Sort by Newest</option>
            <option value="budget_high">Budget: High to Low</option>
            <option value="budget_low">Budget: Low to High</option>
          </Select>
        </div>

        <Button
          variant="outline"
          onClick={onReset}
          className="w-full md:w-auto gap-1.5 border-slate-200 text-slate-600 hover:bg-slate-100 shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset
        </Button>
      </div>
    </div>
  );
};
