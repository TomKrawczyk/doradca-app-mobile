import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Download, 
  Smartphone, 
  QrCode, 
  CheckCircle,
  ArrowRight,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Install = () => {
  const navigate = useNavigate();

  const features = [
    "Kalkulatory oszczędności online",
    "Monitoring wydajności instalacji",
    "Przypomnienia o przeglądach",
    "Aktualne ceny prądu i analizy",
    "Dostęp do dokumentacji",
    "Kontakt z doradcą",
  ];

  const handleInstall = () => {
    // Check if PWA is supported
    if ('beforeinstallprompt' in window) {
      // PWA install prompt will be handled by PWAInstallPrompt component
      console.log('PWA installation available');
    } else {
      // Fallback for browsers without PWA support
      alert('Aplikacja jest zoptymalizowana dla przeglądarek wspierających PWA. Użyj Chrome, Safari lub Edge na urządzeniu mobilnym.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-8">
          {/* Header */}
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center"
            >
              <Zap className="h-20 w-20 text-primary" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Zainstaluj Aplikację
            </h1>
            <p className="text-xl text-foreground max-w-md mx-auto">
              Szybki dostęp do wszystkich funkcji doradcy fotowoltaicznego
            </p>
          </motion.div>

          {/* App Preview */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-8 bg-card border-primary border-2 max-w-sm mx-auto">
              <div className="flex justify-center mb-4">
                <Smartphone className="h-16 w-16 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Doradca PV
              </h2>
              <p className="text-muted-foreground mb-4">
                Aplikacja mobilna
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Darmowa instalacja</span>
              </div>
            </Card>
          </motion.div>

          {/* Features */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-primary text-center">
              Funkcjonalności aplikacji
            </h2>
            <div className="grid gap-3">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg"
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Installation Steps */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-primary text-center">
              Jak zainstalować?
            </h2>
            
            <div className="space-y-4">
              {[
                {
                  title: "Otwórz w przeglądarce",
                  description: "Użyj Chrome, Safari lub Edge na swoim urządzeniu mobilnym",
                  icon: Smartphone,
                },
                {
                  title: "Zainstaluj aplikację",
                  description: "Kliknij przycisk instalacji lub "Dodaj do ekranu głównego"",
                  icon: Download,
                },
                {
                  title: "Ciesz się funkcjami",
                  description: "Aplikacja jest gotowa do użycia z pełnymi funkcjami",
                  icon: CheckCircle,
                },
              ].map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card key={index} className="p-4 bg-card border-border">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </motion.div>

          {/* Compatibility */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-primary mb-4 text-center">
                Kompatybilność
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-foreground mb-2">Systemy operacyjne</div>
                  <div className="space-y-1 text-muted-foreground">
                    <div>Android 7.0+</div>
                    <div>iOS 11.0+</div>
                    <div>Windows 10+</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-foreground mb-2">Przeglądarki</div>
                  <div className="space-y-1 text-muted-foreground">
                    <div>Chrome 70+</div>
                    <div>Safari 12+</div>
                    <div>Edge 79+</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Install Button */}
          <motion.div 
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Button 
              size="lg"
              onClick={handleInstall}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105 w-full max-w-sm"
            >
              <Download className="mr-2 h-5 w-5" />
              Zainstaluj aplikację PWA
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Instalacja jest bezpłatna i zajmuje tylko kilka sekund
            </p>
          </motion.div>

          {/* Alternative Actions */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <Button 
              variant="outline"
              onClick={() => navigate("/benefits")}
              className="transition-all duration-300 hover:scale-105"
            >
              <Calculator className="mr-2 h-4 w-4" />
              Kalkulator oszczędności
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => navigate("/about")}
              className="transition-all duration-300 hover:scale-105"
            >
              O firmie
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Install;
