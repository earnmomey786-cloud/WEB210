import React, { useEffect, useMemo, useState } from "react";
import { Download, Save, Trash2, Upload, FileJson, FileSpreadsheet } from "lucide-react";

const STORAGE_KEY = "beckham_intake_v1";

const SECTIONS = [
  {
    id: "datos_clave",
    title: "0. Kluczowe dane i daty przeprowadzki",
    description: "Daty i krytyczne fakty dotyczące rezydencji podatkowej i terminu Model 149.",
    fields: [
      { key: "fecha_llegada_espana", label: "Przewidywana data przyjazdu do Hiszpanii", type: "date" },
      { key: "fecha_inicio_trabajo", label: "Przewidywana data rozpoczęcia pracy z Hiszpanii", type: "date" },
      { key: "fecha_alta_ss", label: "Przewidywana data rejestracji w hiszpańskim ZUS / A1", type: "date" },
      { key: "dias_espana_2025", label: "Szacowana liczba dni w Hiszpanii w 2025", type: "number", placeholder: "Np. 40" },
      { key: "dias_espana_2026", label: "Szacowana liczba dni w Hiszpanii w 2026", type: "number", placeholder: "Np. 330" },
      { key: "vivienda_polonia_disponible", label: "Czy zachowasz dostępne mieszkanie w Polsce?", type: "radio", options: ["Tak", "Nie"] },
      { key: "detalle_vivienda_polonia", label: "Jeśli odpowiedziałeś Tak, jak będzie utrzymywane? (własny użytek / wynajmowane / rodzina itp.)", type: "textarea" },
      { key: "familia_se_traslada", label: "Czy rodzina przeprowadza się z tobą od początku?", type: "radio", options: ["Tak", "Nie"] },
      { key: "fecha_traslado_familia", label: "Przewidywana data przeprowadzki rodziny (jeśli dotyczy)", type: "date" },
    ],
  },
  {
    id: "ingresos_laborales",
    title: "A1. Aktualne dochody z pracy (Polska)",
    fields: [
      { key: "salario_bruto_mensual_pl", label: "Miesięczne wynagrodzenie brutto (Firmao Polska lub inna)", type: "number", placeholder: "PLN/EUR" },
      { key: "estructura_salario", label: "Struktura wynagrodzenia (podstawa, premia, dodatki)", type: "textarea" },
      { key: "importe_anual_neto_pl", label: "Roczna kwota netto otrzymana", type: "number" },
      { key: "cotiza_zus", label: "Czy płacisz składki do polskiego ZUS?", type: "radio", options: ["Tak", "Nie"] },
      { key: "regimen_zus", label: "Jaki system?", type: "text" },
      { key: "seguros_prestaciones_pl", label: "Ubezpieczenie prywatne lub świadczenia uzupełniające?", type: "textarea" },
    ],
  },
  {
    id: "cargos_directivos",
    title: "A2. Dochody z zarządzania / stanowiska kierownicze",
    fields: [
      { key: "cargo_firmao", label: "Firmao Polska: stanowisko w organie zarządzającym", type: "text", placeholder: "Jedyny administrator / rada / menedżer..." },
      { key: "retribucion_cargo_firmao", label: "Czy otrzymujesz wynagrodzenie za to stanowisko?", type: "radio", options: ["Tak", "Nie"] },
      { key: "importe_anual_cargo_firmao", label: "Roczna kwota brutto za stanowisko", type: "number" },
      { key: "estructura_pagos_cargo", label: "Struktura płatności (wynagrodzenie, honoraria, mieszane)", type: "text" },
      { key: "beneficios_cargo_firmao", label: "Świadczenia lub dodatkowe korzyści", type: "textarea" },
      { key: "cargo_mtec", label: "MTEC: czy zajmujesz stanowisko zarządzające?", type: "radio", options: ["Tak", "Nie"] },
      { key: "retribucion_cargo_mtec", label: "MTEC: czy otrzymujesz wynagrodzenie?", type: "radio", options: ["Tak", "Nie"] },
      { key: "importe_anual_cargo_mtec", label: "MTEC: roczna kwota brutto (jeśli dotyczy)", type: "number" },
    ],
  },
  {
    id: "dividendos_participaciones",
    title: "A3. Dywidendy i udziały akcyjne",
    fields: [
      { key: "participacion_mtec", label: "MTEC: % przybliżonego udziału", type: "number", placeholder: "Np. 91" },
      { key: "ultimo_dividendo_mtec", label: "Ostatni roczny podział dywidend MTEC", type: "number" },
      { key: "beneficios_ultimo_ejercicio_mtec", label: "Zadeklarowane zyski ostatniego roku obrotowego MTEC", type: "number" },
      { key: "dividendos_regularidad_mtec", label: "Czy dywidendy są regularnie rozdzielane?", type: "radio", options: ["Regularne", "Nieregularne", "Nie rozdzielane"] },
      { key: "reservas_mtec", label: "Czy są skumulowane rezerwy / reinwestycja?", type: "textarea" },
      { key: "participacion_ared_firmao", label: "Firmao Polska: % udział Fundacji ARED", type: "number" },
      { key: "dividendos_previstos_firmao", label: "Przewidywany podział dywidend w Firmao Polska?", type: "textarea" },
      { key: "dividendos_indirectos", label: "Czy twój udział pośredni bezpośredni generuje dywidendy?", type: "textarea" },
    ],
  },
  {
    id: "fundacion_ared",
    title: "A4. Fundacja ARED (struktura polska)",
    fields: [
      { key: "objeto_ared", label: "Cel i główna działalność fundacji", type: "textarea" },
      { key: "ingresos_ared_tipo", label: "Rodzaj dochodów (darowizny, sponsoring, biznesowe...)", type: "textarea" },
      { key: "financiacion_presupuesto_ared", label: "Jak finansowany i zarządzany jest roczny budżet", type: "textarea" },
      { key: "distribucion_fondos_ared", label: "% rozdzielony na beneficjentów vs rezerwy", type: "text" },
      { key: "rol_en_ared", label: "Czy masz rolę zarządzającą czy jesteś beneficjentem?", type: "textarea" },
      { key: "gobernanza_ared", label: "Struktura zarządzania (organy, zarząd itp.)", type: "textarea" },
      { key: "cambio_admin_no_residente_es", label: "Czy mógłbyś zmienić zarząd na rezydentów w Polsce, aby uniknąć rezydencji w Hiszpanii?", type: "textarea" },
    ],
  },
  {
    id: "actividad_empresarial",
    title: "A5. Działalność gospodarcza",
    fields: [
      { key: "objeto_actividad", label: "Dokładny cel działalności gospodarczej", type: "textarea" },
      { key: "ingresos_3_anos", label: "Roczne dochody netto ostatnie 3 lata", type: "textarea", placeholder: "2022: X, 2023: Y, 2024: Z" },
      { key: "servicios_otras_empresas", label: "Czy świadczysz usługi dla innych firm? Stawka?", type: "textarea" },
      { key: "gastos_anuales_actividad", label: "Roczne wydatki tej działalności", type: "number" },
      { key: "estado_actividad", label: "Stan działalności", type: "radio", options: ["Aktywna", "Zawieszona", "Zamknięta"] },
      { key: "obligaciones_pendientes", label: "Jeśli zamknięta: czy są zaległe zobowiązania (długi podatkowe/składki)?", type: "textarea" },
    ],
  },
  {
    id: "podcasts_colaboraciones",
    title: "A6. Dochody z podcastów i współprac",
    fields: [
      { key: "contratos_podcasts", label: "Aktualne umowy/porozumienia", type: "textarea" },
      { key: "clientes_podcasts", label: "Klient/płatnicza platforma", type: "text" },
      { key: "importe_podcasts", label: "Szacowana kwota miesięczna/roczna", type: "textarea" },
      { key: "estructura_pago_podcasts", label: "Jak ustrukturyzowana jest płatność (przelew, fakturowanie...)", type: "textarea" },
      { key: "via_tributaria_pl_podcasts", label: "Aktualna droga podatkowa w Polsce", type: "text" },
      { key: "continua_en_es", label: "Czy przewiduje się, że będzie generować dochody w Hiszpanii?", type: "radio", options: ["Tak", "Nie", "Nie wiem"] },
    ],
  },
  {
    id: "contrato_teletrabajo",
    title: "A7. Umowa z Firmao Polska (praca zdalna z Hiszpanii)",
    fields: [
      { key: "salario_bruto_propuesto_es", label: "Proponowane wynagrodzenie brutto w umowie pracy zdalnej", type: "number" },
      { key: "duracion_desplazamiento", label: "Szacowany czas delegacji", type: "text", placeholder: "2 lata / na stałe / otwarty" },
      { key: "mantiene_cargo_admin", label: "Czy utrzymasz stanowisko administratora oprócz umowy?", type: "radio", options: ["Tak", "Nie"] },
      { key: "cambios_participacion", label: "Czy będzie wniesienie kapitału lub zmiany w udziałach?", type: "textarea" },
      { key: "otras_condiciones_laborales", label: "Inne warunki pracy (urlop, premia, korzyści)", type: "textarea" },
      { key: "actividad_clientes_es", label: "Czy z Hiszpanii będziesz negocjować/zawierać umowy z klientami?", type: "radio", options: ["Tak", "Nie", "Czasami"] },
      { key: "presencia_empresa_es", label: "Czy firma będzie miała klientów/obecność w Hiszpanii?", type: "textarea" },
    ],
  },
  {
    id: "ingresos_irregulares",
    title: "A8. Dochody sporadyczne lub nieregularne",
    fields: [
      { key: "otras_fuentes_ingresos", label: "Inne źródła dochodów nie wymienione", type: "textarea" },
      { key: "propiedades_alquiler", label: "Nieruchomości do wynajęcia (Polska/Hiszpania)", type: "textarea" },
      { key: "prestamos_intereses", label: "Dochody z pożyczek lub odsetek", type: "textarea" },
      { key: "stock_options", label: "Czy masz opcje na akcje/RSU/odroczone premie? Daty i kwoty", type: "textarea" },
      { key: "cripto_trading", label: "Kryptowaluty lub istotny handel?", type: "textarea" },
    ],
  },
  {
    id: "patrimonio",
    title: "B. Sytuacja majątkowa i aktywa",
    fields: [
      { key: "inmuebles_polonia", label: "Mieszkanie/nieruchomość w Polsce (przybliżona wartość)", type: "textarea" },
      { key: "vivienda_espana", label: "Mieszkanie w Hiszpanii od stycznia 2026 (wynajem/kupno/wartość)", type: "textarea" },
      { key: "cuentas_bancarias", label: "Konta bankowe (przybliżone salda)", type: "textarea" },
      { key: "inversiones_financieras", label: "Inwestycje finansowe (fundusze, papiery wartościowe)", type: "textarea" },
      { key: "otros_activos", label: "Inne aktywa (pojazdy, wyposażenie biznesowe)", type: "textarea" },
      { key: "prestamos_intragupo", label: "Pożyczki wewnątrzgrupowe / rachunki bieżące ze wspólnikami", type: "textarea" },
      { key: "planes_pensiones", label: "Plany emerytalne/ubezpieczenia oszczędnościowe", type: "textarea" },
    ],
  },
  {
    id: "familia",
    title: "C. Struktura rodzinna i podatkowa łączna",
    fields: [
      { key: "conyuge_nombre", label: "Współmałżonek: imię i nazwisko oraz NIE/NIF (jeśli dotyczy)", type: "text" },
      { key: "conyuge_situacion_pl", label: "Aktualna sytuacja zawodowa/podatkowa współmałżonka w Polsce", type: "textarea" },
      { key: "conyuge_ingresos", label: "Własne dochody współmałżonka (przybliżona kwota)", type: "number" },
      { key: "conyuge_residente_es", label: "Czy będzie rezydentem podatkowym w Hiszpanii od stycznia 2026?", type: "radio", options: ["Tak", "Nie", "Nie wiem"] },
      { key: "conyuge_beckham", label: "Czy będzie składać wniosek o system Beckhama?", type: "radio", options: ["Tak", "Nie", "Nie wiem"] },
      { key: "conyuge_participacion_mtec", label: "Udział współmałżonka w MTEC / stanowiska", type: "textarea" },
      { key: "hijos", label: "Dzieci/osoby na utrzymaniu (wieki) i czy się przenoszą", type: "textarea" },
    ],
  },
  {
    id: "antecedentes",
    title: "D. Historia podatkowa i zgodność",
    fields: [
      { key: "residencia_historica_pl", label: "Czy zawsze byłeś rezydentem podatkowym w Polsce?", type: "radio", options: ["Tak", "Nie"] },
      { key: "inspecciones_pl", label: "Oczekujące procesy/inspekcje w Polsce?", type: "textarea" },
      { key: "impuestos_al_dia", label: "Podatki i składki na bieżąco?", type: "radio", options: ["Tak", "Nie", "Nie wiem"] },
      { key: "antecedentes_es", label: "Historia podatkowa/rejestracja w Hiszpanii? Wcześniejsze nieruchomości", type: "textarea" },
    ],
  },
];

interface FieldType {
  key: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: string[];
}

function Field({ field, value, onChange }: { field: FieldType; value: any; onChange: (key: string, val: any) => void }) {
  const base = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-slate-400 focus:outline-none";

  if (field.type === "textarea") {
    return (
      <textarea
        className={base + " min-h-[88px]"}
        placeholder={field.placeholder || ""}
        value={value || ""}
        onChange={(e) => onChange(field.key, e.target.value)}
      />
    );
  }

  if (field.type === "radio") {
    return (
      <div className="flex flex-wrap gap-3">
        {field.options?.map((opt) => (
          <label key={opt} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name={field.key}
              checked={value === opt}
              onChange={() => onChange(field.key, opt)}
            />
            {opt}
          </label>
        ))}
      </div>
    );
  }

  return (
    <input
      className={base}
      type={field.type || "text"}
      placeholder={field.placeholder || ""}
      value={value || ""}
      onChange={(e) => onChange(field.key, e.target.value)}
    />
  );
}

function toCSV(data: Record<string, any>) {
  const rows = [["pole", "odpowiedź"]];
  Object.entries(data).forEach(([k, v]) => {
    rows.push([k, typeof v === "string" ? v.replace(/\n/g, " ") : String(v ?? "")]);
  });
  return rows.map((r) => r.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export default function BeckhamForm() {
  const [form, setForm] = useState<Record<string, any>>({});
  const [status, setStatus] = useState("");
  const [lastSaved, setLastSaved] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  // Autosave (debounced-ish)
  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ form, lastSaved: Date.now() }));
      setLastSaved(Date.now());
    }, 600);
    return () => clearTimeout(id);
  }, [form]);

  // Load on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setForm(parsed.form || {});
        setLastSaved(parsed.lastSaved || null);
      }
    } catch {}
  }, []);

  const completion = useMemo(() => {
    const total = SECTIONS.flatMap((s) => s.fields).length;
    const filled = SECTIONS.flatMap((s) => s.fields).filter((f) => {
      const v = form[f.key];
      return v !== undefined && v !== null && String(v).trim() !== "";
    }).length;
    return { total, filled, pct: total ? Math.round((filled / total) * 100) : 0 };
  }, [form]);

  const onChange = (key: string, val: any) => setForm((prev) => ({ ...prev, [key]: val }));

  const goNext = () => {
    if (currentStep < SECTIONS.length - 1) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goPrev = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < SECTIONS.length) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const manualSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ form, lastSaved: Date.now() }));
    setLastSaved(Date.now());
    setStatus("Zapisano lokalnie.");
    setTimeout(() => setStatus(""), 1500);
  };

  const loadLocal = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return setStatus("Brak zapisanych danych.");
      const parsed = JSON.parse(raw);
      setForm(parsed.form || {});
      setLastSaved(parsed.lastSaved || null);
      setStatus("Dane wczytane.");
      setTimeout(() => setStatus(""), 1500);
    } catch {
      setStatus("Błąd podczas wczytywania.");
    }
  };

  const clearAll = () => {
    if (!window.confirm("Czy na pewno chcesz usunąć wszystkie lokalne odpowiedzi?")) return;
    localStorage.removeItem(STORAGE_KEY);
    setForm({});
    setLastSaved(null);
    setStatus("Wyczyszczono.");
    setTimeout(() => setStatus(""), 1500);
  };

  const download = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    download(new Blob([JSON.stringify(form, null, 2)], { type: "application/json" }), "beckham-kwestionariusz.json");
  };

  const exportCSV = () => {
    download(new Blob([toCSV(form)], { type: "text/csv;charset=utf-8" }), "beckham-kwestionariusz.csv");
  };

  const importJSON = async (file: File) => {
    const text = await file.text();
    const parsed = JSON.parse(text);
    setForm(parsed);
    setStatus("Zaimportowano pomyślnie.");
    setTimeout(() => setStatus(""), 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-lg font-semibold">Kwestionariusz Wstępny – Prawo Beckhama</h1>
            <p className="text-xs text-slate-500">Wypełniony przez klienta · lokalne zapisywanie · eksport JSON/CSV</p>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={manualSave} className="flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-medium text-white shadow hover:opacity-90">
              <Save className="h-4 w-4" /> Zapisz
            </button>
            <button onClick={loadLocal} className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-xs font-medium shadow-sm hover:bg-slate-50">
              <Upload className="h-4 w-4" /> Wczytaj
            </button>
            <button onClick={clearAll} className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-xs font-medium shadow-sm hover:bg-slate-50">
              <Trash2 className="h-4 w-4" /> Wyczyść
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 pb-3">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>Ukończono: {completion.filled}/{completion.total} ({completion.pct}%)</span>
            <span>{lastSaved ? `Ostatnio zapisano: ${new Date(lastSaved).toLocaleString()}` : "Brak zapisów"}</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full bg-slate-900 transition-all duration-300" style={{ width: `${completion.pct}%` }} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <div className="mb-6 rounded-2xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-700">
            Wypełnij każdą sekcję jak najdokładniej. Te informacje są wykorzystywane wyłącznie do analizy podatkowej i będą traktowane poufnie.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={exportJSON} className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-xs font-medium shadow-sm hover:bg-slate-50">
              <FileJson className="h-4 w-4" /> Eksportuj JSON
            </button>
            <button onClick={exportCSV} className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-xs font-medium shadow-sm hover:bg-slate-50">
              <FileSpreadsheet className="h-4 w-4" /> Eksportuj CSV
            </button>
            <label className="flex cursor-pointer items-center gap-2 rounded-xl border bg-white px-3 py-2 text-xs font-medium shadow-sm hover:bg-slate-50">
              <Download className="h-4 w-4" /> Importuj JSON
              <input type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && importJSON(e.target.files[0])} />
            </label>
            {status && <span className="ml-2 text-xs text-emerald-700">{status}</span>}
          </div>
        </div>

        <div className="space-y-5">
          {/* Indicador de pasos */}
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="mb-3 text-center text-sm font-medium text-slate-700">
              Krok {currentStep + 1} z {SECTIONS.length}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {SECTIONS.map((section, idx) => (
                <button
                  key={section.id}
                  onClick={() => goToStep(idx)}
                  className={`h-8 w-8 rounded-full text-xs font-semibold transition-all ${
                    idx === currentStep
                      ? "bg-slate-900 text-white shadow-lg"
                      : idx < currentStep
                      ? "bg-emerald-500 text-white hover:bg-emerald-600"
                      : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                  }`}
                  title={section.title}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Sección actual */}
          {(() => {
            const section = SECTIONS[currentStep];
            return (
              <section className="rounded-2xl border bg-white p-5 shadow-sm">
                <div className="mb-4">
                  <h2 className="text-base font-semibold">{section.title}</h2>
                  {section.description && <p className="mt-1 text-xs text-slate-500">{section.description}</p>}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {section.fields.map((field) => (
                    <div key={field.key} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                      <label className="mb-1 block text-xs font-medium text-slate-700">{field.label}</label>
                      <Field field={field} value={form[field.key]} onChange={onChange} />
                    </div>
                  ))}
                </div>
              </section>
            );
          })()}

          {/* Botones de navegación */}
          <div className="flex items-center justify-between rounded-2xl border bg-white p-4 shadow-sm">
            <button
              onClick={goPrev}
              disabled={currentStep === 0}
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Poprzedni
            </button>
            <span className="text-sm text-slate-600">
              {currentStep + 1} / {SECTIONS.length}
            </span>
            <button
              onClick={goNext}
              disabled={currentStep === SECTIONS.length - 1}
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Następny →
            </button>
          </div>
        </div>

        <footer className="mt-8 rounded-2xl border bg-white p-4 text-xs text-slate-600 shadow-sm">
          <p>
            Uwaga techniczna: ta wersja zapisuje dane w przeglądarce (localStorage). Jeśli chcesz scentralizowane przechowywanie wewnętrzne,
            mogę pomóc połączyć to z backendem (Firebase/Supabase/twój serwer) z logowaniem i panelem klienta.
          </p>
        </footer>
      </main>
    </div>
  );
}
