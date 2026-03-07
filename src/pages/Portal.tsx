import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Lock, FileText, MessageSquare, Upload, Download, LogOut, User, Shield, AlertTriangle } from 'lucide-react';

const Portal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Login Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth delay
    setTimeout(() => {
      setLoading(false);
      setIsLoggedIn(true);
    }, 1500);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  // --- LOGIN VIEW ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-20">
        <Helmet>
          <title>Client Portal Login | Wachira Wekhomba Aim & Associates</title>
        </Helmet>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-10 rounded-sm shadow-2xl max-w-md w-full border-t-4 border-primary"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 text-primary">
              <Lock size={32} />
            </div>
            <h1 className="font-serif text-2xl font-bold text-gray-900">Secure Client Portal</h1>
            <p className="text-gray-500 text-sm mt-2">Access your case files and secure messages.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                placeholder="client@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                placeholder="••••••••"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white font-bold py-3 px-4 rounded-sm hover:bg-primary/90 transition-colors flex items-center justify-center"
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <Lock size={16} className="mr-2" /> Secure Login
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-primary hover:underline">Forgot Password?</a>
            <div className="mt-4 flex items-center justify-center text-xs text-gray-400">
              <Shield size={12} className="mr-1" />
              256-bit SSL Encrypted Connection
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Helmet>
        <title>Client Dashboard | Wachira Wekhomba Aim & Associates</title>
      </Helmet>

      {/* Portal Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-serif text-xl font-bold text-primary mr-4">Client Portal</span>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span> Active
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center text-sm text-gray-600">
              <User size={16} className="mr-2" />
              Welcome, Client
            </div>
            <button 
              onClick={handleLogout}
              className="text-gray-500 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Nav */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-sm shadow-sm overflow-hidden">
              <nav className="flex flex-col">
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-6 py-4 text-left font-medium text-sm flex items-center border-l-4 transition-colors ${activeTab === 'dashboard' ? 'border-primary text-primary bg-gray-50' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
                >
                  <Shield size={18} className="mr-3" /> Case Overview
                </button>
                <button 
                  onClick={() => setActiveTab('documents')}
                  className={`px-6 py-4 text-left font-medium text-sm flex items-center border-l-4 transition-colors ${activeTab === 'documents' ? 'border-primary text-primary bg-gray-50' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
                >
                  <FileText size={18} className="mr-3" /> Documents
                </button>
                <button 
                  onClick={() => setActiveTab('messages')}
                  className={`px-6 py-4 text-left font-medium text-sm flex items-center border-l-4 transition-colors ${activeTab === 'messages' ? 'border-primary text-primary bg-gray-50' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
                >
                  <MessageSquare size={18} className="mr-3" /> Secure Messages
                </button>
              </nav>
            </div>
            
            <div className="mt-6 bg-primary text-white p-6 rounded-sm shadow-sm">
              <h4 className="font-bold mb-2 flex items-center"><AlertTriangle size={16} className="mr-2 text-accent" /> Important</h4>
              <p className="text-sm text-gray-200">Please upload the requested identification documents by Friday.</p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            
            {/* DASHBOARD TAB */}
            {activeTab === 'dashboard' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="bg-white p-6 rounded-sm shadow-sm border-t-4 border-accent">
                  <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Case Status: In Progress</h2>
                  <p className="text-gray-600 mb-4">Ref: WWA/CIV/2025/042</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <p className="text-sm text-gray-500">Your case is currently in the discovery phase. We are reviewing the documents provided.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-sm shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start text-sm">
                        <div className="w-2 h-2 bg-accent rounded-full mt-1.5 mr-3 shrink-0"></div>
                        <span className="text-gray-600">Document "Affidavit.pdf" uploaded by Admin. <span className="text-gray-400 text-xs block">2 hours ago</span></span>
                      </li>
                      <li className="flex items-start text-sm">
                        <div className="w-2 h-2 bg-gray-300 rounded-full mt-1.5 mr-3 shrink-0"></div>
                        <span className="text-gray-600">Meeting scheduled for March 15th. <span className="text-gray-400 text-xs block">Yesterday</span></span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-sm shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4">Assigned Advocate</h3>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 overflow-hidden">
                         <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Advocate" />
                      </div>
                      <div>
                        <p className="font-bold text-primary">Patrick Oduor</p>
                        <p className="text-xs text-gray-500">Senior Advocate</p>
                        <a href="mailto:info@wachirawekombaimadvocates.com" className="text-xs text-accent hover:underline mt-1 block">Contact Advocate</a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* DOCUMENTS TAB */}
            {activeTab === 'documents' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 rounded-sm shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-serif text-2xl font-bold text-gray-900">Case Documents</h2>
                  <button className="bg-primary text-white px-4 py-2 rounded-sm text-sm font-bold hover:bg-primary/90 flex items-center">
                    <Upload size={16} className="mr-2" /> Upload New
                  </button>
                </div>

                <div className="border border-dashed border-gray-300 rounded-sm p-8 text-center mb-8 bg-gray-50">
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">Drag & Drop files here</p>
                  <p className="text-xs text-gray-400 mt-1">Supported: PDF, DOCX, JPG, PNG (Max 10MB)</p>
                </div>

                <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Available Files</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Case_Summary_Brief.pdf', date: 'Mar 10, 2025', size: '2.4 MB' },
                    { name: 'Court_Summons_Copy.jpg', date: 'Mar 08, 2025', size: '1.1 MB' },
                    { name: 'Legal_Representation_Agreement.docx', date: 'Mar 01, 2025', size: '0.8 MB' }
                  ].map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 hover:bg-gray-50 rounded-sm transition-colors">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-secondary/50 mr-4" />
                        <div>
                          <p className="font-medium text-gray-800">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.date} • {file.size}</p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-primary">
                        <Download size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* MESSAGES TAB */}
            {activeTab === 'messages' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-sm shadow-sm h-[600px] flex flex-col">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="font-serif text-2xl font-bold text-gray-900">Secure Messages</h2>
                  <p className="text-sm text-gray-500">Direct, encrypted communication with your legal team.</p>
                </div>
                
                <div className="flex-grow p-6 overflow-y-auto space-y-6 bg-gray-50">
                  <div className="flex justify-end">
                    <div className="bg-primary text-white p-4 rounded-t-lg rounded-bl-lg max-w-[80%] shadow-sm">
                      <p className="text-sm">Hello, I have uploaded the requested documents. Please confirm receipt.</p>
                      <span className="text-[10px] text-white/70 block mt-2 text-right">10:30 AM</span>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 text-gray-800 p-4 rounded-t-lg rounded-br-lg max-w-[80%] shadow-sm">
                      <p className="text-sm">Thank you. We have received the files and are currently reviewing them. We will update you shortly regarding the next steps.</p>
                      <span className="text-[10px] text-gray-400 block mt-2">10:45 AM</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-gray-200 bg-white">
                  <form className="flex gap-4">
                    <input 
                      type="text" 
                      placeholder="Type a secure message..." 
                      className="flex-grow px-4 py-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-primary outline-none"
                    />
                    <button className="bg-secondary text-white px-6 py-2 rounded-sm font-bold hover:bg-secondary/90">
                      Send
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Portal;
