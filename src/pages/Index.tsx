import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const IMAGES = {
  gazebo: "https://cdn.poehali.dev/projects/b93d5f31-bf2a-48cf-9a6e-90e886445ee3/files/bc6216ff-8f1f-4983-a2fd-ec376fe7a066.jpg",
  house: "https://cdn.poehali.dev/projects/b93d5f31-bf2a-48cf-9a6e-90e886445ee3/files/32bd099d-5d42-4e04-857d-0f8895bf7d5f.jpg",
  balcony: "https://cdn.poehali.dev/projects/b93d5f31-bf2a-48cf-9a6e-90e886445ee3/files/d7f68481-53c1-4716-be66-fcbcc91ade17.jpg",
};

const PORTFOLIO = [
  { id: 1, img: IMAGES.gazebo, title: "Беседка в загородном доме", area: "48 м²", year: "2024", tag: "Беседки" },
  { id: 2, img: IMAGES.house, title: "Терраса частного дома", area: "72 м²", year: "2024", tag: "Дома" },
  { id: 3, img: IMAGES.balcony, title: "Балкон в жилом комплексе", area: "18 м²", year: "2023", tag: "Балконы" },
  { id: 4, img: IMAGES.gazebo, title: "Зимний сад беседки", area: "35 м²", year: "2023", tag: "Беседки" },
  { id: 5, img: IMAGES.house, title: "Панорамное остекление дома", area: "95 м²", year: "2024", tag: "Дома" },
  { id: 6, img: IMAGES.balcony, title: "Панорамный балкон", area: "24 м²", year: "2023", tag: "Балконы" },
];

const SERVICES = [
  { icon: "Layers", title: "Беседки и террасы", desc: "Безрамное остекление открытых зон отдыха. Создаём уютное пространство, защищённое от ветра и осадков круглый год.", price: "по запросу" },
  { icon: "Home", title: "Частные дома", desc: "Панорамное остекление фасадов, зимних садов и веранд. Максимум естественного света без потери тепла.", price: "по запросу" },
  { icon: "Building2", title: "Балконы и лоджии", desc: "Безрамные системы для квартир — элегантно, надёжно, с шумоизоляцией до 42 дБ.", price: "по запросу" },
  { icon: "Store", title: "Коммерческие объекты", desc: "Рестораны, офисы, торговые центры. Индивидуальные решения под архитектурный проект.", price: "по запросу" },
  { icon: "Flower2", title: "Зимние сады", desc: "Проектируем и остекляем зимние сады под ключ — тепло, светло и уютно в любое время года.", price: "по запросу" },
  { icon: "Tent", title: "Пергалы", desc: "Остекление пергол и навесов — открытые конструкции превращаем в комфортное всесезонное пространство.", price: "по запросу" },
  { icon: "Shield", title: "Цельностеклянные козырьки", desc: "Козырьки из закалённого стекла над входными группами, террасами и балконами. Надёжно и эстетично.", price: "по запросу" },
  { icon: "PanelTop", title: "Стеклянные ограждения", desc: "Цельностеклянные ограждения для лестниц, балконов и террас. Безопасное стекло класса триплекс.", price: "по запросу" },
];

const TAGS = ["Все", "Беседки", "Дома", "Балконы"];

type FormData = { type: string; area: string; name: string; phone: string };

const Index = () => {
  const [activeTag, setActiveTag] = useState("Все");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>({ type: "Беседки", area: "", name: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const filtered = activeTag === "Все" ? PORTFOLIO : PORTFOLIO.filter((p) => p.tag === activeTag);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const estimate = () => {
    const area = parseFloat(form.area);
    if (!area || area <= 0) return null;
    const prices: Record<string, number> = { Беседки: 4500, Дома: 6200, Балконы: 3800, Коммерция: 5000 };
    const base = prices[form.type] || 5000;
    return {
      min: (base * area).toLocaleString("ru-RU"),
      max: (base * area * 1.3).toLocaleString("ru-RU"),
    };
  };

  const cost = estimate();

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "hsl(210,20%,96%)", color: "hsl(210,25%,12%)", fontFamily: "'Golos Text', sans-serif" }}>

      {/* NAV */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, transition: "all 0.3s", ...(scrolled ? { background: "rgba(240,244,248,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid hsl(210,15%,82%)" } : {}) }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("hero")}>
            <div style={{ width: 32, height: 32, border: "1px solid #8b1a2f", transform: "rotate(45deg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 10, height: 10, background: "#8b1a2f" }} />
            </div>
            <span style={{ fontFamily: "'Cormorant', serif", fontSize: 20, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b1a2f" }}>bezram.nn</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {[["hero","Главная"],["services","Услуги"],["portfolio","Портфолио"],["calc","Расчёт"],["contacts","Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500, color: "hsl(210,15%,40%)", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#3a9ab5")}
                onMouseLeave={e => (e.currentTarget.style.color = "hsl(210,15%,40%)")}>
                {label}
              </button>
            ))}
          </nav>

          <button onClick={() => scrollTo("contacts")} className="hidden md:block" style={{ background: "#8b1a2f", color: "hsl(210,20%,96%)", padding: "9px 22px", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", border: "none", cursor: "pointer" }}>
            Связаться
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden" style={{ background: "none", border: "none", cursor: "pointer", color: "hsl(210,25%,12%)" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div style={{ background: "hsl(210,20%,93%)", borderTop: "1px solid hsl(210,15%,82%)", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
            {[["hero","Главная"],["services","Услуги"],["portfolio","Портфолио"],["calc","Расчёт"],["contacts","Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{ textAlign: "left", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500, color: "hsl(210,15%,35%)", background: "none", border: "none", cursor: "pointer", padding: "4px 0" }}>
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={IMAGES.house} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.22 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, hsl(210,20%,96%) 30%, rgba(240,244,248,0.6) 70%, rgba(240,244,248,0.2))" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, hsl(210,20%,96%) 0%, transparent 50%)" }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 w-full" style={{ paddingTop: 120, paddingBottom: 80 }}>
          <div style={{ maxWidth: 620 }}>
            <div className="animate-fade-in flex items-center gap-3 mb-6" style={{ animationDelay: "0.1s", opacity: 0 }}>
              <div style={{ height: 1, width: 40, background: "#3a9ab5" }} />
              <span style={{ color: "#3a9ab5", fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", fontWeight: 500 }}>Безрамное остекление</span>
            </div>

            <h1 className="animate-fade-up" style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(42px,7vw,76px)", fontWeight: 300, lineHeight: 1.1, marginBottom: 24, animationDelay: "0.2s", opacity: 0 }}>
              Ваш дом без<br />
              <em style={{ color: "#3a9ab5", fontStyle: "normal" }}>границ и рамок</em>
            </h1>

            <p className="animate-fade-up" style={{ color: "hsl(210,10%,58%)", fontSize: 17, lineHeight: 1.7, marginBottom: 36, maxWidth: 500, animationDelay: "0.35s", opacity: 0 }}>
              Профессиональный монтаж безрамных стеклянных систем для беседок, домов и балконов. Более 500 реализованных проектов.
            </p>

            <div className="animate-fade-up flex flex-wrap gap-4" style={{ animationDelay: "0.5s", opacity: 0 }}>
              <button onClick={() => scrollTo("calc")} style={{ background: "#8b1a2f", color: "hsl(210,20%,96%)", padding: "13px 32px", fontWeight: 700, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", border: "none", cursor: "pointer" }}>
                Рассчитать стоимость
              </button>
              <button onClick={() => scrollTo("portfolio")} style={{ background: "transparent", color: "hsl(210,20%,85%)", padding: "13px 32px", fontWeight: 500, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", border: "1px solid rgba(58,154,181,0.3)", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#3a9ab5"; e.currentTarget.style.color = "#3a9ab5"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(58,154,181,0.3)"; e.currentTarget.style.color = "hsl(210,20%,85%)"; }}>
                Смотреть работы
              </button>
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-6" style={{ position: "absolute", bottom: 80, right: 24 }}>
            {[["500+","Проектов"],["16","Лет опыта"],["100%","Гарантия"]].map(([num, label]) => (
              <div key={label} style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'Cormorant', serif", fontSize: 34, color: "#3a9ab5", fontWeight: 300, lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: 11, color: "hsl(210,10%,45%)", letterSpacing: "0.25em", textTransform: "uppercase", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)" }} className="animate-bounce">
          <Icon name="ChevronDown" size={20} style={{ color: "hsl(210,10%,35%)" }} />
        </div>
      </section>

      {/* STATS */}
      <div style={{ borderTop: "1px solid hsl(210,15%,82%)", borderBottom: "1px solid hsl(210,15%,82%)", background: "hsl(210,20%,92%)" }}>
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[["500+","выполненных проектов"],["16 лет","опыта на рынке"],["от 1 года","гарантия на монтаж"],["48 ч","срок выезда замерщика"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(22px,3vw,32px)", color: "#3a9ab5", fontWeight: 300 }}>{v}</div>
              <div style={{ fontSize: 11, color: "hsl(210,15%,40%)", marginTop: 4, letterSpacing: "0.05em" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="py-24 max-w-6xl mx-auto px-6">
        <div style={{ marginBottom: 52 }}>
          <div className="flex items-center gap-3" style={{ marginBottom: 14 }}>
            <div style={{ height: 1, width: 40, background: "#3a9ab5" }} />
            <span style={{ color: "#3a9ab5", fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase" }}>Наши услуги</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 300 }}>Что мы делаем</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SERVICES.map((s) => (
            <div key={s.title} className="hover-lift" style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(58,154,181,0.25)", padding: "32px", cursor: "default", transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(58,154,181,0.55)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(58,154,181,0.25)"; }}>
              <div style={{ width: 48, height: 48, border: "1px solid rgba(58,154,181,0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <Icon name={s.icon} fallback="Square" size={20} style={{ color: "#3a9ab5" }} />
              </div>
              <h3 style={{ fontFamily: "'Cormorant', serif", fontSize: 24, fontWeight: 300, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ color: "hsl(210,15%,40%)", fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>{s.desc}</p>
              <div style={{ color: "#3a9ab5", fontSize: 13, fontWeight: 600, letterSpacing: "0.05em" }}>{s.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" style={{ paddingTop: 80, paddingBottom: 80, borderTop: "1px solid hsl(210,15%,82%)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ marginBottom: 36 }}>
            <div className="flex items-center gap-3" style={{ marginBottom: 14 }}>
              <div style={{ height: 1, width: 40, background: "#3a9ab5" }} />
              <span style={{ color: "#3a9ab5", fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase" }}>Наши работы</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
              <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 300 }}>Портфолио</h2>
              <div className="flex gap-2 flex-wrap">
                {TAGS.map((tag) => (
                  <button key={tag} onClick={() => setActiveTag(tag)} style={{ padding: "6px 16px", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, border: `1px solid ${activeTag === tag ? "#8b1a2f" : "hsl(210,15%,20%)"}`, background: activeTag === tag ? "#8b1a2f" : "transparent", color: activeTag === tag ? "hsl(210,20%,96%)" : "hsl(210,15%,40%)", cursor: "pointer", transition: "all 0.2s" }}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item) => (
              <div key={item.id} onClick={() => setLightbox(item.id)} style={{ position: "relative", cursor: "pointer", overflow: "hidden" }}
                className="group">
                <img src={item.img} alt={item.title} style={{ width: "100%", height: 260, objectFit: "cover", transition: "transform 0.5s" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
                <div className="portfolio-overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,16,22,0.95) 0%, rgba(12,16,22,0.1) 60%, transparent)", opacity: 0, transition: "opacity 0.3s", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 20 }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "0")}>
                  <div style={{ color: "#3a9ab5", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 4 }}>{item.tag}</div>
                  <div style={{ fontFamily: "'Cormorant', serif", fontSize: 18, fontWeight: 300, color: "#fff" }}>{item.title}</div>
                  <div style={{ color: "hsl(210,10%,58%)", fontSize: 12, marginTop: 4 }}>{item.area} · {item.year}</div>
                </div>
                <div style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, background: "#3a9ab5", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.3s" }}>
                  <Icon name="Expand" size={14} style={{ color: "hsl(210,15%,6%)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox !== null && (() => {
        const item = PORTFOLIO.find((p) => p.id === lightbox)!;
        return (
          <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(12,16,22,0.97)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", maxWidth: 900, width: "100%" }}>
              <img src={item.img} alt={item.title} style={{ width: "100%", maxHeight: "72vh", objectFit: "contain" }} />
              <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ color: "#3a9ab5", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 4 }}>{item.tag}</div>
                  <div style={{ fontFamily: "'Cormorant', serif", fontSize: 24, fontWeight: 300, color: "hsl(210,20%,92%)" }}>{item.title}</div>
                  <div style={{ color: "hsl(210,10%,50%)", fontSize: 13, marginTop: 4 }}>{item.area} · {item.year}</div>
                </div>
                <button onClick={() => setLightbox(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "hsl(210,10%,55%)", padding: 4 }}>
                  <Icon name="X" size={24} />
                </button>
              </div>

              <button onClick={() => setLightbox(prev => prev !== null && prev > 1 ? prev - 1 : PORTFOLIO.length)} style={{ position: "absolute", left: -48, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "hsl(210,10%,55%)" }}
                className="hidden md:block">
                <Icon name="ChevronLeft" size={32} />
              </button>
              <button onClick={() => setLightbox(prev => prev !== null && prev < PORTFOLIO.length ? prev + 1 : 1)} style={{ position: "absolute", right: -48, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "hsl(210,10%,55%)" }}
                className="hidden md:block">
                <Icon name="ChevronRight" size={32} />
              </button>
            </div>
          </div>
        );
      })()}

      {/* CALCULATOR */}
      <section id="calc" style={{ paddingTop: 80, paddingBottom: 80, borderTop: "1px solid hsl(210,15%,82%)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ marginBottom: 52 }}>
            <div className="flex items-center gap-3" style={{ marginBottom: 14 }}>
              <div style={{ height: 1, width: 40, background: "#3a9ab5" }} />
              <span style={{ color: "#3a9ab5", fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase" }}>Онлайн-расчёт</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 300 }}>Рассчитайте стоимость</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div style={{ background: "rgba(255,255,255,0.95)", border: "1px solid rgba(58,154,181,0.2)", padding: 36 }}>
              {!submitted ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div>
                    <label style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "hsl(210,10%,52%)", display: "block", marginBottom: 12 }}>Тип объекта</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Беседки","Дома","Балконы","Коммерция"].map((t) => (
                        <button key={t} onClick={() => setForm({ ...form, type: t })} style={{ padding: "10px 8px", fontSize: 13, border: `1px solid ${form.type === t ? "#8b1a2f" : "hsl(210,15%,78%)"}`, background: form.type === t ? "rgba(139,26,47,0.08)" : "transparent", color: form.type === t ? "#8b1a2f" : "hsl(210,15%,40%)", cursor: "pointer", letterSpacing: "0.05em", transition: "all 0.2s" }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "hsl(210,10%,52%)", display: "block", marginBottom: 10 }}>Площадь остекления (м²)</label>
                    <input type="number" placeholder="Например: 24" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} style={{ width: "100%", background: "hsl(210,20%,98%)", border: "1px solid hsl(210,15%,78%)", outline: "none", padding: "12px 16px", color: "hsl(210,25%,12%)", fontSize: 15, boxSizing: "border-box" }} onFocus={e => (e.currentTarget.style.borderColor = "#3a9ab5")} onBlur={e => (e.currentTarget.style.borderColor = "hsl(210,15%,78%)")} />
                  </div>

                  {cost && (
                    <div style={{ border: "1px solid rgba(58,154,181,0.3)", background: "rgba(58,154,181,0.07)", padding: 20 }}>
                      <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#3a9ab5", marginBottom: 8 }}>Предварительная стоимость</div>
                      <div style={{ fontFamily: "'Cormorant', serif", fontSize: 32, fontWeight: 300 }}>{cost.min} — {cost.max} ₽</div>
                      <div style={{ fontSize: 12, color: "hsl(210,15%,40%)", marginTop: 6 }}>Точная цена — после бесплатного замера</div>
                    </div>
                  )}

                  <div style={{ borderTop: "1px solid hsl(210,15%,82%)", paddingTop: 20, display: "flex", flexDirection: "column", gap: 14 }}>
                    <div>
                      <label style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "hsl(210,10%,52%)", display: "block", marginBottom: 8 }}>Ваше имя</label>
                      <input type="text" placeholder="Имя" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ width: "100%", background: "hsl(210,20%,98%)", border: "1px solid hsl(210,15%,78%)", outline: "none", padding: "12px 16px", color: "hsl(210,25%,12%)", fontSize: 15, boxSizing: "border-box" }} onFocus={e => (e.currentTarget.style.borderColor = "#3a9ab5")} onBlur={e => (e.currentTarget.style.borderColor = "hsl(210,15%,78%)")} />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "hsl(210,10%,52%)", display: "block", marginBottom: 8 }}>Телефон</label>
                      <input type="tel" placeholder="+7 (___) ___-__-__" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={{ width: "100%", background: "hsl(210,20%,98%)", border: "1px solid hsl(210,15%,78%)", outline: "none", padding: "12px 16px", color: "hsl(210,25%,12%)", fontSize: 15, boxSizing: "border-box" }} onFocus={e => (e.currentTarget.style.borderColor = "#3a9ab5")} onBlur={e => (e.currentTarget.style.borderColor = "hsl(210,15%,78%)")} />
                    </div>
                    <button onClick={() => { if (form.name && form.phone) setSubmitted(true); }} disabled={!form.name || !form.phone} style={{ width: "100%", background: form.name && form.phone ? "#8b1a2f" : "rgba(139,26,47,0.3)", color: "hsl(210,20%,96%)", padding: "14px", fontWeight: 700, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", border: "none", cursor: form.name && form.phone ? "pointer" : "not-allowed", transition: "opacity 0.2s" }}>
                      Получить точный расчёт
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ width: 64, height: 64, border: "1px solid #3a9ab5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                    <Icon name="Check" size={28} style={{ color: "#3a9ab5" }} />
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant', serif", fontSize: 26, fontWeight: 300, marginBottom: 12 }}>Заявка принята!</h3>
                  <p style={{ color: "hsl(210,10%,52%)", fontSize: 14, lineHeight: 1.7 }}>Наш менеджер свяжется с вами в течение 30 минут и согласует удобное время для бесплатного замера.</p>
                </div>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <h3 style={{ fontFamily: "'Cormorant', serif", fontSize: 26, fontWeight: 300 }}>Как проходит работа</h3>
              {[
                { n: "01", title: "Бесплатный замер", desc: "Выезжаем в течение 48 часов. Замеряем, консультируем, подбираем оптимальное решение." },
                { n: "02", title: "Точный расчёт", desc: "Составляем смету с учётом всех материалов и работ. Без скрытых доплат." },
                { n: "03", title: "Производство", desc: "Изготовление закалённого стекла под ваши размеры на собственном производстве." },
                { n: "04", title: "Монтаж и сдача", desc: "Профессиональный монтаж за 1–3 дня. Принимаете работу и получаете гарантийный паспорт." },
              ].map((step) => (
                <div key={step.n} style={{ display: "flex", gap: 20 }}>
                  <div style={{ fontFamily: "'Cormorant', serif", fontSize: 40, color: "#3a9ab5", opacity: 0.38, fontWeight: 300, lineHeight: 1, flexShrink: 0, width: 44 }}>{step.n}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, letterSpacing: "0.05em", marginBottom: 4, color: "hsl(210,25%,15%)" }}>{step.title}</div>
                    <div style={{ color: "hsl(210,15%,40%)", fontSize: 14, lineHeight: 1.7 }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" style={{ paddingTop: 80, paddingBottom: 80, borderTop: "1px solid hsl(210,15%,82%)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ marginBottom: 48 }}>
            <div className="flex items-center gap-3" style={{ marginBottom: 14 }}>
              <div style={{ height: 1, width: 40, background: "#3a9ab5" }} />
              <span style={{ color: "#3a9ab5", fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase" }}>Контакты</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 300 }}>Свяжитесь с нами</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5" style={{ marginBottom: 40 }}>
            {[
              { icon: "Phone", title: "Телефон", val: "+7 (951) 913-80-63", sub: "Пн–Пт: 9:00–19:00" },
              { icon: "MapPin", title: "Адрес", val: "Нижний Новгород, ул. Карла Маркса, 22", sub: "Открыть на картах", link: "https://yandex.ru/maps/?text=Нижний+Новгород+улица+Карла+Маркса+22" },
              { icon: "Mail", title: "E-mail", val: "rds-nn@mail.ru", sub: "Ответим за 2 часа" },
              { icon: "Send", title: "Telegram", val: "@Ostekleniebezram", sub: "Написать в Telegram", link: "https://t.me/Ostekleniebezram" },
            ].map((c) => (
              <div key={c.title} style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(58,154,181,0.25)", padding: 28 }}>
                <div style={{ width: 42, height: 42, border: "1px solid rgba(58,154,181,0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Icon name={c.icon} fallback="Square" size={18} style={{ color: "#3a9ab5" }} />
                </div>
                <div style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "hsl(210,15%,40%)", marginBottom: 8 }}>{c.title}</div>
                <div style={{ fontWeight: 600, color: "hsl(210,25%,12%)", marginBottom: 4 }}>{c.val}</div>
                {'link' in c
                  ? <a href={c.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#3a9ab5", textDecoration: "underline", cursor: "pointer" }}>{c.sub}</a>
                  : <div style={{ fontSize: 12, color: "hsl(210,15%,40%)" }}>{c.sub}</div>
                }
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(58,154,181,0.08)", border: "1px solid rgba(58,154,181,0.35)", padding: "40px 48px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
            <div>
              <h3 style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(22px,3.5vw,32px)", fontWeight: 300, marginBottom: 8 }}>Бесплатный замер — уже сегодня</h3>
              <p style={{ color: "hsl(210,15%,40%)", fontSize: 14 }}>Оставьте заявку и мы перезвоним в течение 30 минут</p>
            </div>
            <button onClick={() => scrollTo("calc")} style={{ flexShrink: 0, background: "#8b1a2f", color: "hsl(210,20%,96%)", padding: "13px 32px", fontWeight: 700, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
              Заказать замер
            </button>
          </div>
        </div>
      </section>

      {/* FLOATING BUTTONS */}
      <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 99, display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Звонок */}
        <a href="tel:+79519138063"
          style={{ width: 56, height: 56, borderRadius: "50%", background: "#8b1a2f", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(139,26,47,0.4)", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", textDecoration: "none" }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.1)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 28px rgba(139,26,47,0.55)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(139,26,47,0.4)"; }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.58 1 1 0 01-.25 1.01l-2.2 2.2z"/>
          </svg>
        </a>
        {/* Макс */}
        <a href="https://max.ru/+79519138063" target="_blank" rel="noopener noreferrer"
          style={{ width: 56, height: 56, borderRadius: "50%", background: "#FF6B00", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(255,107,0,0.4)", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", textDecoration: "none" }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.1)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 28px rgba(255,107,0,0.55)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(255,107,0,0.4)"; }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H6v-2h12v2zm0-3H6V7h12v2z"/>
          </svg>
        </a>
        {/* Telegram */}
        <a href="https://t.me/Ostekleniebezram" target="_blank" rel="noopener noreferrer"
          style={{ width: 56, height: 56, borderRadius: "50%", background: "#229ED9", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(34,158,217,0.4)", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", textDecoration: "none" }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.1)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 28px rgba(34,158,217,0.55)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(34,158,217,0.4)"; }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.93 6.686l-1.683 7.927c-.126.567-.459.706-.93.44l-2.56-1.887-1.235 1.188c-.137.137-.251.251-.514.251l.184-2.6 4.733-4.276c.206-.183-.045-.285-.32-.102L7.78 14.596l-2.52-.786c-.548-.171-.558-.548.114-.811l9.857-3.8c.457-.165.857.112.7.487z"/>
          </svg>
        </a>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid hsl(210,15%,82%)", padding: "28px 24px" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div style={{ width: 24, height: 24, border: "1px solid #8b1a2f", transform: "rotate(45deg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 8, height: 8, background: "#8b1a2f" }} />
            </div>
            <span style={{ fontFamily: "'Cormorant', serif", fontSize: 18, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b1a2f" }}>bezram.nn</span>
          </div>
          <div style={{ fontSize: 12, color: "hsl(210,15%,40%)", letterSpacing: "0.05em" }}>© 2024 bezram.nn. Безрамное остекление</div>
          <div className="flex gap-6">
            {[["Услуги","services"],["Портфолио","portfolio"],["Контакты","contacts"]].map(([l, id]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{ fontSize: 11, color: "hsl(210,15%,40%)", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.15em", textTransform: "uppercase", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#3a9ab5")}
                onMouseLeave={e => (e.currentTarget.style.color = "hsl(210,15%,40%)")}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;