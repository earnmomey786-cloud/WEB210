import type { ServicePlan } from '../types';

const plans: ServicePlan[] = [
  {
    id: 'jedna_nieruchomosc',
    name: '1 nieruchomość',
    description: 'Najem + przychód imputowany',
    price: 280,
    features: [
      '1 titular (właściciel)',
      'Rozliczenie najmu',
      'Przychód imputowany',
      'Model 210',
      'Złożenie deklaracji',
      'Wsparcie po polsku'
    ],
    additionalInfo: [
      '2 titulares: €380',
      'Każdy dodatkowy titular: +€50',
      'Garaż lub komórka lokatorska: +€50'
    ]
  },
  {
    id: 'dwie_nieruchomosci',
    name: '2 nieruchomości',
    description: 'Najem + przychód imputowany',
    price: 480,
    features: [
      '1 titular (właściciel)',
      'Rozliczenie najmu dla 2 nieruchomości',
      'Przychód imputowany',
      'Model 210',
      'Złożenie deklaracji',
      'Wsparcie po polsku'
    ],
    additionalInfo: [
      '2 titulares: €580',
      'Każdy dodatkowy titular: +€50',
      'Garaż lub komórka lokatorska: +€50'
    ]
  }
];

export function ServicePlans() {
  return (
    <section id="cennik" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <p className="text-sm uppercase tracking-[0.3em] text-[#8e7951] font-semibold mb-4 text-center">
            Cennik
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-center mb-8 text-[#1a1a1a]">
            Profesjonalna obsługa
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-center font-light">
            Wysokiej jakości usługi podatkowe. Transparentne ceny.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className="group relative rounded-[20px] bg-white transition-all duration-500 overflow-hidden border border-white/20 hover:-translate-y-[10px] hover:border-[#8e7951]/20"
              style={{
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:animate-shine pointer-events-none"
                style={{
                  background: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
                  backgroundSize: '200% 100%',
                  transition: 'opacity 0.3s ease'
                }}
              ></div>

              {/* Glow effect */}
              <div className="absolute -inset-[10px] opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(142, 121, 81, 0.3) 0%, rgba(142, 121, 81, 0) 70%)',
                  transition: 'opacity 0.5s ease'
                }}
              ></div>

              <div className="p-6 relative z-10">
                <div className="mb-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 font-semibold">
                    Pakiet {index + 1}
                  </p>
                  <h3 className="text-xl font-black text-[#1a1a1a] mb-1 transition-all duration-300 group-hover:text-[#8e7951] group-hover:translate-x-[2px]">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-gray-600 opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-[2px]">{plan.description}</p>
                </div>

                <div className="mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-[#1a1a1a] transition-all duration-300 group-hover:text-[#8e7951] group-hover:translate-x-[2px]">€{plan.price}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 font-medium">cena podstawowa</p>
                </div>

                <div className="space-y-1.5 mb-4">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2">Zawiera:</p>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <div className="w-0.5 h-0.5 bg-[#8e7951] rounded-full mt-1.5 flex-shrink-0"></div>
                      <span className="text-gray-700 text-[11px] leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.additionalInfo && (
                  <div className="bg-gray-50 p-3 mb-4 border border-gray-200 rounded-lg">
                    <p className="text-[10px] uppercase tracking-wider text-gray-600 font-bold mb-1.5">Opcje dodatkowe:</p>
                    <div className="space-y-0.5">
                      {plan.additionalInfo.map((info, idx) => (
                        <p key={idx} className="text-[11px] text-gray-700 font-medium">{info}</p>
                      ))}
                    </div>
                  </div>
                )}

                <a
                  href="#kontakt"
                  className="block w-full py-2.5 bg-[#1a1a1a] text-white text-center text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#8e7951] transition-all duration-300 rounded-lg"
                >
                  Zamów wycenę
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#1a1a1a] p-12 max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-3xl font-black text-white mb-4">
              Potrzebujesz indywidualnej wyceny?
            </h3>
            <p className="text-gray-400 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              Masz więcej nieruchomości, garaży lub nietypową sytuację podatkową? <br />
              Wyślij nam swoje dane – prześlemy spersonalizowaną ofertę i fakturę.
            </p>
            <a
              href="#kontakt"
              className="inline-block px-10 py-4 bg-[#8e7951] text-white text-sm uppercase tracking-[0.2em] font-bold hover:bg-[#9d8a5f] transition-all duration-300"
            >
              Skontaktuj się z nami
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
