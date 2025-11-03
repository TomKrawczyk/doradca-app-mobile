import { SectionCard } from "@/components/SectionCard";
import { Building2, TrendingUp, Sun, Calculator, Download, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMemo } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const sections = useMemo(() => [
    {
      title: "O Firmie",
      description: "Podstawowe dane o 4ECO i nasze realizacje",
      icon: <Building2 />,
      path: "/about",
    },
    {
      title: "Ceny Prądu",
      description: "Dlaczego PGE i Tauron nas okradają?",
      icon: <TrendingUp />,
      path: "/prices",
    },
    {
      title: "Instalacja PV",
      description: "Jak działa i co składa się na system?",
      icon: <Sun />,
      path: "/installation",
    },
    {
      title: "Korzyści i Kalkulatory",
      description: "Zyski, technologie, dotacje, FAQ i kalkulatory",
      icon: <Calculator />,
      path: "/benefits",
    },
  ], []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-4"
            >
              <Zap className="h-16 w-16 text-primary" />
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Instalacje Fotowoltaiczne
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Twoja droga do energetycznej niezależności
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button 
                onClick={() => navigate("/install")}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                <Download className="mr-2 h-5 w-5" />
                Zainstaluj Aplikację
              </Button>
            </motion.div>
          </motion.div>

          {/* Section Cards */}
          <motion.div 
            ref={ref}
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {sections.map((section, index) => (
              <SectionCard
                key={section.path}
                title={section.title}
                description={section.description}
                icon={section.icon}
                onClick={() => navigate(section.path)}
                delay={index * 0.1}
              />
            ))}
          </motion.div>

          {/* Additional Info */}
          <motion.div 
            className="text-center space-y-4 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-muted-foreground">
              Oszczędź do 80% na rachunkach za prąd
            </p>
            <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
              <span>✓ Gwarancja 25 lat</span>
              <span>✓ Dotacje do 15 000 zł</span>
              <span>✓ Zwrot inwestycji w 5-7 lat</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
