import React, { useState } from 'react';
import { motion } from 'motion/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, Clock, User, Mail, Phone, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/ui/PageTransition';
import TiltCard from '../components/ui/TiltCard';

import { addDocument } from '../services/firestore';

const Consultation = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [formData, setFormData] = useState({
    type: 'Legal Advisory',
    name: '',
    email: '',
    phone: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addDocument('bookings', {
        ...formData,
        date: startDate?.toISOString(),
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error booking consultation:", error);
      alert("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <PageTransition>
        <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
          <Helmet>
            <title>Booking Confirmed | Wachira Wekhomba Aim & Associates</title>
          </Helmet>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-10 rounded-sm shadow-xl max-w-lg w-full text-center border-t-4 border-primary"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">Request Received</h2>
            <p className="text-gray-600 mb-6">
              Thank you, {formData.name}. Your consultation request for <strong>{startDate?.toLocaleDateString()}</strong> has been received. Our team will confirm your appointment via email shortly.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="bg-primary text-white font-bold py-3 px-8 rounded-sm hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Book Another
            </button>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="bg-gray-50 min-h-screen pb-20">
        <Helmet>
          <title>Book Consultation | Wachira Wekhomba Aim & Associates</title>
          <meta name="description" content="Schedule a legal consultation with our expert advocates." />
        </Helmet>

        {/* Header */}
        <div className="bg-primary text-white py-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-4xl md:text-6xl font-bold mb-4"
            >
              Schedule a Consultation
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light"
            >
              Secure your time with our legal experts.
            </motion.p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Sidebar Info */}
            <div className="bg-gray-900 text-white p-10 md:w-1/3 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/20"></div>
              <div className="relative z-10">
                <h3 className="font-serif text-2xl font-bold text-accent mb-8">Why Consult Us?</h3>
                <ul className="space-y-8">
                  <li className="flex items-start group">
                    <div className="bg-accent/10 p-2 rounded-full mr-4 group-hover:bg-accent group-hover:text-primary transition-colors">
                      <CheckCircle className="h-5 w-5 text-accent group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-sm text-gray-300 leading-relaxed group-hover:text-white transition-colors">Expert legal analysis of your unique situation.</span>
                  </li>
                  <li className="flex items-start group">
                    <div className="bg-accent/10 p-2 rounded-full mr-4 group-hover:bg-accent group-hover:text-primary transition-colors">
                      <CheckCircle className="h-5 w-5 text-accent group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-sm text-gray-300 leading-relaxed group-hover:text-white transition-colors">Clear strategic roadmap for your case.</span>
                  </li>
                  <li className="flex items-start group">
                    <div className="bg-accent/10 p-2 rounded-full mr-4 group-hover:bg-accent group-hover:text-primary transition-colors">
                      <CheckCircle className="h-5 w-5 text-accent group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-sm text-gray-300 leading-relaxed group-hover:text-white transition-colors">Confidential and professional environment.</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-12 pt-10 border-t border-gray-700 relative z-10">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Need Immediate Help?</p>
                <p className="text-2xl font-bold text-white tracking-wide">+254 713 209 487</p>
              </div>
            </div>

            {/* Form */}
            <div className="p-10 md:p-12 md:w-2/3 bg-white">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Consultation Details */}
                <div>
                  <h4 className="text-primary font-bold uppercase text-xs tracking-widest mb-6 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" /> Appointment Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group">
                      <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">Consultation Type</label>
                      <div className="relative">
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-50 border-b-2 border-gray-200 focus:border-primary outline-none transition-all appearance-none cursor-pointer text-gray-700 font-medium"
                        >
                          <option>Legal Advisory</option>
                          <option>Case Review</option>
                          <option>Contract Review</option>
                          <option>Dispute Resolution</option>
                          <option>Property Consultation</option>
                          <option>Family Law Matter</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>
                    <div className="group">
                      <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">Preferred Date</label>
                      <div className="relative">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          className="w-full px-4 py-3 bg-gray-50 border-b-2 border-gray-200 focus:border-primary outline-none transition-all text-gray-700 font-medium w-full"
                          minDate={new Date()}
                          placeholderText="Select a date"
                          dateFormat="MMMM d, yyyy"
                        />
                        <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 my-8"></div>

                {/* Personal Info */}
                <div>
                  <h4 className="text-primary font-bold uppercase text-xs tracking-widest mb-6 flex items-center">
                    <User className="h-4 w-4 mr-2" /> Your Information
                  </h4>
                  <div className="grid grid-cols-1 gap-8">
                    <div className="group">
                      <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border-b-2 border-gray-200 focus:border-primary outline-none transition-all text-gray-900 placeholder-gray-400"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="group">
                        <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-50 border-b-2 border-gray-200 focus:border-primary outline-none transition-all text-gray-900 placeholder-gray-400"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="group">
                        <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-50 border-b-2 border-gray-200 focus:border-primary outline-none transition-all text-gray-900 placeholder-gray-400"
                          placeholder="+254..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Issue Description */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">Brief Description of Legal Issue</label>
                  <textarea
                    name="description"
                    rows={4}
                    required
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border-b-2 border-gray-200 focus:border-primary outline-none transition-all resize-none text-gray-900 placeholder-gray-400"
                    placeholder="Please provide a brief overview..."
                  ></textarea>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent text-primary font-bold py-4 px-8 rounded-sm hover:bg-accent-light transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span>Processing...</span>
                    ) : (
                      <>
                        <span>Confirm Booking Request</span>
                        <CheckCircle className="h-5 w-5" />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-gray-500 mt-6 text-center">
                    By submitting this form, you agree to our privacy policy. Your information is kept strictly confidential.
                  </p>
                </div>

              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Consultation;
