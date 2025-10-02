import { Home } from './pages/Home';
import { PrivacyPolicy } from './pages/legal/PrivacyPolicy';
import { CookiesPolicy } from './pages/legal/CookiesPolicy';
import { LegalNotice } from './pages/legal/LegalNotice';
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
        return <LegalNotice />;
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
