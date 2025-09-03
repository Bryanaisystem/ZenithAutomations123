import React from 'react';
import { Brain, Home, Briefcase, Users, HelpCircle, Calendar, Clock, ArrowRight } from 'lucide-react';
import { NavBar } from '../components/ui/tubelight-navbar';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Define blog post interface
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  source?: string;
  sourceUrl?: string;
}

function Blog() {
  const navigate = useNavigate();
  
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
    { name: 'About', url: '/#about', icon: Users },
    { name: 'FAQ', url: '/faq', icon: HelpCircle }
  ];

  // Blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: 'blog-1',
      title: 'Five Trends in AI and Data Science for 2025',
      excerpt: 'Discover the emerging trends that will shape the AI and data science landscape in 2025, from federated learning to explainable AI systems and their impact on business operations.',
      category: 'Trends',
      date: 'March 15, 2025',
      readTime: '8 min read',
      imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2670&auto=format&fit=crop',
      source: 'MIT Sloan Management Review',
      sourceUrl: 'https://sloanreview.mit.edu/article/five-trends-in-ai-and-data-science-for-2025/'
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
      sourceUrl: 'https://www.salesforce.com/crm/best-practices/'
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
      sourceUrl: 'https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential-at-work'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-16 md:pt-20">
      {/* Fixed Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md shadow-lg">
        <nav className="container mx-auto py-3 md:py-5 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 md:space-x-3">
              <Link 
                to="/" 
                className="flex items-center space-x-2 md:space-x-3"
              >
                <Brain className="h-7 w-7 md:h-10 md:w-10 text-white" />
                <span className="text-xl md:text-2xl font-light tracking-widest">ZENITH AUTOMATIONS</span>
              </Link>
            </div>
            
            <div className="flex-1 flex justify-center px-6">
              <NavBar 
                items={navItems} 
                className="relative" 
                activeSection="blog"
                onNavClick={handleSectionNavigation}
              />
            </div>
            
            <div>
              <Link 
                to="/#contact" 
                className="px-4 py-2 md:px-8 md:py-4 bg-white text-black text-sm md:text-base tracking-wider font-medium hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                BOOK A DEMO
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Blog Header Section - Reduced vertical spacing by 50% */}
      <section className="py-10 bg-black">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-light tracking-wider mb-4 text-center">LATEST INSIGHTS</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto text-center mb-8">
            Explore our latest articles on AI innovation, automation strategies, and digital transformation.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-10 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10"
              >
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                    <span className="text-xs font-medium text-white">{post.category}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-gray-400 text-sm mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">{post.date}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                  
                  <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  {post.source && (
                    <div className="text-sm text-gray-500 mb-4">
                      Source: <span className="text-gray-400">{post.source}</span>
                    </div>
                  )}
                  
                  <a 
                    href={post.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-white hover:text-gray-300 transition-colors"
                  >
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10">
            <h2 className="text-2xl font-light tracking-wider mb-4">Looking to implement AI-driven automation?</h2>
            <p className="text-gray-400 mb-6">
              Schedule a consultation with our experts today and discover how our intelligent solutions can transform your business operations.
            </p>
            <Link 
              to="/#contact" 
              className="inline-block px-8 py-4 bg-white text-black text-base tracking-wider font-medium hover:bg-gray-200 transition-colors"
            >
              BOOK A CONSULTATION
            </Link>
          </div>
        </div>
      </section>

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
              <Link 
                to="/blog"
                className="text-sm text-white hover:text-white transition-colors"
              >
                Blog
              </Link>
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

export default Blog;