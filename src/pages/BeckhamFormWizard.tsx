import React, { useEffect, useMemo, useState } from "react";
import { Download, Save, Trash2, Upload, FileJson, FileSpreadsheet, ChevronLeft, ChevronRight, Check, Send } from "lucide-react";

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
      { key: "detalle_vivienda_polonia", label: "Jeśli odpowiedziałeś Tak, jak będzie utrzymywane?", type: "textarea" },
      { key: "familia_se_traslada", label: "Czy rodzina przeprowadza się z tobą od początku?", type: "radio", options: ["Tak", "Nie"] },
      { key: "fecha_traslado_familia", label: "Przewidywana data przeprowadzki rodziny (jeśli dotyczy)", type: "date" },
    ],
  },
  {
    id: "ingresos_laborales",
    title: "A1. Aktualne dochody z pracy (Polska)",
    fields: [
      { key: "salario_bruto_mensual_pl", label: "Miesięczne wynagrodzenie brutto", type: "number", placeholder: "PLN/EUR" },
      { key: "estructura_salario", label: "Struktura wynagrodzenia", type: "textarea" },
      { key: "importe_anual_neto_pl", label: "Roczna kwota netto otrzymana", type: "number" },
      { key: "cotiza_zus", label: "Czy płacisz składki do polskiego ZUS?", type: "radio", options: ["Tak", "Nie"] },
      { key: "regimen_zus", label: "Jaki system?", type: "text" },
      { key: "seguros_prestaciones_pl", label: "Ubezpieczenie prywatne?", type: "textarea" },
    ],
  },
  {
    id: "cargos_directivos",
    title: "A2. Dochody z zarządzania",
    fields: [
      { key: "cargo_firmao", label: "Firmao Polska: stanowisko", type: "text", placeholder: "Administrator / menedżer..." },
      { key: "retribucion_cargo_firmao", label: "Wynagrodzenie za stanowisko?", type: "radio", options: ["Tak", "Nie"] },
      { key: "importe_anual_cargo_firmao", label: "Roczna kwota brutto", type: "number" },
      { key: "estructura_pagos_cargo", label: "Struktura płatności", type: "text" },
      { key: "beneficios_cargo_firmao", label: "Dodatkowe korzyści", type: "textarea" },
      { key: "cargo_mtec", label: "MTEC: stanowisko?", type: "radio", options: ["Tak", "Nie"] },
      { key: "retribucion_cargo_mtec", label: "MTEC: wynagrodzenie?", type: "radio", options: ["Tak", "Nie"] },
      { key: "importe_anual_cargo_mtec", label: "MTEC: kwota roczna", type: "number" },
    ],
  },
  {
    id: "dividendos_participaciones",
    title: "A3. Dywidendy i udziały",
    fields: [
      { key: "participacion_mtec", label: "MTEC: % udziału", type: "number", placeholder: "Np. 91" },
      { key: "ultimo_dividendo_mtec", label: "Ostatnia dywidenda roczna MTEC", type: "number" },
      { key: "beneficios_ultimo_ejercicio_mtec", label: "Zyski ostatniego roku MTEC", type: "number" },
      { key: "dividendos_regularidad_mtec", label: "Regularność dywidend?", type: "radio", options: ["Regularnie", "Nieregularnie", "Brak"] },
      { key: "reservas_mtec", label: "Rezerwy / reinwestycja?", type: "textarea" },
      { key: "participacion_ared_firmao", label: "Firmao: % Fundacji ARED", type: "number" },
      { key: "dividendos_previstos_firmao", label: "Przewidywane dywidendy Firmao?", type: "textarea" },
      { key: "dividendos_indirectos", label: "Dywidendy pośrednie?", type: "textarea" },
    ],
  },
  {
    id: "fundacion_ared",
    title: "A4. Fundacja ARED",
    fields: [
      { key: "objeto_ared", label: "Cel i główna działalność fundacji", type: "textarea" },
      { key: "ingresos_ared_tipo", label: "Rodzaj dochodów", type: "textarea" },
      { key: "financiacion_presupuesto_ared", label: "Finansowanie i budżet", type: "textarea" },
      { key: "distribucion_fondos_ared", label: "% dystrybucji vs rezerwy", type: "text" },
      { key: "rol_en_ared", label: "Twoja rola w fundacji", type: "textarea" },
      { key: "gobernanza_ared", label: "Struktura zarządzania", type: "textarea" },
      { key: "cambio_admin_no_residente_es", label: "Możliwość zmiany administracji?", type: "textarea" },
    ],
  },
  {
    id: "actividad_empresarial",
    title: "A5. Działalność gospodarcza",
    fields: [
      { key: "objeto_actividad", label: "Dokładny przedmiot działalności", type: "textarea" },
      { key: "ingresos_3_anos", label: "Dochody netto z ostatnich 3 lat", type: "textarea", placeholder: "2022: X, 2023: Y, 2024: Z" },
      { key: "servicios_otras_empresas", label: "Usługi dla innych firm?", type: "textarea" },
      { key: "gastos_anuales_actividad", label: "Roczne wydatki", type: "number" },
      { key: "estado_actividad", label: "Status działalności", type: "radio", options: ["Aktywna", "Zawieszona", "Zamknięta"] },
      { key: "obligaciones_pendientes", label: "Zobowiązania oczekujące?", type: "textarea" },
    ],
  },
  {
    id: "podcasts_colaboraciones",
    title: "A6. Dochody z podcastów",
    fields: [
      { key: "contratos_podcasts", label: "Aktualne umowy", type: "textarea" },
      { key: "clientes_podcasts", label: "Klient/platforma płatnicza", type: "text" },
      { key: "importe_podcasts", label: "Szacowana kwota miesięczna/roczna", type: "textarea" },
      { key: "estructura_pago_podcasts", label: "Struktura płatności", type: "textarea" },
      { key: "via_tributaria_pl_podcasts", label: "Obecna forma podatkowa w Polsce", type: "text" },
      { key: "continua_en_es", label: "Kontynuacja w Hiszpanii?", type: "radio", options: ["Tak", "Nie", "Nie wiem"] },
    ],
  },
  {
    id: "contrato_teletrabajo",
    title: "A7. Umowa z Firmao Polska (praca zdalna)",
    fields: [
      { key: "salario_bruto_propuesto_es", label: "Proponowane wynagrodzenie brutto", type: "number" },
      { key: "duracion_desplazamiento", label: "Przewidywany czas wyjazdu", type: "text", placeholder: "2 lata / stały / otwarty" },
      { key: "mantiene_cargo_admin", label: "Zachowanie stanowiska administratora?", type: "radio", options: ["Tak", "Nie"] },
      { key: "cambios_participacion", label: "Zmiany w udziałach?", type: "textarea" },
      { key: "otras_condiciones_laborales", label: "Inne warunki", type: "textarea" },
      { key: "actividad_clientes_es", label: "Negocjacje z klientami z Hiszpanii?", type: "radio", options: ["Tak", "Nie", "Czasami"] },
      { key: "presencia_empresa_es", label: "Obecność firmy w Hiszpanii?", type: "textarea" },
    ],
  },
  {
    id: "ingresos_irregulares",
    title: "A8. Dochody nieregularne",
    fields: [
      { key: "otras_fuentes_ingresos", label: "Inne źródła dochodów", type: "textarea" },
      { key: "propiedades_alquiler", label: "Nieruchomości na wynajem", type: "textarea" },
      { key: "prestamos_intereses", label: "Pożyczki lub odsetki", type: "textarea" },
      { key: "stock_options", label: "Opcje na akcje?", type: "textarea" },
      { key: "cripto_trading", label: "Kryptowaluty lub trading?", type: "textarea" },
    ],
  },
  {
    id: "patrimonio",
    title: "B. Sytuacja majątkowa i aktywa",
    fields: [
      { key: "inmuebles_polonia", label: "Nieruchomości w Polsce", type: "textarea" },
      { key: "vivienda_espana", label: "Mieszkanie w Hiszpanii", type: "textarea" },
      { key: "cuentas_bancarias", label: "Konta bankowe", type: "textarea" },
      { key: "inversiones_financieras", label: "Inwestycje finansowe", type: "textarea" },
      { key: "otros_activos", label: "Inne aktywa", type: "textarea" },
      { key: "prestamos_intragupo", label: "Pożyczki wewnątrzgrupowe", type: "textarea" },
      { key: "planes_pensiones", label: "Plany emerytalne", type: "textarea" },
    ],
  },
  {
    id: "familia",
    title: "C. Struktura rodzinna",
    fields: [
      { key: "conyuge_nombre", label: "Małżonek: imię i nazwisko", type: "text" },
      { key: "conyuge_situacion_pl", label: "Sytuacja zawodowa/podatkowa małżonka", type: "textarea" },
      { key: "conyuge_ingresos", label: "Dochody małżonka", type: "number" },
      { key: "conyuge_residente_es", label: "Rezydent podatkowy w Hiszpanii?", type: "radio", options: ["Tak", "Nie", "Nie wiem"] },
      { key: "conyuge_beckham", label: "Zastosuje ustawę Beckhama?", type: "radio", options: ["Tak", "Nie", "Nie wiem"] },
      { key: "conyuge_participacion_mtec", label: "Udział małżonka w MTEC", type: "textarea" },
      { key: "hijos", label: "Dzieci/osoby na utrzymaniu", type: "textarea" },
    ],
  },
  {
    id: "antecedentes",
    title: "D. Historia podatkowa",
    fields: [
      { key: "residencia_historica_pl", label: "Zawsze byłeś rezydentem Polski?", type: "radio", options: ["Tak", "Nie"] },
      { key: "inspecciones_pl", label: "Kontrole oczekujące w Polsce?", type: "textarea" },
      { key: "impuestos_al_dia", label: "Podatki aktualne?", type: "radio", options: ["Tak", "Nie", "Nie wiem"] },
      { key: "antecedentes_es", label: "Historia podatkowa w Hiszpanii?", type: "textarea" },
    ],
  },
];

interface FieldProps {
  field: any;
  value: any;
  onChange: (key: string, value: any) => void;
}

function Field({ field, value, onChange }: FieldProps) {
  const base = "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm focus:border-[#8e7951] focus:outline-none focus:ring-2 focus:ring-[#8e7951]/20 transition";

  if (field.type === "textarea") {
    return (
      <textarea
        className={base + " min-h-[100px]"}
        placeholder={field.placeholder || ""}
        value={value || ""}
        onChange={(e) => onChange(field.key, e.target.value)}
      />
    );
  }

  if (field.type === "radio") {
    return (
      <div className="flex flex-wrap gap-3">
        {field.options.map((opt: string) => (
          <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              name={field.key}
              checked={value === opt}
              onChange={() => onChange(field.key, opt)}
              className="w-4 h-4 text-[#8e7951] focus:ring-[#8e7951]"
            />
            <span className="text-gray-700">{opt}</span>
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

function toCSV(data: any) {
  const rows = [["campo", "respuesta"]];
  Object.entries(data).forEach(([k, v]) => {
    rows.push([k, typeof v === "string" ? v.replace(/\n/g, " ") : String(v ?? "")]);
  });
  return rows.map((r) => r.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export default function BeckhamFormWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState<any>({});
  const [status, setStatus] = useState("");
  const [lastSaved, setLastSaved] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Autosave
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

  const currentSectionCompletion = useMemo(() => {
    const section = SECTIONS[currentStep];
    const total = section.fields.length;
    const filled = section.fields.filter((f) => {
      const v = form[f.key];
      return v !== undefined && v !== null && String(v).trim() !== "";
    }).length;
    return { total, filled, pct: total ? Math.round((filled / total) * 100) : 0 };
  }, [form, currentStep]);

  const onChange = (key: string, val: any) => setForm((prev: any) => ({ ...prev, [key]: val }));

  const manualSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ form, lastSaved: Date.now() }));
    setLastSaved(Date.now());
    setStatus("Zapisano lokalnie.");
    setTimeout(() => setStatus(""), 2000);
  };

  const clearAll = () => {
    if (!confirm("Czy na pewno chcesz usunąć wszystkie dane?")) return;
    localStorage.removeItem(STORAGE_KEY);
    setForm({});
    setLastSaved(null);
    setStatus("Usunięto.");
    setTimeout(() => setStatus(""), 2000);
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
    setTimeout(() => setStatus(""), 2000);
  };

  const sendToEmail = async () => {
    if (completion.pct < 100) {
      if (!confirm(`Formularz wypełniony w ${completion.pct}%. Czy chcesz wysłać mimo to?`)) {
        return;
      }
    }

    setSending(true);
    setStatus("Wysyłanie...");

    try {
      // Detectar si estamos en desarrollo o producción
      const API_URL = window.location.hostname === 'localhost' 
        ? 'http://localhost:3001' 
        : 'https://podatkihiszpania.com:3000';

      const response = await fetch(`${API_URL}/api/send-beckham`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData: form }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("✅ Formularz wysłany pomyślnie na admin@pgkhiszpania.com");
        setTimeout(() => setStatus(""), 5000);
      } else {
        setStatus("❌ Błąd: " + result.message);
        setTimeout(() => setStatus(""), 5000);
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus("❌ Błąd połączenia z serwerem email");
      setTimeout(() => setStatus(""), 5000);
    } finally {
      setSending(false);
    }
  };

  const nextStep = () => {
    if (currentStep < SECTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToStep = (index: number) => {
    setCurrentStep(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sendForm = async () => {
    if (!confirm('Czy na pewno chcesz wysłać formularz do admin@pgkhiszpania.com?')) return;
    
    setIsSending(true);
    setStatus('Wysyłanie...');

    try {
      const response = await fetch('http://localhost:3001/api/send-beckham', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData: form }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('✅ Formularz wysłany pomyślnie!');
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('❌ Błąd: ' + (data.message || 'Nieznany błąd'));
        setTimeout(() => setStatus(''), 4000);
      }
    } catch (error) {
      console.error('Error sending form:', error);
      setStatus('❌ Błąd połączenia z serwerem');
      setTimeout(() => setStatus(''), 4000);
    } finally {
      setIsSending(false);
    }
  };

  const currentSection = SECTIONS[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl md:text-2xl font-black text-gray-900">Kwestionariusz Wstępny – Ustawa Beckhama</h1>
              <p className="text-xs text-slate-500">Wypełniane przez klienta · automatyczne zapisywanie · eksport JSON/CSV</p>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={manualSave} className="flex items-center gap-2 rounded-xl bg-[#8e7951] px-3 py-2 text-xs font-medium text-white shadow hover:bg-[#7a6643] transition">
                <Save className="h-4 w-4" /> Zapisz
              </button>
              <button onClick={clearAll} className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-xs font-medium shadow-sm hover:bg-slate-50 transition">
                <Trash2 className="h-4 w-4" /> Wyczyść
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
            <span>Ukończono: {completion.filled}/{completion.total} pól ({completion.pct}%)</span>
            <span>Krok {currentStep + 1} z {SECTIONS.length}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full bg-[#8e7951] transition-all duration-300" style={{ width: `${completion.pct}%` }} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Steps Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl border shadow-md p-4">
              <h2 className="text-sm font-bold text-gray-900 mb-3">Sekcje</h2>
              <nav className="space-y-1">
                {SECTIONS.map((section, index) => {
                  const sectionFields = section.fields;
                  const sectionFilled = sectionFields.filter((f) => {
                    const v = form[f.key];
                    return v !== undefined && v !== null && String(v).trim() !== "";
                  }).length;
                  const sectionTotal = sectionFields.length;
                  const isComplete = sectionFilled === sectionTotal;
                  const isCurrent = index === currentStep;

                  return (
                    <button
                      key={section.id}
                      onClick={() => goToStep(index)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition flex items-center gap-2 ${
                        isCurrent
                          ? 'bg-[#8e7951] text-white'
                          : isComplete
                          ? 'bg-green-50 text-green-700 hover:bg-green-100'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="flex-shrink-0">
                        {isComplete ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <span className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs">
                            {index + 1}
                          </span>
                        )}
                      </span>
                      <span className="flex-1 line-clamp-2">{section.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content - Current Section */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl border shadow-lg p-6 md:p-8">
              {/* Section Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span>Krok {currentStep + 1} z {SECTIONS.length}</span>
                  <span>•</span>
                  <span>{currentSectionCompletion.filled}/{currentSectionCompletion.total} wypełnionych</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">{currentSection.title}</h2>
                {currentSection.description && (
                  <p className="text-sm text-slate-600">{currentSection.description}</p>
                )}
              </div>

              {/* Section Progress */}
              <div className="mb-6">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full bg-[#8e7951] transition-all duration-300" style={{ width: `${currentSectionCompletion.pct}%` }} />
                </div>
              </div>

              {/* Fields */}
              <div className="space-y-5">
                {currentSection.fields.map((field) => (
                  <div key={field.key}>
                    <label className="block mb-2 text-sm font-semibold text-gray-900">
                      {field.label}
                    </label>
                    <Field field={field} value={form[field.key]} onChange={onChange} />
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="mt-8 flex items-center justify-between gap-4">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border bg-white text-gray-700 font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="hidden sm:inline">Poprzedni</span>
                </button>

                <div className="flex items-center gap-2">
                  {currentStep === SECTIONS.length - 1 && (
                    <button 
                      onClick={sendToEmail}
                      disabled={sending}
                      className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      <Send className="h-5 w-5" />
                      {sending ? 'Wysyłanie...' : 'Wyślij formularz'}
                    </button>
                  )}
                  
                  <button onClick={exportJSON} className="flex items-center gap-2 rounded-xl border bg-white px-4 py-3 text-xs font-medium shadow-sm hover:bg-slate-50 transition">
                    <FileJson className="h-4 w-4" /> JSON
                  </button>
                  <button onClick={exportCSV} className="flex items-center gap-2 rounded-xl border bg-white px-4 py-3 text-xs font-medium shadow-sm hover:bg-slate-50 transition">
                    <FileSpreadsheet className="h-4 w-4" /> CSV
                  </button>
                  <label className="flex cursor-pointer items-center gap-2 rounded-xl border bg-white px-4 py-3 text-xs font-medium shadow-sm hover:bg-slate-50 transition">
                    <Download className="h-4 w-4" /> Import
                    <input type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && importJSON(e.target.files[0])} />
                  </label>
                </div>

                <button
                  onClick={nextStep}
                  disabled={currentStep === SECTIONS.length - 1}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8e7951] text-white font-medium hover:bg-[#7a6643] disabled:opacity-40 disabled:cursor-not-allowed transition shadow-lg"
                >
                  <span className="hidden sm:inline">Następny</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {status && (
                <div className="mt-4 text-center text-sm text-emerald-600 font-medium">
                  {status}
                </div>
              )}
            </div>

            {/* Footer Note */}
            <div className="mt-6 rounded-2xl border bg-white/50 p-4 text-xs text-slate-600">
              <p>
                <strong>Nota:</strong> Dane są automatycznie zapisywane w przeglądarce (localStorage). 
                Jeśli potrzebujesz scentralizowanego systemu z panelem administracyjnym, możemy dodać backend.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
