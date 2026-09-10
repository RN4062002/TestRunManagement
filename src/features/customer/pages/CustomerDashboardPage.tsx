import React from 'react';
import { useCustomerTasks, useRecommendedProviders } from '../hooks/useCustomerTasks';
import { CustomerStats } from '../components/CustomerStats';
import { TaskList } from '../components/TaskList';
import { RecentActivity } from '../components/RecentActivity';
import { PageHeader } from '@/components/common/PageHeader';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { PlusCircle, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CustomerDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { data: tasks = [], isLoading: isLoadingTasks } = useCustomerTasks();
  const { data: providers = [], isLoading: isLoadingProviders } = useRecommendedProviders();

  const activeTasks = tasks.filter(
    (t) => t.status === 'OPEN' || t.status === 'IN_PROGRESS'
  );

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-sky-500/10 to-transparent pointer-events-none" />
        <div className="space-y-2 z-10 max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-400/30">
            <ShieldCheck className="w-3.5 h-3.5" /> Customer Portal
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Welcome back, {user?.name.split(' ')[0] || 'Customer'}!
          </h1>
          <p className="text-sm text-slate-300 font-medium">
            Manage your open tasks, view incoming provider proposals, and discover verified local talent.
          </p>
        </div>

        <Link to="/customer/tasks/new" className="z-10 shrink-0">
          <Button size="lg" className="bg-sky-500 hover:bg-sky-400 text-white font-bold gap-2 shadow-lg">
            <PlusCircle className="w-5 h-5" /> Post New Task
          </Button>
        </Link>
      </div>

      {/* KPI Stats */}
      <CustomerStats tasks={tasks} />

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Tasks Column (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Active & In-Progress Tasks</h2>
            <Link
              to="/customer/tasks"
              className="text-xs text-sky-600 font-semibold hover:underline flex items-center gap-1"
            >
              View all tasks ({tasks.length}) <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <TaskList tasks={activeTasks.slice(0, 4)} isLoading={isLoadingTasks} />
        </div>

        {/* Sidebar Column (1 col) */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <RecentActivity />

          {/* Recommended Providers Preview */}
          <Card className="border-slate-200">
            <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold text-slate-900">
                Top Rated Providers
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-3">
              {providers.map((prov) => (
                <div
                  key={prov.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:bg-slate-100/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar src={prov.avatarUrl} fallback={prov.name} size="sm" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">{prov.name}</p>
                      <p className="text-[11px] text-slate-500 truncate max-w-[140px]">
                        {prov.headline}
                      </p>
                      <div className="flex items-center gap-1 text-[11px] text-amber-600 font-bold mt-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {prov.rating} ({prov.reviewCount})
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900">
                    ${prov.hourlyRate}/hr
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
