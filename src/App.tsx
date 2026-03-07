/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import PracticeAreas from './pages/PracticeAreas';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Consultation from './pages/Consultation';
import Portal from './pages/Portal';
import Blog from './pages/Blog';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
        path: "portal",
        element: <Portal />,
      },
      {
        path: "insights",
        element: <Blog />,
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
