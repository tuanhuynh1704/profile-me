"use client";

/**
 * SpringPetalCanvas - lop Three.js cho khung "Xuan Tu Nhien" (spring-natural)
 * (V4 Addendum, xem design/spring-natural-frame.md)
 *
 * Vai tro: CHI la lop trang tri (petals 3D + hat phan lap lanh).
 * SVG/HTML cua khung V1-V3 giu nguyen vai tro hoa tiet chinh.
 *
 * An toan:
 * - Khong render trong SSR (useEffect + dynamic import("three")).
 * - Khong ve gi khi prefers-reduced-motion: reduce.
 * - Pause khi tab an (visibilitychange), resume dung cho (khong nhay frame).
 * - pixelRatio <= 2; it particles + khong parallax khi pointer:coarse / man hep.
 * - ResizeObserver dong bo kich thuoc voi host.
 * - Dispose toan bo renderer/geometry/material/texture khi unmount.
 */

import { useEffect, useRef } from "react";

const PETAL_COUNT_DESKTOP = 24;
const PETAL_COUNT_LOW = 12;
const POLLEN_COUNT_DESKTOP = 36;
const POLLEN_COUNT_LOW = 18;

export default function SpringPetalCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const isSmallScreen = window.innerWidth < 640;
    const lowPower = isCoarse || isSmallScreen;

    let disposed = false;
    let raf = 0;
    let running = true;
    let cleanup: (() => void) | null = null;

    const start = async () => {
      let THREE: typeof import("three");
      try {
        THREE = await import("three");
      } catch {
        // three chua duoc cai (npm i three) hoac WebGL khong kha dung - bo qua lop 3D.
        return;
      }
      if (disposed || !hostRef.current) return;

      const currentHost = hostRef.current;
      const width = Math.max(1, currentHost.clientWidth);
      const height = Math.max(1, currentHost.clientHeight);

      // ---------- Renderer / Scene / Camera ----------
      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
      } catch {
        return; // WebGL unavailable
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);
      renderer.setClearColor(0x000000, 0);
      if ("outputColorSpace" in renderer && THREE.SRGBColorSpace) {
        renderer.outputColorSpace = THREE.SRGBColorSpace;
      }
      renderer.domElement.setAttribute("aria-hidden", "true");
      currentHost.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const aspect = width / height;
      const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 220);
      camera.position.set(0, 0, 55);
      camera.lookAt(0, 0, 0);

      // ---------- Lights ----------
      scene.add(new THREE.HemisphereLight(0xfde2ee, 0x141210, 0.8));
      const key = new THREE.DirectionalLight(0xffffff, 1.15);
      key.position.set(6, 8, 9);
      scene.add(key);
      scene.add(new THREE.AmbientLight(0xfff4e8, 0.35));

      // ---------- Canvas textures ----------
      const makePetalTexture = (): import("three").CanvasTexture => {
        const c = document.createElement("canvas");
        c.width = 128;
        c.height = 128;
        const ctx = c.getContext("2d");
        if (!ctx) throw new Error("2d context unavailable");

        const grad = ctx.createRadialGradient(64, 74, 6, 64, 66, 66);
        grad.addColorStop(0, "#FFF0F6");
        grad.addColorStop(0.45, "#F9A8D4");
        grad.addColorStop(0.85, "#F472B6");
        grad.addColorStop(1, "#EC4899");

        ctx.beginPath();
        ctx.moveTo(64, 12);
        ctx.bezierCurveTo(64, 4, 52, 2, 44, 13);
        ctx.bezierCurveTo(27, 29, 17, 49, 22, 74);
        ctx.bezierCurveTo(28, 100, 44, 118, 64, 121);
        ctx.bezierCurveTo(84, 118, 100, 100, 106, 74);
        ctx.bezierCurveTo(111, 49, 101, 29, 84, 13);
        ctx.bezierCurveTo(76, 2, 64, 4, 64, 12);
        ctx.closePath();

        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = "rgba(236, 72, 153, 0.55)";
        ctx.lineWidth = 5;
        ctx.stroke();

        // Gan canh giua
        ctx.beginPath();
        ctx.moveTo(64, 16);
        ctx.quadraticCurveTo(62, 66, 64, 112);
        ctx.strokeStyle = "rgba(236, 72, 153, 0.4)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Highlight mem
        ctx.beginPath();
        ctx.ellipse(49, 57, 12, 18, -0.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.32)";
        ctx.fill();

        const texture = new THREE.CanvasTexture(c);
        texture.anisotropy = 4;
        texture.needsUpdate = true;
        return texture;
      };

      const makeDotTexture = (): import("three").CanvasTexture => {
        const c = document.createElement("canvas");
        c.width = 64;
        c.height = 64;
        const ctx = c.getContext("2d");
        if (!ctx) throw new Error("2d context unavailable");
        const grad = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
        grad.addColorStop(0, "rgba(255, 247, 224, 1)");
        grad.addColorStop(0.35, "rgba(255, 233, 176, 0.9)");
        grad.addColorStop(1, "rgba(255, 233, 176, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
        const texture = new THREE.CanvasTexture(c);
        texture.needsUpdate = true;
        return texture;
      };

      const petalTexture = makePetalTexture();
      const dotTexture = makeDotTexture();

      const X_LIMIT = 19;
      const Y_TOP = 26;
      const Y_BOTTOM = -27;
      const rand = (min: number, max: number) => min + Math.random() * (max - min);

      // ---------- Petals (3D sakura) ----------
      const petalCount = lowPower ? PETAL_COUNT_LOW : PETAL_COUNT_DESKTOP;
      const petalGeometry = new THREE.PlaneGeometry(1.18, 1.45);
      const petalMaterial = new THREE.MeshStandardMaterial({
        map: petalTexture,
        transparent: true,
        opacity: 0.96,
        side: THREE.DoubleSide,
        roughness: 0.85,
        metalness: 0,
        depthWrite: false,
      });

      interface Petal {
        mesh: import("three").Mesh;
        vy: number;
        baseX: number;
        swayAmp: number;
        swaySpeed: number;
        phase: number;
        rx: number;
        ry: number;
        rz: number;
      }

      const petals: Petal[] = [];
      for (let i = 0; i < petalCount; i += 1) {
        const mesh = new THREE.Mesh(petalGeometry, petalMaterial);
        const scale = rand(0.75, 1.35);
        mesh.scale.setScalar(scale);
        mesh.position.set(rand(-X_LIMIT, X_LIMIT), rand(Y_BOTTOM, Y_TOP), rand(-3, 3));
        mesh.rotation.set(rand(0, Math.PI * 2), rand(0, Math.PI * 2), rand(0, Math.PI * 2));
        scene.add(mesh);
        petals.push({
          mesh,
          vy: -(2.15 + Math.random() * 1.75),
          baseX: mesh.position.x,
          swayAmp: rand(0.8, 2.4),
          swaySpeed: rand(0.45, 1.05),
          phase: rand(0, Math.PI * 2),
          rx: rand(-1.05, 1.05),
          ry: rand(-1.15, 1.15),
          rz: rand(-0.55, 0.55),
        });
      }

      // ---------- Pollen / sparkle points ----------
      const pollenCount = lowPower ? POLLEN_COUNT_LOW : POLLEN_COUNT_DESKTOP;
      const pollenPositions = new Float32Array(pollenCount * 3);
      const pollenData: { vy: number; phase: number; baseX: number }[] = [];
      for (let i = 0; i < pollenCount; i += 1) {
        const x = rand(-X_LIMIT, X_LIMIT);
        pollenPositions[i * 3] = x;
        pollenPositions[i * 3 + 1] = rand(Y_BOTTOM, Y_TOP);
        pollenPositions[i * 3 + 2] = rand(-2, 2);
        pollenData.push({ vy: rand(0.35, 0.8), phase: rand(0, Math.PI * 2), baseX: x });
      }
      const pollenGeometry = new THREE.BufferGeometry();
      pollenGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(pollenPositions, 3)
      );
      const pollenMaterial = new THREE.PointsMaterial({
        size: 0.68,
        map: dotTexture,
        color: 0xffe9b0,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const pollen = new THREE.Points(pollenGeometry, pollenMaterial);
      scene.add(pollen);

      // ---------- Parallax (disabled on coarse pointers) ----------
      let targetX = 0;
      let targetY = 0;
      let camX = 0;
      let camY = 0;

      const onPointerMove = (event: PointerEvent) => {
        const rect = currentHost.getBoundingClientRect();
        if (rect.width < 8 || rect.height < 8) return;
        const nx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
        const ny = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
        targetX = THREE.MathUtils.clamp(nx * 4.4, -2.2, 2.2);
        targetY = THREE.MathUtils.clamp(-ny * 2.8, -1.4, 1.4);
      };
      if (!isCoarse) {
        window.addEventListener("pointermove", onPointerMove, { passive: true });
      }

      // ---------- Resize ----------
      const resizeObserver = new ResizeObserver(() => {
        const w = Math.max(1, currentHost.clientWidth);
        const h = Math.max(1, currentHost.clientHeight);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      });
      resizeObserver.observe(currentHost);

      // ---------- Loop ----------
      const clock = new THREE.Clock();
      let elapsed = 0;

      const frame = () => {
        if (!running) return;
        raf = window.requestAnimationFrame(frame);

        const dt = Math.min(clock.getDelta(), 0.05);
        elapsed += dt;

        for (const p of petals) {
          p.mesh.rotation.x += p.rx * dt;
          p.mesh.rotation.y += p.ry * dt;
          p.mesh.rotation.z += p.rz * dt;
          p.mesh.position.y += p.vy * dt;
          p.mesh.position.x = p.baseX + Math.sin(elapsed * p.swaySpeed + p.phase) * p.swayAmp;
          if (p.mesh.position.y < Y_BOTTOM) {
            p.mesh.position.y = Y_TOP + Math.random() * 5;
            p.baseX = rand(-X_LIMIT, X_LIMIT);
          }
        }

        const attr = pollenGeometry.getAttribute("position") as import("three").BufferAttribute;
        const arr = attr.array as Float32Array;
        for (let i = 0; i < pollenData.length; i += 1) {
          const d = pollenData[i];
          arr[i * 3 + 1] += d.vy * dt;
          arr[i * 3] = d.baseX + Math.sin(elapsed * 0.35 + d.phase) * 0.9;
          if (arr[i * 3 + 1] > Y_TOP) {
            arr[i * 3 + 1] = Y_BOTTOM;
            d.baseX = rand(-X_LIMIT, X_LIMIT);
          }
        }
        attr.needsUpdate = true;

        camX += (targetX - camX) * 0.06;
        camY += (targetY - camY) * 0.06;
        camera.position.set(camX, camY, 55);
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      };

      const onVisibilityChange = () => {
        if (document.hidden) {
          running = false;
          window.cancelAnimationFrame(raf);
        } else if (!running) {
          running = true;
          clock.getDelta(); // reset delta de khong nhay khung hinh
          raf = window.requestAnimationFrame(frame);
        }
      };
      document.addEventListener("visibilitychange", onVisibilityChange);

      raf = window.requestAnimationFrame(frame);

      // ---------- Cleanup ----------
      cleanup = () => {
        running = false;
        window.cancelAnimationFrame(raf);
        resizeObserver.disconnect();
        document.removeEventListener("visibilitychange", onVisibilityChange);
        if (!isCoarse) window.removeEventListener("pointermove", onPointerMove);

        petalGeometry.dispose();
        petalMaterial.dispose();
        pollenGeometry.dispose();
        pollenMaterial.dispose();
        petalTexture.dispose();
        dotTexture.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
        if (renderer.domElement.parentNode === currentHost) {
          currentHost.removeChild(renderer.domElement);
        }
      };
    };

    void start();

    return () => {
      disposed = true;
      if (cleanup) cleanup();
    };
  }, []);

  return <div ref={hostRef} className="spring-petal-canvas-host" aria-hidden="true" />;
}
