import { test, expect } from "bun:test";
import { encode } from "./encode";

test("encode returns a square boolean matrix", () => {
  const matrix = encode("https://www.google.com", { ecc: "M" });
  const size = matrix.length;
  expect(size).toBeGreaterThan(0);
  for (const row of matrix) {
    expect(row.length).toBe(size);
    for (const cell of row) {
      expect(typeof cell).toBe("boolean");
    }
  }
  const flat = matrix.flat();
  expect(flat.some(Boolean)).toBe(true);
  expect(flat.some((v) => !v)).toBe(true);
});

test("encode respects fixed version size", () => {
  const matrix = encode("hello", { version: 2, ecc: "M" });
  expect(matrix.length).toBe(25); // version 2 => 25x25
});
