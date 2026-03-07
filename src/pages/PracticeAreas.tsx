import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Gavel, MapPin, Users, Scale, Shield, FileSignature, Handshake, UserCheck, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';
import TiltCard from '../components/ui/TiltCard';

const PracticeAreas = () => {
  const services = [
    {
      title: "Corporate Law",
      icon: <Briefcase className="h-10 w-10" />,
      description: "We provide comprehensive legal solutions for businesses of all sizes. Our services include company incorporation, corporate governance, compliance, mergers and acquisitions, and restructuring. We help you navigate the complex regulatory landscape to ensure your business operates smoothly."
    },
    {
      title: "Civil Litigation",
      icon: <Gavel className="h-10 w-10" />,
      description: "Our litigation team offers expert representation in civil disputes. Whether it's debt recovery, tort claims, or employment disputes, we are dedicated to protecting your rights and interests in court. We also explore alternative dispute resolution mechanisms where appropriate."
    },
    {
      title: "Property & Land Law",
      icon: <MapPin className="h-10 w-10" />,
      description: "We guide clients through real estate transactions, including buying and selling property, leasing, and land transfers. We also handle property disputes, land use planning, and conveyancing to ensure your investments are secure."
    },
    {
      title: "Family Law",
      icon: <Users className="h-10 w-10" />,
      description: "We offer compassionate and confidential legal support for family-related matters. Our expertise covers divorce proceedings, child custody and support, adoption, matrimonial property division, and succession planning (wills and probate)."
    },
    {
      title: "Commercial Law",
      icon: <Scale className="h-10 w-10" />,
      description: "Our commercial law practice focuses on drafting and reviewing commercial contracts, trade regulations, intellectual property protection, and consumer protection. We ensure your commercial agreements are robust and legally sound."
    },
    {
      title: "Contract Law",
      icon: <FileSignature className="h-10 w-10" />,
      description: "We specialize in the drafting, review, and negotiation of all types of contracts. From employment contracts to service agreements, we ensure that your rights are protected and that terms are clear and enforceable."
    },
    {
      title: "Legal Advisory Services",
      icon: <Shield className="h-10 w-10" />,
      description: "We provide professional legal opinions and general advisory services to individuals and corporations. Our goal is to help you understand your legal position and make informed decisions in any situation."
    },
    {
      title: "Dispute Resolution",
      icon: <Handshake className="h-10 w-10" />,
      description: "Beyond litigation, we offer mediation and arbitration services to resolve disputes efficiently and amicably. We focus on achieving favorable outcomes while preserving relationships and minimizing costs."
    },
    {
      title: "Employment & Labour Law",
      icon: <UserCheck className="h-10 w-10" />,
      description: "We advise both employers and employees on labour laws, employment contracts, termination procedures, and workplace policies. We ensure compliance with the Employment Act and represent clients in labour court disputes."
    },
  ];

  return (
    <PageTransition>
      <div className="bg-gray-50">
        <Helmet>
          <title>Practice Areas | Wachira Wekhomba Aim & Associates</title>
          <meta name="description" content="Explore our comprehensive legal services including Corporate Law, Civil Litigation, Property Law, and more." />
        </Helmet>

        {/* Header */}
        <div className="bg-primary text-white py-32 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-5xl md:text-6xl font-bold mb-6"
            >
              Practice Areas
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light"
            >
              Comprehensive legal solutions tailored to your specific needs.
            </motion.p>
          </div>
        </div>

        {/* Services Grid */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <TiltCard className="bg-white rounded-sm shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group h-full border-t-4 border-transparent hover:border-accent">
                    <div className="p-10">
                      <div className="bg-primary/5 w-20 h-20 rounded-full flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                        {service.icon}
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <Link to="/consultation" className="inline-flex items-center text-primary font-bold text-sm uppercase tracking-wide group-hover:translate-x-2 transition-transform">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white py-24 border-t border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">Not sure which service you need?</h2>
            <p className="text-gray-600 mb-10 text-xl font-light">
              Contact us for a preliminary consultation. We will assess your situation and guide you towards the right legal solution.
            </p>
            <Link 
              to="/consultation" 
              className="inline-block bg-primary text-white font-bold py-4 px-10 rounded-sm hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default PracticeAreas;
