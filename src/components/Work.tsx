import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward } from "./Icons";
import { lenisInstance } from "./Navbar";
import { Lang, useAppContext } from "../context/AppContext";
import { PORTFOLIO_DATA, ProjectEntry } from "../data/portfolioData";
import { ProjectModal } from "./ProjectModal";
import "./styles/Work.css";

gsap.registerPlugin(ScrollTrigger);

const ProjectVisualCard = ({
  project,
  lang,
  onOpenModal,
}: {
  project: ProjectEntry;
  lang: Lang;
  onOpenModal: (projectId: string, tab: "case-study" | "sandbox") => void;
}) => {
  return (
    <div
      className="work-visual-card"
      style={{ "--card-accent": project.accent } as React.CSSProperties}
    >
      <div className="work-visual-topbar">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="work-visual-tag">{project.visualType.toUpperCase()}</span>
      </div>
      <div className="work-visual-body">
        <p className="work-visual-summary">{project.summary}</p>
        <ul className="work-visual-list">
          {project.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </div>
      <div className="work-card-actions" data-cursor="disable">
        <button
          type="button"
          className="work-action-btn"
          onClick={() => onOpenModal(project.id, "case-study")}
        >
          {lang === "EN" ? "Case Study" : "Studi Kasus"}
        </button>
        <button
          type="button"
          className="work-action-btn work-action-primary"
          onClick={() => onOpenModal(project.id, "sandbox")}
        >
          {lang === "EN" ? "Try Sandbox" : "Coba Sandbox"}
        </button>
        {project.link && (
          <a
            className="work-link"
            href={project.link}
            target="_blank"
            rel="noreferrer"
            title={project.linkLabel || project.name}
          >
            <MdArrowOutward />
          </a>
        )}
      </div>
    </div>
  );
};

const Work = () => {
  const { lang, isLoading } = useAppContext();
  const copy = PORTFOLIO_DATA[lang].work;
  const sectionRef = useRef<HTMLElement>(null);
  const flexRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [activeCard, setActiveCard] = useState(0);
  const [modalState, setModalState] = useState<{
    id: string;
    tab: "case-study" | "sandbox";
  } | null>(null);

  const selectedProject = modalState
    ? copy.projects.find((p) => p.id === modalState.id) || null
    : null;

  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      if (window.innerWidth <= 1024) return;

      const flexEl = flexRef.current;
      const viewportEl = viewportRef.current;
      if (!flexEl || !viewportEl) return;

      const calcDistance = () => {
        const totalWidth = flexEl.scrollWidth;
        const visibleWidth = viewportEl.clientWidth;
        return Math.max(0, totalWidth - visibleWidth);
      };

      const tween = gsap.to(flexEl, {
        x: () => -calcDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${Math.max(400, calcDistance())}`,
          scrub: 0.75,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          id: "work-pin",
          onUpdate: (self) => {
            const total = copy.projects.length;
            const idx = Math.min(total - 1, Math.round(self.progress * (total - 1)));
            setActiveCard(idx);
          },
        },
      });

      stRef.current = tween.scrollTrigger ?? null;
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      stRef.current = null;
      ctx.revert();
    };
  }, [lang, isLoading, copy.projects.length]);

  const scrollToCard = (targetIndex: number) => {
    const clamped = Math.max(0, Math.min(copy.projects.length - 1, targetIndex));
    const st = stRef.current || ScrollTrigger.getById("work-pin");

    if (st && window.innerWidth > 1024) {
      const denom = Math.max(1, copy.projects.length - 1);
      const progress = clamped / denom;
      const targetY = st.start + (st.end - st.start) * progress;
      if (lenisInstance) {
        lenisInstance.scrollTo(targetY, { duration: 0.85 });
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
      setActiveCard(clamped);
    } else if (viewportRef.current) {
      const cards = viewportRef.current.querySelectorAll<HTMLElement>(".work-box");
      cards[clamped]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      setActiveCard(clamped);
    }
  };

  // Support two-finger horizontal swipe / Shift+Wheel on trackpad & mouse
  const handleWheel = (e: React.WheelEvent<HTMLElement>) => {
    if (window.innerWidth <= 1024) return;
    const horizontalDelta =
      Math.abs(e.deltaX) > Math.abs(e.deltaY)
        ? e.deltaX
        : e.shiftKey
        ? e.deltaY
        : 0;
    if (horizontalDelta !== 0) {
      const st = stRef.current || ScrollTrigger.getById("work-pin");
      const baseScroll = lenisInstance ? lenisInstance.targetScroll : window.scrollY;
      let targetY = baseScroll + horizontalDelta;
      if (st) {
        targetY = Math.max(st.start, Math.min(st.end, targetY));
      }
      if (lenisInstance) {
        lenisInstance.scrollTo(targetY, { immediate: true });
      } else {
        window.scrollTo(0, targetY);
      }
    }
  };

  // Support click-and-drag horizontal scrubbing inside the work track
  const dragState = useRef<{ active: boolean; startX: number; startScrollY: number }>({
    active: false,
    startX: 0,
    startScrollY: 0,
  });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (window.innerWidth <= 1024) return;
    if ((e.target as HTMLElement).closest("a, button")) return;
    dragState.current = {
      active: true,
      startX: e.clientX,
      startScrollY: lenisInstance ? lenisInstance.targetScroll : window.scrollY,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;
    const st = stRef.current || ScrollTrigger.getById("work-pin");
    const dx = dragState.current.startX - e.clientX;
    let targetY = dragState.current.startScrollY + dx;
    if (st) {
      targetY = Math.max(st.start, Math.min(st.end, targetY));
    }
    if (lenisInstance) {
      lenisInstance.scrollTo(targetY, { immediate: true });
    } else {
      window.scrollTo(0, targetY);
    }
  };

  const onPointerUp = () => {
    dragState.current.active = false;
  };

  return (
    <section
      className="work-section"
      id="work"
      ref={sectionRef}
      onWheel={handleWheel}
    >
      <div className="work-container section-container">
        <div className="work-header-row">
          <h2>
            {copy.headingLead}
            <span>{copy.headingAccent}</span>
          </h2>

          <div className="work-controls" data-cursor="disable">
            <span className="work-counter">
              0{activeCard + 1} / 0{copy.projects.length}
            </span>
            <button
              type="button"
              className="work-nav-btn"
              onClick={() => scrollToCard(activeCard - 1)}
              disabled={activeCard === 0}
              aria-label="Previous project"
            >
              &#8592;
            </button>
            <button
              type="button"
              className="work-nav-btn"
              onClick={() => scrollToCard(activeCard + 1)}
              disabled={activeCard === copy.projects.length - 1}
              aria-label="Next project"
            >
              &#8594;
            </button>
          </div>
        </div>

        <div
          className="work-viewport"
          ref={viewportRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <div className="work-flex" ref={flexRef}>
            {copy.projects.map((project) => (
              <article className="work-box" key={project.id}>
                <div className="work-info">
                  <div className="work-title">
                    <h3>{project.id}</h3>
                    <div>
                      <h4>{project.name}</h4>
                      <p>{project.category}</p>
                    </div>
                  </div>
                  <h4>{copy.toolsLabel}</h4>
                  <p>{project.tools}</p>
                </div>
                <div className="work-image">
                  <div className="work-image-in">
                    <ProjectVisualCard
                      project={project}
                      lang={lang}
                      onOpenModal={(id, tab) => setModalState({ id, tab })}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <ProjectModal
        project={selectedProject}
        initialTab={modalState?.tab}
        onClose={() => setModalState(null)}
      />
    </section>
  );
};

export default Work;
