import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Sun, AlertTriangle, TrendingUp, Battery, PartyPopper } from "lucide-react";

const AutoconsumptionCalculator = () => {
  const [energyProduced, setEnergyProduced] = useState<string>("");
  const [energyExported, setEnergyExported] = useState<string>("");

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
