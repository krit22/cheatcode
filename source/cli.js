import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

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
