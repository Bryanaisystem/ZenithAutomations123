import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Button } from "./button";
import { handleNavigation } from "../../lib/scroll-utils";

interface HeroProps {
  setActiveSection?: (section: string) => void;
}

function Hero({ setActiveSection }: HeroProps) {
  const [titleNumber, setTitleNumber] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const titles = useMemo(
    () => ["INTELLIGENT AUTOMATION", "SEAMLESS OPTIMIZATION", "EFFORTLESS EXECUTION"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  // Detect mobile devices
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle navigation with active section update
  const handleNavWithActiveUpdate = (e: React.MouseEvent, targetId: string) => {
    if (setActiveSection) {
      e.preventDefault();
      handleNavigation(targetId, setActiveSection);
    } else {
      e.preventDefault();
      handleNavigation(targetId);
    }
  };

  return (
    <div className="w-full h-full relative">
      {/* Spline animation container - Full screen with absolute positioning */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          opacity: isMobile ? 0.3 : 1 // Reduce opacity on mobile for better text visibility
        }}
      >
        <spline-viewer 
          url="https://prod.spline.design/TuA-6gmrCKhClTLz/scene.splinecode"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
          loading-anim="true"
          hide-controls="true"
          hide-ui="true"
          events-target="none"
        ></spline-viewer>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex gap-4 md:gap-6 pt-6 pb-16 lg:pt-12 lg:pb-32 items-center justify-center flex-col min-h-[calc(100vh-80px)]">
          <div className="flex gap-3 flex-col max-w-5xl mx-auto mt-4 md:mt-0 px-4 md:px-0">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight font-light leading-tight mb-2 text-white">
                <span>STREAMLINE YOUR WORKFLOW, MAXIMIZE TIME WITH</span>
              </h1>
              <div className="h-12 sm:h-14 md:h-16 lg:h-20 relative flex justify-center overflow-hidden">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </div>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto text-center font-normal mt-3 px-3">
              Running a business should be about growth, not getting stuck in repetitive tasks. Zenith Automations delivers AI-powered solutions that optimize workflows, reduce costs, reclaim time and accelerate growth.
            </p>
          </div>
          <div className="flex justify-center w-full px-4">
            <Button 
              size="lg" 
              className="px-5 sm:px-6 py-2.5 bg-white text-black text-base font-bold tracking-tight border-2 border-transparent hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.7)] transform hover:-translate-y-[2px] transition-all duration-300 flex items-center justify-center scale-80"
              onClick={(e) => handleNavWithActiveUpdate(e as any, 'services')}
              style={{
                textRendering: "optimizeLegibility",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale"
              }}
            >
              GET STARTED
              <MoveRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };