import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Building2, Users, Award, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AboutCompany = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Zrealizowane instalacje", value: "40,000+", icon: TrendingUp },
    { label: "Zadowolonych klientów", value: "98%", icon: Users },
    { label: "Lat doświadczenia", value: "7", icon: Award },
  ];

  const features = [
    {
      title: "Doświadczenie",
      description: "7 lat na rynku fotowoltaiki z tysiącami zrealizowanych instalacji.",
    },
    {
      title: "Jakość",
      description: "Tylko sprawdzone komponenty od renomowanych producentów z gwarancją 25 lat.",
    },
    {
      title: "Zaufanie",
      description: "98% zadowolonych klientów i pozytywnych opinii w niezależnych portalach.",
    },
    {
      title: "Wsparcie",
      description: "Kompleksowa obsługa od projektu po montaż i serwis pogwarancyjny.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6 text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Powrót
        </Button>

        <div className="space-y-8">
          {/* Header */}
          <motion.div 
            className="text-center space-y-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Building2 className="h-16 w-16 text-primary mx-auto" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              4ECO Energy
            </h1>
            <p className="text-xl text-foreground">
              Twój partner w energetycznej niezależności
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6 text-center bg-card border-border">
                  <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </Card>
              );
            })}
          </motion.div>

          {/* About */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6 bg-card border-border">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Kim jesteśmy?
              </h2>
              <div className="space-y-4 text-foreground leading-relaxed">
                <p>
                  4ECO Energy to firma z 12-letnim doświadczeniem w branży fotowoltaicznej. 
                  Specjalizujemy się w projektowaniu, dostawie i montażu instalacji 
                  fotowoltaicznych dla klientów indywidualnych i biznesowych.
                </p>
                <p>
                  Naszą misją jest dostarczanie niezawodnych, wydajnych i ekonomicznych 
                  rozwiązań energetycznych, które pozwalają naszym klientom osiągnąć 
                  niezależność energetyczną i znaczące oszczędności.
                </p>
                <p>
                  Do tej pory zrealizowaliśmy ponad 2500 instalacji o łącznej mocy 
                  ponad 25 MW, co pozwala naszym klientom zaoszczędzić miliony 
                  złotych rocznie na rachunkach za prąd.
                </p>
              </div>
            </Card>

            {/* Features */}
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 bg-card border-border">
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Process */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="p-6 bg-card border-primary border-2">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Jak działamy?
              </h2>
              <div className="space-y-4">
                {[
                  "Analiza potrzeb i możliwości technicznych",
                  "Przygotowanie indywidualnej oferty",
                  "Wniosek o dotację i dofinansowanie",
                  "Profesjonalny montaż instalacji",
                  "Uruchomienie i szkolenie użytkownika",
                  "Serwis i wsparcie pogwarancyjne",
                ].map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="text-foreground">{step}</div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* CTA */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Button 
              size="lg"
              onClick={() => navigate("/benefits")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              Dowiedz się więcej o korzyściach
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutCompany;
