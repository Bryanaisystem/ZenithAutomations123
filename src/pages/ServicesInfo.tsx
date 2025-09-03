import React, { useEffect, useState } from 'react';
import { Brain, Home, Briefcase, Users, HelpCircle, FileText } from 'lucide-react';
import { NavBar } from '../components/ui/tubelight-navbar';
import { VoiceflowChat } from '../components/ui/voiceflow-chat';
import { Link, useNavigate } from 'react-router-dom';
import { Timeline } from '../components/ui/timeline';

function ServicesInfo() {
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

  const timelineData = [
    {
      title: "AI Chatbots",
      content: (
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 mb-10" id="ai-chatbot-section">
          <h3 className="text-xl font-semibold mb-4">AI Chatbots: Automate Customer Engagement</h3>
          <p className="text-gray-400 mb-6">
            Our AI Chatbots streamline customer engagement by delivering tailored responses and capturing leads 24/7.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">1</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Tailored Responses</h4>
                <p className="text-gray-400 text-sm">AI-powered responses that adapt to customer inquiries with human-like understanding</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">2</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Lead Capture</h4>
                <p className="text-gray-400 text-sm">Automatically collect and qualify leads through natural conversation</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">3</span>
              </div>
              <div>
                <h4 className="font-medium text-white">24/7 Customer Support</h4>
                <p className="text-gray-400 text-sm">Provide instant assistance to customers at any time, improving satisfaction</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">4</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Seamless Integration</h4>
                <p className="text-gray-400 text-sm">Connect with your CRM and email systems for unified customer data</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">5</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Automated Scheduling</h4>
                <p className="text-gray-400 text-sm">Allow customers to book appointments directly through the chatbot</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">6</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Multichannel Communication</h4>
                <p className="text-gray-400 text-sm">Deploy across website, social media, and messaging platforms</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">7</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Data Insights & Analytics</h4>
                <p className="text-gray-400 text-sm">Gain valuable customer insights from conversation data</p>
              </div>
            </li>
          </ul>
        </div>
      )
    },
    {
      title: "CRM Integration",
      content: (
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 mb-10" id="crm-integration-section">
          <h3 className="text-xl font-semibold mb-4">Optimized CRM Workflows with AI Automation</h3>
          <p className="text-gray-400 mb-6">
            Enhance your customer relationship management with AI-powered automation that streamlines workflows and optimizes lead management.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">1</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Full CRM Setup & Configuration</h4>
                <p className="text-gray-400 text-sm">Complete system setup tailored to your business requirements</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">2</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Data Migration & Cleaning</h4>
                <p className="text-gray-400 text-sm">Transfer and optimize your existing customer data</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">3</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Custom Workflow Automation</h4>
                <p className="text-gray-400 text-sm">Automate repetitive tasks and create efficient processes</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">4</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Team Training & Onboarding</h4>
                <p className="text-gray-400 text-sm">Comprehensive training to ensure your team maximizes CRM benefits</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">5</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Seamless Integration with Existing Tools</h4>
                <p className="text-gray-400 text-sm">Connect with your current software ecosystem</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">6</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Ongoing Technical Support</h4>
                <p className="text-gray-400 text-sm">Continuous assistance and system optimization</p>
              </div>
            </li>
          </ul>
        </div>
      )
    },
    {
      title: "Website Creation",
      content: (
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 mb-10" id="website-creation-section">
          <h3 className="text-xl font-semibold mb-4">AI-Powered Websites Built for Growth</h3>
          <p className="text-gray-400 mb-6">
            Build a high-performance, conversion-optimized website with our AI-driven design and automation tools.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">1</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Custom Website Design</h4>
                <p className="text-gray-400 text-sm">Professionally designed websites tailored to your brand</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">2</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Mobile-Responsive Layouts</h4>
                <p className="text-gray-400 text-sm">Optimized for all devices and screen sizes</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">3</span>
              </div>
              <div>
                <h4 className="font-medium text-white">AI Chatbot Integration</h4>
                <p className="text-gray-400 text-sm">Enhance user experience with intelligent chat assistance</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">4</span>
              </div>
              <div>
                <h4 className="font-medium text-white">CRM & Email Automation Sync</h4>
                <p className="text-gray-400 text-sm">Seamless connection with your marketing systems</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">5</span>
              </div>
              <div>
                <h4 className="font-medium text-white">User-Friendly CMS</h4>
                <p className="text-gray-400 text-sm">Easy content management for your team</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">7</span>
              </div>
              <div>
                <h4 className="font-medium text-white">E-commerce & Lead-Gen Capabilities</h4>
                <p className="text-gray-400 text-sm">Built-in tools to drive conversions and sales</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">8</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Ongoing Maintenance & Security</h4>
                <p className="text-gray-400 text-sm">Regular updates and security monitoring</p>
              </div>
            </li>
          </ul>
        </div>
      )
    }
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
                  activeSection="services"
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

      <div className="py-12 bg-black border-b border-white/10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wider text-center">Service Details</h1>
        </div>
      </div>

      <div className="w-full bg-black dark:bg-neutral-950 font-sans md:px-10">
        <Timeline data={timelineData} />
      </div>

      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:transform hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <h3 className="text-xl font-semibold mb-4">AI CHATBOTS</h3>
              <p className="text-gray-400 mb-6">
                Our AI Chatbots streamline customer engagement by delivering tailored responses and capturing leads 24/7.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">•</span>
                  <span className="text-gray-300">Tailored responses with human-like understanding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">•</span>
                  <span className="text-gray-300">Automated lead capture and qualification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">•</span>
                  <span className="text-gray-300">24/7 instant customer support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">•</span>
                  <span className="text-gray-300">Seamless CRM integration</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:transform hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <h3 className="text-xl font-semibold mb-4">CRM INTEGRATION</h3>
              <p className="text-gray-400 mb-6">
                Streamline your customer relationships with our powerful CRM integration services, optimizing workflows and improving satisfaction.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">•</span>
                  <span className="text-gray-300">Full system setup and configuration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">•</span>
                  <span className="text-gray-300">Data migration and cleaning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">•</span>
                  <span className="text-gray-300">Custom workflow automation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">•</span>
                  <span className="text-gray-300">Comprehensive team training</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:transform hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <h3 className="text-xl font-semibold mb-4">WEBSITE CREATION</h3>
              <p className="text-gray-400 mb-6">
                Professional, high-performance websites tailored to your business needs, optimized for conversion and user experience.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">•</span>
                  <span className="text-gray-300">Custom responsive design</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">•</span>
                  <span className="text-gray-300">Content management system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">•</span>
                  <span className="text-gray-300">E-commerce functionality</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-light tracking-wider mb-6">READY TO TRANSFORM YOUR BUSINESS?</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Our team of AI experts is ready to help you implement intelligent automation solutions tailored to your specific needs.
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
            BOOK A CONSULTATION
          </Link>
        </div>
      </section>

      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-t border-white/10 py-2">
          <div className="container mx-auto px-2">
            <NavBar 
              items={navItems} 
              className="relative" 
              activeSection="services"
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

export default ServicesInfo;