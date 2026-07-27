import React from 'react';
import {Box, Text, useInput} from 'ink';

export default function StealthScreen({onBack}) {
	useInput((inputChar, keyState) => {
		if (keyState.escape || (keyState.ctrl && inputChar === 'h')) {
			onBack();
		}
	});

	return (
		<Box flexDirection="column" padding={1} borderStyle="double" borderColor="gray">
			<Text color="green">
				$ htop - 10:14:32 up 4 days, 23:12, 1 user, load average: 0.14, 0.08, 0.03
			</Text>
			<Text color="white">
				Tasks: 142 total, 1 running, 141 sleeping
			</Text>
			<Text color="cyan">
				Cpu(s): 1.2%us, 0.5%sy, 0.0%ni, 98.3%id
			</Text>
			<Text color="yellow">
				Mem: 16384M total, 8192M free, 4096M used
			</Text>
			<Box marginTop={1}>
				<Text dimColor>[Stealth Mode Active - Press Esc or Ctrl+H to exit]</Text>
			</Box>
		</Box>
	);
}
