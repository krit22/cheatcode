import http from 'node:http';
import open from 'open';
import {saveApiKey, getApiKey, removeApiKey} from '../storage/config.js';

export function createOAuthUrl() {
	const PORT = 43210;
	const callbackUrl = `http://localhost:${PORT}/callback`;
	const authUrl = `https://openrouter.ai/auth?callback_url=${encodeURIComponent(callbackUrl)}`;
	return {authUrl, port: PORT};
}

export function startOAuthFlow(onSuccess, onError) {
	const PORT = 43210;
	const {authUrl} = createOAuthUrl();

	const server = http.createServer((req, res) => {
		try {
			const url = new URL(req.url, `http://localhost:${PORT}`);
			const code = url.searchParams.get('code') || url.searchParams.get('key') || url.searchParams.get('apiKey');

			if (code) {
				saveApiKey(code);
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end('<h1>Authentication Successful!</h1><p>You can close this window and return to your terminal.</p>');
				server.close();
				if (onSuccess) onSuccess(code);
			} else {
				res.writeHead(400, {'Content-Type': 'text/html'});
				res.end('<h1>Authentication Failed</h1>');
			}
		} catch (e) {
			if (onError) onError(e);
		}
	});

	server.listen(PORT, async () => {
		try {
			await open(authUrl);
		} catch (err) {
			if (onError) onError(err);
		}
	});

	return () => {
		try {
			server.close();
		} catch (e) {}
	};
}
