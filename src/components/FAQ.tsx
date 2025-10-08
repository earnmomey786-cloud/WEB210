import { useState } from 'react';
import { Plus } from 'lucide-react';

const faqs = [
  {
    question: 'Kto musi złożyć Model 210?',
    answer: 'Model 210 muszą składać nierezydenci podatkowi Hiszpanii, którzy są właścicielami nieruchomości na terenie Hiszpanii. Dotyczy to zarówno nieruchomości wynajmowanych, jak i niewynajmowanych.'
  },
  {
    question: 'Czy muszę płacić podatek, jeśli nie wynajmuję?',
    answer: 'Tak. Nawet jeśli nie wynajmujesz nieruchomości, musisz płacić podatek od tzw. przychodu imputowanego (dochodu przypisanego). Jest to fikcyjny dochód obliczany na podstawie wartości katastralnej nieruchomości.'
  },
  {
    question: 'Jak oblicza się przychód imputowany?',
    answer: 'Przychód imputowany to 2% wartości katastralnej nieruchomości (lub 1,1% jeśli wartość katastralna została zaktualizowana w ostatnich 10 latach). Od tej kwoty płacisz 19% podatku (dla rezydentów UE) lub 24% (dla rezydentów spoza UE).'
  },
  {
    question: 'Jaka stawka podatku dla obywateli UE?',
    answer: 'Obywatele UE/EOG płacą stawkę 19% od dochodu netto (po odliczeniu kosztów) lub od przychodu imputowanego. Obywatele spoza UE płacą stawkę 24%.'
  },
  {
    question: 'Roczne vs kwartalne rozliczenie najmu',
    answer: 'Od 2024 roku możliwe jest roczne rozliczenie dochodów z najmu. Wcześniej wymagane było składanie deklaracji kwartalnych. Roczne rozliczenie jest prostsze i wygodniejsze.'
  },
  {
    question: 'Jakie koszty mogę odliczyć przy wynajmie?',
    answer: 'Możesz odliczyć wiele kosztów: opłaty wspólnotowe, IBI, ubezpieczenie, koszty napraw i konserwacji, prowizje agencji, odsetki od kredytu hipotecznego, amortyzację nieruchomości i inne udokumentowane koszty.'
  },
  {
    question: 'Współwłasność – oddzielne deklaracje?',
    answer: 'Tak. Każdy współwłaściciel musi złożyć osobną deklarację Model 210, proporcjonalnie do swojego udziału we własności nieruchomości.'
  },
  {
    question: 'Jakie dokumenty są potrzebne?',
    answer: 'Będziesz potrzebować: dokumentu tożsamości, ostatniego IBI, umowy najmu (jeśli wynajmujesz), faktur kosztów i aktu własności (escritura). Resztą zajmiemy się my.'
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-20">
          <p className="text-base uppercase tracking-[0.3em] text-[#8e7951] font-semibold mb-4 text-center">
            FAQ
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-center mb-8 text-[#1a1a1a]">
            Najczęściej zadawane pytania
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`group border-2 transition-all duration-300 ${
                openIndex === index
                  ? 'bg-[#1a1a1a] border-[#1a1a1a]'
                  : 'bg-white border-gray-200 hover:border-[#8e7951]'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-8 flex items-start justify-between text-left gap-4"
              >
                <span
                  className={`font-bold text-lg transition-colors ${
                    openIndex === index ? 'text-white' : 'text-[#1a1a1a]'
                  }`}
                >
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 flex-shrink-0 transition-all ${
                    openIndex === index
                      ? 'text-[#8e7951] rotate-45'
                      : 'text-gray-400 rotate-0'
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-8 pb-8">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6 text-lg">Masz inne pytania?</p>
          <a
            href="#kontakt"
            className="inline-flex items-center justify-center px-10 py-5 bg-[#1a1a1a] text-white text-base uppercase tracking-widest font-semibold hover:bg-[#8e7951] transition-all duration-300"
          >
            Skontaktuj się
          </a>
        </div>
      </div>
    </section>
  );
}
