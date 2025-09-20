// Create a single AudioContext to be reused
let audioCtx: AudioContext | null = null;

const initializeAudio = () => {
  // Initialize on a user action to comply with browser autoplay policies
  if (typeof window !== 'undefined' && !audioCtx) {
    try {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.error("Web Audio API is not supported in this browser");
    }
  }
};

// A simple sound for key presses
export const playKeypressSound = () => {
  initializeAudio();
  if (!audioCtx) return;

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(700, audioCtx.currentTime); // Higher pitch for typing
  gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime); // Quiet sound
  
  gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.05);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.start(audioCtx.currentTime);
  oscillator.stop(audioCtx.currentTime + 0.05);
};

// A sound for clicks or confirmations
export const playClickSound = () => {
  initializeAudio();
  if (!audioCtx) return;

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); 
  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
  
  gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.start(audioCtx.currentTime);
  oscillator.stop(audioCtx.currentTime + 0.1);
};
