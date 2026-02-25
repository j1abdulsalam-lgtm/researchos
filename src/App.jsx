import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0a0e1a",
  surface: "#111827",
  surface2: "#1a2235",
  surface3: "#1f2d45",
  border: "#243050",
  accent: "#00d4aa",
  accentDim: "#00d4aa22",
  accentHover: "#00ffcc",
  amber: "#f59e0b",
  amberDim: "#f59e0b20",
  red: "#ef4444",
  redDim: "#ef444420",
  blue: "#3b82f6",
  blueDim: "#3b82f620",
  purple: "#a78bfa",
  purpleDim: "#a78bfa20",
  text: "#e2e8f0",
  textMuted: "#64748b",
  textDim: "#94a3b8",
};

const fonts = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500&display=swap');
`;

const globalStyles = `
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { height: 100%; }
body { background: ${COLORS.bg}; color: ${COLORS.text}; font-family: 'Inter', sans-serif; }
#root { height: 100%; }
::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: ${COLORS.surface}; }
::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 2px; }
::-webkit-scrollbar-thumb:hover { background: ${COLORS.accent}; }
input, textarea, select { background: ${COLORS.surface2}; border: 1px solid ${COLORS.border}; color: ${COLORS.text}; font-family: 'Inter', sans-serif; border-radius: 6px; padding: 8px 12px; font-size: 13px; outline: none; width: 100%; }
input:focus, textarea:focus, select:focus { border-color: ${COLORS.accent}; }
button { cursor: pointer; font-family: 'Inter', sans-serif; }
.fade-in { animation: fadeIn 0.3s ease forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
`;

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 18, color = "currentColor" }) => {
  const icons = {
    home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    book: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    flask: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M9 3h6m-6 0v6l-4.5 9A2 2 0 0 0 6.35 21h11.3a2 2 0 0 0 1.85-2.95L15 9V3"/><line x1="6.5" y1="16" x2="17.5" y2="16"/></svg>,
    chart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
    network: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><line x1="12" y1="7" x2="5" y2="17"/><line x1="12" y1="7" x2="19" y2="17"/><line x1="5" y1="19" x2="19" y2="19"/></svg>,
    users: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    send: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    calendar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    edit: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    trash: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>,
    tag: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
    bolt: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    clock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
    alert: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    brain: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.88A2.5 2.5 0 0 1 9.5 2"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.88A2.5 2.5 0 0 0 14.5 2"/></svg>,
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    calview: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="14" x2="8" y2="14" strokeWidth="3" strokeLinecap="round"/><line x1="12" y1="14" x2="12" y2="14" strokeWidth="3" strokeLinecap="round"/><line x1="16" y1="14" x2="16" y2="14" strokeWidth="3" strokeLinecap="round"/><line x1="8" y1="18" x2="8" y2="18" strokeWidth="3" strokeLinecap="round"/><line x1="12" y1="18" x2="12" y2="18" strokeWidth="3" strokeLinecap="round"/></svg>,
    chevLeft: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>,
    chevRight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>,
    task: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  };
  return icons[name] || null;
};

// ─── Default Data ─────────────────────────────────────────────────────────────
const defaultData = {
  manuscripts: [
    { id: 1, title: "Waste-Derived Carbon Supercapacitors: Defect-Controlled Architecture", journal: "Electrochimica Acta", status: "accepted", submitted: "2025-10-12", updated: "2025-11-20", tags: ["supercapacitor", "carbon", "waste"], notes: "Accepted. Awaiting proofs.", coauthors: ["Prof. Weidenkaff"] },
    { id: 2, title: "Topology-Controlled Sulfur Cathodes for Li-S Batteries", journal: "Battery & Supercaps", status: "under-review", submitted: "2025-11-05", updated: "2025-12-01", tags: ["Li-S", "carbon", "cathode"], notes: "Under review. No decision yet.", coauthors: ["Prof. Weidenkaff", "Senior Colleague"] },
    { id: 3, title: "Optimal Sulfur Loading in Carbon Architectures for Li-S Performance", journal: "Journal of Power Sources", status: "internal-review", submitted: null, updated: "2026-01-10", tags: ["Li-S", "sulfur loading"], notes: "Senior colleague internal review in progress.", coauthors: ["Prof. Weidenkaff", "Senior Colleague"] },
  ],
  grants: [
    { id: 1, title: "DFG Individual Research Grant", funder: "Deutsche Forschungsgemeinschaft", amount: "~€250,000", status: "submitted", deadline: "2025-12-05", notes: "Topology- and defect-controlled carbon architectures for predictable electrochemical performance. Critical for career continuation.", tags: ["DFG", "carbon", "electrochemistry"] },
    { id: 2, title: "CODA-Batt: Coal Waste-Derived Anodes for Sodium-Ion Batteries", funder: "Stiftung Energieforschung BW (SEF)", amount: "€384,705", status: "financial-review", deadline: "2026-03-01", notes: "Progressed to financial review stage. 36-month project.", tags: ["SEF", "sodium-ion", "coal waste"] },
  ],
  collaborations: [
    { id: 1, partner: "Chalmers University", contact: "TBD", type: "Research", status: "exploring", topic: "Structural Battery Research", notes: "Directive from institute head. Initial contact stage.", lastContact: "2026-01-15" },
    { id: 2, partner: "Mandulis Energy", contact: "Peter Benhur O. Nyeko", type: "Industry", status: "active", topic: "ManduCarb — Biochar to Energy Storage Materials", notes: "Positive engagement. Biochar valorization for carbon electrodes.", lastContact: "2026-01-20" },
    { id: 3, partner: "VoltCrest Technologies", contact: "Self (Founder)", type: "Entrepreneurship", status: "active", topic: "Solar energy installations — Nigeria", notes: "300+ installations across universities, SMEs, rural communities.", lastContact: "2026-02-01" },
    { id: 4, partner: "CENARI", contact: "Self (Director)", type: "Center", status: "active", topic: "Center for Energy and Resource Innovation", notes: "African energy network development.", lastContact: "2026-02-05" },
  ],
  knowledge: [
    { id: 1, title: "Pore Network Connectivity > Micropore Volume in H₂ Storage", project: "Hydrogen Storage", content: "Counterintuitive finding: pore network connectivity governs hydrogen storage performance more than micropore volume alone. Modified Dubinin-Astakhov modeling supports this.", tags: ["hydrogen", "pore", "insight"], created: "2025-11-10" },
    { id: 2, title: "Moderate Sulfur Loading = Optimal Li-S Performance", project: "Li-S Batteries", content: "Moderate sulfur loading consistently outperforms high loading despite lower active material. Kinetics and utilization efficiency dominate over raw capacity.", tags: ["Li-S", "sulfur", "insight"], created: "2025-12-01" },
    { id: 3, title: "WaterPower Africa — Water Hyacinth to Biogas", project: "Bioeconomy", content: "Invasive water hyacinth conversion to biogas energy. Strategic partnership potential. Positive engagement from stakeholders.", tags: ["bioeconomy", "Africa", "biogas"], created: "2026-01-05" },
    { id: 4, title: "COMSOL Li-S Transport Model Parameters", project: "Computational", content: "Multiphysics model for Li-S battery transport. Key parameters: polysulfide diffusion coefficients, electrolyte conductivity gradients, separator porosity effects.", tags: ["COMSOL", "Li-S", "modeling"], created: "2025-10-20" },
  ],
  meetings: [
    { id: 1, title: "Chalmers Structural Battery Collaboration Scoping", partner: "Chalmers University", date: "2026-02-28", time: "14:00", type: "video", notes: "Initial scoping call.", actionItems: ["Send research summary", "Prepare 3 collaboration angles"] },
    { id: 2, title: "ManduCarb Technical Update", partner: "Mandulis Energy", date: "2026-03-10", time: "10:00", type: "video", notes: "Progress update on biochar characterization results.", actionItems: ["Share BET data", "Draft MOU outline"] },
  ],
};

const manuscriptStatuses = [
  { key: "writing", label: "Writing", color: COLORS.textMuted },
  { key: "internal-review", label: "Internal Review", color: COLORS.amber },
  { key: "submitted", label: "Submitted", color: COLORS.blue },
  { key: "under-review", label: "Under Review", color: COLORS.purple },
  { key: "revision", label: "Revision", color: COLORS.amber },
  { key: "accepted", label: "Accepted", color: COLORS.accent },
  { key: "published", label: "Published", color: COLORS.accent },
];

const grantStatuses = [
  { key: "drafting", label: "Drafting", color: COLORS.textMuted },
  { key: "submitted", label: "Submitted", color: COLORS.blue },
  { key: "financial-review", label: "Financial Review", color: COLORS.amber },
  { key: "approved", label: "Approved", color: COLORS.accent },
  { key: "rejected", label: "Rejected", color: COLORS.red },
];

const collabStatuses = [
  { key: "exploring", label: "Exploring", color: COLORS.textMuted },
  { key: "active", label: "Active", color: COLORS.accent },
  { key: "paused", label: "Paused", color: COLORS.amber },
];

// ─── Shared Components ────────────────────────────────────────────────────────
const Badge = ({ label, color, small }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: small ? "2px 8px" : "3px 10px", borderRadius: 99, background: color + "25", border: `1px solid ${color}40`, color, fontSize: small ? 10 : 11, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, whiteSpace: "nowrap" }}>
    {label}
  </span>
);

const Tag = ({ label }) => (
  <span style={{ padding: "2px 7px", borderRadius: 4, background: COLORS.surface3, color: COLORS.textDim, fontSize: 10, fontFamily: "'IBM Plex Mono', monospace" }}>#{label}</span>
);

const Card = ({ children, style = {}, onClick }) => (
  <div onClick={onClick} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16, transition: "all 0.2s", cursor: onClick ? "pointer" : "default", ...style }}
    onMouseEnter={onClick ? e => { e.currentTarget.style.borderColor = COLORS.accent + "60"; e.currentTarget.style.background = COLORS.surface2; } : null}
    onMouseLeave={onClick ? e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.background = COLORS.surface; } : null}>
    {children}
  </div>
);

const Btn = ({ children, onClick, variant = "default", small, style = {} }) => {
  const styles = {
    default: { background: COLORS.surface2, border: `1px solid ${COLORS.border}`, color: COLORS.textDim },
    primary: { background: COLORS.accent + "20", border: `1px solid ${COLORS.accent}60`, color: COLORS.accent },
    danger: { background: COLORS.red + "15", border: `1px solid ${COLORS.red}40`, color: COLORS.red },
    amber: { background: COLORS.amber + "15", border: `1px solid ${COLORS.amber}40`, color: COLORS.amber },
  };
  return (
    <button onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: small ? "5px 10px" : "8px 14px", borderRadius: 7, fontSize: small ? 11 : 13, fontWeight: 500, transition: "all 0.15s", ...styles[variant], ...style }}>
      {children}
    </button>
  );
};

const Modal = ({ title, onClose, children }) => (
  <div style={{ position: "fixed", inset: 0, background: "#00000090", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}>
    <div className="fade-in" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 14, width: "100%", maxWidth: 580, maxHeight: "85vh", overflow: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", borderBottom: `1px solid ${COLORS.border}` }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16 }}>{title}</span>
        <button onClick={onClose} style={{ background: "none", border: "none", color: COLORS.textMuted, padding: 4 }}><Icon name="close" size={18} /></button>
      </div>
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  </div>
);

const FormRow = ({ label, children }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: "block", fontSize: 11, color: COLORS.textMuted, marginBottom: 5, fontFamily: "'IBM Plex Mono', monospace", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
    {children}
  </div>
);

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ data }) {
  const now = new Date();
  const upcomingDeadlines = [...data.grants, ...data.manuscripts.filter(m => m.submitted)]
    .filter(item => item.deadline)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 4);

  const stats = [
    { label: "Manuscripts", value: data.manuscripts.length, sub: `${data.manuscripts.filter(m => m.status === "accepted").length} accepted`, color: COLORS.accent },
    { label: "Active Grants", value: data.grants.length, sub: `${data.grants.filter(g => g.status === "financial-review").length} in review`, color: COLORS.amber },
    { label: "Collaborations", value: data.collaborations.length, sub: `${data.collaborations.filter(c => c.status === "active").length} active`, color: COLORS.blue },
    { label: "Knowledge Notes", value: data.knowledge.length, sub: "Across all projects", color: COLORS.purple },
  ];

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 26, marginBottom: 4 }}>
          Good day, <span style={{ color: COLORS.accent }}>Jibril</span>
        </h1>
        <p style={{ color: COLORS.textMuted, fontSize: 13 }}>
          {now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 24 }}>
        {stats.map(s => (
          <Card key={s.label}>
            <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "'IBM Plex Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 32, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: COLORS.textDim }}>{s.sub}</div>
          </Card>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
        <Card>
          <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "'IBM Plex Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="alert" size={13} color={COLORS.amber} /> Upcoming Deadlines
          </div>
          {upcomingDeadlines.map(item => {
            const daysLeft = Math.ceil((new Date(item.deadline) - now) / 86400000);
            return (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{item.title.length > 40 ? item.title.slice(0, 40) + "…" : item.title}</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted }}>{item.funder || item.journal}</div>
                </div>
                <Badge label={daysLeft < 0 ? "Passed" : `${daysLeft}d`} color={daysLeft < 0 ? COLORS.textMuted : daysLeft < 14 ? COLORS.red : COLORS.amber} small />
              </div>
            );
          })}
        </Card>
        <Card>
          <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "'IBM Plex Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="book" size={13} color={COLORS.accent} /> Manuscript Pipeline
          </div>
          {data.manuscripts.map(m => {
            const status = manuscriptStatuses.find(s => s.key === m.status);
            return (
              <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                <div style={{ flex: 1, marginRight: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{m.title.length > 42 ? m.title.slice(0, 42) + "…" : m.title}</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted }}>{m.journal}</div>
                </div>
                <Badge label={status?.label} color={status?.color || COLORS.textMuted} small />
              </div>
            );
          })}
        </Card>
        <Card>
          <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "'IBM Plex Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="users" size={13} color={COLORS.blue} /> Upcoming Meetings
          </div>
          {data.meetings.length === 0 ? <p style={{ color: COLORS.textMuted, fontSize: 13 }}>No meetings scheduled</p>
            : data.meetings.map(m => (
              <div key={m.id} style={{ padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{m.title}</div>
                <div style={{ display: "flex", gap: 10, fontSize: 11, color: COLORS.textMuted }}>
                  <span>{m.partner}</span><span style={{ color: COLORS.border }}>·</span><span>{m.date} {m.time}</span>
                </div>
              </div>
            ))}
        </Card>
        <Card>
          <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "'IBM Plex Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="brain" size={13} color={COLORS.purple} /> Recent Insights
          </div>
          {data.knowledge.slice(0, 3).map(k => (
            <div key={k.id} style={{ padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{k.title}</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{k.tags.map(t => <Tag key={t} label={t} />)}</div>
            </div>
          ))}
        </Card>
        <Card>
          <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "'IBM Plex Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="calview" size={13} color={COLORS.accent} /> Today & Upcoming
          </div>
          {(() => {
            const todayStr = now.toISOString().slice(0,10);
            const typeColors = { meeting: COLORS.blue, deadline: COLORS.red, task: COLORS.accent, reminder: COLORS.amber, other: COLORS.purple };
            const upcoming = (data.calendarEvents || [])
              .filter(e => e.date >= todayStr && !e.completed)
              .sort((a,b) => a.date.localeCompare(b.date) || (a.time||"").localeCompare(b.time||""))
              .slice(0, 5);
            if (upcoming.length === 0) return <p style={{ color: COLORS.textMuted, fontSize: 13 }}>No upcoming events. Add some in Calendar.</p>;
            return upcoming.map(ev => (
              <div key={ev.id} style={{ padding: "9px 0", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{ev.title}</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "'IBM Plex Mono', monospace" }}>
                    {ev.date === todayStr ? "Today" : ev.date}{ev.time ? ` · ${ev.time}` : ""}
                  </div>
                </div>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: typeColors[ev.type] || COLORS.purple, flexShrink: 0 }} />
              </div>
            ));
          })()}
        </Card>
      </div>
    </div>
  );
}

// ─── Manuscripts ──────────────────────────────────────────────────────────────
function Manuscripts({ data, setData }) {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});

  const openNew = () => { setForm({ title: "", journal: "", status: "writing", submitted: "", tags: "", notes: "", coauthors: "" }); setModal("new"); };
  const openEdit = (m) => { setForm({ ...m, tags: m.tags.join(", "), coauthors: m.coauthors.join(", ") }); setModal("edit"); };

  const save = () => {
    const entry = { ...form, id: form.id || Date.now(), tags: form.tags.split(",").map(t => t.trim()).filter(Boolean), coauthors: form.coauthors.split(",").map(t => t.trim()).filter(Boolean) };
    setData(d => ({ ...d, manuscripts: modal === "new" ? [...d.manuscripts, entry] : d.manuscripts.map(m => m.id === entry.id ? entry : m) }));
    setModal(null);
  };
  const del = (id) => setData(d => ({ ...d, manuscripts: d.manuscripts.filter(m => m.id !== id) }));

  return (
    <div className="fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22 }}>Manuscript Pipeline</h2>
          <p style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 2 }}>{data.manuscripts.length} papers tracked</p>
        </div>
        <Btn variant="primary" onClick={openNew}><Icon name="plus" size={15} /> New Manuscript</Btn>
      </div>
      {manuscriptStatuses.map(stage => {
        const items = data.manuscripts.filter(m => m.status === stage.key);
        if (items.length === 0) return null;
        return (
          <div key={stage.key} style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: stage.color }} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: stage.color }}>{stage.label}</span>
              <span style={{ fontSize: 11, color: COLORS.textMuted }}>({items.length})</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
              {items.map(m => (
                <Card key={m.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <Badge label={stage.label} color={stage.color} small />
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => openEdit(m)} style={{ background: "none", border: "none", color: COLORS.textMuted, padding: 2 }}><Icon name="edit" size={13} /></button>
                      <button onClick={() => del(m.id)} style={{ background: "none", border: "none", color: COLORS.red + "80", padding: 2 }}><Icon name="trash" size={13} /></button>
                    </div>
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 5, lineHeight: 1.4 }}>{m.title}</h3>
                  <div style={{ fontSize: 12, color: COLORS.accent, marginBottom: 8, fontFamily: "'IBM Plex Mono', monospace" }}>{m.journal}</div>
                  {m.notes && <div style={{ fontSize: 12, color: COLORS.textDim, marginBottom: 10, lineHeight: 1.5 }}>{m.notes}</div>}
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>{m.tags.map(t => <Tag key={t} label={t} />)}</div>
                  {m.submitted && <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 8, fontFamily: "'IBM Plex Mono', monospace" }}>Submitted: {m.submitted}</div>}
                </Card>
              ))}
            </div>
          </div>
        );
      })}
      {(modal === "new" || modal === "edit") && (
        <Modal title={modal === "new" ? "New Manuscript" : "Edit Manuscript"} onClose={() => setModal(null)}>
          <FormRow label="Title"><textarea value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} rows={2} style={{ resize: "vertical" }} /></FormRow>
          <FormRow label="Journal"><input value={form.journal} onChange={e => setForm(f => ({ ...f, journal: e.target.value }))} /></FormRow>
          <FormRow label="Status"><select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>{manuscriptStatuses.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}</select></FormRow>
          <FormRow label="Submitted Date"><input type="date" value={form.submitted || ""} onChange={e => setForm(f => ({ ...f, submitted: e.target.value }))} /></FormRow>
          <FormRow label="Co-Authors (comma-separated)"><input value={form.coauthors} onChange={e => setForm(f => ({ ...f, coauthors: e.target.value }))} /></FormRow>
          <FormRow label="Tags (comma-separated)"><input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} /></FormRow>
          <FormRow label="Notes"><textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3} style={{ resize: "vertical" }} /></FormRow>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn onClick={() => setModal(null)}>Cancel</Btn>
            <Btn variant="primary" onClick={save}><Icon name="check" size={14} /> Save</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Electrochemical AI ───────────────────────────────────────────────────────
function ElectrochemAI() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello Jibril! I'm your Electrochemical Analysis Assistant. I can help you interpret CV curves, EIS spectra, GCD profiles, BET data, Raman spectra, and any electrochemical results from your Li-S battery, supercapacitor, sodium-ion battery, or hydrogen storage work. What would you like to analyze?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("researchos_apikey") || "");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const saveKey = (key) => { localStorage.setItem("researchos_apikey", key); setApiKey(key); setShowKeyInput(false); };

  const send = async () => {
    if (!input.trim() || loading) return;
    if (!apiKey) { setShowKeyInput(true); return; }
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);
    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "You are an expert electrochemical data analysis assistant for Dr. Jibril, an Alexander von Humboldt Postdoctoral Fellow at TU Darmstadt. His research focuses on waste-derived carbon architectures for Li-S batteries, sodium-ion batteries, supercapacitors, and hydrogen storage. He uses operando Raman spectroscopy, COMSOL multiphysics modeling, and machine learning integration. Provide precise, expert analysis. Be concise but thorough.",
          messages: [...history, { role: "user", content: userMsg }],
        }),
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || "I couldn't process that request.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection error. Please check your API key and try again." }]);
    }
    setLoading(false);
  };

  const quickPrompts = [
    "What does a depressed semicircle in EIS indicate for my Li-S cathode?",
    "Interpret BET surface area of 1850 m²/g with micropore volume 0.72 cm³/g",
    "How should I analyze operando Raman shifts during sulfur reduction?",
    "What specific capacitance is expected for my activated carbon supercapacitor?",
  ];

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 120px)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22 }}>Electrochemical Analysis AI</h2>
          <p style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 2 }}>AI-powered interpretation of your experimental data</p>
        </div>
        <Btn small onClick={() => setShowKeyInput(true)} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11 }}>
          {apiKey ? "🔑 API Key Set" : "⚠ Set API Key"}
        </Btn>
      </div>

      {showKeyInput && (
        <Modal title="Anthropic API Key" onClose={() => setShowKeyInput(false)}>
          <p style={{ fontSize: 13, color: COLORS.textDim, marginBottom: 16, lineHeight: 1.6 }}>
            To use the AI assistant in the standalone app, enter your Anthropic API key. It is stored only in your browser's localStorage and never sent anywhere except directly to the Anthropic API.
          </p>
          <FormRow label="API Key (sk-ant-...)">
            <input type="password" defaultValue={apiKey} id="apikey-input" placeholder="sk-ant-api03-..." />
          </FormRow>
          <p style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 16 }}>
            Get your API key at <a href="https://console.anthropic.com" target="_blank" rel="noreferrer" style={{ color: COLORS.accent }}>console.anthropic.com</a>
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn onClick={() => setShowKeyInput(false)}>Cancel</Btn>
            <Btn variant="primary" onClick={() => saveKey(document.getElementById("apikey-input").value)}><Icon name="check" size={14} /> Save Key</Btn>
          </div>
        </Modal>
      )}

      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {quickPrompts.map(p => (
          <button key={p} onClick={() => setInput(p)} style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, background: COLORS.surface2, border: `1px solid ${COLORS.border}`, color: COLORS.textDim, cursor: "pointer" }}>
            {p.slice(0, 48)}…
          </button>
        ))}
      </div>

      <div style={{ flex: 1, background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "16px 16px 0", overflowY: "auto", marginBottom: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 16, display: "flex", gap: 12, justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            {m.role === "assistant" && (
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: COLORS.accent + "20", border: `1px solid ${COLORS.accent}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name="flask" size={13} color={COLORS.accent} />
              </div>
            )}
            <div style={{ maxWidth: "75%", padding: "10px 14px", borderRadius: m.role === "user" ? "12px 12px 4px 12px" : "12px 12px 12px 4px", background: m.role === "user" ? COLORS.accent + "18" : COLORS.surface2, border: `1px solid ${m.role === "user" ? COLORS.accent + "35" : COLORS.border}`, fontSize: 13, lineHeight: 1.65, whiteSpace: "pre-wrap" }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: COLORS.accent + "20", border: `1px solid ${COLORS.accent}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="flask" size={13} color={COLORS.accent} />
            </div>
            <div style={{ padding: "12px 16px", borderRadius: "12px 12px 12px 4px", background: COLORS.surface2, border: `1px solid ${COLORS.border}` }}>
              <div style={{ display: "flex", gap: 5 }}>{[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.accent, animation: "pulse 1s ease-in-out infinite", animationDelay: `${i * 0.2}s` }} />)}</div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
          placeholder="Describe your data or ask for analysis… (Enter to send)"
          rows={2} style={{ flex: 1, resize: "none" }} />
        <button onClick={send} disabled={loading || !input.trim()} style={{ padding: "0 18px", borderRadius: 8, background: input.trim() && !loading ? COLORS.accent : COLORS.surface2, border: `1px solid ${input.trim() && !loading ? COLORS.accent : COLORS.border}`, color: input.trim() && !loading ? "#000" : COLORS.textMuted, display: "flex", alignItems: "center" }}>
          <Icon name="send" size={15} />
        </button>
      </div>
    </div>
  );
}

// ─── Grants ───────────────────────────────────────────────────────────────────
function Grants({ data, setData }) {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});

  const openNew = () => { setForm({ title: "", funder: "", amount: "", status: "drafting", deadline: "", notes: "", tags: "" }); setModal("form"); };
  const openEdit = (g) => { setForm({ ...g, tags: g.tags.join(", ") }); setModal("form"); };
  const save = () => {
    const entry = { ...form, id: form.id || Date.now(), tags: form.tags.split(",").map(t => t.trim()).filter(Boolean) };
    setData(d => ({ ...d, grants: form.id ? d.grants.map(g => g.id === entry.id ? entry : g) : [...d.grants, entry] }));
    setModal(null);
  };
  const del = (id) => setData(d => ({ ...d, grants: d.grants.filter(g => g.id !== id) }));

  return (
    <div className="fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22 }}>Grant & Proposal Tracker</h2>
          <p style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 2 }}>{data.grants.length} proposals tracked</p>
        </div>
        <Btn variant="primary" onClick={openNew}><Icon name="plus" size={15} /> New Proposal</Btn>
      </div>
      <div style={{ display: "grid", gap: 14 }}>
        {data.grants.map(g => {
          const status = grantStatuses.find(s => s.key === g.status);
          const daysLeft = g.deadline ? Math.ceil((new Date(g.deadline) - new Date()) / 86400000) : null;
          return (
            <Card key={g.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                    <Badge label={status?.label} color={status?.color || COLORS.textMuted} />
                    {daysLeft !== null && <Badge label={daysLeft < 0 ? "Deadline passed" : `${daysLeft} days left`} color={daysLeft < 0 ? COLORS.textMuted : daysLeft < 30 ? COLORS.red : COLORS.amber} />}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, fontFamily: "'Syne', sans-serif" }}>{g.title}</h3>
                  <div style={{ display: "flex", gap: 16, fontSize: 12, color: COLORS.textMuted, fontFamily: "'IBM Plex Mono', monospace", flexWrap: "wrap" }}>
                    <span style={{ color: COLORS.accent }}>{g.funder}</span>
                    <span>{g.amount}</span>
                    {g.deadline && <span>{g.deadline}</span>}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Btn small onClick={() => openEdit(g)}><Icon name="edit" size={13} /></Btn>
                  <Btn small variant="danger" onClick={() => del(g.id)}><Icon name="trash" size={13} /></Btn>
                </div>
              </div>
              {g.notes && <p style={{ fontSize: 13, color: COLORS.textDim, lineHeight: 1.6, marginBottom: 10, padding: "10px 12px", background: COLORS.surface2, borderRadius: 8, borderLeft: `3px solid ${status?.color || COLORS.border}` }}>{g.notes}</p>}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{g.tags.map(t => <Tag key={t} label={t} />)}</div>
            </Card>
          );
        })}
      </div>
      {modal === "form" && (
        <Modal title={form.id ? "Edit Proposal" : "New Proposal"} onClose={() => setModal(null)}>
          <FormRow label="Title"><input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></FormRow>
          <FormRow label="Funder"><input value={form.funder} onChange={e => setForm(f => ({ ...f, funder: e.target.value }))} /></FormRow>
          <FormRow label="Amount"><input value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} /></FormRow>
          <FormRow label="Status"><select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>{grantStatuses.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}</select></FormRow>
          <FormRow label="Deadline"><input type="date" value={form.deadline || ""} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} /></FormRow>
          <FormRow label="Tags (comma-separated)"><input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} /></FormRow>
          <FormRow label="Notes"><textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={4} style={{ resize: "vertical" }} /></FormRow>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn onClick={() => setModal(null)}>Cancel</Btn>
            <Btn variant="primary" onClick={save}><Icon name="check" size={14} /> Save</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Knowledge Base ───────────────────────────────────────────────────────────
function KnowledgeBase({ data, setData }) {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [search, setSearch] = useState("");
  const [filterProject, setFilterProject] = useState("All");

  const projects = ["All", ...new Set(data.knowledge.map(k => k.project))];
  const filtered = data.knowledge.filter(k =>
    (filterProject === "All" || k.project === filterProject) &&
    (k.title.toLowerCase().includes(search.toLowerCase()) || k.content.toLowerCase().includes(search.toLowerCase()) || k.tags.some(t => t.toLowerCase().includes(search.toLowerCase())))
  );

  const openNew = () => { setForm({ title: "", project: "", content: "", tags: "" }); setModal("form"); };
  const openEdit = (k) => { setForm({ ...k, tags: k.tags.join(", ") }); setModal("form"); };
  const save = () => {
    const entry = { ...form, id: form.id || Date.now(), tags: form.tags.split(",").map(t => t.trim()).filter(Boolean), created: form.created || new Date().toISOString().slice(0, 10) };
    setData(d => ({ ...d, knowledge: form.id ? d.knowledge.map(k => k.id === entry.id ? entry : k) : [...d.knowledge, entry] }));
    setModal(null);
  };
  const del = (id) => setData(d => ({ ...d, knowledge: d.knowledge.filter(k => k.id !== id) }));

  return (
    <div className="fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22 }}>Knowledge Base</h2>
          <p style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 2 }}>Cross-project insights & notes</p>
        </div>
        <Btn variant="primary" onClick={openNew}><Icon name="plus" size={15} /> Add Note</Btn>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}><Icon name="search" size={14} color={COLORS.textMuted} /></div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notes…" style={{ paddingLeft: 32 }} />
        </div>
        <select value={filterProject} onChange={e => setFilterProject(e.target.value)} style={{ width: "auto", minWidth: 160 }}>
          {projects.map(p => <option key={p}>{p}</option>)}
        </select>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
        {filtered.map(k => (
          <Card key={k.id} style={{ borderLeft: `3px solid ${COLORS.purple}40` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <Badge label={k.project} color={COLORS.purple} small />
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => openEdit(k)} style={{ background: "none", border: "none", color: COLORS.textMuted, padding: 2 }}><Icon name="edit" size={13} /></button>
                <button onClick={() => del(k.id)} style={{ background: "none", border: "none", color: COLORS.red + "70", padding: 2 }}><Icon name="trash" size={13} /></button>
              </div>
            </div>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, lineHeight: 1.4 }}>{k.title}</h3>
            <p style={{ fontSize: 12, color: COLORS.textDim, lineHeight: 1.65, marginBottom: 10 }}>{k.content}</p>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 8 }}>{k.tags.map(t => <Tag key={t} label={t} />)}</div>
            <div style={{ fontSize: 10, color: COLORS.textMuted, fontFamily: "'IBM Plex Mono', monospace" }}>{k.created}</div>
          </Card>
        ))}
        {filtered.length === 0 && <p style={{ color: COLORS.textMuted, fontSize: 13 }}>No notes found.</p>}
      </div>
      {modal === "form" && (
        <Modal title={form.id ? "Edit Note" : "New Note"} onClose={() => setModal(null)}>
          <FormRow label="Title"><input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></FormRow>
          <FormRow label="Project / Category"><input value={form.project} onChange={e => setForm(f => ({ ...f, project: e.target.value }))} /></FormRow>
          <FormRow label="Content"><textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={5} style={{ resize: "vertical" }} /></FormRow>
          <FormRow label="Tags (comma-separated)"><input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} /></FormRow>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn onClick={() => setModal(null)}>Cancel</Btn>
            <Btn variant="primary" onClick={save}><Icon name="check" size={14} /> Save</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Collaborations ───────────────────────────────────────────────────────────
function Collaborations({ data, setData }) {
  const [tab, setTab] = useState("partners");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});

  const openNewPartner = () => { setForm({ partner: "", contact: "", type: "Research", status: "exploring", topic: "", notes: "", lastContact: "" }); setModal("partner"); };
  const openEditPartner = (c) => { setForm(c); setModal("partner"); };
  const savePartner = () => {
    const entry = { ...form, id: form.id || Date.now() };
    setData(d => ({ ...d, collaborations: form.id ? d.collaborations.map(c => c.id === entry.id ? entry : c) : [...d.collaborations, entry] }));
    setModal(null);
  };
  const delPartner = (id) => setData(d => ({ ...d, collaborations: d.collaborations.filter(c => c.id !== id) }));

  const openNewMeeting = () => { setForm({ title: "", partner: "", date: "", time: "", type: "video", notes: "", actionItems: "" }); setModal("meeting"); };
  const openEditMeeting = (m) => { setForm({ ...m, actionItems: m.actionItems.join("\n") }); setModal("meeting"); };
  const saveMeeting = () => {
    const entry = { ...form, id: form.id || Date.now(), actionItems: typeof form.actionItems === "string" ? form.actionItems.split("\n").map(s => s.trim()).filter(Boolean) : form.actionItems };
    setData(d => ({ ...d, meetings: form.id ? d.meetings.map(m => m.id === entry.id ? entry : m) : [...d.meetings, entry] }));
    setModal(null);
  };
  const delMeeting = (id) => setData(d => ({ ...d, meetings: d.meetings.filter(m => m.id !== id) }));

  const typeColors = { Research: COLORS.blue, Industry: COLORS.amber, Entrepreneurship: COLORS.accent, Center: COLORS.purple };

  return (
    <div className="fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22 }}>Collaborations & Meetings</h2>
          <p style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 2 }}>Partner network & meeting tracker</p>
        </div>
        {tab === "partners" && <Btn variant="primary" onClick={openNewPartner}><Icon name="plus" size={15} /> Add Partner</Btn>}
        {tab === "meetings" && <Btn variant="primary" onClick={openNewMeeting}><Icon name="plus" size={15} /> Schedule Meeting</Btn>}
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: COLORS.surface, padding: 4, borderRadius: 8, width: "fit-content" }}>
        {["partners", "meetings"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "7px 16px", borderRadius: 6, border: "none", background: tab === t ? COLORS.surface3 : "transparent", color: tab === t ? COLORS.text : COLORS.textMuted, fontSize: 13, fontWeight: tab === t ? 600 : 400, transition: "all 0.15s", textTransform: "capitalize" }}>{t}</button>
        ))}
      </div>
      {tab === "partners" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
          {data.collaborations.map(c => {
            const status = collabStatuses.find(s => s.key === c.status);
            return (
              <Card key={c.id}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Badge label={c.type} color={typeColors[c.type] || COLORS.textMuted} small />
                    <Badge label={status?.label} color={status?.color || COLORS.textMuted} small />
                  </div>
                  <div style={{ display: "flex", gap: 5 }}>
                    <button onClick={() => openEditPartner(c)} style={{ background: "none", border: "none", color: COLORS.textMuted, padding: 2 }}><Icon name="edit" size={13} /></button>
                    <button onClick={() => delPartner(c.id)} style={{ background: "none", border: "none", color: COLORS.red + "70", padding: 2 }}><Icon name="trash" size={13} /></button>
                  </div>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, fontFamily: "'Syne', sans-serif" }}>{c.partner}</h3>
                {c.contact && <div style={{ fontSize: 12, color: COLORS.accent, marginBottom: 6, fontFamily: "'IBM Plex Mono', monospace" }}>{c.contact}</div>}
                <div style={{ fontSize: 13, color: COLORS.textDim, marginBottom: 8, lineHeight: 1.5 }}>{c.topic}</div>
                {c.notes && <p style={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.5, marginBottom: 8 }}>{c.notes}</p>}
                {c.lastContact && <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "'IBM Plex Mono', monospace", display: "flex", alignItems: "center", gap: 5 }}><Icon name="clock" size={11} /> Last contact: {c.lastContact}</div>}
              </Card>
            );
          })}
        </div>
      )}
      {tab === "meetings" && (
        <div style={{ display: "grid", gap: 14 }}>
          {data.meetings.length === 0 && <p style={{ color: COLORS.textMuted, fontSize: 13 }}>No meetings scheduled.</p>}
          {data.meetings.map(m => (
            <Card key={m.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                    <Badge label={m.type} color={COLORS.blue} small />
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: COLORS.accent }}>{m.date} · {m.time}</span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, fontFamily: "'Syne', sans-serif" }}>{m.title}</h3>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 10 }}>with <span style={{ color: COLORS.textDim }}>{m.partner}</span></div>
                  {m.notes && <p style={{ fontSize: 13, color: COLORS.textDim, lineHeight: 1.5, marginBottom: 10 }}>{m.notes}</p>}
                  {m.actionItems?.length > 0 && (
                    <div>
                      <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Action Items</div>
                      {m.actionItems.map((item, i) => (
                        <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: COLORS.textDim, marginBottom: 4 }}>
                          <div style={{ width: 5, height: 5, borderRadius: "50%", background: COLORS.amber, flexShrink: 0 }} />
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <Btn small onClick={() => openEditMeeting(m)}><Icon name="edit" size={13} /></Btn>
                  <Btn small variant="danger" onClick={() => delMeeting(m.id)}><Icon name="trash" size={13} /></Btn>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      {modal === "partner" && (
        <Modal title={form.id ? "Edit Partner" : "New Partner"} onClose={() => setModal(null)}>
          <FormRow label="Organization"><input value={form.partner} onChange={e => setForm(f => ({ ...f, partner: e.target.value }))} /></FormRow>
          <FormRow label="Contact Name"><input value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} /></FormRow>
          <FormRow label="Type"><select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>{["Research", "Industry", "Entrepreneurship", "Center", "Other"].map(t => <option key={t}>{t}</option>)}</select></FormRow>
          <FormRow label="Status"><select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>{collabStatuses.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}</select></FormRow>
          <FormRow label="Topic"><input value={form.topic} onChange={e => setForm(f => ({ ...f, topic: e.target.value }))} /></FormRow>
          <FormRow label="Last Contact"><input type="date" value={form.lastContact || ""} onChange={e => setForm(f => ({ ...f, lastContact: e.target.value }))} /></FormRow>
          <FormRow label="Notes"><textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3} style={{ resize: "vertical" }} /></FormRow>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn onClick={() => setModal(null)}>Cancel</Btn>
            <Btn variant="primary" onClick={savePartner}><Icon name="check" size={14} /> Save</Btn>
          </div>
        </Modal>
      )}
      {modal === "meeting" && (
        <Modal title={form.id ? "Edit Meeting" : "Schedule Meeting"} onClose={() => setModal(null)}>
          <FormRow label="Title"><input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></FormRow>
          <FormRow label="Partner"><input value={form.partner} onChange={e => setForm(f => ({ ...f, partner: e.target.value }))} /></FormRow>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FormRow label="Date"><input type="date" value={form.date || ""} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} /></FormRow>
            <FormRow label="Time"><input type="time" value={form.time || ""} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} /></FormRow>
          </div>
          <FormRow label="Type"><select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>{["video", "in-person", "phone"].map(t => <option key={t}>{t}</option>)}</select></FormRow>
          <FormRow label="Notes"><textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={2} style={{ resize: "vertical" }} /></FormRow>
          <FormRow label="Action Items (one per line)"><textarea value={typeof form.actionItems === "string" ? form.actionItems : form.actionItems?.join("\n") || ""} onChange={e => setForm(f => ({ ...f, actionItems: e.target.value }))} rows={3} style={{ resize: "vertical" }} /></FormRow>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn onClick={() => setModal(null)}>Cancel</Btn>
            <Btn variant="primary" onClick={saveMeeting}><Icon name="check" size={14} /> Save</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Calendar ────────────────────────────────────────────────────────────────
const EVENT_TYPES = [
  { key: "meeting", label: "Meeting", color: "#3b82f6" },
  { key: "deadline", label: "Deadline", color: "#ef4444" },
  { key: "task", label: "Task", color: "#00d4aa" },
  { key: "reminder", label: "Reminder", color: "#f59e0b" },
  { key: "other", label: "Other", color: "#a78bfa" },
];

function Calendar({ data, setData }) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [viewMode, setViewMode] = useState("month"); // month | agenda

  const events = data.calendarEvents || [];

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));
  const goToday = () => { setViewDate(new Date(today.getFullYear(), today.getMonth(), 1)); setSelected(toDateStr(today)); };

  const toDateStr = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  const todayStr = toDateStr(today);

  const getEventsForDate = (dateStr) => events.filter(e => e.date === dateStr).sort((a,b) => (a.time||"").localeCompare(b.time||""));

  const openNew = (dateStr) => {
    setForm({ title: "", date: dateStr || toDateStr(today), time: "", type: "task", notes: "", completed: false });
    setModal("form");
  };
  const openEdit = (e) => { setForm({ ...e }); setModal("form"); };
  const save = () => {
    const entry = { ...form, id: form.id || Date.now() };
    setData(d => ({ ...d, calendarEvents: form.id ? (d.calendarEvents||[]).map(e => e.id === entry.id ? entry : e) : [...(d.calendarEvents||[]), entry] }));
    setModal(null);
  };
  const del = (id) => {
    setData(d => ({ ...d, calendarEvents: (d.calendarEvents||[]).filter(e => e.id !== id) }));
    setModal(null);
  };
  const toggleComplete = (id) => {
    setData(d => ({ ...d, calendarEvents: (d.calendarEvents||[]).map(e => e.id === id ? { ...e, completed: !e.completed } : e) }));
  };

  // Build calendar grid
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push({ day: prevMonthDays - firstDay + 1 + i, current: false });
  for (let i = 1; i <= daysInMonth; i++) cells.push({ day: i, current: true });
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) cells.push({ day: i, current: false });

  // Agenda: upcoming 30 days
  const agendaEvents = events
    .filter(e => e.date >= todayStr)
    .sort((a,b) => a.date.localeCompare(b.date) || (a.time||"").localeCompare(b.time||""))
    .slice(0, 30);

  const selectedEvents = selected ? getEventsForDate(selected) : [];
  const typeObj = (key) => EVENT_TYPES.find(t => t.key === key) || EVENT_TYPES[4];

  return (
    <div className="fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22 }}>Calendar</h2>
          <p style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 2 }}>Appointments, tasks & deadlines</p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 3, background: COLORS.surface, padding: 3, borderRadius: 8 }}>
            {["month","agenda"].map(m => (
              <button key={m} onClick={() => setViewMode(m)} style={{ padding: "6px 14px", borderRadius: 6, border: "none", background: viewMode === m ? COLORS.surface3 : "transparent", color: viewMode === m ? COLORS.text : COLORS.textMuted, fontSize: 12, fontWeight: viewMode === m ? 600 : 400, textTransform: "capitalize" }}>{m}</button>
            ))}
          </div>
          <Btn small onClick={goToday}>Today</Btn>
          <Btn variant="primary" onClick={() => openNew(selected || todayStr)}><Icon name="plus" size={15} /> Add Event</Btn>
        </div>
      </div>

      {viewMode === "month" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16 }}>
          {/* Month grid */}
          <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden" }}>
            {/* Month nav */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: `1px solid ${COLORS.border}` }}>
              <button onClick={prevMonth} style={{ background: "none", border: "none", color: COLORS.textMuted, padding: 4 }}><Icon name="chevLeft" size={18} /></button>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16 }}>{monthNames[month]} {year}</span>
              <button onClick={nextMonth} style={{ background: "none", border: "none", color: COLORS.textMuted, padding: 4 }}><Icon name="chevRight" size={18} /></button>
            </div>
            {/* Day headers */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: `1px solid ${COLORS.border}` }}>
              {dayNames.map(d => (
                <div key={d} style={{ padding: "8px 0", textAlign: "center", fontSize: 11, color: COLORS.textMuted, fontFamily: "'IBM Plex Mono', monospace", textTransform: "uppercase", letterSpacing: "0.05em" }}>{d}</div>
              ))}
            </div>
            {/* Calendar cells */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
              {cells.map((cell, idx) => {
                const dateStr = cell.current ? `${year}-${String(month+1).padStart(2,"0")}-${String(cell.day).padStart(2,"0")}` : null;
                const cellEvents = dateStr ? getEventsForDate(dateStr) : [];
                const isToday = dateStr === todayStr;
                const isSelected = dateStr === selected;
                return (
                  <div key={idx} onClick={() => dateStr && setSelected(dateStr)}
                    style={{ minHeight: 80, padding: "6px 8px", borderRight: `1px solid ${COLORS.border}20`, borderBottom: `1px solid ${COLORS.border}20`, cursor: cell.current ? "pointer" : "default", background: isSelected ? COLORS.accent + "12" : isToday ? COLORS.surface2 : "transparent", transition: "background 0.15s" }}>
                    <div style={{ fontSize: 12, fontWeight: isToday ? 700 : 400, color: !cell.current ? COLORS.border : isToday ? COLORS.accent : COLORS.text, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: isToday ? COLORS.accent + "20" : "transparent", marginBottom: 4 }}>
                      {cell.day}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      {cellEvents.slice(0, 3).map(ev => (
                        <div key={ev.id} style={{ fontSize: 10, padding: "1px 5px", borderRadius: 3, background: typeObj(ev.type).color + "25", color: typeObj(ev.type).color, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textDecoration: ev.completed ? "line-through" : "none", opacity: ev.completed ? 0.5 : 1 }}>
                          {ev.time && <span style={{ opacity: 0.7 }}>{ev.time} </span>}{ev.title}
                        </div>
                      ))}
                      {cellEvents.length > 3 && <div style={{ fontSize: 10, color: COLORS.textMuted }}>+{cellEvents.length - 3} more</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Day panel */}
          <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14 }}>
                {selected ? new Date(selected + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }) : "Select a day"}
              </div>
              {selected && <Btn small variant="primary" onClick={() => openNew(selected)}><Icon name="plus" size={12} /></Btn>}
            </div>
            {!selected && <p style={{ color: COLORS.textMuted, fontSize: 13 }}>Click a date to see its events.</p>}
            {selected && selectedEvents.length === 0 && <p style={{ color: COLORS.textMuted, fontSize: 13 }}>No events. Click + to add one.</p>}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {selectedEvents.map(ev => (
                <div key={ev.id} style={{ padding: "10px 12px", borderRadius: 8, background: COLORS.surface2, border: `1px solid ${typeObj(ev.type).color}30`, borderLeft: `3px solid ${typeObj(ev.type).color}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <button onClick={() => toggleComplete(ev.id)} style={{ background: "none", border: "none", padding: 0, color: ev.completed ? COLORS.accent : COLORS.textMuted }}>
                          <Icon name={ev.completed ? "check" : "task"} size={13} />
                        </button>
                        <span style={{ fontSize: 13, fontWeight: 500, textDecoration: ev.completed ? "line-through" : "none", opacity: ev.completed ? 0.6 : 1 }}>{ev.title}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <Badge label={typeObj(ev.type).label} color={typeObj(ev.type).color} small />
                        {ev.time && <span style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "'IBM Plex Mono', monospace" }}>{ev.time}</span>}
                      </div>
                      {ev.notes && <p style={{ fontSize: 12, color: COLORS.textDim, marginTop: 6, lineHeight: 1.5 }}>{ev.notes}</p>}
                    </div>
                    <div style={{ display: "flex", gap: 4, marginLeft: 8 }}>
                      <button onClick={() => openEdit(ev)} style={{ background: "none", border: "none", color: COLORS.textMuted, padding: 2 }}><Icon name="edit" size={12} /></button>
                      <button onClick={() => del(ev.id)} style={{ background: "none", border: "none", color: COLORS.red + "70", padding: 2 }}><Icon name="trash" size={12} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === "agenda" && (
        <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "'IBM Plex Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Upcoming Events</div>
          {agendaEvents.length === 0 && <p style={{ color: COLORS.textMuted, fontSize: 13 }}>No upcoming events. Click "+ Add Event" to get started.</p>}
          {(() => {
            let lastDate = null;
            return agendaEvents.map(ev => {
              const showDate = ev.date !== lastDate;
              lastDate = ev.date;
              const d = new Date(ev.date + "T00:00:00");
              return (
                <div key={ev.id}>
                  {showDate && (
                    <div style={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", color: ev.date === todayStr ? COLORS.accent : COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", margin: "16px 0 8px", display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: ev.date === todayStr ? COLORS.accent : COLORS.border }} />
                      {ev.date === todayStr ? "Today" : d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                    </div>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, background: COLORS.surface2, border: `1px solid ${COLORS.border}`, marginBottom: 6, borderLeft: `3px solid ${typeObj(ev.type).color}` }}>
                    <button onClick={() => toggleComplete(ev.id)} style={{ background: "none", border: "none", padding: 0, color: ev.completed ? COLORS.accent : COLORS.textMuted, flexShrink: 0 }}>
                      <Icon name={ev.completed ? "check" : "task"} size={14} />
                    </button>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, textDecoration: ev.completed ? "line-through" : "none", opacity: ev.completed ? 0.6 : 1, marginBottom: 3 }}>{ev.title}</div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <Badge label={typeObj(ev.type).label} color={typeObj(ev.type).color} small />
                        {ev.time && <span style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "'IBM Plex Mono', monospace" }}>{ev.time}</span>}
                        {ev.notes && <span style={{ fontSize: 11, color: COLORS.textMuted }}>{ev.notes.slice(0, 40)}{ev.notes.length > 40 ? "…" : ""}</span>}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button onClick={() => openEdit(ev)} style={{ background: "none", border: "none", color: COLORS.textMuted, padding: 2 }}><Icon name="edit" size={13} /></button>
                      <button onClick={() => del(ev.id)} style={{ background: "none", border: "none", color: COLORS.red + "70", padding: 2 }}><Icon name="trash" size={13} /></button>
                    </div>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      )}

      {modal === "form" && (
        <Modal title={form.id ? "Edit Event" : "New Event"} onClose={() => setModal(null)}>
          <FormRow label="Title"><input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Meeting with Prof. Weidenkaff, DFG deadline…" /></FormRow>
          <FormRow label="Type">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {EVENT_TYPES.map(t => (
                <button key={t.key} onClick={() => setForm(f => ({ ...f, type: t.key }))}
                  style={{ padding: "5px 12px", borderRadius: 99, border: `1px solid ${form.type === t.key ? t.color : COLORS.border}`, background: form.type === t.key ? t.color + "25" : "transparent", color: form.type === t.key ? t.color : COLORS.textMuted, fontSize: 12 }}>
                  {t.label}
                </button>
              ))}
            </div>
          </FormRow>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FormRow label="Date"><input type="date" value={form.date || ""} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} /></FormRow>
            <FormRow label="Time (optional)"><input type="time" value={form.time || ""} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} /></FormRow>
          </div>
          <FormRow label="Notes"><textarea value={form.notes || ""} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3} style={{ resize: "vertical" }} /></FormRow>
          <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
            <div>{form.id && <Btn variant="danger" onClick={() => del(form.id)}><Icon name="trash" size={13} /> Delete</Btn>}</div>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn onClick={() => setModal(null)}>Cancel</Btn>
              <Btn variant="primary" onClick={save}><Icon name="check" size={14} /> Save</Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function ResearchOS() {
  const [active, setActive] = useState("dashboard");
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem("researchos_data");
      return saved ? JSON.parse(saved) : defaultData;
    } catch { return defaultData; }
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem("researchos_data", JSON.stringify(data)); } catch {}
  }, [data]);

  const nav = [
    { id: "dashboard", label: "Dashboard", icon: "home" },
    { id: "calendar", label: "Calendar", icon: "calview" },
    { id: "manuscripts", label: "Manuscripts", icon: "book" },
    { id: "analysis", label: "Echem AI", icon: "flask" },
    { id: "grants", label: "Grants", icon: "chart" },
    { id: "knowledge", label: "Knowledge", icon: "brain" },
    { id: "collaborations", label: "Collaborate", icon: "network" },
  ];

  const handleNav = (id) => { setActive(id); setSidebarOpen(false); };

  return (
    <>
      <style>{fonts}{globalStyles}</style>
      <div style={{ display: "flex", height: "100vh", background: COLORS.bg, overflow: "hidden" }}>
        {/* Mobile overlay */}
        {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "#00000070", zIndex: 99, display: "none" }} className="mobile-overlay" />}

        {/* Sidebar */}
        <div style={{
          width: 220, background: COLORS.surface, borderRight: `1px solid ${COLORS.border}`,
          display: "flex", flexDirection: "column", padding: "20px 0", flexShrink: 0,
          position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 100,
          transform: sidebarOpen ? "translateX(0)" : undefined,
          transition: "transform 0.25s ease",
        }}>
          <div style={{ padding: "0 20px 24px", borderBottom: `1px solid ${COLORS.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${COLORS.accent}, #0095aa)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="bolt" size={16} color="#000" />
              </div>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em" }}>ResearchOS</div>
                <div style={{ fontSize: 9, color: COLORS.textMuted, fontFamily: "'IBM Plex Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>Jibril · TU Darmstadt</div>
              </div>
            </div>
          </div>
          <nav style={{ padding: "16px 10px", flex: 1 }}>
            {nav.map(item => (
              <button key={item.id} onClick={() => handleNav(item.id)}
                style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 12px", borderRadius: 8, border: "none", background: active === item.id ? COLORS.accent + "18" : "transparent", color: active === item.id ? COLORS.accent : COLORS.textMuted, fontSize: 13, fontWeight: active === item.id ? 600 : 400, marginBottom: 2, transition: "all 0.15s", cursor: "pointer", textAlign: "left" }}>
                <Icon name={item.icon} size={16} color={active === item.id ? COLORS.accent : COLORS.textMuted} />
                {item.label}
                {active === item.id && <div style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", background: COLORS.accent }} />}
              </button>
            ))}
          </nav>
          <div style={{ padding: "12px 16px", margin: "0 10px 10px", borderRadius: 8, background: COLORS.amberDim, border: `1px solid ${COLORS.amber}30` }}>
            <div style={{ fontSize: 10, fontFamily: "'IBM Plex Mono', monospace", color: COLORS.amber, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>AvH Fellowship</div>
            <div style={{ fontSize: 12, color: COLORS.textDim }}>Ending Feb 2026</div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, marginLeft: 220, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Mobile top bar */}
          <div style={{ display: "none", alignItems: "center", gap: 12, padding: "14px 16px", background: COLORS.surface, borderBottom: `1px solid ${COLORS.border}` }} className="mobile-topbar">
            <button onClick={() => setSidebarOpen(true)} style={{ background: "none", border: "none", color: COLORS.textDim }}>
              <Icon name="menu" size={22} />
            </button>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16 }}>ResearchOS</span>
          </div>
          <div style={{ flex: 1, padding: "28px 32px", overflowY: "auto" }}>
            {active === "dashboard" && <Dashboard data={data} />}
            {active === "calendar" && <Calendar data={data} setData={setData} />}
            {active === "manuscripts" && <Manuscripts data={data} setData={setData} />}
            {active === "analysis" && <ElectrochemAI />}
            {active === "grants" && <Grants data={data} setData={setData} />}
            {active === "knowledge" && <KnowledgeBase data={data} setData={setData} />}
            {active === "collaborations" && <Collaborations data={data} setData={setData} />}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .mobile-topbar { display: flex !important; }
          .mobile-overlay { display: block !important; }
        }
        @media (max-width: 768px) {
          div[style*="margin-left: 220px"] { margin-left: 0 !important; }
          div[style*="position: fixed"][style*="width: 220px"] { transform: translateX(-100%); }
        }
      `}</style>
    </>
  );
}
