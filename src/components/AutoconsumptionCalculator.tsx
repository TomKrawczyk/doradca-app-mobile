import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Zap, Sun, TrendingUp } from "lucide-react";

const AutoconsumptionCalculator = () => {
  const [installationPower, setInstallationPower] = useState(6);
  const [autoconsumption, setAutoconsumption] = useState(30);
  const [electricityPrice, setElectricityPrice] = useState(1.2);

  // Średnia roczna produkcja w Polsce: ~1000 kWh na 1 kWp
  const yearlyProduction = installationPower * 1000;
  
  // Energia zużyta bezpośrednio z PV
  const directUsage = yearlyProduction * (autoconsumption / 100);
  
  // Energia oddana do sieci
  const gridExport = yearlyProduction - directUsage;
  
  // Wartość bezpośrednio zużytej energii (pełna cena)
  const directSavings = directUsage * electricityPrice;
  
  // Wartość energii oddanej do sieci (net-billing: ~0.45 zł/kWh średnio)
  const netBillingRate = 0.45;
  const gridSavings = gridExport * netBillingRate;
  
  // Całkowite oszczędności
  const totalSavings = directSavings + gridSavings;
  
  // Strata z powodu niskiej autokonsumpcji
  const potentialSavings = yearlyProduction * electricityPrice;
  const lostSavings = potentialSavings - totalSavings;

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-3 mb-6">
        <Sun className="h-8 w-8 text-primary" />
        <h2 className="text-2xl font-bold text-primary">
          Kalkulator Autokonsumpcji
        </h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-foreground">
            Moc instalacji: <span className="text-primary font-bold">{installationPower} kWp</span>
          </Label>
          <Slider
            value={[installationPower]}
            onValueChange={(value) => setInstallationPower(value[0])}
            min={3}
            max={15}
            step={0.5}
            className="w-full"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-foreground">
            Poziom autokonsumpcji: <span className="text-primary font-bold">{autoconsumption}%</span>
          </Label>
          <Slider
            value={[autoconsumption]}
            onValueChange={(value) => setAutoconsumption(value[0])}
            min={10}
            max={80}
            step={5}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Typowe wartości: 20-30% bez magazynu, 50-70% z magazynem energii
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price" className="text-foreground">
            Cena prądu (zł/kWh)
          </Label>
          <Input
            id="price"
            type="number"
            value={electricityPrice}
            onChange={(e) => setElectricityPrice(Number(e.target.value) || 0)}
            min={0.5}
            max={3}
            step={0.1}
            className="bg-background border-border"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <Zap className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-xs text-muted-foreground mb-1">Roczna produkcja</p>
            <p className="text-lg font-bold text-foreground">{yearlyProduction.toLocaleString()} kWh</p>
          </div>
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <Sun className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-xs text-muted-foreground mb-1">Zużyte bezpośrednio</p>
            <p className="text-lg font-bold text-foreground">{directUsage.toLocaleString()} kWh</p>
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <div className="flex justify-between items-center bg-primary/10 rounded-lg p-3">
            <span className="text-foreground">Oszczędności z autokonsumpcji:</span>
            <span className="text-primary font-bold text-lg">{directSavings.toFixed(0)} zł/rok</span>
          </div>
          <div className="flex justify-between items-center bg-muted/30 rounded-lg p-3">
            <span className="text-foreground">Zwrot z net-billingu:</span>
            <span className="text-foreground font-bold">{gridSavings.toFixed(0)} zł/rok</span>
          </div>
          <div className="flex justify-between items-center bg-primary/20 rounded-lg p-3 border border-primary">
            <span className="text-primary font-bold">Całkowite oszczędności:</span>
            <span className="text-primary font-bold text-xl">{totalSavings.toFixed(0)} zł/rok</span>
          </div>
        </div>

        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-destructive" />
            <span className="font-bold text-destructive">Tracisz rocznie:</span>
          </div>
          <p className="text-2xl font-bold text-destructive mb-2">{lostSavings.toFixed(0)} zł</p>
          <p className="text-xs text-muted-foreground">
            Przy 100% autokonsumpcji mógłbyś oszczędzić {potentialSavings.toFixed(0)} zł rocznie. 
            Zwiększ autokonsumpcję uruchamiając urządzenia w ciągu dnia!
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AutoconsumptionCalculator;
