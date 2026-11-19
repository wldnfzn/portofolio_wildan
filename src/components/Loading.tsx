import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import "./styles/Loading.css";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading, lang } = useAppContext();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggeredRef = useRef(false);
  const copy = PORTFOLIO_DATA[lang].loading;

  useEffect(() => {
    if (percent >= 100 && !triggeredRef.current) {
      triggeredRef.current = true;
      const t1 = window.setTimeout(() => {
        setLoaded(true);
        const t2 = window.setTimeout(() => {
          setIsLoaded(true);
        }, 650);
        return () => window.clearTimeout(t2);
      }, 350);
      return () => window.clearTimeout(t1);
    }
  }, [percent]);

  useEffect(() => {
    if (!isLoaded) return;
    setClicked(true);
    let cancelled = false;
    import("../utils/initialFX").then((module) => {
      window.setTimeout(() => {
        if (cancelled) return;
        module.initialFX();
        setIsLoading(false);
      }, 800);
    });
    return () => {
      cancelled = true;
    };
  }, [isLoaded, setIsLoading]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  function handleSkip() {
    if (!clicked) {
      setIsLoaded(true);
    }
  }

  return (
    <>
      <div className="loading-header">
        <a href="#landingDiv" className="loader-title" data-cursor="disable">
          WILDAN.DEV
        </a>
        <div className={`loaderGame ${clicked ? "loader-out" : ""}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>

      <div className="loading-screen">
        <div className="loading-marquee" aria-hidden="true">
          <div className="loading-marquee-track">
            {[...copy.marquee, ...copy.marquee, ...copy.marquee].map((item, idx) => (
              <span key={idx}>{item}</span>
            ))}
          </div>
        </div>
        <div
          ref={wrapRef}
          className={`loading-wrap ${clicked ? "loading-clicked" : ""}`}
          onMouseMove={handleMouseMove}
          onClick={handleSkip}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleSkip();
          }}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded ? "loading-complete" : ""}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  {copy.loadingLabel} <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>{copy.welcomeLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
