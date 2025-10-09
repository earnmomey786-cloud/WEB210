export function Header() {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Si estamos en una página legal, volver al inicio
    if (window.location.pathname !== '/') {
      window.location.href = '/';
    } else {
      // Si ya estamos en inicio, scroll al top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    // Si estamos en una página legal, volver al inicio primero
    if (window.location.pathname !== '/') {
      window.location.href = '/' + id;
    } else {
      // Si ya estamos en inicio, hacer scroll a la sección
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-[#1a1a1a] text-white border-b border-white/10 mx-3 md:mx-6 mt-3 md:mt-6 rounded-[1.5rem] md:rounded-[2.5rem]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-5 flex items-center justify-between">
        <a 
          href="/" 
          onClick={handleLogoClick}
          className="flex items-center gap-2 md:gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img 
            src="/logo-pgk-blanco.png" 
            alt="PGK Logo" 
            className="w-8 h-8 md:w-12 md:h-12 object-contain"
          />
          <div>
            {/* Versión móvil: solo "PGK Hiszpania" */}
            <h1 className="text-sm font-black tracking-tight md:hidden whitespace-nowrap">PGK Hiszpania</h1>
            {/* Versión tablet/desktop: nombre completo */}
            <h1 className="hidden md:block text-base lg:text-lg xl:text-xl font-black tracking-tight whitespace-nowrap">Polska Grupa Konsultingowa S.L</h1>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-10 text-sm uppercase tracking-widest">
          <a 
            href="#cennik" 
            onClick={(e) => handleNavClick(e, '#cennik')}
            className="hover:text-[#8e7951] transition-colors font-medium"
          >
            Cennik
          </a>
          <a 
            href="#proces" 
            onClick={(e) => handleNavClick(e, '#proces')}
            className="hover:text-[#8e7951] transition-colors font-medium"
          >
            Proces
          </a>
          <a 
            href="#faq" 
            onClick={(e) => handleNavClick(e, '#faq')}
            className="hover:text-[#8e7951] transition-colors font-medium"
          >
            FAQ
          </a>
          <a 
            href="#kontakt" 
            onClick={(e) => handleNavClick(e, '#kontakt')}
            className="hover:text-[#8e7951] transition-colors font-medium"
          >
            Kontakt
          </a>
        </nav>
      </div>
    </header>
  );
}
