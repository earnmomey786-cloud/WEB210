import { Header } from '../../components/Header';
import Footer from '../../components/Footer';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-[72px] px-6 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidad / Polityka Prywatności</h1>
          
          {/* Datos de la empresa */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Datos de la empresa / Dane firmy</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Español (ES)</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Marca comercial:</strong> Polska Grupa Konsultingowa (PGK Hiszpania)</p>
                  <p><strong>Razón social:</strong> POLSKA GRUPA KONSULTINGOWA SL</p>
                  <p><strong>CIF/NIF:</strong> B22682827</p>
                  <p><strong>Domicilio social:</strong> Calle Matilde Peñaranda 27, 5º A, 03183 Torrevieja (Alicante), España</p>
                  <p><strong>Email de contacto:</strong> info@pgkhiszpania.com</p>
                  <p><strong>Teléfono:</strong> [Por confirmar]</p>
                  <p><strong>Forma jurídica:</strong> Sociedad Limitada</p>
                  <p><strong>Actividad:</strong> CNAE 6420 - Actividades de las sociedades holding / Servicios de consultoría fiscal</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Polski (PL)</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Nazwa handlowa / marka:</strong> Polska Grupa Konsultingowa (PGK Hiszpania)</p>
                  <p><strong>Podmiot prawny (firma):</strong> POLSKA GRUPA KONSULTINGOWA SL</p>
                  <p><strong>NIF/CIF:</strong> B22682827</p>
                  <p><strong>Siedziba (adres):</strong> Calle Matilde Peñaranda 27, 5º A, 03183 Torrevieja (Alicante), Hiszpania</p>
                  <p><strong>E-mail kontaktowy:</strong> info@pgkhiszpania.com</p>
                  <p><strong>Telefon:</strong> [Do potwierdzenia]</p>
                  <p><strong>Forma prawna:</strong> Sociedad Limitada (Spółka z o.o.)</p>
                  <p><strong>Działalność:</strong> CNAE 6420 - Działalność holdingów / Usługi doradztwa podatkowego</p>
                </div>
              </div>
            </div>
          </section>

          {/* Política de privacidad ES */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Política de Privacidad (ES)</h2>
            <div className="prose max-w-none text-gray-600">
              <p><strong>Responsable:</strong> POLSKA GRUPA KONSULTINGOWA SL, CIF B22682827, domicilio en Calle Matilde Peñaranda 27, 5º A, 03183 Torrevieja (Alicante), email: info@pgkhiszpania.com</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Finalidades</h3>
              <p>Prestación de servicios fiscales (Modelo 210/IRNR), atención de consultas, facturación y cumplimiento legal.</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Base jurídica (art. 6 RGPD)</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Ejecución de contrato</li>
                <li>Obligación legal</li>
                <li>Interés legítimo</li>
                <li>Consentimiento (marketing/cookies)</li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Datos tratados</h3>
              <p>Identificativos, contacto, facturación, fiscales, documentación de inmuebles.</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Destinatarios</h3>
              <p>Pasarela de pago (Stripe), hosting/correo, CRM, asesores, Administración Tributaria.</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Transferencias internacionales</h3>
              <p>Si las hubiera, con garantías (Cláusulas Contractuales Tipo, TIA).</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Plazos de conservación</h3>
              <p>Relación contractual + plazos fiscales y regulatorios.</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Derechos</h3>
              <p>Acceso, rectificación, supresión, limitación, oposición, portabilidad; reclamación ante la AEPD.</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Seguridad</h3>
              <p>Cifrado en tránsito y reposo; control de accesos.</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Marketing</h3>
              <p>Únicamente con consentimiento; revocable en cualquier momento.</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Cookies</h3>
              <p>Ver "Política de cookies".</p>
            </div>
          </section>

          {/* Polityka prywatności PL */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Polityka prywatności (PL)</h2>
            <div className="prose max-w-none text-gray-600">
              <p><strong>Administrator danych:</strong> POLSKA GRUPA KONSULTINGOWA SL, NIF/CIF B22682827, adres: Calle Matilde Peñaranda 27, 5º A, 03183 Torrevieja (Alicante), Hiszpania, e-mail: info@pgkhiszpania.com</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Zakres</h3>
              <p>Przetwarzamy dane w celu świadczenia usług doradczych i podatkowych (Model 210/IRNR), obsługi zapytań, rozliczeń i zgodności prawnej.</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Podstawy prawne (art. 6 RODO)</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Wykonanie umowy</li>
                <li>Obowiązek prawny</li>
                <li>Uzasadniony interes</li>
                <li>Zgoda (np. marketing/cookies)</li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Kategorie danych</h3>
              <p>Identyfikacyjne, kontaktowe, rozliczeniowe, podatkowe, dokumenty nieruchomości.</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Odbiorcy</h3>
              <p>Banki/podmioty płatnicze (Stripe), hosting i poczta, narzędzia CRM, doradcy/księgowi, organy podatkowe.</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Transfery poza EOG</h3>
              <p>Jeśli występują, stosujemy mechanizmy zgodności (SCC, TIA).</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Okresy przechowywania</h3>
              <p>Przez czas trwania relacji + okresy wymagane prawem podatkowym.</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Prawa użytkownika</h3>
              <p>Dostęp, sprostowanie, usunięcie, ograniczenie, sprzeciw, przenoszenie, skarga do AEPD (Hiszpania) lub UODO (Polska).</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Kontakt/DPO</h3>
              <p>[Dane DPO lub kontakt do administratora].</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Formularze i dokumenty</h3>
              <p>Dane przekazywane przez bezpieczny formularz, szyfrowane w tranzycie; pliki przechowywane w szyfrowanym magazynie.</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Komunikacja marketingowa</h3>
              <p>Tylko za zgodą; możliwość wycofania w każdej chwili.</p>
              
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Cookies</h3>
              <p>Patrz "Polityka cookies".</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}