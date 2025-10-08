import { FileText } from 'lucide-react';
import { Header } from '../components/Header';
import Footer from '../components/Footer';

export function LegalNotice() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-[72px]">
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <FileText className="w-10 h-10 text-[#8e7951]" />
                <h1 className="text-4xl md:text-5xl font-black text-[#1a1a1a]">
                  Aviso Legal / Nota Prawna
                </h1>
              </div>
              <p className="text-gray-600 text-lg">
                Condiciones de uso de la página web
              </p>
            </div>

            <div className="space-y-8 text-gray-700">
              {/* Sección 1 */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-black text-[#1a1a1a] mb-4">
                  1. Datos Identificativos del Titular de la Web
                </h2>
                <div className="space-y-2 text-base">
                  <p><strong>Nombre o Razón Social:</strong> Polska Grupa Konsultingowa</p>
                  <p><strong>NIF/CIF:</strong> B22682827</p>
                  <p><strong>Domicilio Social:</strong> Calle Matilde Peñaranda, 27, 03183 Torrevieja (Alicante), España</p>
                  <p><strong>Correo Electrónico:</strong> <a href="mailto:info@pgkhiszpania.com" className="text-[#8e7951] hover:underline">info@pgkhiszpania.com</a></p>
                  <p><strong>Teléfono:</strong> 644 106 222</p>
                </div>
              </div>

              {/* Sección 2 */}
              <div>
                <h2 className="text-2xl font-black text-[#1a1a1a] mb-4">
                  2. Objeto y Ámbito de la Web
                </h2>
                <p className="text-base leading-relaxed">
                  El presente Aviso Legal regula el acceso y el uso de la página web <strong>www.pgkhiszpania.com</strong>, incluyendo los contenidos y servicios puestos a disposición de los usuarios en y/o a través de la misma.
                </p>
              </div>

              {/* Sección 3 */}
              <div>
                <h2 className="text-2xl font-black text-[#1a1a1a] mb-4">
                  3. Condiciones de Acceso y Uso de la Web
                </h2>
                <p className="text-base leading-relaxed">
                  El acceso a la web atribuye la condición de usuario e implica la aceptación plena y sin reservas de todas y cada una de las condiciones incluidas en este Aviso Legal. El usuario se compromete a utilizar la web, sus servicios y contenidos de forma lícita, diligente, correcta y de conformidad con la ley, la moral y el orden público.
                </p>
              </div>

              {/* Sección 4 */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-black text-[#1a1a1a] mb-4">
                  4. Propiedad Intelectual e Industrial
                </h2>
                <p className="text-base leading-relaxed">
                  Todos los derechos de propiedad intelectual e industrial del contenido de esta página web (incluyendo, a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, programas de ordenador necesarios para su funcionamiento, acceso y uso, etc.) son titularidad de <strong>Polska Grupa Konsultingowa</strong> o bien de sus licenciantes. Quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización de Polska Grupa Konsultingowa.
                </p>
              </div>

              {/* Sección 5 */}
              <div>
                <h2 className="text-2xl font-black text-[#1a1a1a] mb-4">
                  5. Exclusión de Garantías y Responsabilidad
                </h2>
                <p className="text-base leading-relaxed">
                  Polska Grupa Konsultingowa no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
                </p>
              </div>

              {/* Sección 6 */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-black text-[#1a1a1a] mb-4">
                  6. Política de Privacidad y Protección de Datos
                </h2>
                <p className="text-base leading-relaxed">
                  La información sobre el tratamiento de datos personales se encuentra detallada en la Política de Privacidad de esta web, accesible en <a href="/legal/privacy" className="text-[#8e7951] hover:underline font-semibold">www.pgkhiszpania.com/polityka-prywatnosci</a>.
                </p>
              </div>

              {/* Sección 7 */}
              <div>
                <h2 className="text-2xl font-black text-[#1a1a1a] mb-4">
                  7. Política de Cookies
                </h2>
                <p className="text-base leading-relaxed">
                  Esta web utiliza cookies propias y de terceros para mejorar la experiencia de navegación y ofrecer contenidos de interés. Para más información, consulte nuestra Política de Cookies en <a href="/legal/cookies" className="text-[#8e7951] hover:underline font-semibold">www.pgkhiszpania.com/polityka-prywatnosci</a>.
                </p>
              </div>

              {/* Sección 8 */}
              <div className="bg-[#1a1a1a] text-white rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-black text-white mb-4">
                  8. Legislación Aplicable y Jurisdicción
                </h2>
                <p className="text-base leading-relaxed text-gray-300">
                  El presente Aviso Legal se rige en todos y cada uno de sus extremos por la legislación española. Para la resolución de cualquier controversia que pudiera surgir de la interpretación o ejecución del presente Aviso Legal, las partes se someten a los Juzgados y Tribunales de Torrevieja (Alicante), salvo que la ley establezca lo contrario.
                </p>
              </div>

              {/* Sección RODO/GDPR */}
              <div className="mt-12 pt-12 border-t-4 border-[#8e7951]">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] mb-3">
                    Información sobre RODO (GDPR)
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Reglamento General de Protección de Datos
                  </p>
                </div>

                {/* RODO 1 */}
                <div className="mb-8">
                  <h3 className="text-xl font-black text-[#1a1a1a] mb-3">
                    1. Introducción al RODO (Reglamento General de Protección de Datos)
                  </h3>
                  <p className="text-base leading-relaxed">
                    El Reglamento General de Protección de Datos (RGPD), conocido en Polonia como <strong>RODO</strong> (Rozporządzenie Ogólne o Ochronie Danych Osobowych), es una normativa de la Unión Europea que unifica la protección de datos para todos los individuos dentro de la UE. Su objetivo es proteger la privacidad y los datos personales de los ciudadanos.
                  </p>
                </div>

                {/* RODO 2 */}
                <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-8">
                  <h3 className="text-xl font-black text-[#1a1a1a] mb-4">
                    2. Responsable del Tratamiento de sus Datos Personales
                  </h3>
                  <p className="text-base mb-4">El responsable del tratamiento de los datos recabados a través de este sitio web es:</p>
                  <div className="space-y-2 text-base">
                    <p><strong>Nombre o Razón Social:</strong> Polska Grupa Konsultingowa</p>
                    <p><strong>NIF/CIF:</strong> B22682827</p>
                    <p><strong>Domicilio Social:</strong> Calle Matilde Peñaranda, 27, 03183 Torrevieja (Alicante), España</p>
                    <p><strong>Correo Electrónico:</strong> <a href="mailto:info@pgkhiszpania.com" className="text-[#8e7951] hover:underline">info@pgkhiszpania.com</a></p>
                    <p><strong>Teléfono:</strong> 644 106 222</p>
                    <p><strong>Sitio Web:</strong> www.pgkhiszpania.com</p>
                  </div>
                </div>

                {/* RODO 3 */}
                <div className="mb-8">
                  <h3 className="text-xl font-black text-[#1a1a1a] mb-4">
                    3. Principios del Tratamiento de Datos según el RODO
                  </h3>
                  <p className="text-base mb-4">Según el RODO, el tratamiento de datos personales se rige por los siguientes principios:</p>
                  <ul className="space-y-3 text-base">
                    <li className="flex gap-3">
                      <span className="text-[#8e7951] font-bold flex-shrink-0">•</span>
                      <span><strong>Licitud, lealtad y transparencia:</strong> Los datos deben ser tratados de manera lícita, leal y transparente en relación con el interesado.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#8e7951] font-bold flex-shrink-0">•</span>
                      <span><strong>Limitación de la finalidad:</strong> Los datos deben ser recogidos con fines determinados, explícitos y legítimos, y no serán tratados ulteriormente de manera incompatible con dichos fines.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#8e7951] font-bold flex-shrink-0">•</span>
                      <span><strong>Minimización de datos:</strong> Los datos deben ser adecuados, pertinentes y limitados a lo necesario en relación con los fines para los que son tratados.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#8e7951] font-bold flex-shrink-0">•</span>
                      <span><strong>Exactitud:</strong> Los datos deben ser exactos y, si fuera necesario, actualizados.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#8e7951] font-bold flex-shrink-0">•</span>
                      <span><strong>Limitación del plazo de conservación:</strong> Los datos deben ser conservados de forma que se permita la identificación de los interesados durante no más tiempo del necesario para los fines del tratamiento.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#8e7951] font-bold flex-shrink-0">•</span>
                      <span><strong>Integridad y confidencialidad:</strong> Los datos deben ser tratados de tal manera que se garantice una seguridad adecuada de los datos personales, incluida la protección contra el tratamiento no autorizado o ilícito y contra su pérdida, destrucción o daño accidental, mediante la aplicación de medidas técnicas u organizativas apropiadas.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#8e7951] font-bold flex-shrink-0">•</span>
                      <span><strong>Responsabilidad proactiva:</strong> El responsable del tratamiento será responsable del cumplimiento de los principios y de poder demostrarlo.</span>
                    </li>
                  </ul>
                </div>

                {/* RODO 4 */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 md:p-8 mb-8">
                  <h3 className="text-xl font-black text-[#1a1a1a] mb-4">
                    4. Derechos del Interesado según el RODO
                  </h3>
                  <p className="text-base mb-4">El RODO otorga a los individuos una serie de derechos sobre sus datos personales:</p>
                  <ul className="space-y-3 text-base">
                    <li className="flex gap-3">
                      <span className="text-blue-600 font-bold flex-shrink-0">✓</span>
                      <span><strong>Derecho de acceso:</strong> A obtener confirmación de si se están tratando o no datos personales que le conciernen y, en tal caso, derecho de acceso a los mismos.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-600 font-bold flex-shrink-0">✓</span>
                      <span><strong>Derecho de rectificación:</strong> A obtener sin dilación indebida la rectificación de los datos personales inexactos que le conciernan.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-600 font-bold flex-shrink-0">✓</span>
                      <span><strong>Derecho de supresión (derecho al olvido):</strong> A obtener sin dilación indebida la supresión de los datos personales que le conciernan.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-600 font-bold flex-shrink-0">✓</span>
                      <span><strong>Derecho a la limitación del tratamiento:</strong> A obtener la limitación del tratamiento de sus datos.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-600 font-bold flex-shrink-0">✓</span>
                      <span><strong>Derecho a la portabilidad de los datos:</strong> A recibir los datos personales que le incumban, que haya facilitado a un responsable del tratamiento, en un formato estructurado, de uso común y lectura mecánica, y a transmitirlos a otro responsable del tratamiento sin impedimento.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-600 font-bold flex-shrink-0">✓</span>
                      <span><strong>Derecho de oposición:</strong> A oponerse en cualquier momento, por motivos relacionados con su situación particular, a que datos personales que le conciernan sean objeto de un tratamiento.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-600 font-bold flex-shrink-0">✓</span>
                      <span><strong>Derecho a no ser objeto de decisiones individuales automatizadas:</strong> Incluida la elaboración de perfiles.</span>
                    </li>
                  </ul>
                </div>

                {/* RODO 5 */}
                <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-8">
                  <h3 className="text-xl font-black text-[#1a1a1a] mb-3">
                    5. ¿Cómo puede ejercer sus Derechos?
                  </h3>
                  <p className="text-base leading-relaxed">
                    Puede ejercer sus derechos enviando un escrito a <strong>Polska Grupa Konsultingowa</strong>, a la dirección postal <strong>Calle Matilde Peñaranda, 27, 03183 Torrevieja (Alicante), España</strong>, o a la dirección de correo electrónico <a href="mailto:info@pgkhiszpania.com" className="text-[#8e7951] hover:underline font-semibold">info@pgkhiszpania.com</a>, adjuntando fotocopia de su DNI o documento identificativo equivalente.
                  </p>
                </div>

                {/* RODO 6 */}
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 md:p-8">
                  <h3 className="text-xl font-black text-[#1a1a1a] mb-3">
                    6. Derecho a presentar una Reclamación
                  </h3>
                  <p className="text-base leading-relaxed">
                    Si considera que el tratamiento de sus datos personales infringe la normativa, tiene derecho a presentar una reclamación ante una autoridad de control, en España, la <strong>Agencia Española de Protección de Datos (AEPD)</strong>.
                  </p>
                </div>
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
