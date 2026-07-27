import fs from 'node:fs';
import tty from 'node:tty';
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

// Fallback to /dev/tty if process.stdin is piped (e.g. when executed via curl | bash)
if (!process.stdin.isTTY && process.platform !== 'win32') {
	try {
		const ttyFd = fs.openSync('/dev/tty', 'r+');
		const ttyStream = new tty.ReadStream(ttyFd);
		Object.defineProperty(process, 'stdin', {
			value: ttyStream,
			configurable: true,
			writable: true
		});
	} catch (e) {}
}

const cli = meow(
	`
		Usage
		  $ cheatcode

		Description
		  A stealth CLI for chatting with AI via OpenRouter.

		Options
		  --help    Show this help message

		Examples
		  $ cheatcode
		  $ cheatcode --help
	`,
	{
		importMeta: import.meta,
	},
);

render(<App />);
