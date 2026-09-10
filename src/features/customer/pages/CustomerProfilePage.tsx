import React, { useState } from 'react';
import { useCustomerProfile } from '../hooks/useCustomerProfile';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerProfileSchema, CustomerProfileSchemaType } from '../schemas/profileSchema';
import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';
import { User, Phone, MapPin, Mail, Save, Star, ShieldCheck, Check } from 'lucide-react';

export const CustomerProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { data: profile, isLoading, updateProfile, isUpdating } = useCustomerProfile();
  const [successMsg, setSuccessMsg] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerProfileSchemaType>({
    resolver: zodResolver(customerProfileSchema),
    values: {
      name: user?.name || 'Sarah Jenkins',
      email: user?.email || 'sarah.j@example.com',
      phone: user?.phone || '+1 (555) 234-5678',
      bio: profile?.bio || '',
      address: profile?.address || '742 Evergreen Terrace',
      city: profile?.city || 'Austin',
      state: profile?.state || 'TX',
      zipCode: profile?.zipCode || '78701',
    },
  });

  const onSubmit = async (data: CustomerProfileSchemaType) => {
    try {
      await updateProfile(data);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  if (isLoading || !profile) {
    return <LoadingSpinner label="Loading customer profile..." size="lg" className="py-16" />;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Customer Profile"
        description="Manage your account profile, personal details, and marketplace address."
      />

      {/* Header Profile Summary */}
      <Card className="p-6 border-slate-200 bg-white">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Avatar
            src={user?.avatarUrl}
            fallback={user?.name || 'Customer'}
            size="xl"
            className="ring-4 ring-slate-100 shrink-0"
          />
          <div className="text-center sm:text-left space-y-1 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-extrabold text-slate-900">{user?.name}</h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Customer
              </span>
            </div>
            <p className="text-sm text-slate-500">{user?.email}</p>
            <div className="flex items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-slate-600 pt-2">
              <span className="flex items-center gap-1 text-amber-600">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {profile.rating} Rating ({profile.reviewCount} reviews)
              </span>
              <span>•</span>
              <span>{profile.completedTasks} Tasks Completed</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Profile Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="border-slate-200">
          <CardHeader className="p-6 border-b border-slate-100">
            <CardTitle className="text-lg font-bold text-slate-900">Personal Information</CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Update your contact details and default location for task dispatching.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {successMsg && (
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-semibold flex items-center gap-2 border border-emerald-200">
                <Check className="w-4 h-4" /> Profile updated successfully!
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input className="pl-9" {...register('name')} error={!!errors.name} />
                </div>
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input className="pl-9" {...register('email')} error={!!errors.email} />
                </div>
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input className="pl-9" {...register('phone')} error={!!errors.phone} />
                </div>
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Street Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input className="pl-9" {...register('address')} error={!!errors.address} />
                </div>
                {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                <Input {...register('city')} error={!!errors.city} />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
                  <Input {...register('state')} error={!!errors.state} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Zip Code</label>
                  <Input {...register('zipCode')} error={!!errors.zipCode} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Bio / Preferences</label>
              <Textarea rows={3} {...register('bio')} placeholder="Tell providers about your expectations..." />
            </div>
          </CardContent>
          <CardFooter className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
            <Button type="submit" disabled={isUpdating} className="gap-2 bg-slate-900 text-white hover:bg-slate-800">
              {isUpdating ? <LoadingSpinner size="sm" label="Saving..." /> : <><Save className="w-4 h-4" /> Save Changes</>}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
