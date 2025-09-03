import React, { useEffect, useState } from 'react';
import { Brain, Home, Briefcase, Users, HelpCircle, FileText } from 'lucide-react';
import { NavBar } from '../components/ui/tubelight-navbar';
import { VoiceflowChat } from '../components/ui/voiceflow-chat';
import { Link, useNavigate } from 'react-router-dom';
import { Faq3 } from '@/components/blocks/faq3';

function Faq() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  
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
  
  // Handle navigation to main page sections
  const handleSectionNavigation = (e: React.MouseEvent, section: string | null) => {
    e.preventDefault();
    if (section === null) {
      // Navigate to home page
      navigate('/');
    } else {
      // Navigate to specific section on home page
      navigate(`/#${section}`);
    }
  };

  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Services', url: '/#services', icon: Briefcase },
    { name: 'Blog', url: '/#blog', icon: FileText },
    { name: 'About', url: '/about', icon: Users },
    { name: 'FAQ', url: '/faq', icon: HelpCircle }
  ];

  // Custom FAQ data for Zenith Automations
  const faqData = {
    heading: "Frequently Asked Questions",
    description: "Find answers to common questions about our AI solutions. Can't find what you're looking for? Contact our support team for personalized assistance.",
    items: [
      {
        id: "faq-1",
        question: "What is AI automation?",
        answer: "AI automation uses artificial intelligence to perform routine tasks and optimize processes, saving time and increasing efficiency."
      },
      {
        id: "faq-2",
        question: "How can AI automation benefit my business?",
        answer: "It streamlines operations and reduces manual work, allowing you to focus on growth and strategy."
      },
      {
        id: "faq-3",
        question: "Is AI automation difficult to implement?",
        answer: "No, modern AI solutions are designed for easy integration with your existing systems."
      },
      {
        id: "faq-4",
        question: "Will AI automation save me time?",
        answer: "Yes, by automating repetitive tasks, you can dedicate more time to core business activities."
      },
      {
        id: "faq-5",
        question: "Can AI automation improve customer service?",
        answer: "Absolutely—AI chatbots provide quick, accurate responses 24/7, enhancing customer satisfaction."
      },
      {
        id: "faq-6",
        question: "How does AI handle repetitive tasks?",
        answer: "AI systems learn patterns and execute tasks with precision, reducing errors and boosting speed."
      },
      {
        id: "faq-7",
        question: "Is AI automation secure?",
        answer: "Yes, robust security protocols are in place to ensure your data remains protected."
      },
      {
        id: "faq-8",
        question: "Which industries can benefit from AI automation?",
        answer: "Almost any industry can benefit, including retail, finance, healthcare, and manufacturing."
      },
      {
        id: "faq-9",
        question: "Do I need technical expertise to use AI automation?",
        answer: "No, modern tools are user-friendly and come with support, making them accessible even to non-technical users."
      },
      {
        id: "faq-10",
        question: "How can I get started with AI automation?",
        answer: "Start with a consultation to assess your needs and determine the best AI tools for your business."
      }
    ],
    supportHeading: "Need specialized assistance?",
    supportDescription: "Our AI experts are ready to help you solve your most complex automation challenges. Schedule a consultation to discuss your specific requirements.",
    supportButtonText: "Book A Consultation",
    supportButtonUrl: "/consultation"
  };

  return (
    <div className="min-h-screen bg-black text-white pt-16 md:pt-20">
      <VoiceflowChat />
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md shadow-lg">
        <nav className="container mx-auto py-2 md:py-5 px-3 md:px-4">
          <div className="flex justify-between items-center">
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
                <NavBar 
                  items={navItems} 
                  className="relative" 
                  activeSection="faq"
                  onNavClick={handleSectionNavigation}
                />
              </div>
            )}
            
            <div>
              <Link 
                to="/consultation"
                className="px-3 py-1.5 md:px-6 md:py-3 bg-white text-black text-[1rem] font-bold tracking-tight transition-all duration-300 whitespace-nowrap border-2 border-transparent hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.7)] transform hover:-translate-y-[2px]"
                style={{
                  textRendering: "optimizeLegibility",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale"
                }}
              >
                {isMobile ? "CONSULT" : "BOOK A CONSULTATION"}
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* FAQ Section with shadcn component */}
      <Faq3 {...faqData} />

      {/* Mobile Navigation Bar - Fixed at Bottom */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-t border-white/10 py-2">
          <div className="container mx-auto px-2">
            <NavBar 
              items={navItems} 
              className="relative" 
              activeSection="faq"
              onNavClick={handleSectionNavigation}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <Brain className="h-6 w-6 text-white" />
              <span className="text-lg font-light tracking-widest">ZENITH AUTOMATIONS</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.url}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="text-center text-gray-500 text-sm">
              <p>© {new Date().getFullYear()} Zenith Automations. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Faq;