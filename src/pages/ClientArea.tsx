import { useEffect } from 'react';
import { isAuthenticated, logout, getAuthenticatedEmail } from '../lib/auth';
import { GastosDeducibles } from './GastosDeducibles';

export function ClientArea() {
  useEffect(() => {
    // Verificar autenticación
    if (!isAuthenticated()) {
      window.location.href = '/login-clientes';
      return;
    }
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  if (!isAuthenticated()) {
    return null; // Evitar flash de contenido
  }

  const email = getAuthenticatedEmail();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header con logout */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#8e7951] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Aktywna sesja</p>
                <p className="text-sm font-semibold text-gray-900">{email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-lg transition flex items-center gap-2 text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Wyloguj się
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="pt-24 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Twoje narzędzia</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/formulario-beckham"
            className="group block p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-[#8e7951] transition-all shadow-sm hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#8e7951] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Kwestionariusz Ustawa Beckhama
                </h3>
                <p className="text-sm text-gray-600">
                  Wypełnij szczegółowy kwestionariusz do analizy możliwości zastosowania specjalnego systemu podatkowego dla nowych rezydentów w Hiszpanii
                </p>
              </div>
            </div>
          </a>

          <div className="group block p-6 bg-gradient-to-br from-[#8e7951]/10 to-[#8e7951]/5 rounded-xl border-2 border-[#8e7951]/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#8e7951] rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Koszty Uzyskania Przychodów Model 210
                </h3>
                <p className="text-sm text-gray-600">
                  Przeglądaj poniżej szczegółową listę wszystkich kosztów podlegających odliczeniu w deklaracji Model 210 dla nierezydentów
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contenido: Visor de Gastos Deducibles */}
      <div className="pb-8">
        <GastosDeducibles isEmbedded={true} onLogout={handleLogout} userEmail={email} />
      </div>
    </div>
  );
}
