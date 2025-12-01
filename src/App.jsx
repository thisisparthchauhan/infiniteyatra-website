import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import DestinationsPage from './pages/DestinationsPage';
import PackageDetail from './pages/PackageDetail';
import TripPlanner from './pages/TripPlanner';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';
import Careers from './pages/Careers';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookingPage from './pages/BookingPage';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/destinations" element={<DestinationsPage />} />
                <Route path="/trip-planner" element={<TripPlanner />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/package/:id" element={<PackageDetail />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/book/:id" element={<BookingPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;

