import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward } from "./Icons";
import { useAppContext } from "../context/AppContext";
import { PORTFOLIO_DATA, ProjectEntry } from "../data/portfolioData";
import "./styles/Work.css";

gsap.registerPlugin(ScrollTrigger);

const ProjectVisualCard = ({ project }: { project: ProjectEntry }) => {
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
      {project.link && (
        <a
          className="work-link"
          href={project.link}
          target="_blank"
          rel="noreferrer"
          data-cursor="disable"
          title={project.linkLabel || project.name}
        >
          <MdArrowOutward />
        </a>
      )}
    </div>
  );
};

const Work = () => {
  const { lang } = useAppContext();
  const copy = PORTFOLIO_DATA[lang].work;
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.innerWidth <= 1024) return;

      const flexEl = document.querySelector<HTMLElement>(".work-flex");
      const containerEl = document.querySelector<HTMLElement>(".work-container");
      if (!flexEl || !containerEl) return;

      const calcDistance = () => {
        const boxes = flexEl.querySelectorAll<HTMLElement>(".work-box");
        if (boxes.length === 0) return 0;
        const totalWidth = flexEl.scrollWidth;
        const visibleWidth = containerEl.clientWidth;
        return Math.max(0, totalWidth - visibleWidth + 80);
      };

      gsap.to(flexEl, {
        x: () => -calcDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: () => `+=${calcDistance()}`,
          scrub: 0.9,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          id: "work-pin",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section className="work-section" id="work" ref={sectionRef}>
      <div className="work-container section-container">
        <h2>
          {copy.headingLead}
          <span>{copy.headingAccent}</span>
        </h2>

        <div className="work-flex">
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
                  <ProjectVisualCard project={project} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
