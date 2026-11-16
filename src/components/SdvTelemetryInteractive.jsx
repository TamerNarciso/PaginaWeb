import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SDV_TELEMETRY_DATA, CODE_SNIPPETS } from '../data/portfolioData';

export function SdvTelemetryInteractive({ t, lang }) {
  const [activeTab, setActiveTab] = useState('charts');
  const [filterMode, setFilterMode] = useState('all');
  const [selectedEcu, setSelectedEcu] = useState(SDV_TELEMETRY_DATA[0]);
  const [copiedCode, setCopiedCode] = useState(false);

  // Live IBN Simulator State
  const [simState, setSimState] = useState('idle'); // 'idle' | 'running' | 'ok' | 'fail'
  const [simStep, setSimStep] = useState(-1);
  const [simElapsed, setSimElapsed] = useState(0);
  const [simLogs, setSimLogs] = useState([]);
  const [injectFault, setInjectFault] = useState(false);

  const filteredData =
    filterMode === 'crit'
      ? SDV_TELEMETRY_DATA.filter((d) => d.critical)
      : SDV_TELEMETRY_DATA;

  const startSimulation = (withFault) => {
    setInjectFault(withFault);
    setSimState('running');
    setSimStep(0);
    setSimElapsed(0);
    const vin = withFault ? 'WAUZZZ-SDV-2026-ERR09' : 'WAUZZZ-SDV-2026-OK41';
    setSimLogs([
      `[00.0s] [DoIP TCP:13400] Routing Activation Request -> VIN ${vin}`,
      `[01.2s] [UDS 0x10 0x03] Extended Diagnostic Session abierta en bus troncal`,
    ]);
  };

  useEffect(() => {
    if (simState !== 'running') return;

    const timer = setTimeout(() => {
      if (simStep < SDV_TELEMETRY_DATA.length) {
        const ecuItem = SDV_TELEMETRY_DATA[simStep];
        const isFaultHere = injectFault && simStep === 0;
        const stepDur = isFaultHere ? 26.8 : 9.4 + simStep * 0.8;
        const nextElapsed = +(simElapsed + stepDur).toFixed(1);
        setSimElapsed(nextElapsed);

        if (isFaultHere) {
          setSimLogs((prev) => [
            ...prev,
            `[${nextElapsed}s] [ALERTA DoIP] ${ecuItem.ecu} -> Timeout en bloque 0x36 (${ecuItem.dtc})`,
            `[${nextElapsed}s] [REINTENTO UDS] Re-sincronizando socket TCP 13400 (+18.4s penalización Takt Time)`,
          ]);
        } else {
          setSimLogs((prev) => [
            ...prev,
            `[${nextElapsed}s] [UDS 0x34/0x36] ${ecuItem.ecu} (${ecuItem.protocol}) -> Flasheo y Checksum OK`,
          ]);
        }
        setSimStep((s) => s + 1);
      } else {
        if (injectFault) {
          setSimElapsed(68.4);
          setSimLogs((prev) => [
            ...prev,
            `[68.4s] [POSTGRESQL TRIGGER] fn_evaluate_ibn_telemetry_sla() -> flash_duration_sec (68.4s) > 60.0s`,
            `[68.5s] [ITIL v4 SERVICE DESK] Ticket #INC-2026-0891 (Prioridad P1-CRITICAL) creado automáticamente.`,
          ]);
          setSimState('fail');
        } else {
          setSimElapsed(51.8);
          setSimLogs((prev) => [
            ...prev,
            `[51.8s] [POSTGRESQL INSERT] Ciclo registrado en telemetry.ecu_flash_logs (51.8s <= 60.0s SLA)`,
            `[51.9s] [IBN STATION PASS] Vehículo liberado con First Time Through (FTT = OK).`,
          ]);
          setSimState('ok');
        }
      }
    }, 520);

    return () => clearTimeout(timer);
  }, [simState, simStep, injectFault, simElapsed]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1800);
  };

  const tabs = [
    { id: 'charts', label: t.tabs.charts },
    { id: 'simulator', label: t.tabs.simulator },
    { id: 'sql', label: t.tabs.sql },
    { id: 'dax', label: t.tabs.dax },
  ];

  return (
    <div className="project-right-col">
      {/* Animated Framer Motion Tabs */}
      <div className="interactive-tabs-bar" role="tablist">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`interactive-tab-btn ${isActive ? 'active' : ''}`}
            >
              {isActive && (
                <motion.span
                  layoutId="p1-active-tab-pill"
                  className="tab-active-pill"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span style={{ position: 'relative', zIndex: 2 }}>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'charts' && (
          <motion.div
            key="p1-charts"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="viz-panel"
          >
            <div className="chart-controls-row">
              <span className="chart-filter-label">{t.chartFilterLabel}</span>
              <div className="chart-filter-group">
                <button
                  type="button"
                  onClick={() => setFilterMode('all')}
                  className={`chart-filter-btn ${filterMode === 'all' ? 'active' : ''}`}
                >
                  {t.chartFilters.all}
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMode('crit')}
                  className={`chart-filter-btn ${filterMode === 'crit' ? 'active' : ''}`}
                >
                  {t.chartFilters.crit}
                </button>
              </div>
            </div>

            {/* Chart 1: Interactive Pareto SVG */}
            <div className="svg-chart-box">
              <div className="svg-chart-header">
                <div>
                  <div className="svg-chart-title">{t.paretoTitle}</div>
                  <div className="svg-chart-subtitle">{t.paretoSub}</div>
                </div>
                {selectedEcu && (
                  <div className="selected-ecu-pill tabular-nums">
                    <strong>{selectedEcu.ecu}</strong> · {selectedEcu.dtc} ({selectedEcu.incidents} inc.)
                  </div>
                )}
              </div>

              <svg
                viewBox="0 0 560 205"
                className="telemetry-svg"
                role="img"
                aria-label="Diagrama de Pareto de códigos de falla DTC por módulo ECU"
              >
                {/* Horizontal grid lines */}
                {[35, 75, 115, 155].map((y, idx) => (
                  <g key={y}>
                    <line
                      x1="44"
                      y1={y}
                      x2="516"
                      y2={y}
                      stroke="currentColor"
                      strokeOpacity="0.1"
                      strokeDasharray="3 3"
                    />
                    <text
                      x="38"
                      y={y + 4}
                      textAnchor="end"
                      fontSize="9.5"
                      fontFamily="JetBrains Mono, monospace"
                      fill="currentColor"
                      opacity="0.55"
                    >
                      {45 - idx * 12}
                    </text>
                    <text
                      x="522"
                      y={y + 4}
                      textAnchor="start"
                      fontSize="9.5"
                      fontFamily="JetBrains Mono, monospace"
                      fill="#D14324"
                      opacity="0.85"
                    >
                      {100 - idx * 25}%
                    </text>
                  </g>
                ))}

                {/* Bars */}
                {filteredData.map((d, i) => {
                  const spacing = filterMode === 'crit' ? 160 : 92;
                  const startX = filterMode === 'crit' ? 130 : 68;
                  const x = startX + i * spacing;
                  const barH = (d.incidents / 45) * 128;
                  const y = 160 - barH;
                  const isSelected = selectedEcu?.ecu === d.ecu;

                  return (
                    <g
                      key={d.ecu}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedEcu(d)}
                      onMouseEnter={() => setSelectedEcu(d)}
                    >
                      <motion.rect
                        initial={{ height: 0, y: 160 }}
                        animate={{ height: barH, y }}
                        transition={{ duration: 0.55, delay: i * 0.07 }}
                        x={x}
                        width="48"
                        rx="4"
                        fill={d.critical ? '#D14324' : '#1256D4'}
                        fillOpacity={isSelected ? '1' : '0.82'}
                        stroke={isSelected ? 'currentColor' : 'none'}
                        strokeWidth="1.5"
                      />
                      <text
                        x={x + 24}
                        y={y - 6}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="700"
                        fontFamily="JetBrains Mono, monospace"
                        fill="currentColor"
                      >
                        {d.incidents}
                      </text>
                      <text
                        x={x + 24}
                        y="177"
                        textAnchor="middle"
                        fontSize="9.5"
                        fontWeight="600"
                        fontFamily="JetBrains Mono, monospace"
                        fill="currentColor"
                      >
                        {d.ecu}
                      </text>
                      <text
                        x={x + 24}
                        y="191"
                        textAnchor="middle"
                        fontSize="8.5"
                        fontFamily="JetBrains Mono, monospace"
                        fill="currentColor"
                        opacity="0.6"
                      >
                        {d.dtc.split(' · ')[0]}
                      </text>
                    </g>
                  );
                })}

                {/* Cumulative Pareto Curve (when viewing all modules) */}
                {filterMode === 'all' && (
                  <>
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                      d="M 92 111 L 184 78 L 276 56 L 368 41 L 460 32"
                      fill="none"
                      stroke="#D14324"
                      strokeWidth="2.4"
                    />
                    {[
                      { cx: 92, cy: 111, pct: '38%' },
                      { cx: 184, cy: 78, pct: '64%' },
                      { cx: 276, cy: 56, pct: '81%' },
                      { cx: 368, cy: 41, pct: '93%' },
                      { cx: 460, cy: 32, pct: '100%' },
                    ].map((pt, idx) => (
                      <g key={idx}>
                        <circle cx={pt.cx} cy={pt.cy} r="4" fill="#D14324" />
                        <text
                          x={pt.cx}
                          y={pt.cy - 8}
                          textAnchor="middle"
                          fontSize="8.5"
                          fontWeight="700"
                          fontFamily="JetBrains Mono, monospace"
                          fill="#D14324"
                        >
                          {pt.pct}
                        </text>
                      </g>
                    ))}
                  </>
                )}
              </svg>
            </div>

            {/* Chart 2: Horizontal Takt Time vs 60s SLA */}
            <div className="svg-chart-box" style={{ marginTop: '0.9rem' }}>
              <div className="svg-chart-header">
                <div>
                  <div className="svg-chart-title">{t.taktTitle}</div>
                  <div className="svg-chart-subtitle">{t.taktSub}</div>
                </div>
                <span className="sla-limit-badge tabular-nums">SLA = 60.0s</span>
              </div>

              <div className="takt-bars-list tabular-nums">
                {filteredData.map((d, i) => {
                  const widthPct = Math.min(100, (d.taktSec / 75) * 100);
                  const slaPosPct = (60 / 75) * 100;
                  return (
                    <div
                      key={d.ecu}
                      className="takt-bar-row"
                      onClick={() => setSelectedEcu(d)}
                    >
                      <div className="takt-bar-meta">
                        <span className="takt-ecu-name">{d.ecu}</span>
                        <span
                          className={`takt-sec-val ${
                            d.critical ? 'breach' : 'ok'
                          }`}
                        >
                          {d.taktSec.toFixed(1)}s{' '}
                          {d.critical ? '⚠️ >60s SLA' : '✓ OK'}
                        </span>
                      </div>
                      <div className="takt-bar-track">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${widthPct}%` }}
                          transition={{ duration: 0.6, delay: i * 0.06 }}
                          className={`takt-bar-fill ${
                            d.critical ? 'breach' : 'ok'
                          }`}
                        />
                        <div
                          className="takt-sla-marker"
                          style={{ left: `${slaPosPct}%` }}
                          title="SLA Takt Time 60.0s"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'simulator' && (
          <motion.div
            key="p1-simulator"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="viz-panel simulator-panel"
          >
            <div className="sim-header">
              <div>
                <h5 className="sim-title">{t.sim.title}</h5>
                <p className="sim-subtitle">{t.sim.subtitle}</p>
              </div>
              <div className={`sim-status-pill ${simState}`}>
                {simState === 'idle' && t.sim.statusIdle}
                {simState === 'running' && t.sim.statusRunning}
                {simState === 'ok' && t.sim.statusOk}
                {simState === 'fail' && t.sim.statusFail}
              </div>
            </div>

            <div className="sim-actions-row">
              <button
                type="button"
                disabled={simState === 'running'}
                onClick={() => startSimulation(false)}
                className="btn btn-primary btn-sm"
              >
                {t.sim.runNormalBtn}
              </button>
              <button
                type="button"
                disabled={simState === 'running'}
                onClick={() => startSimulation(true)}
                className="btn btn-danger-outline btn-sm"
              >
                {t.sim.runFaultBtn}
              </button>
              {simState !== 'idle' && (
                <button
                  type="button"
                  onClick={() => {
                    setSimState('idle');
                    setSimStep(-1);
                    setSimElapsed(0);
                    setSimLogs([]);
                  }}
                  className="btn btn-outline btn-sm"
                >
                  {t.sim.resetBtn}
                </button>
              )}
            </div>

            {/* Live ECU Nodes Grid */}
            <div className="sim-ecu-grid tabular-nums">
              {SDV_TELEMETRY_DATA.map((item, idx) => {
                const isDone = simStep > idx || simState === 'ok' || simState === 'fail';
                const isCurrent = simState === 'running' && simStep === idx;
                const isFaulted = injectFault && idx === 0 && isDone;

                return (
                  <div
                    key={item.ecu}
                    className={`sim-ecu-node ${isCurrent ? 'running' : ''} ${
                      isDone ? (isFaulted ? 'fault' : 'done') : ''
                    }`}
                  >
                    <div className="sim-ecu-top">
                      <span className="sim-ecu-addr">{item.ecu}</span>
                      <span className="sim-ecu-badge">
                        {isCurrent
                          ? '⏳ DoIP...'
                          : isDone
                          ? isFaulted
                            ? '❌ DTC U0100'
                            : '✓ PASS'
                          : 'STANDBY'}
                      </span>
                    </div>
                    <div className="sim-ecu-proto">{item.protocol}</div>
                  </div>
                );
              })}
            </div>

            {/* Live Cycle Counter Bar */}
            <div className="sim-takt-meter tabular-nums">
              <div className="sim-takt-row">
                <span>{t.sim.taktLabel}</span>
                <strong
                  style={{
                    color:
                      simElapsed > 60
                        ? 'var(--status-warn)'
                        : 'var(--accent-primary)',
                  }}
                >
                  {simElapsed.toFixed(1)}s / 60.0s SLA
                </strong>
              </div>
              <div className="takt-bar-track">
                <motion.div
                  animate={{ width: `${Math.min(100, (simElapsed / 72) * 100)}%` }}
                  className={`takt-bar-fill ${simElapsed > 60 ? 'breach' : 'ok'}`}
                />
              </div>
            </div>

            {/* ITIL v4 Incident Ticket Alert when Fault Injected */}
            <AnimatePresence>
              {simState === 'fail' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="sim-itil-alert"
                >
                  <div className="sim-itil-title">🚨 {t.sim.ticketAlertTitle}</div>
                  <div className="sim-itil-desc">{t.sim.ticketAlertDesc}</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Live Console Output */}
            <div className="code-snippet sim-console">
              {simLogs.length === 0
                ? lang === 'es'
                  ? '// Haz clic en "Ejecutar Escaneo" o "Inyectar Falla Crítica" para iniciar la telemetría en vivo...'
                  : '// Click "Run Normal Scan" or "Inject Critical DoIP Fault" to start live telemetry...'
                : simLogs.map((line, i) => <div key={i}>{line}</div>)}
            </div>
          </motion.div>
        )}

        {activeTab === 'sql' && (
          <motion.div
            key="p1-sql"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="code-panel-wrap"
          >
            <div className="code-panel-bar">
              <span>PostgreSQL 15 · PL/pgSQL Trigger</span>
              <button
                type="button"
                onClick={() => handleCopy(CODE_SNIPPETS.plpgsqlTrigger)}
                className="copy-btn"
              >
                {copiedCode ? '✓ Copiado' : 'Copiar SQL'}
              </button>
            </div>
            <pre className="code-snippet">{CODE_SNIPPETS.plpgsqlTrigger}</pre>
          </motion.div>
        )}

        {activeTab === 'dax' && (
          <motion.div
            key="p1-dax"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="code-panel-wrap"
          >
            <div className="code-panel-bar">
              <span>Power BI · Medidas Analíticas DAX</span>
              <button
                type="button"
                onClick={() => handleCopy(CODE_SNIPPETS.daxMeasures)}
                className="copy-btn"
              >
                {copiedCode ? '✓ Copiado' : 'Copiar DAX'}
              </button>
            </div>
            <pre className="code-snippet">{CODE_SNIPPETS.daxMeasures}</pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
