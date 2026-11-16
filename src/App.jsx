import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { PORTFOLIO_DATA } from './data/portfolioData';
import { SpotlightCard } from './components/SpotlightCard';
import { AnimatedCounter } from './components/AnimatedCounter';
import { SdvTelemetryInteractive } from './components/SdvTelemetryInteractive';
import { EltPipelineInteractive } from './components/EltPipelineInteractive';
import { CvModal } from './components/CvModal';

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('jigv-lang') || 'es');
  const [theme, setTheme] = useState(() => localStorage.getItem('jigv-theme') || 'light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);

  // Architecture active stage state
  const [p1StageIdx, setP1StageIdx] = useState(0);
  const [p2StageIdx, setP2StageIdx] = useState(0);

  // Interactive Skill Evidence Filter
  const [selectedSkillTag, setSelectedSkillTag] = useState(null);

  // Copy feedback state
  const [copiedField, setCopiedField] = useState(null);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    subject: '',
    message: '',
  });

  // Smooth spring scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  const t = PORTFOLIO_DATA[lang] || PORTFOLIO_DATA.es;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('jigv-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    document.title = t.meta.title;
    localStorage.setItem('jigv-lang', lang);
  }, [lang, t.meta.title]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const toggleLang = () => setLang((prev) => (prev === 'es' ? 'en' : 'es'));

  const handleCopyText = (val, key) => {
    navigator.clipboard.writeText(val);
    setCopiedField(key);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      contactForm.subject || 'Oportunidad Profesional — Ingeniería / Análisis de Datos'
    );
    const body = encodeURIComponent(
      `${lang === 'es' ? 'Remitente' : 'Sender'}: ${contactForm.name}\n\n${contactForm.message}`
    );
    window.location.href = `mailto:ivan.gomez.vazquez06@gmail.com?subject=${subject}&body=${body}`;
  };

  const allSkillTags = [
    'Python',
    'SQL / PostgreSQL',
    'Power BI (DAX)',
    'Apache Airflow',
    'dbt-core',
    'Docker',
    'ITIL v4',
    'Redes TCP/IP',
    'ETL / Limpieza',
    'Modelos Predictivos',
  ];

  const renderLogoLockup = (inst) => (
    <>
      {inst.logos.map((lg, idx) => (
        <React.Fragment key={lg.src}>
          {idx > 0 && <span className="inst-logo-divider" aria-hidden="true" />}
          <img src={lg.src} alt={lg.alt} className={`inst-logo-img ${lg.className}`} />
        </React.Fragment>
      ))}
      {inst.title && (
        <>
          <span className="inst-logo-divider" aria-hidden="true" />
          <div className="inst-logo-text-group">
            <span className={`inst-logo-title ${inst.cbtisTone ? 'cbtis-tone' : ''}`}>
              {inst.title}
            </span>
            {inst.sub && <span className="inst-logo-sub">{inst.sub}</span>}
          </div>
        </>
      )}
    </>
  );

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} aria-hidden="true" />

      {/* ======================================================================
          Top Navigation Bar
          ====================================================================== */}
      <header className="site-header">
        <div className="container nav-inner">
          <a href="#top" className="brand-mark" aria-label="Inicio — José Iván Gómez Vázquez">
            <span className="brand-name">José Iván Gómez Vázquez</span>
            <span className="brand-role-tag">{t.nav.roleTag}</span>
          </a>

          <nav aria-label="Navegación principal">
            <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
              <li>
                <a href="#proyectos" onClick={() => setMobileMenuOpen(false)}>
                  {t.nav.projects}
                </a>
              </li>
              <li>
                <a href="#trayectoria" onClick={() => setMobileMenuOpen(false)}>
                  {t.nav.trajectory}
                </a>
              </li>
              <li>
                <a href="#competencias" onClick={() => setMobileMenuOpen(false)}>
                  {t.nav.skills}
                </a>
              </li>
              <li>
                <a href="#contacto" onClick={() => setMobileMenuOpen(false)}>
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              onClick={toggleLang}
              className="lang-toggle"
              title={t.meta.langTooltip}
            >
              {t.meta.langLabel}
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Cambiar tema claro/oscuro"
            >
              <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
            </button>

            <button
              type="button"
              onClick={() => setCvModalOpen(true)}
              className="btn btn-outline btn-sm"
            >
              {t.nav.cvBtn}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="mobile-menu-btn"
              aria-expanded={mobileMenuOpen}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ====================================================================
            Hero Section
            ==================================================================== */}
        <section className="hero" aria-labelledby="hero-heading">
          <div className="container">
            <div className="hero-grid">
              {/* Primary Editorial Column */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="hero-kicker"
                >
                  {t.hero.kicker}
                </motion.div>

                <motion.h1
                  id="hero-heading"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.06 }}
                  className="hero-title"
                >
                  {t.hero.titleLine1} <em>{t.hero.titleEmphasis}</em> {t.hero.titleLine2}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.12 }}
                  className="hero-lead"
                >
                  {t.hero.lead}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.18 }}
                  className="hero-cta-group"
                >
                  <a href="#proyectos" className="btn btn-primary">
                    {t.hero.ctaProjects}
                  </a>
                  <button
                    type="button"
                    onClick={() => setCvModalOpen(true)}
                    className="btn btn-outline"
                  >
                    {t.hero.ctaCvModal}
                  </button>
                  <a
                    href="./assets/CV_Jose_Ivan_Gomez_Vazquez.pdf"
                    download="CV_Jose_Ivan_Gomez_Vazquez.pdf"
                    className="btn btn-outline"
                  >
                    {t.hero.ctaPdf}
                  </a>
                  <a href="#contacto" className="btn btn-outline">
                    {t.hero.ctaContact}
                  </a>
                </motion.div>

                {/* Official Institutional Logos Strip */}
                <div
                  className="inst-logos-strip tabular-nums"
                  aria-label="Instituciones de trayectoria profesional y académica"
                >
                  {t.hero.institutions.map((inst, idx) => (
                    <SpotlightCard
                      key={inst.id}
                      delay={0.22 + idx * 0.08}
                      className="inst-badge-card"
                    >
                      <div className="inst-logo-wrap">{renderLogoLockup(inst)}</div>
                      <span className="meta-label">{inst.metaLabel}</span>
                    </SpotlightCard>
                  ))}
                </div>
              </div>

              {/* Technical Dossier & Portrait Card */}
              <SpotlightCard as="aside" delay={0.2} className="hero-dossier" hoverLift={false}>
                <div className="dossier-header">
                  <span className="dossier-id">{t.hero.dossier.id}</span>
                  <span className="dossier-status">{t.hero.dossier.status}</span>
                </div>

                <div className="portrait-frame">
                  <img
                    src="./assets/profile.jpg"
                    alt="Fotografía profesional de José Iván Gómez Vázquez"
                    width="400"
                    height="480"
                    loading="eager"
                  />
                  <div className="portrait-caption">
                    <div className="portrait-caption-name">{t.hero.dossier.name}</div>
                    <div className="portrait-caption-sub">{t.hero.dossier.sub}</div>
                  </div>
                </div>

                <div className="dossier-body tabular-nums">
                  {t.hero.dossier.rows.map((r) => (
                    <div key={r.key} className="dossier-row">
                      <span className="dossier-key">{r.key}</span>
                      <span className="dossier-val">{r.val}</span>
                    </div>
                  ))}
                  <div className="dossier-row">
                    <span className="dossier-key">GITHUB</span>
                    <span className="dossier-val">
                      <a
                        href="https://github.com/TamerNarciso"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: 'var(--accent-primary)',
                          textDecoration: 'underline',
                          textUnderlineOffset: '3px',
                        }}
                      >
                        github.com/TamerNarciso ↗
                      </a>
                    </span>
                  </div>
                  <div className="dossier-row">
                    <span className="dossier-key">DOCUMENTO BASE</span>
                    <span className="dossier-val">
                      <a
                        href="./assets/CV_Jose_Ivan_Gomez_Vazquez.docx"
                        download="CV_Jose_Ivan_Gomez_Vazquez.docx"
                        style={{
                          color: 'var(--text-secondary)',
                          textDecoration: 'underline',
                          textUnderlineOffset: '3px',
                        }}
                      >
                        {t.hero.dossier.downloadDocx}
                      </a>
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            </div>

            {/* Animated Live KPI Counters Strip */}
            <div className="live-stats-ribbon tabular-nums">
              {t.hero.liveStats.map((st, idx) => (
                <SpotlightCard
                  key={st.code}
                  delay={0.3 + idx * 0.06}
                  className="live-stat-card"
                >
                  <div className="live-stat-top">
                    <span className="live-stat-number">
                      <AnimatedCounter value={st.value} suffix={st.suffix} />
                    </span>
                    <span className="live-stat-code">{st.code}</span>
                  </div>
                  <div className="live-stat-label">{st.label}</div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            Section 01 — Featured Engineering Projects
            ==================================================================== */}
        <section className="section" id="proyectos" aria-labelledby="projects-heading">
          <div className="container">
            <div className="section-header">
              <div className="section-index">{t.sec1.index}</div>
              <div className="section-title-group">
                <h2 className="section-title" id="projects-heading">
                  {t.sec1.title}
                </h2>
                <p className="section-subtitle">{t.sec1.subtitle}</p>
              </div>
            </div>

            <div className="projects-stack">
              {/* Project 01: SDV-IBN Tooling & Telemetry Hub */}
              <SpotlightCard as="article" hoverLift={false} className="project-showcase">
                <div className="project-top-bar">
                  <div>
                    <div className="project-index">{t.sec1.p1.index}</div>
                    <h3 className="project-title">{t.sec1.p1.title}</h3>
                  </div>
                  <div className="project-tech-pills">
                    <span className="tech-pill">Python (Flask)</span>
                    <span className="tech-pill">DoIP / UDS</span>
                    <span className="tech-pill">PostgreSQL (PL/pgSQL)</span>
                    <span className="tech-pill">Power BI (DAX)</span>
                    <span className="tech-pill">Docker</span>
                    <span className="tech-pill">ITIL v4</span>
                  </div>
                </div>

                <div className="project-body">
                  <div>
                    <div className="project-narrative">
                      <h4>{t.sec1.p1.problemTitle}</h4>
                      <p>{t.sec1.p1.problemDesc}</p>

                      <h4>{t.sec1.p1.archTitle}</h4>
                      <div className="arch-diagram" role="list">
                        {t.sec1.p1.archStages.map((st, idx) => (
                          <div
                            key={st.step}
                            role="listitem"
                            onClick={() => setP1StageIdx(idx)}
                            className={`arch-stage ${p1StageIdx === idx ? 'active' : ''}`}
                          >
                            <div className="arch-stage-left">
                              <span className="arch-step-badge">{st.step}</span>
                              <span className="arch-stage-name">{st.name}</span>
                            </div>
                            <span className="arch-stage-tech">{st.tech}</span>
                          </div>
                        ))}
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${lang}-p1-stage-${p1StageIdx}`}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                          className="arch-detail-box"
                          style={{ marginTop: '0.85rem' }}
                        >
                          {t.sec1.p1.archStages[p1StageIdx]?.detail}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="project-metrics-row tabular-nums">
                      {t.sec1.p1.metrics.map((m) => (
                        <div key={m.val} className="metric-box">
                          <div className="metric-val">{m.val}</div>
                          <div className="metric-desc">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Charts + Live DoIP Simulator + SQL/DAX */}
                  <SdvTelemetryInteractive t={t.sec1.p1} lang={lang} />
                </div>
              </SpotlightCard>

              {/* Project 02: PipelineELT */}
              <SpotlightCard as="article" hoverLift={false} className="project-showcase">
                <div className="project-top-bar">
                  <div>
                    <div className="project-index">{t.sec1.p2.index}</div>
                    <h3 className="project-title">{t.sec1.p2.title}</h3>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center' }}>
                    <div className="project-tech-pills">
                      <span className="tech-pill">Apache Airflow</span>
                      <span className="tech-pill">dbt-core</span>
                      <span className="tech-pill">PostgreSQL</span>
                      <span className="tech-pill">Python</span>
                      <span className="tech-pill">Docker Compose</span>
                    </div>
                    <a
                      href="https://github.com/TamerNarciso/PipelineELT"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-repo-link"
                    >
                      {t.sec1.p2.repoLinkLabel}
                    </a>
                  </div>
                </div>

                <div className="project-body">
                  <div>
                    <div className="project-narrative">
                      <h4>{t.sec1.p2.problemTitle}</h4>
                      <p>{t.sec1.p2.problemDesc}</p>

                      <h4>{t.sec1.p2.archTitle}</h4>
                      <div className="arch-diagram" role="list">
                        {t.sec1.p2.archStages.map((st, idx) => (
                          <div
                            key={st.step}
                            role="listitem"
                            onClick={() => setP2StageIdx(idx)}
                            className={`arch-stage ${p2StageIdx === idx ? 'active' : ''}`}
                          >
                            <div className="arch-stage-left">
                              <span className="arch-step-badge">{st.step}</span>
                              <span className="arch-stage-name">{st.name}</span>
                            </div>
                            <span className="arch-stage-tech">{st.tech}</span>
                          </div>
                        ))}
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${lang}-p2-stage-${p2StageIdx}`}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                          className="arch-detail-box"
                          style={{ marginTop: '0.85rem' }}
                        >
                          {t.sec1.p2.archStages[p2StageIdx]?.detail}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="project-metrics-row tabular-nums">
                      {t.sec1.p2.metrics.map((m) => (
                        <div key={m.val} className="metric-box">
                          <div className="metric-val">{m.val}</div>
                          <div className="metric-desc">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Time Series Chart + Live Airflow DAG Runner + dbt SQL */}
                  <EltPipelineInteractive t={t.sec1.p2} lang={lang} />
                </div>
              </SpotlightCard>
            </div>
          </div>
        </section>

        {/* ====================================================================
            Section 02 — Industrial Trajectory & Education
            ==================================================================== */}
        <section className="section" id="trayectoria" aria-labelledby="trajectory-heading">
          <div className="container">
            <div className="section-header">
              <div className="section-index">{t.sec2.index}</div>
              <div className="section-title-group">
                <h2 className="section-title" id="trajectory-heading">
                  {t.sec2.title}
                </h2>
                <p className="section-subtitle">{t.sec2.subtitle}</p>
              </div>
            </div>

            <div className="trajectory-grid">
              {/* Column 1: Professional Experience */}
              <div>
                <h3 className="trajectory-col-title">{t.sec2.colExp}</h3>
                <div className="timeline-list">
                  {t.sec2.experience.map((item, idx) => (
                    <SpotlightCard
                      key={item.id}
                      as="article"
                      delay={idx * 0.08}
                      className="timeline-item"
                    >
                      {item.logos.length > 0 ? (
                        <div className="timeline-logo-header">
                          <div className="timeline-logo-badge">
                            {renderLogoLockup({
                              logos: item.logos,
                              title: item.logoTitle,
                              sub: item.logoSub,
                              cbtisTone: item.cbtisTone,
                            })}
                          </div>
                          <span className="timeline-period tabular-nums">{item.period}</span>
                        </div>
                      ) : null}

                      <div className="timeline-meta tabular-nums">
                        {item.logos.length === 0 && (
                          <span className="timeline-period">{item.period}</span>
                        )}
                        <span className="timeline-org">{item.org}</span>
                      </div>
                      <h4 className="timeline-role">{item.role}</h4>
                      <p className="timeline-desc">{item.desc}</p>

                      <div className="timeline-skill-tags">
                        {item.skills.map((sk) => (
                          <button
                            key={sk}
                            type="button"
                            onClick={() => {
                              setSelectedSkillTag(sk);
                              document
                                .getElementById('competencias')
                                ?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`timeline-skill-chip ${
                              selectedSkillTag === sk ? 'active' : ''
                            }`}
                          >
                            {sk}
                          </button>
                        ))}
                      </div>
                    </SpotlightCard>
                  ))}
                </div>
              </div>

              {/* Column 2: Formal Education */}
              <div>
                <h3 className="trajectory-col-title">{t.sec2.colEdu}</h3>
                <div className="timeline-list">
                  {t.sec2.education.map((item, idx) => (
                    <SpotlightCard
                      key={item.id}
                      as="article"
                      delay={idx * 0.08}
                      className="timeline-item"
                    >
                      <div className="timeline-logo-header">
                        <div className="timeline-logo-badge">
                          {renderLogoLockup({
                            logos: item.logos,
                            title: item.logoTitle,
                            sub: item.logoSub,
                            cbtisTone: item.cbtisTone,
                          })}
                        </div>
                        <span className="timeline-period tabular-nums">{item.period}</span>
                      </div>

                      <div className="timeline-meta tabular-nums">
                        <span className="timeline-org">{item.org}</span>
                      </div>
                      <h4 className="timeline-role">{item.role}</h4>
                      <p className="timeline-desc">{item.desc}</p>

                      <div className="timeline-skill-tags">
                        {item.skills.map((sk) => (
                          <button
                            key={sk}
                            type="button"
                            onClick={() => {
                              setSelectedSkillTag(sk);
                              document
                                .getElementById('competencias')
                                ?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`timeline-skill-chip ${
                              selectedSkillTag === sk ? 'active' : ''
                            }`}
                          >
                            {sk}
                          </button>
                        ))}
                      </div>
                    </SpotlightCard>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            Section 03 — Technical Skills & Interactive Evidence Filter
            ==================================================================== */}
        <section className="section" id="competencias" aria-labelledby="skills-heading">
          <div className="container">
            <div className="section-header">
              <div className="section-index">{t.sec3.index}</div>
              <div className="section-title-group">
                <h2 className="section-title" id="skills-heading">
                  {t.sec3.title}
                </h2>
                <p className="section-subtitle">{t.sec3.subtitle}</p>
              </div>
            </div>

            {/* Interactive Evidence Filter Bar */}
            <div className="skill-filter-bar">
              <span className="skill-filter-label">{t.sec3.filterPrompt}</span>
              <div className="skill-filter-pills">
                <button
                  type="button"
                  onClick={() => setSelectedSkillTag(null)}
                  className={`skill-filter-pill ${selectedSkillTag === null ? 'active' : ''}`}
                >
                  {t.sec3.clearFilter}
                </button>
                {allSkillTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() =>
                      setSelectedSkillTag((prev) => (prev === tag ? null : tag))
                    }
                    className={`skill-filter-pill ${selectedSkillTag === tag ? 'active' : ''}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 4-Domain Technical Matrix */}
            <div className="skills-matrix">
              {t.sec3.domains.map((dom, idx) => (
                <SpotlightCard
                  key={dom.num}
                  delay={idx * 0.06}
                  className="skill-domain-card"
                >
                  <div className="skill-domain-header">
                    <div className="skill-domain-num">{dom.num}</div>
                    <h3 className="skill-domain-title">{dom.title}</h3>
                  </div>

                  <ul className="skill-items-list">
                    {dom.items.map((it) => {
                      const isHighlighted =
                        selectedSkillTag && it.tag === selectedSkillTag;
                      const isDimmed =
                        selectedSkillTag && it.tag !== selectedSkillTag;

                      return (
                        <li
                          key={it.name}
                          onClick={() =>
                            setSelectedSkillTag((prev) =>
                              prev === it.tag ? null : it.tag
                            )
                          }
                          className={`skill-item-interactive ${
                            isHighlighted ? 'highlighted' : ''
                          } ${isDimmed ? 'dimmed' : ''}`}
                        >
                          <div className="skill-item-top">
                            <span className="skill-name">{it.name}</span>
                            <span className="skill-level">{it.level}</span>
                          </div>
                          <div className="skill-evidence-row">
                            {it.usedIn.map((ev) => (
                              <span key={ev} className="skill-evidence-badge">
                                ✓ {ev}
                              </span>
                            ))}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </SpotlightCard>
              ))}
            </div>

            {/* Certifications Sub-Grid */}
            <div style={{ marginTop: '3.25rem' }}>
              <h3 className="trajectory-col-title">{t.sec3.certsTitle}</h3>
              <div className="certs-grid">
                {t.sec3.certs.map((c, idx) => (
                  <SpotlightCard
                    key={c.title}
                    as="article"
                    delay={idx * 0.08}
                    className="cert-card"
                  >
                    <div>
                      <div className="cert-issuer">{c.issuer}</div>
                      <h4 className="cert-title">{c.title}</h4>
                      <p className="cert-desc">{c.desc}</p>
                    </div>
                    <div className="cert-footer">
                      <span>{c.type}</span>
                      <span>{c.status}</span>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            Section 04 — Direct Contact & Action
            ==================================================================== */}
        <section className="section" id="contacto" aria-labelledby="contact-heading">
          <div className="container">
            <div className="section-header">
              <div className="section-index">{t.sec4.index}</div>
              <div className="section-title-group">
                <h2 className="section-title" id="contact-heading">
                  {t.sec4.title}
                </h2>
                <p className="section-subtitle">{t.sec4.subtitle}</p>
              </div>
            </div>

            <div className="contact-grid">
              <div className="contact-cards tabular-nums">
                <SpotlightCard className="contact-row-card" hoverLift={false}>
                  <div>
                    <div className="contact-row-label">{t.sec4.emailLabel}</div>
                    <div className="contact-row-val">
                      <a href="mailto:ivan.gomez.vazquez06@gmail.com">
                        ivan.gomez.vazquez06@gmail.com
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyText('ivan.gomez.vazquez06@gmail.com', 'email')
                    }
                    className="copy-btn"
                  >
                    {copiedField === 'email' ? t.sec4.copiedBtn : t.sec4.copyBtn}
                  </button>
                </SpotlightCard>

                <SpotlightCard className="contact-row-card" hoverLift={false}>
                  <div>
                    <div className="contact-row-label">{t.sec4.phoneLabel}</div>
                    <div className="contact-row-val">
                      <a href="tel:+527821690195">(+52) 782 169 0195</a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyText('+527821690195', 'phone')}
                    className="copy-btn"
                  >
                    {copiedField === 'phone' ? t.sec4.copiedBtn : t.sec4.copyBtn}
                  </button>
                </SpotlightCard>

                <SpotlightCard className="contact-row-card" hoverLift={false}>
                  <div>
                    <div className="contact-row-label">{t.sec4.githubLabel}</div>
                    <div className="contact-row-val">
                      <a
                        href="https://github.com/TamerNarciso"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        github.com/TamerNarciso
                      </a>
                    </div>
                  </div>
                  <a
                    href="https://github.com/TamerNarciso"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="copy-btn"
                  >
                    {t.sec4.openBtn}
                  </a>
                </SpotlightCard>

                <SpotlightCard className="contact-row-card" hoverLift={false}>
                  <div>
                    <div className="contact-row-label">{t.sec4.locLabel}</div>
                    <div className="contact-row-val">{t.sec4.locVal}</div>
                  </div>
                </SpotlightCard>
              </div>

              <SpotlightCard className="contact-form-card" hoverLift={false}>
                <h3 className="trajectory-col-title" style={{ marginBottom: '1rem' }}>
                  {t.sec4.formTitle}
                </h3>
                <form onSubmit={handleContactSubmit}>
                  <div className="form-group">
                    <label htmlFor="sender-name" className="form-label">
                      {t.sec4.nameLabel}
                    </label>
                    <input
                      type="text"
                      id="sender-name"
                      required
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm((f) => ({ ...f, name: e.target.value }))
                      }
                      className="form-input"
                      placeholder={t.sec4.namePlaceholder}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="sender-subject" className="form-label">
                      {t.sec4.subjectLabel}
                    </label>
                    <input
                      type="text"
                      id="sender-subject"
                      required
                      value={contactForm.subject}
                      onChange={(e) =>
                        setContactForm((f) => ({ ...f, subject: e.target.value }))
                      }
                      className="form-input"
                      placeholder={t.sec4.subjectPlaceholder}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="sender-message" className="form-label">
                      {t.sec4.msgLabel}
                    </label>
                    <textarea
                      id="sender-message"
                      required
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm((f) => ({ ...f, message: e.target.value }))
                      }
                      className="form-textarea"
                      placeholder={t.sec4.msgPlaceholder}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                  >
                    {t.sec4.submitBtn}
                  </button>
                  <p
                    style={{
                      fontSize: '0.76rem',
                      color: 'var(--text-muted)',
                      marginTop: '0.65rem',
                    }}
                  >
                    {t.sec4.formNote}
                  </p>
                </form>
              </SpotlightCard>
            </div>
          </div>
        </section>
      </main>

      {/* ======================================================================
          Footer
          ====================================================================== */}
      <footer className="site-footer">
        <div className="container footer-inner tabular-nums">
          <div>{t.footer.copy}</div>
          <div className="footer-links">
            <a
              href="https://github.com/TamerNarciso"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://github.com/TamerNarciso/PipelineELT"
              target="_blank"
              rel="noopener noreferrer"
            >
              PipelineELT
            </a>
            <a
              href="./assets/CV_Jose_Ivan_Gomez_Vazquez.pdf"
              download="CV_Jose_Ivan_Gomez_Vazquez.pdf"
            >
              {t.footer.cvPdf}
            </a>
          </div>
        </div>
      </footer>

      {/* Executive CV Modal */}
      <CvModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
        data={t}
        lang={lang}
      />
    </>
  );
}
