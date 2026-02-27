import { useState, useEffect } from "react";

const COLORS = {
  bg: "#FAFAF8",
  bgAlt: "#F3F1EE",
  text: "#1A1A1A",
  textMuted: "#5C5C5C",
  textLight: "#8A8A8A",
  accent: "#2D5A3D",
  accentLight: "#E8F0EB",
  border: "#E5E3DE",
  white: "#FFFFFF",
  card: "#FFFFFF",
};

/* ══════════════════════════════════════════════
   INLINE SVG BRAND ICONS (no external deps)
   ══════════════════════════════════════════════ */
const B = {
  Python: () => (<svg width="18" height="18" viewBox="0 0 256 255"><defs><linearGradient id="pa" x1="12.96%" y1="12.04%" x2="79.64%" y2="78.01%"><stop offset="0%" stopColor="#387EB8"/><stop offset="100%" stopColor="#366994"/></linearGradient><linearGradient id="pb" x1="19.13%" y1="20.58%" x2="90.8%" y2="88.16%"><stop offset="0%" stopColor="#FFE052"/><stop offset="100%" stopColor="#FFC331"/></linearGradient></defs><path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 1 1 0 22.26 11.12 11.12 0 0 1 0-22.26z" fill="url(#pa)"/><path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 1 1 0-22.261 11.12 11.12 0 0 1 0 22.261z" fill="url(#pb)"/></svg>),
  SQL: () => (<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#CC2927"/><text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="9.5" fontWeight="800" fontFamily="Arial,sans-serif">SQL</text></svg>),
  R: () => (<svg width="18" height="18" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#276DC3"/><text x="32" y="44" textAnchor="middle" fill="#fff" fontSize="36" fontWeight="700" fontFamily="serif">R</text></svg>),
  PySpark: () => (<svg width="18" height="18" viewBox="0 0 256 256"><path d="M128 0L8 72v112l120 72 120-72V72L128 0z" fill="#E25A1C"/><path d="M128 36l-84 50v100l84 50 84-50V86l-84-50z" fill="#fff" fillOpacity="0.25"/><path d="M128 72l-48 28v56l48 28 48-28v-56l-48-28z" fill="#fff"/></svg>),
  Azure: () => (<svg width="18" height="18" viewBox="0 0 96 96"><path d="M33.338 6.544h26.038l-27.03 80.455a4.152 4.152 0 0 1-3.933 2.824H8.149a4.145 4.145 0 0 1-3.928-5.47L29.404 9.368a4.152 4.152 0 0 1 3.934-2.825z" fill="#0078D4"/><path d="M71.175 60.261H41.29a1.911 1.911 0 0 0-1.305 3.309l26.532 24.762a4.15 4.15 0 0 0 2.834 1.114h21.381z" fill="#0078D4" fillOpacity="0.7"/><path d="M33.338 6.544a4.118 4.118 0 0 0-3.943 2.879L4.252 84.168a4.143 4.143 0 0 0 3.908 5.654h21.073a4.44 4.44 0 0 0 3.41-2.9l5.014-14.777 17.91 16.705a4.237 4.237 0 0 0 2.666.972h21.37l-9.26-30.56-31.581-.001L59.308 6.544z" fill="#0078D4"/><path d="M66.595 9.364a4.145 4.145 0 0 0-3.928-2.82H33.648a4.146 4.146 0 0 1 3.928 2.82l25.184 75.08a4.146 4.146 0 0 1-3.928 5.472h29.02a4.146 4.146 0 0 0 3.927-5.472z" fill="#0078D4" fillOpacity="0.7"/></svg>),
  AWS: () => (<svg width="18" height="18" viewBox="0 0 64 64"><rect width="64" height="64" rx="8" fill="#232F3E"/><path d="M18 36c0 0 2.5 3 8.5 3s9-3.5 9-3.5" stroke="#FF9900" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M38 33l3.5 3.5L48 30" stroke="#FF9900" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><text x="32" y="27" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700" fontFamily="Arial">AWS</text></svg>),
  GCP: () => (<svg width="18" height="18" viewBox="0 0 256 206"><path d="M170.252 56.819l22.253-22.253 1.483-9.37C153.437-11.677 88.976-7.496 52.42 33.92 42.267 45.423 34.734 59.764 30.717 74.573l7.97-1.123 44.505-7.34 3.436-3.513c19.797-21.742 53.27-24.667 76.128-6.168l7.496.39z" fill="#EA4335"/><path d="M224.205 73.918a100.249 100.249 0 0 0-30.217-48.722l-31.232 31.232a55.515 55.515 0 0 1 20.379 44.037v5.544c15.351 0 27.797 12.446 27.797 27.797s-12.446 27.573-27.797 27.573h-55.671l-5.544 5.622v33.34l5.544 5.544h55.671c39.93.311 72.553-31.494 72.864-71.424a72.303 72.303 0 0 0-31.794-60.543z" fill="#4285F4"/><path d="M72.008 205.866h55.594v-44.505H72.008a27.344 27.344 0 0 1-11.399-2.496l-7.886 2.418-22.408 22.253-1.952 7.574c12.567 9.489 27.96 14.756 43.645 14.756z" fill="#34A853"/><path d="M72.008 61.426C32.078 61.737-.545 94.669.078 134.599a72.303 72.303 0 0 0 28.285 56.511l32.246-32.246c-13.894-6.323-20.064-22.644-13.741-36.538a27.797 27.797 0 0 1 36.538-13.741l32.246-32.246A72.224 72.224 0 0 0 72.008 61.426z" fill="#FBBC05"/></svg>),
  Microsoft: () => (<svg width="18" height="18" viewBox="0 0 23 23"><path fill="#f35325" d="M1 1h10v10H1z"/><path fill="#81bc06" d="M12 1h10v10H12z"/><path fill="#05a6f0" d="M1 12h10v10H1z"/><path fill="#ffba08" d="M12 12h10v10H12z"/></svg>),
  IBM: () => (<svg width="18" height="18" viewBox="0 0 65 26"><g fill="#054ADA"><path d="M0 0h19.3v2.6H0zM0 5.2h19.3v2.6H0zM5.2 10.4h8.9v2.6H5.2zM5.2 15.6h8.9v2.6H5.2zM0 20.8h19.3v2.6H0zM0 26h19.3v2.6H0z" transform="scale(0.65)"/><path d="M22 0h12.5c4.1 0 7.4 1.2 7.4 5.2 0 2.2-1.2 3.9-3.2 4.7v.1c2.6.6 4.1 2.6 4.1 5.3 0 4.4-3.6 5.9-7.5 5.9H22V0zm5.2 8.8h5.6c1.9 0 3.3-.8 3.3-2.8s-1.6-2.6-3.5-2.6h-5.4v5.4zm0 9h6c2 0 3.6-.9 3.6-3.1 0-2.3-1.5-3.1-3.6-3.1h-6v6.2z" transform="scale(0.65)"/><path d="M47.5 0h5.7l5.5 14.7h.1L64.3 0H70v21.2h-4.7V7.1h-.1l-5.1 14.1h-3.3L51.7 7.1h-.1v14.1h-4.1V0z" transform="scale(0.65)"/></g></svg>),
  PostgreSQL: () => (<svg width="18" height="18" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#336791"/><text x="32" y="43" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="700" fontFamily="serif">P</text></svg>),
  Oracle: () => (<svg width="18" height="18" viewBox="0 0 64 64"><rect width="64" height="64" rx="8" fill="#F80000"/><text x="32" y="38" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">ORA</text></svg>),
  MySQL: () => (<svg width="18" height="18" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#4479A1"/><text x="32" y="28" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700" fontFamily="Arial">My</text><text x="32" y="44" textAnchor="middle" fill="#F29111" fontSize="13" fontWeight="800" fontFamily="Arial">SQL</text></svg>),
  GitHub: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="#181717"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>),
  Jira: () => (<svg width="18" height="18" viewBox="0 0 256 256"><path d="M244.658 0H121.707a55.502 55.502 0 0 0 55.502 55.502h22.649V77.37c.02 30.625 24.84 55.447 55.464 55.502V11.344A11.347 11.347 0 0 0 244.658 0z" fill="#2684FF"/><path d="M183.822 61.262H60.872c.019 30.625 24.839 55.447 55.466 55.502h22.649v21.868c.02 30.597 24.798 55.408 55.395 55.502V72.606a11.347 11.347 0 0 0-10.56-11.344z" fill="#2684FF" fillOpacity="0.75"/><path d="M122.951 122.489H0c0 30.653 24.85 55.502 55.502 55.502h22.72v21.868c.02 30.597 24.798 55.408 55.396 55.502V133.833a11.347 11.347 0 0 0-10.667-11.344z" fill="#2684FF" fillOpacity="0.5"/></svg>),
  CICD: () => (<svg width="18" height="18" viewBox="0 0 64 64"><rect width="64" height="64" rx="8" fill="#2088FF"/><path d="M16 32a16 16 0 1 1 32 0 16 16 0 0 1-32 0z" fill="none" stroke="#fff" strokeWidth="3"/><path d="M32 20v12l8 8" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round"/><path d="M24 12l-4-4M40 12l4-4M24 52l-4 4M40 52l4 4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>),
  SQLServer: () => (<svg width="18" height="18" viewBox="0 0 64 64"><rect width="64" height="64" rx="8" fill="#CC2927"/><text x="32" y="25" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700" fontFamily="Arial">SQL</text><text x="32" y="45" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="500" fontFamily="Arial">Server</text></svg>),
  Tableau: () => (<svg width="18" height="18" viewBox="0 0 60 60"><path d="M29 6v9h-8v3.5h8v9h3.8v-9h8v-3.5h-8V6z" fill="#E97627"/><path d="M14 20v6.5H7.5V30H14v6.5h3v-6.5h6.5v-3.5H17V20z" fill="#C72037"/><path d="M44 20v6.5h-6.5V30H44v6.5h3v-6.5h6.5v-3.5H47V20z" fill="#5B879B"/><path d="M29 33v9h-8v3.5h8v9h3.8v-9h8v-3.5h-8V33z" fill="#5C6692"/></svg>),
  PowerBI: () => (<svg width="18" height="18" viewBox="0 0 48 48"><rect width="48" height="48" rx="6" fill="#F2C811"/><rect x="10" y="24" width="7" height="16" rx="1.5" fill="#fff"/><rect x="20" y="16" width="7" height="24" rx="1.5" fill="#fff"/><rect x="30" y="8" width="7" height="32" rx="1.5" fill="#fff"/></svg>),
};

const iconMap = {
  "Python": B.Python, "SQL": B.SQL, "R": B.R, "PySpark": B.PySpark,
  "Azure": B.Azure, "AWS": B.AWS, "GCP": B.GCP,
  "Microsoft Fabric": B.Microsoft, "Azure Data Factory": B.Azure, "Azure Databricks": B.Azure,
  "IBM DataStage": B.IBM, "SQL Server": B.SQLServer, "PostgreSQL": B.PostgreSQL,
  "Oracle": B.Oracle, "MySQL": B.MySQL, "IBM Knowledge Catalog": B.IBM,
  "Azure Purview": B.Azure, "Unity Catalog": B.Azure, "Power BI": B.PowerBI,
  "Tableau": B.Tableau, "Azure DevOps": B.Azure, "Git & GitHub": B.GitHub,
  "CI/CD": B.CICD, "Jira": B.Jira,
};

const skillCategories = [
  { label: "Languages", labelIcon: "💻", skills: ["Python", "SQL", "R", "PySpark"] },
  { label: "Cloud & Data Engineering", labelIcon: "☁️", skills: ["Azure", "AWS", "GCP", "Microsoft Fabric", "Azure Data Factory", "Azure Databricks", "IBM DataStage"] },
  { label: "Databases", labelIcon: "🗃️", skills: ["SQL Server", "PostgreSQL", "Oracle", "MySQL"] },
  { label: "Data Governance", labelIcon: "🛡️", skills: ["IBM Knowledge Catalog", "Azure Purview", "Unity Catalog"] },
  { label: "Data Visualization", labelIcon: "📈", skills: ["Power BI", "Tableau"] },
  { label: "DevOps & Version Control", labelIcon: "🚀", skills: ["Azure DevOps", "Git & GitHub", "CI/CD", "Jira"] },
];

/* ── Data ── */
const experiences = [
  {
    company: "Davies North America", role: "Data Engineer", location: "Remote",
    period: "Oct 2025 – Jan 2026",
    tech: ["Microsoft Fabric", "SQL", "Spark", "Data Modeling", "CI/CD", "ETL"],
    bullets: [
      "Built and maintained T-SQL pipelines on SQL Server for insurance data sources, optimizing queries and automating nightly loads, reducing load time by 30%",
      "Ingested data from 4 sources into Microsoft Fabric Lakehouse and built transformation logic to deliver analytics-ready datasets",
    ],
  },
  {
    company: "City of Ottawa", role: "Intermediate Data Engineer", location: "Ottawa, ON",
    period: "Sep 2021 – Mar 2025",
    tech: ["Microsoft Fabric", "Access Control", "Data Management", "ETL", "Metadata"],
    bullets: [
      "Delivered end-to-end Microsoft Fabric solution with Medallion workspace, ETL pipelines, Power BI dashboards, and Git-based CI/CD",
      "Designed ETL jobs for star-schema data-mart, cutting daily refresh time by 45% and raising pipeline success to 99.2%",
      "Collaborated on ETL jobs for 166 tables and loaded historical data for SAMS project",
      "Administered IBM Cloud Pak for Data platform and led data migration projects across departments",
    ],
  },
  {
    company: "Royal Canadian Mounted Police", role: "Data Engineer Intern", location: "Ottawa, ON",
    period: "May 2021 – Aug 2021",
    tech: ["Python", "SQL", "R", "Data Storage", "RDBMS"],
    bullets: [
      "Built proof-of-concept data platform for RCMP's employee appraisal process with relational/star-schema model",
      "Delivered 4 integrated reporting outputs including dashboards and OLAP cube for HR stakeholders",
    ],
  },
];

const education = [
  { school: "Algonquin College", degree: "Post-graduate Certificate, Business Intelligence Systems Infrastructure", location: "Ottawa, Canada", period: "Jan 2021 – Dec 2021" },
  { school: "Dharmsinh Desai University", degree: "Bachelor of Technology (B.Tech.), Engineering", location: "Nadiad, India", period: "Jun 2013 – May 2017" },
];

const projects = [
  {
    title: "Enterprise Data Warehouse with Medallion Architecture",
    image: "", // Add your project image URL here
    gradient: "linear-gradient(135deg, #1a365d, #2d5a3d)",
    description: "Architected an enterprise Medallion (Bronze-Silver-Gold) data warehouse on SQL Server, integrating multi-source ERP/CRM data with end-to-end lineage and strong quality controls.",
    skills: ["SQL Server", "T-SQL", "ETL", "Star Schema", "Data Infrastructure"],
    highlights: "Achieved 99.5% data accuracy and sub-second analytics for 100K+ records",
    link: "#",
  },
  {
    title: "ServiceOttawa Data-Mart Pipeline",
    image: "", // Add your project image URL here
    gradient: "linear-gradient(135deg, #2d5a3d, #4A8B6E)",
    description: "Designed and implemented a star-schema based data-mart for ServiceOttawa using Microsoft Fabric, with production-grade scheduling and monitoring.",
    skills: ["Microsoft Fabric", "Star Schema", "ETL", "Power BI"],
    highlights: "Cut daily refresh time by 45%, pipeline success rate of 99.2%",
    link: "#",
  },
  {
    title: "RCMP Employee Appraisal Platform",
    image: "", // Add your project image URL here
    gradient: "linear-gradient(135deg, #1e3a5f, #0078D4)",
    description: "Built a proof-of-concept data platform restructuring raw Excel-driven datasets into a clean relational model with secure reporting workflows.",
    skills: ["Python", "SQL", "R", "RDBMS", "OLAP"],
    highlights: "Delivered 4 integrated analytics outputs for HR stakeholders",
    link: "#",
  },
];

const certifications = [
  {
    title: "Microsoft Certified: Azure Data Engineer Associate",
    issuer: "Microsoft",
    image: "", // Add your badge image URL here
    description: "Validates expertise in integrating, transforming, and consolidating data from various structured and unstructured data systems using Azure services.",
    link: "https://www.credly.com/users/rupesh-patel",
  },
  {
    title: "Microsoft Certified: Fabric Analytics Engineer Associate",
    issuer: "Microsoft",
    image: "", // Add your badge image URL here
    description: "Demonstrates proficiency in designing and implementing enterprise-scale analytics solutions using Microsoft Fabric.",
    link: "https://www.credly.com/users/rupesh-patel",
  },
];

const blogPosts = [
  {
    id: "medallion-gold-standard",
    title: "Why Medallion Architecture Is the Gold Standard for Data Lakes",
    category: "Technical",
    date: "Jan 15, 2026",
    excerpt: "A deep dive into Bronze-Silver-Gold data layering and why every data team should adopt it for scalable, maintainable pipelines.",
    readTime: "8 min read",
    content: [
      { type: "p", text: "If you've worked with data lakes for any amount of time, you've probably experienced the chaos that comes with dumping everything into one massive, unstructured storage layer. That's exactly the problem Medallion Architecture was designed to solve." },
      { type: "h2", text: "What Is Medallion Architecture?" },
      { type: "img", src: "", alt: "Medallion Architecture diagram", caption: "The three layers of Medallion Architecture: Bronze → Silver → Gold" },
      { type: "p", text: "Medallion Architecture organizes your data lake into three distinct layers — Bronze, Silver, and Gold — each with a clear purpose and increasing levels of data quality." },
      { type: "img", src: "", alt: "Medallion Architecture Diagram", caption: "The Bronze-Silver-Gold layering pattern" },  // Add your image URL in src
      { type: "p", text: "The Bronze layer is your raw landing zone. Data arrives here exactly as it was received from source systems — no transformations, no cleaning, no filtering. Think of it as your immutable audit trail." },
      { type: "p", text: "The Silver layer is where the real work begins. Here you apply schema enforcement, deduplication, data type casting, and business logic transformations. This layer represents your \"single source of truth\" — clean, validated, and ready for analysis." },
      { type: "p", text: "The Gold layer is business-ready. These are aggregated, denormalized datasets built for specific use cases: dashboards, ML features, executive reports. Star schemas and summary tables live here." },
      { type: "h2", text: "Why Every Data Team Should Adopt It" },
      { type: "p", text: "In my experience building pipelines at the City of Ottawa and Davies North America, Medallion Architecture has consistently delivered three major benefits:" },
      { type: "p", text: "First, debuggability. When something breaks in Gold, you can trace it back through Silver to Bronze and find exactly where the issue originated. Without this layering, debugging becomes a nightmare." },
      { type: "p", text: "Second, reusability. Your Silver layer serves as a shared foundation. Multiple Gold datasets can be built from the same Silver tables without duplicating transformation logic." },
      { type: "p", text: "Third, governance. Each layer has clear ownership, access controls, and quality expectations. This makes compliance audits straightforward and data discovery intuitive." },
      { type: "h2", text: "The Bottom Line" },
      { type: "p", text: "Medallion Architecture isn't just a pattern — it's a philosophy about treating data as a product with clear quality tiers. If you're building anything beyond a toy data lake, this is the approach I'd recommend starting with." },
    ],
  },
  {
    id: "fabric-lakehouse-setup",
    title: "Setting Up a Medallion Lakehouse in Microsoft Fabric: Step-by-Step",
    category: "Tutorials & Guides",
    date: "Jan 5, 2026",
    excerpt: "A hands-on walkthrough for building a Bronze-Silver-Gold Lakehouse from scratch in Microsoft Fabric, with real-world data and production-ready patterns.",
    readTime: "12 min read",
    content: [
      { type: "p", text: "Microsoft Fabric has become my go-to platform for building end-to-end data solutions. In this tutorial, I'll walk you through setting up a Medallion Lakehouse from scratch — the same pattern I used on the ServiceOttawa project that achieved a 99.2% pipeline success rate." },
      { type: "h2", text: "Prerequisites" },
      { type: "p", text: "You'll need a Microsoft Fabric workspace (even a trial works), basic familiarity with SQL and Spark, and a sample dataset to work with. I'll use a publicly available CSV for this walkthrough." },
      { type: "h2", text: "Step 1: Create Your Workspace Structure" },
      { type: "p", text: "Start by creating three Lakehouses in your Fabric workspace: LH_Bronze, LH_Silver, and LH_Gold. This physical separation makes access control and monitoring much cleaner than using folders within a single Lakehouse." },
      { type: "h2", text: "Step 2: Build the Bronze Ingestion Pipeline" },
      { type: "p", text: "Use a Data Factory pipeline with a Copy Activity to land your raw data into LH_Bronze. The key principle here: never transform anything at this stage. Store the data as-is with an ingestion timestamp column appended. This gives you a full audit trail." },
      { type: "h2", text: "Step 3: Silver Transformation with Notebooks" },
      { type: "p", text: "Create a Spark notebook that reads from Bronze, applies your cleaning logic — deduplication, null handling, type casting, schema validation — and writes to Silver as Delta tables. Delta format gives you ACID transactions, time travel, and schema enforcement out of the box." },
      { type: "h2", text: "Step 4: Gold Aggregation Layer" },
      { type: "p", text: "Your Gold layer should be shaped for consumption. Build star-schema dimension and fact tables here. Use SQL analytics endpoints so Power BI can connect directly to Gold without any additional data movement." },
      { type: "h2", text: "Step 5: Orchestration & Monitoring" },
      { type: "p", text: "Wire everything together with a master pipeline: Bronze → Silver → Gold, with error handling at each stage. Add email alerts for failures and set up scheduled refreshes. This is what gets you to production-grade reliability." },
      { type: "p", text: "In my experience, this pattern scales beautifully. The ServiceOttawa project handled 166 tables through this exact flow with minimal maintenance overhead." },
    ],
  },
  {
    id: "remote-data-engineer-lessons",
    title: "Lessons from My First Year as a Remote Data Engineer",
    category: "Career & Life",
    date: "Dec 28, 2025",
    excerpt: "Reflections on working remotely, maintaining productivity, and building meaningful professional relationships without a shared office.",
    readTime: "5 min read",
    content: [
      { type: "p", text: "When I started at Davies North America as a fully remote Data Engineer, I thought the biggest challenge would be technical — figuring out VPN access, setting up my home lab, getting tools configured. Turns out, the real challenges were much more human." },
      { type: "h2", text: "Over-Communication Is a Superpower" },
      { type: "p", text: "In an office, people can see you working. Remotely, you're invisible unless you communicate. I learned to send brief daily updates, share progress in Slack proactively, and document decisions in writing. It felt excessive at first, but it built enormous trust with my team." },
      { type: "h2", text: "Routine Beats Motivation" },
      { type: "p", text: "I tried the \"work whenever you feel like it\" approach for exactly two weeks before realizing it was a disaster. Now I keep strict hours, take a real lunch break, and have a dedicated workspace. The structure paradoxically gives me more freedom, not less." },
      { type: "h2", text: "Invest in Relationships Deliberately" },
      { type: "p", text: "The casual hallway conversations don't happen remotely, so I started scheduling informal 15-minute coffee chats with colleagues — no agenda, just getting to know each other. These conversations led to some of my best collaborations." },
      { type: "h2", text: "The Verdict" },
      { type: "p", text: "Remote work isn't better or worse than in-office — it's just different. It rewards self-discipline, written communication, and intentionality. One year in, I wouldn't trade it, but I also wouldn't romanticize it." },
    ],
  },
  {
    id: "star-schema-vs-snowflake",
    title: "Star Schema vs Snowflake: When to Use What",
    category: "Technical",
    date: "Nov 10, 2025",
    excerpt: "Practical guidance on choosing the right dimensional modeling approach based on query patterns, team size, and data volume.",
    readTime: "6 min read",
    content: [
      { type: "p", text: "\"Should we use star schema or snowflake?\" is one of the most common questions I get from junior data engineers. The answer, as with most things in engineering, is: it depends." },
      { type: "h2", text: "Star Schema: Simple and Fast" },
      { type: "p", text: "Star schema denormalizes your dimension tables into flat, wide tables. One fact table surrounded by dimensions — that's it. Queries are simple (fewer joins), performance is excellent (especially for BI tools like Power BI), and it's easy for business users to understand." },
      { type: "p", text: "I use star schema for most of my projects, including the ServiceOttawa data-mart. When your primary consumers are dashboards and reports, simplicity wins." },
      { type: "h2", text: "Snowflake Schema: Normalized and Space-Efficient" },
      { type: "p", text: "Snowflake schema normalizes dimensions into sub-dimensions. A Product dimension might split into Product → Category → Department. This saves storage, reduces redundancy, and can be easier to maintain when dimensions change frequently." },
      { type: "p", text: "The tradeoff? More complex queries, more joins, and slower performance for ad-hoc analysis. BI tools sometimes struggle with deeply normalized schemas." },
      { type: "h2", text: "My Decision Framework" },
      { type: "p", text: "Use star schema when: your data fits in memory, query simplicity matters, end users are non-technical, or you're building for Power BI/Tableau." },
      { type: "p", text: "Use snowflake when: storage costs are a real concern, dimensions change frequently, you need strict data integrity, or your team is comfortable with complex SQL." },
      { type: "p", text: "In practice, I've found star schema is the right choice about 80% of the time. Start simple, and only normalize when you have a specific reason to." },
    ],
  },
  {
    id: "moving-to-canada",
    title: "Moving to Canada as a Tech Professional",
    category: "Career & Life",
    date: "Oct 5, 2025",
    excerpt: "My journey from India to Canada — the visa process, culture shock, and how I built a career in data engineering from scratch.",
    readTime: "7 min read",
    content: [
      { type: "p", text: "In 2020, I made the decision to move from India to Canada to pursue a career in data engineering. It was the best and hardest decision I've ever made. If you're considering the same path, here's what I wish someone had told me." },
      { type: "h2", text: "The Visa Journey" },
      { type: "p", text: "I came through the study route — a post-graduate certificate at Algonquin College in Business Intelligence Systems Infrastructure. This gave me a study permit, followed by a Post-Graduation Work Permit (PGWP). The program was practical, hands-on, and directly relevant to the career I wanted." },
      { type: "p", text: "If you're considering this path, choose a program at a Designated Learning Institution (DLI) that's eligible for PGWP. Do your research — not all programs qualify." },
      { type: "h2", text: "The Culture Adjustment" },
      { type: "p", text: "Canadian workplaces are different from what I was used to. The hierarchy is flatter, direct communication is valued, and \"I don't know, but I'll find out\" is a perfectly acceptable answer. It took me a few months to stop saying yes to everything and start asking clarifying questions instead." },
      { type: "h2", text: "Building a Career from Zero" },
      { type: "p", text: "My first role was an internship at the RCMP. I was building proof-of-concept data platforms — not glamorous, but it gave me Canadian experience, references, and confidence. Within months, I landed a full role at the City of Ottawa." },
      { type: "p", text: "The biggest lesson? Canadian employers value demonstrated skills over credentials. Build projects, contribute to open source, and be prepared to show your work in interviews." },
      { type: "h2", text: "Would I Do It Again?" },
      { type: "p", text: "Absolutely. Canada gave me opportunities I wouldn't have had otherwise. But I'd tell anyone considering it: come with realistic expectations, a financial safety net for at least 6 months, and the willingness to start from scratch. The payoff is worth it." },
    ],
  },
];

/* ── UI Icons ── */
const LinkedInIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>);
const MailIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>);
const LocationIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>);
const GitHubIcon = ({ size = 16 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>);
const DownloadIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>);
const ExternalLinkIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>);
const PhoneIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>);
const SendIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>);
const ArrowRightIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>);

/* ── Helpers ── */
function AnimatedCounter({ value, suffix = "" }) {
  const [display, setDisplay] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useState(null);

  useEffect(() => {
    const num = parseFloat(value);
    if (isNaN(num) || hasAnimated) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        const duration = 1200;
        const startTime = performance.now();
        const isDecimal = value.includes(".");
        const animate = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * num;
          setDisplay(isDecimal ? current.toFixed(1) : Math.floor(current).toString());
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    const el = document.getElementById(`counter-${value}-${suffix}`);
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [value, hasAnimated, suffix]);

  return (<span id={`counter-${value}-${suffix}`}>{display}{suffix}</span>);
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);
  return (<div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.6s ease, transform 0.6s ease", ...style }}>{children}</div>);
}

function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, fontWeight: 400, color: COLORS.text,
      marginBottom: 20, letterSpacing: "-0.02em", borderBottom: `2px solid ${COLORS.accent}`, paddingBottom: 12, display: "inline-block",
    }}>{children}</h2>
  );
}

/* ── Tab Transition Wrapper ── */
function TabTransition({ tabKey, children }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(false); const t = setTimeout(() => setVisible(true), 30); return () => clearTimeout(t); }, [tabKey]);
  return (<div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(10px)", transition: "opacity 0.35s ease, transform 0.35s ease" }}>{children}</div>);
}

/* ── Back To Top Button ── */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{
      position: "fixed", bottom: 28, right: 28, zIndex: 200, width: 44, height: 44, borderRadius: "50%",
      background: COLORS.accent, color: "#fff", border: "none", cursor: "pointer",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 4px 16px rgba(45,90,61,0.25)", transition: "opacity 0.3s, transform 0.3s",
      opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(10px)",
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
    </button>
  );
}

/* ── NavBar ── */
function NavBar({ activeTab, setActiveTab }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const tabs = ["Home", "Experience", "Projects", "Resume", "Blog", "Contact"];
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,250,248,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${COLORS.border}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
        <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 20, color: COLORS.text, letterSpacing: "-0.02em", cursor: "pointer" }} onClick={() => { setActiveTab("Home"); setMenuOpen(false); }}>RP</span>
        <div className="nav-tabs-desktop" style={{ display: "flex", gap: 4 }}>
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "8px 16px", border: "none", background: activeTab === tab ? COLORS.accentLight : "transparent",
              color: activeTab === tab ? COLORS.accent : COLORS.textMuted, fontFamily: "'Source Sans 3', 'Segoe UI', sans-serif",
              fontSize: 15, fontWeight: activeTab === tab ? 600 : 400, borderRadius: 6, cursor: "pointer", transition: "all 0.2s ease",
            }}>{tab}</button>
          ))}
        </div>
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "none", border: "none", cursor: "pointer", padding: 4, color: COLORS.text,
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>) : (<><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>)}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="nav-mobile-menu" style={{ padding: "8px 24px 16px", display: "flex", flexDirection: "column", gap: 4, borderTop: `1px solid ${COLORS.border}` }}>
          {tabs.map((tab) => (
            <button key={tab} onClick={() => { setActiveTab(tab); setMenuOpen(false); }} style={{
              padding: "10px 16px", border: "none", background: activeTab === tab ? COLORS.accentLight : "transparent",
              color: activeTab === tab ? COLORS.accent : COLORS.textMuted, fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 15, fontWeight: activeTab === tab ? 600 : 400, borderRadius: 6, cursor: "pointer", textAlign: "left",
            }}>{tab}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ── HOME TAB ── */
function HomeTab({ setActiveTab }) {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>
      <FadeIn>
        <div className="hero-flex" style={{ display: "flex", gap: 40, alignItems: "center", marginBottom: 64, flexWrap: "wrap" }}>
          <div style={{ width: 140, height: 140, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.accent}, #4A8B6E)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 8px 32px rgba(45,90,61,0.18)", position: "relative", overflow: "hidden" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: "rgba(255,255,255,0.85)" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span style={{ fontSize: 10, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", opacity: 0.7 }}>Photo</span>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 42, fontWeight: 400, color: COLORS.text, margin: "0 0 4px", letterSpacing: "-0.03em", lineHeight: 1.15 }}>Rupesh Patel</h1>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: COLORS.accent, margin: "0 0 6px", fontWeight: 500 }}>Data Engineer</p>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, color: COLORS.textMuted, margin: "0 0 12px", fontStyle: "italic", lineHeight: 1.5 }}>I build data pipelines that run at 99.2% success rate — from raw data to business decisions.</p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: COLORS.textMuted, fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, marginBottom: 16 }}><LocationIcon /><span>Toronto, Canada</span></div>
            <div className="hero-buttons" style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <a href="https://linkedin.com/in/rupesh-patel" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: COLORS.accent, color: "#fff", borderRadius: 6, textDecoration: "none", fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 500 }}><LinkedInIcon /> LinkedIn</a>
              <a href="https://github.com/rupesh-patel" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: COLORS.text, color: "#fff", borderRadius: 6, textDecoration: "none", fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 500 }}><GitHubIcon size={20} /> GitHub</a>
              <a href="mailto:datasci.patel.rupesh@gmail.com" style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: COLORS.white, color: COLORS.text, border: `1px solid ${COLORS.border}`, borderRadius: 6, textDecoration: "none", fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 500 }}><MailIcon /> Email Me</a>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={80}>
        <div className="metrics-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 64 }}>
          {[{ num: "5", suffix: "+", label: "Years Experience" }, { num: "166", suffix: "+", label: "ETL Tables Built" }, { num: "99.2", suffix: "%", label: "Pipeline Success" }, { num: "2", suffix: "", label: "Microsoft Certs" }].map((stat) => (
            <div key={stat.label} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "20px 16px", textAlign: "center" }}>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: COLORS.accent, marginBottom: 4 }}>
                <AnimatedCounter value={stat.num} suffix={stat.suffix} />
              </div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13.5, color: COLORS.textMuted, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <div style={{ marginBottom: 64 }}>
          <SectionTitle>About Me</SectionTitle>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, lineHeight: 1.75, color: COLORS.textMuted, maxWidth: 960, marginBottom: 28 }}>
            Microsoft-certified Data Engineer with 5 years of experience designing and maintaining Medallion (Bronze-Silver-Gold) ETL data pipelines using Microsoft Fabric, Azure Data Factory, and IBM DataStage. Passionate about building scalable data infrastructure, enforcing data governance, and enabling data-driven decision-making across organizations.
          </p>
          <div className="value-props-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { icon: "🔧", title: "End-to-End Pipeline Design", desc: "From raw ingestion to analytics-ready gold layers — I architect Medallion pipelines that scale reliably in production." },
              { icon: "🛡️", title: "Data Governance & Compliance", desc: "Cataloging, lineage, access control — I build the trust layer that makes data discoverable and audit-ready." },
              { icon: "⚡", title: "Production-Grade Reliability", desc: "99.2% pipeline success rates, 45% faster refreshes — I optimize for performance that teams can count on." },
            ].map((item) => (
              <div key={item.title} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "22px 20px" }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{item.icon}</div>
                <h4 style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, fontWeight: 700, color: COLORS.text, margin: "0 0 8px" }}>{item.title}</h4>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, lineHeight: 1.7, color: COLORS.textMuted, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        <div style={{ marginBottom: 64 }}>
          <SectionTitle>Technical Skills</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {skillCategories.map((cat, i) => (
              <div key={cat.label} className="skills-row" style={{ display: "flex", alignItems: "baseline", gap: 24, padding: "16px 0", borderBottom: i < skillCategories.length - 1 ? `1px solid ${COLORS.border}` : "none", flexWrap: "wrap" }}>
                <div className="skills-label" style={{ display: "flex", alignItems: "center", gap: 8, width: 230, flexShrink: 0 }}>
                  <span style={{ fontSize: 16 }}>{cat.labelIcon}</span>
                  <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14.5, fontWeight: 700, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.06em" }}>{cat.label}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, flex: 1 }}>
                  {cat.skills.map((name) => {
                    const Icon = iconMap[name];
                    return (
                      <span key={name} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 20, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: COLORS.text, fontWeight: 500 }}>
                        {Icon && <Icon />}
                        {name}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={300}>
        <div className="cta-box" style={{ background: `linear-gradient(135deg, ${COLORS.accent}08, ${COLORS.accentLight})`, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "32px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, fontWeight: 400, color: COLORS.text, margin: "0 0 6px" }}>Want the full story?</h3>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: COLORS.textMuted, margin: 0 }}>Check out my work experience, projects, and download my resume.</p>
          </div>
          <div className="cta-buttons" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => setActiveTab("Experience")} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 22px", background: COLORS.accent, color: "#fff", border: "none", borderRadius: 8, fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Experience <ArrowRightIcon /></button>
            <button onClick={() => setActiveTab("Resume")} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 22px", background: COLORS.white, color: COLORS.text, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 600, cursor: "pointer" }}><DownloadIcon /> Resume</button>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

/* ── EXPERIENCE TAB ── */
function ExperienceTab() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>
      <FadeIn>
        <div style={{ marginBottom: 64 }}>
          <SectionTitle>Work Experience</SectionTitle>
          <div style={{ position: "relative", paddingLeft: 28 }}>
            <div style={{ position: "absolute", left: 5, top: 8, bottom: 8, width: 2, background: `linear-gradient(to bottom, ${COLORS.accent}, ${COLORS.border})`, borderRadius: 2 }} />
            {experiences.map((exp, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div style={{ position: "relative", marginBottom: i < experiences.length - 1 ? 40 : 0 }}>
                  <div style={{ position: "absolute", left: -28, top: 6, width: 12, height: 12, borderRadius: "50%", background: i === 0 ? COLORS.accent : COLORS.white, border: `2px solid ${COLORS.accent}` }} />
                  <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "20px 24px" }}>
                    <div className="exp-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                      <div>
                        <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 18, fontWeight: 400, color: COLORS.text, margin: 0 }}>{exp.role}</h3>
                        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14.5, color: COLORS.accent, margin: "2px 0 0", fontWeight: 500 }}>{exp.company} · {exp.location}</p>
                      </div>
                      <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: COLORS.textLight, fontWeight: 500, background: COLORS.bgAlt, padding: "4px 10px", borderRadius: 4, whiteSpace: "nowrap" }}>{exp.period}</span>
                    </div>
                    <ul style={{ margin: "12px 0 14px", paddingLeft: 18, fontFamily: "'Source Sans 3', sans-serif", fontSize: 15.5, lineHeight: 1.7, color: COLORS.textMuted }}>
                      {exp.bullets.map((b, j) => (<li key={j} style={{ marginBottom: 6 }}>{b}</li>))}
                    </ul>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {exp.tech.map((t) => (<span key={t} style={{ padding: "3px 10px", background: COLORS.accentLight, color: COLORS.accent, borderRadius: 4, fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, fontWeight: 600 }}>{t}</span>))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={400}>
        <div>
          <SectionTitle>Education</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {education.map((edu, i) => (
              <FadeIn key={i} delay={450 + i * 100}>
                <div className="edu-card" style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 17, fontWeight: 400, color: COLORS.text, margin: "0 0 4px" }}>{edu.school}</h3>
                    <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: COLORS.textMuted, margin: 0 }}>{edu.degree}</p>
                    <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: COLORS.textLight, margin: "4px 0 0" }}>{edu.location}</p>
                  </div>
                  <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: COLORS.textLight, fontWeight: 500, background: COLORS.bgAlt, padding: "4px 10px", borderRadius: 4, whiteSpace: "nowrap" }}>{edu.period}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

/* ── PROJECTS TAB ── */
function ProjectsTab() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>
      <FadeIn>
        <SectionTitle>Projects</SectionTitle>
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: COLORS.textMuted, marginBottom: 32, marginTop: -16 }}>A selection of data engineering projects I've built and contributed to.</p>
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24, marginBottom: 64 }}>
        {projects.map((proj, i) => (
          <FadeIn key={i} delay={i * 120}>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden", height: "100%", transition: "transform 0.25s ease, box-shadow 0.25s ease", cursor: "pointer" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(45,90,61,0.12)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ height: 180, background: proj.gradient, position: "relative", display: "flex", alignItems: "flex-end", padding: 20 }}>
                {proj.image ? (
                  <>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${proj.image})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.85 }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.6))" }} />
                  </>
                ) : (
                  <>
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: "rgba(255,255,255,0.85)" }}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                        <span style={{ fontSize: 10, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", opacity: 0.7 }}>Project Image</span>
                      </div>
                    </div>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.4))" }} />
                  </>
                )}
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {proj.skills.slice(0, 3).map((s) => (<span key={s} style={{ padding: "2px 8px", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)", color: "#fff", borderRadius: 4, fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 600 }}>{s}</span>))}
                  </div>
                </div>
              </div>
              <div style={{ padding: "20px 22px" }}>
                <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 17, fontWeight: 400, color: COLORS.text, margin: "0 0 10px", lineHeight: 1.3 }}>{proj.title}</h3>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, lineHeight: 1.7, color: COLORS.textMuted, margin: "0 0 12px" }}>{proj.description}</p>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: COLORS.accent, fontWeight: 600, margin: "0 0 14px" }}>✦ {proj.highlights}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {proj.skills.map((s) => (<span key={s} style={{ padding: "3px 10px", background: COLORS.accentLight, color: COLORS.accent, borderRadius: 4, fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, fontWeight: 600 }}>{s}</span>))}
                </div>
                <a href={proj.link} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: COLORS.accent, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14.5, fontWeight: 600, textDecoration: "none" }}><GitHubIcon /> View Project <ExternalLinkIcon /></a>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={400}><SectionTitle>Certifications</SectionTitle></FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
        {certifications.map((cert, i) => (
          <FadeIn key={i} delay={450 + i * 120}>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden", transition: "transform 0.25s ease, box-shadow 0.25s ease", cursor: "pointer" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(45,90,61,0.12)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ height: 160, background: "linear-gradient(135deg, #0078D4, #2D5A3D)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {cert.image ? (
                  <>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${cert.image})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.4))" }} />
                  </>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: "rgba(255,255,255,0.85)" }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    <span style={{ fontSize: 10, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", opacity: 0.7 }}>Badge Image</span>
                  </div>
                )}
              </div>
              <div style={{ padding: "20px 22px" }}>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, fontWeight: 600, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.08em" }}>{cert.issuer}</span>
                <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 16, fontWeight: 400, color: COLORS.text, margin: "6px 0 10px", lineHeight: 1.35 }}>{cert.title}</h3>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, lineHeight: 1.7, color: COLORS.textMuted, margin: "0 0 16px" }}>{cert.description}</p>
                <a href={cert.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: COLORS.accent, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14.5, fontWeight: 600, textDecoration: "none" }}>Verify Credential <ExternalLinkIcon /></a>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

/* ── RESUME TAB ── */
function ResumeTab() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>
      <FadeIn>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <SectionTitle>Resume</SectionTitle>
          <button style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 22px", background: COLORS.accent, color: "#fff", border: "none", borderRadius: 8, fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 600, cursor: "pointer" }}><DownloadIcon /> Download Resume</button>
        </div>
      </FadeIn>
      <FadeIn delay={100}>
        <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 40, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, fontWeight: 400, color: COLORS.text, margin: "0 0 4px", textAlign: "center" }}>Rupesh Patel</h2>
            <p style={{ textAlign: "center", fontSize: 13, color: COLORS.textMuted, margin: "0 0 6px" }}>Toronto, ON · datasci.patel.rupesh@gmail.com · 437-245-8062</p>
            <p style={{ textAlign: "center", fontSize: 13, color: COLORS.accent, margin: "0 0 24px" }}>linkedin.com/in/rupesh-patel · github.com/rupesh-patel</p>

            <div style={{ borderTop: `2px solid ${COLORS.accent}`, paddingTop: 16, marginBottom: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Profile Summary</h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.textMuted }}>Microsoft-certified Data Engineer with 5 years of experience designing and maintaining Medallion ETL data pipelines using Microsoft Fabric, Azure Data Factory, and IBM DataStage. Led enterprise data governance initiatives to strengthen data integrity and compliance.</p>
            </div>

            <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 16, marginBottom: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Experience</h3>
              {experiences.map((exp, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                    <strong style={{ fontSize: 13.5, color: COLORS.text }}>{exp.role} — {exp.company}</strong>
                    <span style={{ fontSize: 12.5, color: COLORS.textLight }}>{exp.period}</span>
                  </div>
                  <p style={{ fontSize: 12.5, color: COLORS.textLight, margin: "2px 0 6px" }}>{exp.location}</p>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.65, color: COLORS.textMuted }}>
                    {exp.bullets.map((b, j) => (<li key={j} style={{ marginBottom: 3 }}>{b}</li>))}
                  </ul>
                </div>
              ))}
            </div>

            <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 16, marginBottom: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Education</h3>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                    <strong style={{ fontSize: 13.5, color: COLORS.text }}>{edu.school}</strong>
                    <span style={{ fontSize: 12.5, color: COLORS.textLight }}>{edu.period}</span>
                  </div>
                  <p style={{ fontSize: 12.5, color: COLORS.textMuted, margin: "2px 0 0" }}>{edu.degree}</p>
                </div>
              ))}
            </div>

            <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 16, marginBottom: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Certifications</h3>
              {certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <strong style={{ fontSize: 13.5, color: COLORS.text }}>{cert.title}</strong>
                  <span style={{ fontSize: 12.5, color: COLORS.textLight, marginLeft: 8 }}>— {cert.issuer}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 16 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Technical Skills</h3>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: COLORS.textMuted }}>
                <strong style={{ color: COLORS.text }}>Languages:</strong> Python, SQL, R, PySpark &nbsp;·&nbsp;
                <strong style={{ color: COLORS.text }}>Cloud & Data:</strong> Azure, AWS, GCP, Microsoft Fabric, Azure Data Factory, Databricks, IBM DataStage &nbsp;·&nbsp;
                <strong style={{ color: COLORS.text }}>Databases:</strong> SQL Server, PostgreSQL, Oracle, MySQL &nbsp;·&nbsp;
                <strong style={{ color: COLORS.text }}>Governance:</strong> IBM Knowledge Catalog, Azure Purview, Unity Catalog &nbsp;·&nbsp;
                <strong style={{ color: COLORS.text }}>Visualization:</strong> Power BI, Tableau &nbsp;·&nbsp;
                <strong style={{ color: COLORS.text }}>DevOps:</strong> Azure DevOps, Git/GitHub, CI/CD, Jira
              </p>
            </div>

            <p style={{ textAlign: "center", fontSize: 13, color: COLORS.textLight, fontStyle: "italic", marginTop: 32 }}>— Full resume available for download above —</p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

/* ── BLOG TAB ── */
const ArrowLeftIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>);

function BlogTab() {
  const [filter, setFilter] = useState("All");
  const [activePost, setActivePost] = useState(null);
  const categories = ["All", "Technical", "Tutorials & Guides", "Career & Life"];
  const filtered = filter === "All" ? blogPosts : blogPosts.filter((p) => p.category === filter);

  if (activePost) {
    const post = activePost;
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>
        <FadeIn>
          <button onClick={() => setActivePost(null)} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", color: COLORS.accent, fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 600, cursor: "pointer", padding: 0, marginBottom: 32 }}>
            <ArrowLeftIcon /> Back to Blog
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ padding: "3px 10px", background: post.category === "Technical" ? COLORS.accentLight : post.category === "Tutorials & Guides" ? "#E3F2FD" : "#FFF3E0", color: post.category === "Technical" ? COLORS.accent : post.category === "Tutorials & Guides" ? "#1565C0" : "#E65100", borderRadius: 4, fontFamily: "'Source Sans 3', sans-serif", fontSize: 11.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{post.category}</span>
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: COLORS.textLight }}>{post.date} · {post.readTime}</span>
          </div>
          <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 36, fontWeight: 400, color: COLORS.text, margin: "0 0 24px", lineHeight: 1.25, letterSpacing: "-0.02em" }}>{post.title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 24, borderBottom: `1px solid ${COLORS.border}`, marginBottom: 32 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.accent}, #4A8B6E)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontFamily: "'DM Serif Display', serif" }}>RP</div>
            <div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 600, color: COLORS.text }}>Rupesh Patel</div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12.5, color: COLORS.textLight }}>Data Engineer · Toronto</div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <article>
            {post.content.map((block, i) => {
              if (block.type === "h2") {
                return <h2 key={i} style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 22, fontWeight: 400, color: COLORS.text, margin: "36px 0 12px", lineHeight: 1.3 }}>{block.text}</h2>;
              }
              if (block.type === "img") {
                return (
                  <figure key={i} style={{ margin: "28px 0" }}>
                    {block.src ? (
                      <img src={block.src} alt={block.alt || ""} style={{ width: "100%", borderRadius: 10, border: `1px solid ${COLORS.border}` }} />
                    ) : (
                      <div style={{ width: "100%", height: 260, borderRadius: 10, background: "linear-gradient(135deg, #0078D4, #2D5A3D)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: "rgba(255,255,255,0.85)" }}>
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                          <span style={{ fontSize: 10, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", opacity: 0.7 }}>Blog Image</span>
                        </div>
                      </div>
                    )}
                    {block.caption && <figcaption style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: COLORS.textLight, textAlign: "center", marginTop: 8, fontStyle: "italic" }}>{block.caption}</figcaption>}
                  </figure>
                );
              }
              return <p key={i} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, lineHeight: 1.85, color: COLORS.textMuted, margin: "0 0 18px" }}>{block.text}</p>;
            })}
          </article>
          <div style={{ borderTop: `1px solid ${COLORS.border}`, marginTop: 48, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <button onClick={() => setActivePost(null)} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: `1px solid ${COLORS.border}`, color: COLORS.text, fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 600, cursor: "pointer", padding: "8px 18px", borderRadius: 6 }}>
              <ArrowLeftIcon /> All Posts
            </button>
            <div style={{ display: "flex", gap: 8 }}>
              {(() => {
                const idx = blogPosts.findIndex(p => p.id === post.id);
                const prev = idx > 0 ? blogPosts[idx - 1] : null;
                const next = idx < blogPosts.length - 1 ? blogPosts[idx + 1] : null;
                return (
                  <>
                    {prev && <button onClick={() => { setActivePost(prev); window.scrollTo(0, 0); }} style={{ padding: "8px 18px", background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 6, fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 500, cursor: "pointer", color: COLORS.textMuted }}>← {prev.title.length > 30 ? prev.title.slice(0, 30) + "…" : prev.title}</button>}
                    {next && <button onClick={() => { setActivePost(next); window.scrollTo(0, 0); }} style={{ padding: "8px 18px", background: COLORS.accent, border: "none", borderRadius: 6, fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#fff" }}>{next.title.length > 30 ? next.title.slice(0, 30) + "…" : next.title} →</button>}
                  </>
                );
              })()}
            </div>
          </div>
        </FadeIn>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>
      <FadeIn>
        <SectionTitle>Blog</SectionTitle>
        <div style={{ display: "flex", gap: 8, marginBottom: 32, marginTop: -16, flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} style={{ padding: "6px 16px", border: `1px solid ${filter === cat ? COLORS.accent : COLORS.border}`, background: filter === cat ? COLORS.accent : COLORS.white, color: filter === cat ? "#fff" : COLORS.textMuted, borderRadius: 20, fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}>{cat}</button>
          ))}
        </div>
      </FadeIn>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {filtered.map((post, i) => (
          <FadeIn key={post.id} delay={i * 100}>
            <article onClick={() => { setActivePost(post); window.scrollTo(0, 0); }} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "24px 28px", cursor: "pointer", transition: "border-color 0.2s, box-shadow 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = COLORS.accent + "60"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(45,90,61,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <span style={{ padding: "3px 10px", background: post.category === "Technical" ? COLORS.accentLight : post.category === "Tutorials & Guides" ? "#E3F2FD" : "#FFF3E0", color: post.category === "Technical" ? COLORS.accent : post.category === "Tutorials & Guides" ? "#1565C0" : "#E65100", borderRadius: 4, fontFamily: "'Source Sans 3', sans-serif", fontSize: 11.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{post.category}</span>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12.5, color: COLORS.textLight }}>{post.date} · {post.readTime}</span>
              </div>
              <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 20, fontWeight: 400, color: COLORS.text, margin: "0 0 8px", lineHeight: 1.3 }}>{post.title}</h3>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15.5, lineHeight: 1.7, color: COLORS.textMuted, margin: "0 0 12px" }}>{post.excerpt}</p>
              <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.accent, display: "inline-flex", alignItems: "center", gap: 4 }}>Read More <ArrowRightIcon /></span>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

/* ── CONTACT TAB ── */
function ContactTab() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>
      <FadeIn><SectionTitle>Let's Connect</SectionTitle></FadeIn>
      <FadeIn delay={100}>
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, lineHeight: 1.75, color: COLORS.textMuted, maxWidth: 960, marginBottom: 40 }}>I'm always open to discussing data engineering opportunities, interesting projects, or just connecting with fellow professionals. Feel free to reach out through any of the channels below.</p>
      </FadeIn>
      <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
        {[
          { icon: <MailIcon />, label: "Email", value: "datasci.patel.rupesh@gmail.com", href: "mailto:datasci.patel.rupesh@gmail.com", color: COLORS.accent },
          { icon: <PhoneIcon />, label: "Phone", value: "437-245-8062", href: "tel:4372458062", color: "#4A8B6E" },
          { icon: <LinkedInIcon />, label: "LinkedIn", value: "linkedin.com/in/rupesh-patel", href: "https://linkedin.com/in/rupesh-patel", color: "#0A66C2" },
          { icon: <GitHubIcon />, label: "GitHub", value: "github.com/rupesh-patel", href: "https://github.com/rupesh-patel", color: COLORS.text },
        ].map((item, i) => (
          <FadeIn key={item.label} delay={150 + i * 80}>
            <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 16, background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "22px 24px", textDecoration: "none" }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: `${item.color}12`, display: "flex", alignItems: "center", justifyContent: "center", color: item.color, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, fontWeight: 600, color: COLORS.textLight, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15.5, color: COLORS.text, fontWeight: 500 }}>{item.value}</div>
              </div>
            </a>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={500}>
        <div style={{ marginTop: 48, background: `linear-gradient(135deg, ${COLORS.accent}08, ${COLORS.accentLight})`, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "32px 36px", textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}><SendIcon /></div>
          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, fontWeight: 400, color: COLORS.text, margin: "0 0 8px" }}>Open to Opportunities</h3>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, lineHeight: 1.65, color: COLORS.textMuted, maxWidth: 480, margin: "0 auto 20px" }}>I'm currently exploring data engineering roles where I can build scalable pipelines, drive data governance, and make a real impact. Let's talk!</p>
          <a href="mailto:datasci.patel.rupesh@gmail.com" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", background: COLORS.accent, color: "#fff", borderRadius: 8, textDecoration: "none", fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 600 }}><MailIcon /> Get In Touch</a>
        </div>
      </FadeIn>
    </div>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${COLORS.border}`, padding: "28px 24px", fontFamily: "'Source Sans 3', sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontSize: 13, color: COLORS.textLight }}>© {new Date().getFullYear()} Rupesh Patel · Built with care in Toronto</span>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <a href="https://linkedin.com/in/rupesh-patel" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.textLight, transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = COLORS.accent} onMouseLeave={(e) => e.currentTarget.style.color = COLORS.textLight}><LinkedInIcon /></a>
          <a href="https://github.com/rupesh-patel" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.textLight, transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = COLORS.accent} onMouseLeave={(e) => e.currentTarget.style.color = COLORS.textLight}><GitHubIcon size={20} /></a>
          <a href="mailto:datasci.patel.rupesh@gmail.com" style={{ color: COLORS.textLight, transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = COLORS.accent} onMouseLeave={(e) => e.currentTarget.style.color = COLORS.textLight}><MailIcon /></a>
        </div>
      </div>
    </footer>
  );
}

/* ── MAIN APP ── */
export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("Home");
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [activeTab]);
  const renderTab = () => {
    switch (activeTab) {
      case "Home": return <HomeTab setActiveTab={setActiveTab} />;
      case "Experience": return <ExperienceTab />;
      case "Projects": return <ProjectsTab />;
      case "Resume": return <ResumeTab />;
      case "Blog": return <BlogTab />;
      case "Contact": return <ContactTab />;
      default: return <HomeTab setActiveTab={setActiveTab} />;
    }
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Source+Sans+3:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @media (max-width: 768px) {
          .nav-tabs-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .value-props-grid { grid-template-columns: 1fr !important; }
          .skills-row { flex-direction: column !important; gap: 8px !important; }
          .skills-label { width: auto !important; }
          .hero-flex { flex-direction: column !important; text-align: center; align-items: center !important; }
          .hero-buttons { justify-content: center !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .cta-box { flex-direction: column !important; text-align: center; align-items: center !important; }
          .cta-buttons { justify-content: center !important; }
          .exp-header { flex-direction: column !important; }
          .edu-card { flex-direction: column !important; align-items: flex-start !important; }
        }
        @media (max-width: 480px) {
          .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
        }
      `}</style>
      <div style={{ minHeight: "100vh", background: COLORS.bg }}>
        <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main>
          <TabTransition tabKey={activeTab}>
            {renderTab()}
          </TabTransition>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
