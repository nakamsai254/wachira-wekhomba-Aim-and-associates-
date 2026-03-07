import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Scale, Shield, Users, FileText, Briefcase, Gavel, ArrowRight, CheckCircle, MapPin } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Helmet>
        <title>Wachira Wekhomba Aim & Associates Advocates | Law Firm Kenya</title>
        <meta name="description" content="Professional law firm providing legal representation, advisory services, and dispute resolution in Nairobi and Nakuru, Kenya." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center text-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Law Firm Office" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-block mb-6 px-4 py-1.5 border border-accent/50 rounded-full bg-black/30 backdrop-blur-md">
              <span className="text-accent text-sm font-semibold tracking-widest uppercase">Premier Legal Counsel</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 drop-shadow-lg">
              Trusted Legal Representation & <br/>
              <span className="text-accent">Professional Legal Services</span> in Kenya
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl leading-relaxed font-light">
              Wachira Wekhomba Aim & Associates Advocates provides reliable legal representation, advisory services, and dispute resolution for individuals and businesses across Kenya.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
              <Link 
                to="/consultation" 
                className="bg-accent hover:bg-accent-light text-primary font-bold py-4 px-8 rounded-sm transition-all transform hover:-translate-y-1 shadow-lg text-center"
              >
                Book Consultation
              </Link>
              <Link 
                to="/contact" 
                className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-4 px-8 rounded-sm transition-all transform hover:-translate-y-1 shadow-lg text-center"
              >
                Contact Our Advocates
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h4 className="text-primary font-bold tracking-widest uppercase text-sm mb-3">About The Firm</h4>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Wachira Wekhomba Aim & Associates Advocates
              </h2>
              <div className="w-24 h-1 bg-accent mb-8"></div>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Wachira Wekhomba Aim & Associates Advocates is a professional law firm committed to delivering reliable and strategic legal solutions. The firm provides high-quality legal representation and advisory services to individuals, businesses, and institutions.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Our advocates combine legal expertise with practical insight to provide solutions tailored to each client's unique circumstances. We pride ourselves on our integrity, responsiveness, and unwavering dedication to our clients' success.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                {[
                  "Experienced Attorneys",
                  "Client-Centric Approach",
                  "Integrity & Transparency",
                  "Strategic Legal Solutions"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="text-accent h-6 w-6 shrink-0" />
                    <span className="text-gray-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/about" className="inline-flex items-center text-primary font-bold hover:text-secondary transition-colors text-lg group">
                Learn More About Us <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 w-full h-full border-2 border-accent rounded-sm z-0 hidden md:block"></div>
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                alt="Meeting Room" 
                className="relative z-10 w-full h-auto rounded-sm shadow-2xl"
              />
              <div className="absolute -bottom-10 -right-10 bg-white p-8 shadow-xl rounded-sm z-20 hidden lg:block max-w-xs border-l-4 border-primary">
                <p className="font-serif text-xl italic text-gray-800">"Justice consists not in being neutral between right and wrong, but in finding out the right and upholding it."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Practice Areas Preview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h4 className="text-primary font-bold tracking-widest uppercase text-sm mb-3">Our Expertise</h4>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-6">Practice Areas</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We offer a comprehensive range of legal services designed to meet the diverse needs of our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Corporate Law", 
                icon: <Briefcase className="h-8 w-8" />, 
                desc: "Comprehensive legal solutions for businesses, including incorporation, compliance, and governance." 
              },
              { 
                title: "Civil Litigation", 
                icon: <Gavel className="h-8 w-8" />, 
                desc: "Expert representation in civil disputes, ensuring your rights and interests are vigorously defended." 
              },
              { 
                title: "Property & Land Law", 
                icon: <MapPin className="h-8 w-8" />, 
                desc: "Guidance on real estate transactions, land transfers, leases, and property dispute resolution." 
              },
              { 
                title: "Family Law", 
                icon: <Users className="h-8 w-8" />, 
                desc: "Compassionate legal support for divorce, custody, succession, and other family-related matters." 
              },
              { 
                title: "Commercial Law", 
                icon: <Scale className="h-8 w-8" />, 
                desc: "Strategic advice on commercial contracts, trade regulations, and business operations." 
              },
              { 
                title: "Legal Advisory", 
                icon: <Shield className="h-8 w-8" />, 
                desc: "Professional legal opinions and advisory services to help you make informed decisions." 
              },
            ].map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-10 rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 border-transparent hover:border-accent group"
              >
                <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {area.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{area.title}</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">{area.desc}</p>
                <Link to="/practice-areas" className="text-primary text-sm font-bold hover:text-secondary inline-flex items-center uppercase tracking-wide">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link 
              to="/practice-areas" 
              className="inline-block border-2 border-primary text-primary font-bold py-4 px-10 rounded-sm hover:bg-primary hover:text-white transition-colors uppercase tracking-wider text-sm"
            >
              View All Practice Areas
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8">Need Professional Legal Advice?</h2>
          <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            We are ready to listen to your case and provide the strategic legal guidance you need. Contact us today to schedule a consultation with our expert team.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/consultation" 
              className="bg-accent text-primary font-bold py-4 px-10 rounded-sm hover:bg-white transition-colors shadow-lg transform hover:-translate-y-1"
            >
              Request Consultation
            </Link>
            <a 
              href="tel:+254713209487" 
              className="bg-transparent border-2 border-white text-white font-bold py-4 px-10 rounded-sm hover:bg-white hover:text-primary transition-colors transform hover:-translate-y-1"
            >
              Call: +254 713 209 487
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
