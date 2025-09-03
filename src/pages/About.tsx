import React, { useEffect, useState } from 'react';
import { Brain, Home, Briefcase, Users, HelpCircle, FileText } from 'lucide-react';
import { NavBar } from '../components/ui/tubelight-navbar';
import { VoiceflowChat } from '../components/ui/voiceflow-chat';
import { Link, useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  
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
  
  const handleSectionNavigation = (e: React.MouseEvent, section: string | null) => {
    e.preventDefault();
    if (section === null) {
      navigate('/');
    } else {
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
                  activeSection="about"
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

      <div className="py-8 bg-black border-b border-white/10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wider text-center">About Us</h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mt-4 text-center">
            Revolutionizing business automation with cutting-edge AI solutions designed for seamless efficiency and growth.
          </p>
        </div>
      </div>

      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-light tracking-wider mb-6 text-center md:text-left">Our Mission</h2>
              <p className="text-gray-400 mb-6">
                At Zenith Automations, we empower businesses with intelligent AI solutions that optimize workflows, enhance customer interactions, and drive growth. Our mission is to make advanced automation accessible, transforming operations into seamless, data-driven experiences.
              </p>
              <p className="text-gray-400">
                We are committed to providing businesses with powerful automation solutions. We integrate AI-driven tools that optimize efficiency, reduce operational overhead, and improve customer engagement. With expertise in AI automation, CRM integration, and intelligent web solutions, we help companies stay ahead in the evolving digital landscape.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop" 
                alt="Team collaboration" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light tracking-wider mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-center">Innovation</h3>
              <p className="text-gray-400 text-center">
                We constantly push the boundaries of what's possible with AI, developing cutting-edge solutions that solve real-world problems in novel ways.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-center">Accessibility</h3>
              <p className="text-gray-400 text-center">
                We believe advanced AI should be accessible to businesses of all sizes, not just tech giants with unlimited resources.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-center">Integrity</h3>
              <p className="text-gray-400 text-center">
                We're committed to ethical AI development and transparent business practices that build trust with our clients and partners.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-center">Excellence</h3>
              <p className="text-gray-400 text-center">
                We strive for excellence in everything we do, from code quality to customer service, ensuring our solutions exceed expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-light tracking-wider mb-6">Partner With Us</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Looking to transform your business with AI-powered automation? Let's build the future together. Contact us today to see how Zenith Automations can revolutionize your operations.
          </p>
          <Link 
            to="/consultation" 
            className="inline-block px-8 py-4 bg-white text-black text-base font-bold tracking-tight hover:bg-gray-200 transition-colors"
            style={{
              textRendering: "optimizeLegibility",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale"
            }}
          >
            Book A Consultation
          </Link>
        </div>
      </section>

      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-t border-white/10 py-2">
          <div className="container mx-auto px-2">
            <NavBar 
              items={navItems} 
              className="relative" 
              activeSection="about"
              onNavClick={handleSectionNavigation}
            />
          </div>
        </div>
      )}

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

export default About;