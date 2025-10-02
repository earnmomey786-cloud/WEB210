import { useState } from 'react';

const steps = [
  {
    number: 1,
    title: 'Uwaga do Twojego zapytania',
    description: 'Rozpoczynamy od dokładnego zrozumienia Twojej sytuacji podatkowej i celów'
  },
  {
    number: 2,
    title: 'Analiza dokumentów',
    description: 'Weryfikujemy wszystkie dokumenty i wartości katastralne'
  },
  {
    number: 3,
    title: 'Przygotowanie deklaracji',
    description: 'Tworzymy kompletną i zgodną z prawem deklarację Model 210'
  },
  {
    number: 4,
    title: 'Przegląd i zatwierdzenie',
    description: 'Weryfikujesz przygotowaną deklarację przed złożeniem'
  },
  {
    number: 5,
    title: 'Złożenie',
    description: 'Składamy deklarację w hiszpańskiej Agencji Podatkowej'
  },
  {
    number: 6,
    title: 'Potwierdzenie',
    description: 'Otrzymujesz oficjalne potwierdzenie złożenia i płatności'
  }
];

export function ProcessSteps() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section id="proces" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <p className="text-sm uppercase tracking-[0.3em] text-[#8e7951] font-semibold mb-4 text-center">
            Jak działamy
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-center mb-8 text-[#1a1a1a]">
            Proces pracy
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {steps.map((step) => (
            <div
              key={step.number}
              onMouseEnter={() => setActiveStep(step.number)}
              className={`group relative bg-gradient-to-br p-8 transition-all duration-300 cursor-pointer ${
                activeStep === step.number
                  ? 'from-[#1a1a1a] to-[#2a2a2a] scale-105 shadow-2xl'
                  : 'from-gray-50 to-gray-100 hover:from-gray-100 hover:to-white hover:shadow-xl'
              }`}
            >
              <div className="relative z-10">
                <div
                  className={`text-7xl font-black mb-4 transition-colors ${
                    activeStep === step.number ? 'text-[#8e7951]' : 'text-gray-300'
                  }`}
                >
                  {step.number}
                </div>
                <h3
                  className={`text-xl font-bold mb-3 transition-colors ${
                    activeStep === step.number ? 'text-white' : 'text-[#1a1a1a]'
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed transition-colors ${
                    activeStep === step.number ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {step.description}
                </p>
              </div>

              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-[#8e7951] transition-all duration-300 ${
                  activeStep === step.number ? 'opacity-100' : 'opacity-0'
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
