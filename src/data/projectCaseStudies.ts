import { Lang } from "../context/AppContext";

export interface CaseStudyFlowStep {
  actor: string;
  action: string;
  detail: string;
}

export interface CaseStudyScreenshot {
  src: string;
  caption: string;
  tag: string;
}

export interface ProjectCaseStudy {
  id: string;
  subtitle: string;
  scope: string;
  architectureSummary: string;
  problem: string;
  solution: string;
  roles: string[];
  flowSteps: CaseStudyFlowStep[];
  validation: string[];
  metricsNote: string;
  screenshots?: CaseStudyScreenshot[];
  externalUrl?: string;
  externalLabel?: string;
}

type CaseStudiesByLang = Record<Lang, Record<string, ProjectCaseStudy>>;

export const PROJECT_CASE_STUDIES: CaseStudiesByLang = {
  EN: {
    "01": {
      id: "01",
      subtitle: "Enterprise Forklift Inspection, Work Order & Sparepart Operations System",
      scope: "PT. United Multilift Perkasa · Client Production System (Web & Mobile)",
      architectureSummary:
        "7-role RBAC portal & field mobile app backed by normalized PostgreSQL/relational schemas, JSONB inspection snapshots, and transactional sparepart stock locking.",
      problem:
        "Field forklift inspections, sparepart requests, and breakdown tickets were previously tracked through disconnected chats and manual spreadsheets. Managers lacked live fleet health visibility, warehouse staff risked double-deducting parts without pickup verification, and mechanics needed an offline-tolerant mobile flow at client sites.",
      solution:
        "Designed end-to-end SDLC requirements, RBAC boundaries (7 roles), QR-linked 58-item inspection scoring rules, and an accountable sparepart dispatch chain requiring manager (CCL) approval and warehouse 4-digit PIN handoff.",
      roles: [
        "SALES (Ticket Intake)",
        "MANAGER / CCL (Approval & Assign)",
        "MECHANIC / CCM (QR Inspect & Pickup)",
        "TECH INVENTORY / TCL (4-Digit PIN Warehouse)",
        "GENERAL MANAGER & DIRECTOR (Read Oversight)",
        "SUPER ADMIN (Scoring & Master Config)",
      ],
      flowSteps: [
        {
          actor: "1. Sales / Scheduler",
          action: "Creates Breakdown Ticket or Scheduled Task",
          detail: "Routes unit issue or preventive PM schedule to CCL queue.",
        },
        {
          actor: "2. Manager (CCL)",
          action: "Assigns Mechanic Team & Approves Spareparts",
          detail: "Transitions sparepart requests from PENDING_CCL to SUBMITTED.",
        },
        {
          actor: "3. Warehouse (TCL)",
          action: "Prepares Stock & Generates 4-Digit PIN",
          detail: "Sets request READY with time-bounded verification PIN for handoff.",
        },
        {
          actor: "4. Mechanic (CCM)",
          action: "Verifies PIN, Scans Unit QR & Submits 58-Item Check",
          detail: "Atomic stock deduction runs once on pickup; health score (>=80 Healthy, 50-79 Attention, <50 Critical) updates fleet KPIs.",
        },
      ],
      validation: [
        "Verified idempotent PIN handoff preventing duplicate warehouse stock deductions during repeat taps.",
        "Tested weighted checklist scoring boundaries (<50 score or critical fault flag triggers CRITICAL status).",
        "Validated strict RBAC route isolation across operational roles and read-only executive dashboards.",
      ],
      metricsNote:
        "Production client names, customer PICs, and raw telemetry are redacted. Interactive sandbox runs 100% client-side dummy data.",
      screenshots: [
        {
          src: "/projects/sword-landing.jpg",
          caption: "Public & operational entry portal for SWORD fleet workflows",
          tag: "PORTAL",
        },
        {
          src: "/projects/sword-dashboard.jpg",
          caption: "Role-aware operational overview showing task status & health tiers",
          tag: "WEB OPS",
        },
        {
          src: "/projects/sword-scoring.jpg",
          caption: "Dynamic scoring thresholds configuration (HEALTHY / ATTENTION / CRITICAL)",
          tag: "SCORING",
        },
        {
          src: "/projects/sword-mobile.jpg",
          caption: "Mechanic mobile interface for QR check-in, work orders & PIN pickup",
          tag: "MOBILE",
        },
      ],
      externalUrl: "https://ump-sword.com",
      externalLabel: "ump-sword.com",
    },
    "02": {
      id: "02",
      subtitle: "Industrial Traction & Lithium Battery E-Catalog + CMS",
      scope: "CV. Mitra Anugrah Perkasa · Live B2B Production Website",
      architectureSummary:
        "B2B web catalog and lightweight CMS pairing structured technical spec tables (Voltage, Capacity, Cell Series) with direct WhatsApp B2B lead routing.",
      problem:
        "Industrial procurement buyers needed to compare heavy-equipment traction batteries (DIN/BS cells, Lithium Iron Phosphate, Chargers) cleanly on mobile and desktop without waiting for PDF brochures.",
      solution:
        "Structured product hierarchies, spec filters, and an admin CMS workflow for catalog updates, paired with pre-filled WhatsApp technical inquiry CTAs.",
      roles: [
        "B2B Buyer (Filter, Spec Compare, WhatsApp RFQ)",
        "Catalog Admin (CRUD Product Specs & Images)",
      ],
      flowSteps: [
        {
          actor: "1. B2B Prospect",
          action: "Filters by Application & Chemistry",
          detail: "Narrows down Traction Lead-Acid, Lithium-Ion, or Charger units.",
        },
        {
          actor: "2. Catalog Engine",
          action: "Renders Spec Matrix & Cell Variants",
          detail: "Displays voltage, Ah capacity, and forklift compatibility badges.",
        },
        {
          actor: "3. Lead Conversion",
          action: "Dispatches Pre-Filled WhatsApp RFQ",
          detail: "Transfers selected SKU model and capacity directly to sales engineering.",
        },
      ],
      validation: [
        "Responsive layout & visual regression tested across mobile (390px) and desktop (1366px) viewports.",
        "Black-Box UAT completed with client stakeholders prior to production launch.",
      ],
      metricsNote:
        "Live production website is active; use the Interactive Sandbox tab to test category filtering and responsive viewport previews safely.",
      externalUrl: "https://map-battery.com",
      externalLabel: "map-battery.com",
    },
    "03": {
      id: "03",
      subtitle: "Field Sales CRM, Deal Pipeline & GPS Geofencing Attendance",
      scope: "Independent Full-Stack Project · Dockerized Client-Server Monorepo",
      architectureSummary:
        "Containerized web application with PostgreSQL persistence, role-based access (Sales / Manager / Admin), GPS Haversine geofencing validation, and deal-stage revenue tracking.",
      problem:
        "Distributed field sales teams often log customer visits and daily attendance without location verification or structured CRM deal stages, making quota forecasting and leave approval slow for managers.",
      solution:
        "Built a Client-Server architecture enforcing server-side geofence distance calculations (`distance_from_office` / `is_outside_geofence` requiring photo + reason when off-site), live CRM pipeline stage transitions, and manager leave approvals.",
      roles: [
        "SALES REP (GPS Check-In/Out, Pipeline Update, Leave Request)",
        "MANAGER (Target Monitoring, Leave Approval, Off-Site Audit)",
        "ADMIN (Global Target Config & Office Radius Settings)",
      ],
      flowSteps: [
        {
          actor: "1. Sales Rep",
          action: "Triggers GPS Attendance Check-In",
          detail: "Measures distance to assigned office coordinate; flags outside-radius visits with mandatory reason & photo evidence.",
        },
        {
          actor: "2. Pipeline Engine",
          action: "Advances Deals (Prospect -> Negotiation -> Closing)",
          detail: "Recalculates closed revenue against monthly quota progress bar.",
        },
        {
          actor: "3. Manager Oversight",
          action: "Audits Off-Site Flags & Approves Leave",
          detail: "Reviews geofence exception reasons and approves/rejects pending leave requests.",
        },
      ],
      validation: [
        "Tested boundary conditions right inside (<=100m) vs outside (>100m) office radius to verify mandatory proof enforcement.",
        "Verified Docker Compose reproducible boot for database + API + React client.",
      ],
      metricsNote:
        "Interactive Sandbox runs client-side with dummy sales accounts so no backend cold-start delay occurs.",
      externalUrl: "https://github.com/wldnfzn/salestrack",
      externalLabel: "github.com/wldnfzn/salestrack",
    },
    "04": {
      id: "04",
      subtitle: "Industrial Material Handling Corporate Profile & Service Funnel",
      scope: "PT. United Multilift Perkasa · Digital Brand Modernization",
      architectureSummary:
        "Responsive B2B corporate front-end unified visually with the SWORD operational ecosystem to bridge corporate discovery with after-sales reliability.",
      problem:
        "Enterprise prospects evaluating forklift rentals, maintenance contracts, and unit sales needed cohesive proof of after-sales engineering maturity alongside clear service channels.",
      solution:
        "Aligned visual hierarchy, responsive fleet capability showcases, and B2B service routing with the digitalized SWORD inspection brand.",
      roles: [
        "Corporate Visitor / Procurement",
        "Service Request Intake",
      ],
      flowSteps: [
        {
          actor: "1. Enterprise Buyer",
          action: "Evaluates Fleet Capabilities & Contracts",
          detail: "Reviews Rental, Preventive Maintenance, Overhaul, and Unit Supply offerings.",
        },
        {
          actor: "2. Service Funnel",
          action: "Routes Unit Inquiry / Inspection Request",
          detail: "Captures unit count and contract type to hand off to operations & SWORD ticketing.",
        },
      ],
      validation: [
        "Validated mobile responsiveness, visual consistency with SWORD UI tokens, and lead-form field rules.",
      ],
      metricsNote:
        "Preview corporate capability switching and B2B service intake in the Sandbox tab.",
    },
  },
  ID: {
    "01": {
      id: "01",
      subtitle: "Sistem Enterprise Inspeksi Forklift, Work Order & Gudang Sparepart",
      scope: "PT. United Multilift Perkasa · Sistem Produksi Klien (Web & Mobile)",
      architectureSummary:
        "Portal RBAC 7 peran & aplikasi mobile lapangan di atas skema PostgreSQL relasional, snapshot JSONB tim inspeksi, dan penguncian stok sparepart atomik.",
      problem:
        "Inspeksi unit forklift lapangan, permintaan sparepart, dan tiket kerusakan sebelumnya tersebar di chat dan spreadsheet manual. Manajer tidak punya visibilitas kesehatan armada secara live, staf gudang berisiko memotong stok ganda tanpa verifikasi serah terima, dan mekanik butuh alur mobile yang sigap di lokasi klien.",
      solution:
        "Merancang kebutuhan SDLC end-to-end, batasan RBAC (7 peran), aturan skoring inspeksi 58-item berbasis QR unit, serta rantai distribusi sparepart berjenjang lewat persetujuan Manager (CCL) dan serah-terima PIN 4-digit dari Gudang (TCL).",
      roles: [
        "SALES (Input Tiket Kerusakan)",
        "MANAGER / CCL (Approval & Penugasan)",
        "MECHANIC / CCM (Scan QR, Ceklis & Ambil Part)",
        "TECH INVENTORY / TCL (Gudang PIN 4-Digit)",
        "GENERAL MANAGER & DIRECTOR (Monitoring Eksekutif)",
        "SUPER ADMIN (Konfigurasi Skoring & Master Data)",
      ],
      flowSteps: [
        {
          actor: "1. Sales / Penjadwal",
          action: "Membuat Tiket Kerusakan atau Jadwal PM",
          detail: "Meneruskan keluhan unit atau jadwal perawatan berkala ke antrean CCL.",
        },
        {
          actor: "2. Manager (CCL)",
          action: "Menugaskan Tim Mekanik & Menyetujui Sparepart",
          detail: "Mengubah status permintaan sparepart dari PENDING_CCL ke SUBMITTED.",
        },
        {
          actor: "3. Gudang (TCL)",
          action: "Menyiapkan Stok & Membuat PIN 4-Digit",
          detail: "Mengubah status ke READY disertai PIN verifikasi untuk mekanik.",
        },
        {
          actor: "4. Mekanik (CCM)",
          action: "Verifikasi PIN, Scan QR Unit & Isi Ceklis 58-Item",
          detail: "Potong stok otomatis berjalan tepat sekali saat serah-terima; skor kesehatan (>=80 Healthy, 50-79 Attention, <50 Critical) memperbarui KPI armada.",
        },
      ],
      validation: [
        "Menguji serah-terima PIN idempoten untuk mencegah pemotongan stok gudang ganda saat ketukan berulang.",
        "Menguji batas skoring ceklis berbobot (<50 atau temuan kritis otomatis memicu status CRITICAL).",
        "Memvalidasi isolasi rute RBAC antara peran operasional lapangan dan dashboard baca-saja eksekutif.",
      ],
      metricsNote:
        "Nama perusahaan klien asli, kontak PIC, dan data produksi disamarkan. Sandbox interaktif menggunakan 100% data dummy di sisi klien.",
      screenshots: [
        {
          src: "/projects/sword-landing.jpg",
          caption: "Portal masuk operasional & pengenalan alur kerja armada SWORD",
          tag: "PORTAL",
        },
        {
          src: "/projects/sword-dashboard.jpg",
          caption: "Ringkasan operasional berbasis peran menampilkan status tugas & tingkat kesehatan unit",
          tag: "WEB OPS",
        },
        {
          src: "/projects/sword-scoring.jpg",
          caption: "Konfigurasi dinamis ambang skor inspeksi (HEALTHY / ATTENTION / CRITICAL)",
          tag: "SKORING",
        },
        {
          src: "/projects/sword-mobile.jpg",
          caption: "Antarmuka mobile mekanik untuk check-in QR, work order & ambil part via PIN",
          tag: "MOBILE",
        },
      ],
      externalUrl: "https://ump-sword.com",
      externalLabel: "ump-sword.com",
    },
    "02": {
      id: "02",
      subtitle: "E-Catalog Baterai Traksi & Lithium Industri + CMS",
      scope: "CV. Mitra Anugrah Perkasa · Website Produksi B2B Aktif",
      architectureSummary:
        "Katalog web B2B dan CMS ringan yang memadukan tabel spesifikasi teknis terstruktur (Tegangan, Kapasitas, Seri Sel) dengan perutean prospek langsung ke WhatsApp.",
      problem:
        "Pembeli pengadaan industri perlu membandingkan baterai traksi alat berat (sel DIN/BS, Lithium Iron Phosphate, Charger) dengan rapi di HP maupun desktop tanpa harus mengunduh brosur PDF berulang kali.",
      solution:
        "Menyusun struktur kategori produk, filter spesifikasi, serta alur admin CMS untuk pembaruan katalog yang terhubung dengan CTA WhatsApp terisi otomatis.",
      roles: [
        "Pembeli B2B (Filter, Bandingkan Spek, RFQ WhatsApp)",
        "Admin Katalog (Kelola Data Produk & Foto)",
      ],
      flowSteps: [
        {
          actor: "1. Prospek B2B",
          action: "Menyaring Berdasarkan Aplikasi & Tipe Baterai",
          detail: "Memilih lini Traction Lead-Acid, Lithium-Ion, atau Charger Industri.",
        },
        {
          actor: "2. Mesin Katalog",
          action: "Menampilkan Matriks Spek & Varian Sel",
          detail: "Menyajikan voltase, kapasitas Ah, dan label kecocokan tipe forklift.",
        },
        {
          actor: "3. Konversi Prospek",
          action: "Mengirim Pesan RFQ WhatsApp Terisi Otomatis",
          detail: "Meneruskan model SKU terpilih langsung ke tim sales engineering.",
        },
      ],
      validation: [
        "Pengujian tata letak responsif dilakukan di layar mobile (390px) dan desktop (1366px).",
        "Black-Box UAT diselesaikan bersama pemangku kepentingan klien sebelum peluncuran.",
      ],
      metricsNote:
        "Website produksi aktif di internet; gunakan tab Sandbox Interaktif untuk mencoba filter kategori dan pratinjau ukuran layar.",
      externalUrl: "https://map-battery.com",
      externalLabel: "map-battery.com",
    },
    "03": {
      id: "03",
      subtitle: "CRM Penjualan Lapangan, Pipeline Deal & Absensi GPS Geofencing",
      scope: "Proyek Full-Stack Mandiri · Monorepo Client-Server dengan Docker",
      architectureSummary:
        "Aplikasi web tercontainerisasi dengan database PostgreSQL, kontrol akses berbasis peran (Sales / Manager / Admin), validasi geofencing GPS, dan pelacakan target pipeline.",
      problem:
        "Tim sales lapangan sering mencatat kunjungan dan absensi harian tanpa verifikasi lokasi atau tahapan deal CRM yang terukur, sehingga menyulitkan manajer memantau kuota dan menyetujui izin.",
      solution:
        "Membangun arsitektur Client-Server dengan perhitungan jarak GPS geofence di server (`distance_from_office` / `is_outside_geofence` wajib alasan & foto saat di luar radius), perpindahan tahap pipeline CRM, serta persetujuan cuti manajer.",
      roles: [
        "SALES REP (Absen GPS, Update Pipeline, Ajukan Izin/Cuti)",
        "MANAGER (Pantau Target, Approval Izin, Audit Lokasi Luar Radius)",
        "ADMIN (Pengaturan Target Global & Radius Kantor)",
      ],
      flowSteps: [
        {
          actor: "1. Sales Rep",
          action: "Melakukan Check-In Absensi GPS",
          detail: "Mengukur jarak ke koordinat kantor; kunjungan luar radius menandai status wajib alasan & foto bukti.",
        },
        {
          actor: "2. Mesin Pipeline",
          action: "Menggeser Tahap Deal (Prospect -> Negotiation -> Closing)",
          detail: "Memperbarui total nilai penutupan terhadap target bulanan secara langsung.",
        },
        {
          actor: "3. Pengawasan Manager",
          action: "Memeriksa Penanda Luar Radius & Menyetujui Izin",
          detail: "Meninjau alasan pengecualian geofence dan memproses pengajuan izin/cuti tim.",
        },
      ],
      validation: [
        "Menguji kondisi batas tepat di dalam radius (<=100m) vs di luar radius (>100m) untuk memverifikasi kewajiban bukti.",
        "Memverifikasi eksekusi Docker Compose yang konsisten untuk database, API, dan klien React.",
      ],
      metricsNote:
        "Sandbox Interaktif berjalan sepenuhnya di sisi klien dengan data dummy sehingga bebas jeda cold-start server.",
      externalUrl: "https://github.com/wldnfzn/salestrack",
      externalLabel: "github.com/wldnfzn/salestrack",
    },
    "04": {
      id: "04",
      subtitle: "Profil Perusahaan Material Handling & Alur Permintaan Layanan B2B",
      scope: "PT. United Multilift Perkasa · Modernisasi Identitas Digital",
      architectureSummary:
        "Antarmuka profil korporasi B2B responsif yang selaras secara visual dengan ekosistem operasional SWORD untuk menghubungkan penemuan layanan dengan kesiapan purna jual.",
      problem:
        "Calon klien korporasi yang mengevaluasi kontrak sewa forklift, perawatan berkala, dan pengadaan unit membutuhkan bukti kematangan sistem purna jual yang jelas dan jalur kontak B2B terstruktur.",
      solution:
        "Menyelaraskan hierarki informasi layanan armada, tampilan responsif, serta perutean permintaan layanan B2B yang terhubung dengan ekosistem inspeksi SWORD.",
      roles: [
        "Pengunjung Korporasi / Tim Pengadaan",
        "Penerimaan Permintaan Layanan",
      ],
      flowSteps: [
        {
          actor: "1. Pembeli Korporasi",
          action: "Meninjau Kapabilitas Armada & Kontrak",
          detail: "Mengevaluasi paket Rental, Preventive Maintenance, Overhaul, dan Pengadaan Unit.",
        },
        {
          actor: "2. Alur Permintaan",
          action: "Mengirim Permintaan Survei / Layanan",
          detail: "Menangkap jumlah unit dan tipe kontrak untuk diteruskan ke operasional & tiket SWORD.",
        },
      ],
      validation: [
        "Memvalidasi tampilan responsif mobile/desktop, konsistensi visual dengan SWORD, dan aturan validasi form prospek.",
      ],
      metricsNote:
        "Coba simulasi pengelompokan layanan dan alur intake kontrak B2B pada tab Sandbox Interaktif.",
    },
  },
};
