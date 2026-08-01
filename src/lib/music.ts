let audio: HTMLAudioElement | null = null;

export function playMusic() {
  if (!audio) {
    audio = new Audio('/music/proposal.mp3');
    audio.loop = true;
    audio.volume = 0.3;
  }

  audio.play().catch(() => {});
}

export function pauseMusic() {
  audio?.pause();
}

export function isMusicPlaying() {
  return !!audio && !audio.paused;
}

export function getAudio() {
  return audio;
}