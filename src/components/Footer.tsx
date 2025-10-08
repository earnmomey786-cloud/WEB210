import { FileText } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-[#8e7951]" />
              <div>
                <span className="font-black text-white text-lg uppercase tracking-tight block">Podatek IRNR</span>
                <span className="text-[10px] text-gray-600 uppercase tracking-wider">Model 210</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Profesjonalna obsługa podatkowa dla właścicieli nieruchomości w Hiszpanii
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Usługi</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#cennik" className="hover:text-[#8e7951] transition-colors">
                  Model 210
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#8e7951] transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#proces" className="hover:text-[#8e7951] transition-colors">
                  Proces
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#kontakt" className="hover:text-[#8e7951] transition-colors">
                  Kontakt
                </a>
              </li>
              <li>
                <a href="/legal/privacy" className="hover:text-[#8e7951] transition-colors">
                  Privacidad / Prywatność
                </a>
              </li>
              <li>
                <a href="/legal/cookies" className="hover:text-[#8e7951] transition-colors">
                  Cookies
                </a>
              </li>
              <li>
                <a href="/legal/terms" className="hover:text-[#8e7951] transition-colors">
                  Aviso Legal / Nota Prawna
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Kontakt</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:info@pgkhiszpania.com" className="hover:text-[#8e7951] transition-colors block">
                  info@pgkhiszpania.com
                </a>
              </li>
              <li className="text-gray-500">
                Torrevieja (Alicante), España
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p>© 2025 Polska Grupa Konsultingowa SL. Wszelkie prawa zastrzeżone.</p>
              <a 
                href="https://www.boe.es/borme/dias/2025/08/07/pdfs/BORME-A-2025-149-03.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#8e7951] transition-colors underline"
              >
                Sprawdź nasz rejestr
              </a>
              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    // Reabrir configuración de cookies
                    localStorage.removeItem('cookieConsent');
                    window.location.reload();
                  }}
                  className="hover:text-[#8e7951] transition-colors underline"
                >
                  Gestionar Cookies / Zarządzaj Zgodą
                </button>
              </div>
            </div>
            <p className="uppercase tracking-wider">
              Servicio fiscal profesional / Profesjonalna obsługa podatkowa
            </p>
          </div>

          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">Ważna Informacja Prawna:</h4>
            <p className="text-xs leading-relaxed text-gray-500">
              Stwierdzenia zawarte na tej stronie internetowej dotyczące ochrony podatkowej, braku błędów i skutków wobec administracji lub sądów należy rozumieć w ramach prawnych ograniczeń wiążących interpretacji podatkowych: ich skuteczność zależy od braku istotnych zmian w stanie faktycznym, obowiązujących przepisach lub interpretacji administracyjnej i nie wykluczają one sankcji w przypadku zatajenia, oszustwa lub innych sytuacji uregulowanych prawem. Dla każdej konkretnej sytuacji zalecamy skonsultowanie się z profesjonalną opinią i obowiązującymi przepisami.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
