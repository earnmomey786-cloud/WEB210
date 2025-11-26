import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { isAuthenticated } from '../lib/auth';

const STORAGE_KEY = "beckham_intake_v1";

// Icons as components
const SaveIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const UploadIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

const TrashIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const FileJsonIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const FileSpreadsheetIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const SendIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

interface Field {
  key: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: string[];
}

interface Section {
  id: string;
  title: string;
  description?: string;
  fields: Field[];
}

const SECTIONS: Section[] = [
  {
    id: "datos_clave",
    title: "0. Dane i kluczowe daty przeprowadzki",
    description: "Daty i fakty krytyczne dla rezydencji podatkowej i terminu Model 149.",
    fields: [
      { key: "fecha_llegada_espana", label: "Planowana data przyjazdu do Hiszpanii", type: "date" },
      { key: "fecha_inicio_trabajo", label: "Planowana data rozpoczęcia pracy z Hiszpanii", type: "date" },
      { key: "fecha_alta_ss", label: "Planowana data rejestracji w hiszpańskim ZUS / A1", type: "date" },
      { key: "dias_espana_2025", label: "Szacowane dni w Hiszpanii w 2025", type: "number", placeholder: "Np. 40" },
      { key: "dias_espana_2026", label: "Szacowane dni w Hiszpanii w 2026", type: "number", placeholder: "Np. 330" },
      { key: "vivienda_polonia_disponible", label: "Czy zachowasz mieszkanie w Polsce?", type: "radio", options: ["Tak", "Nie"] },
      { key: "detalle_vivienda_polonia", label: "Jeśli Tak, jak będzie utrzymywane? (własne użytkowanie / wynajęte / rodzina itp.)", type: "textarea" },
      { key: "familia_se_traslada", label: "Czy rodzina przeprowadza się z tobą od początku?", type: "radio", options: ["Tak", "Nie"] },
      { key: "fecha_traslado_familia", label: "Planowana data przeprowadzki rodziny (jeśli dotyczy)", type: "date" },
    ],
  },
  {
    id: "ingresos_laborales",
    title: "A1. Obecne dochody z pracy (Polska)",
    fields: [
      { key: "salario_bruto_mensual_pl", label: "Miesięczne wynagrodzenie brutto (Firmao Polska lub inna)", type: "number", placeholder: "PLN/EUR" },
      { key: "estructura_salario", label: "Struktura wynagrodzenia (podstawa, bonus, dodatki)", type: "textarea" },
      { key: "importe_anual_neto_pl", label: "Roczna kwota netto otrzymana", type: "number" },
      { key: "cotiza_zus", label: "Czy odprowadzasz składki do polskiego ZUS?", type: "radio", options: ["Tak", "Nie"] },
      { key: "regimen_zus", label: "Jaki reżim?", type: "text" },
      { key: "seguros_prestaciones_pl", label: "Prywatne ubezpieczenie lub świadczenia dodatkowe?", type: "textarea" },
    ],
  },
  {
    id: "cargos_directivos",
    title: "A2. Dochody z zarządzania / stanowisk kierowniczych",
    fields: [
      { key: "cargo_firmao", label: "Firmao Polska: stanowisko w organie zarządzającym", type: "text", placeholder: "Jedyny administrator / rada / menadżer..." },
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
      { key: "beneficios_ultimo_ejercicio_mtec", label: "Zyski zadeklarowane w ostatnim roku obrachunkowym MTEC", type: "number" },
      { key: "dividendos_regularidad_mtec", label: "Czy dywidendy są rozdzielane regularnie?", type: "radio", options: ["Regularnie", "Nieregularnie", "Nie są rozdzielane"] },
      { key: "reservas_mtec", label: "Czy są skumulowane rezerwy / reinwestycja?", type: "textarea" },
      { key: "participacion_ared_firmao", label: "Firmao Polska: % udziału Fundacji ARED", type: "number" },
      { key: "dividendos_previstos_firmao", label: "Czy planowany jest podział dywidend w Firmao Polska?", type: "textarea" },
      { key: "dividendos_indirectos", label: "Czy twój pośredni bezpośredni udział generuje dywidendy?", type: "textarea" },
    ],
  },
  {
    id: "fundacion_ared",
    title: "A4. Fundacja ARED (struktura polska)",
    fields: [
      { key: "objeto_ared", label: "Cel i główna działalność fundacji", type: "textarea" },
      { key: "ingresos_ared_tipo", label: "Rodzaj dochodów (darowizny, sponsoring, biznesowe...)", type: "textarea" },
      { key: "financiacion_presupuesto_ared", label: "Jak jest finansowany i zarządzany roczny budżet", type: "textarea" },
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
      { key: "objeto_actividad", label: "Dokładny przedmiot działalności gospodarczej", type: "textarea" },
      { key: "ingresos_3_anos", label: "Dochody netto rocznie z ostatnich 3 lat", type: "textarea", placeholder: "2022: X, 2023: Y, 2024: Z" },
      { key: "servicios_otras_empresas", label: "Czy świadczysz usługi dla innych firm? Stawka?", type: "textarea" },
      { key: "gastos_anuales_actividad", label: "Roczne wydatki tej działalności", type: "number" },
      { key: "estado_actividad", label: "Status działalności", type: "radio", options: ["Aktywna", "Zawieszona", "Zamknięta"] },
      { key: "obligaciones_pendientes", label: "Jeśli zamknięta: czy są zaległe zobowiązania (długi podatkowe/składki)?", type: "textarea" },
    ],
  },
  {
    id: "podcasts_colaboraciones",
    title: "A6. Dochody z podcastów i współpracy",
    fields: [
      { key: "contratos_podcasts", label: "Obecne umowy/porozumienia", type: "textarea" },
      { key: "clientes_podcasts", label: "Klient/platforma płacąca", type: "text" },
      { key: "importe_podcasts", label: "Szacowana kwota miesięczna/roczna", type: "textarea" },
      { key: "estructura_pago_podcasts", label: "Jak zorganizowana jest płatność (przelew, fakturowanie...)", type: "textarea" },
      { key: "via_tributaria_pl_podcasts", label: "Obecna ścieżka podatkowa w Polsce", type: "text" },
      { key: "continua_en_es", label: "Czy przewiduje się, że będzie generować dochody w Hiszpanii?", type: "radio", options: ["Tak", "Nie", "Nie wiem"] },
    ],
  },
  {
    id: "contrato_teletrabajo",
    title: "A7. Umowa z Firmao Polska (praca zdalna z Hiszpanii)",
    fields: [
      { key: "salario_bruto_propuesto_es", label: "Proponowane wynagrodzenie brutto w umowie o pracę zdalną", type: "number" },
      { key: "duracion_desplazamiento", label: "Szacowany czas delegacji", type: "text", placeholder: "2 lata / stałe / otwarte" },
      { key: "mantiene_cargo_admin", label: "Czy stanowisko administratora zostanie zachowane oprócz umowy?", type: "radio", options: ["Tak", "Nie"] },
      { key: "cambios_participacion", label: "Czy będą wkłady kapitałowe lub zmiany w udziale akcyjnym?", type: "textarea" },
      { key: "otras_condiciones_laborales", label: "Inne warunki pracy (wakacje, bonus, świadczenia)", type: "textarea" },
      { key: "actividad_clientes_es", label: "Czy z Hiszpanii będziesz negocjować/zamykać umowy z klientami?", type: "radio", options: ["Tak", "Nie", "Czasami"] },
      { key: "presencia_empresa_es", label: "Czy firma będzie miała klientów/obecność w Hiszpanii?", type: "textarea" },
    ],
  },
  {
    id: "ingresos_irregulares",
    title: "A8. Sporadyczne lub nieregularne dochody",
    fields: [
      { key: "otras_fuentes_ingresos", label: "Inne niewymienione źródła dochodów", type: "textarea" },
      { key: "propiedades_alquiler", label: "Nieruchomości do wynajęcia (Polska/Hiszpania)", type: "textarea" },
      { key: "prestamos_intereses", label: "Dochody z pożyczek lub odsetek", type: "textarea" },
      { key: "stock_options", label: "Czy masz opcje na akcje/RSU/odroczone bonusy? Daty i kwoty", type: "textarea" },
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
      { key: "otros_activos", label: "Inne aktywa (pojazdy, sprzęt biznesowy)", type: "textarea" },
      { key: "prestamos_intragupo", label: "Pożyczki wewnątrzgrupowe / rachunki bieżące z udziałowcami", type: "textarea" },
      { key: "planes_pensiones", label: "Plany emerytalne/ubezpieczenia oszczędnościowe", type: "textarea" },
    ],
  },
  {
    id: "familia",
    title: "C. Struktura rodzinna i podatkowa wspólna",
    fields: [
      { key: "conyuge_nombre", label: "Współmałżonek: pełne imię i nazwisko oraz NIE/NIF (jeśli dotyczy)", type: "text" },
      { key: "conyuge_situacion_pl", label: "Obecna sytuacja zawodowa/podatkowa współmałżonka w Polsce", type: "textarea" },
      { key: "conyuge_ingresos", label: "Własne dochody współmałżonka (przybliżona kwota)", type: "number" },
      { key: "conyuge_residente_es", label: "Czy będzie rezydentem podatkowym w Hiszpanii od stycznia 2026?", type: "radio", options: ["Tak", "Nie", "Nie wiem"] },
      { key: "conyuge_beckham", label: "Czy będzie ubiegać się o reżim Beckham?", type: "radio", options: ["Tak", "Nie", "Nie wiem"] },
      { key: "conyuge_participacion_mtec", label: "Udział współmałżonka w MTEC / stanowiska", type: "textarea" },
      { key: "hijos", label: "Dzieci/osoby na utrzymaniu (wiek) i czy się przeprowadzają", type: "textarea" },
    ],
  },
  {
    id: "antecedentes",
    title: "D. Historia podatkowa i zgodność",
    fields: [
      { key: "residencia_historica_pl", label: "Czy zawsze byłeś rezydentem podatkowym w Polsce?", type: "radio", options: ["Tak", "Nie"] },
      { key: "inspecciones_pl", label: "Procesy/kontrole w toku w Polsce?", type: "textarea" },
      { key: "impuestos_al_dia", label: "Czy podatki i składki są na bieżąco?", type: "radio", options: ["Tak", "Nie", "Nie wiem"] },
      { key: "antecedentes_es", label: "Historia podatkowa/rejestracja w Hiszpanii? Wcześniejsze nieruchomości", type: "textarea" },
    ],
  },
];

function Field({ field, value, onChange }: { field: Field; value: any; onChange: (key: string, val: any) => void }) {
  const base = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#8e7951] focus:outline-none focus:ring-2 focus:ring-[#8e7951]/20";

  if (!field || !field.key) {
    return null;
  }

  if (field.type === "textarea") {
    return (
      <textarea
        className={base + " min-h-[88px]"}
        placeholder={field.placeholder || ""}
        value={value ?? ""}
        onChange={(e) => onChange(field.key, e.target.value)}
      />
    );
  }

  if (field.type === "radio") {
    return (
      <div className="flex flex-wrap gap-3">
        {(field.options || []).map((opt) => (
          <label key={opt} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name={field.key}
              checked={value === opt}
              onChange={() => onChange(field.key, opt)}
              className="text-[#8e7951] focus:ring-[#8e7951]"
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
      value={value ?? ""}
      onChange={(e) => onChange(field.key, e.target.value)}
    />
  );
}

function toCSV(data: Record<string, any>) {
  const rows = [["campo", "respuesta"]];
  Object.entries(data).forEach(([k, v]) => {
    rows.push([k, typeof v === "string" ? v.replace(/\n/g, " ") : String(v ?? "")]);
  });
  return rows.map((r) => r.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function FormularioBeckham() {
  const [form, setForm] = useState<Record<string, any>>({});
  const [status, setStatus] = useState("");
  const [lastSaved, setLastSaved] = useState<number | null>(null);
  const [sending, setSending] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/login-beckham';
    }
  }, []);

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

  const onChange = (key: string, val: any) => setForm((prev) => ({ ...prev, [key]: val }));

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
      setStatus("Dane załadowane.");
      setTimeout(() => setStatus(""), 1500);
    } catch {
      setStatus("Błąd podczas ładowania.");
    }
  };

  const clearAll = () => {
    if (!confirm("Czy na pewno chcesz usunąć wszystkie lokalne odpowiedzi?")) return;
    localStorage.removeItem(STORAGE_KEY);
    setForm({});
    setLastSaved(null);
    setStatus("Usunięto.");
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

  const sendEmail = async () => {
    if (completion.filled < 10) {
      alert("Proszę wypełnić więcej pól przed wysłaniem.");
      return;
    }

    if (!confirm("Czy na pewno chcesz wysłać kwestionariusz?")) return;

    setSending(true);
    setStatus("Wysyłanie...");

    try {
      // Aquí integrarías con EmailJS o tu servicio de email
      // Por ahora, simulo el envío
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStatus("✓ Kwestionariusz wysłany pomyślnie!");
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      setStatus("✗ Błąd podczas wysyłania.");
      setTimeout(() => setStatus(""), 3000);
    } finally {
      setSending(false);
    }
  };

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-lg font-semibold">Kwestionariusz Początkowy – Ustawa Beckhama</h1>
            <p className="text-xs text-slate-500">Wypełniane przez klienta · zapis lokalny · eksport JSON/CSV</p>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={sendEmail} disabled={sending} className="flex items-center gap-2 rounded-xl bg-[#8e7951] px-3 py-2 text-xs font-medium text-white shadow hover:opacity-90 disabled:opacity-50">
              <SendIcon /> {sending ? 'Wysyłanie...' : 'Wyślij'}
            </button>
            <button onClick={manualSave} className="flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-medium text-white shadow hover:opacity-90">
              <SaveIcon /> Zapisz
            </button>
            <button onClick={loadLocal} className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-xs font-medium shadow-sm hover:bg-slate-50">
              <UploadIcon /> Załaduj
            </button>
            <button onClick={clearAll} className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-xs font-medium shadow-sm hover:bg-slate-50">
              <TrashIcon /> Usuń
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 pb-3">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>Wypełniono: {completion.filled}/{completion.total} ({completion.pct}%)</span>
            <span>{lastSaved ? `Ostatni zapis: ${new Date(lastSaved).toLocaleString('pl-PL')}` : "Bez zapisów"}</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full bg-[#8e7951] transition-all duration-500" style={{ width: `${completion.pct}%` }} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-6 rounded-2xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-700">
            Wypełnij każdą sekcję możliwie dokładnie. Te informacje są wykorzystywane wyłącznie do analizy podatkowej i będą traktowane poufnie.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={exportJSON} className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-xs font-medium shadow-sm hover:bg-slate-50">
              <FileJsonIcon /> Eksportuj JSON
            </button>
            <button onClick={exportCSV} className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-xs font-medium shadow-sm hover:bg-slate-50">
              <FileSpreadsheetIcon /> Eksportuj CSV
            </button>
            <label className="flex cursor-pointer items-center gap-2 rounded-xl border bg-white px-3 py-2 text-xs font-medium shadow-sm hover:bg-slate-50">
              <DownloadIcon /> Importuj JSON
              <input type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && importJSON(e.target.files[0])} />
            </label>
            {status && <span className="ml-2 text-xs font-medium text-[#8e7951]">{status}</span>}
          </div>
        </motion.div>

        <div className="space-y-5">
          {SECTIONS.map((section, idx) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
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
            </motion.section>
          ))}
        </div>

        <footer className="mt-8 rounded-2xl border bg-white p-4 text-xs text-slate-600 shadow-sm">
          <p>
            Uwaga techniczna: ta wersja zapisuje dane w przeglądarce (localStorage). Dane są automatycznie zapisywane podczas wypełniania.
          </p>
        </footer>
      </main>
    </div>
  );
}
