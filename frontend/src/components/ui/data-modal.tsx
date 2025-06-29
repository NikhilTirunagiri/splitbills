import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface DataItem {
  id: number;
  name: string;
  balance: number;
  image: string;
  date?: string;
  time?: string;
}

interface DataModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  data: DataItem[];
  emptyTitle: string;
  emptyDescription: string;
  type: 'friends' | 'groups' | 'activity';
}

export const DataModal = ({
  isOpen,
  onOpenChange,
  title,
  data,
  emptyTitle,
  emptyDescription,
  type
}: DataModalProps) => {
  const getImageStyles = (type: string) => {
    switch (type) {
      case 'friends':
        return "bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 flex-shrink-0";
      case 'groups':
      case 'activity':
      default:
        return "bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-12 flex-shrink-0";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          {data.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-center">
              <p className="text-[#637488] text-base font-normal">{emptyTitle}</p>
              <p className="text-[#637488] text-sm font-normal">{emptyDescription}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {data.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-[#f8f9fa] cursor-pointer transition-colors border border-[#f0f2f4]">
                  <div
                    className={getImageStyles(type)}
                    style={{backgroundImage: `url("${item.image}")`}}
                  />
                  <div className="flex flex-col justify-center flex-1">
                    <p className="text-[#111418] text-base font-medium">{item.name}</p>
                    <p className="text-[#637488] text-sm">
                      {item.balance >= 0 ? `You are owed $${Math.abs(item.balance)}` : `You owe $${Math.abs(item.balance)}`}
                    </p>
                    {type === 'activity' && item.date && item.time && (
                      <p className="text-[#637488] text-xs">
                        {item.date}, {item.time}
                      </p>
                    )}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.balance >= 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.balance >= 0 ? '+' : ''}${Math.abs(item.balance)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}; 