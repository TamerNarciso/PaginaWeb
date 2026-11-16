# Portafolio Profesional — José Iván Gómez Vázquez

Aplicación web interactiva de portafolio de **Ingeniería de Datos, Telemetría Automotriz y Business Intelligence**, construida con **React 19**, **Vite**, **Framer Motion** y **Tailwind CSS**, optimizada para despliegue continuo en **Vercel**.

---

## 🚀 Tecnologías e Interactividad

- **React 19 + Vite**: Arquitectura modular basada en componentes reactivos.
- **Framer Motion**:
  - Animaciones con física de resortes (`spring`) al hacer scroll (`whileInView`).
  - Indicador superior de progreso de lectura (`useScroll` + `useSpring`).
  - Tarjetas interactivas con iluminación radial dinámica al cursor (`SpotlightCard`).
  - Contadores numéricos animados (`AnimatedCounter`).
  - Pestañas con transiciones de layout fluidas (`layoutId` y `AnimatePresence`).
- **Simuladores Interactivos en Tiempo Real**:
  - **Proyecto 01 (`SDV-IBN Tooling & Telemetry Hub`)**: Gráficas SVG interactivas (Pareto de DTCs y Takt Time de 60s) + **Simulador en Vivo de Estación IBN (DoIP / UDS)** que permite ejecutar un escaneo normal o inyectar una falla crítica para disparar el Trigger `PL/pgSQL` e incidente **ITIL v4 P1**.
  - **Proyecto 02 (`PipelineELT`)**: Serie temporal multi-activo (`BTC-MXN`, `USD-MXN`, `IPC-BMV`) con bandas de volatilidad `±2σ` y `SMA-30` + **Ejecutor Interactivo de DAG en Apache Airflow (`elt_financial_pipeline`)**.
- **100% Bilingüe (`ES / EN`)**: Diccionario centralizado en [`src/data/portfolioData.js`](./src/data/portfolioData.js) que traduce instantáneamente toda la interfaz, incluyendo proyectos, trayectoria, competencias, simuladores y el modal ejecutivo de CV.
- **Tarjeta Social OpenGraph (`public/assets/og-preview.png`)**: Vista previa personalizada al compartir el enlace en LinkedIn o WhatsApp.

---

## 📁 Estructura del Proyecto

```text
├── index.html                           # Punto de entrada HTML + metadatos SEO / OpenGraph
├── package.json                         # Dependencias (React, Vite, Framer Motion, Tailwind)
├── vite.config.js                       # Configuración de Vite
├── vercel.json                          # Configuración de compilación para Vercel (dist/)
├── public/
│   └── assets/
│       ├── profile.jpg                  # Fotografía profesional
│       ├── audi.png                     # Logotipo oficial AUDI
│       ├── buap.png                     # Escudo oficial BUAP
│       ├── fcc.png                      # Logotipo oficial FCC BUAP
│       ├── cbtis.png                    # Logotipo oficial DGETI / CBTis No. 30
│       ├── og-preview.png               # Tarjeta OpenGraph (1200x630) para LinkedIn/WhatsApp
│       ├── CV_Jose_Ivan_Gomez_Vazquez.pdf  # CV Ejecutivo de 1 página (PDF)
│       └── CV_Jose_Ivan_Gomez_Vazquez.docx # CV en formato Word (.docx)
└── src/
    ├── main.jsx                         # Bootstrap de React 19
    ├── App.jsx                          # Componente principal del portafolio
    ├── index.css                        # Sistema de diseño y estilos globales
    ├── data/
    │   └── portfolioData.js             # Textos bilingües (ES/EN) y datasets (edita aquí tus textos)
    └── components/
        ├── SpotlightCard.jsx            # Tarjetas con iluminación al cursor y entrada animada
        ├── AnimatedCounter.jsx          # Contadores numéricos animados
        ├── SdvTelemetryInteractive.jsx  # Gráficas y simulador DoIP/UDS (Proyecto 01)
        ├── EltPipelineInteractive.jsx   # Gráficas financieras y simulador Airflow/dbt (Proyecto 02)
        └── CvModal.jsx                  # Modal de vista previa ejecutiva del CV
```

---

## 🛠️ Desarrollo Local y Despliegue en Vercel

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar versión de producción (genera carpeta dist/)
npm run build
```

> **Nota para edición rápida en GitHub**: Si deseas modificar cualquier texto o etiqueta en español o inglés directamente desde GitHub Web, edita el archivo [`src/data/portfolioData.js`](./src/data/portfolioData.js). Al guardar el commit en `main`, **Vercel** ejecutará `npm run build` y publicará los cambios automáticamente.
