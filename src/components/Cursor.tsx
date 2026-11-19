import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./styles/Cursor.css";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let hover = false;
    let rafId = 0;
    const mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cursorPos = { x: mousePos.x, y: mousePos.y };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    const loop = () => {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.set(cursor, { x: cursorPos.x, y: cursorPos.y });
      }
      rafId = requestAnimationFrame(loop);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest("[data-cursor]") as HTMLElement | null;
      if (!target) return;
      const mode = target.dataset.cursor;
      const rect = target.getBoundingClientRect();

      if (mode === "icons") {
        cursor.classList.add("cursor-icons");
        cursor.classList.remove("cursor-disable");
        gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.12 });
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
        hover = true;
      } else if (mode === "disable") {
        cursor.classList.add("cursor-disable");
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest("[data-cursor]");
      if (target) {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
