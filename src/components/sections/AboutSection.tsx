import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const AboutSection = ({ data }: { data: any }) => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -z-10 skew-x-12 transform translate-x-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h4 className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 flex items-center">
              <span className="w-8 h-px bg-primary mr-3"></span> About The Firm
            </h4>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              {data.title}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              {data.description1}
            </p>
            <p className="text-gray-600 mb-10 leading-relaxed text-lg">
              {data.description2}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {[
                "Experienced Attorneys",
                "Client-Centric Approach",
                "Integrity & Transparency",
                "Strategic Legal Solutions"
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 group">
                  <div className="bg-accent/10 p-2 rounded-full group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    <CheckCircle className="text-accent h-5 w-5 shrink-0 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-gray-800 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <Link to="/consultation" className="inline-flex items-center text-primary font-bold hover:text-secondary transition-colors text-lg group border-b-2 border-primary/20 pb-1 hover:border-primary">
              Learn More About Us <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-full h-full border-2 border-accent/30 rounded-sm z-0 hidden md:block"></div>
            <div className="relative z-10 overflow-hidden rounded-sm shadow-2xl group">
              <img 
                src={data.image} 
                alt="Meeting Room" 
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
            <div className="absolute -bottom-12 -right-12 bg-white p-10 shadow-2xl rounded-sm z-20 hidden lg:block max-w-sm border-l-4 border-primary">
              <p className="font-serif text-xl italic text-gray-800 leading-relaxed">"Justice consists not in being neutral between right and wrong, but in finding out the right and upholding it."</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
