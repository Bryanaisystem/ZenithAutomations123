import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  source: string;
  externalUrl: string;
}

interface BlogSectionProps {
  posts: BlogPost[];
}

export function BlogSection({ posts }: BlogSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-[90%] mx-auto">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
          className="blog-card group relative bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 w-full mx-auto transition-all duration-300 ease-out hover:transform hover:-translate-y-2"
        >
          <div className="absolute -inset-[1px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg bg-gradient-to-b from-white/20 to-transparent -z-10" />
          
          <div className="relative h-36 md:h-44 overflow-hidden">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3">
              <span className="bg-white/90 text-black text-xs font-medium px-2 py-1 rounded">
                {post.category}
              </span>
            </div>
          </div>
          
          <div className="p-4 md:p-5 relative">
            <div className="flex items-center text-gray-400 text-xs mb-2">
              <span>{post.date}</span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {post.readTime}
              </span>
            </div>
            
            <h3 className="text-base md:text-lg font-medium mb-2 line-clamp-2 group-hover:text-white transition-colors">
              {post.title}
            </h3>
            
            <p className="text-gray-400 mb-3 line-clamp-3 text-sm">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Source: {post.source}
              </span>
              
              <a 
                href={post.externalUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-white opacity-80 hover:opacity-100 transition-opacity text-sm group"
              >
                Read More
                <ArrowRight className="ml-1 h-3 w-3 transform transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}