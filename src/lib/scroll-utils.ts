/**
 * Utility functions for smooth scrolling
 */

interface ScrollOptions {
  offset?: number;
  duration?: number;
  easing?: (t: number) => number;
}

const DEFAULT_OPTIONS: ScrollOptions = {
  offset: 80,
  duration: 1000,
  easing: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
};

/**
 * Enhanced smooth scroll function with better animation control
 */
export const smoothScrollTo = async (
  targetId: string | null,
  options: ScrollOptions = {}
): Promise<void> => {
  const { offset, duration, easing } = { ...DEFAULT_OPTIONS, ...options };

  return new Promise((resolve) => {
    let element: Element | null = null;
    
    if (targetId === null) {
      // Scroll to top
      const startPosition = window.pageYOffset;
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration!, 1);
        const easedProgress = easing!(progress);
        
        window.scrollTo(0, startPosition * (1 - easedProgress));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          window.scrollTo(0, 0);
          resolve();
        }
      };
      
      const startTime = performance.now();
      requestAnimationFrame(animate);
      return;
    } else if (targetId === 'home') {
      element = document.querySelector('.hero-section');
    } else {
      element = document.getElementById(targetId);
    }
    
    if (!element) {
      console.error(`Target element with ID "${targetId}" not found`);
      resolve();
      return;
    }
    
    const startPosition = window.scrollY;
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset!;
    const distance = targetPosition - startPosition;
    
    // Animation function
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration!, 1);
      const easedProgress = easing!(progress);
      
      window.scrollTo(0, startPosition + distance * easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        window.scrollTo(0, targetPosition);
        resolve();
      }
    };
    
    const startTime = performance.now();
    requestAnimationFrame(animate);
  });
};

/**
 * Updates the URL hash without triggering a scroll
 */
export const handleNavigation = async (
  targetId: string | null,
  setActiveSection?: (section: string) => void,
  options: ScrollOptions = {},
  isLogo: boolean = false
): Promise<void> => {
  // Update active section if provided
  if (setActiveSection) {
    setActiveSection(targetId === null ? 'home' : targetId);
  }

  // For logo clicks, always scroll to top with a faster duration
  const scrollOptions = isLogo ? { ...options, duration: 800 } : options;

  try {
    await smoothScrollTo(targetId, scrollOptions);
  } catch (error) {
    console.error('Navigation error:', error);
    // Fallback to instant scroll
    window.scrollTo({
      top: targetId === null ? 0 : document.getElementById(targetId)?.offsetTop ?? 0,
      behavior: 'instant'
    });
  }
};