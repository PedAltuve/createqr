export type TerminalRenderOptions = {
  margin?: number;
  dark?: string;
  light?: string;
};

export function renderTerminal(matrix: boolean[][], opts: TerminalRenderOptions = {}): string {
  const margin = opts.margin ?? 2;
  const dark = opts.dark ?? "██";
  const light = opts.light ?? " ";
  const size = matrix.length;
  const total = size + margin * 2;
  const lines: string[] = [];

  for (let row = 0; row < total; row++) {
    let line = "";
    for (let col = 0; col < total; col++) {
      const mRow = row - margin;
      const mCol = col - margin;
      const on =
        mRow >= 0 && mRow < size && mCol >= 0 && mCol < size
          ? matrix[mRow]?.[mCol] ?? false
          : false;
      line += on ? dark : light;
    }
    lines.push(line);
  }

  return lines.join("\n") + "\n";
}
