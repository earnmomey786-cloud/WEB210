import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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
    setMobileMenuOpen(false);
    
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

        {/* Desktop Navigation */}
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
          <a 
            href="/login-clientes" 
            className="hover:text-[#8e7951] transition-colors font-medium flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Clientes
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-white/10 py-4 px-4">
          <div className="flex flex-col gap-3">
            <a 
              href="#cennik" 
              onClick={(e) => handleNavClick(e, '#cennik')}
              className="py-2 px-4 hover:bg-white/10 rounded-lg transition text-sm uppercase tracking-wide font-medium"
            >
              Cennik
            </a>
            <a 
              href="#proces" 
              onClick={(e) => handleNavClick(e, '#proces')}
              className="py-2 px-4 hover:bg-white/10 rounded-lg transition text-sm uppercase tracking-wide font-medium"
            >
              Proces
            </a>
            <a 
              href="#faq" 
              onClick={(e) => handleNavClick(e, '#faq')}
              className="py-2 px-4 hover:bg-white/10 rounded-lg transition text-sm uppercase tracking-wide font-medium"
            >
              FAQ
            </a>
            <a 
              href="#kontakt" 
              onClick={(e) => handleNavClick(e, '#kontakt')}
              className="py-2 px-4 hover:bg-white/10 rounded-lg transition text-sm uppercase tracking-wide font-medium"
            >
              Kontakt
            </a>
            <a 
              href="/login-clientes" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-4 hover:bg-white/10 rounded-lg transition text-sm uppercase tracking-wide font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Clientes
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
