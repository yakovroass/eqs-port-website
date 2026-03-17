"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useLanguage, tx } from "@/lib/useLanguage";
import { t } from "@/lib/translations";

export default function Contact() {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Investment Inquiry from ${formData.name} — ${formData.company}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\n\n${formData.message}`
    );
    window.open(`mailto:yakovroass@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const inputClass = "w-full px-4 py-3 bg-dark-700/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all";

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="animated-grid-bg absolute inset-0" />

      <div className="relative z-10 section-container">
        <ScrollReveal>
          <div className="text-center mb-4">
            <span className="text-accent font-mono text-base sm:text-lg tracking-widest uppercase">
              {tx(t.contact.label, lang)}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
            {tx(t.contact.headline, lang)}{" "}
            <span className="gradient-text">{tx(t.contact.headlineAccent, lang)}</span>
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16 text-lg">
            {tx(t.contact.sub, lang)}
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto items-start">
          {/* Form */}
          <ScrollReveal direction={lang === "he" ? "right" : "left"}>
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">{tx(t.contact.name, lang)}</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} placeholder={tx(t.contact.namePh, lang)} />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">{tx(t.contact.email, lang)}</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} placeholder={tx(t.contact.emailPh, lang)} />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">{tx(t.contact.company, lang)}</label>
                  <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className={inputClass} placeholder={tx(t.contact.companyPh, lang)} />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">{tx(t.contact.message, lang)}</label>
                  <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${inputClass} resize-none`} placeholder={tx(t.contact.messagePh, lang)} />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3.5 rounded-xl font-semibold text-lg transition-all ${
                    sent ? "bg-green-500 text-white" : "bg-accent hover:bg-accent-light text-dark-900"
                  }`}
                >
                  {sent ? tx(t.contact.sent, lang) : tx(t.contact.send, lang)}
                </motion.button>
              </form>
            </div>
          </ScrollReveal>

          {/* Contact info & actions */}
          <ScrollReveal direction={lang === "he" ? "left" : "right"} delay={0.2}>
            <div className="flex flex-col gap-4">
              {/* Contact card */}
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white mb-5">Yakov Roass</h3>
                <div className="space-y-3.5">
                  {[
                    { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>, label: "+972 (0) 54-261-1226", href: "tel:+972542611226" },
                    { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>, label: "yakovroass@gmail.com", href: "mailto:yakovroass@gmail.com" },
                    { icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>, label: "LinkedIn", href: "https://linkedin.com/in/yakovroass" },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-gray-400 hover:text-accent transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">
                        {item.icon}
                      </div>
                      <span className="text-sm">{item.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <a
                  href="https://wa.me/972542611226"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-3.5 rounded-xl bg-green-600/20 border border-green-500/30 text-green-400 hover:bg-green-600/30 transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  {tx(t.contact.whatsapp, lang)}
                </a>
                <a
                  href="/pitch-deck.pdf"
                  download
                  className="flex items-center justify-center gap-2 px-3 py-3.5 rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  {tx(t.contact.downloadPdf, lang)}
                </a>
                <a
                  href="/EQS.PORT.1P.pdf"
                  download
                  className="flex items-center justify-center gap-2 px-3 py-3.5 rounded-xl border border-neon-purple/30 text-neon-purple hover:bg-neon-purple/10 transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  {tx(t.contact.downloadOnePager, lang)}
                </a>
              </div>

              {/* Series A target */}
              <div className="glass-card rounded-2xl p-5 text-center">
                <div className="text-sm text-gray-500 mb-1">{lang === "en" ? "Targeting" : "מטרה"}</div>
                <div className="text-xl font-bold text-white">{tx(t.contact.seriesTarget, lang)}</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-24 border-t border-gray-800/50">
        <div className="section-container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} EQS.PORT. {tx(t.footer.rights, lang)}
          </div>
          <div className="flex items-center gap-6">
            <a href="https://linkedin.com/in/yakovroass" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-accent transition-colors">LinkedIn</a>
            <a href="mailto:yakovroass@gmail.com" className="text-gray-600 hover:text-accent transition-colors">Email</a>
          </div>
        </div>
      </div>
    </section>
  );
}
