# Portafolio Profesional — José Iván Gómez Vázquez

Sitio web personal y portafolio de proyectos de **José Iván Gómez Vázquez** (*Ingeniero en Ciencias de la Computación · Analista e Ingeniero de Datos*).

## Contenido del Portafolio

- **Presentación y Dossier Técnico**: Perfil profesional, fotografía, contacto directo y descarga de CV.
- **Proyectos Destacados con Inspector Interactivo**:
  1. **SDV-IBN Tooling & Telemetry Hub**: Ecosistema de puesta en marcha electrónica automotriz (`DoIP/UDS`, `Python Flask`, `PostgreSQL PL/pgSQL` con gestión automática de incidentes ITIL v4 y `Power BI DAX`), con simulador interactivo de inyección de fallos P1 (*Fault Injection*).
  2. **Pipeline ELT de Datos Financieros (`PipelineELT`)**: Pipeline diario orquestado con `Apache Airflow`, ingesta idempotente en `Python`, warehouse `PostgreSQL 16`, transformación dimensional en `dbt-core` y dashboard como código en `Metabase`.
  3. **Digitalización y Automatización de Procesos — AUDI México**: Integración de bases de datos multifuente y visualización automatizada en el área de Planeación – Ingeniería Industrial.
- **Trayectoria Profesional y Académica**: AUDI México (2026), BUAP (Ingeniería en Ciencias de la Computación, 2021–2026) y CBTIS No. 30 (Técnico en Programación, 2018–2021).
- **Competencias y Certificaciones**: Samsung Innovation Campus (IA y Programación), Google Data Analytics Professional Certificate y Microsoft Python Development Professional Certificate.

## Estructura del Proyecto

```text
├── index.html          # Estructura semántica principal y SEO
├── index.css           # Sistema de diseño editorial (Modo Claro / Oscuro)
├── app.js              # Lógica interactiva, filtros y simuladores técnicos
├── vercel.json         # Configuración lista para despliegue en Vercel
└── assets/
    ├── profile.jpg                        # Fotografía profesional
    └── CV_Jose_Ivan_Gomez_Vazquez.docx    # CV descargable
```

## Cómo Publicar en Vercel (Paso a Paso)

### Opción 1: Desde GitHub (Recomendado — Despliegue Continuo)
1. Entra a [vercel.com](https://vercel.com/) e inicia sesión con tu cuenta de **GitHub** (`TamerNarciso`).
2. Haz clic en **Add New...** → **Project**.
3. Selecciona el repositorio **`TamerNarciso/PaginaWeb`** y haz clic en **Import**.
4. En *Framework Preset* deja **Other** (no requiere comando de build porque es arquitectura estática optimizada con `vercel.json`).
5. Haz clic en **Deploy**. En menos de 15 segundos tendrás tu URL pública (`https://pagina-web-....vercel.app`).

### Opción 2: Desde terminal con Vercel CLI
```bash
npx vercel --prod
```
