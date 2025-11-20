import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import Footer from '../components/Footer';

// === TIPOS ===
interface Gasto {
  cat: string;
  sub: string;
  desc: string;
  tipo: string;
  regla: string;
  notas: string;
}

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// === TRADUCCIONES DE INTERFAZ ===
const translations: Translations = {
  es: {
    'title': 'Visor de Gastos Deducibles · Modelo 210',
    'main-title': 'Visor de Gastos Deducibles – Modelo 210',
    'btn-es': '🇪🇸 ES',
    'btn-pl': '🇵🇱 PL',
    'btn-print': 'Imprimir / PDF',
    'btn-csv': 'Exportar CSV',
    'search-label': 'Buscar',
    'category-label': 'Categoría',
    'type-label': 'Tipo',
    'option-all': 'Todas',
    'option-all-2': 'Todos',
    'option-gasto-directo': 'Gasto Directo',
    'option-prorrateable': 'Prorrateable',
    'option-amortizable': 'Amortizable',
    'tag-formulas': 'Fórmulas incluidas',
    'tag-justificante': 'Requiere justificante',
    'tag-limites': 'Límites indicados',
    'kpi-categories': 'Categorías',
    'kpi-categories-desc': 'Totales únicas',
    'kpi-subcategories': 'Subcategorías',
    'kpi-subcategories-desc': 'Entradas específicas',
    'kpi-types': 'Tipos',
    'kpi-legal': 'Notas legales',
    'table-title': 'Tabla completa · Todas las partidas',
    'rows-count': 'filas',
    'btn-copy': 'Copiar',
    'btn-csv-2': 'CSV',
    'th-category': 'Categoría',
    'th-subcategory': 'Subcategoría',
    'th-description': 'Descripción / Ejemplos',
    'th-type': 'Tipo',
    'th-rule': 'Regla / Porcentaje',
    'th-notes': 'Notas clave',
    'footer-info': 'Material informativo. No sustituye asesoramiento fiscal.'
  },
  pl: {
    'title': 'Przeglądał Kosztów Odliczalnych · Model 210',
    'main-title': 'Przeglądał Kosztów Odliczalnych – Model 210',
    'btn-es': '🇪🇸 ES',
    'btn-pl': '🇵🇱 PL',
    'btn-print': 'Drukuj / PDF',
    'btn-csv': 'Eksportuj CSV',
    'search-label': 'Szukaj',
    'category-label': 'Kategoria',
    'type-label': 'Typ',
    'option-all': 'Wszystkie',
    'option-all-2': 'Wszystkie',
    'option-gasto-directo': 'Koszt Bezpośredni',
    'option-prorrateable': 'Proporcjonalny',
    'option-amortizable': 'Amortyzowalny',
    'tag-formulas': 'Wzory włączone',
    'tag-justificante': 'Wymaga potwierdzenia',
    'tag-limites': 'Określone limity',
    'kpi-categories': 'Kategorie',
    'kpi-categories-desc': 'Unikalne całkowite',
    'kpi-subcategories': 'Podkategorie',
    'kpi-subcategories-desc': 'Specyficzne wpisy',
    'kpi-types': 'Typy',
    'kpi-legal': 'Uwagi prawne',
    'table-title': 'Pełna tabela · Wszystkie pozycje',
    'rows-count': 'wierszy',
    'btn-copy': 'Kopiuj',
    'btn-csv-2': 'CSV',
    'th-category': 'Kategoria',
    'th-subcategory': 'Podkategoria',
    'th-description': 'Opis / Przykłady',
    'th-type': 'Typ',
    'th-rule': 'Reguła / Procent',
    'th-notes': 'Kluczowe uwagi',
    'footer-info': 'Materiał informacyjny. Nie zastępuje porady podatkowej.'
  }
};

// === DATOS DE GASTOS ===
const gastosData: { [key: string]: Gasto[] } = {
  es: [
    { cat:"Amortización", sub:"Inmueble (Construcción)", desc:"Amortización del valor de la construcción del inmueble.", tipo:"Amortizable", regla:"3% anual sobre el mayor de: (Coste de adquisición construcción) o (Valor catastral construcción).", notas:"Excluye el valor del suelo. Prorrateo por días: Valor×3%×(Días/365)." },
    { cat:"Amortización", sub:"Muebles y Enseres (> 300€)", desc:"Mobiliario (camas, sofás, mesas), Electrodomésticos (TV, lavadora, frigo), Aire acondicionado, Calderas.", tipo:"Amortizable", regla:"10% lineal anual. Período máx. 20 años.", notas:"Prorrateo por días: Valor×10%×(Días/365). Requiere factura, fecha, coste e inventario." },
    { cat:"Reparación y Mantenimiento", sub:"Reparación Ordinaria", desc:"Pintura, arreglo de puertas/ventanas, cerraduras, grietas.", tipo:"Gasto Directo", regla:"100% deducible en el ejercicio.", notas:"Límite: hasta el rendimiento íntegro. Exceso: 4 años." },
    { cat:"Reparación y Mantenimiento", sub:"Reparación de Instalaciones", desc:"Fontanería, eléctrica, calefacción, ACS, gas.", tipo:"Gasto Directo", regla:"100% deducible en el ejercicio.", notas:"Mismo límite: exceso en 4 años." },
    { cat:"Reparación y Mantenimiento", sub:"Sustitución de Elementos", desc:"Calefacción, puertas de seguridad, ascensor, tuberías.", tipo:"Gasto Directo", regla:"100% deducible en el ejercicio.", notas:"No confundir con mejoras estructurales (se amortizan)." },
    { cat:"Reparación y Mantenimiento", sub:"Mantenimiento Preventivo", desc:"Revisiones, limpieza de conductos, tratamiento de humedad, deshollinado.", tipo:"Gasto Directo", regla:"100% deducible en el ejercicio.", notas:"Mismo límite." },
    { cat:"Servicios Profesionales", sub:"Comisiones de Plataformas", desc:"Airbnb, Booking, Vrbo.", tipo:"Gasto Directo", regla:"100% deducible.", notas:"Guardar factura/extracto." },
    { cat:"Servicios Profesionales", sub:"Honorarios de Gestoría", desc:"Modelo 210, cálculo de rendimientos, asesoría.", tipo:"Gasto Directo", regla:"100% deducible.", notas:"Sin límites." },
    { cat:"Servicios Profesionales", sub:"Honorarios de Abogados", desc:"Contratos, impagos, litigios, recursos.", tipo:"Gasto Directo", regla:"100% deducible.", notas:"Sin límites." },
    { cat:"Servicios Profesionales", sub:"Administración de Fincas", desc:"Gestión de comunidad, mantenimiento, documentación.", tipo:"Gasto Directo", regla:"100% deducible.", notas:"—" },
    { cat:"Servicios Profesionales", sub:"Comisiones Agencias", desc:"Búsqueda de inquilinos, inspecciones, trámites.", tipo:"Gasto Directo", regla:"100% deducible.", notas:"—" },
    { cat:"Tributos y Prorrateables", sub:"IBI", desc:"Impuesto municipal anual.", tipo:"Prorrateable", regla:"Gasto anual × (Días alquiler / 365)", notas:"Recibo municipal." },
    { cat:"Tributos y Prorrateables", sub:"Tasas Municipales", desc:"Basuras, alcantarillado…", tipo:"Prorrateable", regla:"Gasto anual × (Días/365)", notas:"Recibos municipales." },
    { cat:"Tributos y Prorrateables", sub:"Comunidad de Propietarios", desc:"Cuota ordinaria, servicios comunes.", tipo:"Prorrateable", regla:"Gasto anual × (Días/365)", notas:"Excluye extraordinarias." },
    { cat:"Tributos y Prorrateables", sub:"Seguros del Inmueble", desc:"RC, hogar, impagos.", tipo:"Prorrateable", regla:"Prima anual × (Días/365)", notas:"Excluye vida personal." },
    { cat:"Tributos y Prorrateables", sub:"Intereses Hipotecarios", desc:"Intereses del préstamo (no capital).", tipo:"Prorrateable", regla:"Interés anual × (Días/365)", notas:"Solo intereses; no gastos constitución." },
    { cat:"Suministros", sub:"Agua", desc:"Consumo de agua.", tipo:"Prorrateable", regla:"Gasto anual × (Días/365)", notas:"Si lo paga el propietario y no se repercute." },
    { cat:"Suministros", sub:"Electricidad", desc:"Energía, término fijo.", tipo:"Prorrateable", regla:"Gasto anual × (Días/365)", notas:"Condición como agua." },
    { cat:"Suministros", sub:"Gas", desc:"Gas natural (calefacción, ACS, cocina).", tipo:"Prorrateable", regla:"Gasto anual × (Días/365)", notas:"Condición como agua." },
    { cat:"Suministros", sub:"Internet / WiFi", desc:"Banda ancha, línea asociada.", tipo:"Gasto Directo", regla:"100% deducible.", notas:"Necesario para gestión." },
    { cat:"Operativos (< 300€)", sub:"Productos de Limpieza", desc:"Detergentes, bayetas, bolsas…", tipo:"Gasto Directo", regla:"100% deducible.", notas:"Vida < 1 año o < 300€." },
    { cat:"Operativos (< 300€)", sub:"Textiles", desc:"Sábanas, toallas, protectores, cortinas.", tipo:"Gasto Directo", regla:"100% deducible.", notas:"< 300€." },
    { cat:"Operativos (< 300€)", sub:"Higiene y Aseo", desc:"Amenities, jabón, papel higiénico.", tipo:"Gasto Directo", regla:"100% deducible.", notas:"< 300€." },
    { cat:"Operativos (< 300€)", sub:"Limpieza y Lavandería", desc:"Entre estancias, profunda, lavandería.", tipo:"Gasto Directo", regla:"100% deducible.", notas:"Con factura." },
    { cat:"Operativos (< 300€)", sub:"Amenities Huéspedes", desc:"Café, té, snacks, agua, desechables.", tipo:"Gasto Directo", regla:"100% deducible.", notas:"< 300€." },
    { cat:"Operativos (< 300€)", sub:"Acceso y Recepción", desc:"Copias de llaves, cerraduras básicas, tarjetas.", tipo:"Gasto Directo", regla:"100% deducible.", notas:"< 300€." },
    { cat:"Operativos (< 300€)", sub:"Utensilios de Cocina", desc:"Vajilla, vasos, cubertería, sartenes, ollas.", tipo:"Gasto Directo", regla:"100% deducible.", notas:"< 300€." },
    { cat:"Operativos (< 300€)", sub:"Mantenimiento menor", desc:"Bombillas, pilas, cables, enchufes, cinta.", tipo:"Gasto Directo", regla:"100% deducible.", notas:"< 300€." },
    { cat:"Operativos (< 300€)", sub:"Servicios Especializados", desc:"Custodia equipaje, mensajería, llaves.", tipo:"Gasto Directo", regla:"100% deducible.", notas:"—" }
  ],
  pl: [
    { cat:"Amortyzacja", sub:"Nieruchomość (Budowa)", desc:"Amortyzacja wartości budowy nieruchomości.", tipo:"Amortyzowalny", regla:"3% rocznie od większej z: (Koszt nabycia budowy) lub (Wartość katastralna budowy).", notas:"Wyklucza wartość gruntu. Proporcjonowanie po dniach: Wartość×3%×(Dni/365)." },
    { cat:"Amortyzacja", sub:"Meble i Wyposażenie (> 300€)", desc:"Meble (łóżka, sofy, stoły), Sprzęt AGD (TV, pralka, lodówka), Klimatyzacja, Piece.", tipo:"Amortyzowalny", regla:"10% liniowo rocznie. Maks. okres 20 lat.", notas:"Proporcjonowanie po dniach: Wartość×10%×(Dni/365). Wymaga faktury, daty, kosztu i inwentarza." },
    { cat:"Naprawa i Konserwacja", sub:"Naprawa Zwykła", desc:"Malowanie, naprawa drzwi/okien, zamków, pęknięć.", tipo:"Koszt Bezpośredni", regla:"100% odliczalny w roku podatkowym.", notas:"Limit: do całkowitego dochodu. Nadwyżka: 4 lata." },
    { cat:"Naprawa i Konserwacja", sub:"Naprawa Instalacji", desc:"Hydraulika, elektryka, ogrzewanie, CWU, gaz.", tipo:"Koszt Bezpośredni", regla:"100% odliczalny w roku podatkowym.", notas:"Ten sam limit: nadwyżka w 4 lata." },
    { cat:"Naprawa i Konserwacja", sub:"Wymiana Elementów", desc:"Ogrzewanie, drzwi bezpieczeństwa, windy, rury.", tipo:"Koszt Bezpośredni", regla:"100% odliczalny w roku podatkowym.", notas:"Nie mylić z ulepszeniami strukturalnymi (amortyzują się)." },
    { cat:"Naprawa i Konserwacja", sub:"Konserwacja Prewencyjna", desc:"Przeglądy, czyszczenie kanałów, zwalczanie wilgoci, czyszczenie komina.", tipo:"Koszt Bezpośredni", regla:"100% odliczalny w roku podatkowym.", notas:"Ten sam limit." },
    { cat:"Usługi Profesjonalne", sub:"Prowizje Platform", desc:"Airbnb, Booking, Vrbo.", tipo:"Koszt Bezpośredni", regla:"100% odliczalny.", notas:"Zachować fakturę/wyciąg." },
    { cat:"Usługi Profesjonalne", sub:"Honoraria Zarządzania", desc:"Model 210, kalkulacja dochodów, doradztwo.", tipo:"Koszt Bezpośredni", regla:"100% odliczalny.", notas:"Bez limitów." },
    { cat:"Usługi Profesjonalne", sub:"Honoraria Prawników", desc:"Kontrakty, zaległości, spory, odwołania.", tipo:"Koszt Bezpośredni", regla:"100% odliczalny.", notas:"Bez limitów." },
    { cat:"Usługi Profesjonalne", sub:"Zarządzanie Nieruchomościami", desc:"Zarządzanie wspólnotą, konserwacja, dokumentacja.", tipo:"Koszt Bezpośredni", regla:"100% odliczalny.", notas:"—" },
    { cat:"Usługi Profesjonalne", sub:"Prowizje Agencji", desc:"Wyszukiwanie najemców, inspekcje, formalności.", tipo:"Koszt Bezpośredni", regla:"100% odliczalny.", notas:"—" },
    { cat:"Podatki i Proporcjonalne", sub:"IBI (Podatek od Nieruchomości)", desc:"Roczny podatek gminny.", tipo:"Proporcjonalny", regla:"Koszt roczny × (Dni najmu / 365)", notas:"Rachunek gminny." },
    { cat:"Podatki i Proporcjonalne", sub:"Opłaty Komunalne", desc:"Śmieci, kanalizacja…", tipo:"Proporcjonalny", regla:"Koszt roczny × (Dni/365)", notas:"Rachunki gminne." },
    { cat:"Podatki i Proporcjonalne", sub:"Wspólnota Mieszkaniowa", desc:"Zwykła opłata, usługi wspólne.", tipo:"Proporcjonalny", regla:"Koszt roczny × (Dni/365)", notas:"Wyklucza nadzwyczajne." },
    { cat:"Podatki i Proporcjonalne", sub:"Ubezpieczenie Nieruchomości", desc:"OC, dom, zaległości najmu.", tipo:"Proporcjonalny", regla:"Składka roczna × (Dni/365)", notas:"Wyklucza życie osobiste." },
    { cat:"Podatki i Proporcjonalne", sub:"Odsetki Hipoteczne", desc:"Odsetki pożyczki (nie kapitał).", tipo:"Proporcjonalny", regla:"Odsetki roczne × (Dni/365)", notas:"Tylko odsetki; nie koszty założenia." },
    { cat:"Media", sub:"Woda", desc:"Zużycie wody.", tipo:"Proporcjonalny", regla:"Koszt roczny × (Dni/365)", notas:"Jeśli płaci właściciel i nie przenosi na najemcę." },
    { cat:"Media", sub:"Prąd", desc:"Energia, opłata stała.", tipo:"Proporcjonalny", regla:"Koszt roczny × (Dni/365)", notas:"Warunek jak woda." },
    { cat:"Media", sub:"Gaz", desc:"Gaz ziemny (ogrzewanie, CWU, kuchnia).", tipo:"Proporcjonalny", regla:"Koszt roczny × (Dni/365)", notas:"Warunek jak woda." },
    { cat:"Media", sub:"Internet / WiFi", desc:"Szerokopasmowa linia, linia stowarzyszona.", tipo:"Koszt Bezpośredni", regla:"100% odliczalny.", notas:"Konieczny do zarządzania." },
    { cat:"Operacyjne (< 300€)", sub:"Środki Czystości", desc:"Detergenty, ściereczki, torby…", tipo:"Koszt Bezpośredni", regla:"100% odliczalny.", notas:"Życie < 1 rok lub < 300€." },
    { cat:"Operacyjne (< 300€)", sub:"Tekstylia", desc:"Pościele, ręczniki, ochraniacze, zasłony.", tipo:"Koszt Bezpośredni", regla:"100% odliczalny.", notas:"< 300€." },
    { cat:"Operacyjne (< 300€)", sub:"Higiena i Czyszczenie", desc:"Udogodnienia, mydło, papier toaletowy.", tipo:"Koszt Bezpośredni", regla:"100% odliczalny.", notas:"< 300€." },
    { cat:"Operacyjne (< 300€)", sub:"Czyszczenie i Pralnia", desc:"Między pokojami, głębokie, pranie.", tipo:"Koszt Bezpośredni", regla:"100% odliczalny.", notas:"Z fakturą." },
    { cat:"Operacyjne (< 300€)", sub:"Udogodnienia dla Gości", desc:"Kawa, herbata, przekąski, woda, jednorazowe.", tipo:"Koszt Bezpośredni", regla:"100% odliczalny.", notas:"< 300€." },
    { cat:"Operacyjne (< 300€)", sub:"Dostęp i Recepcja", desc:"Kopie kluczy, podstawowe zamki, karty.", tipo:"Koszt Bezpośredni", regla:"100% odliczalny.", notas:"< 300€." },
    { cat:"Operacyjne (< 300€)", sub:"Narzędzia Kuchenne", desc:"Zastawa, szklanki, sztućce, patelnie, garnki.", tipo:"Koszt Bezpośredni", regla:"100% odliczalny.", notas:"< 300€." },
    { cat:"Operacyjne (< 300€)", sub:"Mała Konserwacja", desc:"Żarówki, baterie, kable, gniazdka, taśma.", tipo:"Koszt Bezpośredni", regla:"100% odliczalny.", notas:"< 300€." },
    { cat:"Operacyjne (< 300€)", sub:"Usługi Specjalistyczne", desc:"Przechowywanie bagażu, kurier, klucze.", tipo:"Koszt Bezpośredni", regla:"100% odliczalny.", notas:"—" }
  ]
};

interface GastosDeduciblesProps {
  isEmbedded?: boolean;
  onLogout?: () => void;
  userEmail?: string | null;
}

export function GastosDeducibles({ isEmbedded = false }: GastosDeduciblesProps) {
  const [currentLang, setCurrentLang] = useState<'es' | 'pl'>('pl');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedType, setSelectedType] = useState('todos');
  const [filteredData, setFilteredData] = useState<Gasto[]>([]);

  const t = (key: string) => translations[currentLang][key] || key;

  // Obtener datos actuales
  const currentData = gastosData[currentLang];

  // Obtener categorías únicas
  const categories = Array.from(new Set(currentData.map(g => g.cat))).sort();

  // Tipos según idioma
  const types = currentLang === 'es' 
    ? ['Gasto Directo', 'Prorrateable', 'Amortizable']
    : ['Koszt Bezpośredni', 'Proporcjonalny', 'Amortyzowalny'];

  // Filtrar datos
  useEffect(() => {
    const term = searchQuery.toLowerCase();
    const filtered = currentData.filter(g => {
      const byCat = selectedCategory === 'todos' || g.cat === selectedCategory;
      const byType = selectedType === 'todos' || g.tipo === selectedType;
      const inText = !term || [g.cat, g.sub, g.desc, g.tipo, g.regla, g.notas]
        .some(v => (v || '').toLowerCase().includes(term));
      return byCat && byType && inText;
    });
    setFilteredData(filtered);
  }, [searchQuery, selectedCategory, selectedType, currentLang, currentData]);

  // KPIs
  const uniqueCategories = new Set(filteredData.map(d => d.cat)).size;
  const uniqueSubcategories = new Set(filteredData.map(d => d.sub)).size;

  // Clase para tipo chip
  const getTipoClass = (tipo: string) => {
    if (tipo === 'Amortizable' || tipo === 'Amortyzowalny') {
      return 'bg-blue-100 text-blue-800 border border-blue-200';
    } else if (tipo === 'Prorrateable' || tipo === 'Proporcjonalny') {
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    }
    return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
  };

  // Exportar CSV
  const exportCSV = () => {
    const headers = currentLang === 'es'
      ? ["Categoría", "Subcategoría", "Descripción", "Tipo", "Regla", "Notas"]
      : ["Kategoria", "Podkategoria", "Opis", "Typ", "Reguła", "Uwagi"];
    
    const rows = [headers, ...filteredData.map(g => [g.cat, g.sub, g.desc, g.tipo, g.regla, g.notas])];
    const csv = '\ufeff' + rows.map(r => r.map(v => '"' + String(v ?? '').replace(/"/g, '""') + '"').join(',')).join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gastos_modelo_210.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Copiar tabla
  const copyTable = async () => {
    const headers = currentLang === 'es'
      ? ["Categoría", "Subcategoría", "Descripción", "Tipo", "Regla", "Notas"]
      : ["Kategoria", "Podkategoria", "Opis", "Typ", "Reguła", "Uwagi"];
    
    const rows = [headers, ...filteredData.map(g => [g.cat, g.sub, g.desc, g.tipo, g.regla, g.notas])];
    const text = rows.map(r => r.join('\t')).join('\n');
    
    try {
      await navigator.clipboard.writeText(text);
      alert(currentLang === 'es' ? 'Copiado al portapapeles' : 'Skopiowano do schowka');
    } catch (e) {
      console.warn('Clipboard no disponible', e);
    }
  };

  // Imprimir
  const printTable = () => {
    window.print();
  };

  return (
    <div className={`min-h-screen flex flex-col ${isEmbedded ? 'bg-gray-50' : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'}`}>
      {!isEmbedded && <Header />}

      {/* Hero Section */}
      {!isEmbedded && (
        <section className="relative mt-24 mb-12 mx-6 rounded-[2rem] overflow-hidden">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] px-8 py-16 relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <div className="inline-block mb-4 px-4 py-2 bg-[#8e7951] rounded-full">
                <p className="text-sm font-bold text-white uppercase tracking-wider">Modelo 210</p>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                {t('main-title')}
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                {currentLang === 'es' 
                  ? 'Consulta todas las partidas deducibles para tu declaración de la renta de no residentes'
                  : 'Sprawdź wszystkie pozycje podlegające odliczeniu dla twojego zeznania podatkowego nierezydentów'
                }
              </p>
            </div>
          </div>
        </section>
      )}

      <main className={`flex-grow ${isEmbedded ? 'px-4 sm:px-6 lg:px-8' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'} pb-12`}>
        {/* Filtros */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8 print:hidden">
          <div className="grid md:grid-cols-4 gap-4 items-end mb-4">
            <label className="block col-span-2">
              <span className="text-sm font-semibold text-gray-700 mb-2 block">{t('search-label')}</span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={currentLang === 'es' ? 'Ej.: pintura, IBI, amortización…' : 'Np.: malowanie, IBI, amortyzacja…'}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8e7951] focus:border-transparent transition"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700 mb-2 block">{t('category-label')}</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8e7951] focus:border-transparent transition"
              >
                <option value="todos">{t('option-all')}</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700 mb-2 block">{t('type-label')}</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8e7951] focus:border-transparent transition"
              >
                <option value="todos">{t('option-all-2')}</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </label>
          </div>

          {/* Tags informativos y botones */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#8e7951]/10 text-[#8e7951] rounded-full font-medium">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                {t('tag-formulas')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full font-medium">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t('tag-justificante')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full font-medium">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {t('tag-limites')}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setCurrentLang('es')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                  currentLang === 'es'
                    ? 'bg-[#8e7951] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🇪🇸 ES
              </button>
              <button
                onClick={() => setCurrentLang('pl')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                  currentLang === 'pl'
                    ? 'bg-[#8e7951] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🇵🇱 PL
              </button>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid md:grid-cols-4 gap-4 mb-8 print:hidden">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-[#8e7951]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="font-bold text-gray-900">{t('kpi-categories')}</h3>
            </div>
            <div className="text-3xl font-black text-[#8e7951]">{uniqueCategories}</div>
            <p className="text-xs text-gray-500 mt-1">{t('kpi-categories-desc')}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-[#8e7951]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <h3 className="font-bold text-gray-900">{t('kpi-subcategories')}</h3>
            </div>
            <div className="text-3xl font-black text-[#8e7951]">{uniqueSubcategories}</div>
            <p className="text-xs text-gray-500 mt-1">{t('kpi-subcategories-desc')}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-[#8e7951]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <h3 className="font-bold text-gray-900">{t('kpi-types')}</h3>
            </div>
            <div className="text-sm mt-2 space-y-1">
              {types.map(tipo => (
                <div key={tipo} className="flex justify-between">
                  <span className="text-gray-600">{tipo.split(' ')[0]}:</span>
                  <span className="font-bold text-gray-900">{filteredData.filter(d => d.tipo === tipo).length}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-[#8e7951]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
              <h3 className="font-bold text-gray-900">{t('kpi-legal')}</h3>
            </div>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              LIRPF 35/2006, TRLIRNR 5/2004, RIRPF 439/1990. AN 28·07·2025.
            </p>
          </div>
        </div>

        {/* Tabla */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-[#8e7951]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <h2 className="font-black text-xl text-gray-900">{t('table-title')}</h2>
              <span className="px-3 py-1 bg-[#8e7951] text-white rounded-full text-sm font-bold">
                {filteredData.length} {t('rows-count')}
              </span>
            </div>
            <div className="flex gap-2 print:hidden mt-2 sm:mt-0">
              <button
                onClick={copyTable}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {t('btn-copy')}
              </button>
              <button
                onClick={exportCSV}
                className="px-4 py-2 bg-[#8e7951] hover:bg-[#7a6643] text-white rounded-lg text-sm font-semibold transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t('btn-csv-2')}
              </button>
              <button
                onClick={printTable}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg text-sm font-semibold transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                {t('btn-print')}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-gray-900 border-b-2 border-gray-200">{t('th-category')}</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900 border-b-2 border-gray-200">{t('th-subcategory')}</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900 border-b-2 border-gray-200">{t('th-description')}</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900 border-b-2 border-gray-200">{t('th-type')}</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900 border-b-2 border-gray-200">{t('th-rule')}</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900 border-b-2 border-gray-200">{t('th-notes')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 align-top text-gray-700">{row.cat}</td>
                    <td className="px-4 py-3 align-top font-semibold text-gray-900">{row.sub}</td>
                    <td className="px-4 py-3 align-top text-gray-600">{row.desc}</td>
                    <td className="px-4 py-3 align-top">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getTipoClass(row.tipo)}`}>
                        {row.tipo}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-top text-gray-700">{row.regla}</td>
                    <td className="px-4 py-3 align-top text-gray-600">{row.notas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="mt-8 text-center text-sm text-gray-500 print:hidden">
          <p>{t('footer-info')}</p>
        </footer>
      </main>

      {!isEmbedded && <Footer />}

      <style>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          body {
            background: white;
          }
          header, footer {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
