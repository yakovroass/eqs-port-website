"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useLanguage, tx } from "@/lib/useLanguage";
import { t } from "@/lib/translations";

function DownloadRow({ className = "" }: { className?: string }) {
  const { lang } = useLanguage();
  const baseBtn = "flex flex-1 min-w-0 items-center justify-center gap-1.5 sm:gap-2 py-3.5 sm:py-4 px-2 sm:px-4 rounded-xl font-semibold whitespace-nowrap text-xs min-[400px]:text-sm sm:text-base leading-snug transition-colors border";

  return (
    <div className={`flex flex-nowrap gap-1.5 sm:gap-3 w-full max-w-xl mx-auto ${className}`}>
      <a href="/pitch-deck.pdf" download className={`${baseBtn} border-accent/30 text-accent hover:bg-accent/10`}>
        <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        <span className="truncate sm:hidden">{tx(t.contact.downloadPdfShort, lang)}</span>
        <span className="truncate hidden sm:inline">{tx(t.contact.downloadPdf, lang)}</span>
      </a>
      <a href="/EQS.PORT.1P.pdf" download className={`${baseBtn} border-amber-500/40 text-amber-300 hover:bg-amber-500/15`}>
        <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        <span className="truncate sm:hidden">{tx(t.contact.downloadOnePagerShort, lang)}</span>
        <span className="truncate hidden sm:inline">{tx(t.contact.downloadOnePager, lang)}</span>
      </a>
    </div>
  );
}

export default function Contact() {
  const { lang } = useLanguage();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => r.json())
      .then((d: { user?: { isAdmin?: boolean } }) => setIsAdmin(!!d?.user?.isAdmin))
      .catch(() => setIsAdmin(false));
  }, []);

  const contactLinks = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
      label: tx(t.contact.contactPhone, lang),
      href: "tel:+972542611226",
      external: false,
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      label: tx(t.contact.contactEmail, lang),
      href: "mailto:yakovroass@gmail.com",
      external: false,
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      label: tx(t.contact.contactLinkedIn, lang),
      href: "https://linkedin.com/in/yakovroass",
      external: true,
    },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32">

      <div className="relative z-10 section-container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="section-label headline-font text-3xl sm:text-4xl md:text-5xl text-amber-400 tracking-wide uppercase">
              {tx(t.contact.label, lang)}
            </span>
          </div>
        </ScrollReveal>

        <div className="max-w-xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col gap-4 w-full">
              <div className="glass-card rounded-2xl p-6 sm:p-8 w-full">
                <h3 className="text-2xl font-semibold text-white mb-5">Yakov Roass</h3>
                <div className="space-y-4">
                  {contactLinks.map((item) => (
                    <a
                      key={item.href + item.label}
                      href={item.href}
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex items-center gap-4 text-gray-300 hover:text-accent transition-colors group"
                    >
                      <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors shrink-0">
                        {item.icon}
                      </div>
                      {item.href.startsWith("tel:") ? (
                        <span dir="ltr" className="text-base font-mono tracking-tight [unicode-bidi:isolate]">
                          {item.label}
                        </span>
                      ) : (
                        <span className="text-base break-all">{item.label}</span>
                      )}
                    </a>
                  ))}
                </div>
                <a
                  href="https://wa.me/972542611226"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold bg-gradient-to-r from-emerald-600/20 to-green-600/20 border border-emerald-500/40 text-emerald-200 hover:from-emerald-600/30 hover:to-green-600/30 hover:text-white transition-all"
                >
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>{tx(t.contact.whatsapp, lang)}</span>
                </a>
              </div>

              {isAdmin ? <DownloadRow className="w-full" /> : null}

              <div className="glass-card rounded-2xl p-5 text-center w-full mt-6">
                <div className="text-base text-gray-500 mb-1">{tx(t.contact.targeting, lang)}</div>
                <div className="text-2xl font-bold text-white">{tx(t.contact.seriesTarget, lang)}</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="relative z-10 mt-24 border-t border-gray-800/50">
        <div className="section-container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600 text-center md:text-start">
              &copy; {new Date().getFullYear()} EQS.PORT. {tx(t.footer.rights, lang)}
            </div>
            <div className="flex items-center gap-6">
              <a href="https://linkedin.com/in/yakovroass" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-accent transition-colors">
                LinkedIn
              </a>
              <a href="mailto:yakovroass@gmail.com" className="text-gray-600 hover:text-accent transition-colors">
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
