import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export function GeometricCta() {
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile devices
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden min-h-[60vh] md:min-h-[70vh] bg-black">
      {/* Background with spline viewer */}
      <div className="absolute inset-0 w-full h-full">
        {/* Blur overlay */}
        <div className="absolute inset-0 z-10 backdrop-blur-[1px] bg-black/10" />
        
        {/* Spline animation */}
        <spline-viewer 
          url="https://prod.spline.design/8DrPnu7dQKWnQOTE/scene.splinecode"
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
            filter: 'brightness(1.4)'
          }}
        />
      </div>
      
      {/* Content overlay - centered both horizontally and vertically */}
      <div className="relative z-20 w-full h-full flex items-center justify-center">
        <div className="container mx-auto px-4 py-12 md:py-16 flex items-center justify-center">
          <div className="w-[70vw] max-w-[840px] mx-auto bg-black/40 backdrop-blur-md p-6 md:p-12 rounded-3xl border border-white/10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-6 md:mb-8"
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-light tracking-wider mb-4 md:mb-6">
                AI Is the Competitive Edge You Need!
              </h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex justify-center my-6 md:my-8"
              >
                <Link 
                  to="/consultation"
                  className="inline-flex items-center justify-center px-3 py-1.5 md:px-4 md:py-2 bg-white text-black text-sm md:text-base font-bold tracking-tight rounded-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.7)] transition-all duration-300 transform hover:-translate-y-1 scale-80"
                  style={{
                    textRendering: "optimizeLegibility",
                    WebkitFontSmoothing: "antialiased",
                    MozOsxFontSmoothing: "grayscale"
                  }}
                >
                  Book your Free Consultation Today
                  <Calendar className="ml-2 h-3 w-3 md:h-4 md:w-4" />
                </Link>
              </motion.div>
              
              <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mt-4 md:mt-6 leading-relaxed">
                Every day spent on manual tasks is a day of lost potential. AI-powered automation is no longer a luxury, it's the key to scalable growth.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}