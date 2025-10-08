import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ServicePlans } from '../components/ServicePlans';
import { ProcessSteps } from '../components/ProcessSteps';
import { FAQ } from '../components/FAQ';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { StructuredData } from '../components/StructuredData';
import { SocialLinks } from '../components/SocialLinks';

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData />
      <Header />
      <main className="pt-[72px]">
        <Hero />
        <ServicePlans />
        <ProcessSteps />
        <Contact />
        <SocialLinks />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
