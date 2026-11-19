import { PropsWithChildren, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useAppContext } from "../context/AppContext";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  const { lang, isLoading } = useAppContext();
  const copy = PORTFOLIO_DATA[lang].hero;
  const rootRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState<0 | 1>(0);

  // Alternate primary/secondary role cleanly without ever hiding both lines
  useEffect(() => {
    if (isLoading) return;
    const timer = window.setInterval(() => {
      setRoleIndex((prev) => (prev === 0 ? 1 : 0));
    }, 3400);
    return () => window.clearInterval(timer);
  }, [isLoading, lang]);

  // Entrance stagger when site unlocks or language switches
  useEffect(() => {
    if (isLoading || !rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".landing-anim",
        { opacity: 0, y: 28, filter: "blur(5px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [isLoading, lang]);

  // Subtle slide-in whenever roleIndex flips
  useEffect(() => {
    if (isLoading || !rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".role-word-active",
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", stagger: 0.06 }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [roleIndex, lang, isLoading]);

  const primaryWord = roleIndex === 0 ? copy.rolePrimaryA : copy.rolePrimaryB;
  const secondaryWord = roleIndex === 0 ? copy.roleSecondaryA : copy.roleSecondaryB;

  return (
    <section className="landing-section" id="landingDiv" ref={rootRef}>
      <div className="landing-container" key={lang}>
        <div className="landing-intro">
          <h2 className="landing-anim">{copy.greeting}</h2>
          <h1 className="landing-anim">
            {copy.firstName}
            <br />
            <span>{copy.lastName}</span>
          </h1>
        </div>

        <div className="landing-info">
          <h3 className="landing-anim">{copy.prefix}</h3>
          <h2 className="landing-info-h2 landing-anim">
            <span key={`p-${lang}-${roleIndex}`} className="role-word-active">
              {primaryWord}
            </span>
          </h2>
          <h2 className="landing-h2-dual landing-anim">
            <span key={`s-${lang}-${roleIndex}`} className="role-word-active">
              {secondaryWord}
            </span>
          </h2>
        </div>
      </div>
      {children}
    </section>
  );
};

export default Landing;
