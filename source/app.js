import React, {useState} from 'react';
import {Box, Text} from 'ink';
import IntroScreen from './components/IntroScreen.js';
import AuthScreen from './components/AuthScreen.js';
import ChatScreen from './components/ChatScreen.js';
import SettingsScreen from './components/SettingsScreen.js';
import StealthScreen from './components/StealthScreen.js';
import {useAuth} from './hooks/useAuth.js';

export default function App() {
	const [screen, setScreen] = useState('intro');
	const {apiKey, saveApiKey, clearApiKey} = useAuth();

	const handleIntroComplete = () => {
		if (apiKey) {
			setScreen('chat');
		} else {
			setScreen('auth');
		}
	};

	const handleAuthComplete = (key) => {
		saveApiKey(key);
		setScreen('chat');
	};

	return (
		<Box flexDirection="column" padding={1}>
			{screen === 'intro' && <IntroScreen onComplete={handleIntroComplete} />}
			{screen === 'auth' && <AuthScreen onAuth={handleAuthComplete} />}
			{screen === 'chat' && (
				<ChatScreen
					apiKey={apiKey}
					onOpenSettings={() => setScreen('settings')}
					onOpenStealth={() => setScreen('stealth')}
				/>
			)}
			{screen === 'settings' && (
				<SettingsScreen
					apiKey={apiKey}
					onSave={(key) => {
						saveApiKey(key);
						setScreen('chat');
					}}
					onClear={() => {
						clearApiKey();
						setScreen('auth');
					}}
					onBack={() => setScreen('chat')}
				/>
			)}
			{screen === 'stealth' && <StealthScreen onBack={() => setScreen('chat')} />}
		</Box>
	);
}
