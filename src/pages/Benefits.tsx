import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Calculator, 
  TrendingUp, 
  Shield, 
  Leaf, 
  Home,
  Zap,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";

const Benefits = () => {
  const navigate = useNavigate();
  const [calculatorData, setCalculatorData] = useState({
    monthlyBill: 400,
    roofArea: 50,
    installationPower: 6,
  });

  const benefits = useMemo(() => [
    {
      title: "Oszczędności",
      description: "Redukcja rachunków za prąd nawet o 80%",
      icon: TrendingUp,
      value: "80%",
    },
    {
      title: "Zwrot inwestycji",
      description: "Inwestycja zwraca się już po 5-7 latach",
      icon: Calculator,
      value: "5-7 lat",
    },
    {
      title: "Gwarancja",
      description: "25-letnia gwarancja na panele fotowoltaiczne",
      icon: Shield,
      value: "25 lat",
    },
    {
      title: "Ekologia",
      description: "Czysta energia bez emisji CO₂",
      icon: Leaf,
      value: "0 CO₂",
    },
  ], []);

  const calculateSavings = useMemo(() => {
    const annualBill = calculatorData.monthlyBill * 12;
    const savings = annualBill * 0.8; // 80% savings
    const installationCost = calculatorData.installationPower * 4500; // PLN per kW
    const paybackTime = installationCost / savings;
    const co2Reduction = calculatorData.installationPower * 1200; // kg CO2 per year

    return {
      annualBill,
      savings: Math.round(savings),
      installationCost,
      paybackTime: Math.round(paybackTime * 10) / 10,
      co2Reduction: Math.round(co2Reduction),
    };
  }, [calculatorData]);

  const handleInputChange = (field: string, value: number) => {
    setCalculatorData(prev => ({
      ...prev,
      [field]: Math.max(0, value),
    }));
  };

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
            <Zap className="h-16 w-16 text-primary mx-auto" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Korzyści i Kalkulatory
            </h1>
            <p className="text-xl text-foreground">
              Zobacz, ile możesz zyskać dzięki fotowoltaice
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div 
            className="grid md:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="p-6 bg-card border-border">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {benefit.description}
                      </p>
                      <div className="text-2xl font-bold text-primary">
                        {benefit.value}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </motion.div>

          {/* Calculator */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6 bg-card border-primary border-2">
              <h2 className="text-2xl font-bold text-primary mb-6 text-center">
                Kalkulator Oszczędności
              </h2>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Miesięczny rachunek (zł)
                  </label>
                  <input
                    type="number"
                    value={calculatorData.monthlyBill}
                    onChange={(e) => handleInputChange('monthlyBill', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Powierzchnia dachu (m²)
                  </label>
                  <input
                    type="number"
                    value={calculatorData.roofArea}
                    onChange={(e) => handleInputChange('roofArea', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Moc instalacji (kW)
                  </label>
                  <input
                    type="number"
                    value={calculatorData.installationPower}
                    onChange={(e) => handleInputChange('installationPower', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Twoje obecne koszty</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Roczny rachunek:</span>
                      <span className="font-bold text-destructive">{calculateSavings.annualBill.toLocaleString()} zł</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Koszt instalacji:</span>
                      <span className="font-bold text-foreground">{calculateSavings.installationCost.toLocaleString()} zł</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Oszczędności</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Roczna oszczędność:</span>
                      <span className="font-bold text-primary">{calculateSavings.savings.toLocaleString()} zł</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Czas zwrotu:</span>
                      <span className="font-bold text-primary">{calculateSavings.paybackTime} lat</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Redukcja CO₂:</span>
                      <span className="font-bold text-primary">{calculateSavings.co2Reduction} kg/rok</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Additional Benefits */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="p-6 bg-card border-border">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Dodatkowe korzyści
              </h2>
              
              <div className="space-y-3">
                {[
                  "Dotacja "My Electricity" do 15 000 zł",
                  "Ulga termomodernizacyjna od podatku",
                  "Wzrost wartości nieruchomości o 3-7%",
                  "Ochrona przed rosnącymi cenami prądu",
                  "Niezależność energetyczna",
                  "Prosta obsługa i minimalna konserwacja",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Finansowanie
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Opcje płatności</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Gotówka lub przelew</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Kredyt preferencyjny</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Leasing (0% VAT)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>System ratalny</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Dotacje</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>"My Electricity" - do 15 000 zł</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>"Czyste Powietrze" - do 40 000 zł</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Ulga termomodernizacyjna</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Regionalne programy wsparcia</span>
                    </div>
                  </div>
                </div>
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
              onClick={() => navigate("/installation")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              Dowiedz się więcej o instalacji
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
