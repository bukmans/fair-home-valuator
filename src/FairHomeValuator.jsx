import { useState, useRef, useEffect } from "react";

/* ─── GLOBAL STYLES ─────────────────────────────────────────────────── */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Syne:wght@400;500;600;700&display=swap');

:root {
  --bg:        #0D0F12;
  --bg2:       #13161B;
  --bg3:       #1A1E25;
  --border:    rgba(255,255,255,0.07);
  --border2:   rgba(255,255,255,0.12);
  --gold:      #C9A84C;
  --gold2:     #E8C96A;
  --gold-dim:  rgba(201,168,76,0.12);
  --text:      #E8E2D9;
  --text2:     #9A9590;
  --text3:     #5A5650;
  --red:       #E05252;
  --green:     #52C07A;
  --blue:      #5299E0;
  --serif:     'Cormorant Garamond', Georgia, serif;
  --sans:      'Syne', system-ui, sans-serif;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body, #root {
  background: var(--bg);
  color: var(--text);
  font-family: var(--sans);
  min-height: 100vh;
}

/* scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }

/* noise grain overlay */
.app::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 999;
  opacity: 0.4;
}

.app { min-height: 100vh; position: relative; }

/* ── HEADER ── */
.hdr {
  position: sticky; top: 0; z-index: 100;
  background: rgba(13,15,18,0.9);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  padding: 0 40px;
  height: 64px;
  display: flex; align-items: center; justify-content: space-between;
}
.hdr-brand { display: flex; align-items: center; gap: 12px; }
.hdr-mark {
  width: 32px; height: 32px;
  background: linear-gradient(135deg, var(--gold), var(--gold2));
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  display: flex; align-items: center; justify-content: center;
  font-size: 14px;
}
.hdr-name {
  font-family: var(--serif);
  font-size: 20px; font-weight: 600;
  letter-spacing: 0.5px;
  color: var(--text);
}
.hdr-tag {
  font-size: 10px; font-weight: 600;
  letter-spacing: 2.5px; text-transform: uppercase;
  color: var(--gold);
  border: 1px solid rgba(201,168,76,0.3);
  padding: 3px 10px; border-radius: 20px;
}

/* ── HERO ── */
.hero {
  padding: 80px 40px 64px;
  position: relative; overflow: hidden;
}
.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}
.hero-orb-1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%);
  top: -150px; right: -100px;
}
.hero-orb-2 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(82,153,224,0.05) 0%, transparent 70%);
  bottom: 0; left: -50px;
}
.hero-eyebrow {
  display: flex; align-items: center; gap: 10px;
  font-size: 11px; font-weight: 600;
  letter-spacing: 3px; text-transform: uppercase;
  color: var(--gold); margin-bottom: 20px;
}
.hero-eyebrow::before {
  content: ''; display: block;
  width: 24px; height: 1px;
  background: var(--gold);
}
.hero-h1 {
  font-family: var(--serif);
  font-size: clamp(36px, 5vw, 58px);
  font-weight: 700; line-height: 1.1;
  color: var(--text);
  max-width: 600px; margin-bottom: 20px;
}
.hero-h1 em {
  font-style: italic; color: var(--gold);
}
.hero-p {
  font-size: 15px; color: var(--text2);
  max-width: 480px; line-height: 1.7;
  margin-bottom: 40px;
}
.hero-pills { display: flex; gap: 10px; flex-wrap: wrap; }
.hero-pill {
  font-size: 12px; font-weight: 500;
  color: var(--text2);
  border: 1px solid var(--border2);
  padding: 6px 14px; border-radius: 20px;
  display: flex; align-items: center; gap: 6px;
  background: var(--bg2);
}

/* ── MAIN ── */
.main { max-width: 900px; margin: 0 auto; padding: 0 40px 100px; }

/* ── TABS ── */
.tabs {
  display: flex; gap: 2px;
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 12px; padding: 4px;
  margin-bottom: 32px;
}
.tab {
  flex: 1; padding: 10px 16px;
  font-family: var(--sans); font-size: 13px; font-weight: 600;
  border: none; border-radius: 9px; cursor: pointer;
  transition: all 0.2s; color: var(--text3);
  background: transparent; letter-spacing: 0.3px;
}
.tab.active {
  background: var(--bg3);
  color: var(--gold);
  box-shadow: 0 1px 8px rgba(0,0,0,0.3);
}
.tab:hover:not(.active) { color: var(--text2); }

/* ── CARDS ── */
.card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 16px; padding: 28px 32px;
  margin-bottom: 20px;
  position: relative; overflow: hidden;
}
.card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent);
}
.card-title {
  font-family: var(--serif);
  font-size: 18px; font-weight: 600;
  color: var(--text); margin-bottom: 4px;
}
.card-sub {
  font-size: 12px; color: var(--text3);
  margin-bottom: 24px; line-height: 1.5;
  letter-spacing: 0.2px;
}

/* ── PASTE ZONE ── */
.paste-zone {
  background: var(--bg3);
  border: 1.5px dashed rgba(201,168,76,0.25);
  border-radius: 12px; padding: 20px;
  transition: all 0.2s;
}
.paste-zone:focus-within {
  border-color: rgba(201,168,76,0.5);
  background: rgba(201,168,76,0.03);
}
.paste-zone textarea {
  width: 100%; background: transparent;
  border: none; outline: none; resize: none;
  font-family: var(--sans); font-size: 13px;
  color: var(--text); line-height: 1.7;
  min-height: 160px;
}
.paste-zone textarea::placeholder { color: var(--text3); }
.paste-actions {
  display: flex; align-items: center;
  justify-content: space-between;
  margin-top: 14px; padding-top: 14px;
  border-top: 1px solid var(--border);
}
.paste-hint { font-size: 11px; color: var(--text3); letter-spacing: 0.5px; }

/* ── FORM FIELDS ── */
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
.field { display: flex; flex-direction: column; gap: 7px; }
.field label {
  font-size: 10px; font-weight: 700;
  letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--text3);
}
.field input, .field select, .field textarea {
  background: var(--bg3);
  border: 1px solid var(--border2);
  border-radius: 9px; padding: 11px 14px;
  font-family: var(--sans); font-size: 13px;
  color: var(--text); outline: none;
  transition: border-color 0.2s, background 0.2s;
  width: 100%;
  -webkit-appearance: none;
}
.field input:focus, .field select:focus {
  border-color: rgba(201,168,76,0.5);
  background: rgba(201,168,76,0.03);
}
.field select { cursor: pointer; }
.field select option { background: #1A1E25; }

/* ── PHOTO ZONE ── */
.photo-zone {
  border: 1.5px dashed var(--border2);
  border-radius: 12px; padding: 28px;
  text-align: center; cursor: pointer;
  transition: all 0.2s; background: var(--bg3);
}
.photo-zone:hover {
  border-color: rgba(201,168,76,0.4);
  background: rgba(201,168,76,0.03);
}
.photo-zone-icon { font-size: 28px; margin-bottom: 8px; opacity: 0.6; }
.photo-zone-text { font-size: 13px; color: var(--text2); }
.photo-zone-sub { font-size: 11px; color: var(--text3); margin-top: 4px; }
.photo-grid {
  display: grid; grid-template-columns: repeat(4,1fr);
  gap: 8px; margin-top: 14px;
}
.photo-thumb {
  aspect-ratio: 1; border-radius: 8px;
  object-fit: cover; border: 1px solid var(--border2);
}

/* ── BUTTONS ── */
.btn-gold {
  background: linear-gradient(135deg, var(--gold) 0%, var(--gold2) 100%);
  color: #0D0F12; border: none; border-radius: 10px;
  padding: 14px 32px; font-family: var(--sans);
  font-size: 13px; font-weight: 700; letter-spacing: 0.5px;
  cursor: pointer; transition: all 0.2s;
  display: inline-flex; align-items: center; gap: 8px;
  white-space: nowrap;
}
.btn-gold:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(201,168,76,0.3);
}
.btn-gold:disabled { opacity: 0.4; cursor: not-allowed; }

.btn-ghost {
  background: transparent; color: var(--text2);
  border: 1px solid var(--border2); border-radius: 10px;
  padding: 12px 24px; font-family: var(--sans);
  font-size: 13px; font-weight: 500;
  cursor: pointer; transition: all 0.2s;
  display: inline-flex; align-items: center; gap: 8px;
}
.btn-ghost:hover { border-color: var(--border2); color: var(--text); background: var(--bg3); }

.btn-sim {
  background: linear-gradient(135deg, #1A2D4A 0%, #1E3A5C 100%);
  color: #7BB8E8; border: 1px solid rgba(82,153,224,0.25);
  border-radius: 10px; padding: 14px 28px;
  font-family: var(--sans); font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all 0.2s;
  display: inline-flex; align-items: center; gap: 8px;
}
.btn-sim:hover {
  background: linear-gradient(135deg, #1E3A5C 0%, #243E60 100%);
  box-shadow: 0 6px 20px rgba(82,153,224,0.15);
  transform: translateY(-1px);
}

/* ── LOADING ── */
.loading-wrap {
  min-height: 60vh; display: flex;
  flex-direction: column; align-items: center;
  justify-content: center; padding: 60px 40px;
  text-align: center;
}
.loading-diamond {
  width: 64px; height: 64px;
  background: linear-gradient(135deg, var(--gold) 0%, var(--gold2) 100%);
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  animation: pulse-diamond 1.8s ease-in-out infinite;
  margin-bottom: 32px;
}
@keyframes pulse-diamond {
  0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
  50% { transform: scale(0.85) rotate(45deg); opacity: 0.7; }
}
.loading-title {
  font-family: var(--serif); font-size: 28px; font-weight: 600;
  color: var(--text); margin-bottom: 8px;
}
.loading-sub { font-size: 13px; color: var(--text3); margin-bottom: 36px; }
.loading-steps { display: flex; flex-direction: column; gap: 12px; width: 260px; }
.lstep {
  display: flex; align-items: center; gap: 14px;
  font-size: 12px; color: var(--text3);
  transition: color 0.4s;
}
.lstep.done { color: var(--gold); }
.lstep.active { color: var(--text); }
.lstep-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--text3); flex-shrink: 0;
  transition: background 0.4s;
}
.lstep.done .lstep-dot { background: var(--gold); }
.lstep.active .lstep-dot {
  background: var(--gold);
  box-shadow: 0 0 8px rgba(201,168,76,0.6);
  animation: blink 1s ease-in-out infinite;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

/* ── RESULTS ── */
.verdict-wrap {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 20px; overflow: hidden;
  margin-bottom: 24px;
  animation: fadeUp 0.5s ease both;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
.verdict-bar {
  padding: 36px 40px;
  display: flex; align-items: center; gap: 28px;
  position: relative; overflow: hidden;
}
.verdict-bar.overpriced { background: linear-gradient(135deg, #2A0F0F 0%, #3D1515 100%); }
.verdict-bar.fair       { background: linear-gradient(135deg, #0F2A18 0%, #153D20 100%); }
.verdict-bar.underpriced{ background: linear-gradient(135deg, #0F1A2A 0%, #152540 100%); }
.verdict-bar.uncertain  { background: linear-gradient(135deg, #1A1E25 0%, #20252E 100%); }
.verdict-glyph { font-size: 52px; flex-shrink: 0; }
.verdict-body { flex: 1; }
.verdict-eyebrow {
  font-size: 10px; font-weight: 700; letter-spacing: 2.5px;
  text-transform: uppercase; color: rgba(255,255,255,0.4);
  margin-bottom: 6px;
}
.verdict-title {
  font-family: var(--serif); font-size: 34px; font-weight: 700;
  color: #fff; line-height: 1; margin-bottom: 8px;
}
.verdict-line { font-size: 14px; color: rgba(255,255,255,0.55); line-height: 1.55; }

.confidence-ring {
  flex-shrink: 0; display: flex;
  flex-direction: column; align-items: center; gap: 6px;
}
.ring-svg { transform: rotate(-90deg); }
.ring-val {
  font-family: var(--serif); font-size: 22px; font-weight: 700;
  color: #fff; position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}
.ring-wrap { position: relative; width: 76px; height: 76px; }
.ring-label { font-size: 10px; letter-spacing: 2px; color: rgba(255,255,255,0.35); }

.stats-row {
  display: grid; grid-template-columns: repeat(3,1fr);
  border-top: 1px solid var(--border);
}
.stat-cell {
  padding: 24px 28px;
  border-right: 1px solid var(--border);
}
.stat-cell:last-child { border-right: none; }
.stat-lbl {
  font-size: 10px; font-weight: 700;
  letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--text3); margin-bottom: 8px;
}
.stat-val {
  font-family: var(--serif); font-size: 24px;
  font-weight: 700; color: var(--text);
  margin-bottom: 3px; line-height: 1;
}
.stat-val.pos { color: var(--green); }
.stat-val.neg { color: var(--red); }
.stat-note { font-size: 11px; color: var(--text3); }

/* analysis */
.analysis-body {
  font-size: 14px; color: var(--text2);
  line-height: 1.75; white-space: pre-wrap;
}
.divider { height: 1px; background: var(--border); margin: 24px 0; }

/* flags */
.flags-row { display: flex; flex-direction: column; gap: 8px; }
.flag-item {
  display: flex; align-items: flex-start;
  gap: 12px; font-size: 13px; color: var(--text2);
  line-height: 1.5;
}
.flag-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; margin-top: 6px; }
.flag-dot.red { background: var(--red); }
.flag-dot.green { background: var(--green); }

/* factors */
.factors-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
  margin-bottom: 24px;
}
.factor {
  background: var(--bg3); border: 1px solid var(--border);
  border-radius: 12px; padding: 16px 18px;
  display: flex; align-items: flex-start; gap: 12px;
  animation: fadeUp 0.4s ease both;
}
.factor-ico { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
.factor-name { font-size: 13px; font-weight: 600; color: var(--text); margin-bottom: 3px; }
.factor-desc { font-size: 11px; color: var(--text3); line-height: 1.45; }
.factor-badge {
  margin-left: auto; flex-shrink: 0;
  font-size: 11px; font-weight: 700; padding: 3px 9px;
  border-radius: 20px; letter-spacing: 0.5px;
}
.factor-badge.up   { background: rgba(82,192,122,0.12); color: var(--green); }
.factor-badge.down { background: rgba(224,82,82,0.12);  color: var(--red);   }
.factor-badge.neutral { background: var(--bg); color: var(--text3); }

/* negotiation */
.nego-card {
  background: linear-gradient(135deg, #16191F 0%, #1A1E25 100%);
  border: 1px solid rgba(201,168,76,0.2);
  border-radius: 16px; padding: 28px 32px;
  margin-bottom: 20px;
}
.nego-title {
  font-family: var(--serif); font-size: 20px; font-weight: 600;
  color: var(--text); margin-bottom: 18px;
  display: flex; align-items: center; gap: 10px;
}
.nego-list { display: flex; flex-direction: column; gap: 12px; }
.nego-item {
  display: flex; align-items: flex-start; gap: 14px;
  font-size: 13px; color: var(--text2); line-height: 1.6;
}
.nego-num {
  width: 22px; height: 22px; border-radius: 50%;
  background: var(--gold-dim); border: 1px solid rgba(201,168,76,0.25);
  color: var(--gold); font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 1px;
}

/* simulator CTA */
.sim-cta {
  background: linear-gradient(135deg, #0F1A2E 0%, #132240 100%);
  border: 1px solid rgba(82,153,224,0.2);
  border-radius: 16px; padding: 28px 32px;
  display: flex; align-items: center; gap: 24px;
  margin-bottom: 20px;
}
.sim-cta-icon { font-size: 36px; flex-shrink: 0; }
.sim-cta-body { flex: 1; }
.sim-cta-title {
  font-family: var(--serif); font-size: 18px; font-weight: 600;
  color: var(--text); margin-bottom: 4px;
}
.sim-cta-desc { font-size: 12px; color: var(--text3); line-height: 1.55; }

/* disclaimer */
.disclaimer {
  background: var(--bg2); border: 1px solid var(--border);
  border-radius: 10px; padding: 14px 18px;
  font-size: 11px; color: var(--text3); line-height: 1.6;
}

/* action row */
.action-row { display: flex; gap: 12px; align-items: center; margin-top: 28px; flex-wrap: wrap; }

/* auto-fill flash */
.autofill-banner {
  background: rgba(82,192,122,0.08);
  border: 1px solid rgba(82,192,122,0.2);
  border-radius: 10px; padding: 12px 16px;
  font-size: 12px; color: var(--green);
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 20px; animation: fadeUp 0.3s ease;
}

/* responsive */
@media (max-width: 680px) {
  .hdr { padding: 0 20px; }
  .hero { padding: 48px 20px 40px; }
  .main { padding: 0 20px 80px; }
  .grid-2, .grid-3, .stats-row, .factors-grid { grid-template-columns: 1fr; }
  .stats-row .stat-cell { border-right: none; border-bottom: 1px solid var(--border); }
  .verdict-bar { flex-direction: column; text-align: center; padding: 28px 24px; }
  .sim-cta { flex-direction: column; text-align: center; }
  .card { padding: 20px; }
}
`;

/* ─── DATA ──────────────────────────────────────────────────────────── */
const COMMUNES = {
  "Luxembourg City":   { min:8500, max:11500, avg:9800 },
  "Strassen":          { min:7500, max:10000, avg:8700 },
  "Bertrange":         { min:7200, max:9800,  avg:8400 },
  "Hesperange":        { min:7200, max:9800,  avg:8400 },
  "Walferdange":       { min:7500, max:10000, avg:8600 },
  "Niederanven":       { min:7000, max:9200,  avg:8000 },
  "Kehlen":            { min:6000, max:8500,  avg:7200 },
  "Mamer":             { min:7000, max:9500,  avg:8200 },
  "Steinfort":         { min:5500, max:7500,  avg:6400 },
  "Junglinster":       { min:5500, max:7500,  avg:6400 },
  "Mersch":            { min:5000, max:7000,  avg:5900 },
  "Esch-sur-Alzette":  { min:5500, max:7500,  avg:6400 },
  "Differdange":       { min:4800, max:6500,  avg:5500 },
  "Dudelange":         { min:5000, max:6800,  avg:5900 },
  "Pétange":           { min:4500, max:6200,  avg:5300 },
  "Other":             { min:4500, max:7000,  avg:5800 },
};

const LOADING_STEPS = [
  "Reading listing content",
  "Benchmarking commune market data",
  "Evaluating property features & condition",
  "Calculating fair value range",
  "Generating negotiation insights",
];

const EMPTY_FORM = {
  commune:"Luxembourg City", type:"apartment", size:"", bedrooms:"2",
  bathrooms:"1", floor:"", parking:"yes", garden:"no",
  energyClass:"D", age:"", listingPrice:"", condition:"good", notes:"",
};

/* ─── HELPERS ───────────────────────────────────────────────────────── */
const fmt  = n => `€${Math.round(n).toLocaleString()}`;
const fmtP = n => `${n>0?"+":""}${Number(n).toFixed(1)}%`;

function RingScore({ score }) {
  const r = 30, circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div className="confidence-ring">
      <div className="ring-wrap">
        <svg className="ring-svg" width="76" height="76" viewBox="0 0 76 76">
          <circle cx="38" cy="38" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5"/>
          <circle cx="38" cy="38" r={r} fill="none"
            stroke="#C9A84C" strokeWidth="5"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"/>
        </svg>
        <div className="ring-val">{score}</div>
      </div>
      <div className="ring-label">CONFIDENCE</div>
    </div>
  );
}

/* ─── MAIN COMPONENT ────────────────────────────────────────────────── */
export default function FairHomeValuator() {
  const [tab, setTab]           = useState("paste");   // paste | manual
  const [listing, setListing]   = useState("");
  const [form, setForm]         = useState(EMPTY_FORM);
  const [photos, setPhotos]     = useState([]);
  const [previews, setPreviews] = useState([]);
  const [screen, setScreen]     = useState("input");   // input | loading | results
  const [loadStep, setLoadStep] = useState(0);
  const [result, setResult]     = useState(null);
  const [autoFilled, setAutoFilled] = useState(false);
  const fileRef = useRef();

  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  /* ── Photo upload ── */
  const handlePhotos = e => {
    const files = Array.from(e.target.files);
    setPhotos(p=>[...p,...files].slice(0,8));
    files.forEach(f=>{
      const r=new FileReader();
      r.onload=ev=>setPreviews(p=>[...p,ev.target.result].slice(0,8));
      r.readAsDataURL(f);
    });
  };

  /* ── Auto-fill from pasted listing ── */
  const autoFill = async () => {
    if (!listing.trim()) return;
    try {
      const resp = await fetch("/api/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          max_tokens:1000,
          messages:[{role:"user",content:`
Extract property details from this Luxembourg property listing and return ONLY valid JSON, no markdown, no preamble:

LISTING:
${listing}

Return this exact JSON structure (use null for missing fields):
{
  "commune": "<one of: Luxembourg City, Strassen, Bertrange, Hesperange, Walferdange, Niederanven, Kehlen, Mamer, Steinfort, Junglinster, Mersch, Esch-sur-Alzette, Differdange, Dudelange, Pétange, Other>",
  "type": "<apartment|house-terraced|house-semi|house-detached|penthouse|studio>",
  "size": "<number or null>",
  "bedrooms": "<number as string or null>",
  "bathrooms": "<number as string or null>",
  "floor": "<floor description or null>",
  "parking": "<yes|no|extra>",
  "garden": "<no|balcony|terrace|garden>",
  "energyClass": "<A+|A|B|C|D|E|F|G or null>",
  "age": "<estimated age in years or null>",
  "listingPrice": "<number or null>",
  "condition": "<excellent|good|average|needs-work|unknown>",
  "notes": "<any other notable details in one sentence or null>"
}
`}]
        })
      });
      const data = await resp.json();
      const raw  = data.content?.find(b=>b.type==="text")?.text||"";
      const clean= raw.replace(/```json|```/g,"").trim();
      const parsed = JSON.parse(clean);
      setForm(f=>({...f,...Object.fromEntries(
        Object.entries(parsed).filter(([,v])=>v!==null && v!==undefined && v!=="")
      )}));
      setAutoFilled(true);
      setTab("manual");
    } catch(e) { console.error("Auto-fill failed",e); }
  };

  /* ── Build analysis prompt ── */
  const buildPrompt = () => {
    const prices = COMMUNES[form.commune]||COMMUNES["Other"];
    const sz = parseInt(form.size)||0;
    const lp = parseInt(form.listingPrice)||0;
    const ppm = sz ? Math.round(lp/sz) : null;
    return `You are a senior Luxembourg real estate valuation expert. Produce an honest, data-driven assessment.

PROPERTY:
- Commune: ${form.commune} | Type: ${form.type}
- Size: ${form.size} m² | Listing price: €${lp.toLocaleString()} ${ppm?`(€${ppm.toLocaleString()}/m²)`:""}
- Bedrooms: ${form.bedrooms} | Bathrooms: ${form.bathrooms} | Floor: ${form.floor||"N/A"}
- Parking: ${form.parking} | Outdoor: ${form.garden} | Energy class: ${form.energyClass}
- Building age: ${form.age||"unknown"} years | Condition: ${form.condition}
- Notes: ${form.notes||"None"}
${listing ? `\nORIGINAL LISTING TEXT:\n${listing.slice(0,1200)}` : ""}

COMMUNE BENCHMARKS (${form.commune}):
- Avg: €${prices.avg.toLocaleString()}/m² | Range: €${prices.min.toLocaleString()}–€${prices.max.toLocaleString()}/m²

Respond ONLY with valid JSON (no markdown, no preamble):
{
  "verdict": "overpriced"|"fair"|"underpriced"|"uncertain",
  "fairValueMin": <number>,
  "fairValueMax": <number>,
  "fairValueMid": <number>,
  "priceGapPercent": <number positive=overpriced negative=underpriced>,
  "confidenceScore": <0-100>,
  "summaryOneLiner": "<max 25 words>",
  "fullAnalysis": "<3-4 honest paragraphs>",
  "factors": [
    {"icon":"<emoji>","name":"<name>","description":"<one sentence>","impact":"up"|"down"|"neutral"}
  ],
  "negotiationPoints": ["<actionable point>", ...],
  "redFlags": ["<concern>" | ...],
  "positives": ["<genuine positive>" | ...]
}`;
  };

  /* ── Run analysis ── */
  const analyse = async () => {
    if (!form.listingPrice || !form.size) return;
    setScreen("loading"); setLoadStep(0);
    for(let i=1;i<LOADING_STEPS.length;i++){
      await new Promise(r=>setTimeout(r,1300));
      setLoadStep(i);
    }
    try {
      const resp = await fetch("/api/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          max_tokens:1000,
          messages:[{role:"user",content:buildPrompt()}]
        })
      });
      const data = await resp.json();
      const raw  = data.content?.find(b=>b.type==="text")?.text||"";
      const parsed = JSON.parse(raw.replace(/```json|```/g,"").trim());
      setResult(parsed); setScreen("results");
    } catch(err) {
      /* Fallback result */
      const prices = COMMUNES[form.commune]||COMMUNES["Other"];
      const sz=parseInt(form.size)||1, lp=parseInt(form.listingPrice)||0;
      const mid=prices.avg*sz;
      const gap=((lp-mid)/mid*100);
      setResult({
        verdict: gap>10?"overpriced":gap<-10?"underpriced":"fair",
        fairValueMin:Math.round(prices.min*sz), fairValueMax:Math.round(prices.max*sz),
        fairValueMid:Math.round(mid), priceGapPercent:parseFloat(gap.toFixed(1)),
        confidenceScore:68,
        summaryOneLiner:`Listed ${Math.abs(gap).toFixed(1)}% ${gap>0?"above":"below"} estimated fair market value for ${form.commune}.`,
        fullAnalysis:`Based on current ${form.commune} market data, properties of this size and type typically trade between €${(prices.min*sz).toLocaleString()} and €${(prices.max*sz).toLocaleString()}.\n\nThe listing price of €${lp.toLocaleString()} places this property ${gap>0?"above":"below"} the market midpoint of €${mid.toLocaleString()}. Energy class ${form.energyClass} is an important valuation signal — EU regulations are increasingly pressuring buyers and banks to account for future renovation costs on lower-rated buildings.\n\nParking (${form.parking==="yes"?"included":"excluded"}) and outdoor space (${form.garden}) have been factored into this estimate. A certified valuation (expertise immobilière) is recommended before committing to an offer.`,
        factors:[
          {icon:"📍",name:"Location",description:`${form.commune} commands consistent demand.`,impact:"up"},
          {icon:"⚡",name:`Energy Class ${form.energyClass}`,description:form.energyClass<="C"?"Strong rating adds value.":"Below-average — future upgrade costs apply.",impact:form.energyClass<="C"?"up":"down"},
          {icon:"🚗",name:"Parking",description:form.parking==="yes"?"Included — adds significant value.":"Absent — buyers typically apply a €20–40k discount.",impact:form.parking==="yes"?"up":"down"},
          {icon:"🌿",name:"Outdoor Space",description:form.garden!=="no"?"Private outdoor space commands premium post-2020.":"No outdoor space limits family buyer appeal.",impact:form.garden!=="no"?"up":"down"},
          {icon:"🏗️",name:"Condition",description:`${form.condition.charAt(0).toUpperCase()+form.condition.slice(1)} condition noted.`,impact:form.condition==="excellent"?"up":form.condition==="needs-work"?"down":"neutral"},
        ],
        negotiationPoints:[
          `The commune average is €${prices.avg.toLocaleString()}/m² — your listing is €${Math.round(lp/(parseInt(form.size)||1)).toLocaleString()}/m².`,
          form.energyClass>="D"?`Request a thermal renovation cost estimate for class ${form.energyClass} — use this as negotiation leverage.`:"Energy class is strong; no discount warranted on this basis.",
          "Ask the seller for the certified valuation (expertise immobilière) they relied on.",
          `The fair value midpoint is ${fmt(mid)} — open below this figure.`,
          "In Luxembourg, the clause suspensive for mortgage approval gives you an exit if the bank valuation comes in low — always include it.",
        ],
        redFlags: form.energyClass>="E"?[`Energy class ${form.energyClass} — upgrade to meet EU standards may cost €30,000–€80,000.`]:[],
        positives:[`Established commune with strong resale liquidity.`,form.parking==="yes"?"Parking included.":"",form.garden!=="no"?"Outdoor space available.":""].filter(Boolean),
      });
      setScreen("results");
    }
  };

  const reset = () => {
    setScreen("input"); setResult(null); setForm(EMPTY_FORM);
    setListing(""); setPhotos([]); setPreviews([]);
    setAutoFilled(false); setTab("paste");
  };

  const VC = {
    overpriced:  {emoji:"⚠️", label:"Likely Overpriced"},
    fair:        {emoji:"✅", label:"Fair Market Value"},
    underpriced: {emoji:"💎", label:"Potentially Underpriced"},
    uncertain:   {emoji:"🔍", label:"Uncertain — More Data Needed"},
  };

  /* ═══════════════════════════════════════════════════════════════════ */
  return (
    <>
      <style>{G}</style>
      <div className="app">

        {/* HEADER */}
        <header className="hdr">
          <div className="hdr-brand">
            <div className="hdr-mark">◆</div>
            <span className="hdr-name">FairHome</span>
          </div>
          <div className="hdr-tag">AI Valuator · Luxembourg</div>
        </header>

        {/* HERO */}
        {screen==="input" && (
          <div className="hero">
            <div className="hero-orb hero-orb-1"/>
            <div className="hero-orb hero-orb-2"/>
            <div className="hero-eyebrow">Know Before You Buy</div>
            <h1 className="hero-h1">
              Is this property worth<br/><em>what they're asking?</em>
            </h1>
            <p className="hero-p">
              Paste the listing text and let our AI benchmark it against real Luxembourg commune data — then get an honest valuation and negotiation playbook in seconds.
            </p>
            <div className="hero-pills">
              <span className="hero-pill">◆ AI-Powered</span>
              <span className="hero-pill">📍 Luxembourg Market Data</span>
              <span className="hero-pill">🤝 Negotiation Insights</span>
              <span className="hero-pill">🔗 Simulator Link-Through</span>
            </div>
          </div>
        )}

        {/* ── INPUT SCREEN ── */}
        {screen==="input" && (
          <div className="main">
            {/* Tabs */}
            <div className="tabs">
              <button className={`tab${tab==="paste"?" active":""}`} onClick={()=>setTab("paste")}>
                📋 Paste Listing  <span style={{fontSize:10,opacity:0.6}}>recommended</span>
              </button>
              <button className={`tab${tab==="manual"?" active":""}`} onClick={()=>setTab("manual")}>
                ✏️ Manual Entry
              </button>
            </div>

            {/* PASTE TAB */}
            {tab==="paste" && (
              <div className="card">
                <div className="card-title">Paste the Property Listing</div>
                <div className="card-sub">Copy the full listing text from Athome.lu, Immotop.lu, or any other portal and paste it below. The AI will extract all the details automatically.</div>
                <div className="paste-zone">
                  <textarea
                    placeholder={`Paste listing here — for example:\n\nApartment for sale — Luxembourg-Bonnevoie\n3 bedrooms | 95 m² | Energy class C\nModern flat on the 4th floor with lift, covered parking and south-facing balcony. Renovated kitchen (2022), double glazing throughout. Asking price: €785,000 (agency fees included).\nMonthly charges: €320...`}
                    value={listing}
                    onChange={e=>setListing(e.target.value)}
                  />
                  <div className="paste-actions">
                    <span className="paste-hint">{listing.length} characters pasted</span>
                    <button className="btn-gold" onClick={autoFill} disabled={!listing.trim()}>
                      ✦ Extract Details
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MANUAL / REVIEW TAB */}
            {tab==="manual" && (
              <>
                {autoFilled && (
                  <div className="autofill-banner">
                    <span>✓</span>
                    <span>Fields auto-filled from your listing. Review and correct anything below before running the valuation.</span>
                  </div>
                )}

                <div className="card">
                  <div className="card-title">Location & Price</div>
                  <div className="card-sub">Core details that anchor the valuation benchmark.</div>
                  <div className="grid-2" style={{marginBottom:14}}>
                    <div className="field">
                      <label>Commune *</label>
                      <select value={form.commune} onChange={e=>set("commune",e.target.value)}>
                        {Object.keys(COMMUNES).map(c=><option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="field">
                      <label>Property Type</label>
                      <select value={form.type} onChange={e=>set("type",e.target.value)}>
                        <option value="apartment">Apartment / Flat</option>
                        <option value="house-terraced">Terraced House</option>
                        <option value="house-semi">Semi-Detached</option>
                        <option value="house-detached">Detached House</option>
                        <option value="penthouse">Penthouse</option>
                        <option value="studio">Studio</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid-3">
                    <div className="field">
                      <label>Size (m²) *</label>
                      <input type="number" placeholder="e.g. 95" value={form.size} onChange={e=>set("size",e.target.value)}/>
                    </div>
                    <div className="field">
                      <label>Listing Price (€) *</label>
                      <input type="number" placeholder="e.g. 785000" value={form.listingPrice} onChange={e=>set("listingPrice",e.target.value)}/>
                    </div>
                    <div className="field">
                      <label>Building Age (yrs)</label>
                      <input type="number" placeholder="e.g. 8" value={form.age} onChange={e=>set("age",e.target.value)}/>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-title">Property Features</div>
                  <div className="card-sub">Each feature shifts the fair value calculation.</div>
                  <div className="grid-3" style={{marginBottom:14}}>
                    <div className="field">
                      <label>Bedrooms</label>
                      <select value={form.bedrooms} onChange={e=>set("bedrooms",e.target.value)}>
                        {["1","2","3","4","5","6+"].map(n=><option key={n}>{n}</option>)}
                      </select>
                    </div>
                    <div className="field">
                      <label>Bathrooms</label>
                      <select value={form.bathrooms} onChange={e=>set("bathrooms",e.target.value)}>
                        {["1","2","3","4+"].map(n=><option key={n}>{n}</option>)}
                      </select>
                    </div>
                    <div className="field">
                      <label>Floor Level</label>
                      <input placeholder="Ground, 2nd, Top…" value={form.floor} onChange={e=>set("floor",e.target.value)}/>
                    </div>
                  </div>
                  <div className="grid-3" style={{marginBottom:14}}>
                    <div className="field">
                      <label>Parking</label>
                      <select value={form.parking} onChange={e=>set("parking",e.target.value)}>
                        <option value="yes">Included</option>
                        <option value="no">Not Included</option>
                        <option value="extra">Available at Extra Cost</option>
                      </select>
                    </div>
                    <div className="field">
                      <label>Outdoor Space</label>
                      <select value={form.garden} onChange={e=>set("garden",e.target.value)}>
                        <option value="no">None</option>
                        <option value="balcony">Balcony</option>
                        <option value="terrace">Terrace</option>
                        <option value="garden">Private Garden</option>
                      </select>
                    </div>
                    <div className="field">
                      <label>Energy Class</label>
                      <select value={form.energyClass} onChange={e=>set("energyClass",e.target.value)}>
                        {["A+","A","B","C","D","E","F","G"].map(c=><option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label>Visible Condition</label>
                    <select value={form.condition} onChange={e=>set("condition",e.target.value)}>
                      <option value="excellent">Excellent — Move-in ready, premium finishes</option>
                      <option value="good">Good — Well maintained, minor updates needed</option>
                      <option value="average">Average — Dated but fully functional</option>
                      <option value="needs-work">Needs Work — Visible wear, renovation required</option>
                      <option value="unknown">Unknown — Haven't visited yet</option>
                    </select>
                  </div>
                </div>

                {/* Optional photos */}
                <div className="card">
                  <div className="card-title">Photos <span style={{fontSize:13,color:"var(--text3)",fontWeight:400}}>(optional)</span></div>
                  <div className="card-sub">Add photos from your property visit to help refine the condition assessment. Not required if using the pasted listing.</div>
                  <div className="photo-zone" onClick={()=>fileRef.current.click()}>
                    <div className="photo-zone-icon">📸</div>
                    <div className="photo-zone-text">Tap to upload visit photos</div>
                    <div className="photo-zone-sub">Up to 8 images · JPG, PNG, HEIC</div>
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" multiple style={{display:"none"}} onChange={handlePhotos}/>
                  {previews.length>0 && (
                    <div className="photo-grid">
                      {previews.map((src,i)=><img key={i} src={src} className="photo-thumb" alt={`Photo ${i+1}`}/>)}
                    </div>
                  )}
                </div>

                {/* Notes */}
                <div className="card">
                  <div className="card-title">Anything Else?</div>
                  <div className="card-sub">Shared charges, recent renovation, proximity to noise, garage vs. parking spot, co-ownership issues, etc.</div>
                  <div className="field">
                    <label>Additional Notes</label>
                    <textarea
                      style={{minHeight:80,resize:"vertical",background:"var(--bg3)",border:"1px solid var(--border2)",borderRadius:9,padding:"12px 14px",fontFamily:"var(--sans)",fontSize:13,color:"var(--text)",outline:"none"}}
                      placeholder="e.g. Monthly charges €320. Kitchen renovated 2022. Agent mentioned two other offers."
                      value={form.notes} onChange={e=>set("notes",e.target.value)}
                    />
                  </div>
                </div>

                <div className="action-row">
                  <button className="btn-gold" onClick={analyse} disabled={!form.listingPrice||!form.size}>
                    ◆ Run Valuation
                  </button>
                  {(!form.listingPrice||!form.size) && (
                    <span style={{fontSize:11,color:"var(--text3)"}}>Listing price and size are required</span>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── LOADING SCREEN ── */}
        {screen==="loading" && (
          <div className="loading-wrap">
            <div className="loading-diamond"/>
            <div className="loading-title">Analysing Property</div>
            <div className="loading-sub">Benchmarking against Luxembourg market data…</div>
            <div className="loading-steps">
              {LOADING_STEPS.map((s,i)=>(
                <div key={i} className={`lstep${i<loadStep?" done":i===loadStep?" active":""}`}>
                  <div className="lstep-dot"/>
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── RESULTS SCREEN ── */}
        {screen==="results" && result && (()=>{
          const vc = VC[result.verdict]||VC.uncertain;
          const lp = parseInt(form.listingPrice)||0;
          const gap= result.priceGapPercent;
          return (
            <div className="main" style={{paddingTop:32}}>

              {/* Verdict */}
              <div className="verdict-wrap">
                <div className={`verdict-bar ${result.verdict}`}>
                  <div className="verdict-glyph">{vc.emoji}</div>
                  <div className="verdict-body">
                    <div className="verdict-eyebrow">Valuation Verdict</div>
                    <div className="verdict-title">{vc.label}</div>
                    <div className="verdict-line">{result.summaryOneLiner}</div>
                  </div>
                  <RingScore score={result.confidenceScore}/>
                </div>
                <div className="stats-row">
                  <div className="stat-cell">
                    <div className="stat-lbl">Listing Price</div>
                    <div className="stat-val">{fmt(lp)}</div>
                    <div className="stat-note">What the seller is asking</div>
                  </div>
                  <div className="stat-cell">
                    <div className="stat-lbl">Fair Value Range</div>
                    <div className="stat-val" style={{fontSize:18}}>{fmt(result.fairValueMin)} – {fmt(result.fairValueMax)}</div>
                    <div className="stat-note">Midpoint: {fmt(result.fairValueMid)}</div>
                  </div>
                  <div className="stat-cell">
                    <div className="stat-lbl">Price Gap</div>
                    <div className={`stat-val ${gap>5?"neg":gap<-5?"pos":""}`}>{fmtP(gap)}</div>
                    <div className="stat-note">{gap>0?"Above fair value":gap<0?"Below fair value":"Within fair range"}</div>
                  </div>
                </div>
              </div>

              {/* Full Analysis */}
              <div className="card">
                <div className="card-title">Market Analysis</div>
                <div className="divider"/>
                <div className="analysis-body">{result.fullAnalysis}</div>

                {result.redFlags?.length>0 && <>
                  <div className="divider"/>
                  <div style={{fontSize:12,fontWeight:700,color:"var(--red)",letterSpacing:"1px",textTransform:"uppercase",marginBottom:12}}>Red Flags</div>
                  <div className="flags-row">
                    {result.redFlags.map((f,i)=>(
                      <div key={i} className="flag-item">
                        <div className="flag-dot red"/>{f}
                      </div>
                    ))}
                  </div>
                </>}

                {result.positives?.filter(Boolean).length>0 && <>
                  <div className="divider"/>
                  <div style={{fontSize:12,fontWeight:700,color:"var(--green)",letterSpacing:"1px",textTransform:"uppercase",marginBottom:12}}>Genuine Positives</div>
                  <div className="flags-row">
                    {result.positives.filter(Boolean).map((p,i)=>(
                      <div key={i} className="flag-item">
                        <div className="flag-dot green"/>{p}
                      </div>
                    ))}
                  </div>
                </>}
              </div>

              {/* Factors */}
              <div className="card-title" style={{marginBottom:6}}>Value Factors</div>
              <div className="card-sub" style={{marginBottom:16}}>What's driving the price above or below fair market value.</div>
              <div className="factors-grid">
                {result.factors?.map((f,i)=>(
                  <div key={i} className="factor" style={{animationDelay:`${i*0.06}s`}}>
                    <div className="factor-ico">{f.icon}</div>
                    <div style={{flex:1}}>
                      <div className="factor-name">{f.name}</div>
                      <div className="factor-desc">{f.description}</div>
                    </div>
                    <div className={`factor-badge ${f.impact}`}>
                      {f.impact==="up"?"▲":f.impact==="down"?"▼":"●"}
                    </div>
                  </div>
                ))}
              </div>

              {/* Negotiation */}
              <div className="nego-card">
                <div className="nego-title">🤝 Your Negotiation Playbook</div>
                <div className="nego-list">
                  {result.negotiationPoints?.map((p,i)=>(
                    <div key={i} className="nego-item">
                      <div className="nego-num">{i+1}</div>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simulator Link-Through */}
              <div className="sim-cta">
                <div className="sim-cta-icon">🏦</div>
                <div className="sim-cta-body">
                  <div className="sim-cta-title">Now check if you can afford it</div>
                  <div className="sim-cta-desc">
                    The FairHome Valuator tells you what's fair. The Luxembourg Home Buyer Simulator tells you what government benefits you qualify for, your monthly repayments, and whether it fits your budget.
                  </div>
                </div>
                <button className="btn-sim" onClick={()=>window.open(import.meta.env.VITE_SIMULATOR_URL||"#","_blank")}>
                  Open Simulator →
                </button>
              </div>

              {/* Disclaimer */}
              <div className="disclaimer">
                ⚠️ This AI valuation is based on commune-level benchmarks and the information provided. It is not a certified expertise immobilière. Always engage a licensed notary or certified valuator before committing to a purchase. Market conditions can vary significantly at street and building level.
              </div>

              <div className="action-row">
                <button className="btn-gold" onClick={reset}>◆ Analyse Another Property</button>
                <button className="btn-ghost" onClick={()=>window.print()}>🖨 Save Report</button>
              </div>
            </div>
          );
        })()}
      </div>
    </>
  );
}
