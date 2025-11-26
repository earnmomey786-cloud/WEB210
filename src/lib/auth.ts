// Sistema de autenticación simple sin base de datos
// Los clientes están hardcodeados aquí

interface Client {
  email: string;
  nie: string; // NIE en texto plano (solo para demo)
}

// Función simple de hash (en producción usar bcrypt o similar)
function hashNIE(nie: string): string {
  let hash = 0;
  for (let i = 0; i < nie.length; i++) {
    const char = nie.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

// Lista de clientes autorizados
// Para añadir un cliente nuevo, añadir email y NIE
const AUTHORIZED_CLIENTS: Client[] = [
  {
    email: "Klient@pgkhiszpania.com",
    nie: "zajebisty210"
  },
  // Añadir más clientes aquí
];

export function validateClient(email: string, nie: string): boolean {
  const normalizedEmail = email.toLowerCase().trim();
  const normalizedNie = nie.toUpperCase().trim();
  
  return AUTHORIZED_CLIENTS.some(
    client => 
      client.email.toLowerCase() === normalizedEmail && 
      client.nie.toUpperCase() === normalizedNie
  );
}

export function login(email: string, nie: string): boolean {
  if (validateClient(email, nie)) {
    localStorage.setItem('client_auth', JSON.stringify({
      email,
      timestamp: Date.now()
    }));
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem('client_auth');
}

export function isAuthenticated(): boolean {
  const auth = localStorage.getItem('client_auth');
  if (!auth) return false;
  
  try {
    const data = JSON.parse(auth);
    // Sesión válida por 24 horas
    const expirationTime = 24 * 60 * 60 * 1000;
    return (Date.now() - data.timestamp) < expirationTime;
  } catch {
    return false;
  }
}

export function getAuthenticatedEmail(): string | null {
  const auth = localStorage.getItem('client_auth');
  if (!auth) return null;
  
  try {
    const data = JSON.parse(auth);
    return data.email;
  } catch {
    return null;
  }
}

// Utilidad para generar hash de NIE (usar en consola para añadir clientes)
export function generateNIEHash(nie: string): string {
  return hashNIE(nie);
}
