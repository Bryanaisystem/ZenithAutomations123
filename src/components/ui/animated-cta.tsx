import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Briefcase, Calendar } from 'lucide-react';
import { ContactForm } from './contact-form';
import { Button } from './button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AnimatedCta() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="w-full bg-black py-6 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Horizontal Header and Description */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.22, 1, 0.36, 1],
              opacity: { duration: 0.8, delay: 0.2 }
            }}
            className="w-full mb-6 md:mb-8"
          >
            <motion.h2 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-5xl font-light tracking-wider mb-3 md:mb-4 text-center"
            >
              Experience AI-Driven Efficiency
            </motion.h2>
            
            {/* CTA Button moved above the paragraph */}
            <div className="flex justify-center my-5 md:my-6">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="px-5 py-3 md:px-8 md:py-4 bg-white text-black text-base font-bold tracking-tight hover:bg-gray-200 transition-colors flex items-center justify-center"
                    style={{
                      textRendering: "optimizeLegibility",
                      WebkitFontSmoothing: "antialiased",
                      MozOsxFontSmoothing: "grayscale"
                    }}
                  >
                    BOOK A CONSULTATION
                    <Calendar className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto w-[95%]">
                  <DialogHeader>
                    <DialogTitle className="text-xl md:text-2xl font-light tracking-wider mb-2">Book Your Free Consultation</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to schedule a consultation with our AI specialists.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <ContactForm onSuccess={() => setIsDialogOpen(false)} />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Paragraph text now below the CTA button with proper spacing */}
            <motion.p 
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-gray-300 text-base md:text-xl mt-3 md:mt-4 max-w-4xl mx-auto text-center"
            >
              Transform your business with our intelligent automation solutions. Our AI-driven systems save time, boost efficiency, and seamlessly integrate with your existing workflows.
            </motion.p>
          </motion.div>

          {/* Content Section */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
            {/* Statistics Section - Now on the LEFT */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="w-full md:w-1/2"
            >
              <div className="bg-white/5 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-white/20">
                <h3 className="text-xl md:text-2xl font-light tracking-wider mb-4 md:mb-6">Why Choose Zenith Automations</h3>
                
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div className="text-center">
                    <div className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">98%</div>
                    <p className="text-gray-400 text-sm md:text-base">Client Satisfaction</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">45%</div>
                    <p className="text-gray-400 text-sm md:text-base">Efficiency Increase</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">3x</div>
                    <p className="text-gray-400 text-sm md:text-base">ROI for Clients</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">24/7</div>
                    <p className="text-gray-400 text-sm md:text-base">Support Available</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Features Box - Now on the RIGHT */}
            <div className="w-full md:w-1/2">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-white/5 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-white/20"
              >
                <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Brain className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-2xl font-medium">Expert Consultation</h3>
                    <p className="text-gray-400 text-sm md:text-lg">Schedule a free consultation with our AI specialists</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Briefcase className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-2xl font-medium">Tailored Solutions</h3>
                    <p className="text-gray-400 text-sm md:text-lg">Custom AI implementations for your specific needs</p>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        className="px-5 py-3 md:px-8 md:py-4 bg-white text-black text-base font-bold tracking-tight hover:bg-gray-200 transition-colors flex items-center justify-center"
                        style={{
                          textRendering: "optimizeLegibility",
                          WebkitFontSmoothing: "antialiased",
                          MozOsxFontSmoothing: "grayscale"
                        }}
                      >
                        BOOK CONSULTATION
                        <Calendar className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto w-[95%]">
                      <DialogHeader>
                        <DialogTitle className="text-xl md:text-2xl font-light tracking-wider mb-2">Book Your Free Consultation</DialogTitle>
                        <DialogDescription>
                          Fill out the form below to schedule a consultation with our AI specialists.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4">
                        <ContactForm onSuccess={() => setIsDialogOpen(false)} />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}