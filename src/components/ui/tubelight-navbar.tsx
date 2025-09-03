import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: React.ElementType;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
  activeSection?: string;
  onNavClick?: (e: React.MouseEvent, targetId: string | null) => void;
}

export function NavBar({ items, className, activeSection = 'home', onNavClick }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.pathname === '/faq') {
      setActiveTab('FAQ');
      return;
    } else if (location.pathname === '/about') {
      setActiveTab('About');
      return;
    } else if (location.pathname === '/services-info') {
      setActiveTab('Services');
      return;
    }
    
    const matchingItem = items.find(item => {
      if (item.name === 'Home' && activeSection === 'home') {
        return true;
      }
      return item.url === `#${activeSection}` || item.url === `/#${activeSection}`;
    });
    
    if (matchingItem) {
      setActiveTab(matchingItem.name);
    }
  }, [activeSection, items, location.pathname]);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavItemClick = async (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault();
    setActiveTab(item.name);
    
    // Function to smoothly scroll to a section
    const smoothScrollToSection = (element: HTMLElement) => {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      return new Promise<void>((resolve) => {
        const startPosition = window.pageYOffset;
        const distance = offsetPosition - startPosition;
        const duration = 1000; // Animation duration in milliseconds
        let startTime: number | null = null;
        
        // Easing function for smooth animation
        const easeInOutQuad = (t: number): number => {
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        };
        
        // Animation function
        const animate = (currentTime: number) => {
          if (startTime === null) startTime = currentTime;
          
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          const easedProgress = easeInOutQuad(progress);
          
          window.scrollTo(0, startPosition + distance * easedProgress);
          
          if (timeElapsed < duration) {
            requestAnimationFrame(animate);
          } else {
            window.scrollTo(0, offsetPosition);
            resolve();
          }
        };
        
        requestAnimationFrame(animate);
      });
    };

    // Handle About navigation
    if (item.name === 'About') {
      navigate('/about');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    // Handle FAQ navigation
    if (item.name === 'FAQ') {
      navigate('/faq');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    
    // Handle other navigation items
    if (onNavClick) {
      if (item.name === 'Home') {
        navigate('/');
        setTimeout(() => {
          const startPosition = window.pageYOffset;
          const duration = 1000;
          let startTime: number | null = null;
          
          const animate = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
            
            window.scrollTo(0, startPosition * (1 - easedProgress));
            
            if (timeElapsed < duration) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }, 100);
        return;
      } 
      
      if (item.url.startsWith('/#')) {
        const targetId = item.url.substring(2);
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            smoothScrollToSection(element);
          }
        }, 100);
        return;
      }
      
      if (item.url.startsWith('#')) {
        const targetId = item.url.substring(1);
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            smoothScrollToSection(element);
          }
        }, 100);
        return;
      }

      // Handle direct navigation for other pages
      if (item.url.startsWith('/')) {
        navigate(item.url);
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
    }
  };

  return (
    <div className={cn("z-50", className)}>
      <div className={cn(
        "flex items-center bg-black/80 backdrop-blur-sm rounded-[28px] p-1",
        isMobile ? "justify-around w-full gap-0" : "gap-1"
      )}>
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;
          
          return (
            <button
              key={item.name}
              onClick={(e) => handleNavItemClick(e, item)}
              className={cn(
                "relative cursor-pointer tracking-wider font-medium rounded-[24px] transition-all duration-300 whitespace-nowrap flex items-center justify-center",
                isMobile ? "flex-1 flex-col py-2 px-1" : "px-4 py-2",
                "text-white/80 hover:text-white",
                isActive && "text-white",
                !isMobile && "text-xs"
              )}
              style={isMobile ? {
                fontSize: '0.96rem',
                transform: 'scale(1.2)',
                transformOrigin: 'center center'
              } : {
                fontSize: '0.8rem',
                transform: 'scale(0.8)',
                transformOrigin: 'center center'
              }}
            >
              {isMobile ? (
                <>
                  <Icon size={16} strokeWidth={2} className="mb-1" />
                  <span className="text-[11px]">{item.name}</span>
                </>
              ) : (
                <>
                  <span className="hidden md:inline text-xs">{item.name}</span>
                  <span className="md:hidden">
                    <Icon size={13} strokeWidth={2} />
                  </span>
                </>
              )}
              {isActive && (
                <motion.div
                  layoutId="nav-highlight"
                  className="absolute inset-0 w-full bg-white/[0.06] rounded-[24px] -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    mass: 0.8,
                  }}
                >
                  {/* Base highlight layer */}
                  <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/[0.08] to-transparent" />
                  
                  {/* Even top highlight */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10" />
                  
                  {/* Uniform inner glow */}
                  <div 
                    className="absolute inset-0 rounded-[24px]"
                    style={{
                      background: "radial-gradient(50% 100% at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 100%)",
                      transform: "translateZ(0)",
                      willChange: "transform, opacity"
                    }}
                  />
                  
                  {/* Consistent edge highlight */}
                  <div className="absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/[0.04]" />
                </motion.div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}