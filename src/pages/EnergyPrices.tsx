import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, FileText, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EnergyPrices = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6 text-primary hover:text-primary/80"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Powrót
        </Button>

        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <AlertCircle className="h-16 w-16 text-destructive mx-auto" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Ceny Prądu
            </h1>
            <p className="text-xl text-foreground">
              Dlaczego PGE i Tauron nas okradają?
            </p>
          </div>

          <Card className="p-6 bg-card border-destructive border-2">
            <div className="flex items-start gap-4">
              <TrendingUp className="h-8 w-8 text-destructive flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-destructive mb-4">
                  Historia Podwyżek
                </h2>
                <p className="text-foreground leading-relaxed mb-4">
                  W 2020 roku 1 kWh kosztowała około 0,55 zł. W 2025 roku - już 1,34 zł. To nie jest normalna korekta cen – to wzrost o ponad <span className="font-bold text-destructive">160%</span> za dokładnie tę samą energię.
                </p>
                <p className="text-foreground leading-relaxed">
                  I nie dlatego, że prąd jest lepszy. Nie dlatego, że zużywasz więcej. Powód jest prosty: Tauron, PGE i inni dostawcy prądu mogą podnosić ceny, bo system im na to pozwala.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-start gap-4">
              <FileText className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Rachunki Puchną
                </h2>
                <div className="space-y-3 text-foreground">
                  <div className="flex justify-between items-center">
                    <span>2020: Roczny koszt</span>
                    <span className="font-bold">1 800 zł</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>2023: Roczny koszt</span>
                    <span className="font-bold">2 700 zł</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-border pt-3">
                    <span>2025: Roczny koszt</span>
                    <span className="font-bold text-destructive text-xl">4 200 zł</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  * przy tym samym zużyciu ok. 3650 kWh
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Skład Rachunku
            </h2>
            <p className="text-foreground leading-relaxed mb-4">
              Twój rachunek za prąd to nie tylko energia. To cała lista dopłat, podatków i „opłat specjalnych":
            </p>
            <ul className="space-y-2 text-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Energię czynną – to, co faktycznie zużywasz</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Dystrybucję i składki sieciowe</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Abonament, opłatę przejściową, jakościową</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Opłaty dodatkowe (OZE, kogeneracyjna, mocowa)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Podatki – VAT i akcyza</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 bg-gradient-card border-border">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Kary Emisyjne
            </h2>
            <p className="text-foreground leading-relaxed mb-4">
              Kary emisyjne to nic innego jak podatek za oddychanie przemysłu. Oficjalnie: walka z globalnym ociepleniem. W praktyce? Bezwzględny mechanizm drenowania kieszeni zwykłych ludzi.
            </p>
            <p className="text-foreground leading-relaxed">
              W Polsce 60% energii pochodzi z węgla. To oznacza jedno – ceny będą rosły rok w rok. System, który miał ratować planetę, stał się kolejnym podatkiem w przebraniu ekologii.
            </p>
          </Card>

          <div className="bg-primary/10 border-2 border-primary rounded-lg p-6 text-center">
            <p className="text-xl font-bold text-primary mb-2">
              Czy musisz na to pozwolić?
            </p>
            <p className="text-foreground">
              Fotowoltaika to Twoja droga do niezależności energetycznej
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyPrices;
