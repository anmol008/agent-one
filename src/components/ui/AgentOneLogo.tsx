
import { cn } from "@/lib/utils";

interface AgentOneLogoProps {
  size?: number;
  className?: string;
}

const AgentOneLogo = ({ size = 40, className }: AgentOneLogoProps) => {
  return (
    <div 
      className={cn(
        "rounded-md bg-gradient-to-br from-agentone-primary to-agentone-secondary flex items-center justify-center text-white font-bold shadow-md",
        className
      )}
      style={{ width: size, height: size }}
    >
      <span 
        style={{ fontSize: `${size / 2.5}px` }} 
        className="font-bold"
      >
        A1
      </span>
    </div>
  );
};

export default AgentOneLogo;
