import { jsPDF } from "jspdf";

// Helper do usuwania polskich znaków (jsPDF nie obsługuje ich domyślnie)
const removePolishChars = (text: string): string => {
  const polishChars: Record<string, string> = {
    'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n',
    'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
    'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N',
    'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z'
  };
  return text.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, char => polishChars[char] || char);
};

interface PDFConfig {
  title: string;
  date: string;
}

export const createPDFDocument = (config: PDFConfig) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  
  // Prosty nagłówek z tytułem
  doc.setFillColor(0, 82, 122);
  doc.rect(0, 0, pageWidth, 35, 'F');
  
  // Tytuł raportu
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  const titleClean = removePolishChars(config.title);
  doc.text(titleClean, margin, 22);
  
  // Data
  doc.setFontSize(10);
  doc.setTextColor(200, 220, 230);
  doc.text(config.date, pageWidth - margin, 22, { align: "right" });
  
  // Stopka
  const addFooter = () => {
    doc.setFillColor(245, 247, 250);
    doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("Raport wygenerowany przez aplikacje 4ECO", pageWidth / 2, pageHeight - 6, { align: "center" });
  };
  
  return {
    doc,
    margin,
    contentWidth,
    pageWidth,
    pageHeight,
    removePolishChars,
    addFooter,
    
    // Helper do dodawania sekcji
    addSection: (title: string, y: number, color: [number, number, number] = [0, 82, 122]) => {
      doc.setFillColor(color[0], color[1], color[2]);
      doc.roundedRect(margin, y, 4, 16, 2, 2, 'F');
      doc.setFontSize(14);
      doc.setTextColor(color[0], color[1], color[2]);
      doc.text(removePolishChars(title), margin + 10, y + 11);
      return y + 25;
    },
    
    // Helper do dodawania pola z wartością
    addField: (label: string, value: string, y: number) => {
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(removePolishChars(label), margin, y);
      doc.setFontSize(12);
      doc.setTextColor(30, 30, 30);
      doc.text(removePolishChars(value), margin, y + 6);
      return y + 16;
    },
    
    // Helper do dodawania boxu z wynikiem
    addResultBox: (label: string, value: string, y: number, bgColor: [number, number, number] = [240, 248, 255], textColor: [number, number, number] = [0, 82, 122]) => {
      doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
      doc.roundedRect(margin, y, contentWidth, 30, 4, 4, 'F');
      
      doc.setFontSize(11);
      doc.setTextColor(80, 80, 80);
      doc.text(removePolishChars(label), margin + 10, y + 12);
      
      doc.setFontSize(18);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.text(removePolishChars(value), pageWidth - margin - 10, y + 20, { align: "right" });
      
      return y + 40;
    },
    
    // Helper do dodawania statusu
    addStatusBox: (title: string, message: string, recommendation: string | null, y: number, statusType: "low" | "medium" | "high") => {
      const colors = {
        low: { bg: [255, 235, 235] as [number, number, number], accent: [200, 50, 50] as [number, number, number], text: [150, 30, 30] as [number, number, number] },
        medium: { bg: [255, 248, 230] as [number, number, number], accent: [200, 150, 0] as [number, number, number], text: [140, 100, 0] as [number, number, number] },
        high: { bg: [235, 255, 240] as [number, number, number], accent: [40, 160, 80] as [number, number, number], text: [30, 120, 60] as [number, number, number] }
      };
      
      const c = colors[statusType];
      const boxHeight = recommendation ? 55 : 40;
      
      doc.setFillColor(c.bg[0], c.bg[1], c.bg[2]);
      doc.roundedRect(margin, y, contentWidth, boxHeight, 4, 4, 'F');
      
      // Pasek boczny
      doc.setFillColor(c.accent[0], c.accent[1], c.accent[2]);
      doc.roundedRect(margin, y, 5, boxHeight, 2, 2, 'F');
      
      // Tytuł
      doc.setFontSize(13);
      doc.setTextColor(c.text[0], c.text[1], c.text[2]);
      doc.text(removePolishChars(title), margin + 12, y + 14);
      
      // Wiadomość
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      const messageLines = doc.splitTextToSize(removePolishChars(message), contentWidth - 20);
      doc.text(messageLines, margin + 12, y + 26);
      
      // Zalecenie
      if (recommendation) {
        doc.setFontSize(9);
        doc.setTextColor(80, 80, 80);
        const recLines = doc.splitTextToSize(">> " + removePolishChars(recommendation), contentWidth - 20);
        doc.text(recLines, margin + 12, y + 42);
      }
      
      return y + boxHeight + 10;
    },
    
    // Helper do listy urządzeń
    addDeviceList: (devices: Array<{ name: string; power: number; hoursPerDay: number }>, y: number) => {
      let currentY = y;
      
      devices.forEach((device, index) => {
        if (currentY > 240) {
          doc.addPage();
          currentY = 30;
        }
        
        const isEven = index % 2 === 0;
        if (isEven) {
          doc.setFillColor(248, 250, 252);
          doc.rect(margin, currentY - 4, contentWidth, 10, 'F');
        }
        
        doc.setFontSize(10);
        doc.setTextColor(50, 50, 50);
        const deviceName = removePolishChars(device.name);
        doc.text(`• ${deviceName}`, margin + 5, currentY + 2);
        
        doc.setTextColor(100, 100, 100);
        doc.text(`${device.power}W, ${device.hoursPerDay}h/dzien`, pageWidth - margin - 5, currentY + 2, { align: "right" });
        
        currentY += 10;
      });
      
      return currentY + 5;
    }
  };
};
