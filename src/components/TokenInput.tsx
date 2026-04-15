import React, { useState } from 'react';
import { Key, Music2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface TokenInputProps {
  onTokenSubmit: (token: string) => void;
}

export const TokenInput: React.FC<TokenInputProps> = ({ onTokenSubmit }) => {
  const [token, setToken] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      onTokenSubmit(token.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-dark p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-surface-card p-8 rounded-3xl border border-brand-800/30 shadow-2xl shadow-brand-950/50"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-brand-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-brand-600/20">
            <Music2 className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Joi Music</h1>
          <p className="text-brand-300 text-center text-sm">
            Enter your Spotify Access Token to start the experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Key className="h-5 w-5 text-brand-400" />
            </div>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-brand-950/30 border border-brand-800/50 rounded-2xl text-white placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              placeholder="Paste Access Token here..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-500 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-600/20 group"
          >
            Connect to Joi
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-brand-800/30">
          <p className="text-xs text-brand-400 text-center leading-relaxed">
            Need a token? Get one from the{' '}
            <a 
              href="https://developer.spotify.com/documentation/web-playback-sdk/tutorials/get-your-token" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brand-400 underline hover:text-brand-300"
            >
              Spotify Developer Dashboard
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
