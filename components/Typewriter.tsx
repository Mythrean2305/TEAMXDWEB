import React, { useState, useEffect } from 'react';
import { playKeypressSound } from '../utils/sounds';

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  onFinished?: () => void;
  start?: boolean;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 20, className = '', onFinished, start = true }) => {
  const [displayText, setDisplayText] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!start) return;
    
    let i = 0;
    if (displayText.length > 0) return; // Prevent re-triggering

    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        if (text.charAt(i) !== ' ') {
            playKeypressSound();
        }
        i++;
      } else {
        clearInterval(typingInterval);
        setIsFinished(true);
        if (onFinished) {
          onFinished();
        }
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, onFinished, start]);

  return <span className={`${className} ${!isFinished ? 'cursor-blink' : ''}`}>{displayText}</span>;
};

export default Typewriter;