"use client";

/**
 * ThreeSeasonalAvatarFrame — V5 "Orbit" (2026-11-17)
 * Khung portrait tròn: SVG motif mảnh nằm trên orbit + CSS ring conic/dashed
 * (biến thể theo mùa, xem globals.css mục "AVATAR TRÒN") + canvas Three.js hạt 3D.
 * SVG tĩnh (không nhúng logic), canvas dispose sạch khi đổi mùa.
 */

import SeasonalOrbitCanvas from "./SeasonalOrbitCanvas";
import type { SeasonalOrbitKind } from "./SeasonalOrbitCanvas";

export type SeasonalAvatarKind = SeasonalOrbitKind;

interface ThreeSeasonalAvatarFrameProps {
  season: SeasonalAvatarKind;
}

const ORBIT_R = 152;
const CX = 170;
const CY = 170;

function orbitTransform(angleDeg: number, radius = ORBIT_R) {
  return `rotate(${angleDeg} ${CX} ${CY}) translate(${CX} ${CY - radius})`;
}

/* ---------- Motif components (vẽ hướng lên, quay theo góc) ---------- */

function Snowflake({ stroke = "#EAF6FF" }: { stroke?: string }) {
  return (
    <g stroke={stroke} strokeWidth="1.7" strokeLinecap="round" fill="none">
      <line x1="0" y1="-9" x2="0" y2="9" />
      <line x1="-7.8" y1="-4.5" x2="7.8" y2="4.5" />
      <line x1="-7.8" y1="4.5" x2="7.8" y2="-4.5" />
      <path d="M-3.4 -6.2 L0 -3.6 L3.4 -6.2 M-3.4 6.2 L0 3.6 L3.4 6.2" />
      <path d="M-8.6 -1.4 L-6.2 -1 L-7.6 1.4 M8.6 1.4 L6.2 1 L7.6 -1.4" />
      <circle r="1.5" fill={stroke} stroke="none" />
    </g>
  );
}

function Sakura({ scale = 1 }: { scale?: number }) {
  const petals = [0, 72, 144, 216, 288];
  return (
    <g transform={`scale(${scale})`}>
      {petals.map((a) => (
        <ellipse
          key={a}
          rx="3.1"
          ry="5.2"
          cx="0"
          cy="-5"
          transform={`rotate(${a})`}
          fill="url(#orbitSakuraGrad)"
          stroke="#F472B6"
          strokeWidth="0.6"
          strokeOpacity="0.6"
        />
      ))}
      <circle r="1.9" fill="#FBBF24" />
      <circle r="0.8" fill="#F59E0B" />
    </g>
  );
}

function Mai({ scale = 1 }: { scale?: number }) {
  const petals = [0, 72, 144, 216, 288];
  return (
    <g transform={`scale(${scale})`}>
      {petals.map((a) => (
        <circle
          key={a}
          r="3.4"
          cx="0"
          cy="-4.2"
          transform={`rotate(${a})`}
          fill="url(#orbitMaiGrad)"
          stroke="#F59E0B"
          strokeWidth="0.5"
          strokeOpacity="0.7"
        />
      ))}
      <circle r="1.7" fill="#B45309" />
    </g>
  );
}

function Lantern() {
  return (
    <g>
      <rect x="-4" y="-9.4" width="8" height="2.1" rx="0.6" fill="#FDE047" stroke="#B45309" strokeWidth="0.4" />
      <ellipse rx="5.4" ry="6.4" fill="url(#orbitLanternGrad)" />
      <path d="M-3.2 -5.2 C -4.4 0 -4.4 0 -3.2 5.2 M0 -6.2 C 0 0 0 0 0 6.2 M3.2 -5.2 C 4.4 0 4.4 0 3.2 5.2" stroke="#991B1B" strokeWidth="0.7" fill="none" opacity="0.8" />
      <rect x="-4" y="7.3" width="8" height="2.1" rx="0.6" fill="#FDE047" stroke="#B45309" strokeWidth="0.4" />
      <line x1="0" y1="9.2" x2="0" y2="13" stroke="#FDE047" strokeWidth="1.1" />
      <circle cy="14.2" r="1.1" fill="#FDE047" />
    </g>
  );
}

function Firework({ tint = "#FDE68A" }: { tint?: string }) {
  const rays = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <g stroke={tint} strokeWidth="1.7" strokeLinecap="round">
      {rays.map((a) => (
        <line
          key={a}
          x1="0"
          y1="-3"
          x2="0"
          y2="-8.6"
          transform={`rotate(${a})`}
          opacity={a % 90 === 0 ? 1 : 0.75}
        />
      ))}
      <circle r="1.6" fill="#FFF7ED" stroke="none" />
    </g>
  );
}

function Sparkle({ scale = 1 }: { scale?: number }) {
  return (
    <path
      transform={`scale(${scale})`}
      d="M0 -5 L1.15 -1.15 L5 0 L1.15 1.15 L0 5 L-1.15 1.15 L-5 0 L-1.15 -1.15 Z"
      fill="url(#orbitStarGrad)"
    />
  );
}

function Starfish() {
  return (
    <g>
      <path
        d="M0 -8.2 L2 -2.8 L8.1 -2.6 L3.3 1.1 L5.1 7.1 L0 3.8 L-5.1 7.1 L-3.3 1.1 L-8.1 -2.6 L-2 -2.8 Z"
        fill="url(#orbitStarfishGrad)"
        stroke="#FB7185"
        strokeWidth="0.5"
        strokeOpacity="0.7"
      />
      <circle cx="0" cy="-0.4" r="0.9" fill="#FDA4AF" />
      <circle cx="-2.6" cy="2.2" r="0.7" fill="#FDA4AF" opacity="0.85" />
      <circle cx="2.6" cy="2.2" r="0.7" fill="#FDA4AF" opacity="0.85" />
    </g>
  );
}

function Bubble() {
  return (
    <g>
      <circle r="4.6" fill="rgba(165, 243, 252, 0.12)" stroke="#A5F3FC" strokeWidth="1.25" />
      <path d="M -2.6 -1.4 A 3 3 0 0 1 0.4 -3.4" stroke="#FFFFFF" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.85" />
    </g>
  );
}

function Shell() {
  return (
    <g>
      <path d="M-6 2 Q0 -7.4 6 2 Q0 6 -6 2 Z" fill="url(#orbitShellGrad)" stroke="#FCA5A5" strokeWidth="0.6" strokeOpacity="0.8" />
      <path d="M-3.6 1.2 Q0 -3.6 3.6 1.2 M-1.6 1.8 Q0 -2 1.6 1.8" stroke="#FCA5A5" strokeWidth="0.6" fill="none" opacity="0.8" />
    </g>
  );
}

function MapleLeaf({ scale = 1, tint }: { scale?: number; tint?: string }) {
  return (
    <path
      transform={`scale(${scale})`}
      d="M0 -7.4 L1.7 -2.9 L6.9 -4.9 L4.1 -0.8 L8.2 3 L2.4 3 L3.7 7.6 L0 4.8 L-3.7 7.6 L-2.4 3 L-8.2 3 L-4.1 -0.8 L-6.9 -4.9 L-1.7 -2.9 Z"
      fill={tint ?? "url(#orbitMapleGrad)"}
      stroke="#C2410C"
      strokeWidth="0.5"
      strokeOpacity="0.65"
    />
  );
}

function Acorn() {
  return (
    <g>
      <ellipse cy="2.2" rx="3.4" ry="3.6" fill="url(#orbitAcornGrad)" />
      <path d="M-4 -1.6 A4.4 2.6 0 0 1 4 -1.6 L3.4 0.6 A5.6 3 0 0 0 -3.4 0.6 Z" fill="#713F12" />
      <line x1="0" y1="-4.1" x2="0" y2="-6.4" stroke="#713F12" strokeWidth="1" strokeLinecap="round" />
    </g>
  );
}

/* ---------- Bộ motif theo mùa ---------- */

function WinterMotifs() {
  const flakes = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <>
      {flakes.map((a) => (
        <g key={`wf-${a}`} transform={orbitTransform(a)}>
          <Snowflake />
        </g>
      ))}
      {[22.5, 112.5, 202.5, 292.5].map((a) => (
        <g key={`ws-${a}`} transform={orbitTransform(a, 130)}>
          <Sparkle scale={0.9} />
        </g>
      ))}
    </>
  );
}

function SpringMotifs() {
  const blooms = [0, 60, 120, 180, 240, 300];
  return (
    <>
      {blooms.map((a) => (
        <g key={`sk-${a}`} transform={orbitTransform(a)}>
          <Sakura />
        </g>
      ))}
      {[30, 90, 150, 210, 270, 330].map((a) => (
        <g key={`ss-${a}`} transform={orbitTransform(a, 131)}>
          <Sparkle scale={0.85} />
        </g>
      ))}
    </>
  );
}

function TetMotifs() {
  const mai = [0, 60, 120, 180, 240, 300];
  const lanterns = [90, 210, 330];
  return (
    <>
      {mai.map((a) => (
        <g key={`ma-${a}`} transform={orbitTransform(a)}>
          <Mai />
        </g>
      ))}
      {lanterns.map((a) => (
        <g key={`ln-${a}`} transform={orbitTransform(a, 150)}>
          <Lantern />
        </g>
      ))}
      {[30, 150, 270].map((a) => (
        <g key={`ts-${a}`} transform={orbitTransform(a, 131)}>
          <Sparkle scale={0.9} />
        </g>
      ))}
    </>
  );
}

function NewYearMotifs() {
  const fireworks = [0, 72, 144, 216, 288];
  const tints = ["#FDE68A", "#FDA4AF", "#C4B5FD", "#86EFAC", "#FFFFFF"];
  return (
    <>
      {fireworks.map((a, i) => (
        <g key={`fw-${a}`} transform={orbitTransform(a)}>
          <Firework tint={tints[i % tints.length]} />
        </g>
      ))}
      {[36, 108, 180, 252, 324].map((a) => (
        <g key={`ns-${a}`} transform={orbitTransform(a, 131)}>
          <Sparkle scale={0.9} />
        </g>
      ))}
    </>
  );
}

function SummerMotifs() {
  return (
    <>
      {[0, 90, 180, 270].map((a) => (
        <g key={`sf-${a}`} transform={orbitTransform(a)}>
          <Starfish />
        </g>
      ))}
      {[50, 140, 230, 320].map((a) => (
        <g key={`bb-${a}`} transform={orbitTransform(a, 137)}>
          <Bubble />
        </g>
      ))}
      {[115, 290].map((a) => (
        <g key={`sh-${a}`} transform={orbitTransform(a, 150)}>
          <Shell />
        </g>
      ))}
    </>
  );
}

function AutumnMotifs() {
  const maples = [0, 52, 103, 154, 205, 257, 308];
  const tints = ["#FB923C", "#F97316", "#EA580C", "#FDBA74"];
  return (
    <>
      {maples.map((a, i) => (
        <g key={`mp-${a}`} transform={orbitTransform(a)}>
          <MapleLeaf scale={i % 3 === 1 ? 0.85 : 1} tint={tints[i % tints.length]} />
        </g>
      ))}
      {[130, 282].map((a) => (
        <g key={`ac-${a}`} transform={orbitTransform(a, 150)}>
          <Acorn />
        </g>
      ))}
      {[26, 231].map((a) => (
        <g key={`as-${a}`} transform={orbitTransform(a, 131)}>
          <Sparkle scale={0.8} />
        </g>
      ))}
    </>
  );
}

/* ---------- Component ---------- */

export default function ThreeSeasonalAvatarFrame({
  season,
}: ThreeSeasonalAvatarFrameProps) {
  const tone = `tone-${season}`;
  return (
    <div className={`wrapped-frame seasonal-orbit ${tone}`} aria-hidden="true">
      <svg
        className="seasonal-orbit-svg"
        viewBox="0 0 340 340"
        preserveAspectRatio="xMidYMid meet"
        role="presentation"
      >
        <defs>
          <radialGradient id="orbitSakuraGrad" cx="50%" cy="38%" r="62%">
            <stop offset="0%" stopColor="#FFF0F6" />
            <stop offset="45%" stopColor="#F9A8D4" />
            <stop offset="100%" stopColor="#EC4899" />
          </radialGradient>
          <radialGradient id="orbitMaiGrad" cx="50%" cy="38%" r="62%">
            <stop offset="0%" stopColor="#FFFBEA" />
            <stop offset="48%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#F59E0B" />
          </radialGradient>
          <linearGradient id="orbitLanternGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FCA5A5" />
            <stop offset="45%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
          <radialGradient id="orbitStarGrad" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#FFFDF4" />
            <stop offset="60%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </radialGradient>
          <radialGradient id="orbitStarfishGrad" cx="50%" cy="38%" r="60%">
            <stop offset="0%" stopColor="#FECDD3" />
            <stop offset="55%" stopColor="#FB7185" />
            <stop offset="100%" stopColor="#F43F5E" />
          </radialGradient>
          <linearGradient id="orbitShellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF7ED" />
            <stop offset="55%" stopColor="#FECACA" />
            <stop offset="100%" stopColor="#FCA5A5" />
          </linearGradient>
          <linearGradient id="orbitMapleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="45%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
          <linearGradient id="orbitAcornGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D6A25B" />
            <stop offset="100%" stopColor="#713F12" />
          </linearGradient>
        </defs>

        {season === "winter" && <WinterMotifs />}
        {season === "spring" && <SpringMotifs />}
        {season === "tet" && <TetMotifs />}
        {season === "newyear" && <NewYearMotifs />}
        {season === "summer" && <SummerMotifs />}
        {season === "autumn" && <AutumnMotifs />}
      </svg>
      <SeasonalOrbitCanvas kind={season} />
    </div>
  );
}
