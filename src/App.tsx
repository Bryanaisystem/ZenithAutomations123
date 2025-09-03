import React, { useState, useEffect } from 'react';
import { 
  Brain,
  Home,
  Briefcase,
  Users,
  HelpCircle,
  FileText
} from 'lucide-react';
import { Hero } from './components/ui/animated-hero';
import { NavBar } from './components/ui/tubelight-navbar';
import { Services } from './components/ui/services';
import { BlogSection } from './components/ui/blog-section';
import { GeometricCta } from './components/ui/geometric-cta';
import { motion, AnimatePresence } from 'framer-motion';
import { VoiceflowChat } from './components/ui/voiceflow-chat';
import { handleNavigation } from './lib/scroll-utils';
import { Link } from 'react-router-dom';

const SECTION_IDS = {
  HOME: 'home',
  SERVICES: 'services',
  BLOG: 'blog',
  CONTACT: 'contact'
};

const servicePlans = [
  {
    name: "AI CHATBOT",
    price: "999",
    yearlyPrice: "799",
    period: "per month",
    features: [
      "Tailored responses",
      "Automated lead capture",
      "24/7 customer support",
      "Seamless integration",
      "Intelligent query handling",
      "Multi-channel deployment",
      "Instant response time"
    ],
    description: "Attract and convert high-quality leads for your business",
    buttonText: "Learn More",
    href: "/services-info#ai-chatbot-section",
    isPopular: false,
  },
  {
    name: "CRM INTEGRATION",
    price: "1499",
    yearlyPrice: "1199",
    period: "per month",
    features: [
      "Automated data flow",
      "Intelligent follow-ups",
      "Seamless tool integrations",
      "Custom workflow automations",
      "Sales pipeline management",
      "Scalable architecture"
    ],
    description: "Streamline your customer relationships with powerful CRM solutions",
    buttonText: "Learn More",
    href: "/services-info#crm-integration-section",
    isPopular: true,
  },
  {
    name: "WEBSITE CREATION",
    price: "2499",
    yearlyPrice: "1999",
    period: "per project",
    features: [
      "Custom designs",
      "Mobile-responsive layout",
      "AI chatbot integration",
      "CRM & email integration",
      "Easy content management",
      "Ongoing support & maintenance",
    ],
    description: "Professional, high-performance websites tailored to your business",
    buttonText: "Learn More",
    href: "/services-info#website-creation-section",
    isPopular: false,
  },
];

const blogPosts = [
  {
    id: 'blog-1',
    title: 'Five Trends in AI and Data Science for 2025',
    excerpt: 'Discover the emerging trends that will shape the AI and data science landscape in 2025, from federated learning to explainable AI systems and their impact on business operations.',
    category: 'Trends',
    date: 'March 15, 2025',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2670&auto=format&fit=crop',
    source: 'MIT Sloan Management Review',
    externalUrl: 'https://sloanreview.mit.edu/article/five-trends-in-ai-and-data-science-for-2025/'
  },
  {
    id: 'blog-2',
    title: '8 CRM Best Practices For Your Business',
    excerpt: 'Implement these proven CRM strategies to enhance customer relationships, streamline sales processes, and drive revenue growth through data-driven decision making and automation.',
    category: 'Guides',
    date: 'February 28, 2025',
    readTime: '10 min read',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop',
    source: 'Salesforce',
    externalUrl: 'https://www.salesforce.com/crm/best-practices/'
  },
  {
    id: 'blog-3',
    title: 'AI in the Workplace: A Report for 2025',
    excerpt: 'This comprehensive analysis examines how AI is transforming workplace dynamics, productivity metrics, and the evolving relationship between human workers and intelligent systems.',
    category: 'Reports',
    date: 'January 10, 2025',
    readTime: '12 min read',
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2669&auto=format&fit=crop',
    source: 'McKinsey & Company',
    externalUrl: 'https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential-at-work'
  }
];

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(SECTION_IDS.HOME);

  const handleNavWithActiveUpdate = (e: React.MouseEvent, targetId: string | null) => {
    e.preventDefault();
    handleNavigation(targetId, setActiveSection, {}, targetId === null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    handleResize();
    handleScroll();

    // Add scroll event listener for section highlighting
    const handleScrollForHighlight = () => {
      const scrollPosition = window.scrollY + 100;

      // Get all sections
      const sections = [
        { id: 'home', element: document.querySelector('.hero-section') },
        { id: 'services', element: document.getElementById('services') },
        { id: 'blog', element: document.getElementById('blog') }
      ];

      // Find the current section by checking which one is most visible
      let currentSection = sections[0].id;
      let maxVisibility = 0;

      sections.forEach(({ id, element }) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          const visibility = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
          
          if (visibility > maxVisibility) {
            maxVisibility = visibility;
            currentSection = id;
          }
        }
      });

      setActiveSection(currentSection);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScrollForHighlight, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollForHighlight);
    };
  }, []);

  const navItems = [
    { name: 'Home', url: '#', icon: Home },
    { name: 'Services', url: '#services', icon: Briefcase },
    { name: 'Blog', url: '#blog', icon: FileText },
    { name: 'About', url: '/about', icon: Users },
    { name: 'FAQ', url: '/faq', icon: HelpCircle }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-16 md:pt-20">
      <VoiceflowChat />
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-black'}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <nav className="container mx-auto py-2 md:py-5 px-3 md:px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link 
                to="/" 
                onClick={(e) => handleNavWithActiveUpdate(e, null)}
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
                  activeSection={activeSection}
                  onNavClick={handleNavWithActiveUpdate}
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
      </motion.header>

      <section className="hero-section relative min-h-[calc(100vh-80px)]" id={SECTION_IDS.HOME}>
        <Hero setActiveSection={setActiveSection} />
      </section>

      {isMobile && (
        <motion.div 
          className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-t border-white/10 py-2"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="container mx-auto px-2">
            <NavBar 
              items={navItems} 
              className="relative" 
              activeSection={activeSection}
              onNavClick={handleNavWithActiveUpdate}
            />
          </div>
        </motion.div>
      )}

      <section id={SECTION_IDS.SERVICES} className="py-0 bg-black flex justify-center items-center w-full relative">
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute inset-0 z-10 backdrop-blur-[1px] bg-black/40" />
          <spline-viewer 
            url="https://prod.spline.design/B0A4Sy0dCwf3ktL2/scene.splinecode"
            loading-anim="true"
            hide-controls="true"
            hide-ui="true"
            events-target="none"
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              filter: 'brightness(1.4)'
            }}
          />
        </div>

        <div className="w-full max-w-7xl mx-auto relative z-20">
          <Services 
            plans={servicePlans}
            title="OUR SERVICES"
            description="Every day without automation is a step behind the competition. In today's digital landscape, growth depends on smarter, faster solutions. Choose the service that will propel your business forward"
          />
        </div>
      </section>

      <section id={SECTION_IDS.BLOG} className="py-10 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-2">LATEST INSIGHTS</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Explore our latest articles on AI innovation, automation strategies, and digital transformation.
            </p>
          </div>
          <BlogSection posts={blogPosts} />
        </div>
      </section>

      <section id={SECTION_IDS.CONTACT} className="py-0 bg-black">
        <GeometricCta />
      </section>

      <footer className="bg-black text-white py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <Brain className="h-6 w-6 text-white" />
              <span className="text-lg font-light tracking-widest">ZENITH AUTOMATIONS</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
              {navItems.map((item) => (
                item.url.startsWith('/') ? (
                  <Link
                    key={item.name}
                    to={item.url}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a 
                    key={item.name} 
                    href={item.url}
                    className={`text-sm ${activeSection === (item.name === 'Home' ? SECTION_IDS.HOME : item.url.substring(1)) ? 'text-white' : 'text-gray-400'} hover:text-white transition-colors`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.name === 'Home') {
                        handleNavWithActiveUpdate(e, null);
                      } else if (item.url.startsWith('/#')) {
                        handleNavWithActiveUpdate(e, item.url.substring(2));
                      } else if (item.url.startsWith('#')) {
                        handleNavWithActiveUpdate(e, item.url.substring(1));
                      }
                    }}
                  >
                    {item.name}
                  </a>
                )
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

export default App;