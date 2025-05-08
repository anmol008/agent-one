
import { useState } from "react";
import { Plus, Plug, Database, Link, Mail, Slack, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { mockIntegrations } from "@/data/mockData";

// Map integration type to icon
const typeIcon = {
  data: Database,
  api: Link,
  tool: Plug,
  service: Mail,
};

const statusStyle = enabled => enabled ? "text-green-500" : "text-red-500";

const Integrations = () => {
  const [integrations] = useState(mockIntegrations);
  const { toast } = useToast();

  const handleNewIntegration = () => {
    toast({
      title: "Coming Soon",
      description: "New integration creation will be available soon.",
    });
  };

  const handleToggle = (id) => {
    toast({
      title: "Integration Toggled",
      description: "This would connect/disconnect in a real app.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Integrations</h2>
          <p className="text-muted-foreground">
            Manage your data connections and API integrations.
          </p>
        </div>
        <Button onClick={handleNewIntegration}>
          <Plus className="mr-2 h-4 w-4" /> Add Integration
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => {
          const Icon = typeIcon[integration.type] || Plug;
          return (
            <Card key={integration.id}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-accent" />
                  <CardTitle>{integration.name}</CardTitle>
                </div>
                <CardDescription>{integration.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="capitalize">{integration.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Provider</span>
                    <span>{integration.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Auth Type</span>
                    <span>{integration.authType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className={integration.enabled ? "text-green-500" : "text-red-500"}>
                      {integration.enabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <Button className="w-full mt-4" variant={integration.enabled ? "destructive" : "default"} onClick={() => handleToggle(integration.id)}>
                    {integration.enabled ? "Disconnect" : "Connect"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Integrations;
