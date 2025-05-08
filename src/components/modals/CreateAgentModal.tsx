
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockModels, mockVectorDBs, mockIntegrations } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

interface CreateAgentModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: (agent: any) => void;
}
export default function CreateAgentModal({ open, onClose, onCreated }: CreateAgentModalProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    description: "",
    model: "",
    vectorDb: "",
    integration: "",
  });
  const { toast } = useToast();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleCreate = () => {
    onCreated({
      ...form,
      id: Math.random().toString(36).substring(2),
      status: "active"
    });
    toast({
      title: "Agent Created",
      description: `Agent "${form.name}" was created.`,
    });
    setForm({ name: "", description: "", model: "", vectorDb: "", integration: "" });
    setStep(1);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Agent</DialogTitle>
        </DialogHeader>
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Agent Name</Label>
              <Input id="name" name="name" value={form.name} onChange={handleInput} placeholder="E.g. Customer Support Bot" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" value={form.description} onChange={handleInput} placeholder="What does this agent do?" />
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleNext} disabled={!form.name}>Next</Button>
            </DialogFooter>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label>Assign a Model</Label>
              <Select value={form.model} onValueChange={v => handleSelect("model", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {mockModels.map(model => (
                    <SelectItem value={model.name} key={model.id}>{model.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Select VectorDB</Label>
              <Select value={form.vectorDb} onValueChange={v => handleSelect("vectorDb", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vector db" />
                </SelectTrigger>
                <SelectContent>
                  {mockVectorDBs.map(db => (
                    <SelectItem value={db.name} key={db.id}>{db.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={handleBack}>Back</Button>
              <Button type="button" onClick={handleNext} disabled={!form.model || !form.vectorDb}>Next</Button>
            </DialogFooter>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <Label>Attach Integration (optional)</Label>
              <Select value={form.integration} onValueChange={v => handleSelect("integration", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select integration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {mockIntegrations.map(integ => (
                    <SelectItem value={integ.name} key={integ.id}>{integ.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={handleBack}>Back</Button>
              <Button type="submit" onClick={handleCreate} disabled={!form.name || !form.model || !form.vectorDb}>Create Agent</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
