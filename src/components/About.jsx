import React from 'react';
import { Heart, Compass, Mountain } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-24 bg-slate-50 relative z-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Content */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-bold text-slate-900 mb-6">
                                About Infinite Yatra 🌎
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Infinite Yatra is a travel community built by real travelers, for real travelers.
                                We create journeys that feel personal — spiritual yatras, Himalayan treks, cultural trips,
                                and experiences that touch the heart.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Compass className="text-blue-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Our Goal</h3>
                                    <p className="text-slate-600">
                                        To help people explore, feel alive, and collect unforgettable memories — safely and authentically.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Mountain className="text-orange-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Himalayan Calm to Indian Culture</h3>
                                    <p className="text-slate-600">
                                        We combine spirituality, adventure, and comfort to make every trip meaningful.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Heart className="text-red-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">More Than Just Tours</h3>
                                    <p className="text-slate-600">
                                        We don’t just plan tours — we guide you on journeys that stay with you forever.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <p className="text-2xl font-handwriting text-blue-600 font-bold">
                                Explore Infinite... 🚀
                            </p>
                        </div>
                    </div>

                    {/* Image Grid */}
                    {/* Image Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop"
                            alt="Mountain"
                            className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1776&auto=format&fit=crop"
                            alt="Temple"
                            className="rounded-2xl shadow-lg w-full h-64 object-cover"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070&auto=format&fit=crop"
                            alt="Harshil Valley"
                            className="rounded-2xl shadow-lg w-full h-64 object-cover col-span-2"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
