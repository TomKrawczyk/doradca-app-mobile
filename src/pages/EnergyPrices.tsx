import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, FileText, AlertCircle, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useMemo } from "react";

const EnergyPrices = () => {
  const navigate = useNavigate();

  const priceData = useMemo(() => [
    { year: "2020", price: "0.55 zł", increase: "0%" },
    { year: "2021", price: "0.67 zł", increase: "22%" },
    { year: "2022", price: "0.89 zł", increase: "33%" },
    { year: "2023", price: "1.12 zł", increase: "26%" },
    { year: "2024", price: "1.28 zł", increase: "14%" },
    { year: "2025", price: "1.34 zł", increase: "5%" },
  ], []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
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
            <AlertCircle className="h-16 w-16 text-destructive mx-auto" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Ceny Prądu
            </h1>
            <p className="text-xl text-foreground">
              Dlaczego PGE i Tauron nas okradają?
            </p>
          </motion.div>

          {/* Price History Card */}
          <motion.div variants={cardVariants} initial="hidden" animate="visible">
            <Card className="p-6 bg-card border-destructive border-2">
              <div className="flex items-start gap-4">
                <TrendingUp className="h-8 w-8 text-destructive flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-destructive mb-4">
                    Historia Podwyżek
                  </h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {priceData.map((item) => (
                      <div 
                        key={item.year}
                        className="bg-background p-3 rounded-lg border border-border"
                      >
                        <div className="text-sm text-muted-foreground">{item.year}</div>
                        <div className="text-lg font-bold text-foreground">{item.price}</div>
                        <div className={`text-xs ${item.increase === "0%" ? "text-muted-foreground" : "text-destructive"}`}>
                          +{item.increase}
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-foreground leading-relaxed mb-4">
                    W 2020 roku 1 kWh kosztowała około 0,55 zł. W 2025 roku - już 1,34 zł. To nie jest normalna korekta cen – to wzrost o ponad
                    <span className="font-bold text-destructive"> 160% </span>
                    za dokładnie tę samą energię.
                  </p>
                  
                  <p className="text-foreground leading-relaxed">
                    I nie dlatego, że prąd jest lepszy. Nie dlatego, że zużywasz więcej. Powód jest prosty: Tauron, PGE i inni dostawcy prądu mogą podnosić ceny, bo system im na to pozwala.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Cost Analysis Card */}
          <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
            <Card className="p-6 bg-card border-border">
              <div className="flex items-start gap-4">
                <FileText className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    Rachunki Puchną
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">Roczne koszty</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                          <span className="text-foreground">2020</span>
                          <span className="font-bold text-primary">1 800 zł</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                          <span className="text-foreground">2025</span>
                          <span className="font-bold text-destructive">4 800 zł</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-destructive/10 rounded-lg border border-destructive">
                          <span className="text-destructive font-bold">Różnica</span>
                          <span className="font-bold text-destructive">+3 000 zł</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">Prognoza na 10 lat</h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-background rounded-lg">
                          <div className="text-sm text-muted-foreground">Bez fotowoltaiki</div>
                          <div className="text-xl font-bold text-destructive">~60 000 zł</div>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-lg border border-primary">
                          <div className="text-sm text-muted-foreground">Z fotowoltaiką</div>
                          <div className="text-xl font-bold text-primary">~12 000 zł</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Solution Card */}
          <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
            <Card className="p-6 bg-card border-primary border-2">
              <div className="flex items-start gap-4">
                <Zap className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    Rozwiązanie: Fotowoltaika
                  </h2>
                  <p className="text-foreground leading-relaxed mb-4">
                    Przestań płacić coraz więcej. Z fotowoltaiką produkujesz własny prąd i jesteś niezależny od podwyżek dostawców.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-background rounded-lg">
                      <div className="text-2xl font-bold text-primary">80%</div>
                      <div className="text-sm text-muted-foreground">Oszczędności</div>
                    </div>
                    <div className="text-center p-4 bg-background rounded-lg">
                      <div className="text-2xl font-bold text-primary">5-7</div>
                      <div className="text-sm text-muted-foreground">Lat zwrotu</div>
                    </div>
                    <div className="text-center p-4 bg-background rounded-lg">
                      <div className="text-2xl font-bold text-primary">25</div>
                      <div className="text-sm text-muted-foreground">Lat gwarancji</div>
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
            transition={{ delay: 0.6 }}
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

export default EnergyPrices;
