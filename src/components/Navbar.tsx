import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { useAppContext } from "../context/AppContext";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

export let lenisInstance: Lenis | null = null;

const Navbar = () => {
  const { lang, setLang, isLoading } = useAppContext();
  const copy = PORTFOLIO_DATA[lang].nav;

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });
    lenisInstance = lenis;

    if (isLoading) {
      lenis.stop();
    } else {
      lenis.start();
    }

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(tick);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  useEffect(() => {
    if (!lenisInstance) return;
    if (isLoading) {
      lenisInstance.stop();
    } else {
      lenisInstance.start();
      ScrollTrigger.refresh();
    }
  }, [isLoading]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId) as HTMLElement | null;
    if (!target) return;
    if (lenisInstance) {
      lenisInstance.scrollTo(target, { duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="header">
        <a
          href="#landingDiv"
          onClick={(e) => handleNavClick(e, "#landingDiv")}
          className="navbar-title"
          data-cursor="disable"
        >
          WILDAN.DEV
        </a>

        <a
          href="mailto:wildanfauzan266@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          wildanfauzan266@gmail.com
        </a>

        <nav className="navbar-right">
          <ul>
            <li>
              <a href="#about" onClick={(e) => handleNavClick(e, "#about")}>
                <HoverLinks text={copy.about} />
              </a>
            </li>
            <li>
              <a href="#whatido" onClick={(e) => handleNavClick(e, "#whatido")}>
                <HoverLinks text={copy.whatIDo} />
              </a>
            </li>
            <li>
              <a href="#career" onClick={(e) => handleNavClick(e, "#career")}>
                <HoverLinks text={copy.career} />
              </a>
            </li>
            <li>
              <a href="#work" onClick={(e) => handleNavClick(e, "#work")}>
                <HoverLinks text={copy.work} />
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
                <HoverLinks text={copy.contact} />
              </a>
            </li>
          </ul>

          <div className="lang-switcher" data-cursor="disable" aria-label="Language Switcher">
            <button
              type="button"
              className={`lang-btn ${lang === "EN" ? "active" : ""}`}
              onClick={() => setLang("EN")}
            >
              EN
            </button>
            <span className="lang-divider">/</span>
            <button
              type="button"
              className={`lang-btn ${lang === "ID" ? "active" : ""}`}
              onClick={() => setLang("ID")}
            >
              ID
            </button>
          </div>
        </nav>
      </header>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
