"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import {
  FRAME_COUNT,
  progressToFrame,
  TEXT_BLOCKS,
  LAYER_LABELS,
  LABEL_WINDOW,
  STAGE_COLORS,
} from "@/lib/heroConfig";

interface ManifestData {
  count: number;
  width: number;
  height: number;
  ext: string;
  colors?: {
    first?: {
      top?: string;
      bottom?: string;
      left?: string;
      right?: string;
    };
    last?: {
      top?: string;
      bottom?: string;
      left?: string;
      right?: string;
    };
  };
}

interface FitTransform {
  dx: number;
  dy: number;
  drawWidth: number;
  drawHeight: number;
  stageWidth: number;
  stageHeight: number;
  isPortrait: boolean;
  isWiderThan16by9: boolean;
  isTallerThan16by9: boolean;
}

const NATURAL_WIDTH = 1280;
const NATURAL_HEIGHT = 720;
const IMG_ASPECT = NATURAL_WIDTH / NATURAL_HEIGHT; // 16:9 = 1.7777778

function clamp(v: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, v));
}

export function computeFitTransform(
  stageWidth: number,
  stageHeight: number
): FitTransform {
  if (stageWidth <= 0 || stageHeight <= 0) {
    return {
      dx: 0,
      dy: 0,
      drawWidth: NATURAL_WIDTH,
      drawHeight: NATURAL_HEIGHT,
      stageWidth: NATURAL_WIDTH,
      stageHeight: NATURAL_HEIGHT,
      isPortrait: false,
      isWiderThan16by9: false,
      isTallerThan16by9: false,
    };
  }

  const stageAspect = stageWidth / stageHeight;
  const isPortrait = stageAspect < 1.05 || stageWidth < 768;

  if (isPortrait) {
    // Portrait / taller mobile & tablet portrait:
    // Fit by width, scale x1.15 with horizontal focus at x ≈ 0.57 (visible range ≈ 0.14–1.0)
    // Place image in upper ~60% of the pin below the header
    const upperHeight = stageHeight * 0.61;
    let drawWidth = stageWidth * 1.15;
    let drawHeight = drawWidth / IMG_ASPECT;

    // Ensure vertical fit inside the upper ~61% region
    if (drawHeight > upperHeight * 0.96) {
      drawHeight = upperHeight * 0.96;
      drawWidth = drawHeight * IMG_ASPECT;
    }

    // Focus at normalized x = 0.57 so x in [0.14, 0.99] stays uncropped
    const dx = stageWidth * 0.5 - 0.568 * drawWidth;
    const dy = Math.max(4, (upperHeight - drawHeight) * 0.5);

    return {
      dx,
      dy,
      drawWidth,
      drawHeight,
      stageWidth,
      stageHeight,
      isPortrait: true,
      isWiderThan16by9: false,
      isTallerThan16by9: true,
    };
  }

  // Landscape / desktop: ALWAYS contain the full frame (never crop)
  const diff = stageAspect - IMG_ASPECT;
  if (diff > 0.01) {
    // Wider than 16:9 -> fit by height, side bars filled with STAGE_COLORS gradient
    const drawHeight = stageHeight;
    const drawWidth = drawHeight * IMG_ASPECT;
    const dx = (stageWidth - drawWidth) / 2;
    const dy = 0;
    return {
      dx,
      dy,
      drawWidth,
      drawHeight,
      stageWidth,
      stageHeight,
      isPortrait: false,
      isWiderThan16by9: true,
      isTallerThan16by9: false,
    };
  } else if (diff < -0.01) {
    // Landscape but slightly taller than 16:9 (e.g. 16:10 1440x900) -> contain by width
    const drawWidth = stageWidth;
    const drawHeight = drawWidth / IMG_ASPECT;
    const dx = 0;
    const dy = (stageHeight - drawHeight) / 2;
    return {
      dx,
      dy,
      drawWidth,
      drawHeight,
      stageWidth,
      stageHeight,
      isPortrait: false,
      isWiderThan16by9: false,
      isTallerThan16by9: true,
    };
  } else {
    // Exactly 16:9 -> fills stage
    return {
      dx: 0,
      dy: 0,
      drawWidth: stageWidth,
      drawHeight: stageHeight,
      stageWidth,
      stageHeight,
      isPortrait: false,
      isWiderThan16by9: false,
      isTallerThan16by9: false,
    };
  }
}

function computeBlockOpacityAndY(
  p: number,
  a: number,
  b: number,
  stay?: boolean
): { opacity: number; y: number; visible: boolean } {
  // Special handling for intro block at very start (a === 0)
  if (a === 0) {
    if (p > b + 0.01) return { opacity: 0, y: -10, visible: false };
    const fadeOutStart = b - 0.025;
    if (p <= fadeOutStart) return { opacity: 1, y: 0, visible: true };
    const t = clamp((p - fadeOutStart) / (b - fadeOutStart), 0, 1);
    return { opacity: 1 - t, y: -10 * t, visible: 1 - t > 0.01 };
  }

  // Special handling for final CTA block (stay === true)
  if (stay) {
    if (p < a - 0.005) return { opacity: 0, y: 12, visible: false };
    const fadeInEnd = Math.min(0.92, a + 0.02);
    if (p >= fadeInEnd) return { opacity: 1, y: 0, visible: true };
    const t = clamp((p - a) / (fadeInEnd - a), 0, 1);
    return { opacity: t, y: 12 * (1 - t), visible: t > 0.01 };
  }

  // Standard intermediate blocks
  if (p < a - 0.005 || p > b + 0.005) {
    return { opacity: 0, y: p < a ? 12 : -10, visible: false };
  }

  const ramp = Math.min(0.022, (b - a) * 0.25);
  const fadeInEnd = a + ramp;
  const fadeOutStart = b - ramp;

  if (p < fadeInEnd) {
    const t = clamp((p - a) / ramp, 0, 1);
    return { opacity: t, y: 12 * (1 - t), visible: t > 0.01 };
  }
  if (p > fadeOutStart) {
    const t = clamp((p - fadeOutStart) / ramp, 0, 1);
    return { opacity: 1 - t, y: -10 * t, visible: 1 - t > 0.01 };
  }
  return { opacity: 1, y: 0, visible: true };
}

export default function HeroScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const lastDrawnFrameRef = useRef<number>(-1);

  const [manifest, setManifest] = useState<ManifestData>({
    count: FRAME_COUNT,
    width: NATURAL_WIDTH,
    height: NATURAL_HEIGHT,
    ext: "webp",
  });
  const [loadedCount, setLoadedCount] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0); // 0-based (0..299)
  const [fit, setFit] = useState<FitTransform>(() =>
    computeFitTransform(1440, 828)
  );
  const [calibrateMode, setCalibrateMode] = useState(false);
  const [hoverCoord, setHoverCoord] = useState<{ x: number; y: number } | null>(
    null
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    mass: 0.35,
  });

  // Check ?calibrate=1
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setCalibrateMode(params.get("calibrate") === "1");
    }
  }, []);

  // Load manifest.json
  useEffect(() => {
    fetch("/images/house-sequence/manifest.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: ManifestData | null) => {
        if (data && data.count) {
          setManifest(data);
        }
      })
      .catch(() => {
        // Fallback to default manifest state
      });
  }, []);

  const getFrameSrc = useCallback(
    (oneBasedIndex: number) => {
      const padded = String(oneBasedIndex).padStart(3, "0");
      return `/images/house-sequence/frame-${padded}.${manifest.ext || "webp"}`;
    },
    [manifest.ext]
  );

  // Measure sticky stage and recompute contain-fit transform on resize
  const updateStageLayout = useCallback(() => {
    const stageEl = stageRef.current;
    if (!stageEl) return;
    const rect = stageEl.getBoundingClientRect();
    const nextFit = computeFitTransform(rect.width, rect.height);
    setFit(nextFit);
    lastDrawnFrameRef.current = -1; // Force canvas redraw
  }, []);

  useEffect(() => {
    updateStageLayout();
    window.addEventListener("resize", updateStageLayout);
    return () => window.removeEventListener("resize", updateStageLayout);
  }, [updateStageLayout]);

  // Draw specific 0-based frame index onto canvas
  const drawFrame = useCallback(
    (zeroBasedIdx: number, currentFit: FitTransform) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const oneBased = clamp(zeroBasedIdx + 1, 1, manifest.count);
      let img = imagesRef.current[oneBased];

      // If target frame isn't loaded yet, find nearest loaded frame
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let offset = 1; offset < manifest.count; offset++) {
          const prev = oneBased - offset;
          const next = oneBased + offset;
          if (
            prev >= 1 &&
            imagesRef.current[prev]?.complete &&
            (imagesRef.current[prev]?.naturalWidth ?? 0) > 0
          ) {
            img = imagesRef.current[prev];
            break;
          }
          if (
            next <= manifest.count &&
            imagesRef.current[next]?.complete &&
            (imagesRef.current[next]?.naturalWidth ?? 0) > 0
          ) {
            img = imagesRef.current[next];
            break;
          }
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.max(1, Math.round(currentFit.drawWidth * dpr));
      const targetH = Math.max(1, Math.round(currentFit.drawHeight * dpr));

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, currentFit.drawWidth, currentFit.drawHeight);
      ctx.drawImage(img, 0, 0, currentFit.drawWidth, currentFit.drawHeight);
    },
    [manifest.count]
  );

  // Preload all 300 frames progressively (priority keyframes first, then full sequence)
  useEffect(() => {
    const total = manifest.count || FRAME_COUNT;
    let mounted = true;
    let count = 0;

    const loadSingleFrame = (idx: number): Promise<void> => {
      return new Promise((resolve) => {
        if (imagesRef.current[idx]?.complete) {
          resolve();
          return;
        }
        const img = new Image();
        img.decoding = "async";
        img.src = getFrameSrc(idx);
        img.onload = () => {
          if (!mounted) return;
          imagesRef.current[idx] = img;
          count++;
          setLoadedCount(count);
          if (idx === 1 || Math.abs(idx - 1 - currentFrameIndex) <= 2) {
            lastDrawnFrameRef.current = -1;
          }
          resolve();
        };
        img.onerror = () => {
          resolve();
        };
      });
    };

    // Load frame 1 and key anchor frames first for instant interactive scrubbing
    const priorityFrames = [1, 25, 60, 100, 110, 150, 180, 220, 245, 270, 300];
    Promise.all(priorityFrames.map((f) => loadSingleFrame(f))).then(() => {
      if (!mounted) return;
      // Load remaining frames in small concurrent batches
      let nextIdx = 1;
      const concurrency = 12;
      const worker = async () => {
        while (mounted && nextIdx <= total) {
          const current = nextIdx++;
          await loadSingleFrame(current);
        }
      };
      for (let i = 0; i < concurrency; i++) {
        worker();
      }
    });

    return () => {
      mounted = false;
    };
  }, [manifest.count, getFrameSrc]);

  // Animation loop synced with smoothProgress
  useEffect(() => {
    let rafId: number;

    const tick = () => {
      const p = clamp(smoothProgress.get(), 0, 1);
      const fractionalOneBased = progressToFrame(p);
      const zeroBased = clamp(
        Math.round(fractionalOneBased - 1),
        0,
        (manifest.count || FRAME_COUNT) - 1
      );

      setProgressValue((prev) => (Math.abs(prev - p) > 0.0005 ? p : prev));
      setCurrentFrameIndex((prev) => (prev !== zeroBased ? zeroBased : prev));

      if (lastDrawnFrameRef.current !== zeroBased) {
        lastDrawnFrameRef.current = zeroBased;
        drawFrame(zeroBased, fit);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [smoothProgress, fit, drawFrame, manifest.count]);

  // Scroll helper for calibrate quick-jump
  const scrollToProgress = (targetP: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const scrollableDistance = container.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: containerTop + scrollableDistance * targetP,
      behavior: "smooth",
    });
  };

  // Compute canvas CSS mask for seamless feathering into STAGE_COLORS gradient
  let canvasMask = "none";
  if (fit.isPortrait) {
    canvasMask =
      "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)";
  } else if (fit.isWiderThan16by9) {
    canvasMask =
      "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)";
  } else if (fit.isTallerThan16by9) {
    canvasMask =
      "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)";
  }

  // Leader-line labels window (0.22 - 0.39, fading out 0.39 - 0.41)
  const inLabelsWindow = progressValue >= LABEL_WINDOW.a && progressValue <= 0.41;
  const windowFadeOut =
    progressValue <= LABEL_WINDOW.b
      ? 1
      : clamp(1 - (progressValue - LABEL_WINDOW.b) / 0.02, 0, 1);
  const windowHeaderAlpha =
    inLabelsWindow
      ? clamp((progressValue - LABEL_WINDOW.a) / 0.02, 0, 1) * windowFadeOut
      : 0;

  // Scroll hint disappears after progress > 0.03
  const scrollHintAlpha = clamp(1 - progressValue / 0.03, 0, 1);

  // Content lookup for each TEXT_BLOCK
  const renderBlockContent = (id: (typeof TEXT_BLOCKS)[number]["id"]) => {
    switch (id) {
      case "intro":
        return (
          <>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#121212]/78 mb-3">
              ARCHITEKTUR &amp; RAUMGESTALTUNG · ZÜRICH
            </div>
            <h1 className="text-[28px] sm:text-[34px] lg:text-[40px] font-light leading-[1.12] tracking-[-0.025em] text-[#121212] mb-4">
              Atmosphärisch und funktional gestalteter{" "}
              <strong className="font-semibold">Wohnraum.</strong>
            </h1>
            <p className="text-[14px] sm:text-[15px] leading-[1.6] text-[#121212]/78 mb-6">
              Wir schaffen individuelle Lebensräume durch präzisen Umbau
              historischer Bausubstanz und anspruchsvolle Neubauten. Persönlich
              begleitet von der ersten Skizze bis zur Bauleitung.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 bg-[#121212] text-[#FAFAF9] hover:bg-[#D92B2B] transition-colors text-[12px] font-medium px-4 py-2.5"
              >
                <span>Gespräch vereinbaren</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#projekte"
                className="inline-flex items-center gap-2 border border-[#121212]/35 text-[#121212] hover:border-[#121212] transition-colors text-[12px] font-medium px-4 py-2.5"
              >
                <span>Projekte ansehen</span>
              </a>
            </div>
          </>
        );
      case "bestand":
        return (
          <>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#121212]/78 mb-2.5">
              01 · BESTAND
            </div>
            <h2 className="text-[26px] sm:text-[32px] font-normal leading-[1.15] tracking-[-0.02em] text-[#121212] mb-3">
              Jedes Haus hat Schichten.
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.6] text-[#121212]/78">
              Wir lesen die Substanz: Was trägt, was prägt, was darf bleiben,
              was darf neu entstehen.
            </p>
          </>
        );
      case "weiterbau":
        return (
          <>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#121212]/78 mb-2.5">
              02 · WEITERBAU
            </div>
            <h2 className="text-[26px] sm:text-[32px] font-normal leading-[1.15] tracking-[-0.02em] text-[#121212] mb-3">
              Weiterbauen, was da ist.
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.6] text-[#121212]/78">
              Aus dem Bestand entsteht Neues, ohne dass die Geschichte des
              Hauses verloren geht.
            </p>
          </>
        );
      case "entwurf":
        return (
          <>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#121212]/78 mb-2.5">
              03 · ENTWURF
            </div>
            <h2 className="text-[26px] sm:text-[32px] font-normal leading-[1.15] tracking-[-0.02em] text-[#121212] mb-3">
              Präzise bis ins Detail.
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.6] text-[#121212]/78">
              Jede Schicht wird einzeln gedacht und wieder zu einem stimmigen
              Ganzen gefügt.
            </p>
          </>
        );
      case "ausfuehrung":
        return (
          <>
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#121212]/78 mb-1.5">
              04 · AUSFÜHRUNG
            </div>
            <h2 className="text-[18px] sm:text-[20px] font-medium leading-[1.2] tracking-[-0.015em] text-[#121212] mb-1.5">
              Schicht für Schicht.
            </h2>
            <p className="text-sm leading-[1.5] text-[#121212]/78">
              Statik, Hülle, Ausbau: sorgfältig koordiniert.
            </p>
          </>
        );
      case "bauleitung":
        return (
          <>
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#121212]/78 mb-1.5">
              05 · BAULEITUNG
            </div>
            <h2 className="text-[18px] sm:text-[20px] font-medium leading-[1.2] tracking-[-0.015em] text-[#121212] mb-1.5">
              Persönlich begleitet.
            </h2>
            <p className="text-sm leading-[1.5] text-[#121212]/78">
              Von der Skizze bis zur Bauleitung.
            </p>
          </>
        );
      case "cta":
        return (
          <>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#121212]/78 mb-2.5">
              KONTAKT
            </div>
            <h2 className="text-[24px] sm:text-[30px] font-normal leading-[1.15] tracking-[-0.02em] text-[#121212] mb-3">
              Haben Sie ein Bau- oder Umbauvorhaben in Zürich?
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.6] text-[#121212]/78 mb-5">
              Wir beraten Sie gerne unverbindlich vor Ort oder an der
              Dolderstrasse.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 bg-[#121212] text-[#FAFAF9] hover:bg-[#D92B2B] transition-colors text-[12px] font-medium px-4 py-2.5"
              >
                <span>Gespräch vereinbaren</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:info@tschanderkeller.ch"
                className="inline-flex items-center gap-2 border border-[#121212]/35 text-[#121212] hover:border-[#121212] transition-colors font-mono text-[11px] px-3.5 py-2.5"
              >
                <span>info@tschanderkeller.ch</span>
              </a>
            </div>
          </>
        );
    }
  };

  return (
    <>
      {/* Hero Scroll Container: 640vh desktop, 480vh mobile */}
      <section
        id="top"
        ref={containerRef}
        aria-label="Architekturmodell Animation: Bestand zu Weiterbau"
        className="relative h-[480vh] md:h-[640vh] w-full select-none"
        style={{
          background: `linear-gradient(180deg, ${STAGE_COLORS.top} 0%, ${STAGE_COLORS.bottom} 100%)`,
        }}
      >
        {/* Sticky Stage Pin */}
        <div
          ref={stageRef}
          className="sticky top-14 md:top-[72px] h-[calc(100vh-56px)] md:h-[calc(100vh-72px)] w-full overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${STAGE_COLORS.top} 0%, ${STAGE_COLORS.bottom} 100%)`,
          }}
        >
          {/* Loading bar when preloading initial frames */}
          {loadedCount < FRAME_COUNT && (
            <div
              className="absolute top-0 left-0 right-0 h-[1.5px] bg-[#121212]/10 z-30 pointer-events-none"
              aria-hidden="true"
            >
              <div
                className="h-full bg-[#121212]/60 transition-all duration-150"
                style={{
                  width: `${Math.round((loadedCount / FRAME_COUNT) * 100)}%`,
                }}
              />
            </div>
          )}

          {/* Contained Canvas positioned at exact fit rect */}
          <canvas
            ref={canvasRef}
            onMouseMove={
              calibrateMode
                ? (e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const nx = (e.clientX - rect.left) / rect.width;
                    const ny = (e.clientY - rect.top) / rect.height;
                    setHoverCoord({
                      x: Number(nx.toFixed(3)),
                      y: Number(ny.toFixed(3)),
                    });
                  }
                : undefined
            }
            onMouseLeave={calibrateMode ? () => setHoverCoord(null) : undefined}
            style={{
              position: "absolute",
              left: `${fit.dx}px`,
              top: `${fit.dy}px`,
              width: `${fit.drawWidth}px`,
              height: `${fit.drawHeight}px`,
              maskImage: canvasMask,
              WebkitMaskImage: canvasMask,
            }}
            className="pointer-events-auto"
          />

          {/* Leader-Line Labels Overlay (Desktop >= md, only in window 0.22–0.39) */}
          <div
            className="hidden md:block absolute inset-0 pointer-events-none z-20"
            aria-hidden={!inLabelsWindow}
            style={{
              visibility: inLabelsWindow ? "visible" : "hidden",
            }}
          >
            {/* Top-left mono title during the window: SCHNITT · BESTAND */}
            <div
              className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 pt-6"
              style={{
                opacity: windowHeaderAlpha,
                transform: `translateY(${(1 - windowHeaderAlpha) * 6}px)`,
              }}
            >
              <div className="inline-block">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#121212]/78 pb-1.5">
                  SCHNITT · BESTAND
                </div>
                <div className="h-[1px] w-36 bg-[#121212]/50" />
              </div>
            </div>

            {/* SVG Leader Lines & Red Dots */}
            <svg
              className="absolute inset-0 w-full h-full overflow-visible"
              width={fit.stageWidth}
              height={fit.stageHeight}
              viewBox={`0 0 ${fit.stageWidth} ${fit.stageHeight}`}
            >
              {LAYER_LABELS.map((label) => {
                const t = clamp(
                  (progressValue - label.a) / (label.b - label.a),
                  0,
                  1
                );
                const alpha = t * windowFadeOut;
                const anchorX = fit.dx + label.anchor.x * fit.drawWidth;
                const anchorY = fit.dy + label.anchor.y * fit.drawHeight;
                const edgeX = fit.dx + label.labelEdgeX * fit.drawWidth;
                const lineLength = Math.max(0, anchorX - edgeX);
                const dashOffset = lineLength * (1 - t);
                const dotAlpha = clamp((t - 0.45) / 0.55, 0, 1) * windowFadeOut;

                return (
                  <g key={label.id} style={{ opacity: alpha }}>
                    <line
                      x1={edgeX}
                      y1={anchorY}
                      x2={anchorX}
                      y2={anchorY}
                      stroke="#121212"
                      strokeWidth={1}
                      strokeDasharray={lineLength}
                      strokeDashoffset={dashOffset}
                    />
                    <circle
                      cx={anchorX}
                      cy={anchorY}
                      r={3}
                      fill="#D92B2B"
                      style={{ opacity: dotAlpha }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Right-aligned Mono Index + Label Text ending at labelEdgeX */}
            {LAYER_LABELS.map((label) => {
              const t = clamp(
                (progressValue - label.a) / (label.b - label.a),
                0,
                1
              );
              const alpha = t * windowFadeOut;
              const anchorY = fit.dy + label.anchor.y * fit.drawHeight;
              const edgeX = fit.dx + label.labelEdgeX * fit.drawWidth;

              return (
                <div
                  key={label.id}
                  style={{
                    position: "absolute",
                    left: 0,
                    width: `${Math.max(0, edgeX - 10)}px`,
                    top: `${anchorY}px`,
                    transform: "translateY(-50%)",
                    opacity: alpha,
                  }}
                  className="text-right pr-1 flex items-baseline justify-end gap-2"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#121212]/78">
                    {label.idx}
                  </span>
                  <span className="text-[13px] font-medium tracking-[-0.01em] text-[#121212]">
                    {label.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Desktop / Landscape Text Overlays (!fit.isPortrait) */}
          {!fit.isPortrait && (
            <div className="hidden md:block absolute inset-0 pointer-events-none z-20">
              <div className="max-w-[1440px] mx-auto h-full px-5 sm:px-8 lg:px-14 relative">
                {TEXT_BLOCKS.map((block) => {
                  const state = computeBlockOpacityAndY(
                    progressValue,
                    block.a,
                    block.b,
                    block.stay
                  );
                  const isCaption = block.variant === "caption";

                  return (
                    <div
                      key={block.id}
                      aria-hidden={!state.visible}
                      style={{
                        opacity: state.opacity,
                        transform: isCaption
                          ? `translateY(${state.y}px)`
                          : `translateY(calc(-50% + ${state.y}px))`,
                        visibility: state.visible ? "visible" : "hidden",
                        pointerEvents: state.visible ? "auto" : "none",
                      }}
                      className={
                        isCaption
                          ? "absolute top-6 left-5 sm:left-8 lg:left-14 max-w-[220px]"
                          : "absolute top-1/2 left-5 sm:left-8 lg:left-14 max-w-[360px]"
                      }
                    >
                      {renderBlockContent(block.id)}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Mobile / Portrait Lower Panel (~38% height, solid #FAFAF9 with hairline top border) */}
          <div
            className={`${
              fit.isPortrait ? "flex" : "flex md:hidden"
            } absolute bottom-0 left-0 right-0 h-[38%] bg-[#FAFAF9] border-t border-[#121212]/15 z-20 px-5 sm:px-8 py-5 flex-col justify-center`}
          >
            {/* Mobile compact vertical legend during label window (0.22–0.39) */}
            {inLabelsWindow ? (
              <div
                style={{ opacity: windowFadeOut }}
                className="w-full max-w-md mx-auto"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#121212]/78 pb-1.5 mb-2.5 border-b border-[#121212]/20 flex items-center justify-between">
                  <span>SCHNITT · BESTAND</span>
                  <span className="text-[#D92B2B]">01 – 05</span>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {LAYER_LABELS.map((label) => {
                    const active = progressValue >= label.a;
                    return (
                      <div
                        key={label.id}
                        className={`flex items-center justify-between py-0.5 transition-opacity ${
                          active ? "opacity-100" : "opacity-40"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-[10px] text-[#121212]/78">
                            {label.idx}
                          </span>
                          <span className="text-[13px] font-medium text-[#121212]">
                            {label.text}
                          </span>
                        </div>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D92B2B]" />
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full flex items-center">
                {TEXT_BLOCKS.map((block) => {
                  const state = computeBlockOpacityAndY(
                    progressValue,
                    block.a,
                    block.b,
                    block.stay
                  );
                  return (
                    <div
                      key={block.id}
                      aria-hidden={!state.visible}
                      style={{
                        opacity: state.opacity,
                        transform: `translateY(${state.y * 0.6}px)`,
                        visibility: state.visible ? "visible" : "hidden",
                        pointerEvents: state.visible ? "auto" : "none",
                      }}
                      className="absolute inset-x-0 top-1/2 -translate-y-1/2 max-w-lg"
                    >
                      {renderBlockContent(block.id)}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom-left tiny mono caption: KONZEPTMODELL (10px, ink at 60%) */}
          <div
            className={`absolute left-5 sm:left-8 lg:left-14 ${
              fit.isPortrait ? "bottom-[40%]" : "bottom-4"
            } z-20 pointer-events-none font-mono text-[10px] uppercase tracking-[0.14em] text-[#121212]/60`}
          >
            KONZEPTMODELL
          </div>

          {/* Scroll Hint: disappears after progress > 0.03 */}
          <div
            aria-hidden={scrollHintAlpha <= 0.01}
            style={{
              opacity: scrollHintAlpha,
              visibility: scrollHintAlpha > 0.01 ? "visible" : "hidden",
            }}
            className={`absolute left-1/2 -translate-x-1/2 ${
              fit.isPortrait ? "bottom-[40%]" : "bottom-4"
            } z-20 pointer-events-none flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#121212]/78`}
          >
            <span>Scrollen</span>
            <ArrowDown className="w-3 h-3 animate-bounce" />
          </div>

          {/* ?calibrate=1 Diagnostic & Calibration Overlay */}
          {calibrateMode && (
            <div className="fixed bottom-4 right-4 z-50 bg-[#121212]/95 text-[#FAFAF9] font-mono text-[11px] p-4 border border-[#FAFAF9]/20 shadow-2xl max-w-xs space-y-2">
              <div className="flex items-center justify-between border-b border-[#FAFAF9]/15 pb-1.5">
                <span className="text-[#D92B2B] font-semibold">
                  CALIBRATE OVERLAY
                </span>
                <span>
                  {fit.stageWidth}×{fit.stageHeight}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <span className="text-[#FAFAF9]/60">Progress:</span>
                <span>{progressValue.toFixed(3)}</span>
                <span className="text-[#FAFAF9]/60">Frame (1-based):</span>
                <span>
                  {currentFrameIndex + 1} / {manifest.count}
                </span>
                <span className="text-[#FAFAF9]/60">Fit Mode:</span>
                <span>
                  {fit.isPortrait
                    ? "portrait (x1.15)"
                    : fit.isWiderThan16by9
                    ? "contain-height"
                    : "contain-width"}
                </span>
                <span className="text-[#FAFAF9]/60">Loaded:</span>
                <span>
                  {loadedCount} / {manifest.count}
                </span>
                {hoverCoord && (
                  <>
                    <span className="text-[#FAFAF9]/60">Cursor norm:</span>
                    <span className="text-[#D92B2B]">
                      x={hoverCoord.x}, y={hoverCoord.y}
                    </span>
                  </>
                )}
              </div>
              <div className="pt-1.5 border-t border-[#FAFAF9]/15">
                <div className="text-[10px] text-[#FAFAF9]/60 mb-1">
                  Quick Jump:
                </div>
                <div className="flex flex-wrap gap-1">
                  {[
                    { label: "0.00", p: 0.0 },
                    { label: "0.15", p: 0.15 },
                    { label: "0.30 (f110)", p: 0.3 },
                    { label: "0.45", p: 0.45 },
                    { label: "0.55", p: 0.55 },
                    { label: "0.70 (f245)", p: 0.7 },
                    { label: "0.85", p: 0.85 },
                    { label: "0.95", p: 0.95 },
                  ].map((btn) => (
                    <button
                      key={btn.label}
                      type="button"
                      onClick={() => scrollToProgress(btn.p)}
                      className="px-1.5 py-0.5 bg-[#FAFAF9]/10 hover:bg-[#D92B2B] text-[10px] transition-colors"
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 24vh Bridge from STAGE_COLORS.bridgeFrom (#d0cdc5) to #FAFAF9 */}
      <div
        aria-hidden="true"
        className="h-[24vh] w-full pointer-events-none"
        style={{
          background: `linear-gradient(180deg, ${STAGE_COLORS.bridgeFrom} 0%, ${STAGE_COLORS.pageBg} 100%)`,
        }}
      />
    </>
  );
}
