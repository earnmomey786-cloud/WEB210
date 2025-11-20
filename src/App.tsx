import { Home } from './pages/Home';
import { PrivacyPolicy } from './pages/legal/PrivacyPolicy';
import { CookiesPolicy } from './pages/legal/CookiesPolicy';
import { LegalNotice as LegalNoticePage } from './pages/LegalNotice';
import { ClientArea } from './pages/ClientArea';
import { ClientLogin } from './components/ClientLogin';
import { GastosDeducibles } from './pages/GastosDeducibles';
import { CookieBanner } from './components/CookieBanner';

function App() {
  // Simple routing based on pathname
  const path = window.location.pathname;
  
  const renderPage = () => {
    switch (path) {
      case '/legal/privacy':
        return <PrivacyPolicy />;
      case '/legal/cookies':
        return <CookiesPolicy />;
      case '/legal/terms':
        return <LegalNoticePage />;
      case '/login-clientes':
        return <ClientLogin />;
      case '/area-clientes':
        return <ClientArea />;
      case '/gastos-deducibles':
        return <GastosDeducibles />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      {renderPage()}
      <CookieBanner language="es" />
    </>
  );
}

export default App;
