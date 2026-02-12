import qrcode from "qrcode-generator";

export type QrMatrix = boolean[][];
export type QrErrorCorrection = "L" | "M" | "Q" | "H";
type QrTypeNumber = Parameters<typeof qrcode>[0];

export type EncodeOptions = {
  ecc?: QrErrorCorrection;
  version?: QrTypeNumber;
};

export function encode(text: string, opts: EncodeOptions = {}): QrMatrix {
  const ecc = opts.ecc ?? "M";
  const version = opts.version ?? 0;
  const qr = qrcode(version, ecc);
  qr.addData(text);
  qr.make();
  const size = qr.getModuleCount();
  const matrix: QrMatrix = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => false),
  );

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      matrix[row]![col] = qr.isDark(row, col);
    }
  }

  return matrix;
}
