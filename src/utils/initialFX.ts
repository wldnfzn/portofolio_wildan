import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initialFX() {
  document.body.style.overflowY = "auto";
  const mainEl = document.getElementsByTagName("main")[0];
  if (mainEl) {
    mainEl.classList.add("main-active");
  }

  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 0.1,
  });

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.9,
      ease: "power2.out",
      delay: 0.1,
    }
  );

  ScrollTrigger.refresh();
}
