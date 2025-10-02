import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export function LegalNotice() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-[72px] px-6 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Aviso Legal / Nota Prawna</h1>
          
          {/* Aviso Legal ES */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Aviso Legal (ES)</h2>
            <div className="prose max-w-none text-gray-600">
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Identificación del prestador</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p><strong>Razón social:</strong> [razón social]</p>
                <p><strong>CIF/NIF:</strong> [xxx]</p>
                <p><strong>Domicilio:</strong> [xxx]</p>
                <p><strong>Email:</strong> info@pgkhiszpania.com</p>
              </div>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Condiciones de uso</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Prohibición de usos ilícitos del sitio web</li>
                <li>Respeto a los derechos de propiedad intelectual</li>
                <li>Limitación de responsabilidad por el uso del sitio</li>
                <li>Política sobre enlaces externos</li>
                <li>Normas de contacto y comunicación</li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Ley aplicable y jurisdicción</h3>
              <p>Este sitio web se rige por la ley española. Los juzgados competentes serán los de [ciudad].</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Propiedad intelectual</h3>
              <p>Todos los contenidos de este sitio web están protegidos por derechos de propiedad intelectual. Se permite el uso dentro de los límites legales establecidos.</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Resolución de conflictos</h3>
              <p>En caso de ser aplicable, se hace referencia a los mecanismos de resolución alternativa de disputas para consumidores.</p>
            </div>
          </section>

          {/* Nota Prawna PL */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nota Prawna (PL)</h2>
            <div className="prose max-w-none text-gray-600">
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Identyfikacja usługodawcy</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p><strong>Pełna firma:</strong> [pełna firma]</p>
                <p><strong>CIF/NIF:</strong> [xxx]</p>
                <p><strong>Adres:</strong> [xxx]</p>
                <p><strong>E-mail:</strong> info@pgkhiszpania.com</p>
              </div>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Warunki korzystania</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Zakaz nadużyć i nielegalnego wykorzystania strony</li>
                <li>Poszanowanie praw autorskich do treści</li>
                <li>Ograniczenie odpowiedzialności za korzystanie ze strony</li>
                <li>Zasady dotyczące linków zewnętrznych</li>
                <li>Zasady kontaktu i komunikacji</li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Prawo właściwe i jurysdykcja</h3>
              <p>Niniejsza strona podlega prawu hiszpańskiemu. Właściwe są sądy w [miasto].</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Prawa własności intelektualnej</h3>
              <p>Wszystkie materiały na tej stronie są chronione prawami własności intelektualnej. Dozwolony jest użytek w granicach prawa.</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Dane konsumenckie</h3>
              <p>W stosownych przypadkach udostępniamy informacje o możliwościach pozasądowego rozwiązywania sporów.</p>
            </div>
          </section>

          {/* Información adicional */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Información Adicional / Dodatkowe Informacje</h2>
            <div className="prose max-w-none text-gray-600">
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Datos pendientes de completar:</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Denominación social completa de la empresa</li>
                  <li>Número CIF/NIF definitivo</li>
                  <li>Dirección completa del domicilio social</li>
                  <li>Número de teléfono de contacto</li>
                  <li>Datos del Registro Mercantil</li>
                  <li>Información del DPO (si aplica)</li>
                  <li>Ciudad para jurisdicción competente</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  <em>Estos datos se completarán una vez se proporcionen los datos exactos de la empresa o las URLs internas donde figuren.</em>
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