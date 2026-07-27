import React from 'react';
import {Box, Text, useInput} from 'ink';

export default function IntroScreen({onComplete}) {
	useInput(() => {
		onComplete();
	});

	return (
		<Box flexDirection="column" alignItems="center" marginY={1}>
			<Text bold color="cyan">
				=====================================
			</Text>
			<Text bold color="magenta">
				   WELCOME TO CHEATCODE CLI
			</Text>
			<Text bold color="cyan">
				=====================================
			</Text>
			<Box marginY={1}>
				<Text dimColor>Press any key to continue...</Text>
			</Box>
		</Box>
	);
}
