import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Sun, 
  Zap, 
  Home, 
  Settings, 
  CheckCircle,
  Eye,
  Shield,
  Battery
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PVInstallation = () => {
  const navigate = useNavigate();

  const components = [
    {
      title: "Panele fotowoltaiczne",
      description: "Przekształcają światło słoneczne w prąd elektryczny",
      icon: Sun,
      details: "Monokrystaliczne, 400-500W mocy, 25 lat gwarancji",
    },
    {
      title: "Inwerter",
      description: "Konwertuje prąd stały na prąd zmienny",
      icon: Zap,
      details: "Falownik stringowy lub mikroinwertery, 5-12 lat gwarancji",
    },
    {
      title: "Konstrukcja montażowa",
      description: "Mocuje panele do dachu lub gruntu",
      icon: Home,
      details: "Aluminium lub stal nierdzewna, dopasowana do typu dachu",
    },
    {
      title: "Zabezpieczenia",
      description: "Chronią instalację i dom przed uszkodzeniami",
      icon: Shield,
      details: "Zabezpieczenia przepięciowe i przeciwporażeniowe",
    },
  ];

  const processSteps = [
    {
      title: "Analiza i wycena",
      description: "Bezpłatna wycena i analiza możliwości instalacji",
      duration: "1-2 dni",
    },
    {
      title: "Projekt techniczny",
      description: "Przygotowanie dokumentacji technicznej i wniosków",
      duration: "3-5 dni",
    },
    {
      title: "Dofinansowanie",
      description: "Wniosek o dotacje i uzyskanie pozwoleń",
      duration: "2-4 tygodnie",
    },
    {
      title: "Dostawa i montaż",
      description: "Profesjonalny montaż przez certyfikowanych instalatorów",
      duration: "1-2 dni",
    },
    {
      title: "Uruchomienie",
      description: "Podłączenie do sieci i szkolenie użytkownika",
      duration: "1 dzień",
    },
    {
      title: "Monitoring",
      description: "Stały nadzór nad pracą instalacji online",
      duration: "Cały czas",
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
            <Sun className="h-16 w-16 text-primary mx-auto" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Instalacja PV
            </h1>
            <p className="text-xl text-foreground">
              Jak działa i co składa się na system?
            </p>
          </motion.div>

          {/* How it works */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6 bg-card border-primary border-2">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Jak to działa?
              </h2>
              <div className="space-y-4 text-foreground leading-relaxed">
                <p>
                  Instalacja fotowoltaiczna przekształca energię słoneczną w prąd 
                  elektryczny za pomocą zjawiska fotowoltaicznego. Panele wytwarzają 
                  prąd stały (DC), który jest konwertowany na prąd zmienny (AC) 
                  przez inwerter, nadający się do użytku w gospodarstwie domowym.
                </p>
                <p>
                  Nadwyżki energii mogą być magazynowane w bateriach lub 
                  sprzedawane do sieci energetycznej, co dodatkowo zwiększa 
                  korzyści finansowe z instalacji.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Components */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-primary text-center">
              Składniki instalacji
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {components.map((component, index) => {
                const Icon = component.icon;
                return (
                  <Card key={index} className="p-6 bg-card border-border">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {component.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {component.description}
                        </p>
                        <p className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                          {component.details}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </motion.div>

          {/* Installation Process */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="p-6 bg-card border-border">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Proces instalacji
              </h2>
              <div className="space-y-4">
                {processSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {step.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                        <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded whitespace-nowrap ml-2">
                          {step.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Requirements */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Wymagania techniczne
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Dach w dobrym stanie technicznym</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Orientacja południowa (południe, wschód, zachód)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Minimalna powierzchnia 30 m²</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Dostęp do licznika dwukierunkowego</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Opcje dodatkowe
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Magazyn energii (baterie)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Ładowarka samochodu EV</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>System monitoringu online</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Zabezpieczenia przeciwporażeniowe</span>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <Button 
              size="lg"
              onClick={() => navigate("/benefits")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              Oblicz swoje oszczędności
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PVInstallation;
