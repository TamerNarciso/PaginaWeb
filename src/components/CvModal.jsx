import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CvModal({ isOpen, onClose, data, lang }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const m = data.modal;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cv-modal-backdrop open"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-modal-title"
        >
          <motion.div
            className="cv-modal-sheet"
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
            <div className="cv-modal-topbar">
              <span className="cv-modal-topbar-title" id="cv-modal-title">
                {m.title}
              </span>
              <div className="cv-modal-actions">
                <a
                  href="./assets/CV_Jose_Ivan_Gomez_Vazquez.pdf"
                  download="CV_Jose_Ivan_Gomez_Vazquez.pdf"
                  className="btn btn-primary btn-sm"
                >
                  {m.downloadPdf}
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-outline btn-sm"
                >
                  {m.closeBtn}
                </button>
              </div>
            </div>

            <div className="cv-paper">
              <div className="cv-paper-header">
                <div>
                  <h2 className="cv-paper-name">José Iván Gómez Vázquez</h2>
                  <div className="cv-paper-role">{m.roleLine}</div>
                </div>
                <div className="cv-paper-contact tabular-nums">
                  <div>Puebla, Pue., México</div>
                  <div>ivan.gomez.vazquez06@gmail.com</div>
                  <div>(+52) 782 169 0195</div>
                  <div>github.com/TamerNarciso</div>
                </div>
              </div>

              <div className="cv-paper-section">
                <h3 className="cv-paper-sec-title">{m.profileTitle}</h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {m.profileText}
                </p>
              </div>

              <div className="cv-paper-section">
                <h3 className="cv-paper-sec-title">{m.expTitle}</h3>

                <div className="cv-paper-item">
                  <div className="cv-paper-item-head">
                    <span>
                      {lang === 'es'
                        ? 'AUDI México — Prácticas Profesionales (Planeación – Ingeniería Industrial)'
                        : 'AUDI México — Industrial Engineering & Planning Intern'}
                    </span>
                    <span className="cv-paper-item-date">2026</span>
                  </div>
                  <p>
                    {lang === 'es'
                      ? 'Participación en el proyecto de digitalización y automatización de procesos del área. Análisis, cruce y estructuración de múltiples bases de datos operativas e implementación de soluciones escalables de visualización.'
                      : 'Assigned to the strategic process digitalization and automation project. Cross-referenced and structured multiple operational databases and implemented automated, scalable KPI visualization solutions.'}
                  </p>
                </div>

                <div className="cv-paper-item">
                  <div className="cv-paper-item-head">
                    <span>SDV-IBN Tooling &amp; Telemetry Hub (Python, DoIP/UDS, PostgreSQL, Power BI)</span>
                    <span className="cv-paper-item-date">2025 – 2026</span>
                  </div>
                  <p>
                    {lang === 'es'
                      ? 'Ecosistema de diagnóstico automotriz con simulación DoIP/UDS, disparadores automáticos en PostgreSQL (PL/pgSQL) para gestión de incidentes ITIL v4 (SLA Takt Time 60s) y tablero ejecutivo en Power BI con medidas DAX.'
                      : 'Automotive diagnostic ecosystem featuring DoIP/UDS simulation, automated PostgreSQL (PL/pgSQL) triggers for ITIL v4 incident governance (60s Takt Time SLA), and an executive Power BI dashboard with DAX measures.'}
                  </p>
                </div>

                <div className="cv-paper-item">
                  <div className="cv-paper-item-head">
                    <span>Pipeline ELT de Datos Financieros (Apache Airflow, dbt-core, Docker)</span>
                    <span className="cv-paper-item-date">2025 – 2026</span>
                  </div>
                  <p>
                    {lang === 'es'
                      ? 'Pipeline ELT contenerizado para extracción de activos financieros en MXN, carga en PostgreSQL y modelado analítico en dbt-core (cálculo de SMA-30, retornos diarios y pruebas automatizadas de calidad).'
                      : 'Containerized ELT pipeline for ingesting financial assets in MXN, loading into PostgreSQL, and running dbt-core analytical transformations (30-day moving averages, daily returns, and automated schema tests).'}
                  </p>
                </div>
              </div>

              <div className="cv-paper-section">
                <h3 className="cv-paper-sec-title">{m.eduTitle}</h3>
                <div className="cv-paper-item">
                  <div className="cv-paper-item-head">
                    <span>
                      {lang === 'es'
                        ? 'Benemérita Universidad Autónoma de Puebla (BUAP · FCC) — Ingeniería en Ciencias de la Computación'
                        : 'Benemérita Universidad Autónoma de Puebla (BUAP · FCC) — B.S. in Computer Science Engineering'}
                    </span>
                    <span className="cv-paper-item-date">2021 – 2026</span>
                  </div>
                  <p>
                    {lang === 'es'
                      ? 'Certificaciones: Análisis de Datos con Python (BUAP) · Data Science Foundations (IBM) · CCNA: Introduction to Networks (Cisco).'
                      : 'Certifications: Data Analysis with Python (BUAP) · Data Science Foundations (IBM) · CCNA: Introduction to Networks (Cisco).'}
                  </p>
                </div>
                <div className="cv-paper-item">
                  <div className="cv-paper-item-head">
                    <span>
                      {lang === 'es'
                        ? 'CBTis No. 30 (DGETI) — Técnico en Programación'
                        : 'CBTis No. 30 (DGETI) — Technical Degree in Software Programming'}
                    </span>
                    <span className="cv-paper-item-date">2018 – 2021</span>
                  </div>
                </div>
              </div>

              <div className="cv-paper-section" style={{ marginBottom: 0 }}>
                <h3 className="cv-paper-sec-title">{m.stackTitle}</h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  <strong>Stack:</strong> Python (Pandas, NumPy, Requests, Flask), SQL Avanzado, PostgreSQL (PL/pgSQL, Triggers), Power BI (DAX), Apache Airflow, dbt-core, Docker, Docker Compose, Git/GitHub, Excel Avanzado, ITIL v4, TCP/IP &amp; DoIP/UDS.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
