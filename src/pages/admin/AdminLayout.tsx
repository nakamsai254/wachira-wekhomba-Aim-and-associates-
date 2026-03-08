import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { 
  LayoutDashboard, 
  FileEdit, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  Menu, 
  ChevronRight,
  ChevronLeft,
  Calendar,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth } from '../../lib/firebase';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
        setIsMobileMenuOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/bookings', icon: <Calendar size={20} />, label: 'Bookings' },
    { path: '/admin/content', icon: <FileEdit size={20} />, label: 'Page Editor' },
    { path: '/admin/media', icon: <ImageIcon size={20} />, label: 'Media Library' },
    { path: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  // If we are in the Content Editor, we want full width
  const isEditor = location.pathname === '/admin/content';

  const renderSidebarContent = () => (
    <>
      <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100">
        {(isSidebarOpen || isMobile) ? (
          <div className="flex items-center justify-between w-full">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="font-serif text-xl font-bold text-gray-900 tracking-tight"
            >
              Wachira<span className="text-primary">CMS</span>
            </motion.div>
            {isMobile && (
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500">
                <X size={24} />
              </button>
            )}
          </div>
        ) : (
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl mx-auto">W</div>
        )}
      </div>
      
      {!isMobile && (
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-24 bg-white border border-gray-200 rounded-full p-1 shadow-md text-gray-500 hover:text-primary z-50"
        >
          {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      )}

      <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => isMobile && setIsMobileMenuOpen(false)}
              className={`
                flex items-center px-3 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden
                ${isActive 
                  ? 'bg-primary text-white shadow-md shadow-primary/20' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <div className={`flex items-center justify-center min-w-[24px] ${(isSidebarOpen || isMobile) ? 'mr-3' : 'mx-auto'}`}>
                {item.icon}
              </div>
              {(isSidebarOpen || isMobile) && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-medium whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
              {(!isSidebarOpen && !isMobile) && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className={`
            flex items-center w-full px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200
            ${(!isSidebarOpen && !isMobile) && 'justify-center'}
          `}
        >
          <LogOut size={20} className={(isSidebarOpen || isMobile) ? 'mr-3' : ''} />
          {(isSidebarOpen || isMobile) && <span className="font-medium">Sign Out</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Mobile Header */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 flex items-center px-4 justify-between">
          <div className="font-serif text-xl font-bold text-gray-900 tracking-tight">
            Wachira<span className="text-primary">CMS</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-gray-600">
            <Menu size={24} />
          </button>
        </div>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <motion.aside 
          initial={{ width: 280 }}
          animate={{ width: isSidebarOpen ? 280 : 80 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-white border-r border-gray-200 flex flex-col z-30 shadow-xl relative"
        >
          {renderSidebarContent()}
        </motion.aside>
      )}

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-white z-50 shadow-2xl flex flex-col"
            >
              {renderSidebarContent()}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col overflow-hidden relative bg-gray-50 ${isMobile ? 'pt-16' : ''}`}>
        <div className="flex-1 overflow-auto">
           {isEditor ? (
             <Outlet />
           ) : (
             <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
               <Outlet />
             </div>
           )}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
