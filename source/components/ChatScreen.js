import React, {useState} from 'react';
import {Box, Text, useInput} from 'ink';
import {sendMessage} from '../api/openrouter.js';

export default function ChatScreen({apiKey, onOpenSettings, onOpenStealth}) {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useInput((inputChar, keyState) => {
		if (loading) return;

		if (keyState.ctrl && inputChar === 's') {
			onOpenSettings();
			return;
		}

		if (keyState.ctrl && inputChar === 'h') {
			onOpenStealth();
			return;
		}

		if (keyState.return) {
			if (input.trim()) {
				const userMsg = {role: 'user', content: input.trim()};
				const newMessages = [...messages, userMsg];
				setMessages(newMessages);
				setInput('');
				setLoading(true);
				setError(null);

				sendMessage(newMessages, apiKey)
					.then((reply) => {
						setMessages([...newMessages, {role: 'assistant', content: reply}]);
					})
					.catch((err) => {
						setError(err.message);
					})
					.finally(() => {
						setLoading(false);
					});
			}
		} else if (keyState.backspace || keyState.delete) {
			setInput((prev) => prev.slice(0, -1));
		} else if (inputChar) {
			setInput((prev) => prev + inputChar);
		}
	});

	return (
		<Box flexDirection="column">
			<Box borderStyle="single" borderColor="gray" flexDirection="column" paddingX={1}>
				<Text bold color="green">
					CheatCode AI Chat
				</Text>
				<Text dimColor>Ctrl+S: Settings | Ctrl+H: Stealth Mode</Text>
			</Box>

			<Box flexDirection="column" marginY={1}>
				{messages.map((m, i) => (
					<Box key={i} marginY={0.5} flexDirection="column">
						<Text bold color={m.role === 'user' ? 'blue' : 'magenta'}>
							{m.role === 'user' ? 'You:' : 'AI:'}
						</Text>
						<Text>{m.content}</Text>
					</Box>
				))}
				{loading && (
					<Text color="yellow" italic>
						AI is thinking...
					</Text>
				)}
				{error && (
					<Text color="red" bold>
						Error: {error}
					</Text>
				)}
			</Box>

			<Box marginTop={1}>
				<Text color="cyan">{'> '}</Text>
				<Text>{input}</Text>
			</Box>
		</Box>
	);
}
