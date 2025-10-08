import { Header } from '../../components/Header';
import Footer from '../../components/Footer';

export function CookiesPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-[72px] px-6 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Cookies / Polityka Cookies</h1>
          
          {/* Banner de cookies - textos listos */}
          <section className="mb-8 bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Textos para Banner de Cookies</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Español (1ª capa)</h3>
                <div className="bg-white p-4 rounded border">
                  <p className="text-sm text-gray-600 mb-3">
                    Usamos cookies para el funcionamiento del sitio y, con tu consentimiento, para analizar el tráfico y personalizar.
                  </p>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm">Rechazar</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm">Aceptar</button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded text-sm">Configurar</button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Polski (1ª capa)</h3>
                <div className="bg-white p-4 rounded border">
                  <p className="text-sm text-gray-600 mb-3">
                    Używamy plików cookies, aby zapewnić działanie strony i – za Twoją zgodą – analizować ruch oraz personalizować treści.
                  </p>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm">Odrzuć</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm">Akceptuj</button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded text-sm">Ustawienia</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Política de cookies ES */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Política de Cookies (ES)</h2>
            <div className="prose max-w-none text-gray-600">
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">¿Qué son las cookies?</h3>
              <p>Ficheros depositados en el navegador para funcionamiento, métricas y (con consentimiento) personalización.</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Categorías</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Necesarias:</strong> Siempre activas para el funcionamiento básico</li>
                <li><strong>Analíticas:</strong> Requieren consentimiento</li>
                <li><strong>Publicidad/Personalización:</strong> Requieren consentimiento</li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Banner conforme AEPD 2024/25</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>"Aceptar" y "Rechazar" en el primer nivel</li>
                <li>Enlace a "Configuración"</li>
                <li>Sin casillas premarcadas</li>
                <li>Sin cookie-walls sin alternativa</li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Segunda capa permanente</h3>
              <p>Detalle de finalidades, cookies propias/terceros, duraciones, y panel para retirar o modificar el consentimiento en cualquier momento.</p>
            </div>
          </section>

          {/* Polityka cookies PL */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Polityka Cookies (PL)</h2>
            <div className="prose max-w-none text-gray-600">
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Co to są cookies</h3>
              <p>Pliki zapisywane w przeglądarce, aby zapewnić działanie strony, analizę ruchu i – za zgodą – personalizację.</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Rodzaje</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Niezbędne:</strong> Bez zgody (np. utrzymanie sesji, koszyk, bezpieczeństwo)</li>
                <li><strong>Analityczne:</strong> Wymagana zgoda</li>
                <li><strong>Reklamowe/personalizacyjne:</strong> Wymagana zgoda</li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Baner zgody (zgodne z AEPD 2024/25)</h3>
              <p>Musi mieć "Akceptuj" i "Odrzuć" na tym samym poziomie, link "Ustawienia" (druga warstwa), brak pre-zaznaczonych kategorii, i brak "cookie walls" bez alternatywy.</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Ustawienia (druga warstwa – zawsze dostępna w stopce)</h3>
              <p>Lista kategorii, dostawców, celów, czasu trwania, własne vs. podmioty trzecie; możliwość zmiany/wycofania zgody w dowolnym momencie.</p>
            </div>
          </section>

          {/* Tabla de cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tabla de Cookies / Tabela Cookies</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Kategoría</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Nombre Cookie</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Proveedor</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Propósito</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Duración</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Tipo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">Necesarias</td>
                    <td className="px-4 py-3 text-sm text-gray-900">__stripe_mid</td>
                    <td className="px-4 py-3 text-sm text-gray-900">Stripe</td>
                    <td className="px-4 py-3 text-sm text-gray-900">Procesamiento de pagos</td>
                    <td className="px-4 py-3 text-sm text-gray-900">1 año</td>
                    <td className="px-4 py-3 text-sm text-gray-900">Terceros</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">Analíticas</td>
                    <td className="px-4 py-3 text-sm text-gray-900">_ga</td>
                    <td className="px-4 py-3 text-sm text-gray-900">Google</td>
                    <td className="px-4 py-3 text-sm text-gray-900">Estadísticas de tráfico</td>
                    <td className="px-4 py-3 text-sm text-gray-900">13 meses</td>
                    <td className="px-4 py-3 text-sm text-gray-900">Terceros</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">Funcionales</td>
                    <td className="px-4 py-3 text-sm text-gray-900">lang_pref</td>
                    <td className="px-4 py-3 text-sm text-gray-900">PGK</td>
                    <td className="px-4 py-3 text-sm text-gray-900">Recordar idioma</td>
                    <td className="px-4 py-3 text-sm text-gray-900">6 meses</td>
                    <td className="px-4 py-3 text-sm text-gray-900">Propias</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              <em>Nota: Los nombres y duraciones exactas se completarán después del análisis de las herramientas CMP utilizadas.</em>
            </p>
          </section>

          {/* Gestión de cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gestión de Cookies / Zarządzanie Cookies</h2>
            <div className="prose max-w-none text-gray-600">
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Cómo gestionar cookies por navegador:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Chrome:</strong> Configuración {'>'}  Privacidad y seguridad {'>'}  Cookies</li>
                <li><strong>Firefox:</strong> Preferencias {'>'}  Privacidad y seguridad {'>'}  Cookies</li>
                <li><strong>Safari:</strong> Preferencias {'>'}  Privacidad {'>'}  Cookies</li>
                <li><strong>Edge:</strong> Configuración {'>'}  Privacidad {'>'}  Cookies</li>
              </ul>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-center">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Gestionar Consentimiento / Zarządzaj Zgodą
                  </button>
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}