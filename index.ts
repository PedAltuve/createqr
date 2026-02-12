import { encode } from "./src/qr/encode";
import { renderTerminal } from "./src/render/terminal";
import { renderPng } from "./src/render/png";

const argv = Bun.argv.slice(2);

const usage = `Usage:
  createqr <url>
  createqr <url> -p <output.png>
`;

if (argv.length === 0 || argv.includes("-h") || argv.includes("--help")) {
  console.error(usage.trimEnd());
  process.exit(argv.length === 0 ? 1 : 0);
}

let pngPath: string | undefined;
const positionals: string[] = [];

for (let i = 0; i < argv.length; i += 1) {
  const token = argv[i];
  if (!token) continue;

  if (token === "-p" || token === "--png") {
    const next = argv[i + 1];
    if (!next || next.startsWith("-")) {
      console.error("Missing path after -p/--png\n" + usage.trimEnd());
      process.exit(1);
    }
    pngPath = next;
    i += 1;
    continue;
  }

  if (token.startsWith("-")) {
    console.error(`Unknown option: ${token}\n` + usage.trimEnd());
    process.exit(1);
  }

  positionals.push(token);
}

const text = positionals.join(" ").trim();
if (!text) {
  console.error("Missing text to encode\n" + usage.trimEnd());
  process.exit(1);
}

const matrix = encode(text);
console.log(renderTerminal(matrix));

if (pngPath) {
  const bytes = renderPng(matrix);
  await Bun.write(pngPath, bytes);
}
