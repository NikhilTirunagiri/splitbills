
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { X, Users, User, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExpenseFormProps {
  onClose: () => void;
}

export const ExpenseForm = ({ onClose }: ExpenseFormProps) => {
  const [expenseType, setExpenseType] = useState<"individual" | "group">("individual");
  const [splitType, setSplitType] = useState("equal");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Mock friends data - in real app, this would be fetched from database
  const friends = [
    { id: "1", name: "Alex", avatar: "A" },
    { id: "2", name: "Sarah", avatar: "S" },
    { id: "3", name: "Mike", avatar: "M" },
    { id: "4", name: "Emma", avatar: "E" }
  ];

  const toggleFriend = (friendId: string) => {
    setSelectedFriends(prev => 
      prev.includes(friendId) 
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description || !amount || selectedFriends.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and select participants.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // TODO: Implement actual expense creation
      const expenseData = {
        type: expenseType,
        description,
        amount: parseFloat(amount),
        participants: selectedFriends,
        splitType,
        date: new Date().toISOString(),
      };

      console.log("Creating expense:", expenseData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Expense added",
        description: `${description} for $${amount} has been recorded.`,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add expense. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-600" />
            Add Expense
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Individual/Group Toggle */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant={expenseType === "individual" ? "default" : "outline"}
                onClick={() => setExpenseType("individual")}
                className={expenseType === "individual" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
              >
                <User className="h-4 w-4 mr-2" />
                Individual
              </Button>
              <Button
                type="button"
                variant={expenseType === "group" ? "default" : "outline"}
                onClick={() => setExpenseType("group")}
                className={expenseType === "group" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
              >
                <Users className="h-4 w-4 mr-2" />
                Group
              </Button>
            </div>

            {/* Basic Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Input
                  id="description"
                  placeholder="What was this expense for?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($) *</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Participants */}
            <div className="space-y-3">
              <Label>Participants *</Label>
              <div className="grid grid-cols-2 gap-2">
                {friends.map((friend) => (
                  <div
                    key={friend.id}
                    onClick={() => toggleFriend(friend.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedFriends.includes(friend.id)
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {friend.avatar}
                    </div>
                    <span className="text-sm font-medium">{friend.name}</span>
                    {selectedFriends.includes(friend.id) && (
                      <Badge className="ml-auto bg-emerald-600">Selected</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Split Type */}
            {selectedFriends.length > 0 && (
              <div className="space-y-3">
                <Label>How to split?</Label>
                <Tabs value={splitType} onValueChange={setSplitType}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="equal">Equal</TabsTrigger>
                    <TabsTrigger value="percentage">Percentage</TabsTrigger>
                    <TabsTrigger value="exact">Exact Amounts</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="equal" className="mt-4">
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-600">
                        Split equally among {selectedFriends.length + 1} people
                      </p>
                      {amount && (
                        <p className="text-lg font-medium text-slate-900 mt-2">
                          ${(parseFloat(amount) / (selectedFriends.length + 1)).toFixed(2)} per person
                        </p>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="percentage" className="mt-4">
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-500">Percentage split coming soon</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="exact" className="mt-4">
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-500">Exact amounts coming soon</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                type="submit"
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                disabled={loading || !description || !amount || selectedFriends.length === 0}
              >
                {loading ? "Adding..." : "Add Expense"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
