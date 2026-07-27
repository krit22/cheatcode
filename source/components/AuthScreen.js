import React, {useState} from 'react';
import {Box, Text, useInput} from 'ink';
import {startOAuthFlow} from '../auth/oauth.js';

export default function AuthScreen({onAuth}) {
	const [mode, setMode] = useState('menu'); // 'menu' | 'manual' | 'oauth-waiting'
	const [key, setKey] = useState('');
	const [status, setStatus] = useState('');

	useInput((input, keyState) => {
		if (mode === 'menu') {
			if (input.toLowerCase() === 'o' || keyState.return) {
				setMode('oauth-waiting');
				setStatus('Opening browser for OpenRouter OAuth login...');
				startOAuthFlow(
					(apiKey) => {
						onAuth(apiKey);
					},
					(err) => {
						setStatus(`OAuth error: ${err.message}. Try manual entry.`);
						setMode('menu');
					}
				);
			} else if (input.toLowerCase() === 'm') {
				setMode('manual');
			}
		} else if (mode === 'manual') {
			if (keyState.return) {
				if (key.trim()) {
					onAuth(key.trim());
				}
			} else if (keyState.backspace || keyState.delete) {
				setKey((prev) => prev.slice(0, -1));
			} else if (input) {
				setKey((prev) => prev + input);
			} else if (keyState.escape) {
				setMode('menu');
			}
		} else if (mode === 'oauth-waiting') {
			if (keyState.escape) {
				setMode('menu');
			}
		}
	});

	return (
		<Box flexDirection="column" marginY={1}>
			<Text bold color="yellow">
				🔐 CheatCode Authentication
			</Text>

			{mode === 'menu' && (
				<Box flexDirection="column" marginY={1}>
					<Text color="cyan">[O] / Enter - Log in via OpenRouter OAuth (Browser)</Text>
					<Text color="magenta">[M]         - Enter OpenRouter API Key manually</Text>
				</Box>
			)}

			{mode === 'oauth-waiting' && (
				<Box flexDirection="column" marginY={1}>
					<Text color="green">{status}</Text>
					<Text dimColor>Waiting for browser authorization... Press Esc to cancel.</Text>
				</Box>
			)}

			{mode === 'manual' && (
				<Box flexDirection="column" marginY={1}>
					<Text bold color="yellow">
						Enter your OpenRouter API Key:
					</Text>
					<Box marginY={1}>
						<Text color="cyan">{'> '}</Text>
						<Text>{'*'.repeat(key.length)}</Text>
					</Box>
					<Text dimColor>Press Enter to submit | Esc to go back</Text>
				</Box>
			)}
		</Box>
	);
}
