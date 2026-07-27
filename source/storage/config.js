import fs from 'fs';
import path from 'path';
import os from 'os';

const CONFIG_DIR = path.join(os.homedir(), '.config', 'cheatcode');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

export function loadConfig() {
	try {
		if (!fs.existsSync(CONFIG_DIR)) {
			fs.mkdirSync(CONFIG_DIR, {recursive: true});
		}
		if (fs.existsSync(CONFIG_FILE)) {
			return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
		}
	} catch (e) {}
	return {};
}

export function saveConfig(config) {
	try {
		if (!fs.existsSync(CONFIG_DIR)) {
			fs.mkdirSync(CONFIG_DIR, {recursive: true});
		}
		fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
	} catch (e) {}
}
