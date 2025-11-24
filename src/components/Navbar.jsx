import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User } from 'lucide-react';

import logo from '../assets/logo.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // If on auth pages, show a simplified navbar or handle differently if desired.
    // For now, we'll keep it consistent but maybe force solid background if needed.
    const navBackground = isAuthPage || isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6';
    const textColor = isAuthPage || isScrolled ? 'text-slate-900' : 'text-white';
    const logoText = isAuthPage || isScrolled ? 'text-slate-900' : 'text-white';

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackground}`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logo} alt="Infinite Yatra" className="h-12 w-12 object-cover rounded-full" />
                        <span className={`text-2xl font-bold tracking-tighter ${logoText}`}>
                            Infinite<span className="text-blue-500">Yatra</span>
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {!isAuthPage && ['Destinations', 'Packages', 'About', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className={`text-sm font-medium hover:text-blue-500 transition-colors ${isAuthPage || isScrolled ? 'text-slate-600' : 'text-white/90'
                                }`}
                        >
                            {item}
                        </a>
                    ))}
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {!isAuthPage && (
                        <button className={`p-2 rounded-full hover:bg-white/10 transition-colors ${textColor}`}>
                            <Search size={20} />
                        </button>
                    )}

                    <Link to="/login" className={`px-4 py-2 rounded-full font-medium transition-colors ${isAuthPage || isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-white hover:text-blue-400'}`}>
                        Log In
                    </Link>
                    <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition-colors shadow-lg shadow-blue-600/20">
                        Sign Up
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-slate-900"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className={textColor} /> : <Menu className={textColor} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6 flex flex-col gap-4">
                    {!isAuthPage && ['Destinations', 'Packages', 'About', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-slate-600 font-medium hover:text-blue-500"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item}
                        </a>
                    ))}
                    <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
                        <Link to="/login" className="text-slate-600 font-medium hover:text-blue-600 text-center" onClick={() => setIsMobileMenuOpen(false)}>
                            Log In
                        </Link>
                        <Link to="/signup" className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium text-center" onClick={() => setIsMobileMenuOpen(false)}>
                            Sign Up
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
