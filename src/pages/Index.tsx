
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4">
        <div className="container flex items-center justify-between">
          <h1 className="text-xl font-medium">Your App</h1>
          <nav>
            <Button variant="ghost">Get Started</Button>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center">
        <div className="container py-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-6">Welcome to Your New Application</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            This is a minimal starter template. Start building your amazing project by customizing this page.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/">Explore Features</Link>
            </Button>
            <Button variant="outline" size="lg">Learn More</Button>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
