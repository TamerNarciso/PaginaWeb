/**
 * José Iván Gómez Vázquez — Portfolio Interactive Logic
 * Handles theme switching, project filtering, architecture node inspection,
 * interactive project simulators (ELT & SDV-IBN Telemetry), and contact actions.
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
     2. Mobile Menu Toggle & Navigation Scroll Spy
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
     3. Project Category Filtering
     -------------------------------------------------------------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
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

  /* --------------------------------------------------------------------------
     4. Project Workbench Tabs (Architecture / Code / Live Simulator)
     -------------------------------------------------------------------------- */
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
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  /* --------------------------------------------------------------------------
     5. Interactive Architecture Stage Inspector
     -------------------------------------------------------------------------- */
  const archStages = document.querySelectorAll('.arch-stage');

  archStages.forEach((stage) => {
    stage.addEventListener('click', () => {
      const flowContainer = stage.closest('.workbench-pane');
      if (!flowContainer) return;

      flowContainer.querySelectorAll('.arch-stage').forEach((s) => s.classList.remove('active'));
      stage.classList.add('active');

      const detailBox = flowContainer.querySelector('.arch-detail-box');
      const detailText = stage.getAttribute('data-detail');
      if (detailBox && detailText) {
        detailBox.textContent = detailText;
      }
    });
  });

  /* --------------------------------------------------------------------------
     6. Interactive Simulator 01: Financial ELT Marts Inspector (PipelineELT)
     -------------------------------------------------------------------------- */
  const tickerData = {
    'WALMEX.MX': {
      company: 'Walmart de México y Centroamérica',
      currency: 'MXN (Nativo)',
      closeMxn: '$64.85 MXN',
      ytdReturn: '+11.42%',
      vol30d: '18.6%',
      log: '[dbt marts.agg_ticker_performance] ticker=WALMEX.MX | fx_factor=1.0000 | status=OK (Idempotent Upsert)'
    },
    'AAPL': {
      company: 'Apple Inc. (NASDAQ)',
      currency: 'USD → MXN (FX BCE)',
      closeMxn: '$4,612.30 MXN',
      ytdReturn: '+19.85%',
      vol30d: '21.3%',
      log: '[dbt int_fx_rates_daily] ticker=AAPL | usd_mxn=20.1450 (forward-fill activo) | marts.fct_returns actualizado'
    },
    'MSFT': {
      company: 'Microsoft Corporation (NASDAQ)',
      currency: 'USD → MXN (FX BCE)',
      closeMxn: '$8,940.15 MXN',
      ytdReturn: '+16.20%',
      vol30d: '19.8%',
      log: '[dbt marts.fct_daily_prices] ticker=MSFT | incremental_lookback=10d | 0 tests fallidos en dbt build'
    },
    'BTC-USD': {
      company: 'Bitcoin / US Dollar',
      currency: 'USD → MXN (FX BCE)',
      closeMxn: '$1,842,500 MXN',
      ytdReturn: '+68.40%',
      vol30d: '46.2%',
      log: '[Airflow DAG financial_elt] ticker=BTC-USD | ventana deslizante 7d completada | Metabase sync OK'
    }
  };

  const tickerSelectBtns = document.querySelectorAll('.elt-ticker-btn');
  const eltCompanyEl = document.getElementById('elt-sim-company');
  const eltCloseEl = document.getElementById('elt-sim-close');
  const eltYtdEl = document.getElementById('elt-sim-ytd');
  const eltVolEl = document.getElementById('elt-sim-vol');
  const eltLogEl = document.getElementById('elt-sim-log');

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
    });
  });

  /* --------------------------------------------------------------------------
     7. Interactive Simulator 02: SDV-IBN Andon & ITIL v4 Fault Injection
     -------------------------------------------------------------------------- */
  const sdvNormalBtn = document.getElementById('sdv-mode-normal');
  const sdvFaultBtn = document.getElementById('sdv-mode-fault');
  const sdvFtqEl = document.getElementById('sdv-sim-ftq');
  const sdvTaktEl = document.getElementById('sdv-sim-takt');
  const sdvMttrEl = document.getElementById('sdv-sim-mttr');
  const sdvNodeEl = document.getElementById('sdv-sim-node');
  const sdvLogEl = document.getElementById('sdv-sim-log');

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
    });
  }

  /* --------------------------------------------------------------------------
     8. Copy-to-Clipboard & Contact Form (mailto)
     -------------------------------------------------------------------------- */
  const copyButtons = document.querySelectorAll('.copy-btn');
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
