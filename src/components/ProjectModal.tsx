import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAppContext } from "../context/AppContext";
import { ProjectEntry } from "../data/portfolioData";
import { PROJECT_CASE_STUDIES } from "../data/projectCaseStudies";
import { lenisInstance } from "./Navbar";
import { SwordSandbox } from "./sandboxes/SwordSandbox";
import { SalesTrackSandbox } from "./sandboxes/SalesTrackSandbox";
import { MapBatterySandbox, UmpProfileSandbox } from "./sandboxes/CorporateSandboxes";
import "./styles/ProjectModal.css";

interface ProjectModalProps {
  project: ProjectEntry | null;
  initialTab?: "case-study" | "sandbox";
  onClose: () => void;
}

const MODAL_LABELS = {
  EN: {
    tabStudy: "System Analysis & Case Study",
    tabSandbox: "Interactive Demo (Sandbox)",
    sandboxBanner: "SANDBOX DEMO (DUMMY DATA) — Safe client-side simulation, no production records exposed.",
    problem: "Business Problem",
    solution: "SDLC & Architecture Solution",
    flowTitle: "System Workflow & Architecture Diagram",
    rbacTitle: "RBAC Roles & Scope",
    validationTitle: "Testing & Verification",
    screensTitle: "Sanitized Production UI Previews",
    closeLabel: "Close modal",
  },
  ID: {
    tabStudy: "Analisis Sistem & Studi Kasus",
    tabSandbox: "Demo Interaktif (Sandbox)",
    sandboxBanner: "DEMO SANDBOX (DATA DUMMY) — Simulasi sisi klien yang aman tanpa mengekspos data produksi.",
    problem: "Masalah Bisnis",
    solution: "Solusi SDLC & Arsitektur",
    flowTitle: "Diagram Alur Kerja & Arsitektur Sistem",
    rbacTitle: "Pembagian Peran (RBAC)",
    validationTitle: "Pengujian & Verifikasi",
    screensTitle: "Pratinjau Antarmuka (Data Sensitif Disaring)",
    closeLabel: "Tutup modal",
  },
};

export const ProjectModal = ({
  project,
  initialTab = "case-study",
  onClose,
}: ProjectModalProps) => {
  const { lang, toggleLang } = useAppContext();
  const [activeTab, setActiveTab] = useState<"case-study" | "sandbox">(initialTab);
  const [zoomedShot, setZoomedShot] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(initialTab);
    setZoomedShot(null);
  }, [project, initialTab]);

  useEffect(() => {
    if (!project) return;
    lenisInstance?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomedShot) {
          setZoomedShot(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      lenisInstance?.start();
    };
  }, [project, onClose, zoomedShot]);

  if (!project) return null;

  const t = MODAL_LABELS[lang];
  const study = PROJECT_CASE_STUDIES[lang][project.id];

  const renderSandbox = () => {
    switch (project.visualType) {
      case "sword":
        return <SwordSandbox lang={lang} />;
      case "salestrack":
        return <SalesTrackSandbox lang={lang} />;
      case "map":
        return <MapBatterySandbox lang={lang} />;
      case "ump-profile":
        return <UmpProfileSandbox lang={lang} />;
    }
  };

  return createPortal(
    <div
      className="pm-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pm-title"
      data-cursor="disable"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="pm-dialog"
        style={{ "--pm-accent": project.accent } as React.CSSProperties}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="pm-header">
          <div className="pm-title-group">
            <span className="pm-project-num">
              {project.id} · {project.category}
            </span>
            <h3 id="pm-title">{project.name}</h3>
            {study && <p className="pm-subtitle">{study.subtitle}</p>}
          </div>

          <div className="pm-header-actions">
            {study?.externalUrl && (
              <a
                href={study.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="pm-ext-link"
              >
                {study.externalLabel || "Visit"} ↗
              </a>
            )}
            <button
              type="button"
              className="pm-lang-btn"
              onClick={toggleLang}
              aria-label="Toggle language"
            >
              {lang}
            </button>
            <button
              type="button"
              className="pm-close-btn"
              onClick={onClose}
              aria-label={t.closeLabel}
            >
              ×
            </button>
          </div>
        </header>

        {/* Primary Mode Tabs */}
        <div className="pm-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "case-study"}
            className={`pm-tab ${activeTab === "case-study" ? "active" : ""}`}
            onClick={() => setActiveTab("case-study")}
          >
            {t.tabStudy}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "sandbox"}
            className={`pm-tab ${activeTab === "sandbox" ? "active" : ""}`}
            onClick={() => setActiveTab("sandbox")}
          >
            {t.tabSandbox}
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="pm-body">
          {activeTab === "case-study" && study && (
            <div className="pm-study-wrap">
              <div className="pm-meta-banner">
                <span>{study.scope}</span>
                <span className="pm-stack-tag">{project.tools}</span>
              </div>

              <div className="pm-grid-2">
                <section className="pm-box">
                  <h4>{t.problem}</h4>
                  <p>{study.problem}</p>
                </section>
                <section className="pm-box">
                  <h4>{t.solution}</h4>
                  <p>{study.solution}</p>
                  <p className="pm-arch-note">{study.architectureSummary}</p>
                </section>
              </div>

              {/* System Workflow SVG Diagram */}
              <section className="pm-box">
                <h4>{t.flowTitle}</h4>
                <div className="pm-flow-diagram">
                  {study.flowSteps.map((step, idx) => (
                    <div key={idx} className="pm-flow-item">
                      <div className="pm-flow-card">
                        <span className="pm-flow-actor">{step.actor}</span>
                        <strong>{step.action}</strong>
                        <p>{step.detail}</p>
                      </div>
                      {idx < study.flowSteps.length - 1 && (
                        <svg
                          className="pm-flow-arrow"
                          width="28"
                          height="24"
                          viewBox="0 0 28 24"
                          aria-hidden="true"
                        >
                          <path
                            d="M2 12H24M24 12L17 5M24 12L17 19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <div className="pm-grid-2">
                <section className="pm-box">
                  <h4>{t.rbacTitle}</h4>
                  <div className="pm-chip-list">
                    {study.roles.map((r, i) => (
                      <span key={i} className="pm-chip">
                        {r}
                      </span>
                    ))}
                  </div>
                </section>
                <section className="pm-box">
                  <h4>{t.validationTitle}</h4>
                  <ul className="pm-val-list">
                    {study.validation.map((v, i) => (
                      <li key={i}>{v}</li>
                    ))}
                  </ul>
                </section>
              </div>

              {study.screenshots && study.screenshots.length > 0 && (
                <section className="pm-box">
                  <h4>{t.screensTitle}</h4>
                  <div className="pm-screens-grid">
                    {study.screenshots.map((shot) => (
                      <button
                        key={shot.src}
                        type="button"
                        className="pm-shot-card"
                        onClick={() => setZoomedShot(shot.src)}
                      >
                        <img src={shot.src} alt={shot.caption} loading="lazy" />
                        <div className="pm-shot-meta">
                          <span className="pm-shot-tag">{shot.tag}</span>
                          <span>{shot.caption}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              )}

              <p className="pm-disclaimer">{study.metricsNote}</p>
            </div>
          )}

          {activeTab === "sandbox" && (
            <div className="pm-sandbox-wrap">
              <div className="pm-sandbox-banner">
                <span className="pm-dot-live" />
                <span>{t.sandboxBanner}</span>
              </div>
              {renderSandbox()}
            </div>
          )}
        </div>

        {/* Image Zoom Overlay */}
        {zoomedShot && (
          <div
            className="pm-zoom-overlay"
            onClick={() => setZoomedShot(null)}
            role="presentation"
          >
            <img src={zoomedShot} alt="Enlarged UI preview" />
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
