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

      {/* Info Section */}
      <div className="pt-24 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Koszty Uzyskania Przychodów Model 210</h2>
        <p className="text-gray-600 mb-6">Szczegółowa lista kosztów podlegających odliczeniu w deklaracji dla nierezydentów</p>
      </div>
      
      {/* Contenido: Visor de Gastos Deducibles */}
      <div className="pb-8">
        <GastosDeducibles isEmbedded={true} onLogout={handleLogout} userEmail={email} />
      </div>
    </div>
  );
}
