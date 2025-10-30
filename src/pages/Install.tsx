import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Download, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const Install = () => {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

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
            <Smartphone className="h-16 w-16 text-primary mx-auto animate-float" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Zainstaluj Aplikację
            </h1>
            <p className="text-xl text-foreground">
              Używaj 4ECO jak natywnej aplikacji mobilnej
            </p>
          </div>

          {isInstallable && (
            <Card className="p-6 bg-gradient-primary/10 border-2 border-primary text-center">
              <Download className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-primary mb-4">
                Aplikacja gotowa do instalacji!
              </h2>
              <p className="text-foreground mb-6">
                Kliknij poniższy przycisk, aby zainstalować aplikację na swoim urządzeniu
              </p>
              <Button 
                onClick={handleInstall}
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6"
              >
                <Download className="mr-2 h-5 w-5" />
                Zainstaluj Teraz
              </Button>
            </Card>
          )}

          <Card className="p-6 bg-card border-border">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Instrukcja instalacji
            </h2>
            <div className="space-y-4 text-foreground">
              <div>
                <h3 className="font-bold text-primary mb-2">Android (Chrome)</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Otwórz menu przeglądarki (trzy kropki)</li>
                  <li>Wybierz "Dodaj do ekranu głównego" lub "Zainstaluj aplikację"</li>
                  <li>Potwierdź instalację</li>
                  <li>Aplikacja pojawi się na ekranie głównym</li>
                </ol>
              </div>
              <div>
                <h3 className="font-bold text-primary mb-2">iPhone/iPad (Safari)</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Kliknij przycisk "Udostępnij" (kwadrat ze strzałką)</li>
                  <li>Przewiń w dół i wybierz "Dodaj do ekranu początkowego"</li>
                  <li>Nadaj nazwę i kliknij "Dodaj"</li>
                  <li>Ikona aplikacji pojawi się na ekranie głównym</li>
                </ol>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Korzyści z instalacji
            </h2>
            <ul className="space-y-3 text-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">✓</span>
                <span>Szybszy dostęp - ikona na ekranie głównym</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">✓</span>
                <span>Działa offline - przeglądaj treści bez internetu</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">✓</span>
                <span>Wygląda jak natywna aplikacja</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">✓</span>
                <span>Nie zajmuje miejsca jak zwykła aplikacja</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">✓</span>
                <span>Automatyczne aktualizacje</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Install;
