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

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 py-16">
        <TypewriterEffectSmooth
          words={words}
          className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-center text-[#0a0a0a] leading-tight tracking-tight"
        />

        <p className="text-base md:text-lg text-gray-700 text-center max-w-2xl mb-10 leading-relaxed">
          Jeśli doradca podatkowy, który rozlicza Twoje podatki, nie przekazuje Ci tabel amortyzacji, tracisz pieniądze.
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
            href="#proces"
            className="px-8 py-3.5 bg-[#0a0a0a] text-white rounded-full font-semibold hover:bg-[#1a1a1a] transition-all shadow-md text-base flex items-center justify-center"
          >
            Zostaw zapytanie
          </a>
        </div>
      </div>

    </section>
  );
}