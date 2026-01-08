import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Tv, 
  Refrigerator, 
  WashingMachine, 
  Laptop, 
  Lightbulb,
  Zap,
  Plus,
  Trash2,
  AlertTriangle,
  FileDown,
  Share2
} from "lucide-react";
import { jsPDF } from "jspdf";
import { useToast } from "@/hooks/use-toast";

interface Device {
  id: string;
  name: string;
  power: number; // W
  hoursPerDay: number;
  icon: React.ReactNode;
  selected: boolean;
}

const defaultDevices: Device[] = [
  { id: "tv", name: "Telewizor LED 55\"", power: 100, hoursPerDay: 4, icon: <Tv className="h-5 w-5" />, selected: false },
  { id: "fridge", name: "Lodówka", power: 150, hoursPerDay: 8, icon: <Refrigerator className="h-5 w-5" />, selected: false },
  { id: "freezer", name: "Zamrażarka", power: 200, hoursPerDay: 8, icon: <Refrigerator className="h-5 w-5" />, selected: false },
  { id: "washer", name: "Pralka (cykl)", power: 500, hoursPerDay: 1, icon: <WashingMachine className="h-5 w-5" />, selected: false },
  { id: "dryer", name: "Suszarka (cykl)", power: 2500, hoursPerDay: 1, icon: <WashingMachine className="h-5 w-5" />, selected: false },
  { id: "dishwasher", name: "Zmywarka (cykl)", power: 1800, hoursPerDay: 1, icon: <WashingMachine className="h-5 w-5" />, selected: false },
  { id: "laptop", name: "Laptop", power: 65, hoursPerDay: 6, icon: <Laptop className="h-5 w-5" />, selected: false },
  { id: "desktop", name: "Komputer stacjonarny", power: 300, hoursPerDay: 4, icon: <Laptop className="h-5 w-5" />, selected: false },
  { id: "lights", name: "Oświetlenie LED (10 żarówek)", power: 100, hoursPerDay: 2, icon: <Lightbulb className="h-5 w-5" />, selected: false },
  { id: "vacuum", name: "Odkurzacz", power: 1500, hoursPerDay: 0.5, icon: <Zap className="h-5 w-5" />, selected: false },
  { id: "iron", name: "Żelazko", power: 2000, hoursPerDay: 0.5, icon: <Zap className="h-5 w-5" />, selected: false },
  { id: "aircon", name: "Klimatyzacja", power: 1500, hoursPerDay: 4, icon: <Zap className="h-5 w-5" />, selected: false },
  { id: "boiler", name: "Bojler elektryczny", power: 2000, hoursPerDay: 2, icon: <Zap className="h-5 w-5" />, selected: false },
  { id: "pump", name: "Pompa ciepła", power: 2500, hoursPerDay: 6, icon: <Zap className="h-5 w-5" />, selected: false },
];

const DeviceUsageCalculator = () => {
  const [devices, setDevices] = useState<Device[]>(defaultDevices);
  const [electricityPrice, setElectricityPrice] = useState(1.2);
  const [customName, setCustomName] = useState("");
  const [customPower, setCustomPower] = useState("");
  const [customHours, setCustomHours] = useState("");
  const { toast } = useToast();

  const toggleDevice = (id: string) => {
    setDevices(devices.map(d => 
      d.id === id ? { ...d, selected: !d.selected } : d
    ));
  };

  const updateDeviceHours = (id: string, hours: number) => {
    setDevices(devices.map(d => 
      d.id === id ? { ...d, hoursPerDay: Math.max(0, Math.min(24, hours)) } : d
    ));
  };

  const addCustomDevice = () => {
    if (customName && customPower && customHours) {
      const newDevice: Device = {
        id: `custom-${Date.now()}`,
        name: customName,
        power: Number(customPower),
        hoursPerDay: Number(customHours),
        icon: <Zap className="h-5 w-5" />,
        selected: true,
      };
      setDevices([...devices, newDevice]);
      setCustomName("");
      setCustomPower("");
      setCustomHours("");
    }
  };

  const removeDevice = (id: string) => {
    setDevices(devices.filter(d => d.id !== id));
  };

  const selectedDevices = devices.filter(d => d.selected);
  
  // Obliczenia
  // Zakładamy ~5h produkcji PV dziennie średnio w roku
  const pvProductionHours = 5;
  
  // Dzienne zużycie wybranych urządzeń
  const dailyUsageKwh = selectedDevices.reduce((sum, d) => 
    sum + (d.power * d.hoursPerDay / 1000), 0
  );
  
  // Roczne zużycie
  const yearlyUsageKwh = dailyUsageKwh * 365;
  
  // Energia która mogłaby być pokryta z PV (urządzenia działające w dzień)
  // Zakładamy że urządzenia mogą działać podczas produkcji PV
  const potentialPvUsageDaily = selectedDevices.reduce((sum, d) => {
    const hoursInPvTime = Math.min(d.hoursPerDay, pvProductionHours);
    return sum + (d.power * hoursInPvTime / 1000);
  }, 0);
  
  const potentialPvUsageYearly = potentialPvUsageDaily * 365;
  
  // Oszczędności jeśli urządzenia działają podczas produkcji PV
  const savingsWithPv = potentialPvUsageYearly * electricityPrice;
  
  // Koszty jeśli urządzenia działają poza czasem produkcji
  const costWithoutPv = yearlyUsageKwh * electricityPrice;
  
  // Strata przy braku autokonsumpcji (różnica między pełną ceną a net-billing)
  const netBillingRate = 0.45;
  const lossPerKwh = electricityPrice - netBillingRate;
  const yearlyLoss = potentialPvUsageYearly * lossPerKwh;

  const generatePDF = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString("pl-PL");
    
    doc.setFontSize(20);
    doc.setTextColor(0, 68, 102);
    doc.text("4ECO - Raport Zużycia Urządzeń", 20, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Wygenerowano: ${date}`, 20, 30);
    
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Cena prądu: ${electricityPrice.toFixed(2)} zł/kWh`, 20, 45);
    doc.text(`Wybrane urządzenia:`, 20, 55);
    
    let yPos = 65;
    selectedDevices.forEach((device) => {
      doc.text(`• ${device.name}: ${device.power}W, ${device.hoursPerDay}h/dzień`, 25, yPos);
      yPos += 8;
    });
    
    yPos += 10;
    doc.setFontSize(14);
    doc.setTextColor(0, 68, 102);
    doc.text(`Podsumowanie:`, 20, yPos);
    
    yPos += 12;
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Dzienne zużycie: ${dailyUsageKwh.toFixed(1)} kWh`, 20, yPos);
    doc.text(`Roczne zużycie: ${yearlyUsageKwh.toFixed(0)} kWh`, 20, yPos + 10);
    
    doc.setTextColor(0, 128, 0);
    doc.text(`Potencjalne oszczędności z PV: ${savingsWithPv.toFixed(0)} zł/rok`, 20, yPos + 25);
    
    doc.setTextColor(200, 0, 0);
    doc.text(`Strata bez autokonsumpcji: ${yearlyLoss.toFixed(0)} zł/rok`, 20, yPos + 35);
    
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text("Raport wygenerowany przez aplikację 4ECO Doradca Fotowoltaiki", 20, 280);
    
    doc.save(`urzadzenia-raport-${date.replace(/\./g, "-")}.pdf`);
    toast({ title: "PDF zapisany!", description: "Raport został pobrany na Twoje urządzenie." });
  };

  const shareResults = async () => {
    const devicesList = selectedDevices.map(d => `• ${d.name}: ${d.power}W, ${d.hoursPerDay}h/dzień`).join("\n");
    
    const shareText = `📊 Mój raport zużycia urządzeń:

📱 Wybrane urządzenia:
${devicesList}

⚡ Dzienne zużycie: ${dailyUsageKwh.toFixed(1)} kWh
📅 Roczne zużycie: ${yearlyUsageKwh.toFixed(0)} kWh
💰 Potencjalne oszczędności z PV: ${savingsWithPv.toFixed(0)} zł/rok
❌ Strata bez autokonsumpcji: ${yearlyLoss.toFixed(0)} zł/rok

Wygenerowano przez 4ECO Doradca Fotowoltaiki`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Raport Zużycia Urządzeń - 4ECO",
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
        <Zap className="h-8 w-8 text-primary" />
        <h2 className="text-2xl font-bold text-primary">
          Kalkulator Zużycia Urządzeń
        </h2>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Wybierz urządzenia, które możesz włączać w ciągu dnia podczas produkcji prądu z PV. 
        Zobacz ile tracisz nie korzystając z nich w optymalnym czasie!
      </p>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="price2" className="text-foreground">
            Cena prądu (zł/kWh)
          </Label>
          <Input
            id="price2"
            type="number"
            value={electricityPrice}
            onChange={(e) => setElectricityPrice(Number(e.target.value) || 0)}
            min={0.5}
            max={3}
            step={0.1}
            className="bg-background border-border max-w-32"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-foreground font-bold">Wybierz urządzenia:</Label>
          <div className="grid gap-2 max-h-64 overflow-y-auto pr-2">
            {devices.map((device) => (
              <div 
                key={device.id}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  device.selected 
                    ? "bg-primary/10 border-primary" 
                    : "bg-muted/20 border-border hover:border-primary/50"
                }`}
              >
                <Checkbox
                  checked={device.selected}
                  onCheckedChange={() => toggleDevice(device.id)}
                  className="border-primary"
                />
                <div className="text-primary">{device.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{device.name}</p>
                  <p className="text-xs text-muted-foreground">{device.power}W</p>
                </div>
                {device.selected && (
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      value={device.hoursPerDay}
                      onChange={(e) => updateDeviceHours(device.id, Number(e.target.value))}
                      className="w-16 h-8 text-xs bg-background"
                      min={0}
                      max={24}
                      step={0.5}
                    />
                    <span className="text-xs text-muted-foreground">h/dzień</span>
                  </div>
                )}
                {device.id.startsWith("custom-") && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeDevice(device.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="border border-dashed border-border rounded-lg p-4 space-y-3">
          <Label className="text-foreground text-sm">Dodaj własne urządzenie:</Label>
          <div className="grid grid-cols-3 gap-2">
            <Input
              placeholder="Nazwa"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="bg-background"
            />
            <Input
              placeholder="Moc (W)"
              type="number"
              value={customPower}
              onChange={(e) => setCustomPower(e.target.value)}
              className="bg-background"
            />
            <Input
              placeholder="Godziny/dzień"
              type="number"
              value={customHours}
              onChange={(e) => setCustomHours(e.target.value)}
              className="bg-background"
            />
          </div>
          <Button 
            onClick={addCustomDevice} 
            variant="outline" 
            size="sm"
            disabled={!customName || !customPower || !customHours}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Dodaj urządzenie
          </Button>
        </div>

        {selectedDevices.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/30 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Dzienne zużycie</p>
                <p className="text-lg font-bold text-foreground">{dailyUsageKwh.toFixed(1)} kWh</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Roczne zużycie</p>
                <p className="text-lg font-bold text-foreground">{yearlyUsageKwh.toFixed(0)} kWh</p>
              </div>
            </div>

            <div className="bg-primary/10 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">
                Jeśli włączysz te urządzenia w ciągu dnia (podczas produkcji PV):
              </p>
              <div className="flex justify-between items-center">
                <span className="text-foreground">Oszczędzasz rocznie:</span>
                <span className="text-primary font-bold text-xl">{savingsWithPv.toFixed(0)} zł</span>
              </div>
            </div>

            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <span className="font-bold text-destructive">Jeśli nie wykorzystujesz PV:</span>
              </div>
              <p className="text-2xl font-bold text-destructive mb-2">
                Tracisz {yearlyLoss.toFixed(0)} zł rocznie!
              </p>
              <p className="text-xs text-muted-foreground">
                Za każdą kWh oddaną do sieci zamiast zużyć, tracisz {lossPerKwh.toFixed(2)} zł 
                (różnica między ceną zakupu {electricityPrice.toFixed(2)} zł a stawką net-billing {netBillingRate} zł).
              </p>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="text-sm font-medium text-primary mb-2">💡 Wskazówka:</p>
              <p className="text-xs text-muted-foreground">
                Uruchamiaj pralkę, zmywarkę i inne energochłonne urządzenia między 10:00 a 15:00, 
                gdy produkcja z paneli jest najwyższa. Rozważ także magazyn energii lub sterowniki 
                inteligentne, które automatycznie włączają urządzenia podczas nadprodukcji.
              </p>
            </div>

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
          </div>
        )}
      </div>
    </Card>
  );
};

export default DeviceUsageCalculator;
