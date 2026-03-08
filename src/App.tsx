/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import LoadingScreen from './components/ui/LoadingScreen';
import RequireAuth from './components/auth/RequireAuth';

// Lazy Load Pages
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const PracticeAreas = React.lazy(() => import('./pages/PracticeAreas'));
const Team = React.lazy(() => import('./pages/Team'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Consultation = React.lazy(() => import('./pages/Consultation'));
const Blog = React.lazy(() => import('./pages/Blog'));
const ServiceDetail = React.lazy(() => import('./pages/ServiceDetail'));

// Admin Pages
const AdminLayout = React.lazy(() => import('./pages/admin/AdminLayout'));
const Dashboard = React.lazy(() => import('./pages/admin/Dashboard'));
const ContentEditor = React.lazy(() => import('./pages/admin/ContentEditor'));
const MediaManager = React.lazy(() => import('./pages/admin/MediaManager'));
const Settings = React.lazy(() => import('./pages/admin/Settings'));
const Login = React.lazy(() => import('./pages/admin/Login'));

// Wrapper to handle AnimatePresence and Loading
const AnimatedRoutes = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>
      
      {!isLoading && (
        <Layout>
          <AnimatePresence mode="wait">
             <Suspense fallback={<div className="min-h-screen bg-white"></div>}>
                <div key={location.pathname}>
                   <Outlet />
                </div>
             </Suspense>
          </AnimatePresence>
        </Layout>
      )}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AnimatedRoutes />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "practice-areas",
        element: <PracticeAreas />,
      },
      {
        path: "team",
        element: <Team />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "consultation",
        element: <Consultation />,
      },
      {
        path: "services/:slug",
        element: <ServiceDetail />,
      },
      {
        path: "insights",
        element: <Blog />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: (
      <RequireAuth>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Admin...</div>}>
          <AdminLayout />
        </Suspense>
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "content",
        element: <ContentEditor />,
      },
      {
        path: "media",
        element: <MediaManager />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

export default function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}
