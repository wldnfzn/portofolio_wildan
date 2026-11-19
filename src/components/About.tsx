import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppContext } from "../context/AppContext";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import "./styles/About.css";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { lang } = useAppContext();
  const copy = PORTFOLIO_DATA[lang].about;
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-section",
            start: "top 72%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="about-me">
        <div className="about-profile-row about-reveal">
          <div className="about-avatar-wrap">
            <img src="/profile.jpg" alt="Wildan Fauzan" className="about-avatar" />
          </div>
          <div className="about-meta">
            <span className="about-badge">{copy.badge}</span>
            <h3 className="title">{copy.title}</h3>
          </div>
        </div>

        <h4 className="about-headline about-reveal">{copy.headline}</h4>
        <p className="para about-reveal">{copy.summary}</p>

        <div className="about-edu-card about-reveal">
          <span className="about-edu-label">{copy.educationLabel}</span>
          <div className="about-edu-main">
            <strong>{copy.educationTitle}</strong>
            <span>{copy.educationPeriod}</span>
          </div>
          <small>{copy.locationLabel}</small>
        </div>
      </div>
    </section>
  );
};

export default About;
