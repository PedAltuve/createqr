# Installation Guide

This guide explains how to build and install the `createqr` CLI tool on your system.

## Prerequisites

- [Bun](https://bun.sh/) installed on your system

## Building the Binary

### Current Platform (Auto-detect)

```bash
bun run build
```

This creates `dist/createqr` for your current platform.

### Linux (x64)

```bash
bun run build:linux
```

Creates: `dist/createqr-linux-x64`

### macOS (Intel)

```bash
bun run build:macos-x64
```

Creates: `dist/createqr-macos-x64`

### macOS (Apple Silicon)

```bash
bun run build:macos-arm64
```

Creates: `dist/createqr-macos-arm64`

## Installing to PATH

### 1. Create the bin directory (if it doesn't exist)

```bash
mkdir -p ~/.local/bin
```

### 2. Copy the binary

```bash
# For current platform build
cp dist/createqr ~/.local/bin/createqr

# Or for a specific platform build
cp dist/createqr-linux-x64 ~/.local/bin/createqr
cp dist/createqr-macos-x64 ~/.local/bin/createqr
cp dist/createqr-macos-arm64 ~/.local/bin/createqr
```

### 3. Make it executable

```bash
chmod +x ~/.local/bin/createqr
```

## Adding to PATH

### Bash (Linux/macOS)

Add this line to your `~/.bashrc` file:

```bash
export PATH="$HOME/.local/bin:$PATH"
```

Then reload:

```bash
source ~/.bashrc
```

### Zsh (macOS/Linux)

Add this line to your `~/.zshrc` file:

```bash
export PATH="$HOME/.local/bin:$PATH"
```

Then reload:

```bash
source ~/.zshrc
```

## Verification

Verify the installation:

```bash
# Check if createqr is in your PATH
which createqr
# Should output: ~/.local/bin/createqr

# Show help
createqr --help

# Generate a QR code in terminal
createqr https://example.com

# Generate and save as PNG
createqr https://example.com -p ~/Downloads/qrcode.png
```

## Uninstalling

```bash
rm ~/.local/bin/createqr
```

## Troubleshooting

### "command not found: createqr"

Make sure `~/.local/bin` is in your PATH:

```bash
echo $PATH | grep ".local/bin"
```

If not, add the export line to your shell profile as shown above.

### Permission denied

Ensure the binary has execute permissions:

```bash
chmod +x ~/.local/bin/createqr
```
