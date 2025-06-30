'use client';

import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Bell, DollarSign, Globe, UserPlus, HelpCircle, ArrowLeft } from "lucide-react";

interface ProfileProps {
  onBack?: () => void;
}

const Profile = ({ onBack }: ProfileProps) => {
  const { toast } = useToast();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
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

  const handleSettingClick = (setting: string) => {
    toast({
      title: "Feature coming soon",
      description: `${setting} will be available soon!`,
    });
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{fontFamily: 'Manrope, "Noto Sans", sans-serif'}}>
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-4 sm:px-10 py-3">
          <div className="flex items-center gap-4 text-[#111418]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
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
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage: user?.photoURL 
                  ? `url("${user.photoURL}")` 
                  : 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAMayvoh85TWyo20W0dYlm0Oy52Mboxm80gva1fwydgm0nN6jw8U6kJcJXpUUC7JDKgH_zV5SscsMk1iUduzHhlG50-cBb214psFR_hdBZ6Qd9BBSFVeuNGx0CXGiGsHZx5lBDVluLm3o54nXALukiEQTwkYCTL6Nlj3xMnWtIzGaAUWl28DQwHcZoRTv80Cc3uWatKnbOCo-P_0gKO5Zglbw3S_ACOJTJNkk3lEtAGfgBy0-mQfRMZmq4sHDQc4bbLiLa2J87NBw")'
              }}
            />
          </div>
        </header>
        
        <div className="px-4 sm:px-8 md:px-16 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex p-4">
              <div className="flex w-full flex-col gap-4 items-center">
                <div className="flex gap-4 flex-col items-center">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
                    style={{
                      backgroundImage: user?.photoURL 
                        ? `url("${user.photoURL}")` 
                        : 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAMayvoh85TWyo20W0dYlm0Oy52Mboxm80gva1fwydgm0nN6jw8U6kJcJXpUUC7JDKgH_zV5SscsMk1iUduzHhlG50-cBb214psFR_hdBZ6Qd9BBSFVeuNGx0CXGiGsHZx5lBDVluLm3o54nXALukiEQTwkYCTL6Nlj3xMnWtIzGaAUWl28DQwHcZoRTv80Cc3uWatKnbOCo-P_0gKO5Zglbw3S_ACOJTJNkk3lEtAGfgBy0-mQfRMZmq4sHDQc4bbLiLa2J87NBw")'
                    }}
                  />
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-[#111418] text-lg sm:text-xl md:text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">
                      {user?.displayName || "User Name"}
                    </p>
                    <p className="text-[#637488] text-sm sm:text-base font-normal leading-normal text-center">
                      {user?.email || "user@email.com"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-[#111418] text-lg sm:text-xl md:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Your balance</h2>
            <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
              <div className="text-[#111418] flex items-center justify-center rounded-lg bg-[#f0f2f4] shrink-0 size-12">
                <DollarSign size={24} />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[#111418] text-sm sm:text-base font-medium leading-normal line-clamp-1">Total balance</p>
                <p className="text-[#637488] text-xs sm:text-sm font-normal leading-normal line-clamp-2">You owe $100</p>
              </div>
            </div>

            <h2 className="text-[#111418] text-lg sm:text-xl md:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Settings</h2>
            
            <button 
              className="flex items-center gap-4 bg-white px-4 min-h-14 hover:bg-[#f8f9fa] transition-colors cursor-pointer"
              onClick={() => handleSettingClick("Notifications")}
            >
              <div className="text-[#111418] flex items-center justify-center rounded-lg bg-[#f0f2f4] shrink-0 size-10">
                <Bell size={24} />
              </div>
              <p className="text-[#111418] text-sm sm:text-base font-normal leading-normal truncate">Notifications</p>
            </button>

            <button 
              className="flex items-center gap-4 bg-white px-4 min-h-14 hover:bg-[#f8f9fa] transition-colors cursor-pointer"
              onClick={() => handleSettingClick("Currency")}
            >
              <div className="text-[#111418] flex items-center justify-center rounded-lg bg-[#f0f2f4] shrink-0 size-10">
                <DollarSign size={24} />
              </div>
              <p className="text-[#111418] text-sm sm:text-base font-normal leading-normal truncate">Currency</p>
            </button>

            <button 
              className="flex items-center gap-4 bg-white px-4 min-h-14 hover:bg-[#f8f9fa] transition-colors cursor-pointer"
              onClick={() => handleSettingClick("Language")}
            >
              <div className="text-[#111418] flex items-center justify-center rounded-lg bg-[#f0f2f4] shrink-0 size-10">
                <Globe size={24} />
              </div>
              <p className="text-[#111418] text-sm sm:text-base font-normal leading-normal truncate">Language</p>
            </button>

            <button 
              className="flex items-center gap-4 bg-white px-4 min-h-14 hover:bg-[#f8f9fa] transition-colors cursor-pointer"
              onClick={() => handleSettingClick("Invite friends")}
            >
              <div className="text-[#111418] flex items-center justify-center rounded-lg bg-[#f0f2f4] shrink-0 size-10">
                <UserPlus size={24} />
              </div>
              <p className="text-[#111418] text-sm sm:text-base font-normal leading-normal truncate">Invite friends</p>
            </button>

            <button 
              className="flex items-center gap-4 bg-white px-4 min-h-14 hover:bg-[#f8f9fa] transition-colors cursor-pointer"
              onClick={() => handleSettingClick("Help")}
            >
              <div className="text-[#111418] flex items-center justify-center rounded-lg bg-[#f0f2f4] shrink-0 size-10">
                <HelpCircle size={24} />
              </div>
              <p className="text-[#111418] text-sm sm:text-base font-normal leading-normal truncate">Help</p>
            </button>

            <button 
              className="flex items-center gap-4 bg-white px-4 min-h-14 hover:bg-[#f8f9fa] transition-colors cursor-pointer"
              onClick={onBack}
            >
              <div className="text-[#111418] flex items-center justify-center rounded-lg bg-[#f0f2f4] shrink-0 size-10">
                <ArrowLeft size={24} />
              </div>
              <p className="text-[#111418] text-sm sm:text-base font-normal leading-normal truncate">Back to Dashboard</p>
            </button>

            <button 
              className="flex items-center gap-4 bg-white px-4 min-h-14 hover:bg-red-50 transition-colors cursor-pointer border-t border-[#f0f2f4] mt-4"
              onClick={handleLogout}
            >
              <div className="text-red-600 flex items-center justify-center rounded-lg bg-red-100 shrink-0 size-10">
                <ArrowLeft size={24} />
              </div>
              <p className="text-red-600 text-sm sm:text-base font-normal leading-normal truncate">Log out</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 