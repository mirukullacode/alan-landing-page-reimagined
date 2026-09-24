"use client";

import { useEffect, useRef } from "react";

const W = 1200;
const H = 520;
const DRAIN = H + 90; // wave level when fully drained (surface sits below the text)

/** Closed sine-wave shape. Surface is centered on y = 0 and fills downward. */
function wavePath(period: number, amp: number) {
  const step = 10;
  const total = W + period * 2;
  let d = `M0 0`;
  for (let x = 0; x <= total; x += step) {
    d += ` L${x} ${(amp * Math.sin((2 * Math.PI * x) / period)).toFixed(2)}`;
  }
  d += ` L${total} ${H + 140} L0 ${H + 140} Z`;
  return d;
}

const BACK = { period: 520, amp: 24, speed: 45 };
const FRONT = { period: 360, amp: 18, speed: 95 };

const textProps = {
  x: W / 2,
  y: 478,
  textAnchor: "middle" as const,
  fontSize: 560,
  fontWeight: 600,
  letterSpacing: "-0.06em",
};

export default function OceanText404() {
  const svgRef = useRef<SVGSVGElement>(null);
  const backRef = useRef<SVGGElement>(null);
  const frontRef = useRef<SVGGElement>(null);

  const state = useRef({
    hover: false,
    running: false,
    cursorY: H / 2,
    level: DRAIN,
    energy: 0,
    phase: 0,
    lastX: 0,
    lastY: 0,
    last: 0,
    raf: 0,
    reduce: false,
  });

  useEffect(() => {
    const s = state.current;
    s.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => cancelAnimationFrame(s.raf);
  }, []);

  const tick = (now: number) => {
    const s = state.current;
    const dt = Math.min(0.05, (now - s.last) / 1000);
    s.last = now;

    if (!s.reduce) s.phase += dt;
    const target = s.hover ? s.cursorY : DRAIN;
    s.level += (target - s.level) * (1 - Math.pow(0.001, dt));
    s.energy *= Math.pow(0.08, dt);

    const k = 1 + s.energy * 1.1; // waves get taller when the cursor moves fast

    const backX = -BACK.period + ((s.phase * BACK.speed) % BACK.period);
    const frontX = -((s.phase * FRONT.speed) % FRONT.period);

    backRef.current?.setAttribute(
      "transform",
      `translate(${backX.toFixed(2)} ${(s.level + 16).toFixed(2)}) scale(1 ${k.toFixed(3)})`
    );
    frontRef.current?.setAttribute(
      "transform",
      `translate(${frontX.toFixed(2)} ${s.level.toFixed(2)}) scale(1 ${k.toFixed(3)})`
    );

    if (!s.hover && s.level > DRAIN - 2) {
      s.running = false; 
      return;
    }
    s.raf = requestAnimationFrame(tick);
  };

  const ensureRunning = () => {
    const s = state.current;
    if (s.running) return;
    s.running = true;
    s.last = performance.now();
    s.raf = requestAnimationFrame(tick);
  };

  const updatePointer = (e: React.PointerEvent) => {
    const s = state.current;
    const r = svgRef.current?.getBoundingClientRect();
    if (!r) return;
    const y = ((e.clientY - r.top) / r.height) * H;
    s.cursorY = Math.min(H, Math.max(0, y));
    const dist = Math.hypot(e.clientX - s.lastX, e.clientY - s.lastY);
    s.energy = Math.max(s.energy, Math.min(1.2, dist / 30));
    s.lastX = e.clientX;
    s.lastY = e.clientY;
  };

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      className="block h-auto w-[92vw] max-w-[1500px] select-none"
      role="img"
      aria-label="404"
    >
      <defs>
        <clipPath id="clip-404">
          <text {...textProps}>404</text>
        </clipPath>
        <linearGradient id="ocean-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4db2ff" />
          <stop offset="0.5" stopColor="#1f6cff" />
          <stop offset="1" stopColor="#0a3fd0" />
        </linearGradient>
      </defs>

      {/* Normal text: also the hover target */}
      <text
        {...textProps}
        fill="#f4f4f4"
        onPointerEnter={(e) => {
          state.current.hover = true;
          state.current.lastX = e.clientX;
          state.current.lastY = e.clientY;
          updatePointer(e);
          ensureRunning();
        }}
        onPointerMove={updatePointer}
        onPointerLeave={() => {
          state.current.hover = false;
          ensureRunning();
        }}
        onPointerCancel={() => {
          state.current.hover = false;
          ensureRunning();
        }}
      >
        404
      </text>

      <g clipPath="url(#clip-404)" pointerEvents="none">
        <g ref={backRef} transform={`translate(0 ${DRAIN})`}>
          <path d={wavePath(BACK.period, BACK.amp)} fill="#0a3cc4" opacity="0.9" />
        </g>
        <g ref={frontRef} transform={`translate(0 ${DRAIN})`}>
          <path
            d={wavePath(FRONT.period, FRONT.amp)}
            fill="url(#ocean-front)"
            // stroke="#"
            // strokeOpacity="0.75"
            // strokeWidth="2"
          />
        </g>
      </g>
    </svg>
  );
}