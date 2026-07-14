'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

// Public domain / royalty-free wedding music
const AUDIO_URL =
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

interface AudioPlayerProps {
  autoPlay?: boolean;
}

export default function AudioPlayer({ autoPlay = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(AUDIO_URL);
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = 'none';

    audio.addEventListener('canplaythrough', () => setIsLoaded(true));
    audio.addEventListener('ended', () => setIsPlaying(false));

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  // Auto-play when prop changes (after cover opens)
  useEffect(() => {
    if (autoPlay && audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Browser blocked autoplay — user must click manually
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(console.warn);
    }
  }, [isPlaying]);

  return (
    <div className="audio-player" id="audio-player">
      <button
        id="audio-toggle-btn"
        className={`audio-play-btn ${isPlaying ? 'is-playing' : ''}`}
        onClick={toggle}
        aria-label={isPlaying ? 'Pause musik' : 'Play musik'}
        title={isPlaying ? 'Pause musik' : 'Play musik'}
      >
        <span className="audio-playing-ring" aria-hidden="true" />

        {isPlaying ? (
          /* Pause icon */
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          /* Musical note icon */
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        )}
      </button>
    </div>
  );
}
