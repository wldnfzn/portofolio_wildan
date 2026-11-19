import { lazy, Suspense, useEffect, useState } from "react";
import { AppProvider } from "./context/AppContext";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import SocialIcons from "./components/SocialIcons";
import Scene3D from "./components/Scene3D";
import Landing from "./components/Landing";
import About from "./components/About";
import WhatIDo from "./components/WhatIDo";
import Career from "./components/Career";
import Work from "./components/Work";
import EventGallery from "./components/EventGallery";
import Contact from "./components/Contact";
import "./App.css";

const TechStack = lazy(() => import("./components/TechStack"));

const AppContent = () => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopView(window.innerWidth > 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && <Scene3D />}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && <Scene3D />}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            <EventGallery />
            <Suspense fallback={<div className="techstack-loading">Loading 3D Stack...</div>}>
              <TechStack />
            </Suspense>
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
