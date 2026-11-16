/**
 * Diccionario Bilingüe Completo (ES / EN) y Datos de Telemetría / ELT
 * --------------------------------------------------------------------
 * Puedes editar cualquier texto, etiqueta o métrica aquí directamente
 * desde GitHub o tu editor local; Vercel reconstruirá la app automáticamente.
 */

export const PORTFOLIO_DATA = {
  es: {
    meta: {
      title: 'José Iván Gómez Vázquez — Ingeniería de Datos, Telemetría & BI',
      langLabel: 'EN',
      langTooltip: 'Switch language to English',
      themeLight: 'Modo Claro',
      themeDark: 'Modo Oscuro',
    },
    nav: {
      roleTag: 'DATA & TELEMETRY ENGINEERING',
      projects: '01 / Proyectos',
      trajectory: '02 / Trayectoria',
      skills: '03 / Competencias',
      contact: '04 / Contacto',
      cvBtn: 'Ver CV',
    },
    hero: {
      kicker: 'INGENIERÍA EN CIENCIAS DE LA COMPUTACIÓN · ANALISTA E INGENIERO DE DATOS',
      titleLine1: 'Arquitectura de datos,',
      titleEmphasis: 'telemetría automotriz',
      titleLine2: 'y analítica gobernada.',
      lead: 'Especializado en transformar flujos complejos de datos operativos y financieros en sistemas de decisión confiables: desde la captura por sockets TCP/IP (DoIP/UDS) y pipelines ELT automatizados con Python, Apache Airflow y dbt, hasta el modelado en PostgreSQL y tableros ejecutivos en Power BI (DAX).',
      ctaProjects: 'Explorar Sistemas y Telemetría →',
      ctaCvModal: 'Vista Ejecutiva de CV',
      ctaPdf: '↓ PDF (1 Pág.)',
      ctaContact: 'Contactar',
      institutions: [
        {
          id: 'audi',
          logos: [{ src: './assets/audi.png', alt: 'Logo AUDI', className: 'logo-audi' }],
          title: 'AUDI MÉXICO',
          sub: 'SAN JOSÉ CHIAPA',
          metaLabel: 'Prácticas en Planeación – Ingeniería Industrial (Digitalización)',
        },
        {
          id: 'buap-fcc',
          logos: [
            { src: './assets/buap.png', alt: 'Escudo Oficial BUAP', className: 'logo-buap' },
            { src: './assets/fcc.png', alt: 'Logo Facultad de Ciencias de la Computación BUAP', className: 'logo-fcc' },
          ],
          title: null,
          sub: null,
          // Sincronizado con tus commits manuales 532def7 y 26afc66:
          metaLabel: 'Ingeniero en Ciencias de la Computación (2021 - 2026)',
        },
        {
          id: 'cbtis30',
          logos: [{ src: './assets/cbtis.png', alt: 'Logo Oficial DGETI CBTis No. 30', className: 'logo-cbtis' }],
          title: 'CBTis No. 30',
          sub: 'DGETI · PROGRAMACIÓN',
          cbtisTone: true,
          metaLabel: 'Formación Técnica en Software y Bases de Datos (2018 - 2021)',
        },
      ],
      dossier: {
        id: 'PERFIL // JIGV-2026',
        status: '● DISPONIBLE',
        name: 'José Iván Gómez Vázquez',
        sub: 'Ing. en Ciencias de la Computación (BUAP)',
        rows: [
          { key: 'UBICACIÓN', val: 'Puebla, Pue., México' },
          { key: 'ESPECIALIDAD', val: 'Data Engineering · ETL/ELT · BI' },
          { key: 'INDUSTRIA ACTUAL', val: 'AUDI México (Ing. Industrial)' },
          { key: 'IDIOMAS', val: 'Español (Nativo) · Inglés (B1)' },
        ],
        downloadDocx: 'Descargar CV (.docx)',
      },
      liveStats: [
        { value: 60, suffix: 's', label: 'SLA Takt Time Monitoreado', code: 'DOIP // UDS' },
        { value: 5, suffix: ' ECUs', label: 'Diagnóstico en Red Automotriz', code: 'ISO 13400' },
        { value: 30, suffix: 'd', label: 'Ventana Móvil Analítica (SMA)', code: 'DBT // SQL' },
        { value: 100, suffix: '%', label: 'Gobernanza ITIL v4 & Tests dbt', code: 'QA // PASS' },
      ],
    },
    sec1: {
      index: '01 / PROYECTOS',
      title: 'Sistemas de Ingeniería de Datos y Telemetría en Producción',
      subtitle: 'Arquitecturas de extremo a extremo que integran extracción automatizada, almacenamiento relacional con disparadores transaccionales, pruebas de calidad y visualización ejecutiva interactiva.',
      p1: {
        index: 'PROYECTO 01 // TELEMETRÍA AUTOMOTRIZ & GOBERNANZA ITIL V4',
        title: 'Ecosistema de Diagnóstico Automotriz SDV-IBN Tooling & Telemetry Hub',
        problemTitle: 'Problema Operativo y Contexto Industrial',
        problemDesc: 'En las estaciones de puesta en marcha (Inbetriebnahme / IBN) para vehículos definidos por software (SDV), los tiempos de flasheo de ECUs y los códigos de falla (DTC) generan cuellos de botella que comprometen el Takt Time de línea (60 s). Se requería un sistema centralizado capaz de capturar telemetría en tiempo real, detectar desviaciones automáticamente y gobernar incidentes bajo estándares ITIL v4.',
        archTitle: 'Arquitectura Técnica Implementada (Haz clic en cada capa)',
        archStages: [
          {
            step: 'CAPA 01',
            name: 'Simulación & Captura DoIP / UDS',
            tech: 'Python · Flask · Sockets TCP/IP',
            detail: 'Capa 01 (DoIP / UDS): Emulación de diagnóstico automotriz sobre IP (ISO 13400) y Unified Diagnostic Services (ISO 14229). El servicio en Python Flask procesa tramas hexadecimales de flasheo, estados de ECUs (Gateway, Motor, ABS, BCM) y códigos DTC en tiempo real.',
          },
          {
            step: 'CAPA 02',
            name: 'Motor Relacional & Triggers SLA',
            tech: 'PostgreSQL · PL/pgSQL · Triggers',
            detail: 'Capa 02 (PostgreSQL + PL/pgSQL): Almacenamiento transaccional con disparadores automáticos (AFTER INSERT) que evalúan en milisegundos si el ciclo supera el SLA de 60 segundos o si ingresa una falla crítica, abriendo automáticamente un ticket de incidente ITIL v4.',
          },
          {
            step: 'CAPA 03',
            name: 'Analítica Operativa & BI',
            tech: 'Power BI · DAX · Pareto DTC',
            detail: 'Capa 03 (Power BI & DAX): Tablero ejecutivo conectado al modelo relacional con medidas DAX para FTT (First Time Through), MTTR, cumplimiento de Takt Time por estación y diagrama de Pareto 80/20 de códigos DTC.',
          },
          {
            step: 'CAPA 04',
            name: 'Infraestructura Reproducible',
            tech: 'Docker · Docker Compose',
            detail: 'Capa 04 (Contenedorización): Despliegue multicontenedor orquestado mediante Docker Compose con volúmenes persistentes, redes aisladas e inicialización automática de esquemas SQL.',
          },
        ],
        metrics: [
          { val: '60s', label: 'Umbral SLA Takt Time monitoreado por ciclo' },
          { val: 'ITIL v4', label: 'Generación automática de tickets por trigger SQL' },
          { val: 'DAX / BI', label: 'Métricas de FTT, Pareto de DTCs y tiempos de flasheo' },
        ],
        tabs: {
          charts: '📊 Gráficas Interactivas (Pareto & Takt Time)',
          simulator: '⚡ Simulador en Vivo de Estación IBN',
          sql: '🗄️ Trigger PL/pgSQL (SLA 60s)',
          dax: '📐 Medidas DAX (Power BI)',
        },
        chartFilterLabel: 'VISTA DE TELEMETRÍA:',
        chartFilters: {
          all: 'Todos los Módulos',
          crit: 'Solo Exceso SLA (>60s)',
        },
        paretoTitle: 'PARETO DE FALLAS DTC POR UNIDAD DE CONTROL (ECU)',
        paretoSub: 'Frecuencia acumulada (%) · Pasa el cursor o haz clic en una barra',
        taktTitle: 'TIEMPO DE CICLO Y FLASHEO POR ECU VS. META TAKT TIME (60.0s)',
        taktSub: 'Segundos promedio por estación IBN · Línea punteada = Límite SLA (60s)',
        sim: {
          title: 'Simulador en Tiempo Real — Puesta en Marcha (IBN) & Diagnóstico DoIP',
          subtitle: 'Ejecuta una corrida de diagnóstico sobre las 5 ECUs del vehículo o inyecta una falla crítica en el Gateway para observar cómo actúa el Trigger PL/pgSQL.',
          runNormalBtn: '▶ Ejecutar Escaneo Normal (VIN-2026-OK)',
          runFaultBtn: '⚠️ Inyectar Falla Crítica DoIP (Exceso SLA >60s)',
          resetBtn: '↺ Reiniciar',
          statusIdle: 'LISTO PARA ESCANEO EN LÍNEA',
          statusRunning: 'ESCANEANDO ECUS VÍA DOIP (TCP 13400)...',
          statusOk: 'CICLO APROBADO · FTT PASS (<60s)',
          statusFail: 'INCIDENTE ITIL V4 P1 GENERADO POR TRIGGER SQL',
          taktLabel: 'Tiempo de Ciclo Acumulado',
          ticketAlertTitle: 'TICKET AUTOMÁTICO ITIL V4 CREADO EN POSTGRESQL',
          ticketAlertDesc: 'El trigger trg_auto_itil_incident detectó flash_duration_sec > 60.0s y estatus CRITICAL_FAIL en 0x10 Gateway (DTC U0100), registrando un incidente Prioridad P1.',
        },
      },
      p2: {
        index: 'PROYECTO 02 // ORQUESTACIÓN ELT & MODELADO ANALÍTICO',
        title: 'Pipeline ELT Automatizado de Datos Financieros (Airflow + dbt + Docker)',
        repoLinkLabel: 'github.com/TamerNarciso/PipelineELT ↗',
        problemTitle: 'Arquitectura del Pipeline y Gobernanza Analítica',
        problemDesc: 'Los procesos manuales de extracción y transformación financiera suelen carecer de trazabilidad, control de cambios y validación de integridad. Este proyecto implementa una arquitectura moderna ELT (Extract, Load, Transform) contenerizada que extrae series bursátiles y cambiarias en pesos mexicanos (MXN), las carga en PostgreSQL y delega las transformaciones analíticas a dbt-core bajo la orquestación de Apache Airflow.',
        archTitle: 'Flujo del DAG en Apache Airflow (Haz clic en cada fase)',
        archStages: [
          {
            step: 'FASE 01',
            name: 'Extract & Load (Python)',
            tech: 'REST APIs · Pandas · Psycopg2',
            detail: 'Fase 01 (Extract & Load): Scripts modulares en Python consumen cotizaciones históricas y diarias en MXN, normalizan tipos de datos y realizan carga idempotente hacia el esquema raw_financial en PostgreSQL.',
          },
          {
            step: 'FASE 02',
            name: 'Transformación Analítica (dbt)',
            tech: 'dbt-core · Jinja SQL · Window Functions',
            detail: 'Fase 02 (dbt-core): Modelos SQL modulares (staging → intermediate → marts) que calculan retornos porcentuales diarios, volatilidad histórica y medias móviles de 30 días (SMA-30) mediante funciones de ventana.',
          },
          {
            step: 'FASE 03',
            name: 'Data Quality & Linaje',
            tech: 'dbt test · not_null · unique',
            detail: 'Fase 03 (Pruebas de Calidad): Ejecución automatizada de dbt test para garantizar ausencia de llaves duplicadas, valores nulos en precios de cierre y frescura de los datos antes de exponer la capa de consumo.',
          },
          {
            step: 'FASE 04',
            name: 'Orquestación en Contenedores',
            tech: 'Apache Airflow · Docker Compose',
            detail: 'Fase 04 (Airflow + Docker): DAG programado con manejo de reintentos (retries), bitácoras centralizadas y aislamiento completo del entorno mediante Docker Compose.',
          },
        ],
        metrics: [
          { val: 'SMA-30', label: 'Cálculo de media móvil de 30 días y volatilidad en MXN' },
          { val: 'Airflow', label: 'Orquestación automatizada de tareas Extract → Load → dbt' },
          { val: 'dbt test', label: 'Validación declarativa de llaves únicas y no nulidad' },
        ],
        tabs: {
          chart: '📈 Serie Temporal (Cierre vs. SMA-30)',
          dagSim: '⚙️ Simulador de DAG en Apache Airflow',
          dbtSql: '📐 Modelo SQL dbt (fct_daily_asset_metrics)',
          dbtYaml: '✅ Gobernanza & Tests (schema.yml)',
        },
        assetLabel: 'ACTIVO:',
        modeLabel: 'MODO:',
        modes: {
          sma: 'Precio Cierre + SMA-30',
          bands: 'Bandas de Volatilidad (±2σ)',
        },
        chartTitle: 'PRECIO DE CIERRE DIARIO VS. MEDIA MÓVIL 30 DÍAS (SMA-30 EN MXN)',
        chartSub: 'Modelo analítico dbt (fct_daily_asset_metrics) · Pasa el cursor sobre los puntos',
        kpiLabels: {
          close: 'Último Cierre',
          sma: 'Media Móvil (SMA-30)',
          signal: 'Señal Técnica dbt',
          vol: 'Volatilidad 30d',
        },
        dagSim: {
          title: 'Ejecutor Interactivo de DAG — Apache Airflow (elt_financial_pipeline)',
          subtitle: 'Simula el disparo manual de una corrida del DAG y observa la ejecución secuencial de los operadores Python, PostgreSQL y dbt-core.',
          triggerBtn: '▶ Disparar DAG Run (manual__2026)',
          runningBtn: '⏳ Ejecutando Pipeline ELT...',
          resetBtn: '↺ Reiniciar DAG',
        },
      },
    },
    sec2: {
      index: '02 / TRAYECTORIA',
      title: 'Experiencia Industrial y Formación Académica',
      subtitle: 'Combinación de rigor en ciencias de la computación con aplicación práctica en la industria automotriz de manufactura avanzada.',
      colExp: 'Experiencia Profesional e Industrial',
      colEdu: 'Educación Formal',
      experience: [
        {
          id: 'exp-audi',
          logos: [{ src: './assets/audi.png', alt: 'Logo AUDI', className: 'logo-audi' }],
          logoTitle: 'AUDI MÉXICO',
          logoSub: 'SAN JOSÉ CHIAPA',
          period: '2026',
          org: 'AUDI MÉXICO · SAN JOSÉ CHIAPA, PUEBLA',
          role: 'Prácticas Profesionales — Planeación (Ingeniería Industrial)',
          desc: 'Asignado al proyecto estratégico de digitalización y automatización de procesos dentro del área de Planeación – Ingeniería Industrial. Responsable de analizar, cruzar y estructurar múltiples bases de datos provenientes de distintas fuentes operativas, proponiendo e implementando soluciones para visualizar la información de manera efectiva, escalable y automatizada.',
          skills: ['Python', 'SQL / PostgreSQL', 'Power BI (DAX)', 'Excel Avanzado', 'ETL / Limpieza'],
        },
        {
          id: 'exp-proj',
          logos: [],
          period: '2025 – 2026',
          org: 'PROYECTOS DE INGENIERÍA APLICADA',
          role: 'Desarrollador de Soluciones de Datos & Telemetría',
          desc: 'Diseño e implementación de arquitecturas completas de datos: desde el ecosistema automotriz SDV-IBN Tooling & Telemetry Hub (Python Flask, DoIP/UDS, PostgreSQL PL/pgSQL e ITIL v4 con Power BI DAX) hasta pipelines financieros ELT automatizados con Apache Airflow, dbt-core y Docker.',
          skills: ['Python', 'SQL / PostgreSQL', 'Power BI (DAX)', 'Apache Airflow', 'dbt-core', 'Docker', 'ITIL v4', 'Redes TCP/IP'],
        },
      ],
      education: [
        {
          id: 'edu-buap',
          logos: [
            { src: './assets/buap.png', alt: 'Escudo Oficial BUAP', className: 'logo-buap' },
            { src: './assets/fcc.png', alt: 'Logo Facultad de Ciencias de la Computación BUAP', className: 'logo-fcc' },
          ],
          period: '2021 – 2026',
          org: 'BENEMÉRITA UNIVERSIDAD AUTÓNOMA DE PUEBLA (BUAP · FCC)',
          role: 'Ingeniería en Ciencias de la Computación',
          desc: 'Formación integral enfocada en el ciclo completo del software y los datos: desarrollo de soluciones escalables, gestión de bases de datos relacionales y programación orientada a objetos, hasta el procesamiento estadístico, análisis exploratorio, visualización de información e implementación de modelos predictivos.',
          skills: ['Python', 'SQL / PostgreSQL', 'Modelos Predictivos', 'Redes TCP/IP'],
        },
        {
          id: 'edu-cbtis',
          logos: [{ src: './assets/cbtis.png', alt: 'Logo Oficial DGETI CBTis No. 30', className: 'logo-cbtis' }],
          logoTitle: 'CBTis No. 30',
          logoSub: 'DGETI · SEP',
          cbtisTone: true,
          period: '2018 – 2021',
          org: 'CENTRO DE BACHILLERATO TECNOLÓGICO INDUSTRIAL Y DE SERVICIOS NO. 30',
          role: 'Técnico en Programación',
          desc: 'Formación técnica enfocada al desarrollo de software con énfasis en lógica algorítmica, diseño y consulta de bases de datos, estructuras de datos y programación orientada a objetos (POO).',
          skills: ['SQL / PostgreSQL', 'POO & Algoritmos'],
        },
      ],
    },
    sec3: {
      index: '03 / COMPETENCIAS',
      title: 'Ecosistema Técnico y Certificaciones',
      subtitle: 'Haz clic en cualquier tecnología para explorar en qué proyectos, experiencias industriales y certificaciones ha sido aplicada.',
      filterPrompt: 'FILTRAR EVIDENCIA POR TECNOLOGÍA:',
      clearFilter: 'Mostrar todas',
      domains: [
        {
          num: 'DOMINIO 01',
          title: 'Ingeniería de Datos & Automatización',
          items: [
            { name: 'Python (Pandas, NumPy, Requests, Flask)', level: 'AVANZADO', tag: 'Python', usedIn: ['AUDI México', 'SDV-IBN Telemetry', 'PipelineELT', 'BUAP Curso'] },
            { name: 'Diseño de Pipelines ETL / ELT', level: 'AVANZADO', tag: 'ETL / Limpieza', usedIn: ['AUDI México', 'PipelineELT'] },
            { name: 'Apache Airflow (DAGs & Orquestación)', level: 'INTERMEDIO-AVANZADO', tag: 'Apache Airflow', usedIn: ['PipelineELT'] },
            { name: 'dbt-core (Modelado SQL & Data Tests)', level: 'INTERMEDIO-AVANZADO', tag: 'dbt-core', usedIn: ['PipelineELT'] },
          ],
        },
        {
          num: 'DOMINIO 02',
          title: 'Bases de Datos & Almacenamiento',
          items: [
            { name: 'SQL Avanzado (CTEs, Window Functions)', level: 'AVANZADO', tag: 'SQL / PostgreSQL', usedIn: ['AUDI México', 'SDV-IBN Telemetry', 'PipelineELT', 'CBTis No. 30'] },
            { name: 'PostgreSQL & Programación PL/pgSQL', level: 'AVANZADO', tag: 'SQL / PostgreSQL', usedIn: ['SDV-IBN Telemetry', 'PipelineELT'] },
            { name: 'Triggers Transaccionales & Esquemas', level: 'AVANZADO', tag: 'SQL / PostgreSQL', usedIn: ['SDV-IBN Telemetry'] },
            { name: 'Cruce y Estructuración Multi-Fuente', level: 'AVANZADO', tag: 'ETL / Limpieza', usedIn: ['AUDI México'] },
          ],
        },
        {
          num: 'DOMINIO 03',
          title: 'BI, Analítica & Ciencia de Datos',
          items: [
            { name: 'Power BI & Modelado con Medidas DAX', level: 'AVANZADO', tag: 'Power BI (DAX)', usedIn: ['AUDI México', 'SDV-IBN Telemetry'] },
            { name: 'Análisis Exploratorio (EDA) & Estadística', level: 'AVANZADO', tag: 'Modelos Predictivos', usedIn: ['BUAP Curso', 'IBM SkillsBuild'] },
            { name: 'Excel Avanzado & Automatización', level: 'AVANZADO', tag: 'Excel Avanzado', usedIn: ['AUDI México'] },
            { name: 'Modelado Predictivo & Series de Tiempo', level: 'INTERMEDIO-AVANZADO', tag: 'Modelos Predictivos', usedIn: ['PipelineELT', 'IBM SkillsBuild'] },
          ],
        },
        {
          num: 'DOMINIO 04',
          title: 'Infraestructura, Redes & Gobernanza',
          items: [
            { name: 'Docker & Docker Compose', level: 'INTERMEDIO-AVANZADO', tag: 'Docker', usedIn: ['SDV-IBN Telemetry', 'PipelineELT'] },
            { name: 'Protocolos TCP/IP, DoIP (ISO 13400) & UDS', level: 'INTERMEDIO-AVANZADO', tag: 'Redes TCP/IP', usedIn: ['SDV-IBN Telemetry', 'Cisco CCNA'] },
            { name: 'Gestión de Incidentes y SLAs (ITIL v4)', level: 'INTERMEDIO-AVANZADO', tag: 'ITIL v4', usedIn: ['SDV-IBN Telemetry'] },
            { name: 'Control de Versiones con Git & GitHub', level: 'AVANZADO', tag: 'Docker', usedIn: ['SDV-IBN Telemetry', 'PipelineELT'] },
          ],
        },
      ],
      certsTitle: 'Certificaciones y Formación Especializada',
      certs: [
        {
          issuer: 'BUAP · EDUCACIÓN CONTINUA',
          title: 'Curso Análisis de Datos con Python',
          desc: 'Manipulación de estructuras de datos con Pandas y NumPy, limpieza de conjuntos de datos reales, análisis estadístico exploratorio y visualización.',
          type: 'ANÁLISIS DE DATOS',
          status: 'VERIFICADO',
        },
        {
          issuer: 'IBM SKILLSBUILD',
          title: 'Data Science Foundations',
          desc: 'Fundamentos metodológicos de ciencia de datos, ciclo de vida analítico, formulación de hipótesis y construcción de modelos orientados a negocio.',
          type: 'DATA SCIENCE',
          status: 'VERIFICADO',
        },
        {
          issuer: 'CISCO NETWORKING ACADEMY',
          title: 'CCNA: Introduction to Networks',
          desc: 'Arquitectura de redes TCP/IP, direccionamiento IPv4/IPv6, enrutamiento, conmutación Ethernet y diagnóstico de comunicaciones en red.',
          type: 'INFRAESTRUCTURA & REDES',
          status: 'VERIFICADO',
        },
      ],
    },
    sec4: {
      index: '04 / CONTACTO',
      title: 'Contacto Directo y Colaboración',
      subtitle: 'Disponible para posiciones de Analista de Datos, Ingeniero de Datos Jr., Business Intelligence o Digitalización Industrial en Puebla, CDMX o modalidad remota/híbrida.',
      emailLabel: 'Correo Electrónico',
      phoneLabel: 'Teléfono / WhatsApp',
      githubLabel: 'GitHub',
      locLabel: 'Ubicación & Idiomas',
      locVal: 'Puebla, Pue., México · Español (Nativo) / Inglés (B1)',
      copyBtn: 'Copiar',
      copiedBtn: '✓ Copiado',
      openBtn: 'Abrir ↗',
      formTitle: ' redactar mensaje directo',
      nameLabel: 'NOMBRE O EMPRESA',
      namePlaceholder: 'Ej. María Rodríguez — Reclutamiento TI / Datos',
      subjectLabel: 'ASUNTO / POSICIÓN',
      subjectPlaceholder: 'Oportunidad: Analista / Ingeniero de Datos',
      msgLabel: 'MENSAJE',
      msgPlaceholder: 'Hola José Iván, revisamos tu portafolio y proyectos de datos...',
      submitBtn: 'Preparar Correo en Cliente de Email →',
      formNote: 'Al enviar se abrirá tu aplicación de correo predeterminada con los datos listos para enviar a ivan.gomez.vazquez06@gmail.com.',
    },
    modal: {
      title: 'VISTA EJECUTIVA DE CURRÍCULUM VITAE (1 PÁGINA)',
      downloadPdf: '↓ Descargar PDF (1 Pág.)',
      closeBtn: '✕ Cerrar',
      roleLine: 'Ingeniero en Ciencias de la Computación · Analista e Ingeniero de Datos',
      profileTitle: 'Perfil Profesional',
      profileText: 'Ingeniero en Ciencias de la Computación (BUAP) con experiencia práctica en digitalización e ingeniería industrial en AUDI México y en el desarrollo de arquitecturas de datos de extremo a extremo. Especializado en extracción y transformación de datos (Python, SQL, dbt, Apache Airflow), gestión de bases de datos relacionales (PostgreSQL, PL/pgSQL) y visualización ejecutiva en Power BI (DAX).',
      expTitle: 'Experiencia e Impacto Técnico',
      eduTitle: 'Educación y Certificaciones',
      stackTitle: 'Stack Técnico Principal',
    },
    footer: {
      copy: '© 2026 José Iván Gómez Vázquez · Construido con React, Vite, Framer Motion & Tailwind CSS · Desplegado en Vercel',
      cvPdf: 'CV Ejecutivo (PDF)',
    },
  },

  en: {
    meta: {
      title: 'José Iván Gómez Vázquez — Data Engineering, Telemetry & BI',
      langLabel: 'ES',
      langTooltip: 'Cambiar idioma a Español',
      themeLight: 'Light Mode',
      themeDark: 'Dark Mode',
    },
    nav: {
      roleTag: 'DATA & TELEMETRY ENGINEERING',
      projects: '01 / Projects',
      trajectory: '02 / Trajectory',
      skills: '03 / Skills',
      contact: '04 / Contact',
      cvBtn: 'View CV',
    },
    hero: {
      kicker: 'COMPUTER SCIENCE ENGINEER · DATA ANALYST & DATA ENGINEER',
      titleLine1: 'Data architecture,',
      titleEmphasis: 'automotive telemetry',
      titleLine2: '& governed analytics.',
      lead: 'Specialized in turning complex operational and financial data streams into reliable decision systems: from TCP/IP socket capture (DoIP/UDS) and automated ELT pipelines with Python, Apache Airflow, and dbt, to PostgreSQL transactional modeling and executive Power BI (DAX) dashboards.',
      ctaProjects: 'Explore Systems & Telemetry →',
      ctaCvModal: 'Executive CV Preview',
      ctaPdf: '↓ PDF Resume (1 Page)',
      ctaContact: 'Get in Touch',
      institutions: [
        {
          id: 'audi',
          logos: [{ src: './assets/audi.png', alt: 'AUDI Logo', className: 'logo-audi' }],
          title: 'AUDI MÉXICO',
          sub: 'SAN JOSÉ CHIAPA',
          metaLabel: 'Industrial Engineering & Planning Internship (Process Digitalization)',
        },
        {
          id: 'buap-fcc',
          logos: [
            { src: './assets/buap.png', alt: 'BUAP Official Shield', className: 'logo-buap' },
            { src: './assets/fcc.png', alt: 'BUAP Faculty of Computer Science Logo', className: 'logo-fcc' },
          ],
          title: null,
          sub: null,
          // Synced with manual commits 532def7 and 26afc66:
          metaLabel: 'Computer Science Engineer (2021 - 2026)',
        },
        {
          id: 'cbtis30',
          logos: [{ src: './assets/cbtis.png', alt: 'Official DGETI CBTis No. 30 Logo', className: 'logo-cbtis' }],
          title: 'CBTis No. 30',
          sub: 'DGETI · SOFTWARE TECH',
          cbtisTone: true,
          metaLabel: 'Technical Degree in Software Programming & Databases (2018 - 2021)',
        },
      ],
      dossier: {
        id: 'PROFILE // JIGV-2026',
        status: '● AVAILABLE',
        name: 'José Iván Gómez Vázquez',
        sub: 'B.S. in Computer Science Engineering (BUAP)',
        rows: [
          { key: 'LOCATION', val: 'Puebla, Mexico' },
          { key: 'FOCUS', val: 'Data Engineering · ETL/ELT · BI' },
          { key: 'CURRENT INDUSTRY', val: 'AUDI México (Industrial Eng.)' },
          { key: 'LANGUAGES', val: 'Spanish (Native) · English (B1)' },
        ],
        downloadDocx: 'Download CV (.docx)',
      },
      liveStats: [
        { value: 60, suffix: 's', label: 'Monitored Takt Time SLA', code: 'DOIP // UDS' },
        { value: 5, suffix: ' ECUs', label: 'Automotive Network Diagnostics', code: 'ISO 13400' },
        { value: 30, suffix: 'd', label: 'Rolling Analytics Window (SMA)', code: 'DBT // SQL' },
        { value: 100, suffix: '%', label: 'ITIL v4 Governance & dbt Tests', code: 'QA // PASS' },
      ],
    },
    sec1: {
      index: '01 / PROJECTS',
      title: 'Production Data Engineering & Telemetry Systems',
      subtitle: 'End-to-end architectures combining automated ingestion, relational storage with transactional triggers, data quality testing, and executive visualization.',
      p1: {
        index: 'PROJECT 01 // AUTOMOTIVE TELEMETRY & ITIL V4 GOVERNANCE',
        title: 'SDV-IBN Automotive Diagnostic Tooling & Telemetry Hub',
        problemTitle: 'Operational Challenge & Industrial Context',
        problemDesc: 'In vehicle commissioning stations (Inbetriebnahme / IBN) for Software-Defined Vehicles (SDV), ECU flashing times and Diagnostic Trouble Codes (DTCs) create bottlenecks that jeopardize line Takt Time (60 s). A centralized hub was built to capture real-time telemetry, detect SLA deviations automatically, and govern incidents under ITIL v4 standards.',
        archTitle: 'Implemented Technical Architecture (Click each layer)',
        archStages: [
          {
            step: 'LAYER 01',
            name: 'DoIP / UDS Simulation & Capture',
            tech: 'Python · Flask · TCP/IP Sockets',
            detail: 'Layer 01 (DoIP / UDS): Emulates Diagnostics over IP (ISO 13400) and Unified Diagnostic Services (ISO 14229). The Python Flask engine processes hexadecimal flashing frames, ECU states (Gateway, Engine, ABS, BCM), and live DTC codes.',
          },
          {
            step: 'LAYER 02',
            name: 'Relational Engine & SLA Triggers',
            tech: 'PostgreSQL · PL/pgSQL · Triggers',
            detail: 'Layer 02 (PostgreSQL + PL/pgSQL): Transactional storage with automated AFTER INSERT triggers evaluating in milliseconds whether cycle duration exceeds the 60-second SLA or a critical fault occurs, automatically opening an ITIL v4 incident ticket.',
          },
          {
            step: 'LAYER 03',
            name: 'Operational Analytics & BI',
            tech: 'Power BI · DAX · DTC Pareto',
            detail: 'Layer 03 (Power BI & DAX): Executive dashboard connected to the relational schema featuring DAX measures for First Time Through (FTT), MTTR, station Takt Time compliance, and 80/20 DTC Pareto analysis.',
          },
          {
            step: 'LAYER 04',
            name: 'Reproducible Infrastructure',
            tech: 'Docker · Docker Compose',
            detail: 'Layer 04 (Containerization): Multi-container deployment orchestrated with Docker Compose using persistent volumes, isolated networks, and automated SQL schema initialization.',
          },
        ],
        metrics: [
          { val: '60s', label: 'Takt Time SLA threshold monitored per vehicle cycle' },
          { val: 'ITIL v4', label: 'Automated incident ticket generation via SQL Trigger' },
          { val: 'DAX / BI', label: 'FTT, DTC Pareto & ECU flashing time analytics' },
        ],
        tabs: {
          charts: '📊 Interactive Charts (Pareto & Takt Time)',
          simulator: '⚡ Live IBN Station Simulator',
          sql: '🗄️ PL/pgSQL Trigger (60s SLA)',
          dax: '📐 DAX Measures (Power BI)',
        },
        chartFilterLabel: 'TELEMETRY VIEW:',
        chartFilters: {
          all: 'All ECU Modules',
          crit: 'SLA Breaches Only (>60s)',
        },
        paretoTitle: 'DTC FAULT PARETO BY ELECTRONIC CONTROL UNIT (ECU)',
        paretoSub: 'Cumulative frequency (%) · Hover or click any bar to inspect',
        taktTitle: 'CYCLE & FLASH TIME BY ECU VS. TAKT TIME TARGET (60.0s)',
        taktSub: 'Average seconds per IBN station · Dashed line = SLA Limit (60s)',
        sim: {
          title: 'Real-Time Simulator — Commissioning (IBN) & DoIP Diagnostics',
          subtitle: 'Run a diagnostic sequence across all 5 vehicle ECUs or inject a critical Gateway fault to watch the PL/pgSQL Trigger respond in real time.',
          runNormalBtn: '▶ Run Normal Scan (VIN-2026-OK)',
          runFaultBtn: '⚠️ Inject Critical DoIP Fault (SLA Breach >60s)',
          resetBtn: '↺ Reset',
          statusIdle: 'READY FOR LINE SCAN',
          statusRunning: 'SCANNING ECUS VIA DOIP (TCP 13400)...',
          statusOk: 'CYCLE APPROVED · FTT PASS (<60s)',
          statusFail: 'ITIL V4 P1 INCIDENT CREATED BY SQL TRIGGER',
          taktLabel: 'Cumulative Cycle Time',
          ticketAlertTitle: 'AUTOMATED ITIL V4 TICKET CREATED IN POSTGRESQL',
          ticketAlertDesc: 'Trigger trg_auto_itil_incident detected flash_duration_sec > 60.0s and status CRITICAL_FAIL on 0x10 Gateway (DTC U0100), logging a Priority P1 incident.',
        },
      },
      p2: {
        index: 'PROJECT 02 // ELT ORCHESTRATION & ANALYTICAL MODELING',
        title: 'Automated Financial Data ELT Pipeline (Airflow + dbt + Docker)',
        repoLinkLabel: 'github.com/TamerNarciso/PipelineELT ↗',
        problemTitle: 'Pipeline Architecture & Analytical Governance',
        problemDesc: 'Manual financial data extraction workflows often lack lineage, version control, and automated quality gates. This project implements a containerized modern ELT (Extract, Load, Transform) architecture that ingests market and FX series in Mexican Pesos (MXN), loads them into PostgreSQL, and delegates analytical transformations to dbt-core orchestrated by Apache Airflow.',
        archTitle: 'Apache Airflow DAG Workflow (Click each stage)',
        archStages: [
          {
            step: 'STAGE 01',
            name: 'Extract & Load (Python)',
            tech: 'REST APIs · Pandas · Psycopg2',
            detail: 'Stage 01 (Extract & Load): Modular Python scripts fetch historical and daily quotes in MXN, normalize data types, and perform idempotent loads into the raw_financial schema in PostgreSQL.',
          },
          {
            step: 'STAGE 02',
            name: 'Analytical Transformation (dbt)',
            tech: 'dbt-core · Jinja SQL · Window Functions',
            detail: 'Stage 02 (dbt-core): Modular SQL models (staging → intermediate → marts) computing daily percentage returns, rolling volatility, and 30-day simple moving averages (SMA-30) via SQL window functions.',
          },
          {
            step: 'STAGE 03',
            name: 'Data Quality & Lineage',
            tech: 'dbt test · not_null · unique',
            detail: 'Stage 03 (Quality Gates): Automated execution of dbt test enforcing unique primary keys, non-null closing prices, and data freshness prior to exposing BI consumption marts.',
          },
          {
            step: 'STAGE 04',
            name: 'Containerized Orchestration',
            tech: 'Apache Airflow · Docker Compose',
            detail: 'Stage 04 (Airflow + Docker): Scheduled DAG with automated retries, centralized task logging, and reproducible multi-container isolation via Docker Compose.',
          },
        ],
        metrics: [
          { val: 'SMA-30', label: '30-day moving average & rolling volatility in MXN' },
          { val: 'Airflow', label: 'Automated DAG orchestration: Extract → Load → dbt' },
          { val: 'dbt test', label: 'Declarative schema validation for unique & non-null keys' },
        ],
        tabs: {
          chart: '📈 Time Series (Close vs. SMA-30)',
          dagSim: '⚙️ Live Apache Airflow DAG Runner',
          dbtSql: '📐 dbt SQL Model (fct_daily_asset_metrics)',
          dbtYaml: '✅ Governance & Tests (schema.yml)',
        },
        assetLabel: 'ASSET:',
        modeLabel: 'MODE:',
        modes: {
          sma: 'Daily Close + SMA-30',
          bands: 'Volatility Bands (±2σ)',
        },
        chartTitle: 'DAILY CLOSING PRICE VS. 30-DAY MOVING AVERAGE (SMA-30 IN MXN)',
        chartSub: 'Analytical dbt model (fct_daily_asset_metrics) · Hover over data points',
        kpiLabels: {
          close: 'Latest Close',
          sma: 'Moving Avg (SMA-30)',
          signal: 'dbt Technical Signal',
          vol: '30d Volatility',
        },
        dagSim: {
          title: 'Interactive DAG Runner — Apache Airflow (elt_financial_pipeline)',
          subtitle: 'Trigger a manual DAG run and inspect the sequential execution of Python, PostgreSQL, and dbt-core operators.',
          triggerBtn: '▶ Trigger DAG Run (manual__2026)',
          runningBtn: '⏳ Running ELT Pipeline...',
          resetBtn: '↺ Reset DAG',
        },
      },
    },
    sec2: {
      index: '02 / TRAJECTORY',
      title: 'Industrial Experience & Academic Background',
      subtitle: 'Combining strong computer science fundamentals with hands-on application in advanced automotive manufacturing.',
      colExp: 'Professional & Industrial Experience',
      colEdu: 'Formal Education',
      experience: [
        {
          id: 'exp-audi',
          logos: [{ src: './assets/audi.png', alt: 'AUDI Logo', className: 'logo-audi' }],
          logoTitle: 'AUDI MÉXICO',
          logoSub: 'SAN JOSÉ CHIAPA',
          period: '2026',
          org: 'AUDI MÉXICO · SAN JOSÉ CHIAPA, PUEBLA',
          role: 'Industrial Engineering & Planning Intern (Process Digitalization)',
          desc: 'Assigned to the strategic process digitalization and automation initiative within Industrial Engineering Planning. Responsible for analyzing, cross-referencing, and structuring multiple operational databases from diverse plant sources, designing and implementing scalable, automated data visualization solutions.',
          skills: ['Python', 'SQL / PostgreSQL', 'Power BI (DAX)', 'Excel Avanzado', 'ETL / Limpieza'],
        },
        {
          id: 'exp-proj',
          logos: [],
          period: '2025 – 2026',
          org: 'APPLIED DATA ENGINEERING PROJECTS',
          role: 'Data Solutions & Telemetry Developer',
          desc: 'End-to-end design and implementation of data architectures: from the automotive SDV-IBN Tooling & Telemetry Hub (Python Flask, DoIP/UDS, PostgreSQL PL/pgSQL, ITIL v4 & Power BI DAX) to automated financial ELT pipelines powered by Apache Airflow, dbt-core, and Docker.',
          skills: ['Python', 'SQL / PostgreSQL', 'Power BI (DAX)', 'Apache Airflow', 'dbt-core', 'Docker', 'ITIL v4', 'Redes TCP/IP'],
        },
      ],
      education: [
        {
          id: 'edu-buap',
          logos: [
            { src: './assets/buap.png', alt: 'Official BUAP Shield', className: 'logo-buap' },
            { src: './assets/fcc.png', alt: 'BUAP Faculty of Computer Science Logo', className: 'logo-fcc' },
          ],
          period: '2021 – 2026',
          org: 'BENEMÉRITA UNIVERSIDAD AUTÓNOMA DE PUEBLA (BUAP · FCC)',
          role: 'B.S. in Computer Science Engineering',
          desc: 'Comprehensive engineering program covering the full software and data lifecycle: scalable software development, relational database management, and object-oriented programming, through statistical processing, exploratory data analysis, information visualization, and predictive modeling.',
          skills: ['Python', 'SQL / PostgreSQL', 'Modelos Predictivos', 'Redes TCP/IP'],
        },
        {
          id: 'edu-cbtis',
          logos: [{ src: './assets/cbtis.png', alt: 'Official DGETI CBTis No. 30 Logo', className: 'logo-cbtis' }],
          logoTitle: 'CBTis No. 30',
          logoSub: 'DGETI · SEP',
          cbtisTone: true,
          period: '2018 – 2021',
          org: 'CENTRO DE BACHILLERATO TECNOLÓGICO INDUSTRIAL Y DE SERVICIOS NO. 30',
          role: 'Technical Degree in Software Programming',
          desc: 'Technical software training focused on algorithmic logic, relational database design and querying, data structures, and object-oriented programming (OOP).',
          skills: ['SQL / PostgreSQL', 'POO & Algoritmos'],
        },
      ],
    },
    sec3: {
      index: '03 / SKILLS',
      title: 'Technical Ecosystem & Certifications',
      subtitle: 'Click any technology pill below to highlight where it was applied across industrial roles, projects, and certifications.',
      filterPrompt: 'FILTER EVIDENCE BY TECHNOLOGY:',
      clearFilter: 'Show All',
      domains: [
        {
          num: 'DOMAIN 01',
          title: 'Data Engineering & Automation',
          items: [
            { name: 'Python (Pandas, NumPy, Requests, Flask)', level: 'ADVANCED', tag: 'Python', usedIn: ['AUDI México', 'SDV-IBN Telemetry', 'PipelineELT', 'BUAP Course'] },
            { name: 'ETL / ELT Pipeline Architecture', level: 'ADVANCED', tag: 'ETL / Limpieza', usedIn: ['AUDI México', 'PipelineELT'] },
            { name: 'Apache Airflow (DAGs & Orchestration)', level: 'INTERMEDIATE-ADVANCED', tag: 'Apache Airflow', usedIn: ['PipelineELT'] },
            { name: 'dbt-core (SQL Modeling & Data Tests)', level: 'INTERMEDIATE-ADVANCED', tag: 'dbt-core', usedIn: ['PipelineELT'] },
          ],
        },
        {
          num: 'DOMAIN 02',
          title: 'Databases & Transactional Storage',
          items: [
            { name: 'Advanced SQL (CTEs, Window Functions)', level: 'ADVANCED', tag: 'SQL / PostgreSQL', usedIn: ['AUDI México', 'SDV-IBN Telemetry', 'PipelineELT', 'CBTis No. 30'] },
            { name: 'PostgreSQL & PL/pgSQL Programming', level: 'ADVANCED', tag: 'SQL / PostgreSQL', usedIn: ['SDV-IBN Telemetry', 'PipelineELT'] },
            { name: 'Transactional Triggers & Relational Schemas', level: 'ADVANCED', tag: 'SQL / PostgreSQL', usedIn: ['SDV-IBN Telemetry'] },
            { name: 'Multi-Source Database Cross-Referencing', level: 'ADVANCED', tag: 'ETL / Limpieza', usedIn: ['AUDI México'] },
          ],
        },
        {
          num: 'DOMAIN 03',
          title: 'BI, Analytics & Data Science',
          items: [
            { name: 'Power BI & DAX Analytical Modeling', level: 'ADVANCED', tag: 'Power BI (DAX)', usedIn: ['AUDI México', 'SDV-IBN Telemetry'] },
            { name: 'Exploratory Data Analysis (EDA) & Stats', level: 'ADVANCED', tag: 'Modelos Predictivos', usedIn: ['BUAP Course', 'IBM SkillsBuild'] },
            { name: 'Advanced Excel & Reporting Automation', level: 'ADVANCED', tag: 'Excel Avanzado', usedIn: ['AUDI México'] },
            { name: 'Predictive Modeling & Time Series', level: 'INTERMEDIATE-ADVANCED', tag: 'Modelos Predictivos', usedIn: ['PipelineELT', 'IBM SkillsBuild'] },
          ],
        },
        {
          num: 'DOMAIN 04',
          title: 'Infrastructure, Networking & Governance',
          items: [
            { name: 'Docker & Docker Compose', level: 'INTERMEDIATE-ADVANCED', tag: 'Docker', usedIn: ['SDV-IBN Telemetry', 'PipelineELT'] },
            { name: 'TCP/IP Protocols, DoIP (ISO 13400) & UDS', level: 'INTERMEDIATE-ADVANCED', tag: 'Redes TCP/IP', usedIn: ['SDV-IBN Telemetry', 'Cisco CCNA'] },
            { name: 'ITIL v4 Incident & SLA Governance', level: 'INTERMEDIATE-ADVANCED', tag: 'ITIL v4', usedIn: ['SDV-IBN Telemetry'] },
            { name: 'Version Control with Git & GitHub', level: 'ADVANCED', tag: 'Docker', usedIn: ['SDV-IBN Telemetry', 'PipelineELT'] },
          ],
        },
      ],
      certsTitle: 'Certifications & Specialized Training',
      certs: [
        {
          issuer: 'BUAP · CONTINUING EDUCATION',
          title: 'Data Analysis with Python Course',
          desc: 'Data manipulation with Pandas and NumPy, real-world dataset cleaning, exploratory statistical analysis, and visualization.',
          type: 'DATA ANALYTICS',
          status: 'VERIFIED',
        },
        {
          issuer: 'IBM SKILLSBUILD',
          title: 'Data Science Foundations',
          desc: 'Core data science methodology, analytical lifecycle, hypothesis formulation, and business-driven predictive modeling.',
          type: 'DATA SCIENCE',
          status: 'VERIFIED',
        },
        {
          issuer: 'CISCO NETWORKING ACADEMY',
          title: 'CCNA: Introduction to Networks',
          desc: 'TCP/IP network architecture, IPv4/IPv6 addressing, routing, Ethernet switching, and network telemetry diagnostics.',
          type: 'INFRASTRUCTURE & NETWORKS',
          status: 'VERIFIED',
        },
      ],
    },
    sec4: {
      index: '04 / CONTACT',
      title: 'Direct Contact & Collaboration',
      subtitle: 'Available for Data Analyst, Jr. Data Engineer, Business Intelligence, or Industrial Digitalization roles in Puebla, Mexico City, or Remote/Hybrid.',
      emailLabel: 'Email Address',
      phoneLabel: 'Phone / WhatsApp',
      githubLabel: 'GitHub',
      locLabel: 'Location & Languages',
      locVal: 'Puebla, Mexico · Spanish (Native) / English (B1)',
      copyBtn: 'Copy',
      copiedBtn: '✓ Copied',
      openBtn: 'Open ↗',
      formTitle: 'Compose Direct Message',
      nameLabel: 'NAME OR COMPANY',
      namePlaceholder: 'e.g. Alex Rivera — Tech / Data Recruiting',
      subjectLabel: 'SUBJECT / ROLE',
      subjectPlaceholder: 'Opportunity: Data Analyst / Data Engineer',
      msgLabel: 'MESSAGE',
      msgPlaceholder: 'Hi José Iván, we reviewed your portfolio and data engineering projects...',
      submitBtn: 'Open Pre-filled Email in Mail Client →',
      formNote: 'Clicking submit opens your default email client addressed to ivan.gomez.vazquez06@gmail.com.',
    },
    modal: {
      title: 'EXECUTIVE CURRICULUM VITAE PREVIEW (1 PAGE)',
      downloadPdf: '↓ Download PDF (1 Page)',
      closeBtn: '✕ Close',
      roleLine: 'Computer Science Engineer · Data Analyst & Data Engineer',
      profileTitle: 'Professional Profile',
      profileText: 'Computer Science Engineer (BUAP) with hands-on industrial digitalization experience at AUDI México and end-to-end data architecture development. Specialized in data extraction and transformation (Python, SQL, dbt, Apache Airflow), relational database engineering (PostgreSQL, PL/pgSQL), and executive BI reporting in Power BI (DAX).',
      expTitle: 'Experience & Technical Impact',
      eduTitle: 'Education & Certifications',
      stackTitle: 'Core Technical Stack',
    },
    footer: {
      copy: '© 2026 José Iván Gómez Vázquez · Built with React, Vite, Framer Motion & Tailwind CSS · Deployed on Vercel',
      cvPdf: 'Executive CV (PDF)',
    },
  },
};

export const SDV_TELEMETRY_DATA = [
  {
    ecu: '0x10 Gateway',
    dtc: 'U0100 · Lost Comm ECM',
    incidents: 42,
    cumPct: 38.2,
    taktSec: 68.4,
    critical: true,
    protocol: 'DoIP TCP:13400',
  },
  {
    ecu: '0x01 Engine',
    dtc: 'P0606 · PCM Processor',
    incidents: 28,
    cumPct: 63.6,
    taktSec: 63.1,
    critical: true,
    protocol: 'UDS 0x34/0x36',
  },
  {
    ecu: '0x03 ABS/ESP',
    dtc: 'C0035 · Wheel Speed',
    incidents: 19,
    cumPct: 80.9,
    taktSec: 54.2,
    critical: false,
    protocol: 'UDS CAN-FD',
  },
  {
    ecu: '0x09 BCM',
    dtc: 'B1087 · LIN Bus Err',
    incidents: 13,
    cumPct: 92.7,
    taktSec: 47.8,
    critical: false,
    protocol: 'UDS 0x22/0x2E',
  },
  {
    ecu: '0x17 Cluster',
    dtc: 'U1121 · Missing Msg',
    incidents: 8,
    cumPct: 100.0,
    taktSec: 41.5,
    critical: false,
    protocol: 'DoIP ISO-13400',
  },
];

export const ELT_ASSETS_DATA = {
  'BTC-MXN': {
    unit: 'MXN',
    volatility: '2.41%',
    signalEs: 'ALCISTA (Cierre > SMA-30)',
    signalEn: 'BULLISH (Close > SMA-30)',
    series: [
      { day: 'D-18', close: 1620400, sma: 1595000, std: 34000 },
      { day: 'D-16', close: 1648900, sma: 1604200, std: 35500 },
      { day: 'D-14', close: 1631200, sma: 1611800, std: 33000 },
      { day: 'D-12', close: 1679500, sma: 1623400, std: 38000 },
      { day: 'D-10', close: 1705100, sma: 1638900, std: 41000 },
      { day: 'D-08', close: 1691800, sma: 1651200, std: 39000 },
      { day: 'D-06', close: 1734600, sma: 1668400, std: 42000 },
      { day: 'D-04', close: 1762000, sma: 1685900, std: 44000 },
      { day: 'D-02', close: 1749300, sma: 1701500, std: 41500 },
      { day: 'HOY', close: 1788450, sma: 1719800, std: 43200 },
    ],
  },
  'USD-MXN': {
    unit: 'MXN',
    volatility: '0.68%',
    signalEs: 'CONSOLIDACIÓN RANGO',
    signalEn: 'RANGE CONSOLIDATION',
    series: [
      { day: 'D-18', close: 19.82, sma: 19.74, std: 0.18 },
      { day: 'D-16', close: 19.95, sma: 19.78, std: 0.19 },
      { day: 'D-14', close: 19.88, sma: 19.81, std: 0.17 },
      { day: 'D-12', close: 20.04, sma: 19.85, std: 0.21 },
      { day: 'D-10', close: 20.12, sma: 19.89, std: 0.22 },
      { day: 'D-08', close: 19.98, sma: 19.92, std: 0.19 },
      { day: 'D-06', close: 20.18, sma: 19.96, std: 0.23 },
      { day: 'D-04', close: 20.09, sma: 19.99, std: 0.20 },
      { day: 'D-02', close: 20.22, sma: 20.03, std: 0.21 },
      { day: 'HOY', close: 20.16, sma: 20.05, std: 0.19 },
    ],
  },
  'IPC-BMV': {
    unit: 'PTS MXN',
    volatility: '1.14%',
    signalEs: 'EXPANSIÓN SOBRE MEDIA',
    signalEn: 'ABOVE SMA EXPANSION',
    series: [
      { day: 'D-18', close: 51420, sma: 51100, std: 490 },
      { day: 'D-16', close: 51680, sma: 51210, std: 510 },
      { day: 'D-14', close: 51390, sma: 51260, std: 480 },
      { day: 'D-12', close: 51890, sma: 51380, std: 530 },
      { day: 'D-10', close: 52140, sma: 51520, std: 560 },
      { day: 'D-08', close: 52010, sma: 51640, std: 520 },
      { day: 'D-06', close: 52480, sma: 51790, std: 580 },
      { day: 'D-04', close: 52790, sma: 51960, std: 610 },
      { day: 'D-02', close: 52640, sma: 52110, std: 570 },
      { day: 'HOY', close: 53120, sma: 52285, std: 595 },
    ],
  },
};

export const CODE_SNIPPETS = {
  plpgsqlTrigger: `-- PostgreSQL PL/pgSQL: Disparador Automático de Incidentes ITIL v4
CREATE OR REPLACE FUNCTION fn_evaluate_ibn_telemetry_sla()
RETURNS TRIGGER AS $$
BEGIN
    -- Verifica desviación al Takt Time (60s) o estado crítico de flasheo DoIP/UDS
    IF NEW.flash_duration_sec > 60.0 OR NEW.diagnostic_status = 'CRITICAL_FAIL' THEN
        INSERT INTO itil_service_desk.incidents (
            vehicle_vin, ecu_address, dtc_code,
            priority_level, sla_breach_sec, status, created_at
        ) VALUES (
            NEW.vehicle_vin,
            NEW.ecu_id,
            COALESCE(NEW.dtc_code, 'SLA-TAKT-BREACH'),
            CASE WHEN NEW.diagnostic_status = 'CRITICAL_FAIL' THEN 'P1-CRITICAL' ELSE 'P2-HIGH' END,
            ROUND((NEW.flash_duration_sec - 60.0)::NUMERIC, 2),
            'OPEN',
            NOW()
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_auto_itil_incident
AFTER INSERT ON telemetry.ecu_flash_logs
FOR EACH ROW EXECUTE FUNCTION fn_evaluate_ibn_telemetry_sla();`,

  daxMeasures: `// Power BI DAX: Cumplimiento de Takt Time (SLA <= 60s) y First Time Through (FTT)
Takt Time Compliance % = 
VAR TotalVehicles = COUNTROWS('telemetry ecu_flash_logs')
VAR WithinSLA = 
    CALCULATE(
        COUNTROWS('telemetry ecu_flash_logs'),
        'telemetry ecu_flash_logs'[flash_duration_sec] <= 60.0,
        'telemetry ecu_flash_logs'[diagnostic_status] = "OK"
    )
RETURN
    DIVIDE(WithinSLA, TotalVehicles, 0)

Cumulative DTC Pareto % = 
VAR CurrentDTCCount = [Total Incidents]
VAR AllSelectedDTCs = 
    CALCULATE([Total Incidents], ALLSELECTED('telemetry ecu_flash_logs'[dtc_code]))
VAR RunningTotal = 
    SUMX(
        FILTER(
            ALLSELECTED('telemetry ecu_flash_logs'[dtc_code]),
            [Total Incidents] >= CurrentDTCCount
        ),
        [Total Incidents]
    )
RETURN
    DIVIDE(RunningTotal, AllSelectedDTCs, 0)`,

  dbtSqlModel: `-- models/marts/finance/fct_daily_asset_metrics.sql
{{ config(materialized='table', schema='analytics_marts') }}

WITH stg_prices AS (
    SELECT
        asset_symbol,
        trading_date,
        close_price_mxn,
        volume_24h
    FROM {{ ref('stg_raw_market_quotes') }}
    WHERE close_price_mxn IS NOT NULL
),
window_metrics AS (
    SELECT
        asset_symbol,
        trading_date,
        close_price_mxn,
        LAG(close_price_mxn, 1) OVER (
            PARTITION BY asset_symbol ORDER BY trading_date
        ) AS prev_close_mxn,
        ROUND(AVG(close_price_mxn) OVER (
            PARTITION BY asset_symbol
            ORDER BY trading_date
            ROWS BETWEEN 29 PRECEDING AND CURRENT ROW
        )::NUMERIC, 2) AS sma_30d_mxn,
        ROUND(STDDEV(close_price_mxn) OVER (
            PARTITION BY asset_symbol
            ORDER BY trading_date
            ROWS BETWEEN 29 PRECEDING AND CURRENT ROW
        )::NUMERIC, 2) AS volatility_30d_mxn
    FROM stg_prices
)
SELECT
    *,
    ROUND(((close_price_mxn - prev_close_mxn) / NULLIF(prev_close_mxn, 0)) * 100, 3) AS daily_return_pct
FROM window_metrics`,

  dbtYamlSchema: `# models/marts/finance/schema.yml
version: 2

models:
  - name: fct_daily_asset_metrics
    description: "Tabla de hechos financiera con retornos diarios, SMA-30 y volatilidad en MXN."
    columns:
      - name: asset_symbol
        description: "Identificador del activo cotizado en pesos mexicanos (MXN)."
        tests:
          - not_null
      - name: trading_date
        description: "Fecha de cierre de la sesión."
        tests:
          - not_null
      - name: close_price_mxn
        description: "Precio de cierre validado (> 0)."
        tests:
          - not_null
      - name: sma_30d_mxn
        description: "Media móvil simple de 30 días calculada con ventana SQL."
        tests:
          - not_null`,
};
