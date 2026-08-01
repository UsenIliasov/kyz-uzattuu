import { useState, useEffect } from 'react';
import { Music, Pause } from 'lucide-react';
import { getAudio } from '../lib/music';

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = getAudio();

    if (!audio) return;

    setIsPlaying(!audio.paused);

    const play = () => setIsPlaying(true);
    const pause = () => setIsPlaying(false);

    audio.addEventListener('play', play);
    audio.addEventListener('pause', pause);

    return () => {
      audio.removeEventListener('play', play);
      audio.removeEventListener('pause', pause);
    };
  }, []);

  const toggle = () => {
    const audio = getAudio();

    if (!audio) return;

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  return ( <button onClick={toggle} className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer" style={{ background: 'rgba(250, 248, 245, 0.9)', backdropFilter: 'blur(8px)', border: '1px solid rgba(201, 169, 110, 0.4)', boxShadow: '0 2px 12px rgba(44, 36, 33, 0.08)', }} aria-label={isPlaying ? 'Pause music' : 'Play music'} > {isPlaying ? ( <Pause className="w-5 h-5 text-gold" /> ) : ( <Music className="w-5 h-5 text-gold" /> )} {isPlaying && ( <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-burgundy animate-pulse" /> )} </button> ); }