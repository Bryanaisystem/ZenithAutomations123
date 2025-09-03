import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Add mouse move handler for service cards
if (typeof window !== 'undefined') {
  document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.service-card').forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    });
  });
}