import { useState, useRef, useCallback } from 'react';
import { Music, Pause } from 'lucide-react';

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = useCallback(() => {
    if (!audioRef.current) {
      // Create audio element on first interaction
      audioRef.current = new Audio('/music/proposal.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
      // Note: In production, add a real audio file URL
      // For now, we'll just show the UI toggle
    }

    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play().catch(() => {
        // Autoplay blocked or no audio source
      });
      setIsPlaying(true);
    }
  }, [isPlaying]);

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
      style={{
        background: 'rgba(250, 248, 245, 0.9)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(201, 169, 110, 0.4)',
        boxShadow: '0 2px 12px rgba(44, 36, 33, 0.08)',
      }}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      {isPlaying ? (
        <Pause className="w-5 h-5 text-gold" />
      ) : (
        <Music className="w-5 h-5 text-gold" />
      )}
      {isPlaying && (
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-burgundy animate-pulse" />
      )}
    </button>
  );
}
