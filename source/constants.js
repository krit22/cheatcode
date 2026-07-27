export const APP_NAME = 'cheatcode';
export const CONFIG_DIR = `${process.env.XDG_CONFIG_HOME || `${process.env.HOME}/.config`}/${APP_NAME}`;
export const API_KEY_FILE = `${CONFIG_DIR}/api-key`;
export const DEFAULT_MODEL = 'nvidia/nemotron-3-ultra-550b-a55b:free';
export const OAUTH_BASE_URL = 'https://openrouter.ai/auth';
export const TOKEN_EXCHANGE_URL = 'https://openrouter.ai/api/v1/auth/keys';
export const CHAT_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
export const KEYBINDINGS = {
  STEALTH_TOGGLE: '\t',
  QUIT: '\x13',
  SUBMIT: '\r',
  BACKSPACE: '\x7f'
};
export const OAUTH_REDIRECT_PORT = 18080;
export const OAUTH_REDIRECT_HOST = 'localhost';
export const OAUTH_REDIRECT_PATH = '/callback';
export const OAUTH_SCOPES = ['offline_access'];
export const MAX_HISTORY_MESSAGES = 100;
