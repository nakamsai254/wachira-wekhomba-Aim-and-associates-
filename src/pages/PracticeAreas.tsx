import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Gavel, MapPin, Users, Scale, FileText, Shield, FileSignature, Handshake, UserCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

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
    <div className="bg-gray-50">
      <Helmet>
        <title>Practice Areas | Wachira Wekhomba Aim & Associates</title>
        <meta name="description" content="Explore our comprehensive legal services including Corporate Law, Civil Litigation, Property Law, and more." />
      </Helmet>

      {/* Header */}
      <div className="bg-primary text-white py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Practice Areas</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive legal solutions tailored to your specific needs.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-sm shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="p-8">
                  <div className="bg-primary/5 w-20 h-20 rounded-full flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="h-1 w-full bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">Not sure which service you need?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Contact us for a preliminary consultation. We will assess your situation and guide you towards the right legal solution.
          </p>
          <Link 
            to="/consultation" 
            className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-sm hover:bg-primary/90 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PracticeAreas;
