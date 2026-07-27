import React from 'react';
import {Box, Text, useInput} from 'ink';

export default function AuthScreen({onAuth}) {
	const [key, setKey] = React.useState('');

	useInput((input, keyState) => {
		if (keyState.return) {
			if (key.trim()) {
				onAuth(key.trim());
			}
		} else if (keyState.backspace || keyState.delete) {
			setKey((prev) => prev.slice(0, -1));
		} else if (input) {
			setKey((prev) => prev + input);
		}
	});

	return (
		<Box flexDirection="column">
			<Text bold color="yellow">
				Enter your OpenRouter API Key:
			</Text>
			<Box marginY={1}>
				<Text color="cyan">{'> '}</Text>
				<Text>{'*'.repeat(key.length)}</Text>
			</Box>
			<Text dimColor>Press Enter to submit</Text>
		</Box>
	);
}
