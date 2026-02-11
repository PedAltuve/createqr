const argv = Bun.argv.slice(2);

const usage = `Usage:
  createqr <url>
  createqr <url> -p <output.png>
`;

if (argv.length === 0 || argv.includes("-h") || argv.includes("--help")) {
  console.error(usage.trimEnd());
  process.exit(argv.length === 0 ? 1: 0);
}

let pngPath: string | undefined;
const positionals: string[] = [];

for (let i = 0; i < argv.length; i++) {
  const token = argv[i];
  if (token === "-p" || token === "--png") {
    const next = argv[i +1];
    if (!next || next.startsWith("-")) {
      console.error("Missing path after -p/--png\n" + usage.trimEnd());
      process.exit(1);
    }
    pngPath = next;
    i++;
    continue;
  }

  if (token.startsWith("-")) {
    console.error(`Unknown option: ${token}\n` + usage.trimEnd());
    process.exit(1);
  }

  positionals.push(token);

  const text = positionals.join(" ").trim();
  if (!text) {
    console.error("Missing text to encode");
    process.exit(1);
  }

  console.log({ text, pngPath });
  
  
}

