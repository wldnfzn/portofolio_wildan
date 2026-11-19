import { Lang } from "../context/AppContext";

export interface CareerEntry {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  category: string;
  tools: string;
  summary: string;
  highlights: string[];
  link?: string;
  linkLabel?: string;
  accent: string;
  visualType: "sword" | "map" | "salestrack" | "ump-profile";
}

export type EventCategory = "all" | "ketuaumum" | "stallsick" | "mfl" | "mov";

export interface EventPhotoEntry {
  id: string;
  category: Exclude<EventCategory, "all">;
  categoryLabel: string;
  title: string;
  role: string;
  year: string;
  image: string;
  caption: string;
}

export interface ServiceCard {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export interface PortfolioCopy {
  nav: {
    about: string;
    whatIDo: string;
    career: string;
    work: string;
    events: string;
    contact: string;
    resumeLabel: string;
    resumeFile: string;
  };
  loading: {
    marquee: string[];
    loadingLabel: string;
    welcomeLabel: string;
  };
  hero: {
    greeting: string;
    firstName: string;
    lastName: string;
    prefix: string;
    rolePrimaryA: string;
    rolePrimaryB: string;
    roleSecondaryA: string;
    roleSecondaryB: string;
  };
  about: {
    title: string;
    badge: string;
    headline: string;
    summary: string;
    educationLabel: string;
    educationTitle: string;
    educationPeriod: string;
    locationLabel: string;
  };
  whatIDo: {
    headingTop: string;
    headingMid: string;
    headingLine2Prefix: string;
    headingAccent: string;
    skillHeading: string;
    cards: ServiceCard[];
  };
  career: {
    headingLine1: string;
    headingAccent: string;
    headingLine2: string;
    items: CareerEntry[];
  };
  work: {
    headingLead: string;
    headingAccent: string;
    toolsLabel: string;
    projects: ProjectEntry[];
  };
  events: {
    headingLead: string;
    headingAccent: string;
    subtitle: string;
    categories: Array<{ key: EventCategory; label: string }>;
    items: EventPhotoEntry[];
  };
  techstack: {
    heading: string;
    hint: string;
  };
  contact: {
    heading: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    educationLabel: string;
    educationValue: string;
    socialLabel: string;
    cvSectionLabel: string;
    cvEnLabel: string;
    cvIdLabel: string;
    creditPrefix: string;
    creditName: string;
    year: string;
  };
}

export const TECH_BADGES = [
  { name: "SDLC", bg: "#c2a4ff", fg: "#0b080c" },
  { name: "PostgreSQL", bg: "#336791", fg: "#ffffff" },
  { name: "Laravel", bg: "#ff2d20", fg: "#ffffff" },
  { name: "PHP", bg: "#777bb4", fg: "#ffffff" },
  { name: "React", bg: "#1a2433", fg: "#61dafb" },
  { name: "TypeScript", bg: "#3178c6", fg: "#ffffff" },
  { name: "JavaScript", bg: "#f7df1e", fg: "#111111" },
  { name: "Node.js", bg: "#339933", fg: "#ffffff" },
  { name: "Docker", bg: "#2496ed", fg: "#ffffff" },
  { name: "Tailwind", bg: "#0f172a", fg: "#38bdf8" },
  { name: "MySQL", bg: "#00758f", fg: "#ffffff" },
  { name: "REST API", bg: "#4c1d95", fg: "#e9d5ff" },
  { name: "Expo", bg: "#18181b", fg: "#f4f4f5" },
  { name: "Git", bg: "#f05032", fg: "#ffffff" },
];

export const PORTFOLIO_DATA: Record<Lang, PortfolioCopy> = {
  EN: {
    nav: {
      about: "ABOUT",
      whatIDo: "WHAT I DO",
      career: "CAREER",
      work: "WORK",
      events: "EVENTS",
      contact: "CONTACT",
      resumeLabel: "RESUME (EN)",
      resumeFile: "/CV_Wildan_Fauzan_EN.pdf",
    },
    loading: {
      marquee: [
        "System Analyst",
        "IT Business Analyst",
        "SDLC & Database Design",
        "AI-Assisted Developer",
      ],
      loadingLabel: "Loading",
      welcomeLabel: "Enter Portfolio",
    },
    hero: {
      greeting: "Hello! I'm",
      firstName: "WILDAN",
      lastName: "FAUZAN",
      prefix: "A Focused",
      rolePrimaryA: "System",
      rolePrimaryB: "Application",
      roleSecondaryA: "Analyst",
      roleSecondaryB: "Developer",
    },
    about: {
      title: "About Me",
      badge: "#OPENTOWORK • Bandung, ID",
      headline: "Bridging Business Workflows with Structured System Architecture",
      summary:
        "Final-year Informatics Engineering undergraduate at Universitas Teknologi Bandung focusing on business process analysis, system design, Software Development Life Cycle (SDLC) execution, and AI-assisted web & mobile development. Experienced in designing relational databases, Role-Based Access Control (RBAC), containerized environments with Docker, and functional system validation.",
      educationLabel: "Education",
      educationTitle: "B.Sc. Informatics Engineering — UTB",
      educationPeriod: "2023 – Present",
      locationLabel: "Bandung, West Java, Indonesia",
    },
    whatIDo: {
      headingTop: "W",
      headingMid: "HAT",
      headingLine2Prefix: "I",
      headingAccent: " DO",
      skillHeading: "Skillset & tools",
      cards: [
        {
          title: "ANALYZE",
          subtitle: "System & Business Analysis",
          description:
            "Translating operational business needs into clear SDLC documentation, user role matrices (RBAC), relational database schemas (ERD), and structured test cases.",
          tags: [
            "SDLC",
            "Requirement Gathering",
            "Flowchart & ERD",
            "RBAC Matrix",
            "Black-Box Testing",
            "UAT",
            "PostgreSQL",
            "MySQL",
          ],
        },
        {
          title: "BUILD",
          subtitle: "AI-Assisted Web & App Development",
          description:
            "Leveraging AI-assisted workflows alongside Docker to rapidly deliver functional web portals, CMS company profiles, and cross-platform mobile applications.",
          tags: [
            "PHP & Laravel",
            "Blade",
            "JavaScript",
            "TypeScript",
            "React",
            "React Native (Expo)",
            "Node.js",
            "REST API",
            "Tailwind CSS",
            "Docker",
            "Git",
          ],
        },
      ],
    },
    career: {
      headingLine1: "My career ",
      headingAccent: "&",
      headingLine2: "experience",
      items: [
        {
          role: "System Analyst & Application Developer (Contract / WFH)",
          company: "PT. United Multilift Perkasa (PT. UMP)",
          period: "OCT 2026 – NOW",
          description:
            "Executed SDLC phases from operational analysis to building SWORD (Service Workflow & Operational Resource Dashboard) with PostgreSQL, multi-role RBAC, Docker development setup, and an upgraded corporate website via AI-assisted workflows.",
        },
        {
          role: "Front-End Web Developer Intern (Hybrid)",
          company: "PT. Multidaya Anugrah Perkasa (MAP Battery)",
          period: "FEB – JUL 2026",
          description:
            "Analyzed functional & UI requirements and modernized the B2B Company Profile & E-Catalog Website using Laravel (Blade), Tailwind CSS, and JavaScript, validated with Black-Box Testing and UAT.",
        },
        {
          role: "Public Relations & Community Partnership",
          company: "PT. Foodline Indonesia",
          period: "JAN – AUG 2026",
          description:
            "Built and managed partnerships with communities, external brands, media, and talents. Initiated and coordinated end-to-end event activations from prospecting and negotiation to on-site execution.",
        },
        {
          role: "General Chairperson (2025) & Event Committee (2024)",
          company: "UKM Music Society – Universitas Teknologi Bandung",
          period: "2024 – 2025",
          description:
            "Led strategic governance and acted as Project Supervisor for all 2025 student organization programs, following earlier roles as Project Officer (MOV), Event Division (Stallsick Fest), and MC (MFL Vol. II).",
        },
        {
          role: "Marketing Communication",
          company: "Shutr Indonesia",
          period: "NOV 2023 – SEP 2025",
          description:
            "Maintained partnerships with vendors, KOLs, content creators, and resellers. Managed end-to-end collaboration workflows and coordinated promotional campaigns across internal production and marketing teams.",
        },
      ],
    },
    work: {
      headingLead: "My ",
      headingAccent: "Work",
      toolsLabel: "Core Architecture & Stack",
      projects: [
        {
          id: "01",
          name: "SWORD Operational System",
          category: "PT. UMP • Fleet Service & Sparepart Platform",
          tools: "SDLC, PostgreSQL, RBAC, React, React Native (Expo), Node.js, REST API, Docker",
          summary:
            "End-to-end digital inspection & fleet maintenance platform connecting executives, sales, warehouse, and field mechanics via web & Android.",
          highlights: [
            "QR Code unit scanning & inspection workflows",
            "Multi-tier sparepart procurement & PIN pickup",
            "Normalized PostgreSQL & role-based web/mobile sync",
          ],
          link: "https://ump-sword.com",
          linkLabel: "Visit SWORD Portal",
          accent: "#c2a4ff",
          visualType: "sword",
        },
        {
          id: "02",
          name: "MAP Battery E-Catalog",
          category: "PT. Multidaya Anugrah Perkasa • B2B CMS Web",
          tools: "SDLC, Laravel (PHP & Blade), Tailwind CSS, JavaScript, Black-Box & UAT",
          summary:
            "Modernized B2B corporate profile & interactive product catalog integrated with dynamic CMS management and mobile-first responsiveness.",
          highlights: [
            "Modular Blade components & responsive grid",
            "Traction, Lithium & Charger catalog architecture",
            "Validated through Black-Box Testing & UAT",
          ],
          link: "https://www.map-battery.com",
          linkLabel: "Visit MAP Battery",
          accent: "#60a5fa",
          visualType: "map",
        },
        {
          id: "03",
          name: "SalesTrack CRM & Geofencing",
          category: "Independent Project • Client-Server System",
          tools: "System Analysis, PostgreSQL, Docker Compose, Node.js, TypeScript, React, Tailwind",
          summary:
            "Field sales activity tracking, deal pipeline management, and GPS Geofencing attendance validation packaged with Docker Compose.",
          highlights: [
            "GPS radius check-in/check-out & leave approvals",
            "Role-based Sales, Manager & Admin dashboards",
            "Containerized PostgreSQL database workflow",
          ],
          link: "https://github.com/wldnfzn/salestrack",
          linkLabel: "View on GitHub",
          accent: "#34d399",
          visualType: "salestrack",
        },
        {
          id: "04",
          name: "PT. UMP Corporate Profile",
          category: "PT. United Multilift Perkasa • Company Website",
          tools: "Requirement Analysis, AI-Assisted Development, Responsive UI, System Integration",
          summary:
            "Corporate digital presence upgrade designed alongside SWORD to present heavy-equipment solutions clearly for industrial B2B clients.",
          highlights: [
            "Structured business information hierarchy",
            "Clean responsive interface for B2B prospects",
            "Cohesive corporate branding with SWORD",
          ],
          link: "https://github.com/wldnfzn",
          linkLabel: "GitHub Profile",
          accent: "#f472b6",
          visualType: "ump-profile",
        },
      ],
    },
    events: {
      headingLead: "Event & ",
      headingAccent: "Leadership",
      subtitle:
        "Visual highlights from campus music festivals and student organization leadership at UKM Music Society UTB — demonstrating cross-team coordination, event execution, and stakeholder management.",
      categories: [
        { key: "all", label: "All Highlights" },
        { key: "ketuaumum", label: "General Chairperson" },
        { key: "stallsick", label: "Stallsick Fest" },
        { key: "mfl", label: "Music For Life" },
        { key: "mov", label: "Music On Vacation" },
      ],
      items: [
        {
          id: "ev-01",
          category: "ketuaumum",
          categoryLabel: "Leadership",
          title: "UKM Music Society UTB — General Chairperson",
          role: "Ketua Umum / Overall Supervisor",
          year: "2025",
          image: "/events/ketua-umum-wildan.jpg",
          caption: "Led organizational strategy, cross-division coordination, and all 2025 event programs.",
        },
        {
          id: "ev-02",
          category: "stallsick",
          categoryLabel: "Stallsick Fest",
          title: "Stallsick Fest x Dies Natalis UTB — Committee",
          role: "Event Division / Overall Supervisor",
          year: "2024 – 2025",
          image: "/events/stallsick-stage-team.jpg",
          caption: "Full organizing crew on the main auditorium stage after executing Stallsick Fest x Dies Natalis.",
        },
        {
          id: "ev-03",
          category: "stallsick",
          categoryLabel: "Stallsick Fest",
          title: "Stallsick Fest x Dies Natalis — Live Stage",
          role: "Event Division & Crew Coordination",
          year: "2024 – 2025",
          image: "/events/stallsick-live-band.jpg",
          caption: "Live band showcase and stage coordination with Music Society UTB crew.",
        },
        {
          id: "ev-04",
          category: "stallsick",
          categoryLabel: "Stallsick Fest",
          title: "Funky Sick — Stallsick Fest 2025",
          role: "Project Supervisor (Ketua Umum)",
          year: "Dec 2025",
          image: "/events/stallsick-poster-2025.jpg",
          caption: "Official poster for Stallsick Fest 2025 at Universitas Teknologi Bandung.",
        },
        {
          id: "ev-05",
          category: "stallsick",
          categoryLabel: "Stallsick Fest",
          title: "Stallsick Fest — Audience Engagement",
          role: "Event Division",
          year: "2024 – 2025",
          image: "/events/stallsick-crowd.jpg",
          caption: "Main stage crowd interaction and live music atmosphere during the festival.",
        },
        {
          id: "ev-06",
          category: "mfl",
          categoryLabel: "Music For Life",
          title: "Music For Life — Stage Production Crew",
          role: "MC & Event Division / Supervisor",
          year: "2024 – 2025",
          image: "/events/mfl-crew-stage.jpg",
          caption: "Behind-the-scenes production coordination with Music Society UTB members.",
        },
        {
          id: "ev-07",
          category: "mfl",
          categoryLabel: "Music For Life",
          title: "MFL Mini Concert: The Beginning",
          role: "Project Supervisor (Ketua Umum)",
          year: "Aug 2025",
          image: "/events/mfl-poster-2025.jpg",
          caption: "Mini Concert event poster organized under Music Society UTB 2025 leadership.",
        },
        {
          id: "ev-08",
          category: "mfl",
          categoryLabel: "Music For Life",
          title: "Music For Life Vol. II (MFL Vol. II)",
          role: "Master of Ceremony (MC)",
          year: "Aug 2024",
          image: "/events/mfl-vol2-poster-2024.jpg",
          caption: "Served as MC hosting stage sessions and performer transitions at MFL Vol. II.",
        },
        {
          id: "ev-09",
          category: "mfl",
          categoryLabel: "Music For Life",
          title: "Music For Life — Crowd Atmosphere",
          role: "MC & Event Operations",
          year: "2024",
          image: "/events/mfl-live-crowd.jpg",
          caption: "Energetic live audience engagement during the campus music showcase.",
        },
        {
          id: "ev-10",
          category: "mov",
          categoryLabel: "Music On Vacation",
          title: "Music On Vacation (MOV) — Project Officer",
          role: "Ketua Pelaksana (Project Manager)",
          year: "Jun 2024",
          image: "/events/mov-project-manager.jpg",
          caption: "Led concept formulation, cross-division execution, and on-site logistics as Project Officer.",
        },
        {
          id: "ev-11",
          category: "mov",
          categoryLabel: "Music On Vacation",
          title: "Music On Vacation — Event Poster",
          role: "Ketua Pelaksana (Project Officer)",
          year: "Jun 2024",
          image: "/events/mov-poster-2024.jpg",
          caption: "Promotional visual for Music On Vacation held at Coffeehey Area.",
        },
        {
          id: "ev-12",
          category: "mov",
          categoryLabel: "Music On Vacation",
          title: "MOV Organizing Team",
          role: "Ketua Pelaksana (Project Officer)",
          year: "Jun 2024",
          image: "/events/mov-committee-team.jpg",
          caption: "Cross-division committee team photo after wrapping up Music On Vacation.",
        },
        {
          id: "ev-13",
          category: "mov",
          categoryLabel: "Music On Vacation",
          title: "MOV On-Site Registration Desk",
          role: "Ketua Pelaksana (Project Officer)",
          year: "Jun 2024",
          image: "/events/mov-registration.jpg",
          caption: "Coordinating attendee check-in and ticketing flow at the event entrance.",
        },
        {
          id: "ev-14",
          category: "mov",
          categoryLabel: "Music On Vacation",
          title: "MOV Live Community Session",
          role: "Ketua Pelaksana (Project Officer)",
          year: "Jun 2024",
          image: "/events/mov-jump-together.jpg",
          caption: "Community & band collaboration moment during the Music On Vacation showcase.",
        },
      ],
    },
    techstack: {
      heading: "My Techstack",
      hint: "Move cursor to interact with 3D nodes",
    },
    contact: {
      heading: "Contact",
      emailLabel: "Email",
      phoneLabel: "Phone / WhatsApp",
      locationLabel: "Location",
      educationLabel: "Education",
      educationValue: "S1 Informatics Engineering — UTB (2023 – Present)",
      socialLabel: "Social",
      cvSectionLabel: "Download Resume / CV",
      cvEnLabel: "CV English (PDF)",
      cvIdLabel: "CV Indonesia (PDF)",
      creditPrefix: "Designed & Built with Three.js + GSAP by",
      creditName: "Wildan Fauzan",
      year: "2026",
    },
  },
  ID: {
    nav: {
      about: "TENTANG",
      whatIDo: "KEAHLIAN",
      career: "KARIR",
      work: "PROYEK",
      events: "EVENT",
      contact: "KONTAK",
      resumeLabel: "UNDUH CV (ID)",
      resumeFile: "/CV_Wildan_Fauzan_ID.pdf",
    },
    loading: {
      marquee: [
        "System Analyst",
        "IT Business Analyst",
        "SDLC & Perancangan Basis Data",
        "AI-Assisted Developer",
      ],
      loadingLabel: "Memuat",
      welcomeLabel: "Buka Portofolio",
    },
    hero: {
      greeting: "Halo! Saya",
      firstName: "WILDAN",
      lastName: "FAUZAN",
      prefix: "Seorang",
      rolePrimaryA: "System",
      rolePrimaryB: "Application",
      roleSecondaryA: "Analyst",
      roleSecondaryB: "Developer",
    },
    about: {
      title: "Tentang Saya",
      badge: "#OPENTOWORK • Bandung, ID",
      headline: "Menjembatani Kebutuhan Bisnis dengan Arsitektur Sistem Terstruktur",
      summary:
        "Mahasiswa tingkat akhir S1 Teknik Informatika Universitas Teknologi Bandung yang fokus pada analisis proses bisnis, perancangan sistem informasi, penerapan SDLC (Software Development Life Cycle), serta pengembangan web dan mobile berbantuan AI. Berpengalaman merancang skema basis data relasional, hak akses RBAC, penggunaan Docker, serta pengujian fungsional sistem.",
      educationLabel: "Pendidikan",
      educationTitle: "S1 Teknik Informatika — UTB",
      educationPeriod: "2023 – Sekarang",
      locationLabel: "Bandung, Jawa Barat, Indonesia",
    },
    whatIDo: {
      headingTop: "Y",
      headingMid: "ANG",
      headingLine2Prefix: "SAYA",
      headingAccent: " KERJAKAN",
      skillHeading: "Keahlian & Alat",
      cards: [
        {
          title: "ANALISIS",
          subtitle: "System & Business Analysis",
          description:
            "Menerjemahkan kebutuhan operasional bisnis ke dalam alur SDLC, matriks hak akses pengguna (RBAC), desain basis data relasional (ERD), serta dokumen pengujian terstruktur.",
          tags: [
            "SDLC",
            "Requirement Gathering",
            "Flowchart & ERD",
            "RBAC Matrix",
            "Black-Box Testing",
            "UAT",
            "PostgreSQL",
            "MySQL",
          ],
        },
        {
          title: "BANGUN",
          subtitle: "AI-Assisted Web & App Development",
          description:
            "Memanfaatkan alur kerja berbantuan AI dan kontainerisasi Docker untuk membangun portal web perusahaan, CMS company profile, serta aplikasi mobile secara efisien.",
          tags: [
            "PHP & Laravel",
            "Blade",
            "JavaScript",
            "TypeScript",
            "React",
            "React Native (Expo)",
            "Node.js",
            "REST API",
            "Tailwind CSS",
            "Docker",
            "Git",
          ],
        },
      ],
    },
    career: {
      headingLine1: "Perjalanan karir ",
      headingAccent: "&",
      headingLine2: "pengalaman",
      items: [
        {
          role: "System Analyst & Application Developer (Kontrak / WFH)",
          company: "PT. United Multilift Perkasa (PT. UMP)",
          period: "OKT 2026 – SKRG",
          description:
            "Menjalankan tahapan SDLC dari analisis kebutuhan operasional hingga membangun sistem SWORD (PostgreSQL, RBAC multi-peran, lingkungan Docker) serta merancang pembaruan Website Company Profile melalui alur AI-Assisted Development.",
        },
        {
          role: "Front-End Web Developer Intern (Hybrid)",
          company: "PT. Multidaya Anugrah Perkasa (MAP Battery)",
          period: "FEB – JUL 2026",
          description:
            "Menganalisis kebutuhan fungsional & UI serta memodernisasi Website Company Profile & E-Katalog B2B berbasis Laravel (Blade), Tailwind CSS, dan JavaScript yang divalidasi dengan Black-Box Testing dan UAT.",
        },
        {
          role: "Public Relations & Community Partnership",
          company: "PT. Foodline Indonesia",
          period: "JAN – AGU 2026",
          description:
            "Membangun dan mengelola kemitraan dengan komunitas, brand eksternal, media, dan talent. Menginisiasi serta mengoordinasikan penyelenggaraan event dari tahap negosiasi hingga eksekusi lapangan.",
        },
        {
          role: "Ketua Umum (2025) & Panitia Event (2024)",
          company: "UKM Music Society – Universitas Teknologi Bandung",
          period: "2024 – 2025",
          description:
            "Memimpin tata kelola organisasi serta bertindak sebagai Penanggung Jawab seluruh program kerja 2025, setelah sebelumnya menjabat Ketua Pelaksana MOV, Divisi Acara Stallsick Fest, dan MC MFL Vol. II.",
        },
        {
          role: "Marketing Communication",
          company: "Shutr Indonesia",
          period: "NOV 2023 – SEP 2025",
          description:
            "Menjaga hubungan kerja sama dengan vendor, KOL, content creator, dan reseller. Mengelola alur kemitraan dari outreach hingga monitoring kampanye lintas tim internal.",
        },
      ],
    },
    work: {
      headingLead: "Karya ",
      headingAccent: "Proyek",
      toolsLabel: "Arsitektur & Teknologi Inti",
      projects: [
        {
          id: "01",
          name: "Sistem Operasional SWORD",
          category: "PT. UMP • Platform Servis Armada & Sparepart",
          tools: "SDLC, PostgreSQL, RBAC, React, React Native (Expo), Node.js, REST API, Docker",
          summary:
            "Platform inspeksi digital & pemeliharaan armada yang menghubungkan manajemen, sales, gudang, dan mekanik lapangan melalui web dan Android.",
          highlights: [
            "Pemindaian QR Code unit & formulir inspeksi",
            "Pengadaan sparepart berjenjang dengan verifikasi PIN",
            "Sinkronisasi basis data PostgreSQL web & mobile",
          ],
          link: "https://ump-sword.com",
          linkLabel: "Buka Portal SWORD",
          accent: "#c2a4ff",
          visualType: "sword",
        },
        {
          id: "02",
          name: "E-Katalog B2B MAP Battery",
          category: "PT. Multidaya Anugrah Perkasa • Web CMS",
          tools: "SDLC, Laravel (PHP & Blade), Tailwind CSS, JavaScript, Black-Box & UAT",
          summary:
            "Modernisasi website company profile & katalog produk B2B yang terintegrasi dinamis dengan CMS serta tata letak responsif lintas perangkat.",
          highlights: [
            "Komponen modular Laravel Blade & layout responsif",
            "Struktur katalog Traction, Lithium, dan Charger",
            "Divalidasi melalui Black-Box Testing & UAT",
          ],
          link: "https://www.map-battery.com",
          linkLabel: "Kunjungi MAP Battery",
          accent: "#60a5fa",
          visualType: "map",
        },
        {
          id: "03",
          name: "SalesTrack CRM & Geofencing",
          category: "Proyek Mandiri • Sistem Client-Server",
          tools: "System Analysis, PostgreSQL, Docker Compose, Node.js, TypeScript, React, Tailwind",
          summary:
            "Sistem pelacakan aktivitas harian sales, manajemen pipeline prospek, serta verifikasi absensi GPS Geofencing di atas kontainer Docker Compose.",
          highlights: [
            "Validasi radius GPS check-in/out & pengajuan cuti",
            "Dashboard khusus peran Sales, Manager & Admin",
            "Lingkungan database PostgreSQL berbasis Docker",
          ],
          link: "https://github.com/wldnfzn/salestrack",
          linkLabel: "Lihat di GitHub",
          accent: "#34d399",
          visualType: "salestrack",
        },
        {
          id: "04",
          name: "Profil Perusahaan PT. UMP",
          category: "PT. United Multilift Perkasa • Company Website",
          tools: "Analisis Kebutuhan, AI-Assisted Development, UI Responsif, Integrasi Sistem",
          summary:
            "Pembaruan website profil perusahaan PT. United Multilift Perkasa yang dirancang selaras dengan ekosistem SWORD untuk klien industri B2B.",
          highlights: [
            "Hierarki informasi bisnis & produk yang terstruktur",
            "Antarmuka web responsif untuk calon klien B2B",
            "Selaras dengan identitas digital sistem SWORD",
          ],
          link: "https://github.com/wldnfzn",
          linkLabel: "Profil GitHub",
          accent: "#f472b6",
          visualType: "ump-profile",
        },
      ],
    },
    events: {
      headingLead: "Dokumentasi ",
      headingAccent: "Event & Kepemimpinan",
      subtitle:
        "Dokumentasi penyelenggaraan festival musik kampus dan kepemimpinan organisasi di UKM Music Society UTB sebagai bukti koordinasi lintas tim, manajemen acara, dan komunikasi mitra.",
      categories: [
        { key: "all", label: "Semua Dokumentasi" },
        { key: "ketuaumum", label: "Ketua Umum" },
        { key: "stallsick", label: "Stallsick Fest" },
        { key: "mfl", label: "Music For Life" },
        { key: "mov", label: "Music On Vacation" },
      ],
      items: [
        {
          id: "ev-01",
          category: "ketuaumum",
          categoryLabel: "Kepemimpinan",
          title: "UKM Music Society UTB — Ketua Umum",
          role: "Ketua Umum / Penanggung Jawab Program",
          year: "2025",
          image: "/events/ketua-umum-wildan.jpg",
          caption: "Memimpin tata kelola organisasi, koordinasi seluruh divisi, dan seluruh agenda event tahun 2025.",
        },
        {
          id: "ev-02",
          category: "stallsick",
          categoryLabel: "Stallsick Fest",
          title: "Stallsick Fest x Dies Natalis UTB — Panitia",
          role: "Divisi Acara / Penanggung Jawab",
          year: "2024 – 2025",
          image: "/events/stallsick-stage-team.jpg",
          caption: "Foto bersama seluruh kepanitiaan di panggung utama usai pelaksanaan Stallsick Fest x Dies Natalis.",
        },
        {
          id: "ev-03",
          category: "stallsick",
          categoryLabel: "Stallsick Fest",
          title: "Stallsick Fest x Dies Natalis — Panggung Live",
          role: "Divisi Acara & Koordinasi Teknis",
          year: "2024 – 2025",
          image: "/events/stallsick-live-band.jpg",
          caption: "Penampilan band dan koordinasi panggung oleh kru UKM Music Society UTB.",
        },
        {
          id: "ev-04",
          category: "stallsick",
          categoryLabel: "Stallsick Fest",
          title: "Funky Sick — Stallsick Fest 2025",
          role: "Penanggung Jawab (Ketua Umum)",
          year: "Des 2025",
          image: "/events/stallsick-poster-2025.jpg",
          caption: "Poster resmi acara Stallsick Fest 2025 di Universitas Teknologi Bandung.",
        },
        {
          id: "ev-05",
          category: "stallsick",
          categoryLabel: "Stallsick Fest",
          title: "Stallsick Fest — Antusiasme Penonton",
          role: "Divisi Acara",
          year: "2024 – 2025",
          image: "/events/stallsick-crowd.jpg",
          caption: "Suasana interaksi penonton dan pengisi acara selama festival berlangsung.",
        },
        {
          id: "ev-06",
          category: "mfl",
          categoryLabel: "Music For Life",
          title: "Music For Life — Tim Produksi Panggung",
          role: "MC & Divisi Acara / Penanggung Jawab",
          year: "2024 – 2025",
          image: "/events/mfl-crew-stage.jpg",
          caption: "Koordinasi produksi di balik panggung bersama anggota Music Society UTB.",
        },
        {
          id: "ev-07",
          category: "mfl",
          categoryLabel: "Music For Life",
          title: "MFL Mini Concert: The Beginning",
          role: "Penanggung Jawab (Ketua Umum)",
          year: "Agu 2025",
          image: "/events/mfl-poster-2025.jpg",
          caption: "Poster acara Mini Concert yang diselenggarakan pada masa kepengurusan 2025.",
        },
        {
          id: "ev-08",
          category: "mfl",
          categoryLabel: "Music For Life",
          title: "Music For Life Vol. II (MFL Vol. II)",
          role: "Master of Ceremony (MC)",
          year: "Agu 2024",
          image: "/events/mfl-vol2-poster-2024.jpg",
          caption: "Memandu rangkaian acara utama dan menjaga interaksi audiens pada MFL Vol. II.",
        },
        {
          id: "ev-09",
          category: "mfl",
          categoryLabel: "Music For Life",
          title: "Music For Life — Suasana Acara",
          role: "MC & Operasional Acara",
          year: "2024",
          image: "/events/mfl-live-crowd.jpg",
          caption: "Keseruan audiens selama penyelenggaraan pertunjukan musik kampus.",
        },
        {
          id: "ev-10",
          category: "mov",
          categoryLabel: "Music On Vacation",
          title: "Music On Vacation (MOV) — Ketua Pelaksana",
          role: "Ketua Pelaksana (Project Officer)",
          year: "Jun 2024",
          image: "/events/mov-project-manager.jpg",
          caption: "Memimpin perumusan konsep, koordinasi lintas divisi, hingga eksekusi lapangan acara MOV.",
        },
        {
          id: "ev-11",
          category: "mov",
          categoryLabel: "Music On Vacation",
          title: "Music On Vacation — Poster Acara",
          role: "Ketua Pelaksana (Project Officer)",
          year: "Jun 2024",
          image: "/events/mov-poster-2024.jpg",
          caption: "Materi publikasi resmi acara Music On Vacation di Coffeehey Area.",
        },
        {
          id: "ev-12",
          category: "mov",
          categoryLabel: "Music On Vacation",
          title: "Tim Kepanitiaan MOV",
          role: "Ketua Pelaksana (Project Officer)",
          year: "Jun 2024",
          image: "/events/mov-committee-team.jpg",
          caption: "Dokumentasi tim panitia lintas divisi setelah menyelesaikan rangkaian acara MOV.",
        },
        {
          id: "ev-13",
          category: "mov",
          categoryLabel: "Music On Vacation",
          title: "Koordinasi Meja Registrasi MOV",
          role: "Ketua Pelaksana (Project Officer)",
          year: "Jun 2024",
          image: "/events/mov-registration.jpg",
          caption: "Pengelolaan alur registrasi dan penerimaan pengunjung di lokasi acara.",
        },
        {
          id: "ev-14",
          category: "mov",
          categoryLabel: "Music On Vacation",
          title: "Sesi Komunitas Live MOV",
          role: "Ketua Pelaksana (Project Officer)",
          year: "Jun 2024",
          image: "/events/mov-jump-together.jpg",
          caption: "Kolaborasi komunitas musik dan penonton pada acara Music On Vacation.",
        },
      ],
    },
    techstack: {
      heading: "Tech Stack",
      hint: "Gerakkan kursor untuk berinteraksi dengan node 3D",
    },
    contact: {
      heading: "Kontak",
      emailLabel: "Email",
      phoneLabel: "Telepon / WhatsApp",
      locationLabel: "Domisili",
      educationLabel: "Pendidikan",
      educationValue: "S1 Teknik Informatika — UTB (2023 – Sekarang)",
      socialLabel: "Sosial Media",
      cvSectionLabel: "Unduh CV ATS (PDF)",
      cvEnLabel: "CV English (PDF)",
      cvIdLabel: "CV Indonesia (PDF)",
      creditPrefix: "Dirancang & Dibangun dengan Three.js + GSAP oleh",
      creditName: "Wildan Fauzan",
      year: "2026",
    },
  },
};
