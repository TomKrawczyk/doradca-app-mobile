import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Sun, Zap, Shield, Gauge, Network } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PVInstallation = () => {
  const navigate = useNavigate();

  const components = [
    {
      icon: Sun,
      title: "Moduły fotowoltaiczne",
      description: "Zbudowane ze szkła, krzemu i aluminium. Produkcja energii za dnia. Wymiary: 2094 × 1038 mm, waga: 26,5 kg. Monokrystaliczne, Full black, Half-cut.",
    },
    {
      icon: Zap,
      title: "Inwerter (falownik)",
      description: "Zamienia prąd z paneli (DC) na domowy (AC). Bezobsługowy, aplikacja mobilna, gotowy do rozbudowy. 10 lat gwarancji.",
    },
    {
      icon: Shield,
      title: "Zabezpieczenia AC/DC",
      description: "Podwójna skrzynka, uziemienie w standardzie. Sprzęt najwyższej klasy – certyfikowane zabezpieczenia z atestem Straży Pożarnej.",
    },
    {
      icon: Gauge,
      title: "Licznik dwukierunkowy",
      description: "Zgłoszenie po montażu do operatora. Wszystkie formalności po naszej stronie. Wymiana do 30 dni bez kosztów.",
    },
    {
      icon: Network,
      title: "Sieć energetyczna",
      description: "Gwarantuje ciągłość dostaw niezależnie od warunków. Odbiera nadwyżki i zapewnia stabilność systemu.",
    },
  ];

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
            <Sun className="h-16 w-16 text-primary mx-auto animate-float" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Instalacja PV
            </h1>
            <p className="text-xl text-foreground">
              Jak działa system fotowoltaiczny
            </p>
          </div>

          <Card className="p-6 bg-gradient-primary/10 border-2 border-primary">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Wolność zaczyna się tutaj
            </h2>
            <p className="text-foreground leading-relaxed mb-4">
              Przez lata płaciłeś coraz więcej. Podatki, opłaty, limity, regulacje – system dusił Cię jak kajdany, z roku na rok mocniej. Ale wreszcie jest wyjście.
            </p>
            <p className="text-foreground leading-relaxed">
              Własna instalacja to zerwany łańcuch. To moment, w którym rachunek przestaje być wyrokiem, a staje się formalnością. Każdy kilowat, który produkujesz u siebie, to cegła wyjęta z muru, który Cię otaczał.
            </p>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Jak Działa
            </h2>
            <p className="text-foreground leading-relaxed">
              Instalacja fotowoltaiczna działa poprzez przekształcanie promieniowania słonecznego w energię elektryczną. Moduły fotowoltaiczne produkują prąd stały (DC), który inwerter zamienia na prąd zmienny (AC). Nadwyżki energii są oddawane do sieci lub magazynowane.
            </p>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary text-center mb-6">
              Komponenty Systemu
            </h2>
            {components.map((component, index) => (
              <Card 
                key={index}
                className="p-6 bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-glow"
              >
                <div className="flex items-start gap-4">
                  <component.icon className="h-10 w-10 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {component.title}
                    </h3>
                    <p className="text-foreground leading-relaxed text-sm">
                      {component.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="bg-card border-2 border-primary rounded-lg p-6 text-center">
            <p className="text-xl font-bold text-primary mb-2">
              Fotowoltaika to nie moda
            </p>
            <p className="text-foreground">
              To Alcatraz z którego naprawdę da się uciec
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PVInstallation;
