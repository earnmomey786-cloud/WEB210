import { useState } from 'react';

const steps = [
  {
    number: 1,
    title: 'Analizujemy Twoją sytuację',
    description: 'Sprawdzamy własność, akty notarialne i numery katastralne. Nie składamy deklaracji, jeśli nieruchomość jest współwłasnością dwóch osób, bez dokładnego wcześniejszego zbadania sprawy.'
  },
  {
    number: 2,
    title: 'Szukamy alternatyw',
    description: 'Optymalizujemy z rozwagą. Nie stosujemy „amortyzacji", abyś zapłacił mniej, jeśli nie jest to w pełni uzasadnione lub zgodne z przepisami.'
  },
  {
    number: 3,
    title: 'Przygotowujemy dowody',
    description: 'Zostawiamy ślad. Tworzymy dokumentację o wartości dowodowej, która uzasadnia każdą podjętą decyzję.'
  },
  {
    number: 4,
    title: 'Wydajemy raport techniczny',
    description: 'Raport uzasadniający zastosowane rozwiązania. Jasny, kompletny i możliwy do obrony.'
  }
];

export function ProcessSteps() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section id="proces" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-6 text-[#1a1a1a]">
            Jak pracujemy?
          </h2>
          <p className="text-lg md:text-xl text-center text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stosujemy metodę prostą i rzetelną. Najważniejsze: żeby wszystko było udokumentowane.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {steps.map((step) => (
            <div
              key={step.number}
              onMouseEnter={() => setActiveStep(step.number)}
              className={`group relative bg-gradient-to-br p-10 transition-all duration-300 ${
                activeStep === step.number
                  ? 'from-[#1a1a1a] to-[#2a2a2a] shadow-2xl'
                  : 'from-gray-50 to-gray-100 hover:shadow-xl'
              }`}
            >
              <div className="relative z-10">
                <div
                  className={`text-8xl font-black mb-6 transition-colors ${
                    activeStep === step.number ? 'text-[#8e7951]' : 'text-gray-300'
                  }`}
                >
                  {step.number}
                </div>
                <h3
                  className={`text-2xl font-bold mb-4 transition-colors ${
                    activeStep === step.number ? 'text-white' : 'text-[#1a1a1a]'
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-base leading-relaxed transition-colors ${
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
