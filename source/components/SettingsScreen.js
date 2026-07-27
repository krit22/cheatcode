import React, {useState} from 'react';
import {Box, Text, useInput} from 'ink';
import {loadConfig, saveConfig} from '../storage/config.js';

export default function SettingsScreen({apiKey, onSave, onClear, onBack}) {
	const [key, setKey] = useState(apiKey || '');

	useInput((inputChar, keyState) => {
		if (keyState.escape) {
			onBack();
			return;
		}
		if (keyState.return) {
			onSave(key.trim());
		} else if (keyState.backspace || keyState.delete) {
			setKey((prev) => prev.slice(0, -1));
		} else if (inputChar) {
			setKey((prev) => prev + inputChar);
		}
	});

	return (
		<Box flexDirection="column">
			<Text bold color="yellow">
				Settings
			</Text>
			<Box marginY={1} flexDirection="column">
				<Text>OpenRouter API Key:</Text>
				<Box borderStyle="single" paddingX={1}>
					<Text color="cyan">{key || '<None>'}</Text>
				</Box>
			</Box>
			<Text dimColor>Press Enter to save | Esc to go back</Text>
		</Box>
	);
}
