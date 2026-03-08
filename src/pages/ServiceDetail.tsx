import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Briefcase } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import PageTransition from '../components/ui/PageTransition';
import { iconMap } from '../components/sections/PracticeAreasSection';
import { slugify } from '../utils/helpers';

const ServiceDetail = () => {
  const { slug } = useParams();
  const { data: pageData, loading } = useContent('pages', 'home');

  const defaultAreas = [
    { 
      title: "Corporate Law", 
      icon: "briefcase", 
      desc: "Comprehensive legal solutions for businesses, including incorporation, compliance, and governance.",
      details: "Our Corporate Law practice provides comprehensive legal solutions for businesses of all sizes. We assist with company formation, regulatory compliance, corporate governance, mergers and acquisitions, and contract drafting and review. Our team ensures that your business operates within the legal framework while maximizing opportunities for growth."
    },
    { 
      title: "Civil Litigation", 
      icon: "gavel", 
      desc: "Expert representation in civil disputes, ensuring your rights and interests are vigorously defended.",
      details: "We offer expert representation in civil disputes, ranging from contract disagreements to tort claims. Our litigators are experienced in navigating the court system and alternative dispute resolution mechanisms to achieve favorable outcomes for our clients. We work tirelessly to protect your rights and interests."
    },
    { 
      title: "Property & Land Law", 
      icon: "map-pin", 
      desc: "Guidance on real estate transactions, land transfers, leases, and property dispute resolution.",
      details: "Our Property & Land Law practice guides clients through complex real estate transactions, including buying, selling, and leasing property. We also handle land transfers, title searches, and property dispute resolution. Whether you are a developer, investor, or homeowner, we provide the legal support you need."
    },
    { 
      title: "Family Law", 
      icon: "users", 
      desc: "Compassionate legal support for divorce, custody, succession, and other family-related matters.",
      details: "We provide compassionate and confidential legal support for family-related matters, including divorce, child custody, adoption, and succession planning. Our goal is to resolve sensitive issues with care and professionalism, prioritizing the well-being of our clients and their families."
    },
    { 
      title: "Commercial Law", 
      icon: "scale", 
      desc: "Strategic advice on commercial contracts, trade regulations, and business operations.",
      details: "Our Commercial Law team offers strategic advice on a wide range of business matters, including commercial contracts, trade regulations, intellectual property, and employment law. We help businesses navigate the legal complexities of the marketplace to ensure compliance and mitigate risk."
    },
    { 
      title: "Legal Advisory", 
      icon: "shield", 
      desc: "Professional legal opinions and advisory services to help you make informed decisions.",
      details: "We provide professional legal opinions and advisory services to help individuals and organizations make informed decisions. Our team analyzes complex legal issues and offers practical, actionable advice tailored to your specific needs and objectives."
    },
  ];

  const areas = pageData?.areas || defaultAreas;
  const service = areas.find((area: any) => slugify(area.title) === slug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
        <p className="text-gray-600 mb-8">The service you are looking for does not exist.</p>
        <Link to="/" className="text-primary hover:underline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
      </div>
    );
  }

  const getIcon = (icon: any) => {
    if (typeof icon === 'string') {
      return iconMap[icon] || <Briefcase className="h-12 w-12" />;
    }
    return icon;
  };

  return (
    <PageTransition>
      <Helmet>
        <title>{service.title} | Wachira Wekhomba Aim & Associates</title>
        <meta name="description" content={service.desc} />
      </Helmet>

      <div className="bg-gray-50 min-h-screen pt-20 pb-20">
        {/* Hero Section */}
        <div className="bg-primary text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link to="/" className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>
            <div className="flex items-center gap-6 mb-6">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                {React.cloneElement(getIcon(service.icon) as React.ReactElement, { className: "w-10 h-10 text-accent" })}
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold">{service.title}</h1>
            </div>
            <p className="text-xl text-gray-200 max-w-3xl font-light leading-relaxed">
              {service.desc}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-xl p-8 md:p-12"
              >
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Service Overview</h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  {service.details ? (
                    service.details.split('\n').map((paragraph: string, idx: number) => (
                      <p key={idx} className="mb-4">{paragraph}</p>
                    ))
                  ) : (
                    <p>Detailed information about this service is coming soon. Please contact us for more information.</p>
                  )}
                </div>

                <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">Why Choose Us?</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Experienced legal professionals specializing in {service.title}</li>
                    <li>Client-focused approach tailored to your specific needs</li>
                    <li>Proven track record of successful outcomes</li>
                    <li>Transparent communication and strategic guidance</li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* CTA Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-accent sticky top-24"
              >
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">Need Legal Assistance?</h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Our team is ready to provide the expert legal guidance you need. Schedule a consultation today to discuss your case.
                </p>
                <Link 
                  to="/consultation" 
                  className="block w-full bg-primary text-white text-center font-bold py-3 px-6 rounded hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg mb-4"
                >
                  Book Consultation
                </Link>
                <Link 
                  to="/contact" 
                  className="block w-full bg-white border border-gray-300 text-gray-700 text-center font-bold py-3 px-6 rounded hover:bg-gray-50 transition-colors"
                >
                  Contact Us
                </Link>
              </motion.div>

              {/* Other Services */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Other Practice Areas</h3>
                <ul className="space-y-3">
                  {areas
                    .filter((a: any) => slugify(a.title) !== slug)
                    .map((area: any, idx: number) => (
                    <li key={idx}>
                      <Link 
                        to={`/services/${slugify(area.title)}`}
                        className="flex items-center text-gray-600 hover:text-primary transition-colors group"
                      >
                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3 group-hover:bg-accent transition-colors"></span>
                        <span className="text-sm">{area.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ServiceDetail;
