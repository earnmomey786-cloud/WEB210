export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-[#1a1a1a] text-white border-b border-white/10 mx-3 md:mx-6 mt-3 md:mt-6 rounded-[1.5rem] md:rounded-[2.5rem]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-5 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
          <img 
            src="/logo-pgk-blanco.png" 
            alt="PGK Logo" 
            className="w-8 h-8 md:w-12 md:h-12 object-contain"
          />
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
      </div>
    </header>
  );
}
