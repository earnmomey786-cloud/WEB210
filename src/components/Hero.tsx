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
            <path id="topArc" d="M 40 150 A 110 110 0 0 1 260 150" />
            <path id="bottomArc" d="M 60 170 A 90 90 0 0 0 240 170" />
          </defs>

          <circle cx="150" cy="150" r="135" fill="none" stroke="currentColor" strokeWidth="8" filter="url(#grunge)"/>
          <circle cx="150" cy="150" r="115" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.6"/>

          <text fill="currentColor" fontSize="20" fontWeight="700" letterSpacing="1.5">
            <textPath href="#topArc" startOffset="50%" textAnchor="middle">ODPOWIADAMY ZA NASZĄ PRACĘ</textPath>
          </text>

          <g fontSize="22" fontWeight="800" textAnchor="middle" fill="currentColor">
            <text x="150" y="150">JEŚLI TO NASZ BŁĄD,</text>
            <text x="150" y="178">PŁACIMY MY.</text>
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