import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Popup({ isOpen, onClose, children }: PopupProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Backdrop with blur effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-[3px]"
        onClick={onClose}
      />

      {/* Popup content */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ 
          scale: isOpen ? 1 : 0.95, 
          opacity: isOpen ? 1 : 0,
        }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        style={{ transform: 'scale(1.25)' }}
        className="relative bg-black/90 border border-white/20 rounded-2xl p-8 max-w-md w-[90vw] shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}