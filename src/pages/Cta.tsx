import React, { useState, useEffect } from 'react';
import { Brain, Home, Briefcase, Users, HelpCircle, FileText, ChevronDown, Phone, Mail, X, Loader2 } from 'lucide-react';
import { NavBar } from '../components/ui/tubelight-navbar';
import { VoiceflowChat } from '../components/ui/voiceflow-chat';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { HeroGeometric } from '@/components/ui/shape-landing-hero';
import { Popup } from '@/components/ui/popup';
import { supabase } from '@/lib/supabase';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  contactMethod: 'Phone Call' | 'Email';
  service: string;
  companyName: string;
  challenges: string;
  additionalInfo: string;
}

interface ValidationState {
  fullName: boolean;
  email: boolean;
  service: boolean;
  challenges: boolean;
  companyName: boolean;
}

function Cta() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    contactMethod: 'Phone Call',
    service: '',
    companyName: '',
    challenges: '',
    additionalInfo: ''
  });
  const [validation, setValidation] = useState<ValidationState>({
    fullName: true,
    email: true,
    service: true,
    challenges: true,
    companyName: true
  });
  const [charCount, setCharCount] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  
  const handleSectionNavigation = (e: React.MouseEvent, targetId: string | null) => {
    e.preventDefault();
    
    const navigateToHome = () => {
      navigate('/');
      setTimeout(() => {
        if (targetId === null) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.getElementById(targetId);
          if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      }, 100);
    };

    if (targetId === null) {
      navigateToHome();
    } else if (targetId === 'services' || targetId === 'blog') {
      navigateToHome();
    }
  };

  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Services', url: '/#services', icon: Briefcase },
    { name: 'Blog', url: '/#blog', icon: FileText },
    { name: 'About', url: '/about', icon: Users },
    { name: 'FAQ', url: '/faq', icon: HelpCircle }
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  useEffect(() => {
    const validations = {
      fullName: formData.fullName.trim().length > 0,
      email: isValidEmail(formData.email),
      service: formData.service.trim().length > 0,
      challenges: formData.challenges.length >= 50,
      companyName: formData.companyName.trim().length > 0
    };
    
    setValidation(validations);
    setIsFormValid(Object.values(validations).every(Boolean));
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);
    
    if (!isFormValid) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // First, submit to Supabase
      const { error } = await supabase
        .from('consultation_requests')
        .insert([{
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone || null,
          contact_method: formData.contactMethod,
          service: formData.service,
          company_name: formData.companyName,
          challenges: formData.challenges,
          additional_info: formData.additionalInfo || null
        }]);

      if (error) {
        throw error;
      }
      
      // Then, send to make.com webhook
      const webhookResponse = await fetch('https://hook.us2.make.com/uy9qmsc49r3boiqvab105vqviylnou9r', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone || null,
          contactMethod: formData.contactMethod,
          service: formData.service,
          companyName: formData.companyName,
          challenges: formData.challenges,
          additionalInfo: formData.additionalInfo || null,
          submittedAt: new Date().toISOString()
        })
      });

      if (!webhookResponse.ok) {
        throw new Error('Failed to send webhook');
      }
      
      // Show confirmation popup
      setShowConfirmation(true);
      
      // After 3 seconds, close popup and redirect
      setTimeout(() => {
        setShowConfirmation(false);
        navigate('/', { replace: true });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'challenges') {
      setCharCount(value.length);
    }
  };

  const handleContactMethodSelect = (method: 'Phone Call' | 'Email') => {
    setFormData(prev => ({ ...prev, contactMethod: method }));
    setIsDropdownOpen(false);
  };

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

  const shouldShowError = (fieldName: keyof ValidationState) => {
    return hasAttemptedSubmit && !validation[fieldName];
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <VoiceflowChat />
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md shadow-lg">
        <nav className="container mx-auto px-4 py-4 md:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link 
                to="/" 
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }}
                className="flex items-center space-x-3"
              >
                <Brain className="h-10 w-10 md:h-15 md:w-15 text-white" />
                <span className="text-xl md:text-2xl lg:text-3xl font-light tracking-[0.15em]">ZENITH AUTOMATIONS</span>
              </Link>
            </div>
            
            {!isMobile && (
              <div className="flex-1 flex justify-center px-6">
                <div className="w-[480px]">
                  <NavBar 
                    items={navItems} 
                    className="relative" 
                    activeSection="contact"
                  />
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>

      <div className="fixed inset-0 z-0">
        <HeroGeometric 
          badge=""
          title1=""
          title2=""
        />
      </div>

      <AnimatePresence>
        {showConfirmation && (
          <Popup
            isOpen={showConfirmation}
            onClose={() => {
              setShowConfirmation(false);
              navigate('/', { replace: true });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-3xl font-semibold mb-4 text-white">Thank you</h3>
                <p className="text-xl text-gray-300">
                  We will confirm your consultation as soon as possible.
                </p>
                <p className="text-xl text-gray-300">
                 Please check your spam if you don’t see the confirmation.
                </p>
              </motion.div>
            </div>
          </Popup>
        )}

        {showError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500/90 text-white px-6 py-3 rounded-lg shadow-lg backdrop-blur-sm flex items-center"
          >
            <span>Please fill out all required fields correctly.</span>
            <button 
              onClick={() => setShowError(false)}
              className="ml-3 hover:text-white/80 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-20 md:pt-28 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider mb-6">
                Schedule Your Free Consultation
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Full Name <span className="text-purple-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className={cn(
                      "w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-colors",
                      shouldShowError('fullName') ? "border-red-500" : "border-white/10"
                    )}
                    placeholder="Your full name"
                  />
                  {shouldShowError('fullName') && (
                    <p className="mt-1 text-sm text-red-500">Please enter your name</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Email Address <span className="text-purple-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={cn(
                      "w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-colors",
                      shouldShowError('email') ? "border-red-500" : "border-white/10"
                    )}
                    placeholder="your.email@example.com"
                  />
                  {shouldShowError('email') && (
                    <p className="mt-1 text-sm text-red-500">Please enter a valid email address</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Preferred Contact Method
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    >
                      <span className="flex items-center">
                        {formData.contactMethod === 'Phone Call' ? (
                          <Phone className="w-4 h-4 mr-2" />
                        ) : (
                          <Mail className="w-4 h-4 mr-2" />
                        )}
                        {formData.contactMethod}
                      </span>
                      <ChevronDown className={cn(
                        "w-4 h-4 transition-transform",
                        isDropdownOpen && "transform rotate-180"
                      )} />
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-black/90 border border-white/10 rounded-lg overflow-hidden z-50">
                        <button
                          type="button"
                          onClick={() => handleContactMethodSelect('Phone Call')}
                          className="w-full px-4 py-2 text-left hover:bg-white/10 flex items-center"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Phone Call
                        </button>
                        <button
                          type="button"
                          onClick={() => handleContactMethodSelect('Email')}
                          className="w-full px-4 py-2 text-left hover:bg-white/10 flex items-center"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Service of Interest <span className="text-purple-500">*</span>
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className={cn(
                      "w-full px-4 py-3 bg-black/50 border rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-colors",
                      shouldShowError('service') ? "border-red-500" : "border-white/10"
                    )}
                  >
                    <option value="">Select a service</option>
                    <option value="ai-agent">AI Agent</option>
                    <option value="crm-integration">CRM Integration</option>
                    <option value="website-creation">Website Creation</option>
                  </select>
                  {shouldShowError('service') && (
                    <p className="mt-1 text-sm text-red-500">Please select a service</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Company Name <span className="text-purple-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className={cn(
                      "w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-colors",
                      shouldShowError('companyName') ? "border-red-500" : "border-white/10"
                    )}
                    placeholder="Your company name"
                  />
                  {shouldShowError('companyName') && (
                    <p className="mt-1 text-sm text-red-500">Please enter your company name</p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  What specific challenges are you looking to address? <span className="text-purple-500">*</span>
                </label>
                <textarea
                  name="challenges"
                  value={formData.challenges}
                  onChange={handleInputChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 min-h-[120px] transition-colors",
                    shouldShowError('challenges') ? "border-red-500" : "border-white/10"
                  )}
                  placeholder="Describe the challenges your business is facing (minimum 50 characters)"
                />
                <div className="text-sm mt-1 flex justify-between">
                  <span className={cn(
                    "transition-colors",
                    shouldShowError('challenges') ? "text-red-500" : "text-gray-400"
                  )}>
                    Minimum 50 characters
                  </span>
                  <span className={cn(
                    "transition-colors",
                    charCount >= 50 ? "text-gray-400" : shouldShowError('challenges') ? "text-red-500" : "text-gray-400"
                  )}>
                    {charCount} / 50
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Additional Information or Special Requirements
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 min-h-[120px]"
                  placeholder="Any other details you'd like to share"
                  onNavClick={handleSectionNavigation}
                />
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full py-4 rounded-lg text-lg font-semibold flex items-center justify-center",
                    "transition-all duration-300 ease-out transform hover:-translate-y-1",
                    "relative overflow-hidden",
                    !isSubmitting
                      ? "bg-white text-black hover:bg-black hover:text-white border-2 border-transparent hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.7)]"
                      : "bg-gray-500 text-gray-300 cursor-not-allowed",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "disabled:hover:bg-gray-500 disabled:hover:text-gray-300 disabled:hover:border-transparent"
                  )}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <Loader2 className="animate-spin mr-3 h-5 w-5" />
                      <span className="relative">
                        <motion.span
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          Submitting...
                        </motion.span>
                      </span>
                    </div>
                  ) : (
                    "Schedule Consultation"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-t border-white/10 py-2">
          <div className="container mx-auto px-2">
            <NavBar 
              items={navItems} 
              className="relative" 
              activeSection="contact"
              onNavClick={handleSectionNavigation}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Cta;