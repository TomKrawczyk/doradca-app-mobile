import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const SectionCard = ({ title, description, icon, onClick, className }: SectionCardProps) => {
  return (
    <Card 
      onClick={onClick}
      className={cn(
        "relative overflow-hidden cursor-pointer transition-all duration-300",
        "bg-card border-2 border-border hover:border-primary",
        "p-6 hover:shadow-glow hover:scale-[1.02]",
        "animate-slide-up",
        className
      )}
    >
      <div className="flex flex-col items-center text-center gap-4">
        <div className="text-primary text-5xl">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-foreground">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      <div className="absolute inset-0 bg-gradient-primary opacity-0 hover:opacity-5 transition-opacity duration-300" />
    </Card>
  );
};
