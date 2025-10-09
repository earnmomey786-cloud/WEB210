import type { ServicePlan } from '../types';

interface FeatureDetail {
  title: string;
  description: string;
}

interface PricingPlan {
  name: string;
  price: number;
  description: string;
}

const plans: PricingPlan[] = [
  {
    name: 'Mieszkanie z dwoma właścicielami',
    price: 550,
    description: 'Zawiera złożenie formularza Model 210 dwa razy: za wynajem oraz za przypisany dochód z nieruchomości. Pełna metoda: analiza, alternatywy, przygotowanie dowodów i raport techniczny.'
  },
  {
    name: 'Mieszkanie z jednym właścicielem',
    price: 300,
    description: 'Zawiera złożenie formularza Model 210 dwa razy: za wynajem oraz za przypisany dochód z nieruchomości. Pełna metoda: analiza, alternatywy, przygotowanie dowodów i raport techniczny.'
  }
];

const featureDetails: FeatureDetail[] = [
  {
    title: 'Raport rentowności nieruchomości',
    description: 'Szczegółowa analiza zyskowności Twojego biznesu nieruchomościowego – wiesz, ile naprawdę zarabiasz i jak możesz poprawić wyniki.'
  },
  {
    title: 'Raport złożenia deklaracji',
    description: 'Otrzymujesz dokument potwierdzający nasze działania – gwarancja profesjonalnie wykonanej pracy.'
  },
  {
    title: 'Monitoring zmian podatkowych i prawnych',
    description: 'Informujemy Cię o istotnych zmianach, które mogą mieć wpływ na Twoje rozliczenia lub inwestycje.'
  },
  {
    title: 'Dostęp do Twojego e-akt',
    description: 'Masz pełny dostęp do swojego pliku i dokumentów, zawsze uporządkowanych i gotowych do wglądu.'
  }
];

export function ServicePlans() {
  return (
    <section id="cennik" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <p className="text-base uppercase tracking-[0.3em] text-[#8e7951] font-semibold mb-4 text-center">
            Cennik
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-center mb-8 text-[#1a1a1a]">
            Nasz koszt jest w pełni uzasadniony, ponieważ jeden błąd może Cię kosztować dwa razy więcej.
          </h2>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="pricing-card group relative bg-white transition-all duration-500 overflow-hidden border border-gray-200 hover:border-[#8e7951]/30"
              style={{
                borderRadius: '15px',
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Animated border */}
              <div className="card-border"></div>
              
              <div className="p-6 md:p-8 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-6">
                  <h3 className="text-xl md:text-2xl font-black text-[#1a1a1a] mb-4 transition-all duration-300 group-hover:text-[#8e7951]">
                    {plan.name}
                  </h3>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-4xl md:text-5xl font-black text-[#1a1a1a] transition-all duration-300 group-hover:text-[#8e7951]">
                        €{plan.price}
                      </span>
                      <span className="text-base text-gray-500 font-medium self-start mt-2">+ VAT</span>
                    </div>
                  </div>

                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* CTA Button */}
                <div className="text-center mt-6">
                  <a
                    href="#kontakt"
                    className="inline-block px-8 py-2.5 bg-[#1a1a1a] text-white text-center text-sm uppercase tracking-[0.3em] font-bold hover:bg-[#8e7951] transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Zamów wycenę
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section - Premium Design */}
        <div className="max-w-6xl mx-auto mb-16 relative">
          {/* Background Decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#8e7951]/5 to-transparent rounded-3xl"></div>
          
          <div className="relative z-10 p-8 md:p-12">
            <div className="text-center mb-12">
              <h4 className="text-2xl md:text-3xl font-black text-[#1a1a1a] mb-3">
                Co otrzymujesz w każdym pakiecie:
              </h4>
              <div className="w-20 h-1 bg-[#8e7951] mx-auto rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {featureDetails.map((feature, idx) => (
                <div 
                  key={idx} 
                  className="group relative bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-[#8e7951] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
                >
                  {/* Efecto de fondo animado */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8e7951]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Contenido */}
                  <div className="relative z-10">
                    <h5 className="text-xl font-black text-[#1a1a1a] mb-4 group-hover:text-[#8e7951] transition-colors duration-300">
                      {feature.title}
                    </h5>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Borde decorativo animado */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#8e7951] to-[#7a6643] group-hover:w-full transition-all duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] p-12 max-w-4xl mx-auto rounded-2xl">
          <div className="text-center">
            <h3 className="text-3xl font-black text-white mb-4">
              Twoi doradcy Cię ignorują i nie odpowiadają?
            </h3>
            <p className="text-gray-400 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              To pewnie dlatego, że zrobili coś źle.
            </p>
            <a
              href="#kontakt"
              className="inline-block px-10 py-4 bg-[#8e7951] text-white text-base uppercase tracking-[0.2em] font-bold hover:bg-[#9d8a5f] transition-all duration-300 rounded-lg"
            >
              Chcę analizy mojej sprawy
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
