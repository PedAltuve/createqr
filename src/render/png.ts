import { PNG } from "pngjs";

export type Rgb = [number, number, number];
export type PngRenderOptions = {
  scale?: number;
  margin?: number;
  dark?: Rgb;
  light?: Rgb;
};

export function renderPng(matrix: boolean[][], opts: PngRenderOptions = {}): Uint8Array {
  const scale = opts.scale ?? 8;
  const margin = opts.margin ?? 4;
  const dark = opts.dark ?? [0, 0, 0];
  const light = opts.light ?? [255, 255, 255];
  const size = matrix.length + margin * 2;
  const width = size * scale;
  const height = size * scale;
  const png = new PNG({ width, height });
  const data = png.data;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const mRow = y - margin;
      const mCol = x - margin;
      const on =
        mRow >= 0 && mRow < matrix.length && mCol >= 0 && mCol < matrix.length
          ? matrix[mRow]?.[mCol] ?? false
          : false;
      const color = on ? dark : light;
      for (let dy = 0; dy < scale; dy += 1) {
        for (let dx = 0; dx < scale; dx += 1) {
          const px = x * scale + dx;
          const py = y * scale + dy;
          const idx = (py * width + px) * 4;
          data[idx] = color[0];
          data[idx + 1] = color[1];
          data[idx + 2] = color[2];
          data[idx + 3] = 255;
        }
      }
    }
  }
  return PNG.sync.write(png);
}
