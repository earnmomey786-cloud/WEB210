import { TypewriterEffectSmooth } from './ui/typewriter-effect';
import { Button } from './ui/moving-border';

export function Hero() {
  const words = [
    { text: 'PODATEK' },
    { text: 'IRNR' },
    { text: '(210)', className: 'text-[#8e7951]' },
  ];

  return (
    <section className="relative min-h-[85vh] mx-6 mt-6 rounded-[2.5rem] overflow-hidden flex flex-col shadow-xl">
      {/* Background image - properties/houses in Spain */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1920')"
        }}
      ></div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/70"></div>

      {/* Guarantee Stamp */}
      <div className="stamp-wrap" aria-label="Gwarancja odpowiedzialności: jeśli to nasz błąd, płacimy my." role="img">
        <svg viewBox="0 0 300 300" className="stamp-svg" aria-hidden="true">
          <defs>
            <filter id="grunge">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
            </filter>
            {/* Path más interior para el texto - radio más pequeño */}
            <path id="topArc" d="M 45 150 A 105 105 0 0 1 255 150" />
          </defs>

          {/* Círculo de fondo blanco para mejor contraste */}
          <circle cx="150" cy="150" r="142" fill="white" opacity="1"/>
          
          {/* Borde exterior oscuro */}
          <circle cx="150" cy="150" r="138" fill="none" stroke="#0f172a" strokeWidth="6" filter="url(#grunge)"/>
          
          {/* Borde interior dorado (color de la web) */}
          <circle cx="150" cy="150" r="125" fill="none" stroke="#8e7951" strokeWidth="4" opacity="0.9"/>

          {/* Texto superior curvado - ahora más dentro del sello */}
          <text fill="#0f172a" fontSize="18" fontWeight="900" letterSpacing="2.5" style={{ textTransform: 'uppercase' }}>
            <textPath href="#topArc" startOffset="50%" textAnchor="middle">ODPOWIADAMY ZA PRACĘ</textPath>
          </text>

          {/* Texto central - MUCHO más grande y legible */}
          <g textAnchor="middle" fill="#0f172a" fontFamily="Arial, sans-serif">
            <text x="150" y="150" fontSize="28" fontWeight="900" letterSpacing="1">JEŚLI TO</text>
            <text x="150" y="180" fontSize="28" fontWeight="900" letterSpacing="1">NASZ BŁĄD,</text>
            <text x="150" y="210" fontSize="26" fontWeight="900" letterSpacing="0.5">PŁACIMY MY.</text>
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 py-16">
        <TypewriterEffectSmooth
          words={words}
          className="text-5xl md:text-6xl lg:text-7xl text-center text-[#0a0a0a] leading-tight tracking-tight"
        />

        <p className="text-base md:text-lg text-gray-700 text-center max-w-2xl mb-10 leading-relaxed">
          Rozliczenie właścicieli z Polski posiadających nieruchomości w Hiszpanii.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button
            as="a"
            href="#cennik"
            borderRadius="1.75rem"
            containerClassName="w-auto"
            className="bg-white text-[#0a0a0a] border-gray-200 px-8 py-3.5"
            borderClassName="bg-[radial-gradient(#8e7951_40%,transparent_60%)]"
          >
            Zobacz cennik
          </Button>
          <a
            href="#kontakt"
            className="px-8 py-3.5 bg-[#0a0a0a] text-white rounded-full font-semibold hover:bg-[#1a1a1a] transition-all shadow-md text-sm flex items-center justify-center"
          >
            Zostaw zapytanie
          </a>
        </div>

        <p className="text-xs text-gray-600 mb-6">
          np. Właściciele nieruchomości w Costa del Sol, Alicante, Walencji
        </p>
      </div>

    </section>
  );
}