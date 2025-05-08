
import { useState } from "react";
import { Plus, ShieldCheck, ShieldAlert, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { mockGuardrails } from "@/data/mockData";

const typeInfo = {
  content: {
    label: "Content",
    icon: Shield,
    style: "bg-purple-100 text-purple-800"
  },
  security: {
    label: "Security",
    icon: ShieldCheck,
    style: "bg-green-100 text-green-800"
  },
  compliance: {
    label: "Compliance",
    icon: ShieldAlert,
    style: "bg-blue-100 text-blue-800"
  },
};

const Guardrails = () => {
  const [guardrails, setGuardrails] = useState(mockGuardrails);
  const { toast } = useToast();

  const handleNewGuardrail = () => {
    toast({
      title: "Coming Soon",
      description: "New guardrail creation will be available soon.",
    });
  };

  const toggleGuardrail = (id: string) => {
    setGuardrails(guardrails.map(guardrail => 
      guardrail.id === id 
        ? { ...guardrail, enabled: !guardrail.enabled }
        : guardrail
    ));

    toast({
      title: "Guardrail Updated",
      description: "The guardrail settings have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Guardrails</h2>
          <p className="text-muted-foreground">
            Manage security, content, and compliance controls.
          </p>
        </div>
        <Button onClick={handleNewGuardrail}>
          <Plus className="mr-2 h-4 w-4" /> Add Guardrail
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guardrails.map((guardrail) => {
          const type = typeInfo[guardrail.type] || typeInfo.content;
          const GuardrailIcon = type.icon;
          return (
            <Card key={guardrail.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <GuardrailIcon className="mr-2 h-5 w-5" />
                    {guardrail.name}
                  </CardTitle>
                  <Switch
                    checked={guardrail.enabled}
                    onCheckedChange={() => toggleGuardrail(guardrail.id)}
                  />
                </div>
                <CardDescription>{guardrail.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-3 flex gap-2 flex-wrap">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${type.style}`}>
                    {type.label}
                  </span>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-muted`}>
                    {guardrail.rules.length} rules active
                  </span>
                </div>
                <div className="mt-4">
                  <ul className="space-y-1 ml-4 list-disc">
                    {guardrail.rules.map(rule => (
                      <li key={rule.id} className="text-xs">{rule.name}: <span className="text-muted-foreground">{rule.description}</span></li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Guardrails;
