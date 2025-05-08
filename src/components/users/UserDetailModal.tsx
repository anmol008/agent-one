
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface UserDetailModalProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
    status?: string;
    lastActive?: string;
  } | null;
  open: boolean;
  onClose: () => void;
}
export default function UserDetailModal({ user, open, onClose }: UserDetailModalProps) {
  if (!user) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 items-center">
          {user.avatar && (
            <img src={user.avatar} className="w-16 h-16 rounded-full object-cover" alt="User avatar"/>
          )}
          <div>
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <span className="text-xs inline-block mt-1 px-2 py-1 bg-accent rounded">{user.role}</span>
          </div>
        </div>
        <div className="mt-4">
          {user.status && (
            <div>
              <Label>Status: </Label>
              <span className={"ml-2 font-medium " + (user.status === "active" ? "text-green-600" : "text-red-600")}>{user.status}</span>
            </div>
          )}
          {user.lastActive && (
            <div>
              <Label>Last Active: </Label>
              <span className="ml-2">{new Date(user.lastActive).toLocaleString()}</span>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
