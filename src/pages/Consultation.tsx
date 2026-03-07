import React, { useState } from 'react';
import { motion } from 'motion/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, Clock, User, Mail, Phone, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      window.scrollTo(0, 0);
    }, 1000);
  };

  if (submitted) {
    return (
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
            className="bg-primary text-white font-bold py-3 px-8 rounded-sm hover:bg-primary/90 transition-colors"
          >
            Book Another
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <Helmet>
        <title>Book Consultation | Wachira Wekhomba Aim & Associates</title>
        <meta name="description" content="Schedule a legal consultation with our expert advocates." />
      </Helmet>

      {/* Header */}
      <div className="bg-primary text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">Schedule a Consultation</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Secure your time with our legal experts.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-sm shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Sidebar Info */}
            <div className="bg-gray-900 text-white p-8 md:col-span-1">
              <h3 className="font-serif text-xl font-bold text-accent mb-6">Why Consult Us?</h3>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-3 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-300">Expert legal analysis of your unique situation.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-3 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-300">Clear strategic roadmap for your case.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-3 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-300">Confidential and professional environment.</span>
                </li>
              </ul>
              
              <div className="mt-10 pt-10 border-t border-gray-700">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Need Immediate Help?</p>
                <p className="text-xl font-bold text-white">+254 713 209 487</p>
              </div>
            </div>

            {/* Form */}
            <div className="p-8 md:p-10 md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Consultation Details */}
                <div>
                  <h4 className="text-primary font-bold uppercase text-xs tracking-wider mb-4 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" /> Appointment Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Type</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                      >
                        <option>Legal Advisory</option>
                        <option>Case Review</option>
                        <option>Contract Review</option>
                        <option>Dispute Resolution</option>
                        <option>Property Consultation</option>
                        <option>Family Law Matter</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                        minDate={new Date()}
                        placeholderText="Select a date"
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Personal Info */}
                <div>
                  <h4 className="text-primary font-bold uppercase text-xs tracking-wider mb-4 flex items-center">
                    <User className="h-4 w-4 mr-2" /> Your Information
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Issue Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brief Description of Legal Issue</label>
                  <textarea
                    name="description"
                    rows={4}
                    required
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none resize-none"
                    placeholder="Please provide a brief overview..."
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-accent text-primary font-bold py-3 px-8 rounded-sm hover:bg-accent-light transition-colors shadow-md"
                  >
                    Confirm Booking Request
                  </button>
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    By submitting this form, you agree to our privacy policy. Your information is kept strictly confidential.
                  </p>
                </div>

              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Consultation;
