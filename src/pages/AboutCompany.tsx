import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Building2, Users, Wrench, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutCompany = () => {
  const navigate = useNavigate();

  const stats = [
    { value: "40 tys.", label: "klientów", icon: Users },
    { value: "49", label: "oddziałów", icon: Building2 },
    { value: "80", label: "ekip montażowych", icon: Wrench },
    { value: "460", label: "doradców", icon: Users },
    { value: "3 mln zł", label: "ubezpieczenia", icon: Shield },
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
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              4ECO
            </h1>
            <p className="text-xl text-foreground">
              Lider OZE w Polsce
            </p>
          </div>

          <Card className="p-6 bg-card border-border">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Informacje o 4ECO
            </h2>
            <p className="text-foreground leading-relaxed mb-6">
              4ECO to lider polskiego rynku odnawialnych źródeł energii, któremu zaufało już ponad 40 tys. klientów w całym kraju. Dzięki 49 oddziałom jesteśmy obecni w każdym rejonie kraju, zapewniając dostępność usług oraz pełne wsparcie na miejscu.
            </p>
            <p className="text-foreground leading-relaxed">
              Nasza oferta opiera się na wysokiej jakości, którą gwarantuje praca 80 certyfikowanych ekip montażowych oraz 460 doradców specjalizujących się w temacie ogrzewania i fotowoltaice.
            </p>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <Card 
                key={index}
                className="p-4 bg-gradient-card border-border text-center hover:border-primary transition-all duration-300 hover:shadow-glow"
              >
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 bg-card border-border">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Nasze Realizacje
            </h2>
            <p className="text-foreground leading-relaxed">
              Współpracujemy z tysiącami klientów, realizując instalacje w domach, firmach i na gruntach. Nasze projekty obejmują zarówno małe instalacje domowe, jak i wielkie farmy fotowoltaiczne.
            </p>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Współprace
            </h2>
            <div className="space-y-4 text-foreground">
              <div>
                <h3 className="font-bold text-primary mb-2">Uczelnie i nauka</h3>
                <p className="text-sm leading-relaxed">
                  Partnerstwo z Politechniką Świętokrzyską – wspólne inicjatywy badawczo-rozwojowe w zakresie OZE.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-primary mb-2">Fundacje i edukacja ekologiczna</h3>
                <p className="text-sm leading-relaxed">
                  ECO Fundacja – działania edukacyjne, warsztaty i akcje promujące świadome korzystanie z energii.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-primary mb-2">Służby i bezpieczeństwo</h3>
                <p className="text-sm leading-relaxed">
                  Współpraca z OSP – szkolenia dotyczące bezpieczeństwa instalacji fotowoltaicznych.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutCompany;
