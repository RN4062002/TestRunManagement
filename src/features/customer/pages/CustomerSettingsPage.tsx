import React, { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Shield, CreditCard, Lock, Check } from 'lucide-react';

export const CustomerSettingsPage: React.FC = () => {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Account Settings"
        description="Configure your security settings, notification rules, and payment preferences."
      />

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="notifications" className="gap-1.5 text-xs">
            <Bell className="w-3.5 h-3.5" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-1.5 text-xs">
            <Shield className="w-3.5 h-3.5" /> Security
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-1.5 text-xs">
            <CreditCard className="w-3.5 h-3.5" /> Billing
          </TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <form onSubmit={handleSave}>
            <Card className="border-slate-200">
              <CardHeader className="p-6 border-b border-slate-100">
                <CardTitle className="text-base font-bold">Notification Preferences</CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Control how and when TaskHub alerts you about task proposals and status changes.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {saved && (
                  <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-semibold flex items-center gap-2 border border-emerald-200">
                    <Check className="w-4 h-4" /> Preferences saved!
                  </div>
                )}
                {[
                  { title: 'Email Notifications for New Proposals', desc: 'Receive instant email when a provider applies to your task.', defaultChecked: true },
                  { title: 'SMS Instant Alerts for Task Milestones', desc: 'Get text alerts when provider completes work or updates status.', defaultChecked: true },
                  { title: 'Marketplace Deals & Product Updates', desc: 'Occasional emails about promotional codes and feature releases.', defaultChecked: false },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div>
                      <p className="text-xs font-bold text-slate-900">{item.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                    <input type="checkbox" defaultChecked={item.defaultChecked} className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 mt-1" />
                  </div>
                ))}
              </CardContent>
              <CardFooter className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                <Button type="submit" className="bg-slate-900 text-white hover:bg-slate-800">
                  Save Notification Settings
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="border-slate-200">
            <CardHeader className="p-6 border-b border-slate-100">
              <CardTitle className="text-base font-bold">Password & Authentication</CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Update your account password and configure two-factor authentication.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Current Password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">New Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Confirm New Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
              <Button className="bg-slate-900 text-white hover:bg-slate-800">
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing">
          <Card className="border-slate-200">
            <CardHeader className="p-6 border-b border-slate-100">
              <CardTitle className="text-base font-bold">Payment Methods & Escrow Wallet</CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Manage saved credit cards and review escrow protection terms.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-sky-900 text-white flex items-center justify-between shadow">
                <div>
                  <p className="text-xs text-slate-300 font-semibold">Saved Card</p>
                  <p className="text-base font-mono font-bold mt-1">•••• •••• •••• 4242</p>
                  <p className="text-[10px] text-sky-300 mt-1">Expires 12/28 • Sarah Jenkins</p>
                </div>
                <CreditCard className="w-8 h-8 text-sky-400 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
