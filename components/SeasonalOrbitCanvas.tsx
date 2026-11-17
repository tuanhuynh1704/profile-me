"use client";

/**
 * SeasonalOrbitCanvas — lớp Three.js cho thiết kế khung "orbit tròn"
 * (V5: circular avatar, 2026-11-17).
 *
 * Một component cho cả 6 mùa; hạt 3D tuyệt đối không dùng id.
 * Ràng buộc an toàn giống V4: reduced-motion off, pause khi tab ẩn,
 * pixelRatio ≤ 2, ResizeObserver, dispose sạch, host clip tròn.
 */

import { useEffect, useRef } from "react";

export type SeasonalOrbitKind =
  | "winter"
  | "spring"
  | "tet"
  | "newyear"
  | "summer"
  | "autumn";

interface SeasonalOrbitCanvasProps {
  kind: SeasonalOrbitKind;
}

const X_LIMIT = 17;
const Y_TOP = 24;
const Y_BOTTOM = -25;
const rand = (min: number, max: number) => min + Math.random() * (max - min);

export default function SeasonalOrbitCanvas({ kind }: SeasonalOrbitCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const lowPower = isCoarse || window.innerWidth < 640;

    let disposed = false;
    let raf = 0;
    let running = true;
    let cleanup: (() => void) | null = null;

    const start = async () => {
      let THREE: typeof import("three");
      try {
        THREE = await import("three");
      } catch {
        return;
      }
      if (disposed || !hostRef.current) return;

      const currentHost = hostRef.current;
      const width = Math.max(1, currentHost.clientWidth);
      const height = Math.max(1, currentHost.clientHeight);

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        return;
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
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 220);
      camera.position.set(0, 0, 52);
      camera.lookAt(0, 0, 0);

      scene.add(new THREE.HemisphereLight(0xfff2e6, 0x12100e, 0.85));
      const key = new THREE.DirectionalLight(0xffffff, 1.1);
      key.position.set(6, 9, 10);
      scene.add(key);
      scene.add(new THREE.AmbientLight(0xfff6ea, 0.38));

      // ---------- Canvas textures ----------
      const makePetal = (inner: string, mid: string, rim: string) => {
        const c = document.createElement("canvas");
        c.width = c.height = 128;
        const ctx = c.getContext("2d");
        if (!ctx) throw new Error("2d unavailable");
        const g = ctx.createRadialGradient(64, 74, 6, 64, 68, 64);
        g.addColorStop(0, inner);
        g.addColorStop(0.45, mid);
        g.addColorStop(1, rim);
        ctx.beginPath();
        ctx.moveTo(64, 12);
        ctx.bezierCurveTo(64, 4, 52, 2, 44, 13);
        ctx.bezierCurveTo(27, 29, 17, 49, 22, 74);
        ctx.bezierCurveTo(28, 100, 44, 118, 64, 121);
        ctx.bezierCurveTo(84, 118, 100, 100, 106, 74);
        ctx.bezierCurveTo(111, 49, 101, 29, 84, 13);
        ctx.bezierCurveTo(76, 2, 64, 4, 64, 12);
        ctx.closePath();
        ctx.fillStyle = g;
        ctx.fill();
        ctx.strokeStyle = rim;
        ctx.globalAlpha = 0.55;
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.ellipse(49, 57, 11, 17, -0.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.fill();
        const t = new THREE.CanvasTexture(c);
        t.anisotropy = 4;
        return t;
      };

      const makeMaple = () => {
        const c = document.createElement("canvas");
        c.width = c.height = 128;
        const ctx = c.getContext("2d");
        if (!ctx) throw new Error("2d unavailable");
        const g = ctx.createLinearGradient(64, 8, 64, 122);
        g.addColorStop(0, "#FED7AA");
        g.addColorStop(0.35, "#FB923C");
        g.addColorStop(0.8, "#EA580C");
        g.addColorStop(1, "#9A3412");
        ctx.translate(64, 64);
        ctx.fillStyle = g;
        const lobe = (deg: number, len: number, w: number) => {
          ctx.save();
          ctx.rotate((deg * Math.PI) / 180);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(-w, len * 0.42);
          ctx.lineTo(-w * 0.42, len * 0.55);
          ctx.lineTo(-w * 0.75, len);
          ctx.lineTo(0, len * 0.78);
          ctx.lineTo(w * 0.75, len);
          ctx.lineTo(w * 0.42, len * 0.55);
          ctx.lineTo(w, len * 0.42);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        };
        [-66, -33, 0, 33, 66].forEach((d) => lobe(d, 54, 15));
        ctx.rotate(0);
        ctx.strokeStyle = "rgba(154, 52, 18, 0.65)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, 18);
        ctx.lineTo(0, -48);
        ctx.moveTo(0, 2);
        ctx.lineTo(-28, -16);
        ctx.moveTo(0, 2);
        ctx.lineTo(28, -16);
        ctx.stroke();
        const t = new THREE.CanvasTexture(c);
        t.anisotropy = 4;
        return t;
      };

      const makeSoftDot = (inner: string, mid: string) => {
        const c = document.createElement("canvas");
        c.width = c.height = 64;
        const ctx = c.getContext("2d");
        if (!ctx) throw new Error("2d unavailable");
        const g = ctx.createRadialGradient(32, 32, 1, 32, 32, 30);
        g.addColorStop(0, inner);
        g.addColorStop(0.4, mid);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 64, 64);
        return new THREE.CanvasTexture(c);
      };

      const makeStar = () => {
        const c = document.createElement("canvas");
        c.width = c.height = 64;
        const ctx = c.getContext("2d");
        if (!ctx) throw new Error("2d unavailable");
        const g = ctx.createRadialGradient(32, 32, 1, 32, 32, 30);
        g.addColorStop(0, "rgba(255, 251, 235, 1)");
        g.addColorStop(0.3, "rgba(253, 230, 138, 0.9)");
        g.addColorStop(1, "rgba(253, 230, 138, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 64, 64);
        ctx.strokeStyle = "rgba(255, 251, 235, 0.9)";
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(32, 4);
        ctx.lineTo(32, 60);
        ctx.moveTo(4, 32);
        ctx.lineTo(60, 32);
        ctx.stroke();
        return new THREE.CanvasTexture(c);
      };

      const sakuraTex = makePetal("#FFF0F6", "#F9A8D4", "#EC4899");
      const maiTex = makePetal("#FFFBEA", "#FDE047", "#F59E0B");
      const mapleTex = makeMaple();
      const snowTex = makeSoftDot("rgba(255,255,255,1)", "rgba(219, 234, 254, 0.85)");
      const pollenTex = makeSoftDot("rgba(255, 248, 220, 1)", "rgba(253, 230, 138, 0.9)");
      const seaTex = makeSoftDot("rgba(236, 254, 255, 1)", "rgba(103, 232, 249, 0.85)");
      const starTex = makeStar();

      const geoms: import("three").BufferGeometry[] = [];
      const mats: import("three").Material[] = [];

      // ---------- Build theo mùa ----------
      interface Faller {
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
      const fallers: Faller[] = [];

      const addPetals = (
        count: number,
        texture: import("three").CanvasTexture,
        geometry: import("three").PlaneGeometry
      ) => {
        const mat = new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true,
          opacity: 0.96,
          side: THREE.DoubleSide,
          roughness: 0.85,
          metalness: 0,
          depthWrite: false,
        });
        mats.push(mat);
        for (let i = 0; i < count; i += 1) {
          const mesh = new THREE.Mesh(geometry, mat);
          mesh.scale.setScalar(rand(0.72, 1.28));
          mesh.position.set(rand(-X_LIMIT, X_LIMIT), rand(Y_BOTTOM, Y_TOP), rand(-3, 3));
          mesh.rotation.set(rand(0, Math.PI * 2), rand(0, Math.PI * 2), rand(0, Math.PI * 2));
          scene.add(mesh);
          fallers.push({
            mesh,
            vy: -(2.0 + Math.random() * 1.7),
            baseX: mesh.position.x,
            swayAmp: rand(0.9, 2.3),
            swaySpeed: rand(0.45, 1.05),
            phase: rand(0, Math.PI * 2),
            rx: rand(-1.05, 1.05),
            ry: rand(-1.2, 1.2),
            rz: rand(-0.6, 0.6),
          });
        }
      };

      const addPoints = (config: {
        count: number;
        texture: import("three").CanvasTexture;
        color: number;
        size: number;
        blending: "normal" | "additive";
        opacity: number;
        drift: "down" | "up";
        speedMin: number;
        speedMax: number;
      }) => {
        const positions = new Float32Array(config.count * 3);
        const data: { vy: number; phase: number; baseX: number }[] = [];
        for (let i = 0; i < config.count; i += 1) {
          const x = rand(-X_LIMIT, X_LIMIT);
          positions[i * 3] = x;
          positions[i * 3 + 1] = rand(Y_BOTTOM, Y_TOP);
          positions[i * 3 + 2] = rand(-2.5, 2.5);
          data.push({
            vy: (config.drift === "down" ? -1 : 1) * rand(config.speedMin, config.speedMax),
            phase: rand(0, Math.PI * 2),
            baseX: x,
          });
        }
        const geom = new THREE.BufferGeometry();
        geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geoms.push(geom);
        const mat = new THREE.PointsMaterial({
          size: config.size,
          map: config.texture,
          color: config.color,
          transparent: true,
          opacity: config.opacity,
          depthWrite: false,
          blending:
            config.blending === "additive" ? THREE.AdditiveBlending : THREE.NormalBlending,
        });
        mats.push(mat);
        const points = new THREE.Points(geom, mat);
        scene.add(points);
        return { geom, data };
      };

      const low = lowPower;
      const petalGeo = new THREE.PlaneGeometry(1.15, 1.42);
      const mapleGeo = new THREE.PlaneGeometry(1.3, 1.3);
      geoms.push(petalGeo, mapleGeo);

      /** Hệ thống hạt "ambient drift" dùng chung cho snow/summer/newyear(+sparkle). */
      const drifters: { geom: import("three").BufferGeometry; data: { vy: number; phase: number; baseX: number }[] }[] = [];

      if (kind === "winter") {
        drifters.push(
          addPoints({ count: low ? 80 : 150, texture: snowTex, color: 0xffffff, size: 0.72, blending: "normal", opacity: 0.95, drift: "down", speedMin: 2.2, speedMax: 3.6 })
        );
        drifters.push(
          addPoints({ count: low ? 6 : 12, texture: starTex, color: 0xbfdbfe, size: 0.5, blending: "additive", opacity: 0.7, drift: "down", speedMin: 1.6, speedMax: 2.4 })
        );
      } else if (kind === "spring") {
        addPetals(low ? 14 : 26, sakuraTex, petalGeo);
        drifters.push(
          addPoints({ count: low ? 14 : 24, texture: pollenTex, color: 0xfde68a, size: 0.62, blending: "additive", opacity: 0.8, drift: "up", speedMin: 0.4, speedMax: 0.85 })
        );
      } else if (kind === "tet") {
        addPetals(low ? 14 : 26, maiTex, petalGeo);
        drifters.push(
          addPoints({ count: low ? 12 : 20, texture: pollenTex, color: 0xfca5a5, size: 0.55, blending: "additive", opacity: 0.85, drift: "up", speedMin: 0.45, speedMax: 0.95 })
        );
      } else if (kind === "autumn") {
        addPetals(low ? 14 : 28, mapleTex, mapleGeo);
      } else if (kind === "summer") {
        drifters.push(
          addPoints({ count: low ? 26 : 46, texture: seaTex, color: 0xa5f3fc, size: 0.66, blending: "additive", opacity: 0.8, drift: "up", speedMin: 0.55, speedMax: 1.15 })
        );
        drifters.push(
          addPoints({ count: low ? 8 : 14, texture: starTex, color: 0xfde047, size: 0.6, blending: "additive", opacity: 0.85, drift: "up", speedMin: 0.4, speedMax: 0.8 })
        );
      } else if (kind === "newyear") {
        drifters.push(
          addPoints({ count: low ? 12 : 22, texture: starTex, color: 0xfde68a, size: 0.72, blending: "additive", opacity: 0.9, drift: "up", speedMin: 0.3, speedMax: 0.6 })
        );
      }

      // ---------- Pháo hoa (newyear) ----------
      interface Spark {
        vx: number;
        vy: number;
        life: number;
        maxLife: number;
      }
      const fireworkPalette = [0xfde68a, 0xffffff, 0xfda4af, 0xc4b5fd, 0x86efac];
      const fireworks: {
        geom: import("three").BufferGeometry;
        points: import("three").Points;
        sparks: Spark[];
        origin: import("three").Vector3;
      }[] = [];

      const spawnFirework = () => {
        if (kind !== "newyear") return;
        const count = low ? 42 : 72;
        const positions = new Float32Array(count * 3);
        const origin = new THREE.Vector3(rand(-10, 10), rand(6, 16), rand(-1.5, 1.5));
        const sparks: Spark[] = [];
        for (let i = 0; i < count; i += 1) {
          positions[i * 3] = origin.x;
          positions[i * 3 + 1] = origin.y;
          positions[i * 3 + 2] = origin.z;
          const theta = rand(0, Math.PI * 2);
          const phi = Math.acos(rand(-1, 1));
          const speed = rand(4.4, 9.4);
          sparks.push({
            vx: Math.sin(phi) * Math.cos(theta) * speed,
            vy: Math.sin(phi) * Math.sin(theta) * speed * 0.82,
            life: 0,
            maxLife: rand(1.15, 1.75),
          });
        }
        const geom = new THREE.BufferGeometry();
        geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const color = fireworkPalette[Math.floor(Math.random() * fireworkPalette.length)];
        const mat = new THREE.PointsMaterial({
          size: 0.55,
          map: starTex,
          color,
          transparent: true,
          opacity: 1,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const points = new THREE.Points(geom, mat);
        scene.add(points);
        fireworks.push({ geom, points, sparks, origin });
      };

      let fireworkTimer = 0;

      // ---------- Resize / visibility ----------
      const resizeObserver = new ResizeObserver(() => {
        const w = Math.max(1, currentHost.clientWidth);
        const h = Math.max(1, currentHost.clientHeight);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      });
      resizeObserver.observe(currentHost);

      const onVisibilityChange = () => {
        if (document.hidden) {
          running = false;
          window.cancelAnimationFrame(raf);
        } else if (!running) {
          running = true;
          clock.getDelta();
          raf = window.requestAnimationFrame(frame);
        }
      };

      // ---------- Loop ----------
      const clock = new THREE.Clock();
      let elapsed = 0;

      const frame = () => {
        if (!running) return;
        raf = window.requestAnimationFrame(frame);
        const dt = Math.min(clock.getDelta(), 0.05);
        elapsed += dt;

        for (const f of fallers) {
          f.mesh.rotation.x += f.rx * dt;
          f.mesh.rotation.y += f.ry * dt;
          f.mesh.rotation.z += f.rz * dt;
          f.mesh.position.y += f.vy * dt;
          f.mesh.position.x = f.baseX + Math.sin(elapsed * f.swaySpeed + f.phase) * f.swayAmp;
          if (f.mesh.position.y < Y_BOTTOM) {
            f.mesh.position.y = Y_TOP + Math.random() * 5;
            f.baseX = rand(-X_LIMIT, X_LIMIT);
          }
        }

        for (const d of drifters) {
          const attr = d.geom.getAttribute("position") as import("three").BufferAttribute;
          const arr = attr.array as Float32Array;
          for (let i = 0; i < d.data.length; i += 1) {
            const p = d.data[i];
            arr[i * 3 + 1] += p.vy * dt;
            arr[i * 3] = p.baseX + Math.sin(elapsed * 0.4 + p.phase) * 0.95;
            if (p.vy > 0 && arr[i * 3 + 1] > Y_TOP) arr[i * 3 + 1] = Y_BOTTOM;
            if (p.vy < 0 && arr[i * 3 + 1] < Y_BOTTOM) arr[i * 3 + 1] = Y_TOP;
          }
          attr.needsUpdate = true;
        }

        if (kind === "newyear") {
          fireworkTimer -= dt;
          if (fireworkTimer <= 0) {
            spawnFirework();
            fireworkTimer = rand(1.1, 2.1);
          }
          for (let i = fireworks.length - 1; i >= 0; i -= 1) {
            const fw = fireworks[i];
            const attr = fw.geom.getAttribute("position") as import("three").BufferAttribute;
            const arr = attr.array as Float32Array;
            let alive = 0;
            for (let j = 0; j < fw.sparks.length; j += 1) {
              const s = fw.sparks[j];
              s.life += dt;
              if (s.life <= s.maxLife) {
                alive += 1;
                s.vy -= 3.1 * dt;
                arr[j * 3] += s.vx * dt;
                arr[j * 3 + 1] += s.vy * dt;
                arr[j * 3 + 2] += 0;
              }
            }
            attr.needsUpdate = true;
            const mat = fw.points.material as import("three").PointsMaterial;
            mat.opacity = Math.max(0, alive / fw.sparks.length);
            if (alive === 0) {
              scene.remove(fw.points);
              fw.geom.dispose();
              mat.dispose();
              fireworks.splice(i, 1);
            }
          }
        }

        renderer.render(scene, camera);
      };

      document.addEventListener("visibilitychange", onVisibilityChange);
      raf = window.requestAnimationFrame(frame);

      // ---------- Cleanup ----------
      cleanup = () => {
        running = false;
        window.cancelAnimationFrame(raf);
        resizeObserver.disconnect();
        document.removeEventListener("visibilitychange", onVisibilityChange);
        for (const fw of fireworks) {
          scene.remove(fw.points);
          fw.geom.dispose();
          (fw.points.material as import("three").PointsMaterial).dispose();
        }
        fireworks.length = 0;
        for (const g of geoms) if (g) g.dispose();
        for (const m of mats) m.dispose();
        sakuraTex.dispose();
        maiTex.dispose();
        mapleTex.dispose();
        snowTex.dispose();
        pollenTex.dispose();
        seaTex.dispose();
        starTex.dispose();
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
  }, [kind]);

  return <div ref={hostRef} className="seasonal-orbit-canvas-host" aria-hidden="true" />;
}
