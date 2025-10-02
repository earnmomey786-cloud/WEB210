import { Mail, Phone, MessageCircle } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';

export function Contact() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    num_properties: 1,
    num_owners: 1,
    has_garage_storage: false,
    additional_notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (!supabase) {
        throw new Error('Database not configured');
      }

      const { error } = await supabase
        .from('quote_requests')
        .insert([formData]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        num_properties: 1,
        num_owners: 1,
        has_garage_storage: false,
        additional_notes: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontakt" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="bg-gray-50 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-black mb-8 text-[#1a1a1a] leading-tight">
              Skontaktuj się z nami
            </h2>

            <div className="mb-8">
              <p className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-3">
                Email
              </p>
              <a
                href="mailto:kontakt@podatek-irnr.pl"
                className="text-xl text-[#1a1a1a] hover:text-[#8e7951] transition-colors font-medium"
              >
                kontakt@podatek-irnr.pl
              </a>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-3xl p-12">
          <h3 className="text-2xl font-black mb-2 text-white uppercase tracking-wide">
            Formularz kontaktowy
          </h3>
          <p className="text-gray-400 mb-8 text-sm">
            Wypełnij poniższe dane – odpiszemy z ceną i fakturą
          </p>

          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 text-green-400 text-center">
              Dziękujemy! Wkrótce otrzymasz wycenę na e-mail.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-400 text-center">
              Wystąpił błąd. Spróbuj ponownie lub skontaktuj się bezpośrednio.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                  Imię i nazwisko *
                </label>
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#8e7951] transition-colors"
                  placeholder="Jan Kowalski"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#8e7951] transition-colors"
                  placeholder="jan@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                Telefon
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#8e7951] transition-colors"
                placeholder="+48 123 456 789"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                  Liczba nieruchomości *
                </label>
                <select
                  value={formData.num_properties}
                  onChange={(e) => setFormData({ ...formData, num_properties: parseInt(e.target.value) })}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#8e7951] transition-colors"
                >
                  <option value="1">1 nieruchomość</option>
                  <option value="2">2 nieruchomości</option>
                  <option value="3">3 nieruchomości</option>
                  <option value="4">4+ nieruchomości</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                  Liczba właścicieli (titulares) *
                </label>
                <select
                  value={formData.num_owners}
                  onChange={(e) => setFormData({ ...formData, num_owners: parseInt(e.target.value) })}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#8e7951] transition-colors"
                >
                  <option value="1">1 titular</option>
                  <option value="2">2 titulares</option>
                  <option value="3">3 titulares</option>
                  <option value="4">4+ titulares</option>
                </select>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.has_garage_storage}
                  onChange={(e) => setFormData({ ...formData, has_garage_storage: e.target.checked })}
                  className="w-5 h-5 bg-white/5 border border-white/10 text-[#8e7951] focus:ring-[#8e7951]"
                />
                <span className="text-white">Posiadam garaż lub komórkę lokatorską</span>
              </label>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                Dodatkowe informacje
              </label>
              <textarea
                rows={4}
                value={formData.additional_notes}
                onChange={(e) => setFormData({ ...formData, additional_notes: e.target.value })}
                placeholder="Np. szczegóły dotyczące nieruchomości, pytania..."
                className="w-full px-6 py-4 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#8e7951] transition-colors resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-[#8e7951] text-white text-sm uppercase tracking-widest font-semibold hover:bg-[#9e8961] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Wysyłanie...' : 'Wyślij zapytanie'}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              * Pola wymagane. Odpowiemy w ciągu 24 godzin.
            </p>
          </form>
          </div>
        </div>
      </div>
    </section>
  );
}
