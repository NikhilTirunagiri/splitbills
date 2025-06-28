
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, User, Activity, DollarSign } from "lucide-react";
import { ExpenseForm } from "@/components/ExpenseForm";
import { Header } from "@/components/Header";

const Index = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  // Mock data for demonstration
  const totalBalance = -24.50;
  const groups = [
    { id: 1, name: "Weekend Trip", balance: -45.20, members: 4 },
    { id: 2, name: "Roommates", balance: 12.80, members: 3 },
    { id: 3, name: "Dinner Club", balance: -8.15, members: 6 }
  ];

  const friends = [
    { id: 1, name: "Alex", balance: 15.50, avatar: "A" },
    { id: 2, name: "Sarah", balance: -23.75, avatar: "S" },
    { id: 3, name: "Mike", balance: 8.25, avatar: "M" },
    { id: 4, name: "Emma", balance: -12.40, avatar: "E" }
  ];

  const recentActivity = [
    { id: 1, action: "You added 'Dinner at Mario's' to Weekend Trip", amount: -18.50, time: "2 hours ago" },
    { id: 2, action: "Sarah settled up $25.00", amount: 25.00, time: "1 day ago" },
    { id: 3, action: "Mike added 'Groceries' to Roommates", amount: -12.30, time: "2 days ago" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header onAddExpense={() => setShowExpenseForm(true)} />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
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
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  New Group
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {groups.map((group) => (
                  <div key={group.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                    <div>
                      <p className="font-medium text-slate-900">{group.name}</p>
                      <p className="text-sm text-slate-500">{group.members} members</p>
                    </div>
                    <Badge 
                      variant={group.balance >= 0 ? "default" : "secondary"}
                      className={group.balance >= 0 ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-red-100 text-red-700 hover:bg-red-100"}
                    >
                      {group.balance >= 0 ? '+' : ''}${Math.abs(group.balance).toFixed(2)}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Friends */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-emerald-600" />
                  Friends
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {friends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-medium">
                        {friend.avatar}
                      </div>
                      <p className="font-medium text-slate-900">{friend.name}</p>
                    </div>
                    <Badge 
                      variant={friend.balance >= 0 ? "default" : "secondary"}
                      className={friend.balance >= 0 ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-red-100 text-red-700 hover:bg-red-100"}
                    >
                      {friend.balance >= 0 ? 'owes you' : 'you owe'} ${Math.abs(friend.balance).toFixed(2)}
                    </Badge>
                  </div>
                ))}
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
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
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

export default Index;
