import { useEffect } from "react";
import { FaGithub, FaInstagram, FaLinkedinIn, MdOutlineEmail, TbNotes } from "./Icons";
import HoverLinks from "./HoverLinks";
import { useAppContext } from "../context/AppContext";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import "./styles/SocialIcons.css";

const SocialIcons = () => {
  const { lang } = useAppContext();
  const navCopy = PORTFOLIO_DATA[lang].nav;

  useEffect(() => {
    const social = document.getElementById("social");
    if (!social) return;

    const cleanups: Array<() => void> = [];

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement | null;
      if (!link) return;

      let mouseX = elem.offsetWidth / 2;
      let mouseY = elem.offsetHeight / 2;
      let currentX = mouseX;
      let currentY = mouseY;
      let rafId = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.14;
        currentY += (mouseY - currentY) * 0.14;
        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);
        rafId = requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      const onMouseLeave = () => {
        mouseX = elem.offsetWidth / 2;
        mouseY = elem.offsetHeight / 2;
      };

      elem.addEventListener("mousemove", onMouseMove);
      elem.addEventListener("mouseleave", onMouseLeave);
      rafId = requestAnimationFrame(updatePosition);

      cleanups.push(() => {
        cancelAnimationFrame(rafId);
        elem.removeEventListener("mousemove", onMouseMove);
        elem.removeEventListener("mouseleave", onMouseLeave);
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a
            href="https://github.com/wldnfzn"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/wildan-fauzan-02056a275/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a
            href="https://www.instagram.com/musicsociety.utb/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </span>
        <span>
          <a href="mailto:wildanfauzan266@gmail.com" aria-label="Email">
            <MdOutlineEmail />
          </a>
        </span>
      </div>

      <a
        className="resume-button"
        href={navCopy.resumeFile}
        target="_blank"
        rel="noreferrer"
      >
        <HoverLinks text={navCopy.resumeLabel} />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
