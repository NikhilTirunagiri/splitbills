'use client';

import { useAuth } from "@/contexts/AuthContext";
import Auth from "@/components/Auth";
import Dashboard from "@/components/Dashboard";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  const { user, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">$</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">Split Bills</h1>
        </div>
      </div>
    );
  }

  // Show dashboard if user is logged in, otherwise show auth page
  return (
    <>
      {user ? <Dashboard /> : <Auth />}
      <Toaster />
    </>
  );
}
