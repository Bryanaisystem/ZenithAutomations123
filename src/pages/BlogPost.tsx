import React from 'react';
import { Brain, Home, Briefcase, Users, HelpCircle, Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { NavBar } from '../components/ui/tubelight-navbar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

// Define blog post interface
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  source?: string;
  sourceUrl?: string;
}

function BlogPost() {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  
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

  // Blog posts data - in a real app, this would come from an API or database
  const blogPosts: BlogPost[] = [
    {
      id: 'blog-1',
      title: 'Five Trends in AI and Data Science for 2025',
      excerpt: 'Discover the emerging trends that will shape the AI and data science landscape in 2025, from federated learning to explainable AI systems and their impact on business operations.',
      content: `
        <h2>The Future of AI and Data Science</h2>
        <p>As we move further into 2025, artificial intelligence and data science continue to evolve at a rapid pace. Organizations that stay ahead of these trends will gain significant competitive advantages in their respective industries.</p>
        
        <h3>1. Federated Learning</h3>
        <p>Federated learning allows for training AI models across multiple devices or servers without exchanging the actual data. This approach addresses privacy concerns while still enabling powerful collaborative model development.</p>
        
        <h3>2. Explainable AI (XAI)</h3>
        <p>As AI systems become more complex, the need for transparency and interpretability grows. Explainable AI focuses on creating models that can articulate their decision-making processes in human-understandable terms.</p>
        
        <h3>3. AI-Augmented Development</h3>
        <p>Developers are increasingly using AI tools to assist with coding, testing, and deployment. These tools can suggest optimizations, identify bugs, and even generate code based on natural language descriptions.</p>
        
        <h3>4. Edge AI</h3>
        <p>Processing data directly on edge devices rather than in the cloud reduces latency and bandwidth usage while improving privacy. This trend is particularly important for IoT applications and real-time decision making.</p>
        
        <h3>5. Synthetic Data Generation</h3>
        <p>Creating artificial datasets that mimic real-world data characteristics helps address data scarcity and privacy concerns. Synthetic data can be used for training models without exposing sensitive information.</p>
        
        <p>Organizations that successfully implement these technologies will be well-positioned to leverage AI for business transformation and innovation in the coming years.</p>
      `,
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
      content: `
        <h2>Optimizing Your CRM Strategy</h2>
        <p>Customer Relationship Management (CRM) systems are essential tools for modern businesses. When implemented correctly, they can transform your customer interactions and drive significant growth.</p>
        
        <h3>1. Define Clear Objectives</h3>
        <p>Before implementing or optimizing your CRM, establish specific, measurable goals. Whether you're focusing on improving customer retention, increasing sales, or enhancing service quality, clear objectives will guide your strategy.</p>
        
        <h3>2. Ensure Data Quality</h3>
        <p>The effectiveness of your CRM depends on the quality of your data. Implement processes for regular data cleaning, validation, and enrichment to maintain accurate customer information.</p>
        
        <h3>3. Integrate Across Systems</h3>
        <p>Connect your CRM with other business systems like marketing automation, ERP, and customer service platforms to create a unified view of customer interactions and eliminate data silos.</p>
        
        <h3>4. Automate Routine Tasks</h3>
        <p>Identify repetitive processes that can be automated, such as data entry, follow-up emails, and lead scoring. Automation reduces manual work and ensures consistent customer experiences.</p>
        
        <h3>5. Personalize Customer Interactions</h3>
        <p>Use CRM data to tailor communications and offers based on customer preferences, behavior, and history. Personalization significantly improves engagement and conversion rates.</p>
        
        <h3>6. Mobile Accessibility</h3>
        <p>Ensure your team can access and update CRM data from mobile devices, enabling them to manage customer relationships effectively from anywhere.</p>
        
        <h3>7. Provide Comprehensive Training</h3>
        <p>Invest in thorough training for all CRM users. The system's value depends on proper utilization, so ensure your team understands how to leverage its features effectively.</p>
        
        <h3>8. Measure and Optimize</h3>
        <p>Regularly analyze CRM metrics and KPIs to evaluate performance and identify improvement opportunities. Continuous optimization is key to maximizing your return on investment.</p>
        
        <p>By implementing these best practices, you can transform your CRM from a simple database into a powerful engine for business growth and customer satisfaction.</p>
      `,
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
      content: `
        <h2>The Evolving Workplace: Human-AI Collaboration</h2>
        <p>Artificial intelligence has fundamentally changed how we work. This report examines the current state of AI adoption in workplaces across industries and projects future developments.</p>
        
        <h3>Executive Summary</h3>
        <p>Our research indicates that organizations with mature AI implementation strategies are seeing productivity increases of 35-45% compared to industry peers. However, successful integration requires thoughtful approaches to workforce transition, skill development, and ethical considerations.</p>
        
        <h3>Key Findings</h3>
        <p>The most successful organizations are those that view AI as an augmentation tool rather than a replacement for human workers. These companies focus on:</p>
        <ul>
          <li>Redefining job roles to emphasize uniquely human capabilities</li>
          <li>Investing in continuous learning programs</li>
          <li>Developing clear governance frameworks for AI systems</li>
          <li>Creating collaborative environments where humans and AI systems complement each other</li>
        </ul>
        
        <h3>Industry Variations</h3>
        <p>While AI adoption is increasing across all sectors, the pace and nature of implementation vary significantly:</p>
        <p><strong>Financial Services:</strong> Leading in adoption of predictive analytics and automated decision systems</p>
        <p><strong>Healthcare:</strong> Focusing on diagnostic assistance and administrative automation</p>
        <p><strong>Manufacturing:</strong> Implementing predictive maintenance and quality control systems</p>
        <p><strong>Retail:</strong> Leveraging customer behavior prediction and inventory optimization</p>
        
        <h3>Future Outlook</h3>
        <p>By 2030, we project that:</p>
        <ul>
          <li>85% of jobs will be substantially transformed by AI</li>
          <li>New job categories will emerge, particularly in AI ethics, system training, and human-AI collaboration</li>
          <li>Organizations will develop more sophisticated metrics for measuring productivity in hybrid human-AI teams</li>
        </ul>
        
        <h3>Recommendations</h3>
        <p>Based on our findings, we recommend that organizations:</p>
        <ul>
          <li>Develop comprehensive AI strategies aligned with business objectives</li>
          <li>Invest in workforce development programs</li>
          <li>Establish clear ethical guidelines for AI implementation</li>
          <li>Create feedback mechanisms to continuously improve human-AI collaboration</li>
        </ul>
        
        <p>The future workplace will be defined not by AI replacing humans, but by how effectively organizations can create synergies between human creativity and AI capabilities.</p>
      `,
      category: 'Reports',
      date: 'January 10, 2025',
      readTime: '12 min read',
      imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2669&auto=format&fit=crop',
      source: 'McKinsey & Company',
      sourceUrl: 'https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential-at-work'
    }
  ];

  // Find the current blog post
  const currentPost = blogPosts.find(post => post.id === postId);
  
  // Get related posts (excluding current post)
  const relatedPosts = blogPosts.filter(post => post.id !== postId).slice(0, 2);

  // If post not found, redirect to blog page
  if (!currentPost) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Blog post not found</h2>
          <Link 
            to="/blog" 
            className="inline-flex items-center text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

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

      {/* Blog Post Header */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10"></div>
        <img 
          src={currentPost.imageUrl} 
          alt={currentPost.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-block bg-white/10 backdrop-blur-md px-4 py-1 rounded-full mb-4">
              <span className="text-sm font-medium text-white">{currentPost.category}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-light tracking-wider mb-4 max-w-4xl mx-auto">
              {currentPost.title}
            </h1>
            <div className="flex items-center justify-center text-gray-300 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="mr-4">{currentPost.date}</span>
              <Clock className="h-4 w-4 mr-1" />
              <span>{currentPost.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Blog Link */}
      <div className="container mx-auto px-4 py-6">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Link>
      </div>

      {/* Blog Post Content */}
      <article className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {currentPost.source && (
            <div className="mb-8 p-4 bg-white/5 rounded-lg">
              <p className="text-gray-300">
                Originally published by <a href={currentPost.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-white underline">{currentPost.source}</a>
              </p>
            </div>
          )}
          
          <div 
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: currentPost.content || '' }}
          ></div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-light tracking-wider mb-8 text-center">Related Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {relatedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10"
              >
                <div className="relative h-48 overflow-hidden">
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
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                  
                  <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                  
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
              <p>© { new Date().getFullYear()} Zenith Automations. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default BlogPost;