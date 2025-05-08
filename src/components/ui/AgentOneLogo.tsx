
import { cn } from "@/lib/utils";

interface AgentOneLogoProps {
  size?: number;
  className?: string;
  variant?: "default" | "icon";
}

const AgentOneLogo = ({ size = 40, className, variant = "default" }: AgentOneLogoProps) => {
  return (
    <div 
      className={cn(
        "flex items-center justify-center",
        className
      )}
    >
      {variant === "default" ? (
        // Full logo with text and icon
        <div className="flex items-center">
          <div 
            className="relative"
            style={{ width: size, height: size }}
          >
            <div className="absolute inset-0">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="30" cy="30" r="5" fill="currentColor" fillOpacity="0.7" />
                <circle cx="60" cy="25" r="5" fill="currentColor" fillOpacity="0.7" />
                <circle cx="85" cy="50" r="5" fill="currentColor" fillOpacity="0.7" />
                <circle cx="65" cy="75" r="5" fill="currentColor" fillOpacity="0.7" />
                <circle cx="30" cy="70" r="5" fill="currentColor" fillOpacity="0.7" />
                <circle cx="15" cy="50" r="5" fill="currentColor" fillOpacity="0.7" />
                <line x1="30" y1="30" x2="60" y2="25" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
                <line x1="60" y1="25" x2="85" y2="50" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
                <line x1="85" y1="50" x2="65" y2="75" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
                <line x1="65" y1="75" x2="30" y2="70" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
                <line x1="30" y1="70" x2="15" y2="50" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
                <line x1="15" y1="50" x2="30" y2="30" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
                <line x1="30" y1="30" x2="65" y2="75" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
                <line x1="30" y1="70" x2="60" y2="25" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
                <line x1="15" y1="50" x2="85" y2="50" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <span 
            className="ml-2 tracking-wider uppercase font-bold"
            style={{ fontSize: `${size / 2}px` }}
          >
            AGENT ONE
          </span>
        </div>
      ) : (
        // Icon only for smaller displays
        <div 
          className="relative"
          style={{ width: size, height: size }}
        >
          <div className="absolute inset-0">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="30" cy="30" r="5" fill="currentColor" fillOpacity="0.7" />
              <circle cx="60" cy="25" r="5" fill="currentColor" fillOpacity="0.7" />
              <circle cx="85" cy="50" r="5" fill="currentColor" fillOpacity="0.7" />
              <circle cx="65" cy="75" r="5" fill="currentColor" fillOpacity="0.7" />
              <circle cx="30" cy="70" r="5" fill="currentColor" fillOpacity="0.7" />
              <circle cx="15" cy="50" r="5" fill="currentColor" fillOpacity="0.7" />
              <line x1="30" y1="30" x2="60" y2="25" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
              <line x1="60" y1="25" x2="85" y2="50" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
              <line x1="85" y1="50" x2="65" y2="75" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
              <line x1="65" y1="75" x2="30" y2="70" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
              <line x1="30" y1="70" x2="15" y2="50" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
              <line x1="15" y1="50" x2="30" y2="30" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
              <line x1="30" y1="30" x2="65" y2="75" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
              <line x1="30" y1="70" x2="60" y2="25" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
              <line x1="15" y1="50" x2="85" y2="50" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentOneLogo;
