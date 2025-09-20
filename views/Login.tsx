import React, { useState } from 'react';
import Typewriter from '../components/Typewriter';
import { playClickSound } from '../utils/sounds';

interface LoginProps {
    onLogin: (isAdmin: boolean) => void;
    onGoBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onGoBack }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        playClickSound();
        const isAdminLogin = email.toLowerCase() === 'admin@studiox.com';
        onLogin(isAdminLogin);
    };

    const handleGoBack = () => {
        playClickSound();
        onGoBack();
    }

    return (
        <div>
            <h2 className="text-3xl sm:text-4xl mb-8">
                <Typewriter text="> System Access Authentication" />
            </h2>
            <p className="text-lg text-[var(--color-muted)] mb-8">Awaiting credentials...</p>

            <form onSubmit={handleLogin} className="space-y-6">
                <div className="flex items-center">
                    <span className="text-lg text-[var(--color-text)] mr-2">&gt;</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-grow bg-transparent border-b-2 border-[var(--color-input-border)] focus:border-[var(--color-text)] focus:ring-0 outline-none p-2 text-lg text-white placeholder-gray-500"
                        placeholder="Enter email..."
                        required
                    />
                </div>
                <div className="flex items-center">
                    <span className="text-lg text-[var(--color-text)] mr-2">&gt;</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="flex-grow bg-transparent border-b-2 border-[var(--color-input-border)] focus:border-[var(--color-text)] focus:ring-0 outline-none p-2 text-lg text-white placeholder-gray-500"
                        placeholder="Enter password..."
                        required
                    />
                </div>
                <div className="flex justify-between items-center pt-6">
                    <button type="button" onClick={handleGoBack} className="bg-[var(--color-secondary-btn-bg)] text-[var(--color-secondary-btn-text)] py-3 px-6 rounded transition duration-300 hover:bg-[var(--color-secondary-btn-hover)]">
                        Go Back
                    </button>
                    <button type="submit" disabled={!email || !password} className="bg-[var(--color-text)] text-[var(--color-bg)] font-bold py-3 px-6 rounded transition duration-300 hover:brightness-90 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed">
                        [AUTHENTICATE]
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;