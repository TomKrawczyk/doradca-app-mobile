import { ReactNode, memo } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
  delay?: number;
}

export const SectionCard = memo(({ 
  title, 
  description, 
  icon, 
  onClick, 
  className, 
  delay = 0 
}: SectionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        onClick={onClick}
        className={cn(
          "relative overflow-hidden cursor-pointer transition-all duration-300",
          "bg-card border-2 border-border hover:border-primary",
          "p-6 hover:shadow-glow",
          "group",
          className
        )}
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="text-primary text-5xl group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
      </Card>
    </motion.div>
  );
});

SectionCard.displayName = "SectionCard";
