import {loadConfig, saveConfig} from '../storage/config.js';

export function getStoredApiKey() {
	const config = loadConfig();
	return config.apiKey || null;
}

export function setStoredApiKey(apiKey) {
	const config = loadConfig();
	config.apiKey = apiKey;
	saveConfig(config);
}

export function removeStoredApiKey() {
	const config = loadConfig();
	delete config.apiKey;
	saveConfig(config);
}
