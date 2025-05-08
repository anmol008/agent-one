
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Cpu, Database, Plus, Search, Filter, Settings, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockModels, mockVectorDBs } from "@/data/mockData";
import { Model, VectorDB, ModelSize, ModelType } from "@/types";

const Models = () => {
  const [activeTab, setActiveTab] = useState("models");
  const [modelSearchQuery, setModelSearchQuery] = useState("");
  const [modelTypeFilter, setModelTypeFilter] = useState<ModelType | "all">("all");
  const [modelSizeFilter, setModelSizeFilter] = useState<ModelSize | "all">("all");
  const [dbSearchQuery, setDbSearchQuery] = useState("");
  
  // Filter models based on search query and filters
  const filteredModels = mockModels.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(modelSearchQuery.toLowerCase()) || 
                          model.description.toLowerCase().includes(modelSearchQuery.toLowerCase()) ||
                          model.provider.toLowerCase().includes(modelSearchQuery.toLowerCase());
    const matchesType = modelTypeFilter === "all" || model.type === modelTypeFilter;
    const matchesSize = modelSizeFilter === "all" || model.size === modelSizeFilter;
    
    return matchesSearch && matchesType && matchesSize;
  });
  
  // Filter vector DBs based on search query
  const filteredVectorDBs = mockVectorDBs.filter(db => {
    return db.name.toLowerCase().includes(dbSearchQuery.toLowerCase()) || 
          db.description.toLowerCase().includes(dbSearchQuery.toLowerCase()) ||
          db.provider.toLowerCase().includes(dbSearchQuery.toLowerCase());
  });
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Models & Databases</h1>
          <p className="text-muted-foreground">
            Manage foundation models and vector databases
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Database className="mr-2 h-4 w-4" /> Add Database
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Vector Database</DialogTitle>
                <DialogDescription>
                  Configure a new vector database connection
                </DialogDescription>
              </DialogHeader>
              {/* Form content would go here */}
              <div className="py-6">
                <p className="text-sm text-muted-foreground text-center">
                  Database configuration UI coming soon...
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Add Database</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Model
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New AI Model</DialogTitle>
                <DialogDescription>
                  Register a new foundation model
                </DialogDescription>
              </DialogHeader>
              {/* Form content would go here */}
              <div className="py-6">
                <p className="text-sm text-muted-foreground text-center">
                  Model registration UI coming soon...
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Add Model</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Tabs defaultValue="models" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="models">AI Models</TabsTrigger>
          <TabsTrigger value="databases">Vector Databases</TabsTrigger>
        </TabsList>
        
        <TabsContent value="models" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search models..."
                className="pl-8"
                value={modelSearchQuery}
                onChange={(e) => setModelSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline"
                size="sm"
                className="flex gap-1.5 items-center"
              >
                <Filter className="h-3.5 w-3.5" />
                <span>Type:</span>
                <select 
                  className="bg-transparent border-none focus:outline-none text-primary"
                  value={modelTypeFilter}
                  onChange={(e) => setModelTypeFilter(e.target.value as ModelType | "all")}
                >
                  <option value="all">All</option>
                  <option value="language">Language</option>
                  <option value="vision">Vision</option>
                  <option value="multi-modal">Multi-modal</option>
                </select>
              </Button>
              
              <Button 
                variant="outline"
                size="sm"
                className="flex gap-1.5 items-center"
              >
                <Filter className="h-3.5 w-3.5" />
                <span>Size:</span>
                <select 
                  className="bg-transparent border-none focus:outline-none text-primary"
                  value={modelSizeFilter}
                  onChange={(e) => setModelSizeFilter(e.target.value as ModelSize | "all")}
                >
                  <option value="all">All</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredModels.length > 0 ? (
              filteredModels.map((model) => (
                <ModelCard key={model.id} model={model} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <Cpu className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No models found</h3>
                <p className="text-muted-foreground mt-1 mb-4">
                  No models match your current filters. Try adjusting your search or add a new model.
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add New Model
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="databases" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vector databases..."
                className="pl-8"
                value={dbSearchQuery}
                onChange={(e) => setDbSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVectorDBs.length > 0 ? (
              filteredVectorDBs.map((db) => (
                <VectorDBCard key={db.id} db={db} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <Database className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No databases found</h3>
                <p className="text-muted-foreground mt-1 mb-4">
                  No vector databases match your search. Try adjusting your search or add a new database.
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add New Database
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ModelCardProps {
  model: Model;
}

const ModelCard = ({ model }: ModelCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{model.name}</CardTitle>
            <CardDescription>{model.description}</CardDescription>
          </div>
          <Badge variant="outline" className={cn(
            model.type === "language" ? "bg-blue-50 text-blue-700 border-blue-200" :
            model.type === "vision" ? "bg-green-50 text-green-700 border-green-200" :
            "bg-purple-50 text-purple-700 border-purple-200"
          )}>
            {model.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Provider</span>
            <span className="text-sm font-medium">{model.provider}</span>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Parameters</span>
              <span className="text-sm font-medium">
                {model.parameters >= 1_000_000_000 
                  ? `${(model.parameters / 1_000_000_000).toFixed(1)}B` 
                  : `${(model.parameters / 1_000_000).toFixed(0)}M`}
              </span>
            </div>
            <Progress value={
              model.parameters >= 70_000_000_000 ? 100 :
              model.parameters >= 7_000_000_000 ? 60 :
              30
            } className="h-1.5" />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Context Window</span>
              <span className="text-sm font-medium">{model.contextWindow.toLocaleString()} tokens</span>
            </div>
            <Progress value={
              model.contextWindow >= 32768 ? 100 :
              model.contextWindow >= 8192 ? 60 :
              30
            } className="h-1.5" />
          </div>
          
          <div>
            <span className="text-sm text-muted-foreground">Capabilities</span>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {model.capabilities.slice(0, 3).map((capability, index) => (
                <Badge key={index} variant="secondary" className="font-normal capitalize">
                  {capability.split('-').join(' ')}
                </Badge>
              ))}
              {model.capabilities.length > 3 && (
                <Badge variant="secondary" className="font-normal">
                  +{model.capabilities.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 pb-2 border-t flex justify-between">
        <Badge className={cn(
          "capitalize",
          model.size === "small" ? "bg-green-100 text-green-800 hover:bg-green-100" :
          model.size === "medium" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" :
          "bg-red-100 text-red-800 hover:bg-red-100"
        )}>
          {model.size} size
        </Badge>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
          <Button size="sm">
            Use Model
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

interface VectorDBCardProps {
  db: VectorDB;
}

const VectorDBCard = ({ db }: VectorDBCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{db.name}</CardTitle>
            <CardDescription>{db.description}</CardDescription>
          </div>
          <Badge variant="outline">v{db.version}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Provider</span>
            <span className="text-sm font-medium">{db.provider}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Scalability</span>
            <Badge className={cn(
              "capitalize",
              db.scalability === "high" ? "bg-green-100 text-green-800 hover:bg-green-100" :
              db.scalability === "medium" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" :
              "bg-red-100 text-red-800 hover:bg-red-100"
            )}>
              {db.scalability}
            </Badge>
          </div>
          
          <div>
            <span className="text-sm text-muted-foreground">Features</span>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {db.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="secondary" className="font-normal capitalize">
                  {feature.split('-').join(' ')}
                </Badge>
              ))}
              {db.features.length > 3 && (
                <Badge variant="secondary" className="font-normal">
                  +{db.features.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t flex justify-between">
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" /> Configure
        </Button>
        <Button size="sm">
          Use Database <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Models;
