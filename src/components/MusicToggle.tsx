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

  return (
    <button onClick={toggle}>
      {isPlaying ? <Pause /> : <Music />}
    </button>
  );
}