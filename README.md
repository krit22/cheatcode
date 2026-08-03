<p align="center">
  <img src="https://img.shields.io/badge/Node.js-16%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/JavaScript-ESM-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Ink-4-000000?style=for-the-badge&logoColor=white" alt="Ink" />
  <img src="https://img.shields.io/badge/esbuild-bundler-FFCF00?style=for-the-badge&logo=esbuild&logoColor=black" alt="esbuild" />
  <img src="https://img.shields.io/badge/OpenRouter-LLM-7C3AED?style=for-the-badge&logo=openai&logoColor=white" alt="OpenRouter" />
  <img src="https://img.shields.io/badge/MIT-license-22C55E?style=for-the-badge" alt="MIT" />
</p>

# CheatCode CLI

> A stealth AI assistant that lives in your terminal — powered by OpenRouter. No browser, no tab switching, no distractions.

🌐 **Website & Docs**: [krit22.github.io/cheatcode](https://krit22.github.io/cheatcode)

---

## ⚡ Install

**Linux** (no Node.js required — downloads a standalone binary):

```bash
curl -fsSL https://raw.githubusercontent.com/krit22/cheatcode/main/install.sh | bash
```

**Windows** (PowerShell):

```powershell
irm https://raw.githubusercontent.com/krit22/cheatcode/main/install.ps1 | iex
```

---

## 🖥️ Usage

```bash
cheatcode
```

| Keybinding | Action |
| :---: | :--- |
| `Enter` | Send message |
| `Tab` | Toggle stealth mode (blank screen) |
| `Ctrl+S` | Quit |

---

## ✨ Features

- **AI chat in your terminal** — full conversation history, streaming responses
- **OpenRouter OAuth** — one-click browser auth, API key stored securely in `~/.config/cheatcode/`
- **Stealth mode** — instantly blank the screen with `Tab` if someone walks by
- **Cross-platform binaries** — standalone executables for Linux, macOS, and Windows via `pkg`
- **No Node.js required for end users** — just download and run

---

## 📁 Project Structure

```
source/
├── cli.js              # Entrypoint — meow CLI parser
├── app.js              # Root React/Ink component & screen router
├── constants.js        # API URLs, keybindings, config paths
├── components/
│   ├── IntroScreen.js  # Splash / loading screen
│   ├── AuthScreen.js   # OpenRouter OAuth flow
│   ├── ChatScreen.js   # Main AI chat interface
│   ├── SettingsScreen.js # API key management
│   └── StealthScreen.js  # Blank stealth overlay
├── api/                # OpenRouter API client
├── auth/               # OAuth token exchange & storage
└── storage/            # Local config & history persistence
web/                    # Landing page (GitHub Pages)
```

---

## 🔨 Development

```bash
# Install dependencies
npm install

# Build bundle
npm run build

# Run locally
npm start

# Compile standalone binaries (outputs to bin/)
npm run compile
```

Binaries produced:

| File | Platform |
| :--- | :--- |
| `bin/cheatcode-cli-linux` | Linux x64 |
| `bin/cheatcode-cli-win.exe` | Windows x64 |
| `bin/cheatcode-cli-macos` | macOS x64 |
