import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Destinations from '../components/Destinations';
import About from '../components/About';
import BlogPreview from '../components/BlogPreview';
import Contact from '../components/Contact';
import SEO from '../components/SEO';


const Home = () => {
    useEffect(() => {
        // Handle hash scrolling when page loads with a hash (e.g., /#about)
        const hash = window.location.hash;
        if (hash) {
            // Small delay to ensure page is fully rendered
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    const offset = 80; // Account for fixed navbar
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    }, []);

    return (
        <>
            <SEO
                title="Home"
                description="Welcome to Infinite Yatra. Discover your next adventure with our curated travel packages and expert guides."
            />
            <Hero />
            <Destinations />
            <BlogPreview />
            <About />
            <Contact />
        </>
    );
};

export default Home;
