import { useState, useEffect } from 'react';

interface CookieBannerProps {
  language?: 'es' | 'pl';
}

export function CookieBanner({ language = 'es' }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const acceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
  };

  const rejectAll = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
  };

  const savePreferences = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
    setShowSettings(false);
  };

  const texts = {
    es: {
      message: 'Usamos cookies para el funcionamiento del sitio y, con tu consentimiento, para analizar el tráfico y personalizar.',
      accept: 'Aceptar',
      reject: 'Rechazar',
      settings: 'Configurar',
      settingsTitle: 'Configuración de Cookies',
      necessary: 'Necesarias (siempre activas)',
      analytics: 'Analíticas',
      marketing: 'Publicidad/Personalización',
      save: 'Guardar Preferencias',
      close: 'Cerrar',
    },
    pl: {
      message: 'Używamy plików cookies, aby zapewnić działanie strony i – za Twoją zgodą – analizować ruch oraz personalizować treści.',
      accept: 'Akceptuj',
      reject: 'Odrzuć',
      settings: 'Ustawienia',
      settingsTitle: 'Ustawienia Cookies',
      necessary: 'Niezbędne (zawsze aktywne)',
      analytics: 'Analityczne',
      marketing: 'Reklamowe/Personalizacja',
      save: 'Zapisz Preferencje',
      close: 'Zamknij',
    },
  };

  const t = texts[language];

  if (!isVisible) return null;

  return (
    <>
      {/* Main Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-600 mb-4">{t.message}</p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button
              onClick={rejectAll}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm font-medium"
            >
              {t.reject}
            </button>
            <button
              onClick={acceptAll}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
            >
              {t.accept}
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="px-6 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 text-sm font-medium"
            >
              {t.settings}
            </button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">{t.settingsTitle}</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                  <div>
                    <h3 className="font-medium text-gray-900">{t.necessary}</h3>
                    <p className="text-sm text-gray-600">Requeridas para el funcionamiento básico</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                  <div>
                    <h3 className="font-medium text-gray-900">{t.analytics}</h3>
                    <p className="text-sm text-gray-600">Para análisis de tráfico y mejoras del sitio</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                  <div>
                    <h3 className="font-medium text-gray-900">{t.marketing}</h3>
                    <p className="text-sm text-gray-600">Para personalización y publicidad relevante</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={savePreferences}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {t.save}
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}