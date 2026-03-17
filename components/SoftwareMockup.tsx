"use client";

import { motion } from "framer-motion";

interface MockupProps {
  variant: "search" | "analysis" | "revalue" | "crm" | "messaging" | "logistics" | "permits" | "spareparts" | "map" | "quotes" | "alerts";
  className?: string;
}

function MockupWindow({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-700/50 bg-dark-800/90 shadow-2xl shadow-accent/5">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-dark-700/80 border-b border-gray-700/30">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <span className="text-xs text-gray-500 ml-2 font-mono">{title}</span>
      </div>
      {/* Content */}
      <div className="p-3">{children}</div>
    </div>
  );
}

function FakeTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-700/30">
      <div className="grid gap-px bg-gray-700/20" style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}>
        {headers.map((h) => (
          <div key={h} className="px-3 py-1.5 bg-dark-600/80 text-[10px] font-semibold text-accent/70 uppercase tracking-wider">{h}</div>
        ))}
        {rows.map((row, ri) =>
          row.map((cell, ci) => (
            <div key={`${ri}-${ci}`} className="px-3 py-1.5 bg-dark-800/60 text-[10px] text-gray-400 truncate">{cell}</div>
          ))
        )}
      </div>
    </div>
  );
}

function FakeFilter({ labels }: { labels: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {labels.map((l) => (
        <div key={l} className="px-2.5 py-1 rounded-md bg-dark-600/60 border border-gray-700/30 text-[10px] text-gray-400">{l}</div>
      ))}
      <div className="px-3 py-1 rounded-md bg-accent/20 border border-accent/30 text-[10px] text-accent font-medium">Search</div>
    </div>
  );
}

const mockups: Record<string, () => React.ReactNode> = {
  search: () => (
    <MockupWindow title="EQS.PORT — Global Market Search">
      <FakeFilter labels={["All Terrain Crane", "Liebherr", "LTM 1300", "2018-2024"]} />
      <FakeTable
        headers={["Equipment", "Mfr", "Model", "Year", "Hours", "Price", "Location"]}
        rows={[
          ["All Terrain Crane", "Liebherr", "LTM 1300-6.2", "2021", "3,200 h", "€ 1,850,000", "Germany"],
          ["All Terrain Crane", "Liebherr", "LTM 1300-6.3", "2023", "1,100 h", "€ 2,400,000", "Netherlands"],
          ["All Terrain Crane", "Grove", "GMK6300L", "2020", "4,500 h", "$ 1,650,000", "USA"],
          ["All Terrain Crane", "Tadano", "ATF 220G-5", "2019", "5,800 h", "€ 980,000", "Belgium"],
        ]}
      />
    </MockupWindow>
  ),
  analysis: () => (
    <MockupWindow title="EQS.PORT — AI Analysis">
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] text-green-400">AI Engine Active — Processing 2,847 sources</span>
        </div>
        <div className="h-2 bg-dark-600/60 rounded-full overflow-hidden">
          <motion.div animate={{ width: ["0%", "100%"] }} transition={{ duration: 3, repeat: Infinity }} className="h-full bg-gradient-to-r from-accent to-neon-cyan rounded-full" />
        </div>
      </div>
      <FakeTable
        headers={["Source", "Matches", "Avg Price", "Trend", "Score"]}
        rows={[
          ["Mascus.com", "142", "€1,240,000", "↑ 3.2%", "94"],
          ["Craneslist", "87", "€1,180,000", "↓ 1.1%", "91"],
          ["Machineryline", "203", "€1,310,000", "↑ 5.4%", "88"],
          ["Direct Sellers", "56", "€1,050,000", "→ 0.0%", "85"],
        ]}
      />
    </MockupWindow>
  ),
  revalue: () => (
    <MockupWindow title="EQS.PORT — Machine Valuation">
      <div className="grid grid-cols-2 gap-3 mb-3">
        {[
          ["New Price", "€ 3,200,000"],
          ["Year Depr. (5%)", "-€ 480,000"],
          ["Hours Adj.", "-€ 128,000"],
          ["Deductions", "-€ 95,000"],
        ].map(([label, val]) => (
          <div key={label} className="px-3 py-2 rounded-lg bg-dark-600/40 border border-gray-700/30">
            <div className="text-[9px] text-gray-500 uppercase">{label}</div>
            <div className={`text-xs font-mono font-bold ${val.startsWith("-") ? "text-red-400" : "text-accent"}`}>{val}</div>
          </div>
        ))}
      </div>
      <div className="px-4 py-3 rounded-lg bg-accent/10 border border-accent/30 text-center">
        <div className="text-[9px] text-accent/70 uppercase mb-1">Fair Market Value</div>
        <div className="text-xl font-bold text-accent">€ 2,497,000</div>
      </div>
    </MockupWindow>
  ),
  crm: () => (
    <MockupWindow title="EQS.PORT — Contact Intelligence">
      <FakeTable
        headers={["Company", "Contact", "Country", "Email", "Phone", "Status"]}
        rows={[
          ["Kran & Bühne", "Hans Mueller", "Germany", "h.mueller@...", "+49 170...", "✓ Verified"],
          ["Gulf Cranes", "Ahmed Al-Rashid", "UAE", "ahmed@...", "+971 50...", "✓ Verified"],
          ["CraneTech US", "John Smith", "USA", "jsmith@...", "+1 312...", "Pending"],
          ["Asia Heavy", "Wei Zhang", "China", "wei@...", "+86 138...", "✓ Verified"],
        ]}
      />
    </MockupWindow>
  ),
  messaging: () => (
    <MockupWindow title="EQS.PORT — Messaging & Follow-up">
      <div className="text-[9px] text-gray-500 uppercase mb-2">Automated workflows · Suppliers & customers</div>
      <div className="space-y-2">
        {[
          { to: "Hans Mueller", msg: "Dear Hans, we are interested in the LTM 1300-6.2...", status: "Sent ✓✓" },
          { to: "Ahmed Al-Rashid", msg: "Dear Ahmed, regarding the GMK6300L listed on...", status: "Sent ✓✓" },
          { to: "John Smith", msg: "Dear John, could you provide inspection reports...", status: "Sending..." },
        ].map((m, i) => (
          <div key={i} className="px-3 py-2 rounded-lg bg-dark-600/40 border border-gray-700/30">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-accent font-medium">{m.to}</span>
              <span className="text-[9px] text-green-400">{m.status}</span>
            </div>
            <p className="text-[10px] text-gray-500 truncate">{m.msg}</p>
          </div>
        ))}
      </div>
    </MockupWindow>
  ),
  logistics: () => (
    <MockupWindow title="EQS.PORT — Routes & Service Providers">
      <div className="text-[9px] text-gray-500 uppercase mb-2">Defined routes · Mapping & management</div>
      <div className="relative h-32 rounded-lg bg-dark-600/40 border border-gray-700/30 overflow-hidden mb-3">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 120" fill="none">
          <path d="M20,80 Q100,20 200,60 T380,40" stroke="rgba(0,168,255,0.3)" strokeWidth="1.5" strokeDasharray="4,4" />
          <circle cx="20" cy="80" r="4" fill="#00a8ff"><animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" /></circle>
          <circle cx="200" cy="60" r="3" fill="#00e5ff"><animate attributeName="opacity" values="1;0.4;1" dur="2s" begin="0.5s" repeatCount="indefinite" /></circle>
          <circle cx="380" cy="40" r="4" fill="#00a8ff"><animate attributeName="opacity" values="1;0.4;1" dur="2s" begin="1s" repeatCount="indefinite" /></circle>
          <text x="10" y="100" className="text-[8px]" fill="#666">Hamburg</text>
          <text x="175" y="80" className="text-[8px]" fill="#666">Suez</text>
          <text x="355" y="30" className="text-[8px]" fill="#666">Haifa</text>
        </svg>
      </div>
      <FakeTable
        headers={["Route", "Vessel", "ETA", "Status"]}
        rows={[
          ["Hamburg → Haifa", "MSC Gülsün", "14 days", "In Transit"],
          ["Antwerp → Ashdod", "Maersk Eindhoven", "12 days", "Loading"],
        ]}
      />
    </MockupWindow>
  ),
  permits: () => (
    <MockupWindow title="EQS.PORT — Permits & Compliance">
      <div className="space-y-2">
        <div className="text-[9px] text-gray-500 uppercase mb-1">Technical details & government forms</div>
        {["Machine Type: Mobile Crane", "Manufacturer: Liebherr", "Model: LTM 1300-6.2", "VIN: WLH1300GXM1234", "Import Year: 2024"].map((field) => (
          <div key={field} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-600/40 border border-gray-700/30">
            <div className="w-2 h-2 rounded-full bg-green-400/60" />
            <span className="text-[10px] text-gray-400">{field}</span>
          </div>
        ))}
        <div className="px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
          <span className="text-[10px] text-green-400 font-medium">✓ Regulation-compliant import permit ready</span>
        </div>
      </div>
    </MockupWindow>
  ),
  spareparts: () => (
    <MockupWindow title="EQS.PORT — Catalogs & Quotes">
      <div className="text-[9px] text-gray-500 uppercase mb-2">Supplier database · Pricing · Auto quote</div>
      <FakeTable
        headers={["Part", "Supplier", "Price", "Lead Time", "Qty"]}
        rows={[
          ["Hydraulic Pump", "Bosch Rexroth", "€ 8,500", "3 weeks", "1"],
          ["Boom Cylinder", "Liebherr OEM", "€ 12,400", "4 weeks", "2"],
          ["Slewing Ring", "ThyssenKrupp", "€ 28,000", "6 weeks", "1"],
          ["Wire Rope 32mm", "Casar GmbH", "€ 4,200", "1 week", "200m"],
        ]}
      />
    </MockupWindow>
  ),
  map: () => (
    <MockupWindow title="EQS.PORT — Inventory & Shipping Map">
      <div className="relative h-40 rounded-lg bg-dark-600/40 border border-gray-700/30 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 150" fill="none">
          <ellipse cx="120" cy="60" rx="80" ry="40" stroke="rgba(0,168,255,0.1)" strokeWidth="0.5" fill="none" />
          <ellipse cx="300" cy="70" rx="70" ry="35" stroke="rgba(0,168,255,0.1)" strokeWidth="0.5" fill="none" />
          {[
            { cx: 100, cy: 50 }, { cx: 140, cy: 45 }, { cx: 130, cy: 65 },
            { cx: 160, cy: 55 }, { cx: 280, cy: 60 }, { cx: 310, cy: 70 },
            { cx: 320, cy: 50 }, { cx: 80, cy: 70 }, { cx: 250, cy: 80 },
            { cx: 200, cy: 65 }, { cx: 350, cy: 55 },
          ].map((p, i) => (
            <g key={i}>
              <circle cx={p.cx} cy={p.cy} r="3" fill="#00a8ff" opacity="0.7">
                <animate attributeName="r" values="3;5;3" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0.3;0.7" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={p.cx} cy={p.cy} r="1.5" fill="#00e5ff" />
            </g>
          ))}
        </svg>
        <div className="absolute bottom-2 left-3 text-[9px] text-gray-500">Inventory & full details · Global shipping routes</div>
      </div>
    </MockupWindow>
  ),
  alerts: () => (
    <MockupWindow title="EQS.PORT — Alert Mechanisms">
      <div className="text-[9px] text-gray-500 uppercase mb-2">By search · Request · Location · Time</div>
      <div className="space-y-2">
        {[
          { title: "3 new listings match your search", sub: "LTM 1300 in Germany · 2h ago", active: true },
          { title: "Price drop on saved equipment", sub: "GMK6300L, Netherlands · 5h ago", active: true },
          { title: "Request: inspection report ready", sub: "ATF 220G-5, Belgium · Yesterday", active: false },
        ].map((a, i) => (
          <div key={i} className={`px-3 py-2 rounded-lg border ${a.active ? "bg-accent/10 border-accent/30" : "bg-dark-600/40 border-gray-700/30"}`}>
            <div className="text-[10px] font-medium text-white">{a.title}</div>
            <div className="text-[9px] text-gray-500 mt-0.5">{a.sub}</div>
          </div>
        ))}
      </div>
    </MockupWindow>
  ),
  quotes: () => (
    <MockupWindow title="EQS.PORT — Quote Builder">
      <div className="border border-gray-700/30 rounded-lg p-3 bg-dark-700/30">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="text-xs font-bold text-accent">QUOTE #EQS-2024-0847</div>
            <div className="text-[9px] text-gray-500">Valid until: March 30, 2024</div>
          </div>
          <div className="text-right">
            <div className="text-[9px] text-gray-500">Client: BuildCorp Ltd</div>
            <div className="text-[9px] text-gray-500">Contact: M. Johnson</div>
          </div>
        </div>
        <FakeTable
          headers={["Item", "Qty", "Unit Price", "Total"]}
          rows={[
            ["LTM 1300-6.2 (2021)", "1", "€ 1,850,000", "€ 1,850,000"],
            ["Transport & Insurance", "1", "€ 45,000", "€ 45,000"],
            ["Import & Customs", "1", "€ 32,000", "€ 32,000"],
          ]}
        />
        <div className="mt-2 text-right">
          <span className="text-xs text-gray-500">Total: </span>
          <span className="text-sm font-bold text-accent">€ 1,927,000</span>
        </div>
      </div>
    </MockupWindow>
  ),
};

export default function SoftwareMockup({ variant, className = "" }: MockupProps) {
  const render = mockups[variant];
  if (!render) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {render()}
    </motion.div>
  );
}
