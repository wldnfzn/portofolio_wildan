import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppContext } from "../context/AppContext";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import "./styles/Career.css";

gsap.registerPlugin(ScrollTrigger);

const Career = () => {
  const { lang } = useAppContext();
  const copy = PORTFOLIO_DATA[lang].career;
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const careerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".career-section",
          start: "top 65%",
          end: "bottom 75%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      careerTimeline
        .fromTo(
          ".career-timeline",
          { maxHeight: "8%", opacity: 0.4 },
          { maxHeight: "100%", opacity: 1, duration: 0.8 },
          0
        )
        .fromTo(
          ".career-info-box",
          { opacity: 0.15, y: 20 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.5 },
          0
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section className="career-section section-container" id="career" ref={sectionRef}>
      <div className="career-container">
        <h2>
          {copy.headingLine1}
          <span>{copy.headingAccent}</span>
          <br />
          {copy.headingLine2}
        </h2>

        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          {copy.items.map((item, idx) => (
            <div className="career-info-box" key={idx}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{item.role}</h4>
                  <h5>{item.company}</h5>
                </div>
                <h3>{item.period}</h3>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Career;
