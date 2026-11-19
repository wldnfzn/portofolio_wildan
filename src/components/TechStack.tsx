import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppContext } from "../context/AppContext";
import { PORTFOLIO_DATA, TECH_BADGES } from "../data/portfolioData";

function createBadgeTexture(label: string, bg: string, fg: string): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Sphere gradient base
  const grad = ctx.createRadialGradient(90, 80, 20, 128, 128, 150);
  grad.addColorStop(0, bg);
  grad.addColorStop(1, "#0b080c");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Subtle geometric border band
  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(128, 128, 96, 0, Math.PI * 2);
  ctx.stroke();

  // Badge label repeated cleanly for visibility across sphere rotation
  ctx.fillStyle = fg;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const fontSize = label.length > 8 ? 30 : label.length > 5 ? 36 : 44;
  ctx.font = `700 ${fontSize}px Geist, Inter, Arial, sans-serif`;
  ctx.fillText(label, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

interface SphereBody {
  mesh: THREE.Mesh;
  vel: THREE.Vector3;
  radius: number;
}

const TechStack = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { lang } = useAppContext();
  const copy = PORTFOLIO_DATA[lang].techstack;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 560;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 19);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight("#ffffff", 1.15);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight("#e9d5ff", 3.5);
    spotLight.position.set(12, 16, 18);
    scene.add(spotLight);

    const dirLight = new THREE.DirectionalLight("#c2a4ff", 1.8);
    dirLight.position.set(-10, -8, 10);
    scene.add(dirLight);

    const sphereGeo = new THREE.SphereGeometry(1, 28, 28);
    const textures = TECH_BADGES.map((b) => createBadgeTexture(b.name, b.bg, b.fg));
    const materials = textures.map(
      (tex) =>
        new THREE.MeshPhysicalMaterial({
          map: tex,
          emissive: new THREE.Color("#ffffff"),
          emissiveMap: tex,
          emissiveIntensity: 0.25,
          metalness: 0.35,
          roughness: 0.45,
          clearcoat: 0.35,
        })
    );

    const bodies: SphereBody[] = [];
    const total = 24;
    for (let i = 0; i < total; i++) {
      const radius = [0.78, 0.92, 1.05, 0.86, 1.12][i % 5];
      const mat = materials[i % materials.length];
      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.scale.setScalar(radius);

      const angle = (i / total) * Math.PI * 2;
      const spread = 3 + (i % 4) * 1.3;
      mesh.position.set(
        Math.cos(angle) * spread + (Math.random() - 0.5) * 1.5,
        Math.sin(angle) * (spread * 0.55) + (Math.random() - 0.5) * 1.2,
        (Math.random() - 0.5) * 3.5
      );
      mesh.rotation.set(0.15, -0.35 + (Math.random() - 0.5) * 0.4, 0);
      scene.add(mesh);

      bodies.push({
        mesh,
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.01
        ),
        radius,
      });
    }

    const pointerWorld = new THREE.Vector3(100, 100, 0);
    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      pointerWorld.set(nx * 9.5, ny * 4.8, 0);
    };
    const onPointerLeave = () => {
      pointerWorld.set(100, 100, 0);
    };

    container.addEventListener("mousemove", onPointerMove);
    container.addEventListener("mouseleave", onPointerLeave);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);
    ScrollTrigger.refresh();

    const diff = new THREE.Vector3();
    let rafId = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);

      // Pairwise collision + gentle center attraction + pointer repulsion
      for (let i = 0; i < bodies.length; i++) {
        const a = bodies[i];
        // Pull gently toward origin cluster
        a.vel.x += -a.mesh.position.x * 0.00095;
        a.vel.y += -a.mesh.position.y * 0.0014;
        a.vel.z += -a.mesh.position.z * 0.0012;

        // Pointer push
        diff.subVectors(a.mesh.position, pointerWorld);
        const pDist = diff.length();
        if (pDist < 3.4 && pDist > 0.001) {
          diff.normalize().multiplyScalar((3.4 - pDist) * 0.024);
          a.vel.add(diff);
        }

        // Sphere-sphere separation
        for (let j = i + 1; j < bodies.length; j++) {
          const b = bodies[j];
          diff.subVectors(b.mesh.position, a.mesh.position);
          const dist = diff.length();
          const minDist = a.radius + b.radius + 0.12;
          if (dist < minDist && dist > 0.001) {
            const push = (minDist - dist) * 0.032;
            diff.normalize().multiplyScalar(push);
            b.vel.add(diff);
            a.vel.sub(diff);
          }
        }

        // Damping & integration
        a.vel.multiplyScalar(0.955);
        a.mesh.position.add(a.vel);
        a.mesh.rotation.y += a.vel.x * 0.15 + 0.0025;
        a.mesh.rotation.x += a.vel.y * 0.15;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener("mousemove", onPointerMove);
      container.removeEventListener("mouseleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
      sphereGeo.dispose();
      textures.forEach((t) => t.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="techstack" id="techstack">
      <h2>{copy.heading}</h2>
      <p className="techstack-hint">{copy.hint}</p>
      <div className="tech-canvas" ref={mountRef}></div>
    </section>
  );
};

export default TechStack;
