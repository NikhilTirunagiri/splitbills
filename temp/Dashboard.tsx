import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, User, Activity, DollarSign, LogOut } from "lucide-react";
import { ExpenseForm } from "@/components/ExpenseForm";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [totalBalance] = useState(0); // Will be calculated from real data
  const [groups] = useState([]); // Will be fetched from database
  const [friends] = useState([]); // Will be fetched from database
  const [recentActivity] = useState([]); // Will be fetched from database
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        throw error;
      }
      toast({
        title: "Logged out",
        description: "See you soon!",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Logout failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCreateGroup = () => {
    // TODO: Implement group creation
    console.log("Creating new group...");
    toast({
      title: "Feature coming soon",
      description: "Group creation will be available soon!",
    });
  };

  const handleAddFriend = () => {
    // TODO: Implement friend addition
    console.log("Adding friend...");
    toast({
      title: "Feature coming soon",
      description: "Friend management will be available soon!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header onAddExpense={() => setShowExpenseForm(true)} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Message */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}!
          </h1>
          <p className="text-slate-600">Manage your expenses and split bills with friends.</p>
        </div>

        {/* Balance Overview */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">Your Overall Balance</p>
                  <p className="text-3xl font-bold">
                    {totalBalance >= 0 ? '+' : ''}${Math.abs(totalBalance).toFixed(2)}
                  </p>
                  <p className="text-emerald-200 text-sm mt-1">
                    {totalBalance >= 0 ? 'You are owed' : 'You owe'}
                  </p>
                </div>
                <DollarSign className="h-12 w-12 text-emerald-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Groups */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-emerald-600" />
                  Groups
                </CardTitle>
                <Button variant="outline" size="sm" onClick={handleCreateGroup}>
                  <Plus className="h-4 w-4 mr-1" />
                  New Group
                </Button>
              </CardHeader>
              <CardContent>
                {groups.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 text-sm">No groups yet</p>
                    <p className="text-slate-400 text-xs mt-1">Create your first group to start splitting expenses</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {groups.map((group: any) => (
                      <div key={group.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                        <div>
                          <p className="font-medium text-slate-900">{group.name}</p>
                          <p className="text-sm text-slate-500">{group.members} members</p>
                        </div>
                        <Badge variant="secondary">
                          ${Math.abs(group.balance || 0).toFixed(2)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Friends */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-emerald-600" />
                  Friends
                </CardTitle>
                <Button variant="outline" size="sm" onClick={handleAddFriend}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Friend
                </Button>
              </CardHeader>
              <CardContent>
                {friends.length === 0 ? (
                  <div className="text-center py-8">
                    <User className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 text-sm">No friends added yet</p>
                    <p className="text-slate-400 text-xs mt-1">Add friends to split expenses with them</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {friends.map((friend: any) => (
                      <div key={friend.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-medium">
                            {friend.name.charAt(0)}
                          </div>
                          <p className="font-medium text-slate-900">{friend.name}</p>
                        </div>
                        <Badge variant="secondary">
                          ${Math.abs(friend.balance || 0).toFixed(2)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div>
            {/* Recent Activity */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-emerald-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentActivity.length === 0 ? (
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 text-sm">No recent activity</p>
                    <p className="text-slate-400 text-xs mt-1">Your expense activity will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentActivity.map((activity: any) => (
                      <div key={activity.id} className="border-l-2 border-slate-200 pl-4 pb-4">
                        <p className="text-sm text-slate-900 font-medium mb-1">
                          {activity.action}
                        </p>
                        <p className={`text-sm font-medium mb-1 ${activity.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {activity.amount >= 0 ? '+' : ''}${Math.abs(activity.amount).toFixed(2)}
                        </p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Expense Form Modal */}
      {showExpenseForm && (
        <ExpenseForm onClose={() => setShowExpenseForm(false)} />
      )}
    </div>
  );
};

export default Dashboard;
