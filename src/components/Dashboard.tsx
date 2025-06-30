'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataModal } from "@/components/ui/data-modal";
import Profile from "@/components/Profile";
import { Plus, Users, User, Activity, DollarSign, Bell } from "lucide-react";
import { Header } from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [friendsModalOpen, setFriendsModalOpen] = useState(false);
  const [groupsModalOpen, setGroupsModalOpen] = useState(false);
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [totalBalance] = useState(-100); // Will be calculated from real data
  const [yourGroups] = useState([
    {
      id: 1,
      name: "4313 E",
      balance: -10.79,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx4E--EPUXctqy9Ii6qo4OLIdhL6Eby8eCIFQssEHfqQLS8UCfkkV4Uv4hQ2ooqpC5sj_wHg5dCd-Jxuyxrvz89afbe2RbOTBsk-qm4VeO6iffEQ_gQSLxrv6uDlz_LMr1FRojYimJ9cWNa3esz84dNmVnrBSwcOkvjEtLsrVJqSp7v5xUYRiJVnP54Zzj7dbOJ2Hlm5KMCadFrxuquH0JtfFxffM_UXvmQUXrkSTlq8C2_zwmc_7QHnTO0sif6qVYMtxOWLG93A"
    },
    {
      id: 2,
      name: "10606 L",
      balance: +18.79,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx4E--EPUXctqy9Ii6qo4OLIdhL6Eby8eCIFQssEHfqQLS8UCfkkV4Uv4hQ2ooqpC5sj_wHg5dCd-Jxuyxrvz89afbe2RbOTBsk-qm4VeO6iffEQ_gQSLxrv6uDlz_LMr1FRojYimJ9cWNa3esz84dNmVnrBSwcOkvjEtLsrVJqSp7v5xUYRiJVnP54Zzj7dbOJ2Hlm5KMCadFrxuquH0JtfFxffM_UXvmQUXrkSTlq8C2_zwmc_7QHnTO0sif6qVYMtxOWLG93A"
    },
    {
      id: 3,
      name: "Mains",
      balance: +34.96,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx4E--EPUXctqy9Ii6qo4OLIdhL6Eby8eCIFQssEHfqQLS8UCfkkV4Uv4hQ2ooqpC5sj_wHg5dCd-Jxuyxrvz89afbe2RbOTBsk-qm4VeO6iffEQ_gQSLxrv6uDlz_LMr1FRojYimJ9cWNa3esz84dNmVnrBSwcOkvjEtLsrVJqSp7v5xUYRiJVnP54Zzj7dbOJ2Hlm5KMCadFrxuquH0JtfFxffM_UXvmQUXrkSTlq8C2_zwmc_7QHnTO0sif6qVYMtxOWLG93A"
    },
  ]);
  const [recentActivity] = useState([
    {
      id: 1,
      name: "Nikhil updated {Split Title 1}",
      balance: +34.96,
      date: "2025-06-29",
      time: "11:00 AM",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx4E--EPUXctqy9Ii6qo4OLIdhL6Eby8eCIFQssEHfqQLS8UCfkkV4Uv4hQ2ooqpC5sj_wHg5dCd-Jxuyxrvz89afbe2RbOTBsk-qm4VeO6iffEQ_gQSLxrv6uDlz_LMr1FRojYimJ9cWNa3esz84dNmVnrBSwcOkvjEtLsrVJqSp7v5xUYRiJVnP54Zzj7dbOJ2Hlm5KMCadFrxuquH0JtfFxffM_UXvmQUXrkSTlq8C2_zwmc_7QHnTO0sif6qVYMtxOWLG93A"
    },
    {
      id: 2,
      name: "Rahul updated {Split Title 2}",
      balance: -10.79,
      date: "2025-06-29",
      time: "01:00 PM",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtYn7raA1yVK0V2KSQp6VI-azyFI1KW3hVJTlOgCiUYxY6tmSUNaAj3im5G4ZvEyoYFHN9NXW91lFG2TPKixorD3edo_5dX7Awrjb3oO_o-6WMmSJYyDBn1hB0JVXt3tmH8Rk_IT8iESFOVxpq_jIiCRdGcUpe_bc3bt0F4mvFPxaC6CN9t57IgCZcywHpvX4w6fHpGiwVp29SZ0eyy7tG3xZtDiEHZ-m8c6eaIr5N1Z9lKYY6Vp4jNeD7qhoSFAmEmIyjqIe53w"
    },
    {
      id: 3,
      name: "Rahul updated {Split Title 3}",
      balance: +12.79,
      date: "2025-06-29",
      time: "02:00 PM",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGWU9ZowpcjaCFvd6A8wqIqb4t38vqQv8E1hZBtwRGoGoEc3AD_Hl-kffqHX-9tZp_9_XMUH1ISxb-qCi0JTyXHyNPtKXzheZqCK7K2CNuOWHsqmJSJ1F9Ijn1eJRic7mG2JF_xoZAdXssLjmGqVrCWrEYawNGnU_Vtb4apR2fhhPzpR9ZChdE5OEHKUmNqB7kr8w7t_rnnYknF36lSgupzQ7yj-BEb1Dsxg-3teI2Q16NWh0ld2znd344ktJ5JshvIahvA5A_0Q"
    },
    {
      id: 4,
      name: "Nikhil updated {Split Title 4}",
      balance: -10.79,
      date: "2025-06-29",
      time: "01:00 PM",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx4E--EPUXctqy9Ii6qo4OLIdhL6Eby8eCIFQssEHfqQLS8UCfkkV4Uv4hQ2ooqpC5sj_wHg5dCd-Jxuyxrvz89afbe2RbOTBsk-qm4VeO6iffEQ_gQSLxrv6uDlz_LMr1FRojYimJ9cWNa3esz84dNmVnrBSwcOkvjEtLsrVJqSp7v5xUYRiJVnP54Zzj7dbOJ2Hlm5KMCadFrxuquH0JtfFxffM_UXvmQUXrkSTlq8C2_zwmc_7QHnTO0sif6qVYMtxOWLG93A"
    },
    {
      id: 5,
      name: "Nikhil updated {Split Title 5}",
      balance: -10.79,
      date: "2025-06-29",
      time: "02:00 PM",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx4E--EPUXctqy9Ii6qo4OLIdhL6Eby8eCIFQssEHfqQLS8UCfkkV4Uv4hQ2ooqpC5sj_wHg5dCd-Jxuyxrvz89afbe2RbOTBsk-qm4VeO6iffEQ_gQSLxrv6uDlz_LMr1FRojYimJ9cWNa3esz84dNmVnrBSwcOkvjEtLsrVJqSp7v5xUYRiJVnP54Zzj7dbOJ2Hlm5KMCadFrxuquH0JtfFxffM_UXvmQUXrkSTlq8C2_zwmc_7QHnTO0sif6qVYMtxOWLG93A"
    },
    {
      id: 6,
      name: "Nikhil updated {Split Title 6}",
      balance: -10.79,
      date: "2025-06-29",
      time: "02:00 PM",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx4E--EPUXctqy9Ii6qo4OLIdhL6Eby8eCIFQssEHfqQLS8UCfkkV4Uv4hQ2ooqpC5sj_wHg5dCd-Jxuyxrvz89afbe2RbOTBsk-qm4VeO6iffEQ_gQSLxrv6uDlz_LMr1FRojYimJ9cWNa3esz84dNmVnrBSwcOkvjEtLsrVJqSp7v5xUYRiJVnP54Zzj7dbOJ2Hlm5KMCadFrxuquH0JtfFxffM_UXvmQUXrkSTlq8C2_zwmc_7QHnTO0sif6qVYMtxOWLG93A"
    },  
    {
      id: 7,
      name: "Nikhil updated {Split Title 7}",
      balance: -10.79,
      date: "2025-06-29",
      time: "03:00 PM",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx4E--EPUXctqy9Ii6qo4OLIdhL6Eby8eCIFQssEHfqQLS8UCfkkV4Uv4hQ2ooqpC5sj_wHg5dCd-Jxuyxrvz89afbe2RbOTBsk-qm4VeO6iffEQ_gQSLxrv6uDlz_LMr1FRojYimJ9cWNa3esz84dNmVnrBSwcOkvjEtLsrVJqSp7v5xUYRiJVnP54Zzj7dbOJ2Hlm5KMCadFrxuquH0JtfFxffM_UXvmQUXrkSTlq8C2_zwmc_7QHnTO0sif6qVYMtxOWLG93A"
    },      
    {
      id: 8,
      name: "Nikhil updated {Split Title 8}",
      balance: -10.79,
      date: "2025-06-29",
      time: "04:00 PM",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx4E--EPUXctqy9Ii6qo4OLIdhL6Eby8eCIFQssEHfqQLS8UCfkkV4Uv4hQ2ooqpC5sj_wHg5dCd-Jxuyxrvz89afbe2RbOTBsk-qm4VeO6iffEQ_gQSLxrv6uDlz_LMr1FRojYimJ9cWNa3esz84dNmVnrBSwcOkvjEtLsrVJqSp7v5xUYRiJVnP54Zzj7dbOJ2Hlm5KMCadFrxuquH0JtfFxffM_UXvmQUXrkSTlq8C2_zwmc_7QHnTO0sif6qVYMtxOWLG93A"
    },                  
    {
      id: 9,
      name: "Nikhil updated {Split Title 9}",
      balance: -10.79,
      date: "2025-06-29",
      time: "05:00 PM",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx4E--EPUXctqy9Ii6qo4OLIdhL6Eby8eCIFQssEHfqQLS8UCfkkV4Uv4hQ2ooqpC5sj_wHg5dCd-Jxuyxrvz89afbe2RbOTBsk-qm4VeO6iffEQ_gQSLxrv6uDlz_LMr1FRojYimJ9cWNa3esz84dNmVnrBSwcOkvjEtLsrVJqSp7v5xUYRiJVnP54Zzj7dbOJ2Hlm5KMCadFrxuquH0JtfFxffM_UXvmQUXrkSTlq8C2_zwmc_7QHnTO0sif6qVYMtxOWLG93A"
    },      
  ]);
  const [friends] = useState([
    {
      id: 1,
      name: "Nikhil",
      balance: -10.79,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx4E--EPUXctqy9Ii6qo4OLIdhL6Eby8eCIFQssEHfqQLS8UCfkkV4Uv4hQ2ooqpC5sj_wHg5dCd-Jxuyxrvz89afbe2RbOTBsk-qm4VeO6iffEQ_gQSLxrv6uDlz_LMr1FRojYimJ9cWNa3esz84dNmVnrBSwcOkvjEtLsrVJqSp7v5xUYRiJVnP54Zzj7dbOJ2Hlm5KMCadFrxuquH0JtfFxffM_UXvmQUXrkSTlq8C2_zwmc_7QHnTO0sif6qVYMtxOWLG93A"
    },
    {
      id: 2,
      name: "Rahul",
      balance: +18.79,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx4E--EPUXctqy9Ii6qo4OLIdhL6Eby8eCIFQssEHfqQLS8UCfkkV4Uv4hQ2ooqpC5sj_wHg5dCd-Jxuyxrvz89afbe2RbOTBsk-qm4VeO6iffEQ_gQSLxrv6uDlz_LMr1FRojYimJ9cWNa3esz84dNmVnrBSwcOkvjEtLsrVJqSp7v5xUYRiJVnP54Zzj7dbOJ2Hlm5KMCadFrxuquH0JtfFxffM_UXvmQUXrkSTlq8C2_zwmc_7QHnTO0sif6qVYMtxOWLG93A"
    },
    {
      id: 3,
      name: "Sachin",
      balance: +18.79,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx4E--EPUXctqy9Ii6qo4OLIdhL6Eby8eCIFQssEHfqQLS8UCfkkV4Uv4hQ2ooqpC5sj_wHg5dCd-Jxuyxrvz89afbe2RbOTBsk-qm4VeO6iffEQ_gQSLxrv6uDlz_LMr1FRojYimJ9cWNa3esz84dNmVnrBSwcOkvjEtLsrVJqSp7v5xUYRiJVnP54Zzj7dbOJ2Hlm5KMCadFrxuquH0JtfFxffM_UXvmQUXrkSTlq8C2_zwmc_7QHnTO0sif6qVYMtxOWLG93A"
    },
    {
      id: 4,
      name: "Rohit",
      balance: +18.79,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx4E--EPUXctqy9Ii6qo4OLIdhL6Eby8eCIFQssEHfqQLS8UCfkkV4Uv4hQ2ooqpC5sj_wHg5dCd-Jxuyxrvz89afbe2RbOTBsk-qm4VeO6iffEQ_gQSLxrv6uDlz_LMr1FRojYimJ9cWNa3esz84dNmVnrBSwcOkvjEtLsrVJqSp7v5xUYRiJVnP54Zzj7dbOJ2Hlm5KMCadFrxuquH0JtfFxffM_UXvmQUXrkSTlq8C2_zwmc_7QHnTO0sif6qVYMtxOWLG93A"
    },
    {
      id: 5,  
      name: "Virat",
      balance: +18.79,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx4E--EPUXctqy9Ii6qo4OLIdhL6Eby8eCIFQssEHfqQLS8UCfkkV4Uv4hQ2ooqpC5sj_wHg5dCd-Jxuyxrvz89afbe2RbOTBsk-qm4VeO6iffEQ_gQSLxrv6uDlz_LMr1FRojYimJ9cWNa3esz84dNmVnrBSwcOkvjEtLsrVJqSp7v5xUYRiJVnP54Zzj7dbOJ2Hlm5KMCadFrxuquH0JtfFxffM_UXvmQUXrkSTlq8C2_zwmc_7QHnTO0sif6qVYMtxOWLG93A"
    },
    {
      id: 6,
      name: "Rohit",
      balance: +18.79,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx4E--EPUXctqy9Ii6qo4OLIdhL6Eby8eCIFQssEHfqQLS8UCfkkV4Uv4hQ2ooqpC5sj_wHg5dCd-Jxuyxrvz89afbe2RbOTBsk-qm4VeO6iffEQ_gQSLxrv6uDlz_LMr1FRojYimJ9cWNa3esz84dNmVnrBSwcOkvjEtLsrVJqSp7v5xUYRiJVnP54Zzj7dbOJ2Hlm5KMCadFrxuquH0JtfFxffM_UXvmQUXrkSTlq8C2_zwmc_7QHnTO0sif6qVYMtxOWLG93A"
    },
  ]); // Will be fetched from database
  const { toast } = useToast();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setShowProfile(false);
      toast({
        title: "Logged out",
        description: "See you soon!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Logout failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  const handleBackToDashboard = () => {
    setShowProfile(false);
  };

  const handleCreateGroup = () => {
    toast({
      title: "Feature coming soon",
      description: "Group creation will be available soon!",
    });
  };

  const handleAddFriend = () => {
    toast({
      title: "Feature coming soon",
      description: "Friend management will be available soon!",
    });
  };

  const handleSeeAllFriends = () => {
    setFriendsModalOpen(true);
  };

  const handleSeeAllGroups = () => {
    setGroupsModalOpen(true);
  };

  const handleSeeAllActivity = () => {
    setActivityModalOpen(true);
  };

  const handleAddExpense = () => {
    setShowExpenseForm(true);
    toast({
      title: "Feature coming soon",
      description: "Add expense functionality will be available soon!",
    });
  };

  if (showProfile) {
    return <Profile onBack={handleBackToDashboard} />;
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{fontFamily: 'Manrope, "Noto Sans", sans-serif'}}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-4 sm:px-10 py-3">
          <div className="flex items-center gap-4 text-[#111418]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-[#111418] text-base sm:text-lg font-bold leading-tight tracking-[-0.015em]">SplitBills</h2>
          </div>
          <div className="flex flex-1 justify-end gap-4 sm:gap-8">
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f0f2f4] text-[#111418] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
              <Bell size={20} />
            </button>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 cursor-pointer"
              style={{
                backgroundImage: user?.photoURL 
                  ? `url("${user.photoURL}")` 
                  : 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuChzX9zz_-I7BeUnZmlWtawuWJsVkh6_Pbi5SP2poyxpiMV6u8-Rzvr-uxTEjAHiD0TGvQI1FNpS-T_7lg624pCeoFyBEkpUQyPk2cuTsKBxnGk6AAMakDjTb_ljyd2s18hH3qUb6gbod35H4zEb2ywee_Djnr68RHs1Rn0fm_Sq0GLymQ8U4jZAGqu_eFCGJFxSOd6miMUOWmh0RjvjVYFNsCK_SczpKJB48GZQsNNXgDjO0Tf6NEcDlH4JhW_RgV-3GoYFoCG0A")'
              }}
              onClick={handleProfileClick}
            />
          </div>
        </header>
        
        {/* Main Content */}
      <div className="flex flex-col lg:flex-row justify-center mt-4 lg:mt-15">
        <div className="flex flex-1">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 px-4 sm:px-8 md:px-16 lg:px-40 h-auto lg:h-[calc(100vh-120px)]">
            {/* Dashboard Header - Fixed */}
            <div className="flex flex-wrap justify-between gap-3 p-4 flex-shrink-0">
              <p className="text-[#111418] tracking-light text-xl sm:text-2xl lg:text-[32px] font-bold leading-tight">Dashboard</p>
              <button
                className="flex min-w-[60px] sm:min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-3 sm:px-4 bg-[#f0f2f4] text-[#111418] text-xs sm:text-sm font-medium leading-normal"
                onClick={handleCreateGroup}
              >
                <span className="truncate">Add</span>
              </button>
            </div>
            
            {/* Total Balance - Fixed */}
            <div className="flex-shrink-0">
              <h3 className="text-[#111418] text-base sm:text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Total balance</h3>
              <div className="flex items-center gap-4 bg-white px-4 min-h-14">
                <p className="text-[#111418] text-base font-normal leading-normal flex-1 truncate">
                  {totalBalance >= 0 ? `You are owed $${Math.abs(totalBalance)}` : `You owe $${Math.abs(totalBalance)}`}
                </p>
              </div>
            </div>
            
            {/* Your Friends Section - Fixed Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4 flex-shrink-0">
              <h3 className="text-[#111418] text-base sm:text-lg font-bold leading-tight tracking-[-0.015em]">Your Friends</h3>
              <button
                className="flex min-w-[70px] sm:min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-3 sm:px-4 bg-[#f0f2f4] text-[#111418] text-xs sm:text-sm font-medium leading-normal"
                onClick={handleSeeAllFriends}
              >
                <span className="truncate">See All</span>
              </button>
            </div>
            
            {/* Scrollable Friends Content Area */}
            <div className="flex-1 lg:overflow-y-auto px-4 max-h-64 lg:max-h-none">
              {recentActivity.length === 0 ? (
                <div className="flex items-center gap-3 sm:gap-4 bg-white px-3 sm:px-4 min-h-[60px] sm:min-h-[72px] py-2">
                  <div className="flex flex-col justify-center flex-1">
                    <p className="text-[#637488] text-sm sm:text-base font-normal leading-normal">No friends yet</p>
                    <p className="text-[#637488] text-xs sm:text-sm font-normal leading-normal">Add friends to start splitting expenses</p>
                  </div>
                </div>
              ) : (
                friends.map((group) => (
                  <div key={group.id} className="flex items-center gap-3 sm:gap-4 bg-white px-3 sm:px-4 min-h-[60px] sm:min-h-[72px] py-2 hover:bg-[#f8f9fa] cursor-pointer transition-colors border-b border-[#f0f2f4] last:border-b-0">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 sm:size-14 flex-shrink-0 cursor-pointer"
                      style={{backgroundImage: `url("${group.image}")`}}
                    />
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <p className="text-[#111418] text-sm sm:text-base font-medium leading-normal line-clamp-1">{group.name}</p>
                      <p className="text-[#637488] text-xs sm:text-sm font-normal leading-normal line-clamp-2">
                        {group.balance >= 0 ? `You are owed $${Math.abs(group.balance)}` : `You owe $${Math.abs(group.balance)}`}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* Your Groups Section - Fixed Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4 flex-shrink-0">
              <h3 className="text-[#111418] text-base sm:text-lg font-bold leading-tight tracking-[-0.015em]">Your groups</h3>
              <button
                className="flex min-w-[70px] sm:min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-3 sm:px-4 bg-[#f0f2f4] text-[#111418] text-xs sm:text-sm font-medium leading-normal"
                onClick={handleSeeAllGroups}
              >
                <span className="truncate">See All</span>
              </button>
            </div>
            
            {/* Scrollable Groups Content Area */}
            <div className="flex-1 lg:overflow-y-auto px-4 max-h-64 lg:max-h-none">
              {recentActivity.length === 0 ? (
                <div className="flex items-center gap-3 sm:gap-4 bg-white px-3 sm:px-4 min-h-[60px] sm:min-h-[72px] py-2">
                  <div className="flex flex-col justify-center flex-1">
                    <p className="text-[#637488] text-sm sm:text-base font-normal leading-normal">No groups yet</p>
                    <p className="text-[#637488] text-xs sm:text-sm font-normal leading-normal">Create your first group to start splitting expenses</p>
                  </div>
                </div>
              ) : (
                yourGroups.map((group) => (
                  <div key={group.id} className="flex items-center gap-3 sm:gap-4 bg-white px-3 sm:px-4 min-h-[60px] sm:min-h-[72px] py-2 hover:bg-[#f8f9fa] cursor-pointer transition-colors border-b border-[#f0f2f4] last:border-b-0">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-12 sm:size-14 flex-shrink-0"
                      style={{backgroundImage: `url("${group.image}")`}}
                                          />
                      <div className="flex flex-col justify-center flex-1 min-w-0">
                        <p className="text-[#111418] text-sm sm:text-base font-medium leading-normal line-clamp-1">{group.name}</p>
                        <p className="text-[#637488] text-xs sm:text-sm font-normal leading-normal line-clamp-2">
                          {group.balance >= 0 ? `You are owed $${Math.abs(group.balance)}` : `You owe $${Math.abs(group.balance)}`}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
    
              
            </div>
          </div>
        <div className="flex flex-1">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 px-4 sm:px-8 md:px-16 lg:px-40 h-auto lg:h-[calc(100vh-120px)]">
            {/* Recent Activity Header - Fixed */}
            <div className="flex flex-wrap justify-between gap-3 p-4 flex-shrink-0">
              <p className="text-[#111418] tracking-light text-xl sm:text-2xl lg:text-[32px] font-bold leading-tight">Recent Activity</p>
              <button
                className="flex min-w-[70px] sm:min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-3 sm:px-4 bg-[#f0f2f4] text-[#111418] text-xs sm:text-sm font-medium leading-normal"
                onClick={handleSeeAllActivity}
              >
                <span className="truncate">See All</span>
              </button>
            </div>
            
            {/* Scrollable Recent Activity Content Area */}
            <div className="flex-1 lg:overflow-y-auto px-4 max-h-96 lg:max-h-none">
              {recentActivity.length === 0 ? (
                <div className="flex items-center gap-3 sm:gap-4 bg-white px-3 sm:px-4 min-h-[60px] sm:min-h-[72px] py-2">
                  <div className="flex flex-col justify-center flex-1">
                    <p className="text-[#637488] text-sm sm:text-base font-normal leading-normal">No recent activity</p>
                    <p className="text-[#637488] text-xs sm:text-sm font-normal leading-normal">Your expense activity will appear here</p>
                  </div>
                </div>
              ) : (
                recentActivity.map((group) => (
                  <div key={group.id} className="flex items-center gap-3 sm:gap-4 bg-white px-3 sm:px-4 min-h-[60px] sm:min-h-[72px] py-2 hover:bg-[#f8f9fa] cursor-pointer transition-colors border-b border-[#f0f2f4] last:border-b-0">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-12 sm:size-14 flex-shrink-0"
                      style={{backgroundImage: `url("${group.image}")`}}
                    />
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <p className="text-[#111418] text-sm sm:text-base font-medium leading-normal line-clamp-1">{group.name}</p>
                      <p className="text-[#637488] text-xs sm:text-sm font-normal leading-normal line-clamp-2">
                        {group.balance >= 0 ? `You are owed $${Math.abs(group.balance)}` : `You owe $${Math.abs(group.balance)}`}
                      </p>
                      <p className="text-[#637488] text-xs font-normal leading-normal line-clamp-1">
                        {group.date}, {group.time}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
        </div>
      </div>
      
      {/* Modals */}
      <DataModal
        isOpen={friendsModalOpen}
        onOpenChange={setFriendsModalOpen}
        title="All Friends"
        data={friends}
        emptyTitle="No friends yet"
        emptyDescription="Add friends to start splitting expenses"
        type="friends"
      />

      <DataModal
        isOpen={groupsModalOpen}
        onOpenChange={setGroupsModalOpen}
        title="All Groups"
        data={yourGroups}
        emptyTitle="No groups yet"
        emptyDescription="Create your first group to start splitting expenses"
        type="groups"
      />

      <DataModal
        isOpen={activityModalOpen}
        onOpenChange={setActivityModalOpen}
        title="All Recent Activity"
        data={recentActivity}
        emptyTitle="No recent activity"
        emptyDescription="Your expense activity will appear here"
        type="activity"
      />
    </div>
  );
};

export default Dashboard; 