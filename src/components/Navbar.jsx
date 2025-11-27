import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User, MapPin, Package, Info, Mail } from 'lucide-react';

import logo from '../assets/logo-new.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Detect active section for highlighting
            const sections = ['destinations', 'about', 'contact'];

            // Check if we're near the bottom of the page (contact section)
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const isNearBottom = scrollTop + windowHeight >= documentHeight - 200;

            if (isNearBottom) {
                setActiveSection('contact');
                return;
            }

            // Find which section is currently in view
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Check if section is in the top portion of viewport
                    return rect.top <= 150 && rect.bottom >= 150;
                }
                return false;
            });

            setActiveSection(current || '');
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const navItems = [
        { name: 'Destinations', icon: MapPin, href: '#destinations' },
        { name: 'About', icon: Info, href: '#about' },
        { name: 'Contact', icon: Mail, href: '#contact' }
    ];

    const navBackground = isAuthPage || isScrolled
        ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-200/50'
        : 'bg-gradient-to-b from-black/30 to-transparent backdrop-blur-sm';

    const textColor = isAuthPage || isScrolled ? 'text-slate-900' : 'text-white';

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBackground}`}>
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center group relative z-10"
                        >
                            <img
                                src={logo}
                                alt="Infinite Yatra"
                                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1 lg:gap-2">
                            {!isAuthPage && navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeSection === item.name.toLowerCase();
                                return (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        onClick={(e) => handleNavClick(e, item.href)}
                                        className={`
                                            relative px-4 py-2 text-sm font-medium rounded-lg
                                            transition-all duration-300 group
                                            flex items-center gap-2
                                            ${isActive
                                                ? (isAuthPage || isScrolled
                                                    ? 'text-blue-600 bg-blue-50'
                                                    : 'text-white bg-white/20')
                                                : (isAuthPage || isScrolled
                                                    ? 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                                                    : 'text-white/90 hover:text-white hover:bg-white/10')
                                            }
                                        `}
                                    >
                                        <Icon size={16} className="transition-transform duration-300 group-hover:scale-110" />
                                        <span>{item.name}</span>
                                        <span className={`
                                            absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500
                                            transition-all duration-300 rounded-full
                                            ${isActive ? 'w-3/4' : 'w-0 group-hover:w-3/4'}
                                        `}></span>
                                    </a>
                                );
                            })}
                        </div>

                        {/* Actions */}
                        <div className="hidden md:flex items-center gap-3">
                            {!isAuthPage && (
                                <button
                                    className={`
                                        p-2.5 rounded-full transition-all duration-300
                                        ${isAuthPage || isScrolled
                                            ? 'hover:bg-slate-100 text-slate-600'
                                            : 'hover:bg-white/20 text-white'}
                                        hover:scale-110 hover:rotate-12
                                    `}
                                >
                                    <Search size={20} />
                                </button>
                            )}

                            <Link
                                to="/login"
                                className={`
                                    px-5 py-2.5 rounded-full font-medium transition-all duration-300
                                    ${isAuthPage || isScrolled
                                        ? 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                                        : 'text-white hover:bg-white/20'}
                                    hover:scale-105
                                `}
                            >
                                Log In
                            </Link>
                            <Link
                                to="/signup"
                                className="
                                    relative overflow-hidden group
                                    bg-gradient-to-r from-blue-600 to-purple-600 
                                    hover:from-blue-700 hover:to-purple-700
                                    text-white px-6 py-2.5 rounded-full font-medium 
                                    transition-all duration-300 
                                    shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40
                                    hover:scale-105
                                "
                            >
                                <span className="relative z-10">Sign Up</span>
                                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className={`
                                md:hidden p-2 rounded-lg transition-all duration-300
                                ${isAuthPage || isScrolled ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/20'}
                            `}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`
                    fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden
                    transition-opacity duration-300
                    ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <div
                className={`
                    fixed top-20 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-40 md:hidden
                    shadow-2xl transform transition-transform duration-300 ease-out
                    ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                <div className="flex flex-col h-full overflow-y-auto">
                    {/* Navigation Items */}
                    <div className="p-6 space-y-2">
                        {!isAuthPage && navItems.map((item, index) => {
                            const Icon = item.icon;
                            const isActive = activeSection === item.name.toLowerCase();
                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-xl font-medium
                                        transition-all duration-300
                                        ${isActive
                                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm'
                                            : 'text-slate-700 hover:bg-slate-50'}
                                        transform hover:translate-x-1
                                    `}
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                        animation: isMobileMenuOpen ? 'slideInRight 0.3s ease-out forwards' : 'none'
                                    }}
                                >
                                    <Icon size={20} />
                                    <span>{item.name}</span>
                                </a>
                            );
                        })}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-slate-200 mx-6"></div>

                    {/* Auth Actions */}
                    <div className="p-6 space-y-3 mt-auto">
                        <Link
                            to="/login"
                            className="
                                block text-center px-5 py-3 rounded-xl font-medium
                                text-slate-700 hover:bg-slate-100
                                transition-all duration-300 border-2 border-slate-200
                                hover:border-slate-300
                            "
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Log In
                        </Link>
                        <Link
                            to="/signup"
                            className="
                                block text-center px-5 py-3 rounded-xl font-medium
                                bg-gradient-to-r from-blue-600 to-purple-600 
                                text-white shadow-lg shadow-blue-600/30
                                hover:shadow-xl hover:shadow-blue-600/40
                                transition-all duration-300
                                hover:scale-105
                            "
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>

            {/* Add keyframe animation for mobile menu items */}
            <style>{`
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </>
    );
};

export default Navbar;
