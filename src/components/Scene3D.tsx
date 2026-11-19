import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Scene3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 13.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Lighting matching MoncyDev's purple/lavender rim aesthetic
    const ambient = new THREE.AmbientLight("#d8b4fe", 0.65);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight("#c2a4ff", 2.2);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight("#a855f7", 5.5, 22);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight("#60a5fa", 3.2, 20);
    fillLight.position.set(4, 2, 4);
    scene.add(fillLight);

    // Master Group driven by scroll & mouse
    const rigGroup = new THREE.Group();
    scene.add(rigGroup);

    const coreGroup = new THREE.Group();
    rigGroup.add(coreGroup);

    // Central System Core
    const coreGeo = new THREE.IcosahedronGeometry(1.35, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#2e1065"),
      emissive: new THREE.Color("#7c3aed"),
      emissiveIntensity: 0.45,
      metalness: 0.75,
      roughness: 0.2,
      clearcoat: 1,
      transparent: true,
      opacity: 0.88,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    const wireGeo = new THREE.IcosahedronGeometry(1.52, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#c2a4ff"),
      wireframe: true,
      transparent: true,
      opacity: 0.42,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    // Three orbital rings
    const ringConfigs = [
      { radius: 2.35, tube: 0.025, rot: [Math.PI / 3, 0.3, 0], color: "#c2a4ff" },
      { radius: 2.85, tube: 0.02, rot: [-Math.PI / 4, 0.7, 0.4], color: "#7f40ff" },
      { radius: 3.35, tube: 0.015, rot: [Math.PI / 2.2, -0.4, 0.2], color: "#93c5fd" },
    ];
    const rings: THREE.Mesh[] = [];
    ringConfigs.forEach((cfg) => {
      const rGeo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 120);
      const rMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(cfg.color),
        emissive: new THREE.Color(cfg.color),
        emissiveIntensity: 0.65,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.8,
      });
      const ring = new THREE.Mesh(rGeo, rMat);
      ring.rotation.set(cfg.rot[0], cfg.rot[1], cfg.rot[2]);
      coreGroup.add(ring);
      rings.push(ring);
    });

    // Orbiting modular architecture nodes (representing DB, API, UI, Mobile, Docker, RBAC, QA, SDLC)
    const nodeGroup = new THREE.Group();
    coreGroup.add(nodeGroup);
    const nodeMeshes: Array<{ mesh: THREE.Mesh; angle: number; radius: number; yOffset: number; speed: number }> = [];
    const nodeGeo = new THREE.BoxGeometry(0.32, 0.32, 0.32);

    for (let i = 0; i < 8; i++) {
      const mat = new THREE.MeshPhysicalMaterial({
        color: i % 2 === 0 ? "#c2a4ff" : "#93c5fd",
        emissive: i % 2 === 0 ? "#7c3aed" : "#2563eb",
        emissiveIntensity: 0.55,
        metalness: 0.6,
        roughness: 0.25,
      });
      const mesh = new THREE.Mesh(nodeGeo, mat);
      const angle = (i / 8) * Math.PI * 2;
      const radius = 2.4 + (i % 3) * 0.45;
      const yOffset = ((i % 2 === 0 ? 1 : -1) * (0.4 + (i % 3) * 0.35));
      mesh.position.set(Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius);
      nodeGroup.add(mesh);
      nodeMeshes.push({ mesh, angle, radius, yOffset, speed: 0.35 + (i % 3) * 0.12 });
    }

    // Subtle floating star/data particles
    const starCount = 120;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 14;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: "#d8b4fe",
      size: 0.045,
      transparent: true,
      opacity: 0.55,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Mouse parallax tracking
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ScrollTrigger choreography mimicking MoncyDev's 3D character movement
    const ctx = gsap.context(() => {
      if (window.innerWidth > 1024) {
        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: ".landing-section",
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        tl1
          .to(rigGroup.position, { x: -2.2, y: -0.1, z: 0.5, duration: 1 }, 0)
          .to(rigGroup.rotation, { y: Math.PI * 0.45, duration: 1 }, 0);

        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: ".about-section",
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        tl2
          .to(rigGroup.position, { x: -2.4, y: 0.25, z: -1.5, duration: 1 }, 0)
          .to(rigGroup.scale, { x: 0.82, y: 0.82, z: 0.82, duration: 1 }, 0);

        const tl3 = gsap.timeline({
          scrollTrigger: {
            trigger: ".whatIDO",
            start: "top center",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        tl3
          .to(rigGroup.position, { y: 4.5, duration: 1 }, 0)
          .to(container, { opacity: 0, duration: 0.6 }, 0.3);
      }
    });

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      coreMesh.rotation.y = t * 0.22;
      coreMesh.rotation.x = Math.sin(t * 0.3) * 0.18;
      wireMesh.rotation.y = -t * 0.16;
      wireMesh.rotation.z = t * 0.12;

      rings[0].rotation.z = t * 0.25;
      rings[1].rotation.x = -Math.PI / 4 + Math.sin(t * 0.4) * 0.15;
      rings[1].rotation.z = -t * 0.18;
      rings[2].rotation.y = t * 0.15;

      nodeMeshes.forEach((n) => {
        const a = n.angle + t * n.speed;
        n.mesh.position.set(
          Math.cos(a) * n.radius,
          n.yOffset + Math.sin(t * 1.4 + n.angle) * 0.22,
          Math.sin(a) * n.radius
        );
        n.mesh.rotation.x = t * 0.8;
        n.mesh.rotation.y = t * 0.6;
      });

      stars.rotation.y = t * 0.03;

      // Smooth mouse follow
      coreGroup.rotation.y += (mouse.x * 0.38 - coreGroup.rotation.y) * 0.04;
      coreGroup.rotation.x += (-mouse.y * 0.22 - coreGroup.rotation.x) * 0.04;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      ctx.revert();
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      nodeGeo.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="character-model" ref={containerRef}>
      <div className="character-rim"></div>
    </div>
  );
};

export default Scene3D;
