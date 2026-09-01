'use client';

import { useState, useEffect } from 'react';

interface AudioButtonProps {
  text: string;
  lang?: 'en-US' | 'en-GB';
  rate?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function AudioButton({
  text,
  lang = 'en-US',
  rate = 0.9,
  className = '',
  size = 'md',
}: AudioButtonProps) {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
  }, []);

  if (!supported) return null;

  const playAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!text || typeof window === 'undefined') return;

    window.speechSynthesis.cancel(); // Stoppe toute lecture en cours

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate; // Vitesse légèrement modérée (0.9) pour une compréhension optimale

    // Sélection d'une voix anglaise native si disponible
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
      (v) => v.lang.startsWith(lang.slice(0, 2)) && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('English'))
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-7 h-7 text-sm',
    lg: 'w-9 h-9 text-base',
  }[size];

  return (
    <button
      type="button"
      onClick={playAudio}
      aria-label={`Écouter la prononciation de "${text}"`}
      title="Écouter la prononciation (audio natif)"
      className={`inline-flex items-center justify-center rounded-full transition-all duration-200 ${
        speaking
          ? 'bg-blue-600 text-white scale-110 shadow-md ring-2 ring-blue-300 animate-pulse'
          : 'bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-800'
      } ${sizeClasses} ${className}`}
    >
      {speaking ? (
        <svg className="w-3.5 h-3.5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      ) : (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      )}
    </button>
  );
}
