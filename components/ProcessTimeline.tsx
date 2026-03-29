"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { useLanguage, tx } from "@/lib/useLanguage";
import { t } from "@/lib/translations";

/** קובץ: public/images/crane-app.png — אחרי החלפת קובץ: שנה שם קובץ או הוסף unoptimized (לא להשתמש ב־?v= על next/image בפרודקשן) */
export default function ProcessTimeline() {
  const { lang } = useLanguage();

  return (
    <section id="process-detail" className="relative py-24 md:py-32 overflow-hidden" aria-label={lang === "en" ? "EQS process details" : "המשך תהליך EQS"}>

      <div className="relative z-10 section-container">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Global search interface */}
          <ScrollReveal delay={0.1}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="rounded-2xl overflow-hidden glass-card shadow-[0_8px_40px_rgba(0,0,0,0.2)]"
            >
              <Image
                src="/images/global-search.png"
                alt="EQS.PORT Global Equipment Search"
                width={1395}
                height={667}
                quality={95}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
                className="w-full h-auto"
              />
              <div className="p-5 sm:p-6">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-1.5">
                  {tx(t.process.globalSearchTitle, lang)}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {tx(t.process.globalSearchDesc, lang)}
                </p>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Global ports network */}
          <ScrollReveal delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="rounded-2xl overflow-hidden glass-card shadow-[0_8px_40px_rgba(0,0,0,0.2)]"
            >
              <Image
                src="/images/global-ports.png"
                alt="Global Ports & Connections Network"
                width={1710}
                height={860}
                quality={95}
                sizes="(max-width: 768px) 100vw, (max-width: 1536px) 90vw, 1200px"
                className="w-full h-auto"
              />
              <div className="p-5 sm:p-6">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-1.5">
                  {tx(t.process.globalPortsTitle, lang)}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {tx(t.process.globalPortsDesc, lang)}
                </p>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* מודיעין טכני + מודיעין שווקים — במובייל אחד מתחת לשני; מ־md ומעלה שתי עמודות ביחס רוחב התמונות */}
          <ScrollReveal delay={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,682fr)_minmax(0,1000fr)] gap-2.5 sm:gap-5 md:gap-8 items-stretch">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="rounded-2xl overflow-hidden glass-card shadow-[0_8px_40px_rgba(0,0,0,0.2)] flex flex-col min-w-0 h-full"
              >
                <Image
                  src="/images/crane-app.png"
                  alt="EQS.PORT Crane Specifications App"
                  width={1749}
                  height={2915}
                  quality={90}
                  sizes="(max-width: 767px) 100vw, (max-width: 1280px) 34vw, 480px"
                  className="w-full h-auto block"
                  unoptimized
                />
                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-1.5">
                    {tx(t.process.globalTechTitle, lang)}
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {tx(t.process.globalTechDesc, lang)}
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                className="rounded-2xl overflow-hidden glass-card shadow-[0_8px_40px_rgba(0,0,0,0.2)] flex flex-col min-w-0 h-full"
              >
                <Image
                  src="/images/africa-minerals.png"
                  alt="Africa Strategic Minerals Map 2026"
                  width={901}
                  height={1024}
                  quality={95}
                  sizes="(max-width: 767px) 100vw, (max-width: 1280px) 52vw, 640px"
                  className="w-full h-auto block"
                />
                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-1.5">
                    {tx(t.process.globalStrategicTitle, lang)}
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {tx(t.process.globalStrategicDesc, lang)}
                  </p>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
