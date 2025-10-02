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
            <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Firma</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#kontakt" className="hover:text-[#8e7951] transition-colors">
                  Kontakt
                </a>
              </li>
              <li>
                <a href="/regulamin" className="hover:text-[#8e7951] transition-colors">
                  Regulamin
                </a>
              </li>
              <li>
                <a href="/polityka-prywatnosci" className="hover:text-[#8e7951] transition-colors">
                  Prywatność
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Kontakt</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:kontakt@podatek-irnr.pl" className="hover:text-[#8e7951] transition-colors block">
                  kontakt@podatek-irnr.pl
                </a>
              </li>
              <li>
                <a href="tel:+34123456789" className="hover:text-[#8e7951] transition-colors block">
                  +34 123 456 789
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
            <p>© 2025 Podatek IRNR. Wszelkie prawa zastrzeżone.</p>
            <p className="uppercase tracking-wider">
              Profesjonalna obsługa podatkowa
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
