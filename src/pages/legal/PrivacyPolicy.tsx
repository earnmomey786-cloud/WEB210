import { Shield } from 'lucide-react';
import { Header } from '../../components/Header';
import Footer from '../../components/Footer';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-[72px]">
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Shield className="w-10 h-10 text-[#8e7951]" />
                <h1 className="text-4xl md:text-5xl font-black text-[#1a1a1a]">
                  Política de Privacidad
                </h1>
              </div>
              <p className="text-gray-600 text-lg">
                Polityka Prywatności
              </p>
            </div>

            <div className="space-y-8 text-gray-700">
              {/* Sección 1 */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-black text-[#1a1a1a] mb-4">
                  1. Responsable del Tratamiento de sus Datos Personales
                </h2>
                <p className="text-base mb-4">El responsable del tratamiento de los datos recabados a través de este sitio web es:</p>
                <div className="space-y-2 text-base">
                  <p><strong>Nombre o Razón Social:</strong> Polska Grupa Konsultingowa</p>
                  <p><strong>NIF/CIF:</strong> B22682827</p>
                  <p><strong>Domicilio Social:</strong> Calle Matilde Peñaranda, 27, 03183 Torrevieja (Alicante), España</p>
                  <p><strong>Correo Electrónico:</strong> <a href="mailto:info@pgkhiszpania.com" className="text-[#8e7951] hover:underline">info@pgkhiszpania.com</a></p>
                  <p><strong>Teléfono:</strong> 644 106 222</p>
                  <p><strong>Sitio Web:</strong> www.podatkihiszpania.com</p>
                </div>
              </div>

              {/* Sección 2 */}
              <div>
                <h2 className="text-2xl font-black text-[#1a1a1a] mb-4">
                  2. Finalidad del Tratamiento de sus Datos Personales
                </h2>
                <p className="text-base mb-4">En Polska Grupa Konsultingowa tratamos la información que nos facilitan las personas interesadas con los siguientes fines:</p>
                <ul className="space-y-3 text-base">
                  <li className="flex gap-3">
                    <span className="text-[#8e7951] font-bold flex-shrink-0">•</span>
                    <span>Gestionar las solicitudes de información, consultas o cualquier tipo de petición que sea realizada por el usuario a través de cualquiera de las formas de contacto puestas a su disposición.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#8e7951] font-bold flex-shrink-0">•</span>
                    <span>Envío de comunicaciones comerciales sobre nuestros productos y servicios, siempre que se haya obtenido el consentimiento expreso del usuario.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#8e7951] font-bold flex-shrink-0">•</span>
                    <span>Realizar análisis estadísticos y estudios de mercado.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#8e7951] font-bold flex-shrink-0">•</span>
                    <span>Gestionar la relación contractual o precontractual con nuestros clientes y proveedores.</span>
                  </li>
                </ul>
              </div>

              {/* Sección 3 */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-black text-[#1a1a1a] mb-4">
                  3. Legitimación para el Tratamiento de sus Datos
                </h2>
                <p className="text-base leading-relaxed mb-3">
                  La base legal para el tratamiento de sus datos es el consentimiento del interesado, la ejecución de un contrato o precontrato, o el interés legítimo del responsable.
                </p>
                <p className="text-base leading-relaxed">
                  En el caso de las comunicaciones comerciales, la base legal es el consentimiento que se le solicita.
                </p>
              </div>

              {/* Sección 4 */}
              <div>
                <h2 className="text-2xl font-black text-[#1a1a1a] mb-4">
                  4. Conservación de sus Datos
                </h2>
                <p className="text-base leading-relaxed">
                  Los datos personales proporcionados se conservarán mientras se mantenga la relación con el usuario, no se solicite su supresión por el interesado, o durante los años necesarios para cumplir con las obligaciones legales.
                </p>
              </div>

              {/* Sección 5 */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-black text-[#1a1a1a] mb-4">
                  5. Destinatarios de sus Datos
                </h2>
                <p className="text-base leading-relaxed mb-3">
                  Sus datos no se cederán a terceros, salvo obligación legal.
                </p>
                <p className="text-base leading-relaxed">
                  No obstante, para la prestación de determinados servicios, es posible que sus datos sean tratados por terceros que actúan como encargados del tratamiento, bajo las instrucciones de Polska Grupa Konsultingowa y con las garantías adecuadas.
                </p>
              </div>

              {/* Sección 6 */}
              <div>
                <h2 className="text-2xl font-black text-[#1a1a1a] mb-4">
                  6. Derechos del Interesado
                </h2>
                <p className="text-base leading-relaxed mb-4">
                  Cualquier persona tiene derecho a obtener confirmación sobre si en Polska Grupa Konsultingowa estamos tratando datos personales que les conciernan, o no.
                </p>
                <div className="space-y-3 text-base">
                  <p className="leading-relaxed">
                    Las personas interesadas tienen derecho a <strong>acceder a sus datos personales</strong>, así como a solicitar la <strong>rectificación de los datos inexactos</strong> o, en su caso, solicitar su <strong>supresión</strong> cuando, entre otros motivos, los datos ya no sean necesarios para los fines que fueron recogidos.
                  </p>
                  <p className="leading-relaxed">
                    En determinadas circunstancias, los interesados podrán solicitar la <strong>limitación del tratamiento</strong> de sus datos, en cuyo caso únicamente los conservaremos para el ejercicio o la defensa de reclamaciones.
                  </p>
                  <p className="leading-relaxed">
                    En determinadas circunstancias y por motivos relacionados con su situación particular, los interesados podrán <strong>oponerse al tratamiento</strong> de sus datos. Polska Grupa Konsultingowa dejará de tratar los datos, salvo por motivos legítimos imperiosos, o el ejercicio o la defensa de posibles reclamaciones.
                  </p>
                  <p className="leading-relaxed">
                    Los interesados también tienen derecho a la <strong>portabilidad de sus datos</strong>.
                  </p>
                  <p className="leading-relaxed">
                    Finalmente, los interesados tienen derecho a <strong>presentar una reclamación</strong> ante la Agencia Española de Protección de Datos (AEPD), especialmente cuando no haya obtenido satisfacción en el ejercicio de sus derechos.
                  </p>
                </div>
              </div>

              {/* Sección 7 */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-black text-[#1a1a1a] mb-4">
                  7. ¿Cómo puede ejercer sus Derechos?
                </h2>
                <p className="text-base leading-relaxed">
                  Puede ejercer sus derechos enviando un escrito a <strong>Polska Grupa Konsultingowa</strong>, a la dirección postal <strong>Calle Matilde Peñaranda, 27, 03183 Torrevieja (Alicante), España</strong>, o a la dirección de correo electrónico <a href="mailto:info@pgkhiszpania.com" className="text-[#8e7951] hover:underline font-semibold">info@pgkhiszpania.com</a>, adjuntando fotocopia de su DNI o documento identificativo equivalente.
                </p>
              </div>

              {/* Sección 8 */}
              <div className="bg-[#1a1a1a] text-white rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-black text-white mb-4">
                  8. Cambios en la Política de Privacidad
                </h2>
                <p className="text-base leading-relaxed text-gray-300">
                  Polska Grupa Konsultingowa se reserva el derecho a modificar la presente Política de Privacidad para adaptarla a novedades legislativas o jurisprudenciales, así como a prácticas de la industria. En dichos supuestos, anunciará en esta página los cambios introducidos con razonable antelación a su puesta en práctica.
                </p>
              </div>
            </div>

            {/* Fecha de última actualización */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-500">
                Última actualización: Enero 2025
              </p>
              <a 
                href="/"
                className="inline-block mt-6 px-8 py-3 bg-[#8e7951] text-white text-sm uppercase tracking-widest font-semibold hover:bg-[#9e8961] transition-all duration-300"
              >
                Volver al inicio
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}