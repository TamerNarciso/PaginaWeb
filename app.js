/**
 * José Iván Gómez Vázquez — Portfolio Interactive Logic (v2)
 * Features:
 * 1. Light / Dark Editorial Theme Toggle
 * 2. Bilingual Switcher (ES | EN) across the entire portfolio
 * 3. Interactive SVG Data Visualizations:
 *    - SDV-IBN: Pareto of DTCs & Takt Time (60s) vs. Real Cycle Chart (Nominal vs. P1 Fault Injection)
 *    - PipelineELT: Close Price vs. SMA-30 Time Series Chart in MXN across tickers
 * 4. Integrated 1-Page Executive CV Viewer Modal + PDF / DOCX Downloads
 * 5. Project Category Filtering & Architecture Node Inspection
 */

document.addEventListener('DOMContentLoaded', () => {
  /* --------------------------------------------------------------------------
     1. Theme Toggle (Editorial Light <-> Carbon Dark)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const rootEl = document.documentElement;

  const savedTheme = localStorage.getItem('jigv-theme') || 'light';
  rootEl.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = rootEl.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      rootEl.setAttribute('data-theme', next);
      localStorage.setItem('jigv-theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
  }

  /* --------------------------------------------------------------------------
     2. Bilingual Switcher (ES | EN)
     -------------------------------------------------------------------------- */
  const i18nDict = {
    es: {
      'nav.projects': '01. Proyectos',
      'nav.trajectory': '02. Trayectoria',
      'nav.skills': '03. Stack & Certificaciones',
      'nav.contact': '04. Contacto',
      'nav.viewCv': 'Ver / Descargar CV',
      'hero.kicker1': 'INGENIERÍA EN CIENCIAS DE LA COMPUTACIÓN',
      'hero.kicker2': 'ANALISTA E INGENIERO DE DATOS',
      'hero.title': 'Arquitectura de datos, automatización operativa y <em>analítica aplicada</em> a la industria.',
      'hero.lead': 'Soy <strong>José Iván Gómez Vázquez</strong>. Perfil analítico y técnico con experiencia en el ciclo completo de los datos: desde la extracción, automatización de flujos y desarrollo de software en <strong>Python y SQL</strong>, hasta la implementación de modelos dimensionales, sistemas de telemetría en tiempo real y tableros ejecutivos en <strong>Power BI, Tableau y Metabase</strong>.',
      'hero.ctaProjects': 'Explorar Proyectos e Ingeniería →',
      'hero.ctaCvModal': 'Ver CV Ejecutivo (PDF / Word)',
      'hero.ctaContact': 'Contactar',
      'hero.meta1Label': 'Extracción Python/TCP → SQL/dbt → BI & Modelos Predictivos',
      'hero.meta2Label': 'Prácticas en Planeación – Ingeniería Industrial (Digitalización)',
      'hero.meta3Label': 'Ingeniero en Ciencias de la Computación & Técnico en Programación',
      'dossier.status': '● DISPONIBLE',
      'dossier.locKey': 'UBICACIÓN',
      'dossier.specKey': 'ESPECIALIDAD',
      'dossier.specVal': 'Data Analytics · ELT · Automatización',
      'dossier.stackKey': 'STACK BASE',
      'dossier.langKey': 'IDIOMAS',
      'dossier.langVal': 'Español (Nativo) · Inglés (B1/B2)',
      'sec1.index': '01 / PROYECTOS',
      'sec1.title': 'Sistemas de Datos, Telemetría y Automatización',
      'sec1.subtitle': 'Cada proyecto resuelve un cuello de botella operativo real combinando ingeniería de datos robusta, integridad transaccional en SQL y visualización orientada a decisiones. Interactúa con las gráficas y paneles técnicos de cada caso.',
      'filter.all': 'Todos los Proyectos (3)',
      'filter.dataEng': 'Data Engineering & ELT',
      'filter.telemetry': 'Telemetría & Sistemas SDV',
      'filter.bi': 'Automatización Industrial & BI',
      'p1.cat': 'AUTOMOTRIZ / TELEMETRÍA SDV & GESTIÓN ITIL v4',
      'p1.summary': 'Ecosistema integral de puesta en marcha electrónica (<em>Inbetriebnahme — IBN</em>) para vehículos definidos por software (SDV), diseñado para asegurar la trazabilidad diagnóstica en línea de producción, tolerancia a fallos y visibilidad ejecutiva en tiempo real.',
      'p1.tab1': '1. Gráfica Pareto & Simulador P1',
      'p1.tab2': '2. Flujo de Arquitectura',
      'p1.tab3': '3. Lógica PL/pgSQL & DAX',
      'p1.btnNominal': 'Operación Nominal',
      'p1.btnFault': 'Inyectar Fallo P1',
      'p2.cat': 'DATA ENGINEERING / PIPELINE ELT & MODELADO DIMENSIONAL',
      'p2.title': 'Pipeline ELT de Datos Financieros con Airflow, dbt y PostgreSQL',
      'p2.summary': 'Arquitectura <strong>ELT por lotes</strong> contenerizada en Docker que extrae diariamente precios históricos OHLCV de acciones y tipos de cambio oficiales del Banco Central Europeo, almacena datos crudos con idempotencia garantizada y construye un modelo dimensional analítico con <strong>dbt</strong>.',
      'p2.tab1': '1. Serie SMA-30 & Marts (MXN)',
      'p2.tab2': '2. Linaje de Datos (ELT)',
      'p2.tab3': '3. SQL / Modelo dbt',
      'p3.cat': 'INDUSTRIA AUTOMOTRIZ / PLANEACIÓN – INGENIERÍA INDUSTRIAL',
      'p3.title': 'Digitalización y Automatización de Procesos de Planeación — AUDI México',
      'p3.summary': 'Proyecto desarrollado dentro del área de <strong>Planeación – Ingeniería Industrial en AUDI México</strong>, enfocado en unificar múltiples bases de datos operativas de distintas fuentes para eliminar el procesamiento manual y habilitar la visualización ejecutiva automatizada.',
      'sec2.index': '02 / TRAYECTORIA',
      'sec2.title': 'Experiencia en Industria y Formación Académica',
      'sec2.subtitle': 'Combinación sólida de fundamentos en Ciencias de la Computación y experiencia práctica resolviendo problemas operativos en entornos industriales de alta exigencia.',
      'sec2.colExp': 'Experiencia Profesional e Industrial',
      'sec2.colEdu': 'Educación Formal',
      'sec3.index': '03 / COMPETENCIAS',
      'sec3.title': 'Ecosistema Técnico y Certificaciones',
      'sec3.subtitle': 'Dominio de herramientas especializadas para cada etapa del flujo de valor del dato: captura, transformación gobernada, automatización y visualización ejecutiva.',
      'sec4.index': '04 / CONTACTO',
      'sec4.title': 'Conversemos sobre Datos, Ingeniería y Nuevos Proyectos',
      'sec4.subtitle': 'Disponible para posiciones de Analista de Datos, Ingeniero de Datos, Business Intelligence o Automatización de Procesos en México o modalidad remota.'
    },
    en: {
      'nav.projects': '01. Projects',
      'nav.trajectory': '02. Experience',
      'nav.skills': '03. Stack & Certifications',
      'nav.contact': '04. Contact',
      'nav.viewCv': 'View / Download CV',
      'hero.kicker1': 'B.S. IN COMPUTER SCIENCE ENGINEERING',
      'hero.kicker2': 'DATA ANALYST & DATA ENGINEER',
      'hero.title': 'Data architecture, operational automation & <em>applied industrial analytics</em>.',
      'hero.lead': 'I am <strong>José Iván Gómez Vázquez</strong>. Analytical and technical profile experienced across the full data lifecycle: from data extraction, workflow automation, and software development in <strong>Python and SQL</strong>, to dimensional modeling with <strong>dbt / Airflow</strong>, real-time telemetry systems, and executive dashboards in <strong>Power BI, Tableau, and Metabase</strong>.',
      'hero.ctaProjects': 'Explore Engineering Projects →',
      'hero.ctaCvModal': 'View Executive CV (PDF / Word)',
      'hero.ctaContact': 'Get in Touch',
      'hero.meta1Label': 'Python/TCP Extraction → SQL/dbt → BI & Predictive Models',
      'hero.meta2Label': 'Industrial Engineering & Planning Internship (Process Digitalization)',
      'hero.meta3Label': 'Computer Science Engineer (BUAP) & Software Technician',
      'dossier.status': '● AVAILABLE',
      'dossier.locKey': 'LOCATION',
      'dossier.specKey': 'FOCUS',
      'dossier.specVal': 'Data Analytics · ELT · Automation',
      'dossier.stackKey': 'CORE STACK',
      'dossier.langKey': 'LANGUAGES',
      'dossier.langVal': 'Spanish (Native) · English (Intermediate)',
      'sec1.index': '01 / PROJECTS',
      'sec1.title': 'Data Systems, Telemetry & Industrial Automation',
      'sec1.subtitle': 'Each project solves a real operational bottleneck by combining resilient data engineering, transactional SQL integrity, and decision-oriented visualization. Interact with the live charts and technical workbenches below.',
      'filter.all': 'All Projects (3)',
      'filter.dataEng': 'Data Engineering & ELT',
      'filter.telemetry': 'Telemetry & SDV Systems',
      'filter.bi': 'Industrial Automation & BI',
      'p1.cat': 'AUTOMOTIVE / SDV TELEMETRY & ITIL v4 AUTOMATION',
      'p1.summary': 'End-to-end electronic commissioning (<em>Inbetriebnahme — IBN</em>) ecosystem for Software-Defined Vehicles (SDV), engineered for production line diagnostic traceability, fault tolerance, and real-time executive visibility.',
      'p1.tab1': '1. Pareto Chart & P1 Simulator',
      'p1.tab2': '2. Architecture Flow',
      'p1.tab3': '3. PL/pgSQL & DAX Logic',
      'p1.btnNominal': 'Nominal Operation',
      'p1.btnFault': 'Inject P1 Fault',
      'p2.cat': 'DATA ENGINEERING / BATCH ELT & DIMENSIONAL MODELING',
      'p2.title': 'Financial Data ELT Pipeline with Airflow, dbt & PostgreSQL',
      'p2.summary': 'Dockerized <strong>batch ELT architecture</strong> that extracts daily OHLCV stock prices and European Central Bank FX rates, performs idempotent raw loading in PostgreSQL 16, and builds an analytical star schema with <strong>dbt-core</strong>.',
      'p2.tab1': '1. SMA-30 Chart & Marts (MXN)',
      'p2.tab2': '2. Data Lineage (ELT)',
      'p2.tab3': '3. SQL / dbt Model',
      'p3.cat': 'AUTOMOTIVE INDUSTRY / INDUSTRIAL ENGINEERING PLANNING',
      'p3.title': 'Planning Process Digitalization & Automation — AUDI México',
      'p3.summary': 'Developed within the <strong>Industrial Engineering Planning department at AUDI México</strong>, unifying multiple heterogeneous operational databases to eliminate manual processing and enable automated executive visualization.',
      'sec2.index': '02 / EXPERIENCE & EDUCATION',
      'sec2.title': 'Industrial Experience & Academic Background',
      'sec2.subtitle': 'Strong Computer Science foundations paired with hands-on industrial experience solving operational data problems.',
      'sec2.colExp': 'Professional & Industrial Experience',
      'sec2.colEdu': 'Formal Education',
      'sec3.index': '03 / SKILLS & CERTIFICATIONS',
      'sec3.title': 'Technical Ecosystem & Credentials',
      'sec3.subtitle': 'Specialized tooling across every stage of the data value chain: ingestion, governed transformation, workflow orchestration, and executive BI.',
      'sec4.index': '04 / CONTACT',
      'sec4.title': 'Let’s Discuss Data, Engineering & New Opportunities',
      'sec4.subtitle': 'Available for Data Analyst, Data Engineer, Business Intelligence, or Process Automation roles in Mexico or remote.'
    }
  };

  let currentLang = localStorage.getItem('jigv-lang') || 'es';
  const langToggleBtn = document.getElementById('lang-toggle-btn');

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('jigv-lang', lang);
    document.documentElement.setAttribute('lang', lang);

    const dict = i18nDict[lang] || i18nDict.es;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key]) el.innerHTML = dict[key];
    });

    if (langToggleBtn) {
      langToggleBtn.innerHTML = lang === 'es'
        ? '<span class="lang-active">ES</span><span>/</span><span>EN</span>'
        : '<span>ES</span><span>/</span><span class="lang-active">EN</span>';
    }
  }

  applyLanguage(currentLang);

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      applyLanguage(currentLang === 'es' ? 'en' : 'es');
    });
  }

  /* --------------------------------------------------------------------------
     3. Mobile Menu Toggle
     -------------------------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinksContainer = document.getElementById('nav-links-list');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. Project Category Filtering & Workbench Tabs
     -------------------------------------------------------------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach((card) => {
        const categories = (card.getAttribute('data-categories') || '').split(' ');
        if (category === 'all' || categories.includes(category)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  const workbenchTabs = document.querySelectorAll('.workbench-tab');
  workbenchTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetPaneId = tab.getAttribute('data-target');
      const parentWorkbench = tab.closest('.project-workbench');
      if (!parentWorkbench) return;

      parentWorkbench.querySelectorAll('.workbench-tab').forEach((t) => t.classList.remove('active'));
      parentWorkbench.querySelectorAll('.workbench-pane').forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(targetPaneId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  const archStages = document.querySelectorAll('.arch-stage');
  archStages.forEach((stage) => {
    stage.addEventListener('click', () => {
      const flowContainer = stage.closest('.workbench-pane');
      if (!flowContainer) return;

      flowContainer.querySelectorAll('.arch-stage').forEach((s) => s.classList.remove('active'));
      stage.classList.add('active');

      const detailBox = flowContainer.querySelector('.arch-detail-box');
      const detailText = stage.getAttribute('data-detail');
      if (detailBox && detailText) detailBox.textContent = detailText;
    });
  });

  /* --------------------------------------------------------------------------
     5. Interactive SVG Chart 01: SDV-IBN Pareto of DTCs & Takt Time Simulator
     -------------------------------------------------------------------------- */
  const sdvChartContainer = document.getElementById('sdv-chart-svg-wrap');
  const sdvNormalBtn = document.getElementById('sdv-mode-normal');
  const sdvFaultBtn = document.getElementById('sdv-mode-fault');
  const sdvFtqEl = document.getElementById('sdv-sim-ftq');
  const sdvTaktEl = document.getElementById('sdv-sim-takt');
  const sdvMttrEl = document.getElementById('sdv-sim-mttr');
  const sdvNodeEl = document.getElementById('sdv-sim-node');
  const sdvLogEl = document.getElementById('sdv-sim-log');

  function renderSdvParetoChart(isFault) {
    if (!sdvChartContainer) return;
    // Station cycle times & DTC Pareto bars
    const bars = isFault
      ? [
          { code: 'U0100 (P1)', val: 64.7, pct: 48, color: '#C84B31' },
          { code: 'P0562 (Volt)', val: 54.0, pct: 74, color: '#1D5C52' },
          { code: 'B10A2 (CAN)', val: 51.2, pct: 90, color: '#1D5C52' },
          { code: 'C0035 (ABS)', val: 48.5, pct: 100, color: '#1D5C52' }
        ]
      : [
          { code: 'U0100 (Comm)', val: 58.2, pct: 36, color: '#1D5C52' },
          { code: 'P0562 (Volt)', val: 53.4, pct: 65, color: '#1D5C52' },
          { code: 'B10A2 (CAN)', val: 50.8, pct: 86, color: '#1D5C52' },
          { code: 'C0035 (ABS)', val: 47.9, pct: 100, color: '#1D5C52' }
        ];

    const svgHtml = `
      <svg viewBox="0 0 420 145" role="img" aria-label="Gráfica de Pareto de DTCs y Takt Time">
        <!-- Takt Limit Line (60.0s) -->
        <line x1="36" y1="32" x2="395" y2="32" stroke="#C84B31" stroke-width="1.3" stroke-dasharray="4 3" />
        <text x="392" y="27" text-anchor="end" font-family="monospace" font-size="8.5" fill="#C84B31">Takt Limit: 60.0s</text>

        <!-- Baseline -->
        <line x1="36" y1="115" x2="395" y2="115" stroke="currentColor" stroke-opacity="0.2" stroke-width="1" />

        ${bars.map((b, idx) => {
          const x = 58 + idx * 84;
          const h = Math.round((b.val / 72) * 95);
          const y = 115 - h;
          return `
            <g>
              <rect x="${x}" y="${y}" width="42" height="${h}" rx="3" fill="${b.color}" fill-opacity="0.88" />
              <text x="${x + 21}" y="${y - 5}" text-anchor="middle" font-family="monospace" font-size="9" font-weight="600" fill="currentColor">${b.val}s</text>
              <text x="${x + 21}" y="130" text-anchor="middle" font-family="monospace" font-size="8.5" fill="currentColor" fill-opacity="0.75">${b.code}</text>
            </g>
          `;
        }).join('')}

        <!-- Pareto Cumulative Curve -->
        <polyline
          fill="none"
          stroke="#D9822B"
          stroke-width="2"
          points="${bars.map((b, idx) => `${79 + idx * 84},${110 - Math.round(b.pct * 0.78)}`).join(' ')}"
        />
        ${bars.map((b, idx) => {
          const cx = 79 + idx * 84;
          const cy = 110 - Math.round(b.pct * 0.78);
          return `<circle cx="${cx}" cy="${cy}" r="3" fill="#D9822B" />`;
        }).join('')}
      </svg>
    `;
    sdvChartContainer.innerHTML = svgHtml;
  }

  renderSdvParetoChart(false);

  if (sdvNormalBtn && sdvFaultBtn) {
    sdvNormalBtn.addEventListener('click', () => {
      sdvNormalBtn.classList.add('active');
      sdvFaultBtn.classList.remove('active');
      if (sdvFtqEl) sdvFtqEl.textContent = '98.4% FTQ';
      if (sdvTaktEl) sdvTaktEl.textContent = '58.2s / 60.0s';
      if (sdvMttrEl) sdvMttrEl.textContent = '1.8 min';
      if (sdvNodeEl) sdvNodeEl.textContent = 'PRIMARY-GW (Activo)';
      if (sdvLogEl) {
        sdvLogEl.textContent = '[DoIP/UDS Gateway] Trama 0x22 F190 validada (CRC32 + PKI OK) → Telemetría nominal en Andon Web.';
      }
      renderSdvParetoChart(false);
    });

    sdvFaultBtn.addEventListener('click', () => {
      sdvFaultBtn.classList.add('active');
      sdvNormalBtn.classList.remove('active');
      if (sdvFtqEl) sdvFtqEl.textContent = 'Alerta P1 (DTC U0100)';
      if (sdvTaktEl) sdvTaktEl.textContent = '64.7s (Excede Takt)';
      if (sdvMttrEl) sdvMttrEl.textContent = '0.4 min (Auto-Failover)';
      if (sdvNodeEl) sdvNodeEl.textContent = 'MIRROR-GW (Conmutado)';
      if (sdvLogEl) {
        sdvLogEl.textContent = '[PL/pgSQL Trigger trg_itil_p1_incident] Paro P1 detectado → Workaround sugerido + Failover a Servidor Espejo ejecutado.';
      }
      renderSdvParetoChart(true);
    });
  }

  /* --------------------------------------------------------------------------
     6. Interactive SVG Chart 02: Financial ELT Time-Series & SMA-30 Inspector
     -------------------------------------------------------------------------- */
  const tickerData = {
    'WALMEX.MX': {
      company: 'Walmart de México y Centroamérica',
      closeMxn: '$64.85 MXN',
      ytdReturn: '+11.42%',
      vol30d: '18.6%',
      series: [59.2, 60.1, 59.8, 61.4, 62.0, 61.7, 63.1, 63.9, 64.2, 64.85],
      sma30:  [58.8, 59.3, 59.6, 60.2, 60.8, 61.2, 61.9, 62.5, 63.1, 63.70],
      log: '[dbt marts.agg_ticker_performance] ticker=WALMEX.MX | fx_factor=1.0000 | status=OK (Idempotent Upsert)'
    },
    'AAPL': {
      company: 'Apple Inc. (NASDAQ · FX BCE)',
      closeMxn: '$4,612.30 MXN',
      ytdReturn: '+19.85%',
      vol30d: '21.3%',
      series: [4120, 4190, 4165, 4280, 4350, 4410, 4390, 4495, 4560, 4612.3],
      sma30:  [4080, 4120, 4150, 4195, 4240, 4290, 4330, 4385, 4440, 4498.0],
      log: '[dbt int_fx_rates_daily] ticker=AAPL | usd_mxn=20.1450 (forward-fill activo) | marts.fct_returns actualizado'
    },
    'MSFT': {
      company: 'Microsoft Corp. (NASDAQ · FX BCE)',
      closeMxn: '$8,940.15 MXN',
      ytdReturn: '+16.20%',
      vol30d: '19.8%',
      series: [8150, 8290, 8240, 8410, 8520, 8490, 8680, 8790, 8860, 8940.15],
      sma30:  [8090, 8160, 8210, 8280, 8360, 8420, 8500, 8590, 8680, 8765.0],
      log: '[dbt marts.fct_daily_prices] ticker=MSFT | incremental_lookback=10d | 0 tests fallidos en dbt build'
    },
    'BTC-USD': {
      company: 'Bitcoin / USD (Convertido a MXN)',
      closeMxn: '$1,842,500 MXN',
      ytdReturn: '+68.40%',
      vol30d: '46.2%',
      series: [1420, 1490, 1460, 1580, 1640, 1610, 1720, 1790, 1765, 1842.5],
      sma30:  [1380, 1415, 1445, 1485, 1530, 1565, 1610, 1660, 1705, 1750.0],
      log: '[Airflow DAG financial_elt] ticker=BTC-USD | ventana deslizante 7d completada | Metabase sync OK'
    }
  };

  const eltChartContainer = document.getElementById('elt-chart-svg-wrap');
  const tickerSelectBtns = document.querySelectorAll('.elt-ticker-btn');
  const eltCompanyEl = document.getElementById('elt-sim-company');
  const eltCloseEl = document.getElementById('elt-sim-close');
  const eltYtdEl = document.getElementById('elt-sim-ytd');
  const eltVolEl = document.getElementById('elt-sim-vol');
  const eltLogEl = document.getElementById('elt-sim-log');

  function renderEltPriceChart(tickerKey) {
    if (!eltChartContainer) return;
    const info = tickerData[tickerKey] || tickerData['WALMEX.MX'];
    const allVals = [...info.series, ...info.sma30];
    const minV = Math.min(...allVals);
    const maxV = Math.max(...allVals);
    const span = maxV - minV || 1;

    const toPoints = (arr) =>
      arr
        .map((v, i) => {
          const x = 30 + i * 40;
          const y = 112 - Math.round(((v - minV) / span) * 82);
          return `${x},${y}`;
        })
        .join(' ');

    const pricePts = toPoints(info.series);
    const smaPts = toPoints(info.sma30);

    eltChartContainer.innerHTML = `
      <svg viewBox="0 0 420 135" role="img" aria-label="Serie de Cierre vs Media Móvil SMA-30 en MXN">
        <line x1="25" y1="115" x2="395" y2="115" stroke="currentColor" stroke-opacity="0.2" stroke-width="1" />
        <line x1="25" y1="30" x2="395" y2="30" stroke="currentColor" stroke-opacity="0.08" stroke-width="1" />
        <line x1="25" y1="72" x2="395" y2="72" stroke="currentColor" stroke-opacity="0.08" stroke-width="1" />

        <!-- SMA-30 Dashed Line -->
        <polyline fill="none" stroke="#1D5C52" stroke-width="2" stroke-dasharray="5 3" points="${smaPts}" />

        <!-- Daily Close Price Solid Line -->
        <polyline fill="none" stroke="#C84B31" stroke-width="2.4" points="${pricePts}" />

        ${info.series.map((v, i) => {
          const x = 30 + i * 40;
          const y = 112 - Math.round(((v - minV) / span) * 82);
          return `<circle cx="${x}" cy="${y}" r="3" fill="#C84B31" />`;
        }).join('')}

        <text x="30" y="128" font-family="monospace" font-size="8.5" fill="currentColor" fill-opacity="0.65">S-10</text>
        <text x="210" y="128" text-anchor="middle" font-family="monospace" font-size="8.5" fill="currentColor" fill-opacity="0.65">Sesiones (marts.fct_returns)</text>
        <text x="390" y="128" text-anchor="end" font-family="monospace" font-size="8.5" fill="currentColor" fill-opacity="0.65">Hoy (${info.closeMxn})</text>
      </svg>
    `;
  }

  renderEltPriceChart('WALMEX.MX');

  tickerSelectBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const t = btn.getAttribute('data-ticker');
      const info = tickerData[t];
      if (!info) return;

      tickerSelectBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      if (eltCompanyEl) eltCompanyEl.textContent = info.company;
      if (eltCloseEl) eltCloseEl.textContent = info.closeMxn;
      if (eltYtdEl) eltYtdEl.textContent = info.ytdReturn;
      if (eltVolEl) eltVolEl.textContent = info.vol30d;
      if (eltLogEl) eltLogEl.textContent = info.log;

      renderEltPriceChart(t);
    });
  });

  /* --------------------------------------------------------------------------
     7. Integrated CV Viewer Modal (1-Page Executive CV + PDF/DOCX Download)
     -------------------------------------------------------------------------- */
  const cvModalBackdrop = document.getElementById('cv-modal-backdrop');
  const openCvBtns = document.querySelectorAll('.js-open-cv-modal');
  const closeCvBtn = document.getElementById('close-cv-modal-btn');

  openCvBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (cvModalBackdrop) cvModalBackdrop.classList.add('open');
    });
  });

  if (closeCvBtn && cvModalBackdrop) {
    closeCvBtn.addEventListener('click', () => {
      cvModalBackdrop.classList.remove('open');
    });

    cvModalBackdrop.addEventListener('click', (e) => {
      if (e.target === cvModalBackdrop) {
        cvModalBackdrop.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') cvModalBackdrop.classList.remove('open');
    });
  }

  /* --------------------------------------------------------------------------
     8. Copy-to-Clipboard & Contact Form (mailto)
     -------------------------------------------------------------------------- */
  const copyButtons = document.querySelectorAll('.copy-btn[data-copy]');
  const toastEl = document.getElementById('toast-notification');
  let toastTimeout = null;

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('visible');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.classList.remove('visible');
    }, 2800);
  }

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const valueToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-label') || 'Dato';
      if (!valueToCopy) return;

      try {
        await navigator.clipboard.writeText(valueToCopy);
        showToast(`✓ ${label} copiado: ${valueToCopy}`);
      } catch (_err) {
        showToast(`${label}: ${valueToCopy}`);
      }
    });
  });

  const contactForm = document.getElementById('direct-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('contact-name')?.value || '').trim();
      const subject = (document.getElementById('contact-subject')?.value || 'Contacto desde Portafolio Web').trim();
      const message = (document.getElementById('contact-message')?.value || '').trim();

      const body = `Hola José Iván,\n\n${message}\n\nAtentamente,\n${name}`;
      const mailtoUrl = `mailto:joseivangova@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
      showToast('Abriendo cliente de correo para enviar mensaje...');
    });
  }
});
