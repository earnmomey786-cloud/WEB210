import React, { useEffect, useMemo, useState } from "react";
import { Download, Save, Trash2, Upload, FileJson, FileSpreadsheet } from "lucide-react";

// Single-file React app (Tailwind) for client intake questionnaire.
// Features:
// - Multi-section form based on your questionnaire
// - Autosave to localStorage (internal storage)
// - Manual Save / Load / Clear
// - Export as JSON or CSV
// - Import JSON to refill

const STORAGE_KEY = "beckham_intake_v1";

const SECTIONS = [
  {
    id: "datos_clave",
    title: "0. Datos y fechas clave del traslado",
    description: "Fechas y hechos críticos para residencia fiscal y plazo Modelo 149.",
    fields: [
      { key: "fecha_llegada_espana", label: "Fecha prevista de llegada a España", type: "date" },
      { key: "fecha_inicio_trabajo", label: "Fecha prevista de inicio de trabajo desde España", type: "date" },
      { key: "fecha_alta_ss", label: "Fecha prevista de alta en Seguridad Social española / A1", type: "date" },
      { key: "dias_espana_2025", label: "Días estimados en España durante 2025", type: "number", placeholder: "Ej. 40" },
      { key: "dias_espana_2026", label: "Días estimados en España durante 2026", type: "number", placeholder: "Ej. 330" },
      { key: "vivienda_polonia_disponible", label: "¿Mantendrás vivienda disponible en Polonia?", type: "radio", options: ["Sí", "No"] },
      { key: "detalle_vivienda_polonia", label: "Si respondiste Sí, ¿cómo se mantendrá? (uso propio / alquilada / familiar, etc.)", type: "textarea" },
      { key: "familia_se_traslada", label: "¿Se traslada la familia contigo desde el inicio?", type: "radio", options: ["Sí", "No"] },
      { key: "fecha_traslado_familia", label: "Fecha prevista de traslado de familia (si aplica)", type: "date" },
    ],
  },
  {
    id: "ingresos_laborales",
    title: "A1. Ingresos laborales actuales (Polonia)",
    fields: [
      { key: "salario_bruto_mensual_pl", label: "Salario bruto mensual (Firmao Polska u otra)", type: "number", placeholder: "PLN/EUR" },
      { key: "estructura_salario", label: "Estructura del salario (base, bonus, complementos)", type: "textarea" },
      { key: "importe_anual_neto_pl", label: "Importe anual neto percibido", type: "number" },
      { key: "cotiza_zus", label: "¿Cotizas en Seguridad Social polaca (ZUS)?", type: "radio", options: ["Sí", "No"] },
      { key: "regimen_zus", label: "¿A qué régimen?", type: "text" },
      { key: "seguros_prestaciones_pl", label: "¿Seguro privado o prestaciones complementarias?", type: "textarea" },
    ],
  },
  {
    id: "cargos_directivos",
    title: "A2. Ingresos por administración / cargos directivos",
    fields: [
      { key: "cargo_firmao", label: "Firmao Polska: cargo en órgano de administración", type: "text", placeholder: "Administrador único / consejo / gerente..." },
      { key: "retribucion_cargo_firmao", label: "¿Percibes retribución por este cargo?", type: "radio", options: ["Sí", "No"] },
      { key: "importe_anual_cargo_firmao", label: "Importe anual bruto por el cargo", type: "number" },
      { key: "estructura_pagos_cargo", label: "Estructura de pagos (nómina, honorarios, combinado)", type: "text" },
      { key: "beneficios_cargo_firmao", label: "Prestaciones o beneficios adicionales", type: "textarea" },
      { key: "cargo_mtec", label: "MTEC: ¿ocupas cargo de administración?", type: "radio", options: ["Sí", "No"] },
      { key: "retribucion_cargo_mtec", label: "MTEC: ¿percibes retribución?", type: "radio", options: ["Sí", "No"] },
      { key: "importe_anual_cargo_mtec", label: "MTEC: importe anual bruto (si aplica)", type: "number" },
    ],
  },
  {
    id: "dividendos_participaciones",
    title: "A3. Dividendos y participaciones accionarias",
    fields: [
      { key: "participacion_mtec", label: "MTEC: % de participación aproximada", type: "number", placeholder: "Ej. 91" },
      { key: "ultimo_dividendo_mtec", label: "Último reparto anual de dividendos MTEC", type: "number" },
      { key: "beneficios_ultimo_ejercicio_mtec", label: "Beneficios declarados último ejercicio MTEC", type: "number" },
      { key: "dividendos_regularidad_mtec", label: "¿Se reparten dividendos regularmente?", type: "radio", options: ["Regular", "Irregular", "No se reparten"] },
      { key: "reservas_mtec", label: "¿Hay reservas acumuladas / reinversión?", type: "textarea" },
      { key: "participacion_ared_firmao", label: "Firmao Polska: % participación Fundación ARED", type: "number" },
      { key: "dividendos_previstos_firmao", label: "¿Reparto de dividendos previsto en Firmao Polska?", type: "textarea" },
      { key: "dividendos_indirectos", label: "¿Tu participación indirecta directa genera dividendos?", type: "textarea" },
    ],
  },
  {
    id: "fundacion_ared",
    title: "A4. Fundación ARED (estructura polaca)",
    fields: [
      { key: "objeto_ared", label: "Objeto y actividad principal de la fundación", type: "textarea" },
      { key: "ingresos_ared_tipo", label: "Tipo de ingresos (donaciones, patrocinios, empresariales...)", type: "textarea" },
      { key: "financiacion_presupuesto_ared", label: "Cómo se financia y gestiona el presupuesto anual", type: "textarea" },
      { key: "distribucion_fondos_ared", label: "% distribuido a beneficiarios vs reservas", type: "text" },
      { key: "rol_en_ared", label: "¿Tienes rol de administración o eres beneficiario?", type: "textarea" },
      { key: "gobernanza_ared", label: "Estructura de gobernanza (órganos, junta directiva, etc.)", type: "textarea" },
      { key: "cambio_admin_no_residente_es", label: "¿Podrías cambiar la administración a residentes en Polonia para evitar residencia en España?", type: "textarea" },
    ],
  },
  {
    id: "actividad_empresarial",
    title: "A5. Actividad empresarial / działalność gospodarcza",
    fields: [
      { key: "objeto_actividad", label: "Objeto exacto de la actividad empresarial", type: "textarea" },
      { key: "ingresos_3_anos", label: "Ingresos netos anuales últimos 3 años", type: "textarea", placeholder: "2022: X, 2023: Y, 2024: Z" },
      { key: "servicios_otras_empresas", label: "¿Prestas servicios a otras empresas? ¿Tarifa?", type: "textarea" },
      { key: "gastos_anuales_actividad", label: "Gastos anuales de esta actividad", type: "number" },
      { key: "estado_actividad", label: "Estado de la actividad", type: "radio", options: ["Activa", "Suspendida", "Cerrada"] },
      { key: "obligaciones_pendientes", label: "Si se cierra: ¿hay obligaciones pendientes (deudas fiscales/cotizaciones)?", type: "textarea" },
    ],
  },
  {
    id: "podcasts_colaboraciones",
    title: "A6. Ingresos por podcasts y colaboraciones",
    fields: [
      { key: "contratos_podcasts", label: "Contratos/acuerdos actuales", type: "textarea" },
      { key: "clientes_podcasts", label: "Cliente/plataforma pagadora", type: "text" },
      { key: "importe_podcasts", label: "Importe mensual/anual estimado", type: "textarea" },
      { key: "estructura_pago_podcasts", label: "Cómo se estructura el pago (transferencia, facturación...)", type: "textarea" },
      { key: "via_tributaria_pl_podcasts", label: "Vía tributaria en Polonia actualmente", type: "text" },
      { key: "continua_en_es", label: "¿Se prevé que continúe generando ingresos en España?", type: "radio", options: ["Sí", "No", "No lo sé"] },
    ],
  },
  {
    id: "contrato_teletrabajo",
    title: "A7. Contrato con Firmao Polska (teletrabajo desde España)",
    fields: [
      { key: "salario_bruto_propuesto_es", label: "Salario bruto propuesto en contrato de teletrabajo", type: "number" },
      { key: "duracion_desplazamiento", label: "Duración estimada del desplazamiento", type: "text", placeholder: "2 años / permanente / abierto" },
      { key: "mantiene_cargo_admin", label: "¿Se mantendría el cargo de administrador además del contrato?", type: "radio", options: ["Sí", "No"] },
      { key: "cambios_participacion", label: "¿Habrá aportación de capital o cambios en participación accionarial?", type: "textarea" },
      { key: "otras_condiciones_laborales", label: "Otras condiciones laborales (vacaciones, bonus, beneficios)", type: "textarea" },
      { key: "actividad_clientes_es", label: "¿Desde España negociarás/cerrarás contratos con clientes?", type: "radio", options: ["Sí", "No", "A veces"] },
      { key: "presencia_empresa_es", label: "¿La empresa tendrá clientes/presencia en España?", type: "textarea" },
    ],
  },
  {
    id: "ingresos_irregulares",
    title: "A8. Ingresos esporádicos o irregulares",
    fields: [
      { key: "otras_fuentes_ingresos", label: "Otras fuentes de ingresos no mencionadas", type: "textarea" },
      { key: "propiedades_alquiler", label: "Propiedades en alquiler (Polonia/España)", type: "textarea" },
      { key: "prestamos_intereses", label: "Ingresos por préstamos o intereses", type: "textarea" },
      { key: "stock_options", label: "¿Tienes stock options/RSUs/bonus diferido? Fechas e importes", type: "textarea" },
      { key: "cripto_trading", label: "¿Criptomonedas o trading relevante?", type: "textarea" },
    ],
  },
  {
    id: "patrimonio",
    title: "B. Situación patrimonial y activos",
    fields: [
      { key: "inmuebles_polonia", label: "Vivienda/propiedad en Polonia (valor aprox.)", type: "textarea" },
      { key: "vivienda_espana", label: "Vivienda en España desde enero 2026 (alquiler/compra/valor)", type: "textarea" },
      { key: "cuentas_bancarias", label: "Cuentas bancarias (saldos aproximados)", type: "textarea" },
      { key: "inversiones_financieras", label: "Inversiones financieras (fondos, valores)", type: "textarea" },
      { key: "otros_activos", label: "Otros activos (vehículos, equipamiento empresarial)", type: "textarea" },
      { key: "prestamos_intragupo", label: "Préstamos intra-grupo / cuentas corrientes con socios", type: "textarea" },
      { key: "planes_pensiones", label: "Planes de pensiones/seguros ahorro", type: "textarea" },
    ],
  },
  {
    id: "familia",
    title: "C. Estructura familiar y fiscal conjunta",
    fields: [
      { key: "conyuge_nombre", label: "Cónyuge: nombre completo y NIE/NIF (si aplica)", type: "text" },
      { key: "conyuge_situacion_pl", label: "Situación laboral/fiscal actual del cónyuge en Polonia", type: "textarea" },
      { key: "conyuge_ingresos", label: "Ingresos propios del cónyuge (importe aprox.)", type: "number" },
      { key: "conyuge_residente_es", label: "¿Será residente fiscal en España desde enero 2026?", type: "radio", options: ["Sí", "No", "No lo sé"] },
      { key: "conyuge_beckham", label: "¿Solicitará régimen Beckham?", type: "radio", options: ["Sí", "No", "No lo sé"] },
      { key: "conyuge_participacion_mtec", label: "Participación del cónyuge en MTEC / cargos", type: "textarea" },
      { key: "hijos", label: "Hijos/dependientes (edades) y si se trasladan", type: "textarea" },
    ],
  },
  {
    id: "antecedentes",
    title: "D. Antecedentes fiscales y cumplimiento",
    fields: [
      { key: "residencia_historica_pl", label: "¿Has sido siempre residente fiscal en Polonia?", type: "radio", options: ["Sí", "No"] },
      { key: "inspecciones_pl", label: "¿Procesos/inspecciones pendientes en Polonia?", type: "textarea" },
      { key: "impuestos_al_dia", label: "¿Impuestos y cotizaciones al día?", type: "radio", options: ["Sí", "No", "No lo sé"] },
      { key: "antecedentes_es", label: "¿Antecedente fiscal/registro en España? Propiedades previas", type: "textarea" },
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
  // Flatten and export key/value
  const rows = [["campo", "respuesta"]];
  Object.entries(data).forEach(([k, v]) => {
    rows.push([k, typeof v === "string" ? v.replace(/\n/g, " ") : String(v ?? "")]);
  });
  return rows.map((r) => r.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export default function BeckhamForm() {
  const [form, setForm] = useState<Record<string, any>>({});
  const [status, setStatus] = useState("");
  const [lastSaved, setLastSaved] = useState<number | null>(null);

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

  const manualSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ form, lastSaved: Date.now() }));
    setLastSaved(Date.now());
    setStatus("Guardado localmente.");
    setTimeout(() => setStatus(""), 1500);
  };

  const loadLocal = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return setStatus("No hay datos guardados.");
      const parsed = JSON.parse(raw);
      setForm(parsed.form || {});
      setLastSaved(parsed.lastSaved || null);
      setStatus("Datos cargados.");
      setTimeout(() => setStatus(""), 1500);
    } catch {
      setStatus("Error al cargar.");
    }
  };

  const clearAll = () => {
    if (!window.confirm("¿Seguro que quieres borrar todas las respuestas locales?")) return;
    localStorage.removeItem(STORAGE_KEY);
    setForm({});
    setLastSaved(null);
    setStatus("Borrado.");
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
    download(new Blob([JSON.stringify(form, null, 2)], { type: "application/json" }), "beckham-cuestionario.json");
  };

  const exportCSV = () => {
    download(new Blob([toCSV(form)], { type: "text/csv;charset=utf-8" }), "beckham-cuestionario.csv");
  };

  const importJSON = async (file: File) => {
    const text = await file.text();
    const parsed = JSON.parse(text);
    setForm(parsed);
    setStatus("Importado correctamente.");
    setTimeout(() => setStatus(""), 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-lg font-semibold">Cuestionario Inicial – Ley Beckham</h1>
            <p className="text-xs text-slate-500">Relleno por cliente · guardado interno local · exportación JSON/CSV</p>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={manualSave} className="flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-medium text-white shadow hover:opacity-90">
              <Save className="h-4 w-4" /> Guardar
            </button>
            <button onClick={loadLocal} className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-xs font-medium shadow-sm hover:bg-slate-50">
              <Upload className="h-4 w-4" /> Cargar
            </button>
            <button onClick={clearAll} className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-xs font-medium shadow-sm hover:bg-slate-50">
              <Trash2 className="h-4 w-4" /> Borrar
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 pb-3">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>Completado: {completion.filled}/{completion.total} ({completion.pct}%)</span>
            <span>{lastSaved ? `Último guardado: ${new Date(lastSaved).toLocaleString()}` : "Sin guardados"}</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full bg-slate-900 transition-all duration-300" style={{ width: `${completion.pct}%` }} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <div className="mb-6 rounded-2xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-700">
            Completa cada apartado con la mayor precisión posible. Esta información se utiliza únicamente para el análisis fiscal y se tratará de forma confidencial.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={exportJSON} className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-xs font-medium shadow-sm hover:bg-slate-50">
              <FileJson className="h-4 w-4" /> Exportar JSON
            </button>
            <button onClick={exportCSV} className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-xs font-medium shadow-sm hover:bg-slate-50">
              <FileSpreadsheet className="h-4 w-4" /> Exportar CSV
            </button>
            <label className="flex cursor-pointer items-center gap-2 rounded-xl border bg-white px-3 py-2 text-xs font-medium shadow-sm hover:bg-slate-50">
              <Download className="h-4 w-4" /> Importar JSON
              <input type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && importJSON(e.target.files[0])} />
            </label>
            {status && <span className="ml-2 text-xs text-emerald-700">{status}</span>}
          </div>
        </div>

        <div className="space-y-5">
          {SECTIONS.map((section, idx) => (
            <section
              key={section.id}
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
            </section>
          ))}
        </div>

        <footer className="mt-8 rounded-2xl border bg-white p-4 text-xs text-slate-600 shadow-sm">
          <p>
            Nota técnica: esta versión guarda los datos en el navegador (localStorage). Si quieres almacenamiento interno centralizado,
            puedo ayudarte a conectarlo a un backend (Firebase/Supabase/tu servidor) con login y panel de clientes.
          </p>
        </footer>
      </main>
    </div>
  );
}
