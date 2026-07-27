export async function sendMessage(messages, apiKey, model = 'openai/gpt-3.5-turbo') {
	const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${apiKey}`,
			'Content-Type': 'application/json',
			'HTTP-Referer': 'https://github.com/krit22/cheatcode',
			'X-Title': 'CheatCode CLI'
		},
		body: JSON.stringify({
			model,
			messages
		})
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({}));
		throw new Error(error.error?.message || `API error: ${response.statusText}`);
	}

	const data = await response.json();
	return data.choices[0]?.message?.content || '';
}
