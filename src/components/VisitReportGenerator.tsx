import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, FileDown, User, Home, Zap, MessageSquare } from "lucide-react";
import { createPDFDocument } from "@/lib/pdfGenerator";
import { useToast } from "@/hooks/use-toast";

interface VisitData {
  // Dane klienta
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientAddress: string;
  
  // Parametry instalacji
  roofType: string;
  roofOrientation: string;
  roofAngle: string;
  proposedPower: string;
  panelCount: string;
  inverterType: string;
  
  // Zalecenia i wycena
  recommendations: string;
  estimatedPrice: string;
  notes: string;
}

const VisitReportGenerator = () => {
  const { toast } = useToast();
  const [data, setData] = useState<VisitData>({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    clientAddress: "",
    roofType: "",
    roofOrientation: "",
    roofAngle: "",
    proposedPower: "",
    panelCount: "",
    inverterType: "",
    recommendations: "",
    estimatedPrice: "",
    notes: ""
  });

  const updateField = (field: keyof VisitData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const generatePDF = () => {
    const date = new Date().toLocaleDateString("pl-PL");
    const pdf = createPDFDocument({
      title: "Raport z wizyty",
      date: date
    });

    let y = 50;

    // Sekcja danych klienta
    y = pdf.addSection("Dane klienta", y);
    if (data.clientName) y = pdf.addField("Imie i nazwisko", data.clientName, y);
    if (data.clientPhone) y = pdf.addField("Telefon", data.clientPhone, y);
    if (data.clientEmail) y = pdf.addField("E-mail", data.clientEmail, y);
    if (data.clientAddress) y = pdf.addField("Adres", data.clientAddress, y);

    y += 10;

    // Sekcja parametrów instalacji
    y = pdf.addSection("Parametry instalacji", y);
    if (data.roofType) y = pdf.addField("Typ dachu", data.roofType, y);
    if (data.roofOrientation) y = pdf.addField("Orientacja dachu", data.roofOrientation, y);
    if (data.roofAngle) y = pdf.addField("Kat nachylenia", data.roofAngle + " stopni", y);
    if (data.proposedPower) y = pdf.addField("Proponowana moc", data.proposedPower + " kWp", y);
    if (data.panelCount) y = pdf.addField("Liczba paneli", data.panelCount + " szt.", y);
    if (data.inverterType) y = pdf.addField("Typ falownika", data.inverterType, y);

    y += 10;

    // Wycena
    if (data.estimatedPrice) {
      y = pdf.addResultBox(
        "Szacunkowa wycena",
        data.estimatedPrice + " zl",
        y,
        [235, 255, 240],
        [30, 120, 60]
      );
    }

    // Zalecenia
    if (data.recommendations) {
      y = pdf.addSection("Zalecenia", y);
      const { doc, margin, contentWidth, removePolishChars } = pdf;
      doc.setFontSize(10);
      doc.setTextColor(50, 50, 50);
      const recLines = doc.splitTextToSize(removePolishChars(data.recommendations), contentWidth);
      doc.text(recLines, margin, y);
      y += recLines.length * 5 + 10;
    }

    // Notatki
    if (data.notes) {
      if (y > 220) {
        pdf.doc.addPage();
        y = 30;
      }
      y = pdf.addSection("Notatki", y);
      const { doc, margin, contentWidth, removePolishChars } = pdf;
      doc.setFontSize(10);
      doc.setTextColor(50, 50, 50);
      const noteLines = doc.splitTextToSize(removePolishChars(data.notes), contentWidth);
      doc.text(noteLines, margin, y);
    }

    pdf.addFooter();
    pdf.doc.save(`raport-wizyty-${data.clientName.replace(/\s/g, "-") || "klient"}-${date.replace(/\./g, "-")}.pdf`);
    toast({ title: "PDF zapisany!", description: "Raport z wizyty został pobrany." });
  };

  const isFormValid = data.clientName && data.clientAddress;

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="h-8 w-8 text-primary" />
        <h2 className="text-2xl font-bold text-primary">
          Raport z Wizyty
        </h2>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Uzupełnij dane z wizyty u klienta i wygeneruj profesjonalny raport PDF.
      </p>

      <div className="space-y-6">
        {/* Dane klienta */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-medium">
            <User className="h-5 w-5" />
            <span>Dane klienta</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Imię i nazwisko *</Label>
              <Input
                id="clientName"
                value={data.clientName}
                onChange={(e) => updateField("clientName", e.target.value)}
                placeholder="Jan Kowalski"
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientPhone">Telefon</Label>
              <Input
                id="clientPhone"
                value={data.clientPhone}
                onChange={(e) => updateField("clientPhone", e.target.value)}
                placeholder="123 456 789"
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientEmail">E-mail</Label>
              <Input
                id="clientEmail"
                type="email"
                value={data.clientEmail}
                onChange={(e) => updateField("clientEmail", e.target.value)}
                placeholder="jan@example.com"
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientAddress">Adres *</Label>
              <Input
                id="clientAddress"
                value={data.clientAddress}
                onChange={(e) => updateField("clientAddress", e.target.value)}
                placeholder="ul. Słoneczna 1, 00-001 Warszawa"
                className="bg-background"
              />
            </div>
          </div>
        </div>

        {/* Parametry instalacji */}
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-primary font-medium">
            <Home className="h-5 w-5" />
            <span>Parametry instalacji</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Typ dachu</Label>
              <Select value={data.roofType} onValueChange={(v) => updateField("roofType", v)}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Wybierz..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="skosny-dachowka">Skośny - dachówka</SelectItem>
                  <SelectItem value="skosny-blacha">Skośny - blacha</SelectItem>
                  <SelectItem value="plaski">Płaski</SelectItem>
                  <SelectItem value="grunt">Grunt</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Orientacja dachu</Label>
              <Select value={data.roofOrientation} onValueChange={(v) => updateField("roofOrientation", v)}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Wybierz..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="poludnie">Południe</SelectItem>
                  <SelectItem value="poludniowy-wschod">Południowy-wschód</SelectItem>
                  <SelectItem value="poludniowy-zachod">Południowy-zachód</SelectItem>
                  <SelectItem value="wschod">Wschód</SelectItem>
                  <SelectItem value="zachod">Zachód</SelectItem>
                  <SelectItem value="wschod-zachod">Wschód-Zachód</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="roofAngle">Kąt nachylenia (°)</Label>
              <Input
                id="roofAngle"
                type="number"
                value={data.roofAngle}
                onChange={(e) => updateField("roofAngle", e.target.value)}
                placeholder="30"
                min={0}
                max={90}
                className="bg-background"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="proposedPower">Proponowana moc (kWp)</Label>
              <Input
                id="proposedPower"
                type="number"
                step="0.1"
                value={data.proposedPower}
                onChange={(e) => updateField("proposedPower", e.target.value)}
                placeholder="10"
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="panelCount">Liczba paneli</Label>
              <Input
                id="panelCount"
                type="number"
                value={data.panelCount}
                onChange={(e) => updateField("panelCount", e.target.value)}
                placeholder="24"
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inverterType">Typ falownika</Label>
              <Input
                id="inverterType"
                value={data.inverterType}
                onChange={(e) => updateField("inverterType", e.target.value)}
                placeholder="np. Huawei SUN2000"
                className="bg-background"
              />
            </div>
          </div>
        </div>

        {/* Wycena i zalecenia */}
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-primary font-medium">
            <Zap className="h-5 w-5" />
            <span>Wycena i zalecenia</span>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="estimatedPrice">Szacunkowa wycena (zł)</Label>
            <Input
              id="estimatedPrice"
              type="number"
              value={data.estimatedPrice}
              onChange={(e) => updateField("estimatedPrice", e.target.value)}
              placeholder="45000"
              className="bg-background max-w-xs"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="recommendations">Zalecenia</Label>
            <Textarea
              id="recommendations"
              value={data.recommendations}
              onChange={(e) => updateField("recommendations", e.target.value)}
              placeholder="Zalecenia dotyczące instalacji, uwagi techniczne..."
              rows={3}
              className="bg-background"
            />
          </div>
        </div>

        {/* Notatki */}
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-primary font-medium">
            <MessageSquare className="h-5 w-5" />
            <span>Notatki z wizyty</span>
          </div>
          
          <Textarea
            value={data.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            placeholder="Dodatkowe uwagi, ustalenia z klientem..."
            rows={4}
            className="bg-background"
          />
        </div>

        {/* Przycisk generowania */}
        <Button 
          onClick={generatePDF} 
          disabled={!isFormValid}
          className="w-full"
          size="lg"
        >
          <FileDown className="h-5 w-5 mr-2" />
          Generuj raport PDF
        </Button>
        
        {!isFormValid && (
          <p className="text-xs text-muted-foreground text-center">
            * Wypełnij wymagane pola (imię i nazwisko, adres)
          </p>
        )}
      </div>
    </Card>
  );
};

export default VisitReportGenerator;
