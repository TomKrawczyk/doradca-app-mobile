import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 max-w-md text-center">
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Illustration */}
          <motion.div 
            className="relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-32 h-32 mx-auto bg-card border-2 border-border rounded-full flex items-center justify-center">
              <Zap className="h-16 w-16 text-primary" />
            </div>
            <motion.div 
              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              404
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <div className="space-y-4">
            <motion.h1 
              className="text-4xl font-bold text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Strona nie znaleziona
            </motion.h1>
            
            <motion.p 
              className="text-lg text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Wygląda na to, że ta strona została przeniesiona lub nie istnieje.
            </motion.p>
            
            <motion.p 
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Sprawdź adres URL lub wróć do strony głównej.
            </motion.p>
          </div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <Button 
              onClick={() => navigate(-1)}
              variant="outline"
              className="transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Wróć
            </Button>
            
            <Button 
              onClick={() => navigate("/")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              <Home className="mr-2 h-4 w-4" />
              Strona główna
            </Button>
          </motion.div>

          {/* Additional Info */}
          <motion.div 
            className="pt-8 border-t border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <p className="text-sm text-muted-foreground mb-4">
              Potrzebujesz pomocy? Skontaktuj się z nami:
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <a 
                href="tel:+48123456789" 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                +48 123 456 789
              </a>
              <span className="text-muted-foreground">|</span>
              <a 
                href="mailto:kontakt@4eco.pl" 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                kontakt@4eco.pl
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
