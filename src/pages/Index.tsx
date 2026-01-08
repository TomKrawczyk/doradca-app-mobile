import { SectionCard } from "@/components/SectionCard";
import { Building2, TrendingUp, Sun, Calculator, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  const sections = [
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
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-primary animate-slide-up">
              Instalacje Fotowoltaiczne
            </h1>
            <p className="text-xl md:text-2xl text-foreground">
              Twoja droga do energetycznej niezależności
            </p>
            <Button 
              onClick={() => navigate("/install")}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Download className="mr-2 h-4 w-4" />
              Zainstaluj Aplikację
            </Button>
          </div>

          {/* Section Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {sections.map((section, index) => (
              <SectionCard
                key={index}
                title={section.title}
                description={section.description}
                icon={section.icon}
                onClick={() => navigate(section.path)}
                className="hover:animate-float"
              />
            ))}
          </div>

          {/* Footer */}
          <div className="text-center text-muted-foreground text-sm pt-8 border-t border-border">
            <p>© 2025 4ECO - Instalacje Fotowoltaiczne</p>
            <p className="mt-2">Zaufało nam już ponad 40 000 klientów</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
