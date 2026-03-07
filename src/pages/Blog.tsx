import React from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "Understanding Property Law in Kenya: A Guide for Buyers",
      excerpt: "Navigating the complexities of land acquisition, due diligence, and title transfer in the current Kenyan real estate market.",
      date: "March 5, 2025",
      author: "Patrick Oduor",
      category: "Property Law",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Employee Rights: Recent Changes in Labour Laws",
      excerpt: "An analysis of recent court rulings affecting employment contracts, termination procedures, and employee benefits.",
      date: "February 28, 2025",
      author: "Legal Team",
      category: "Employment Law",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "The Importance of Corporate Governance for SMEs",
      excerpt: "Why small and medium enterprises need to establish robust governance structures early to ensure long-term sustainability.",
      date: "February 15, 2025",
      author: "Patrick Oduor",
      category: "Corporate Law",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Dispute Resolution: Arbitration vs. Litigation",
      excerpt: "Comparing the pros and cons of alternative dispute resolution mechanisms versus traditional court processes in commercial disputes.",
      date: "January 30, 2025",
      author: "Legal Team",
      category: "Dispute Resolution",
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Legal Insights & Updates | Wachira Wekhomba Aim & Associates</title>
        <meta name="description" content="Stay informed with the latest legal insights, updates, and articles from our expert advocates." />
      </Helmet>

      {/* Header */}
      <div className="bg-gray-900 text-white py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Legal Insights & Updates</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Expert analysis on current legal matters in Kenya.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            {posts.map((post, index) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-sm shadow-sm hover:shadow-xl transition-shadow overflow-hidden flex flex-col md:flex-row h-full"
              >
                <div className="md:w-2/5 h-64 md:h-auto overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 md:w-3/5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center text-xs text-accent font-bold uppercase tracking-wider mb-3">
                      <BookOpen size={12} className="mr-1" /> {post.category}
                    </div>
                    <h2 className="font-serif text-xl font-bold text-gray-900 mb-3 hover:text-primary transition-colors cursor-pointer">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-4">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar size={12} className="mr-1" /> {post.date}
                    </div>
                    <button className="text-primary text-sm font-bold flex items-center hover:text-secondary transition-colors">
                      Read Article <ArrowRight size={14} className="ml-1" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-20 bg-primary text-white p-10 rounded-sm text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="font-serif text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
              <p className="text-gray-200 mb-8">Get the latest legal updates and firm news delivered directly to your inbox.</p>
              <form className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-sm text-gray-900 outline-none focus:ring-2 focus:ring-accent"
                />
                <button className="bg-accent text-primary font-bold px-8 py-3 rounded-sm hover:bg-accent-light transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
