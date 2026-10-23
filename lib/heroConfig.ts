/**
 * Calibrated for the real Tschander.Keller footage (300 frames, 1280x720, 24 fps).
 * Frame facts (inspected):
 *   1-25     old chalet, complete, static
 *   25-100   roof + layers lift apart (timber structure visible)
 *   100-150  exploded old house holds (labels window)
 *   150-180  morph: the old house transforms into a contemporary house with dark timber cladding
 *   180-220  contemporary house, closed, almost static
 *   220-245  contemporary house explodes (fast, frames 223-231 are the fastest)
 *   245-270  exploded contemporary house holds (fills almost the full frame width)
 *   270-300  house closes again (final frame = closed contemporary house)
 */
export const FRAME_COUNT = 300;

/** [scrollProgress, frameNumber (1-based)] anchors, piecewise linear. Static/hold phases get more scroll distance. */
export const FRAME_MAP: ReadonlyArray<readonly [number, number]> = [
  [0.0, 1],
  [0.07, 25],
  [0.24, 100],
  [0.4, 150],
  [0.5, 180],
  [0.6, 220],
  [0.7, 245],
  [0.8, 270],
  [0.9, 300],
  [1.0, 300],
];

export function progressToFrame(progress: number): number {
  const p = Math.min(1, Math.max(0, progress));
  for (let i = 1; i < FRAME_MAP.length; i++) {
    const [p0, f0] = FRAME_MAP[i - 1];
    const [p1, f1] = FRAME_MAP[i];
    if (p <= p1) {
      const t = p1 === p0 ? 1 : (p - p0) / (p1 - p0);
      return f0 + (f1 - f0) * t; // 1-based, fractional
    }
  }
  return FRAME_COUNT;
}

export type TextVariant = 'main' | 'caption';

export interface HeroTextBlock {
  id: 'intro' | 'bestand' | 'weiterbau' | 'entwurf' | 'ausfuehrung' | 'bauleitung' | 'cta';
  a: number;
  b: number;
  variant: TextVariant; // 'caption' = narrow block (max 220px) in the top-left corner while the model fills the frame
  stay?: boolean;
}

export const TEXT_BLOCKS: ReadonlyArray<HeroTextBlock> = [
  { id: 'intro', a: 0.0, b: 0.1, variant: 'main' },
  { id: 'bestand', a: 0.11, b: 0.21, variant: 'main' },
  { id: 'weiterbau', a: 0.41, b: 0.5, variant: 'main' },
  { id: 'entwurf', a: 0.51, b: 0.6, variant: 'main' },
  { id: 'ausfuehrung', a: 0.62, b: 0.79, variant: 'caption' },
  { id: 'bauleitung', a: 0.8, b: 0.89, variant: 'caption' },
  { id: 'cta', a: 0.9, b: 1.0, variant: 'main', stay: true },
];

export interface LayerLabel {
  id: string;
  idx: string;
  text: string;
  /** normalized frame coordinates (0-1) measured on frame 110 */
  anchor: { x: number; y: number };
  /** x (normalized) where the label text ends (right-aligned), left of the model */
  labelEdgeX: number;
  a: number; // fade-in start
  b: number; // fully visible from
}

/** Labels window: progress 0.22-0.39 (frames ~90-148, old structure exploded and still). Hide outside it. */
export const LABEL_WINDOW = { a: 0.22, b: 0.39 } as const;

export const LAYER_LABELS: ReadonlyArray<LayerLabel> = [
  { id: 'dach', idx: '01', text: 'Dach', anchor: { x: 0.41, y: 0.24 }, labelEdgeX: 0.27, a: 0.22, b: 0.26 },
  { id: 'dachgeschoss', idx: '02', text: 'Dachgeschoss', anchor: { x: 0.4, y: 0.42 }, labelEdgeX: 0.27, a: 0.25, b: 0.29 },
  { id: 'obergeschoss', idx: '03', text: 'Obergeschoss', anchor: { x: 0.43, y: 0.58 }, labelEdgeX: 0.27, a: 0.28, b: 0.32 },
  { id: 'erdgeschoss', idx: '04', text: 'Erdgeschoss', anchor: { x: 0.46, y: 0.72 }, labelEdgeX: 0.27, a: 0.31, b: 0.35 },
  { id: 'fundament', idx: '05', text: 'Fundament', anchor: { x: 0.37, y: 0.82 }, labelEdgeX: 0.27, a: 0.34, b: 0.38 },
];

/** Frame background measured on first/last frames (also in manifest.json). */
export const STAGE_COLORS = {
  top: '#b9b5ab',
  bottom: '#d4d1ca',
  left: '#cac7bf',
  right: '#bfbcb5',
  bridgeFrom: '#d0cdc5',
  pageBg: '#FAFAF9',
} as const;
