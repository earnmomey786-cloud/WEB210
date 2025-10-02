import { FileText } from 'lucide-react';

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-[#1a1a1a] text-white border-b border-white/10 mx-3 md:mx-6 mt-3 md:mt-6 rounded-[1.5rem] md:rounded-[2.5rem]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-5 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
          <FileText className="w-5 h-5 md:w-7 md:h-7 text-[#8e7951]" />
          <div>
            <h1 className="text-sm md:text-lg font-black tracking-tight uppercase">Podatek IRNR</h1>
            <p className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-wider">Model 210</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-10 text-xs uppercase tracking-widest">
          <a href="#cennik" className="hover:text-[#8e7951] transition-colors font-medium">
            Cennik
          </a>
          <a href="#proces" className="hover:text-[#8e7951] transition-colors font-medium">
            Proces
          </a>
          <a href="#faq" className="hover:text-[#8e7951] transition-colors font-medium">
            FAQ
          </a>
          <a href="#kontakt" className="hover:text-[#8e7951] transition-colors font-medium">
            Kontakt
          </a>
        </nav>

        <a
          href="tel:+34123456789"
          className="text-xs md:text-sm font-bold hover:text-[#8e7951] transition-colors tracking-wider"
        >
          <span className="hidden sm:inline">+34 123 456 789</span>
          <span className="sm:hidden">Llamar</span>
        </a>
      </div>
    </header>
  );
}
