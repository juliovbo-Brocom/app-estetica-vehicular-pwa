import React, { useMemo, useState, useEffect } from 'react'

const BRANDS = [
  {
    id: 'alcance',
    name: 'Alcance Pro',
    origin: 'Brasil',
    tagline: 'Soluciones técnicas para detalladores exigentes',
    products: [
      { id: 'a-supera', name: 'Supera (Protección para cuero)', type: 'Interior', desc: 'Cuidado y sellado de superficies de cuero.' },
      { id: 'a-comp', name: 'Compuesto Corte Rápido', type: 'Corrección', desc: 'Elimina defectos moderados a severos.' },
      { id: 'a-fin', name: 'Polish de Acabado', type: 'Acabado', desc: 'Refina y realza el brillo final.' },
    ],
  },
  {
    id: 'evo-auto',
    name: 'Evo Auto',
    origin: 'Brasil',
    tagline: 'Químicos y soluciones para lavaderos y profesionales',
    products: [
      { id: 'e-shampoo', name: 'Shampoo Neutro Concentrado', type: 'Lavado', desc: 'Alto poder de espuma, pH balanceado.' },
      { id: 'e-degreaser', name: 'Desengrasante Citrus', type: 'Limpieza', desc: 'APC cítrico para múltiples superficies.' },
      { id: 'e-sealant', name: 'Sellador Sintético', type: 'Protección', desc: 'Protección rápida con brillo duradero.' },
    ],
  },
  {
    id: 'mothers',
    name: 'Mothers',
    origin: 'USA',
    tagline: 'Brillo premium para entusiastas y profesionales',
    products: [
      { id: 'm-cleaner', name: 'All-Purpose Cleaner', type: 'Limpieza', desc: 'Multiusos para interior/exterior.' },
      { id: 'm-wax', name: 'Carnauba Wax', type: 'Protección', desc: 'Cera carnauba de alto brillo.' },
      { id: 'm-shampoo', name: 'pH Neutral Shampoo', type: 'Lavado', desc: 'Champú suave, pH balanceado.' },
    ],
  },
  {
    id: 'shine-mate',
    name: 'Shine Mate',
    origin: 'China',
    tagline: 'Pulidoras, lijadoras y pads de alto rendimiento',
    products: [
      { id: 's-da15', name: 'Pulidora DA 15mm', type: 'Máquinas', desc: 'Órbita 15 mm, estable y eficiente.' },
      { id: 's-pad-foam', name: 'Pads de espuma (varias durezas)', type: 'Accesorios', desc: 'Desde corte a acabado.' },
    ],
  },
  {
    id: 'bosike',
    name: 'Bosike',
    origin: 'Uruguay',
    tagline: 'Nuestra marca – packs y soluciones a medida',
    products: [
      { id: 'b-kit-starter', name: 'Kit Starter Detail', type: 'Kits', desc: 'Ideal para iniciar con alto impacto.' },
      { id: 'b-aroma', name: 'Aromatizante Premium', type: 'Interior', desc: 'Fragancia duradera, interior fresco.' },
    ],
  },
   {
  id: "fireball",
  name: "Fireball",
  origin: "Corea del Sur",
  tagline: "Coatings cerámicos y acabados premium",
  products: [
    // ===== CERÁMICOS (pintura / llantas / vidrio) =====
    {
      id: "fb-aegis",
      name: "Aegis Ceramic Coating",
      type: "Cerámico",
      surface: "Pintura",
      desc: "Revestimiento cerámico de alta durabilidad y gran resistencia química. Brillo profundo y alta repelencia.",
      img: "/brands/fireball/aegis.png"
    },
    {
      id: "fb-dokdo",
      name: "Dok Do (2 capas)",
      type: "Cerámico",
      surface: "Pintura",
      desc: "Sistema de doble capa para protección extendida y dureza superior. Ideal para acabados profesionales.",
      img: "/brands/fireball/dokdo.png"
    },
    {
      id: "fb-quartz",
      name: "Quartz Coating",
      type: "Cerámico",
      surface: "Pintura",
      desc: "Coating cerámico versátil con excelente brillo y facilidad de mantenimiento. Gran relación rendimiento/uso.",
      img: "/brands/fireball/quartz.png"
    },
    {
      id: "fb-talon",
      name: "Talon (Wheels & Calipers)",
      type: "Cerámico",
      surface: "Llantas",
      desc: "Cerámico específico para llantas y pinzas, resistente a altas temperaturas y polvo de freno.",
      img: "/brands/fireball/talon.png"
    },
    {
      id: "fb-glass",
      name: "Glass Coating",
      type: "Cerámico",
      surface: "Vidrio",
      desc: "Revestimiento para parabrisas y cristales. Mejora la visibilidad bajo lluvia con fuerte efecto hidrofóbico.",
      img: "/brands/fireball/glass.png"
    },

    // ===== CERAS (paste/híbridas) =====
    {
      id: "fb-devilsblood",
      name: "Devil’s Blood",
      type: "Cera",
      surface: "Pintura",
      desc: "Cera/sellador híbrido de alto brillo y profundidad visual. Excelente beading y tacto suave.",
      img: "/brands/fireball/devils-blood.png"
    },
    {
      id: "fb-carnauba",
      name: "Carnauba Paste Wax",
      type: "Cera",
      surface: "Pintura",
      desc: "Cera premium a base de carnauba para un acabado cálido tipo show-car.",
      img: "/brands/fireball/carnauba.png"
    }
  ]
}
];

const TRAININGS = [
  {
    id: 't-entusiastas',
    title: 'Cuidado Vehicular para Entusiastas',
    level: 'Inicial',
    mode: 'Presencial / Online',
    duration: '3h',
    nextDate: '2025-10-18',
    spots: 20,
    outline: ['Lavado correcto', 'Mantenimiento seguro', 'Protecciones básicas', 'Checklist de rutina'],
  },
  {
    id: 't-lavaderos',
    title: 'Capacitación integral para Lavaderos',
    level: 'Intermedio',
    mode: 'Presencial',
    duration: '6h',
    nextDate: '2025-11-05',
    spots: 16,
    outline: ['Flujo de trabajo rentable', 'Seguridad química', 'Estandarización de procesos', 'Up-sell de servicios'],
  },
  {
    id: 't-pulido',
    title: 'Curso de Pulido',
    level: 'Intermedio/Avanzado',
    mode: 'Presencial',
    duration: '8h',
    nextDate: '2025-11-20',
    spots: 10,
    outline: ['Evaluación de pintura', 'Compuestos y pads', 'DA y rotativa', 'Control de polvo y hologramas'],
  },
  {
    id: 't-pro-detailing',
    title: 'Curso integral Detailing Profesional',
    level: 'Avanzado',
    mode: 'Presencial / Online',
    duration: '12h',
    nextDate: '2025-12-04',
    spots: 12,
    outline: ['Diagnóstico completo', 'Corrección multi-etapas', 'Protecciones (ceras/seles/coatings)', 'Entrega y fidelización'],
  },
];

const RESOURCES = [
  { id: 'r-yt', title: 'Canal YouTube Detailing (referentes)', url: 'https://www.youtube.com', tag: 'Video' },
  { id: 'r-foro', title: 'Foro Detailing World', url: 'https://www.detailingworld.co.uk', tag: 'Comunidad' },
  { id: 'r-ig', title: 'Instagram – Tendencias Car Care', url: 'https://www.instagram.com', tag: 'Redes' },
  { id: 'r-blog', title: 'Blog técnico – Corrección y protección', url: 'https://example.com/blog', tag: 'Artículo' },
];

const CONTACT = {
  email: 'info@brocom.com.uy',
  phone: '+598 96686810',
  site: 'https://www.brocom.com.uy',
  whatsapp: 'https://wa.me/59896686810'
};

const useLocal = (key, initial) => {
  const [value, setValue] = useState(() => {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : initial; } catch { return initial; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }, [key, value]);
  return [value, setValue];
};

function useStreak() {
  const [data, setData] = useLocal('ev.streak', { lastOpen: null, count: 0, best: 0 });
  useEffect(() => {
    const today = new Date(); const t = today.toDateString();
    if (!data.lastOpen) { setData({ lastOpen: t, count: 1, best: 1 }); return; }
    const last = new Date(data.lastOpen);
    const diff = Math.round((today - last)/(1000*60*60*24));
    if (diff === 0) return;
    if (diff === 1) setData({ lastOpen: t, count: data.count + 1, best: Math.max(data.best, data.count + 1) });
    if (diff > 1) setData({ lastOpen: t, count: 1, best: Math.max(data.best, 1) });
  }, []);
  return data;
}

function Header({ tab, setTab }) {
  const streak = useStreak();
  return (
    <div className="header">
      <div className="header-inner">
        <div className="logo">
          <div className="logo-badge">EV</div>
          <div>
            <div style={{fontWeight:600}}>Gestión Estética Vehicular</div>
            <div className="muted">Productos · Capacitaciones · Consultas</div>
          </div>
        </div>
        <div className="badge">🔥 {streak.count}d</div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <div className="hero">
      <div className="hero-ink"></div>
      <div className="hero-inner">
        <h1>Todo tu mundo de Estética Vehicular en un solo lugar</h1>
        <div className="muted">Catálogo · Talleres · Consultas · Links</div>
      </div>
    </div>
  )
}

function Tabs({ tab, setTab }) {
  const tabs = [
    { id:'brands', label:'Marcas' },
    { id:'training', label:'Capacita' },
    { id:'ask', label:'Consulta' },
    { id:'links', label:'Links' },
  ];
  return (
    <div className="tabs">
      {tabs.map(t => (
        <div key={t.id} className={"tab " + (tab===t.id?'active':'')} onClick={() => setTab(t.id)}>{t.label}</div>
      ))}
    </div>
  )
}

function BrandCatalog() {
  const [q, setQ] = useState("");
  const [brandFilter, setBrandFilter] = useState("TODAS");
  const [favs, setFavs] = useLocal("ev.favs", []);

  // Lista de marcas para los chips de filtro
  const brandNames = useMemo(
    () => ["TODAS", ...BRANDS.map((b) => b.name)],
    []
  );

  // Aplano productos con su marca
  const items = useMemo(
    () =>
      BRANDS.flatMap((b) =>
        b.products.map((p) => ({
          ...p,
          brand: b.name,
          origin: b.origin,
          brandId: b.id,
        }))
      ),
    []
  );

  // Filtro por texto + marca
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return items.filter((i) => {
      const matchText =
        !t ||
        (i.name + " " + i.type + " " + i.brand).toLowerCase().includes(t);
      const matchBrand =
        brandFilter === "TODAS" || i.brand === brandFilter;
      return matchText && matchBrand;
    });
  }, [q, items, brandFilter]);

  const toggleFav = (id) =>
    setFavs((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div className="grid grid-1">
      {/* Buscador */}
      <div className="card" style={{ padding: "8px 10px" }}>
        <input
          placeholder="Buscar producto o marca"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {/* Chips de marcas */}
      <div className="card" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {brandNames.map((bn) => {
          const active = brandFilter === bn;
          return (
            <button
              key={bn}
              onClick={() => setBrandFilter(bn)}
              className="btn"
              style={{
                padding: "6px 10px",
                borderRadius: 999,
                background: active ? "#fff" : "#1b1c20",
                color: active ? "#000" : "#e8e8ea",
                borderColor: active ? "#fff" : "#2a2b31",
                fontSize: 13,
              }}
            >
              {bn}
            </button>
          );
        })}
      </div>

      {/* Resultados */}
      {filtered.map((it) => (
        <div className="card brand" key={it.id}>
          <div>
            <div style={{ fontWeight: 600 }}>
              {it.name} <span className="pill">{it.type}</span>
            </div>
            <div className="muted">{it.brand} · {it.origin}</div>
            <div className="muted" style={{ marginTop: 6 }}>{it.desc}</div>
            <div className="row" style={{ gap: 8, marginTop: 10 }}>
              <button className="btn">Ver ficha</button>
              <button className="btn ghost" onClick={() => toggleFav(it.id)}>
                {favs.includes(it.id) ? "★ Favorito" : "☆ Favorito"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


function TrainingList() {
  return (
    <div className="grid grid-1">
      {TRAININGS.map(t => (
        <div className="card" key={t.id}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
            <div style={{fontWeight:600}}>{t.title}</div>
            <div className="pill">{t.level}</div>
          </div>
          <div className="muted">{t.duration} · {t.mode}</div>
          <div className="muted" style={{marginTop:6}}>Próxima fecha: <b>{new Date(t.nextDate).toLocaleDateString()}</b> · Cupos: {t.spots}</div>
          <ul style={{marginTop:6}}>
            {t.outline.map((i,idx)=>(<li key={idx} className="muted">{i}</li>))}
          </ul>
          <div className="row" style={{gap:8, marginTop:10}}>
            <button className="btn primary">Reservar cupo</button>
            <button className="btn">Programa completo</button>
          </div>
        </div>
      ))}
    </div>
  )
}

function AskForm() {
  const [topic,setTopic] = useState('');
  const [brand,setBrand] = useState('');
  const [message,setMessage] = useState('');
  const canSend = topic.trim().length>=4 && message.trim().length>=10;
  const submit = (e) => {
    e.preventDefault();
    if (!canSend) return;
    const to = 'info@brocom.com.uy';
    const subject = encodeURIComponent(`[Consulta] ${topic}${brand? ' – '+brand:''}`);
    const body = encodeURIComponent(message);
    const url = `mailto:${to}?subject=${subject}&body=${body}`;
    window.location.href = url;
  }
  return (
    <div className="card">
      <div style={{fontWeight:600, marginBottom:6}}>Enviar consulta técnica o comercial</div>
      <div className="muted" style={{marginBottom:10}}>Cuanta más info, mejor podremos ayudarte.</div>
      <form onSubmit={submit} className="grid grid-1" style={{gap:8}}>
        <input placeholder="Tema / Asunto (ej: duda sobre Supera en cuero)" value={topic} onChange={e=>setTopic(e.target.value)} />
        <input placeholder="Marca (opcional)" value={brand} onChange={e=>setBrand(e.target.value)} />
        <textarea placeholder="Escribe tu consulta: producto, superficie, condiciones, objetivo..." value={message} onChange={e=>setMessage(e.target.value)} />
        <div className="row" style={{gap:8}}>
          <button className="btn primary" type="submit" disabled={!canSend}>Enviar</button>
          <a className="btn" href={CONTACT.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </form>
    </div>
  )
}

function LinksHub() {
  const [q,setQ] = useState('');
  const [favs,setFavs] = useLocal('ev.link.favs', []);
  const filtered = useMemo(()=>{
    const t = q.trim().toLowerCase();
    if (!t) return RESOURCES;
    return RESOURCES.filter(r => (r.title+' '+r.tag).toLowerCase().includes(t));
  },[q]);
  const toggle = (id)=> setFavs(p => p.includes(id) ? p.filter(x=>x!==id) : [...p,id]);
  return (
    <div className="grid grid-1">
      <div className="card" style={{padding:'8px 10px'}}>
        <input placeholder="Buscar recursos" value={q} onChange={e=>setQ(e.target.value)} />
      </div>
      {filtered.map(r => (
        <div className="card" key={r.id}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <div>
              <div style={{fontWeight:600}}>{r.title}</div>
              <div className="muted">{r.tag}</div>
            </div>
            <button className="btn" onClick={()=>toggle(r.id)}>{favs.includes(r.id)?'★':''} Guardar</button>
          </div>
          <div style={{marginTop:8}}><a href={r.url} target="_blank" rel="noreferrer">Abrir recurso</a></div>
        </div>
      ))}
    </div>
  )
}

function BottomNav({ tab, setTab }) {
  const items = [
    { id:'brands', label:'Marcas' },
    { id:'training', label:'Capacita' },
    { id:'ask', label:'Consulta' },
    { id:'links', label:'Links' },
  ];
  return (
    <div className="bottomnav">
      <div className="bottomnav-inner">
        {items.map(i => (
          <div key={i.id} className={'bn-item '+(tab===i.id?'active':'')} onClick={()=>setTab(i.id)}>{i.label}</div>
        ))}
      </div>
    </div>
  )
}
// --- Install Banner (PWA) ---
function isStandalone() {
  const mq = window.matchMedia?.("(display-mode: standalone)")?.matches;
  const iosStandalone = window.navigator.standalone === true;
  return mq || iosStandalone;
}
function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}
function InstallBanner() {
  const [visible, setVisible] = React.useState(false);
  const [deferred, setDeferred] = React.useState(null);

  React.useEffect(() => {
    if (isStandalone()) return;
    const dismissedAt = Number(localStorage.getItem("ev.install.dismissedAt") || 0);
    if (Date.now() - dismissedAt < 7 * 24 * 60 * 60 * 1000) return;

    const onBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferred(e);
      setVisible(true);
    };

    if (isIOS()) setVisible(true);
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
  }, []);

  const close = () => {
    setVisible(false);
    localStorage.setItem("ev.install.dismissedAt", String(Date.now()));
  };
  const onInstallClick = async () => {
    if (deferred) {
      await deferred.prompt();
      await deferred.userChoice;
      setDeferred(null);
      close();
    }
  };

  if (!visible) return null;

  const box = {
    position: "fixed", left: 12, right: 12, bottom: 12, zIndex: 60,
    background: "#111418", color: "#fff", border: "1px solid #2a2b31",
    borderRadius: 14, padding: 12, boxShadow: "0 8px 30px rgba(0,0,0,.35)"
  };
  const btn = {
    borderRadius: 10, padding: "8px 12px", border: "1px solid #2a2b31",
    background: "#fff", color: "#000", cursor: "pointer", fontSize: 14
  };
  const btnGhost = { ...btn, background: "transparent", color: "#e8e8ea" };

  return (
    <div style={box}>
      <div style={{display:"flex", justifyContent:"space-between", gap:8, alignItems:"center"}}>
        <div style={{fontWeight:600}}>Instalá la App de Brocom</div>
        <button onClick={close} style={{...btnGhost, padding:"4px 8px"}}>✕</button>
      </div>
      {!isIOS() ? (
        <>
          <div style={{margin:"6px 0 10px"}}>
            Agregala a tu pantalla de inicio para acceso rápido y uso sin barra del navegador.
          </div>
          <div style={{display:"flex", gap:8}}>
            <button onClick={onInstallClick} style={btn}>📲 Instalar</button>
            <button onClick={close} style={btnGhost}>Ahora no</button>
          </div>
        </>
      ) : (
        <>
          <div style={{margin:"6px 0 10px"}}>
            En Safari, tocá <b>Compartir</b> → <b>Agregar a pantalla de inicio</b>.
          </div>
          <div style={{display:"flex", gap:8}}>
            <button onClick={close} style={btn}>Entendido</button>
          </div>
        </>
      )}
    </div>
  );
}
export default function App() {
  const [tab,setTab] = useLocal('ev.tab','brands');
  return (
    <div>
      <Header tab={tab} setTab={setTab} />
      <div className="container">
        <Hero />
        <Tabs tab={tab} setTab={setTab} />
        {tab==='brands' && <BrandCatalog />}
        {tab==='training' && <TrainingList />}
        {tab==='ask' && <AskForm />}
        {tab==='links' && <LinksHub />}
        <div className="footer">
          © {new Date().getFullYear()} Brocom S.A. · Estética Vehicular · <a href={CONTACT.site} target="_blank" rel="noreferrer">www.brocom.com.uy</a>
          <div style={{marginTop:6}}>Contacto: <a href={"mailto:"+CONTACT.email}>{CONTACT.email}</a> · {CONTACT.phone}</div>
        </div>
      </div>
      <BottomNav tab={tab} setTab={setTab} />
    </div>
  )
}
