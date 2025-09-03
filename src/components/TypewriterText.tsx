import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  showCursor?: boolean;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  speed = 50, 
  className = "",
  showCursor = false
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && isComplete && (
        <span className="inline-block w-[2px] h-[1em] bg-white ml-1 animate-blink"></span>
      )}
    </span>
  );
};

export default TypewriterText;