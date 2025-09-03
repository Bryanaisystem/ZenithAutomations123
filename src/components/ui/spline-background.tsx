import React, { useEffect, useState } from 'react';

interface SplineBackgroundProps {
  url: string;
  className?: string;
  variant?: 'default' | 'clean' | 'minimal';
}

export function SplineBackground({ url, className = "", variant = 'default' }: SplineBackgroundProps) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isMobile) {
    return null;
  }

  // For blog section, use a simpler background without particles
  if (variant === 'minimal') {
    return (
      <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
        <div 
          className="absolute inset-0 bg-black/10"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)',
          }}
        />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      <div 
        className={`absolute inset-0 z-10 ${
          variant === 'clean' 
            ? 'bg-black/20' 
            : 'backdrop-blur-[1px] bg-black/10'
        }`} 
      />
      <spline-viewer
        url={url}
        loading-anim="true"
        hide-controls="true"
        hide-ui="true"
        events-target="none"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          filter: variant === 'clean' ? 'brightness(1.2)' : 'brightness(1.4)'
        }}
      />
    </div>
  );
}