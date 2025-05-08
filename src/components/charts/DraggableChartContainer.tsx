
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { GripVertical, Minimize2, Maximize2 } from 'lucide-react';

interface DraggableChartContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const DraggableChartContainer = ({ title, children, className }: DraggableChartContainerProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [expanded, setExpanded] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const initialPos = useRef({ x: 0, y: 0, mouseX: 0, mouseY: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!dragRef.current) return;
    
    setIsDragging(true);
    initialPos.current = {
      x: position.x,
      y: position.y,
      mouseX: e.clientX,
      mouseY: e.clientY
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const dx = e.clientX - initialPos.current.mouseX;
    const dy = e.clientY - initialPos.current.mouseY;
    
    setPosition({
      x: initialPos.current.x + dx,
      y: initialPos.current.y + dy
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card 
      className={cn(
        'transition-all duration-300 relative', 
        expanded ? 'fixed inset-4 z-50' : 'w-full h-full', 
        isDragging ? 'cursor-grabbing' : '',
        className
      )}
      style={expanded ? {} : { 
        transform: `translate(${position.x}px, ${position.y}px)` 
      }}
    >
      <CardHeader className="relative p-4">
        <div 
          ref={dragRef}
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 cursor-grab p-1 rounded-md hover:bg-muted/80",
            isDragging ? "cursor-grabbing" : ""
          )}
          onMouseDown={handleMouseDown}
        >
          <GripVertical size={18} className="text-muted-foreground" />
        </div>
        
        <div className="flex items-center justify-between ml-6">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleExpand} 
            className="h-8 w-8"
          >
            {expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default DraggableChartContainer;
