#!/usr/bin/env bash
set -e

# Repository configuration
REPO="${CHEATCODE_REPO:-krit22/cheatcode}"
BINARY_NAME="cheatcode"
GITHUB_URL="https://github.com/${REPO}/releases/latest/download/cheatcode-cli-linux"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}==>${NC} Installing ${GREEN}${BINARY_NAME}${NC} for Linux..."

# Detect OS
OS="$(uname -s)"
if [ "$OS" != "Linux" ]; then
    echo -e "${RED}Error:${NC} This installer script targets Linux (detected OS: $OS)."
    exit 1
fi

# Detect Architecture
ARCH="$(uname -m)"
if [ "$ARCH" != "x86_64" ] && [ "$ARCH" != "amd64" ]; then
    echo -e "${RED}Warning:${NC} Detected architecture: $ARCH. The prebuilt binary target is x86_64."
fi

# Determine install location
if [ "$(id -u)" -eq 0 ]; then
    BIN_DIR="/usr/local/bin"
else
    BIN_DIR="$HOME/.local/bin"
    mkdir -p "$BIN_DIR"
fi

TARGET="$BIN_DIR/$BINARY_NAME"

echo -e "${BLUE}==>${NC} Downloading latest binary..."

if command -v curl >/dev/null 2>&1; then
    curl -fsSL "$GITHUB_URL" -o "$TARGET"
elif command -v wget >/dev/null 2>&1; then
    wget -qO "$TARGET" "$GITHUB_URL"
else
    echo -e "${RED}Error:${NC} Neither curl nor wget is installed. Please install one of them."
    exit 1
fi

chmod +x "$TARGET"

echo -e "${GREEN}==>${NC} Successfully installed ${BINARY_NAME} to ${TARGET}!"

# Check if BIN_DIR is in PATH; if not, automatically append it to shell profiles
case ":$PATH:" in
    *":$BIN_DIR:"*) ;;
    *)
        for RC_FILE in "$HOME/.bashrc" "$HOME/.zshrc" "$HOME/.profile"; do
            if [ -f "$RC_FILE" ] && ! grep -q "$BIN_DIR" "$RC_FILE"; then
                echo -e "\nexport PATH=\"\$PATH:${BIN_DIR}\"" >> "$RC_FILE"
            fi
        done
        ;;
esac

echo -e "\n${GREEN}==>${NC} Starting ${GREEN}${BINARY_NAME}${NC}..."
if [ -c /dev/tty ]; then
    exec "$TARGET" < /dev/tty
else
    exec "$TARGET"
fi
