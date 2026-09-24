"use client";

import { useEffect, useRef, type MutableRefObject } from "react";

type AsciiHandProps = {
  /** Path to the image in /public, e.g. "/left-hand.png" */
  src: string;
  /** Positioning / sizing classes for the wrapper */
  className?: string;
  /** Size of one ASCII cell in px (auto-scales down on small screens) */
  cell?: number;
  /** Characters from darkest to brightest */
  chars?: string;
  /** Set true if your hand image is dark on a light background */
  invert?: boolean;
  /** Radius (px) of the orange reveal around the cursor */
  radius?: number;
  /** 0 → 1 reveal progress, driven by GSAP ScrollTrigger from the parent */
  progressRef?: MutableRefObject<{ v: number }>;
  /** Which edge the reveal sweeps in from */
  from?: "left" | "right";
};

const ORANGE = "44, 83, 212";

// cheap deterministic hash -> 0..1
const hash = (x: number, y: number, t: number) => {
  let h = x * 374761393 + y * 668265263 + t * 2147483647;
  h = (h ^ (h >>> 13)) * 1274126177;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
};

export default function AsciiHand({
  src,
  className = "",
  cell = 11,
  chars = " .:-=+*#%@",
  invert = false,
  radius = 170,
  progressRef,
  from = "left",
}: AsciiHandProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let c = cell;
    let cols = 0;
    let rows = 0;
    let grid = new Float32Array(0);
    let thr = new Float32Array(0); // per-cell reveal threshold
    let base: HTMLCanvasElement | null = null; // baked dim ASCII layer
    let tmp: HTMLCanvasElement | null = null;
    let mask: HTMLCanvasElement | null = null;
    let maskCtx: CanvasRenderingContext2D | null = null;
    let maskData: ImageData | null = null;
    const frontier: number[] = [];
    let dpr = 1;
    let w = 0;
    let h = 0;
    let visible = true;

    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const img = new window.Image();
    img.src = src;

    const build = () => {
      if (!img.complete || !img.naturalWidth) return;
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      if (!w || !h) return;

      c = w < 420 ? cell * 0.65 : w < 800 ? cell * 0.8 : cell;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      cols = Math.max(1, Math.floor(w / c));
      rows = Math.max(1, Math.floor(h / c));

      const s = document.createElement("canvas");
      s.width = cols;
      s.height = rows;
      const sctx = s.getContext("2d", { willReadFrequently: true })!;
      const scale = Math.min(cols / img.naturalWidth, rows / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      sctx.drawImage(img, (cols - dw) / 2, (rows - dh) / 2, dw, dh);
      const data = sctx.getImageData(0, 0, cols, rows).data;

      grid = new Float32Array(cols * rows);
      thr = new Float32Array(cols * rows);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const idx = j * cols + i;
          const r = data[idx * 4];
          const g = data[idx * 4 + 1];
          const b = data[idx * 4 + 2];
          const a = data[idx * 4 + 3] / 255;
          let l = ((0.2126 * r + 0.7152 * g + 0.0722 * b) / 255) * a;
          if (invert) l = (1 - l) * a;
          grid[idx] = Math.min(1, Math.pow(l, 0.85) * 1.15);
          const axis = from === "right" ? 1 - i / cols : i / cols;
          thr[idx] = 0.55 * hash(i, j, 7) + 0.45 * axis;
        }
      }

      // bake dim ASCII layer once
      base = document.createElement("canvas");
      base.width = canvas.width;
      base.height = canvas.height;
      const bctx = base.getContext("2d")!;
      bctx.scale(dpr, dpr);
      bctx.font = `${c * 1.15}px ui-monospace, "SF Mono", Menlo, monospace`;
      bctx.textAlign = "center";
      bctx.textBaseline = "middle";
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const l = grid[j * cols + i];
          if (l < 0.06) continue;
          const ch = chars[Math.min(chars.length - 1, Math.floor(l * chars.length))];
          if (ch === " ") continue;
          bctx.fillStyle = `rgba(${ORANGE}, ${0.16 + l * 0.36})`;
          bctx.fillText(ch, i * c + c / 2, j * c + c / 2);
        }
      }

      // scratch layers for the scroll reveal
      tmp = document.createElement("canvas");
      tmp.width = canvas.width;
      tmp.height = canvas.height;
      mask = document.createElement("canvas");
      mask.width = cols;
      mask.height = rows;
      maskCtx = mask.getContext("2d")!;
      maskData = maskCtx.createImageData(cols, rows);
    };

    const frame = (time: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || !base || !tmp || !maskCtx || !maskData || !mask) return;

      const p = progressRef ? progressRef.current.v : 1;

      const k = reduceMotion ? 1 : 0.16;
      mouse.x += (mouse.tx - mouse.x) * k;
      mouse.y += (mouse.ty - mouse.y) * k;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (p <= 0.001) return;

      /* ── scroll reveal: noisy sweep with a bright orange leading edge ── */
      if (p < 1) {
        const lim = p * 1.03;
        const d = maskData.data;
        frontier.length = 0;
        for (let idx = 0; idx < thr.length; idx++) {
          const t = thr[idx];
          const on = t < lim;
          d[idx * 4 + 3] = on ? 255 : 0;
          if (on && t > lim - 0.05 && grid[idx] > 0.12) frontier.push(idx);
        }
        maskCtx.putImageData(maskData, 0, 0);

        const tctx = tmp.getContext("2d")!;
        tctx.setTransform(1, 0, 0, 1, 0, 0);
        tctx.globalCompositeOperation = "source-over";
        tctx.clearRect(0, 0, tmp.width, tmp.height);
        tctx.drawImage(base, 0, 0);
        tctx.globalCompositeOperation = "destination-in";
        tctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        tctx.imageSmoothingEnabled = false;
        tctx.drawImage(mask, 0, 0, cols * c, rows * c);
        tctx.globalCompositeOperation = "source-over";

        ctx.drawImage(tmp, 0, 0);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = `rgb(${ORANGE})`;
        const s = c * 0.82;
        for (const idx of frontier) {
          const i = idx % cols;
          const j = Math.floor(idx / cols);
          ctx.fillRect(i * c + (c - s) / 2, j * c + (c - s) / 2, s, s);
        }
        return;
      }

      ctx.drawImage(base, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      /* ── cursor reveal: orange pixel blocks around the pointer ── */
      const rect = wrap.getBoundingClientRect();
      const mx = mouse.x - rect.left;
      const my = mouse.y - rect.top;
      if (mx < -radius || my < -radius || mx > w + radius || my > h + radius) return;

      const tick = Math.floor(time / 140);
      const i0 = Math.max(0, Math.floor((mx - radius) / c));
      const i1 = Math.min(cols - 1, Math.ceil((mx + radius) / c));
      const j0 = Math.max(0, Math.floor((my - radius) / c));
      const j1 = Math.min(rows - 1, Math.ceil((my + radius) / c));

      ctx.fillStyle = `rgb(${ORANGE})`;
      for (let j = j0; j <= j1; j++) {
        for (let i = i0; i <= i1; i++) {
          const l = grid[j * cols + i];
          if (l < 0.12) continue;
          const cx = i * c + c / 2;
          const cy = j * c + c / 2;
          const dist = Math.hypot(cx - mx, cy - my);
          if (dist > radius) continue;
          const t = 1 - dist / radius;
          if (hash(i, j, tick) < t * 1.15 * (0.4 + l)) {
            const s = c * 0.82;
            ctx.fillRect(cx - s / 2, cy - s / 2, s, s);
          }
        }
      }
    };

    const onMove = (e: PointerEvent) => {
      if (mouse.tx === -9999) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };

    img.onload = build;
    build();
    const ro = new ResizeObserver(build);
    ro.observe(wrap);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(wrap);
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [src, cell, chars, invert, radius, progressRef, from]);

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}