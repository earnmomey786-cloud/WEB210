export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Podatek IRNR',
  description: 'Profesjonalna obsługa Model 210 dla właścicieli nieruchomości w Hiszpanii',
  url: 'https://podatek-irnr.pl',
  logo: 'https://podatek-irnr.pl/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+34-123-456-789',
    contactType: 'customer service',
    availableLanguage: ['Polish', 'Spanish'],
    areaServed: 'ES'
  }
};

export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Model 210 - Podatek IRNR w Hiszpanii',
  description: 'Profesjonalna usługa składania deklaracji Model 210 (IRNR) dla nierezydentów posiadających nieruchomości w Hiszpanii',
  provider: {
    '@type': 'Organization',
    name: 'Podatek IRNR'
  },
  areaServed: {
    '@type': 'Country',
    name: 'Spain'
  },
  audience: {
    '@type': 'Audience',
    name: 'Polish property owners in Spain'
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Nieruchomość niewynajmowana',
      description: 'Deklaracja Model 210 z przychodem imputowanym (roczna)',
      price: '79',
      priceCurrency: 'EUR'
    },
    {
      '@type': 'Offer',
      name: 'Najem – rozliczenie roczne',
      description: 'Dochód z najmu, koszty i odliczenia (UE 19%)',
      price: '129',
      priceCurrency: 'EUR'
    }
  ]
};

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Kto musi złożyć Model 210?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Model 210 muszą składać nierezydenci podatkowi Hiszpanii, którzy są właścicielami nieruchomości na terenie Hiszpanii. Dotyczy to zarówno nieruchomości wynajmowanych, jak i niewynajmowanych (użytkowanych na własne potrzeby).'
      }
    },
    {
      '@type': 'Question',
      name: 'Czy muszę płacić podatek, jeśli nie wynajmuję?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tak. Nawet jeśli nie wynajmujesz nieruchomości, musisz płacić podatek od tzw. przychodu imputowanego (dochodu przypisanego). Jest to fikcyjny dochód obliczany na podstawie wartości katastralnej nieruchomości.'
      }
    },
    {
      '@type': 'Question',
      name: 'Jak oblicza się przychód imputowany (2% / 1,1% wartości katastralnej)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Przychód imputowany to 2% wartości katastralnej nieruchomości (lub 1,1% jeśli wartość katastralna została zaktualizowana w ostatnich 10 latach). Od tej kwoty płacisz 19% podatku (dla rezydentów UE) lub 24% (dla rezydentów spoza UE).'
      }
    },
    {
      '@type': 'Question',
      name: 'Jaka stawka podatku dla obywateli UE (19%)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Obywatele UE/EOG płacą stawkę 19% od dochodu netto (po odliczeniu kosztów) lub od przychodu imputowanego. Obywatele spoza UE płacą stawkę 24%.'
      }
    },
    {
      '@type': 'Question',
      name: 'Roczne vs kwartalne rozliczenie najmu (od 2024 roczne możliwe)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Od 2024 roku możliwe jest roczne rozliczenie dochodów z najmu. Wcześniej wymagane było składanie deklaracji kwartalnych. Roczne rozliczenie jest prostsze i wygodniejsze dla większości właścicieli.'
      }
    },
    {
      '@type': 'Question',
      name: 'Jakie koszty mogę odliczyć przy wynajmie?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Możesz odliczyć wiele kosztów związanych z wynajmem: opłaty wspólnotowe, IBI (podatek od nieruchomości), ubezpieczenie, koszty napraw i konserwacji, prowizje agencji, odsetki od kredytu hipotecznego, amortyzację nieruchomości i inne udokumentowane koszty.'
      }
    },
    {
      '@type': 'Question',
      name: 'Współwłasność – oddzielne deklaracje dla każdego?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tak. Każdy współwłaściciel musi złożyć osobną deklarację Model 210, proporcjonalnie do swojego udziału we własności nieruchomości. Jeśli masz 50% udziału, deklarujesz 50% dochodów i kosztów.'
      }
    },
    {
      '@type': 'Question',
      name: 'Jak złożyć Model 210 online i jakie dokumenty są potrzebne?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wystarczy wybrać odpowiedni plan usługi, dokonać płatności i uzupełnić formularz z danymi. Będziesz potrzebować: dokumentu tożsamości, ostatniego IBI, umowy najmu (jeśli wynajmujesz), faktur kosztów i aktu własności (escritura). Resztą zajmiemy się my.'
      }
    }
  ]
};

export const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Strona główna',
      item: 'https://podatek-irnr.pl'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Model 210',
      item: 'https://podatek-irnr.pl/uslugi/model-210'
    }
  ]
};
