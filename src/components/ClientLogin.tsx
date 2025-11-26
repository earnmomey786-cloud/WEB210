import { useState } from 'react';
import { login } from '../lib/auth';

export function ClientLogin() {
  const [email, setEmail] = useState('');
  const [nie, setNie] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !nie) {
      setError('Proszę wypełnić wszystkie pola');
      setLoading(false);
      return;
    }

    const success = login(email, nie);
    
    if (success) {
      // Redirigir al área de clientes
      window.location.href = '/area-clientes';
    } else {
      setError('Nieprawidłowe dane logowania. Sprawdź swój email i hasło.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Strefa Klienta
            </h1>
            <p className="text-gray-600">
              Zaloguj się za pomocą swojego emaila i hasła
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="nie" className="block text-sm font-medium text-gray-700 mb-2">
                Hasło
              </label>
              <input
                id="nie"
                type="password"
                value={nie}
                onChange={(e) => setNie(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Weryfikacja...' : 'Zaloguj się'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-gray-600 hover:text-gray-900">
              ← Powrót do strony głównej
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
