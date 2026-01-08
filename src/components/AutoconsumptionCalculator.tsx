import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Sun, AlertTriangle, TrendingUp, Battery, PartyPopper, FileDown, Share2 } from "lucide-react";
import { jsPDF } from "jspdf";
import { useToast } from "@/hooks/use-toast";

const AutoconsumptionCalculator = () => {
  const [energyProduced, setEnergyProduced] = useState<string>("");
  const [energyExported, setEnergyExported] = useState<string>("");
  const { toast } = useToast();

  const { autoconsumptionLevel, energyConsumed, status } = useMemo(() => {
    const produced = parseFloat(energyProduced) || 0;
    const exported = parseFloat(energyExported) || 0;
    
    if (produced <= 0) {
      return { autoconsumptionLevel: 0, energyConsumed: 0, status: null };
    }
    
    const consumed = Math.max(0, produced - exported);
    const level = Math.min(100, (consumed / produced) * 100);
    
    let statusType: "low" | "medium" | "high" | null = null;
    if (level < 30) statusType = "low";
    else if (level <= 60) statusType = "medium";
    else statusType = "high";
    
    return { 
      autoconsumptionLevel: level, 
      energyConsumed: consumed,
      status: statusType 
    };
  }, [energyProduced, energyExported]);

  const getStatusConfig = () => {
    switch (status) {
      case "low":
        return {
          icon: AlertTriangle,
          title: "Niska autokonsumpcja",
          message: "Zalecana edukacja oraz zmiana nawyków z korzystaniem z urządzeń energochłonnych.",
          recommendation: "Rozważ montaż magazynu energii, aby zwiększyć wykorzystanie własnej produkcji.",
          bgClass: "bg-destructive/10 border-destructive/30",
          textClass: "text-destructive",
          progressClass: "bg-destructive"
        };
      case "medium":
        return {
          icon: TrendingUp,
          title: "Średnia autokonsumpcja",
          message: "Jest dobrze, ale może być lepiej!",
          recommendation: "Rozważ montaż magazynu energii, aby jeszcze bardziej zwiększyć oszczędności.",
          bgClass: "bg-amber-500/10 border-amber-500/30",
          textClass: "text-amber-600",
          progressClass: "bg-amber-500"
        };
      case "high":
        return {
          icon: PartyPopper,
          title: "Autokonsumpcja na wysokim poziomie",
          message: "Gratulacje! Świetnie wykorzystujesz energię z własnej instalacji PV.",
          recommendation: null,
          bgClass: "bg-green-500/10 border-green-500/30",
          textClass: "text-green-600",
          progressClass: "bg-green-500"
        };
      default:
        return null;
    }
  };

  const statusConfig = getStatusConfig();

  const generatePDF = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString("pl-PL");
    
    doc.setFontSize(20);
    doc.setTextColor(0, 68, 102);
    doc.text("4ECO - Raport Autokonsumpcji", 20, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Wygenerowano: ${date}`, 20, 30);
    
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Energia wyprodukowana: ${energyProduced} kWh`, 20, 50);
    doc.text(`Energia oddana do sieci: ${energyExported} kWh`, 20, 60);
    doc.text(`Energia zużyta na własne potrzeby: ${energyConsumed.toLocaleString()} kWh`, 20, 70);
    
    doc.setFontSize(16);
    doc.setTextColor(0, 68, 102);
    doc.text(`Poziom autokonsumpcji: ${autoconsumptionLevel.toFixed(1)}%`, 20, 90);
    
    if (statusConfig) {
      doc.setFontSize(14);
      doc.setTextColor(status === "high" ? 0 : status === "medium" ? 180 : 200, status === "high" ? 128 : status === "medium" ? 120 : 0, 0);
      doc.text(statusConfig.title, 20, 110);
      
      doc.setFontSize(11);
      doc.setTextColor(60);
      const messageLines = doc.splitTextToSize(statusConfig.message, 170);
      doc.text(messageLines, 20, 120);
      
      if (statusConfig.recommendation) {
        const recLines = doc.splitTextToSize(statusConfig.recommendation, 170);
        doc.text(recLines, 20, 135);
      }
    }
    
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text("Raport wygenerowany przez aplikację 4ECO Doradca Fotowoltaiki", 20, 280);
    
    doc.save(`autokonsumpcja-raport-${date.replace(/\./g, "-")}.pdf`);
    toast({ title: "PDF zapisany!", description: "Raport został pobrany na Twoje urządzenie." });
  };

  const shareResults = async () => {
    const shareText = `📊 Mój raport autokonsumpcji PV:
    
🔆 Energia wyprodukowana: ${energyProduced} kWh
⚡ Energia oddana do sieci: ${energyExported} kWh
🏠 Energia zużyta: ${energyConsumed.toLocaleString()} kWh
📈 Poziom autokonsumpcji: ${autoconsumptionLevel.toFixed(1)}%

${statusConfig?.title || ""}
${statusConfig?.message || ""}

Wygenerowano przez 4ECO Doradca Fotowoltaiki`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Raport Autokonsumpcji - 4ECO",
          text: shareText,
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          copyToClipboard(shareText);
        }
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Skopiowano!", description: "Wyniki zostały skopiowane do schowka." });
  };

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-3 mb-6">
        <Sun className="h-8 w-8 text-primary" />
        <h2 className="text-2xl font-bold text-primary">
          Kalkulator Autokonsumpcji
        </h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="produced" className="text-foreground">
            Energia wyprodukowana przez instalację (kWh)
          </Label>
          <Input
            id="produced"
            type="number"
            placeholder="np. 5000"
            value={energyProduced}
            onChange={(e) => setEnergyProduced(e.target.value)}
            min={0}
            className="bg-background border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="exported" className="text-foreground">
            Energia oddana do sieci (kWh)
          </Label>
          <Input
            id="exported"
            type="number"
            placeholder="np. 3500"
            value={energyExported}
            onChange={(e) => setEnergyExported(e.target.value)}
            min={0}
            className="bg-background border-border"
          />
        </div>

        {parseFloat(energyProduced) > 0 && (
          <>
            <div className="pt-4 border-t border-border space-y-4">
              <div className="bg-muted/30 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Energia zużyta na własne potrzeby</p>
                <p className="text-2xl font-bold text-foreground">{energyConsumed.toLocaleString()} kWh</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-foreground font-medium">Poziom autokonsumpcji</span>
                  <span className="text-2xl font-bold text-primary">{autoconsumptionLevel.toFixed(1)}%</span>
                </div>
                <Progress 
                  value={autoconsumptionLevel} 
                  className={`h-4 ${statusConfig?.progressClass ? `[&>div]:${statusConfig.progressClass}` : ''}`}
                />
              </div>
            </div>

            {statusConfig && (
              <div className={`rounded-lg p-4 border ${statusConfig.bgClass}`}>
                <div className="flex items-center gap-2 mb-3">
                  <statusConfig.icon className={`h-6 w-6 ${statusConfig.textClass}`} />
                  <span className={`font-bold text-lg ${statusConfig.textClass}`}>
                    {statusConfig.title}
                  </span>
                </div>
                <p className="text-foreground mb-2">{statusConfig.message}</p>
                {statusConfig.recommendation && (
                  <div className="flex items-start gap-2 mt-3 pt-3 border-t border-border/50">
                    <Battery className={`h-5 w-5 ${statusConfig.textClass} mt-0.5 flex-shrink-0`} />
                    <p className="text-sm text-muted-foreground">{statusConfig.recommendation}</p>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button onClick={generatePDF} variant="outline" className="flex-1">
                <FileDown className="h-4 w-4 mr-2" />
                Zapisz PDF
              </Button>
              <Button onClick={shareResults} variant="outline" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Udostępnij
              </Button>
            </div>
          </>
        )}

        {!parseFloat(energyProduced) && (
          <div className="bg-muted/30 rounded-lg p-6 text-center">
            <Sun className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground">
              Wprowadź dane z Twojej instalacji PV, aby obliczyć poziom autokonsumpcji
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AutoconsumptionCalculator;
