import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTaskSchema, CreateTaskSchemaType } from '../schemas/taskSchema';
import { useTaskCategories } from '../hooks/useCustomerTasks';
import { useCreateTask } from '../hooks/useCreateTask';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { CheckCircle2, ArrowRight, ArrowLeft, Sparkles, DollarSign, Calendar, MapPin } from 'lucide-react';

export const CreateTaskWizard: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const navigate = useNavigate();
  const { data: categories = [], isLoading: isLoadingCategories } = useTaskCategories();
  const createTaskMutation = useCreateTask();

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateTaskSchemaType>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      categoryId: '',
      budget: 150,
      location: 'Austin, TX',
      isRemote: false,
      dueDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
      tags: '',
    },
  });

  const isRemoteWatch = watch('isRemote');

  const handleNextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger(['title', 'categoryId']);
    } else if (step === 2) {
      isValid = await trigger(['description']);
    }
    if (isValid) setStep((prev) => prev + 1);
  };

  const onSubmit = async (data: CreateTaskSchemaType) => {
    try {
      await createTaskMutation.mutateAsync(data);
      navigate('/customer/tasks');
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  if (isLoadingCategories) {
    return <LoadingSpinner label="Loading creation form..." size="lg" className="py-12" />;
  }

  return (
    <Card className="max-w-2xl mx-auto border-slate-200 shadow-md">
      <CardHeader className="p-6 bg-slate-900 text-white rounded-t-xl">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-extrabold text-white">Post a New Task</CardTitle>
            <CardDescription className="text-slate-300 mt-1">
              Describe your project to receive proposals from vetted marketplace providers.
            </CardDescription>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-slate-800 text-sky-400 rounded-full border border-slate-700">
            Step {step} of 3
          </span>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-800">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all ${
                s <= step ? 'bg-sky-500' : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="p-6 space-y-6">
          {/* STEP 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in-50">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1">
                  Task Title <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="e.g. Assemble IKEA PAX Wardrobe or Custom React Frontend"
                  {...register('title')}
                  error={!!errors.title}
                />
                {errors.title && (
                  <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <Select {...register('categoryId')} error={!!errors.categoryId}>
                  <option value="">Select a Category...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} ({cat.description})
                    </option>
                  ))}
                </Select>
                {errors.categoryId && (
                  <p className="text-xs text-red-500 mt-1">{errors.categoryId.message}</p>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: Description & Tags */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in-50">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1">
                  Detailed Description <span className="text-red-500">*</span>
                </label>
                <Textarea
                  placeholder="Describe task scope, requirements, tools needed, and specific expectations..."
                  rows={5}
                  {...register('description')}
                  error={!!errors.description}
                />
                {errors.description && (
                  <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1">
                  Tags (comma separated)
                </label>
                <Input
                  placeholder="e.g. Handyman, Assembly, Urgent, React"
                  {...register('tags')}
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Adding relevant tags helps matching providers discover your request faster.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: Budget, Location, Due Date */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in-50">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1">
                  Estimated Budget (USD $) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type="number"
                    className="pl-9"
                    {...register('budget', { valueAsNumber: true })}
                    error={!!errors.budget}
                  />
                </div>
                {errors.budget && (
                  <p className="text-xs text-red-500 mt-1">{errors.budget.message}</p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isRemote"
                  className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                  {...register('isRemote')}
                />
                <label htmlFor="isRemote" className="text-sm font-semibold text-slate-700 select-none">
                  This is a Remote / Online Task
                </label>
              </div>

              {!isRemoteWatch && (
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      className="pl-9"
                      placeholder="e.g. Austin, TX (Downtown)"
                      {...register('location')}
                      error={!!errors.location}
                    />
                  </div>
                  {errors.location && (
                    <p className="text-xs text-red-500 mt-1">{errors.location.message}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1">
                  Completion Target Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type="date"
                    className="pl-9"
                    {...register('dueDate')}
                    error={!!errors.dueDate}
                  />
                </div>
                {errors.dueDate && (
                  <p className="text-xs text-red-500 mt-1">{errors.dueDate.message}</p>
                )}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between rounded-b-xl">
          {step > 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep((prev) => prev - 1)}
              className="gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button
              type="button"
              onClick={handleNextStep}
              className="gap-1.5 bg-slate-900 text-white hover:bg-slate-800"
            >
              Next <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={createTaskMutation.isPending}
              className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 shadow"
            >
              {createTaskMutation.isPending ? (
                <LoadingSpinner size="sm" label="Publishing..." />
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Publish Task Now
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};
