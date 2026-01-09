import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, TrendingDown, Leaf, Coins, HelpCircle, Calculator, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AutoconsumptionCalculator from "@/components/AutoconsumptionCalculator";
import DeviceUsageCalculator from "@/components/DeviceUsageCalculator";
import VisitReportGenerator from "@/components/VisitReportGenerator";

const Benefits = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: TrendingDown,
      title: "Oszczędności",
      description: "Zmniejszenie rachunków za prąd nawet o 80-90%",
    },
    {
      icon: Leaf,
      title: "Ekologia",
      description: "Czysta energia ze źródeł odnawialnych",
    },
    {
      icon: Coins,
      title: "Inwestycja",
      description: "Zwrot z inwestycji w 5-7 lat, potem czyste zyski",
    },
  ];

  const faqs = [
    {
      question: "Czy fotowoltaika się opłaca?",
      answer: "Tak! Przy dzisiejszych cenach prądu inwestycja zwraca się w ciągu 5-7 lat. Przez kolejne lata cieszysz się darmowym prądem.",
    },
    {
      question: "Ile kosztuje instalacja?",
      answer: "Koszt zależy od mocy instalacji. Typowa instalacja 5-10 kW to koszt 20-40 tys. zł. Pamiętaj o dostępnych dotacjach!",
    },
    {
      question: "Czy są dostępne dotacje?",
      answer: "Tak, dostępne są różne programy dotacji, m.in. Mój Prąd, Czyste Powietrze, ulga termomodernizacyjna.",
    },
    {
      question: "Jak długo trwa montaż?",
      answer: "Standardowy montaż trwa 1-2 dni robocze. Cały proces od podpisania umowy do uruchomienia to około 2-3 miesiące.",
    },
    {
      question: "Co z okresem zimowym?",
      answer: "Panele produkują energię przez cały rok. Zimą produkcja jest mniejsza, ale dzięki rozliczeniu net-metering korzystasz z nadwyżek z lata.",
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
            <Coins className="h-16 w-16 text-primary mx-auto animate-float" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Korzyści i Kalkulatory
            </h1>
            <p className="text-xl text-foreground">
              Zyski, technologie, dotacje i odpowiedzi na pytania
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <Card 
                key={index}
                className="p-6 bg-gradient-card border-border text-center hover:border-primary transition-all duration-300 hover:shadow-glow"
              >
                <benefit.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-bold text-primary mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-foreground">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>

          {/* Kalkulatory */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold text-primary">Kalkulatory</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Sprawdź ile możesz zaoszczędzić i ile tracisz nie wykorzystując w pełni swojej instalacji PV
            </p>
          </div>

          <AutoconsumptionCalculator />
          
          <DeviceUsageCalculator />

          {/* Raport z wizyty */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold text-primary">Raporty</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Generuj profesjonalne raporty dla klientów
            </p>
          </div>

          <VisitReportGenerator />

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold text-primary">
                Najczęściej Zadawane Pytania
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          <div className="bg-gradient-primary/10 border-2 border-primary rounded-lg p-6 text-center">
            <p className="text-xl font-bold text-primary mb-2">
              Chcesz dowiedzieć się więcej?
            </p>
            <p className="text-foreground mb-4">
              Skontaktuj się z naszymi doradcami
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Skontaktuj się z nami
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
