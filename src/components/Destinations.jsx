import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { packages } from '../data/packages';

const Destinations = () => {
    return (
        <section id="destinations" className="py-24 bg-white relative z-10">
            <div className="container mx-auto px-6">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Explore Infinite</h2>
                        <p className="text-slate-500 text-lg max-w-xl">
                            Discover our most loved travel experiences, curated just for you.
                        </p>
                    </div>
                    <a href="#" className="hidden md:flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors">
                        View all <ArrowRight size={20} />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {packages.map((dest) => (
                        <Link
                            key={dest.id}
                            to={`/package/${dest.id}`}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-4">
                                <img
                                    src={dest.image}
                                    alt={dest.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium text-slate-900 shadow-sm">
                                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                    {dest.rating}
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <span className="text-white font-semibold flex items-center gap-2">
                                        View Details <ArrowRight size={18} />
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                        {dest.title}
                                    </h3>
                                    <span className="text-slate-900 font-semibold">{dest.priceDisplay}</span>
                                </div>

                                <div className="flex items-center gap-2 text-slate-500 text-sm">
                                    <MapPin size={16} />
                                    {dest.location}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 md:hidden text-center">
                    <a href="#" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors">
                        View all <ArrowRight size={20} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Destinations;

