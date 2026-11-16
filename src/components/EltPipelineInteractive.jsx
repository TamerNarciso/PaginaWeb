import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ELT_ASSETS_DATA, CODE_SNIPPETS } from '../data/portfolioData';

export function EltPipelineInteractive({ t, lang }) {
  const [activeTab, setActiveTab] = useState('chart');
  const [selectedAsset, setSelectedAsset] = useState('BTC-MXN');
  const [chartMode, setChartMode] = useState('sma'); // 'sma' | 'bands'
  const [hoverIdx, setHoverIdx] = useState(9);
  const [copiedCode, setCopiedCode] = useState(false);

  // Airflow DAG Simulator state
  const [dagRunning, setDagRunning] = useState(false);
  const [dagStep, setDagStep] = useState(-1);
  const [dagLogs, setDagLogs] = useState([]);

  const assetObj = ELT_ASSETS_DATA[selectedAsset];
  const series = assetObj.series;
  const activePoint = series[hoverIdx] || series[series.length - 1];

  // Compute SVG coordinates dynamically for selectedAsset
  const minVal = Math.min(...series.map((s) => s.sma - s.std * 2.1));
  const maxVal = Math.max(...series.map((s) => s.close + s.std * 2.1));
  const range = maxVal - minVal || 1;

  const toX = (idx) => 56 + idx * ((516 - 56) / (series.length - 1));
  const toY = (val) => 166 - ((val - minVal) / range) * 128;

  const closePath = series
    .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${toX(idx).toFixed(1)} ${toY(pt.close).toFixed(1)}`)
    .join(' ');

  const smaPath = series
    .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${toX(idx).toFixed(1)} ${toY(pt.sma).toFixed(1)}`)
    .join(' ');

  const upperBandPoints = series.map((pt, idx) => `${toX(idx).toFixed(1)},${toY(pt.sma + pt.std * 2).toFixed(1)}`);
  const lowerBandPoints = [...series]
    .reverse()
    .map((pt, revIdx) => {
      const idx = series.length - 1 - revIdx;
      return `${toX(idx).toFixed(1)},${toY(pt.sma - pt.std * 2).toFixed(1)}`;
    });
  const bandPolygon = [...upperBandPoints, ...lowerBandPoints].join(' ');

  const formatPrice = (val) => {
    if (selectedAsset === 'USD-MXN') return `$${val.toFixed(2)} MXN`;
    if (selectedAsset === 'IPC-BMV') return `${val.toLocaleString('es-MX')} pts`;
    return `$${val.toLocaleString('es-MX')} MXN`;
  };

  const dagTasks = [
    {
      id: 'extract_market_api',
      operator: 'PythonOperator',
      descEs: 'Extracción REST API (Cotizaciones MXN)',
      descEn: 'REST API Extraction (MXN Quotes)',
      log: '[Airflow] INFO - Task extract_market_api: 350 registros financieros extraídos vía HTTPS (status=200).',
    },
    {
      id: 'load_raw_postgres',
      operator: 'PostgresOperator',
      descEs: 'Carga idempotente a raw_financial',
      descEn: 'Idempotent load into raw_financial',
      log: '[PostgreSQL] INFO - Task load_raw_postgres: UPSERT completado en raw_financial.market_quotes (0 duplicados).',
    },
    {
      id: 'dbt_run_marts',
      operator: 'BashOperator (dbt run)',
      descEs: 'Cálculo Window Functions (SMA-30)',
      descEn: 'Window Functions calculation (SMA-30)',
      log: '[dbt-core] INFO - 1 of 1 OK created sql table model analytics_marts.fct_daily_asset_metrics [SELECT 350 in 0.42s]',
    },
    {
      id: 'dbt_test_schema',
      operator: 'BashOperator (dbt test)',
      descEs: 'Validación not_null & unique',
      descEn: 'Schema validation (not_null & unique)',
      log: '[dbt-core] INFO - Done. PASS=4 WARN=0 ERROR=0 SKIP=0 TOTAL=4 · DAG Run marcado como SUCCESS.',
    },
  ];

  const triggerDag = () => {
    setDagRunning(true);
    setDagStep(0);
    setDagLogs([
      `[Airflow Scheduler] DAG 'elt_financial_pipeline' disparado (run_id: manual__2026-11-16T18:00:00Z)`,
    ]);
  };

  useEffect(() => {
    if (!dagRunning) return;
    const timer = setTimeout(() => {
      if (dagStep < dagTasks.length) {
        const task = dagTasks[dagStep];
        setDagLogs((prev) => [...prev, task.log]);
        setDagStep((s) => s + 1);
      } else {
        setDagRunning(false);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [dagRunning, dagStep]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1800);
  };

  const tabs = [
    { id: 'chart', label: t.tabs.chart },
    { id: 'dagSim', label: t.tabs.dagSim },
    { id: 'dbtSql', label: t.tabs.dbtSql },
    { id: 'dbtYaml', label: t.tabs.dbtYaml },
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
                  layoutId="p2-active-tab-pill"
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
        {activeTab === 'chart' && (
          <motion.div
            key="p2-chart"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="viz-panel"
          >
            {/* Controls Bar */}
            <div className="chart-controls-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="chart-filter-label">{t.assetLabel}</span>
                {Object.keys(ELT_ASSETS_DATA).map((asset) => (
                  <button
                    key={asset}
                    type="button"
                    onClick={() => setSelectedAsset(asset)}
                    className={`chart-filter-btn ${selectedAsset === asset ? 'active' : ''}`}
                  >
                    {asset}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="chart-filter-label">{t.modeLabel}</span>
                <button
                  type="button"
                  onClick={() => setChartMode('sma')}
                  className={`chart-filter-btn ${chartMode === 'sma' ? 'active' : ''}`}
                >
                  {t.modes.sma}
                </button>
                <button
                  type="button"
                  onClick={() => setChartMode('bands')}
                  className={`chart-filter-btn ${chartMode === 'bands' ? 'active' : ''}`}
                >
                  {t.modes.bands}
                </button>
              </div>
            </div>

            {/* Interactive SVG Financial Chart */}
            <div className="svg-chart-box">
              <div className="svg-chart-header">
                <div>
                  <div className="svg-chart-title">
                    {selectedAsset} · {t.chartTitle}
                  </div>
                  <div className="svg-chart-subtitle">{t.chartSub}</div>
                </div>
                <div className="selected-ecu-pill tabular-nums">
                  <strong>{activePoint.day}</strong>: {formatPrice(activePoint.close)} (SMA:{' '}
                  {formatPrice(activePoint.sma)})
                </div>
              </div>

              <svg
                viewBox="0 0 560 205"
                className="telemetry-svg"
                role="img"
                aria-label="Serie de tiempo financiera de precio de cierre vs media móvil SMA-30"
              >
                {[38, 80, 122, 164].map((y, idx) => {
                  const labelVal = maxVal - (idx / 3) * range;
                  return (
                    <g key={y}>
                      <line
                        x1="52"
                        y1={y}
                        x2="522"
                        y2={y}
                        stroke="currentColor"
                        strokeOpacity="0.1"
                        strokeDasharray="3 3"
                      />
                      <text
                        x="46"
                        y={y + 3}
                        textAnchor="end"
                        fontSize="8.5"
                        fontFamily="JetBrains Mono, monospace"
                        fill="currentColor"
                        opacity="0.55"
                      >
                        {selectedAsset === 'USD-MXN'
                          ? labelVal.toFixed(2)
                          : selectedAsset === 'IPC-BMV'
                          ? `${(labelVal / 1000).toFixed(1)}k`
                          : `${(labelVal / 1000000).toFixed(2)}M`}
                      </text>
                    </g>
                  );
                })}

                {/* Volatility Bollinger Band (±2σ) when active */}
                {chartMode === 'bands' && (
                  <motion.polygon
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.16 }}
                    points={bandPolygon}
                    fill="#1256D4"
                  />
                )}

                {/* SMA-30 Line */}
                <motion.path
                  key={`${selectedAsset}-sma`}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.65 }}
                  d={smaPath}
                  fill="none"
                  stroke="#D14324"
                  strokeWidth="2.2"
                  strokeDasharray="5 4"
                />

                {/* Daily Close Line */}
                <motion.path
                  key={`${selectedAsset}-close`}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.75 }}
                  d={closePath}
                  fill="none"
                  stroke="#1256D4"
                  strokeWidth="2.8"
                />

                {/* Interactive Data Points */}
                {series.map((pt, idx) => {
                  const cx = toX(idx);
                  const cy = toY(pt.close);
                  const isHovered = hoverIdx === idx;
                  return (
                    <g
                      key={pt.day}
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={() => setHoverIdx(idx)}
                      onClick={() => setHoverIdx(idx)}
                    >
                      {isHovered && (
                        <line
                          x1={cx}
                          y1="30"
                          x2={cx}
                          y2="168"
                          stroke="#1256D4"
                          strokeOpacity="0.35"
                          strokeDasharray="2 2"
                        />
                      )}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isHovered ? 6 : 3.8}
                        fill={isHovered ? '#D14324' : '#1256D4'}
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      />
                      <text
                        x={cx}
                        y="186"
                        textAnchor="middle"
                        fontSize="8.8"
                        fontWeight={isHovered ? '700' : '500'}
                        fontFamily="JetBrains Mono, monospace"
                        fill="currentColor"
                        opacity={isHovered ? 1 : 0.65}
                      >
                        {pt.day}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* 4 Financial KPI Cards */}
            <div className="elt-kpi-grid tabular-nums">
              <div className="elt-kpi-card">
                <span className="elt-kpi-label">{t.kpiLabels.close}</span>
                <strong className="elt-kpi-val">{formatPrice(activePoint.close)}</strong>
              </div>
              <div className="elt-kpi-card">
                <span className="elt-kpi-label">{t.kpiLabels.sma}</span>
                <strong className="elt-kpi-val">{formatPrice(activePoint.sma)}</strong>
              </div>
              <div className="elt-kpi-card">
                <span className="elt-kpi-label">{t.kpiLabels.signal}</span>
                <strong className="elt-kpi-val" style={{ color: 'var(--status-ok)' }}>
                  {lang === 'es' ? assetObj.signalEs : assetObj.signalEn}
                </strong>
              </div>
              <div className="elt-kpi-card">
                <span className="elt-kpi-label">{t.kpiLabels.vol}</span>
                <strong className="elt-kpi-val">{assetObj.volatility}</strong>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'dagSim' && (
          <motion.div
            key="p2-dagsim"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="viz-panel simulator-panel"
          >
            <div className="sim-header">
              <div>
                <h5 className="sim-title">{t.dagSim.title}</h5>
                <p className="sim-subtitle">{t.dagSim.subtitle}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  disabled={dagRunning}
                  onClick={triggerDag}
                  className="btn btn-primary btn-sm"
                >
                  {dagRunning ? t.dagSim.runningBtn : t.dagSim.triggerBtn}
                </button>
                {dagStep >= 0 && !dagRunning && (
                  <button
                    type="button"
                    onClick={() => {
                      setDagStep(-1);
                      setDagLogs([]);
                    }}
                    className="btn btn-outline btn-sm"
                  >
                    {t.dagSim.resetBtn}
                  </button>
                )}
              </div>
            </div>

            <div className="dag-nodes-flow">
              {dagTasks.map((task, idx) => {
                const isDone = dagStep > idx;
                const isRunning = dagRunning && dagStep === idx;
                return (
                  <div
                    key={task.id}
                    className={`dag-node-card ${isRunning ? 'running' : ''} ${
                      isDone ? 'done' : ''
                    }`}
                  >
                    <div className="dag-node-top">
                      <span className="dag-task-id">{task.id}</span>
                      <span className="dag-task-state">
                        {isRunning ? '⏳ RUNNING' : isDone ? '✓ SUCCESS' : 'QUEUED'}
                      </span>
                    </div>
                    <div className="dag-task-op">{task.operator}</div>
                    <div className="dag-task-desc">
                      {lang === 'es' ? task.descEs : task.descEn}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="code-snippet sim-console">
              {dagLogs.length === 0
                ? lang === 'es'
                  ? '// Haz clic en "Disparar DAG Run" para ejecutar el pipeline ELT en vivo...'
                  : '// Click "Trigger DAG Run" to execute the live ELT pipeline...'
                : dagLogs.map((l, i) => <div key={i}>{l}</div>)}
            </div>
          </motion.div>
        )}

        {activeTab === 'dbtSql' && (
          <motion.div
            key="p2-dbtsql"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="code-panel-wrap"
          >
            <div className="code-panel-bar">
              <span>dbt-core · models/marts/finance/fct_daily_asset_metrics.sql</span>
              <button
                type="button"
                onClick={() => handleCopy(CODE_SNIPPETS.dbtSqlModel)}
                className="copy-btn"
              >
                {copiedCode ? '✓ Copiado' : 'Copiar SQL'}
              </button>
            </div>
            <pre className="code-snippet">{CODE_SNIPPETS.dbtSqlModel}</pre>
          </motion.div>
        )}

        {activeTab === 'dbtYaml' && (
          <motion.div
            key="p2-dbtyaml"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="code-panel-wrap"
          >
            <div className="code-panel-bar">
              <span>dbt-core · models/marts/finance/schema.yml</span>
              <button
                type="button"
                onClick={() => handleCopy(CODE_SNIPPETS.dbtYamlSchema)}
                className="copy-btn"
              >
                {copiedCode ? '✓ Copiado' : 'Copiar YAML'}
              </button>
            </div>
            <pre className="code-snippet">{CODE_SNIPPETS.dbtYamlSchema}</pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
