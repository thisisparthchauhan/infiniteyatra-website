import React from 'react';
import { Instagram, Mail } from 'lucide-react';
import logo from '../assets/logo.png';

// Custom Icons for brands not in lucide-react (or specific versions)
const XIcon = ({ size = 20, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const ThreadsIcon = ({ size = 20, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12.005 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75c2.46 0 4.71-.915 6.45-2.43l-1.35-1.59c-1.395 1.215-3.195 1.95-5.1 1.95-4.23 0-7.65-3.42-7.65-7.65s3.42-7.65 7.65-7.65c4.155 0 7.545 3.285 7.65 7.41.045 1.845-.51 2.82-1.08 3.36-.39.375-.9.585-1.515.585-.855 0-1.455-.555-1.455-1.605V9.63c0-2.31-1.89-4.2-4.2-4.2-2.31 0-4.2 1.89-4.2 4.2s1.89 4.2 4.2 4.2c1.065 0 2.04-.405 2.79-1.065.645 1.11 1.695 1.89 3.03 1.89 1.47 0 2.64-.675 3.39-1.83.69-1.065.9-2.475.84-4.05-.135-5.295-4.455-9.525-9.75-9.525zm0 9.45c-1.155 0-2.1-.945-2.1-2.1s.945-2.1 2.1-2.1 2.1.945 2.1 2.1-.945 2.1-2.1 2.1z" />
    </svg>
);

const WhatsAppIcon = ({ size = 20, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

const Footer = () => {
    return (
        <footer id="contact" className="bg-slate-900 text-white py-16 relative z-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <img src={logo} alt="Infinite Yatra" className="h-12 w-12 object-cover rounded-full" />
                        <p className="text-slate-400 leading-relaxed">
                            Explore Infinite.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li><a href="#" className="hover:text-blue-500 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Press</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li>
                                <a href="tel:+919265799325" className="hover:text-blue-500 transition-colors">
                                    +91 9265799325
                                </a>
                            </li>
                            <li>
                                <a href="mailto:infiniteyatra@gmail.com" className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                                    <Mail size={18} />
                                    infiniteyatra@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold mb-6">Stay Updated</h4>
                        <p className="text-slate-400 mb-4">Subscribe to our newsletter for the latest travel deals.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-slate-800 text-white px-4 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} Infinite Yatra. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-slate-400">
                        <a href="https://x.com/infiniteyatra" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="X (Twitter)">
                            <XIcon size={20} />
                        </a>
                        <a href="https://www.threads.com/@infinite.yatra" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Threads">
                            <ThreadsIcon size={20} />
                        </a>
                        <a href="https://www.instagram.com/infinite.yatra/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Instagram">
                            <Instagram size={20} />
                        </a>
                        <a href="https://api.whatsapp.com/send?phone=919265799325&text=Hey%20Infinite%20Yatra%20%F0%9F%91%8B%2C%20I%E2%80%99m%20interested%20in%20your%20tours.%20Please%20share%20more%20details%20%F0%9F%99%8F" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="WhatsApp">
                            <WhatsAppIcon size={20} />
                        </a>
                        <a href="https://www.whatsapp.com/channel/0029VbBX7rv3gvWStqSdXf08" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="WhatsApp Channel">
                            <WhatsAppIcon size={20} className="text-green-500" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
