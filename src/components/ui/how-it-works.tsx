import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export function HowItWorks() {
  return (
    <div className="w-full bg-black py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6 md:mb-10"
          >
            <h2 className="text-2xl md:text-4xl font-light tracking-wider mb-3 md:mb-4">
              Experience AI in Action
            </h2>
            
            {/* CTA Button moved above the paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center my-5 md:my-6"
            >
              <a 
                href="https://creator.voiceflow.com/prototype/67b16ab2d259ea67128c4d6a"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 md:px-8 md:py-4 bg-white text-black text-sm md:text-base font-bold tracking-tight hover:bg-gray-200 transition-colors rounded-md"
                style={{
                  textRendering: "optimizeLegibility",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale"
                }}
              >
                See It In Action <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </motion.div>
            
            {/* Paragraph text now below the CTA button with proper spacing */}
            <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto mt-3 md:mt-4">
              Experience our AI-driven automation in action. See how our chatbot engages users and streamlines operations.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}