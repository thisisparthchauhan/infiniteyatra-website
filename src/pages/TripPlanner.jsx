import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, Calendar, DollarSign, Users, Sparkles,
    Clock, Sun, Sunset, Moon, Coffee, UtensilsCrossed,
    Camera, Compass, Heart, TrendingUp, Loader2
} from 'lucide-react';
import SEO from '../components/SEO';

const TripPlanner = () => {
    const [formData, setFormData] = useState({
        destination: '',
        startDate: '',
        endDate: '',
        budget: 'medium',
        travelers: '2',
        travelStyle: []
    });

    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedItinerary, setGeneratedItinerary] = useState(null);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const budgetOptions = [
        { value: 'budget', label: 'Budget', icon: '💰', description: 'Under $100/day' },
        { value: 'medium', label: 'Moderate', icon: '💳', description: '$100-300/day' },
        { value: 'luxury', label: 'Luxury', icon: '💎', description: '$300+/day' }
    ];

    const travelStyles = [
        { value: 'adventure', label: 'Adventure', icon: Compass },
        { value: 'relaxation', label: 'Relaxation', icon: Sun },
        { value: 'culture', label: 'Culture', icon: Camera },
        { value: 'food', label: 'Food & Dining', icon: UtensilsCrossed },
        { value: 'nature', label: 'Nature', icon: Heart },
        { value: 'nightlife', label: 'Nightlife', icon: Moon }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleTravelStyle = (style) => {
        setFormData(prev => ({
            ...prev,
            travelStyle: prev.travelStyle.includes(style)
                ? prev.travelStyle.filter(s => s !== style)
                : [...prev.travelStyle, style]
        }));
    };

    const generateItinerary = async (e) => {
        e.preventDefault();
        setIsGenerating(true);

        // Simulate AI processing
        await new Promise(resolve => setTimeout(resolve, 2500));

        // Generate mock itinerary based on inputs
        const days = calculateDays(formData.startDate, formData.endDate);
        const itinerary = createMockItinerary(formData, days);

        setGeneratedItinerary(itinerary);
        setIsGenerating(false);

        // Scroll to results
        setTimeout(() => {
            document.getElementById('itinerary-results')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    };

    const calculateDays = (start, end) => {
        if (!start || !end) return 3;
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.max(1, diffDays);
    };

    const createMockItinerary = (data, days) => {
        const destination = data.destination || 'Your Destination';
        const styles = data.travelStyle.length > 0 ? data.travelStyle : ['culture', 'food'];

        const activities = {
            adventure: ['Hiking expedition', 'Rock climbing', 'Zip-lining adventure', 'Kayaking tour', 'Mountain biking'],
            relaxation: ['Spa treatment', 'Beach time', 'Yoga session', 'Meditation retreat', 'Sunset viewing'],
            culture: ['Museum visit', 'Historical site tour', 'Local market exploration', 'Art gallery visit', 'Cultural performance'],
            food: ['Food tour', 'Cooking class', 'Local restaurant dining', 'Street food tasting', 'Wine tasting'],
            nature: ['Nature walk', 'Wildlife safari', 'Botanical garden visit', 'Scenic viewpoint', 'Bird watching'],
            nightlife: ['Live music venue', 'Rooftop bar', 'Night market', 'Cultural show', 'Evening cruise']
        };

        const dayPlans = [];
        for (let i = 0; i < days; i++) {
            const dayActivities = [];
            const selectedStyles = [...styles].sort(() => Math.random() - 0.5);

            // Morning activity
            const morningStyle = selectedStyles[0] || 'culture';
            dayActivities.push({
                time: '9:00 AM',
                period: 'morning',
                title: activities[morningStyle][Math.floor(Math.random() * activities[morningStyle].length)],
                description: `Start your day with an exciting ${morningStyle} experience`,
                duration: '2-3 hours'
            });

            // Afternoon activity
            const afternoonStyle = selectedStyles[1] || 'food';
            dayActivities.push({
                time: '2:00 PM',
                period: 'afternoon',
                title: activities[afternoonStyle][Math.floor(Math.random() * activities[afternoonStyle].length)],
                description: `Enjoy the afternoon with ${afternoonStyle} activities`,
                duration: '2-3 hours'
            });

            // Evening activity
            const eveningStyle = selectedStyles[2] || selectedStyles[0] || 'relaxation';
            dayActivities.push({
                time: '7:00 PM',
                period: 'evening',
                title: activities[eveningStyle][Math.floor(Math.random() * activities[eveningStyle].length)],
                description: `Wind down with ${eveningStyle} in the evening`,
                duration: '2-3 hours'
            });

            dayPlans.push({
                day: i + 1,
                title: i === 0 ? 'Arrival & Exploration' : i === days - 1 ? 'Final Day & Departure' : `Discover ${destination}`,
                activities: dayActivities
            });
        }

        const budgetEstimate = {
            budget: { accommodation: 50, food: 30, activities: 20, transport: 15 },
            medium: { accommodation: 150, food: 80, activities: 70, transport: 30 },
            luxury: { accommodation: 400, food: 200, activities: 150, transport: 80 }
        };

        const costs = budgetEstimate[data.budget];
        const dailyCost = Object.values(costs).reduce((a, b) => a + b, 0);
        const totalCost = dailyCost * days * parseInt(data.travelers);

        return {
            destination,
            days,
            travelers: data.travelers,
            budget: data.budget,
            dayPlans,
            costBreakdown: {
                daily: dailyCost,
                total: totalCost,
                perPerson: dailyCost * days,
                categories: costs
            }
        };
    };

    const getPeriodIcon = (period) => {
        switch (period) {
            case 'morning': return Coffee;
            case 'afternoon': return Sun;
            case 'evening': return Sunset;
            default: return Clock;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-24 pb-16">
            <SEO
                title="Trip Planner"
                description="Plan your perfect trip with our AI-powered itinerary generator. Customized travel plans based on your budget and preferences."
                url="/trip-planner"
            />
            <div className="container mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        <span className="text-sm font-semibold text-purple-900">AI-Powered Trip Planning</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Plan Your Perfect Journey
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Let our AI create a personalized itinerary tailored to your preferences, budget, and travel style
                    </p>
                </motion.div>

                {/* Trip Planning Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-4xl mx-auto mb-16"
                >
                    <form onSubmit={generateItinerary} className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/50">
                        {/* Destination */}
                        <div className="mb-8">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                                <MapPin className="w-5 h-5 text-blue-600" />
                                Where do you want to go?
                            </label>
                            <input
                                type="text"
                                name="destination"
                                value={formData.destination}
                                onChange={handleInputChange}
                                placeholder="e.g., Paris, Tokyo, Bali..."
                                required
                                className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-slate-900 placeholder-slate-400"
                            />
                        </div>

                        {/* Dates */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                                    <Calendar className="w-5 h-5 text-purple-600" />
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none text-slate-900"
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                                    <Calendar className="w-5 h-5 text-purple-600" />
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none text-slate-900"
                                />
                            </div>
                        </div>

                        {/* Budget & Travelers */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                                    <Users className="w-5 h-5 text-pink-600" />
                                    Number of Travelers
                                </label>
                                <select
                                    name="travelers"
                                    value={formData.travelers}
                                    onChange={handleInputChange}
                                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all outline-none text-slate-900"
                                >
                                    {[1, 2, 3, 4, 5, 6].map(num => (
                                        <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Budget Options */}
                        <div className="mb-8">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                                <DollarSign className="w-5 h-5 text-green-600" />
                                Budget Range
                            </label>
                            <div className="grid md:grid-cols-3 gap-4">
                                {budgetOptions.map(option => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, budget: option.value }))}
                                        className={`
                                            p-5 rounded-xl border-2 transition-all text-left
                                            ${formData.budget === option.value
                                                ? 'border-green-500 bg-green-50 shadow-lg shadow-green-100'
                                                : 'border-slate-200 hover:border-green-300 hover:bg-green-50/50'
                                            }
                                        `}
                                    >
                                        <div className="text-2xl mb-2">{option.icon}</div>
                                        <div className="font-semibold text-slate-900 mb-1">{option.label}</div>
                                        <div className="text-sm text-slate-600">{option.description}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Travel Style */}
                        <div className="mb-8">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                                <Heart className="w-5 h-5 text-red-600" />
                                Travel Style (Select all that apply)
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {travelStyles.map(style => {
                                    const Icon = style.icon;
                                    const isSelected = formData.travelStyle.includes(style.value);
                                    return (
                                        <button
                                            key={style.value}
                                            type="button"
                                            onClick={() => toggleTravelStyle(style.value)}
                                            className={`
                                                p-4 rounded-xl border-2 transition-all flex items-center gap-3
                                                ${isSelected
                                                    ? 'border-blue-500 bg-blue-50 shadow-md'
                                                    : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                                                }
                                            `}
                                        >
                                            <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                                            <span className={`text-sm font-medium ${isSelected ? 'text-blue-900' : 'text-slate-600'}`}>
                                                {style.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isGenerating}
                            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white py-5 rounded-xl font-semibold text-lg shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    Generating Your Perfect Itinerary...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-6 h-6" />
                                    Generate AI Itinerary
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>

                {/* Generated Itinerary */}
                <AnimatePresence>
                    {generatedItinerary && (
                        <motion.div
                            id="itinerary-results"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            className="max-w-6xl mx-auto"
                        >
                            {/* Itinerary Header */}
                            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-10 text-white mb-8 shadow-2xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <Sparkles className="w-8 h-8" />
                                    <h2 className="text-3xl md:text-4xl font-bold">Your Personalized Itinerary</h2>
                                </div>
                                <div className="grid md:grid-cols-4 gap-6 mt-6">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                                        <MapPin className="w-6 h-6 mb-2" />
                                        <div className="text-sm opacity-90">Destination</div>
                                        <div className="font-semibold text-lg">{generatedItinerary.destination}</div>
                                    </div>
                                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                                        <Calendar className="w-6 h-6 mb-2" />
                                        <div className="text-sm opacity-90">Duration</div>
                                        <div className="font-semibold text-lg">{generatedItinerary.days} Days</div>
                                    </div>
                                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                                        <Users className="w-6 h-6 mb-2" />
                                        <div className="text-sm opacity-90">Travelers</div>
                                        <div className="font-semibold text-lg">{generatedItinerary.travelers} People</div>
                                    </div>
                                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                                        <DollarSign className="w-6 h-6 mb-2" />
                                        <div className="text-sm opacity-90">Total Budget</div>
                                        <div className="font-semibold text-lg">${generatedItinerary.costBreakdown.total.toLocaleString()}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Day by Day Itinerary */}
                            <div className="space-y-6 mb-8">
                                {generatedItinerary.dayPlans.map((day, index) => (
                                    <motion.div
                                        key={day.day}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-6 md:p-8 border border-white/50"
                                    >
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                                {day.day}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-slate-900">Day {day.day}</h3>
                                                <p className="text-slate-600">{day.title}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {day.activities.map((activity, actIndex) => {
                                                const PeriodIcon = getPeriodIcon(activity.period);
                                                return (
                                                    <div
                                                        key={actIndex}
                                                        className="flex gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 hover:shadow-md transition-all"
                                                    >
                                                        <div className="flex-shrink-0">
                                                            <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
                                                                <PeriodIcon className="w-6 h-6 text-blue-600" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <Clock className="w-4 h-4 text-slate-500" />
                                                                <span className="text-sm font-semibold text-slate-600">{activity.time}</span>
                                                                <span className="text-xs text-slate-500">• {activity.duration}</span>
                                                            </div>
                                                            <h4 className="text-lg font-semibold text-slate-900 mb-1">{activity.title}</h4>
                                                            <p className="text-slate-600 text-sm">{activity.description}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Budget Breakdown */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-6 md:p-8 border border-white/50"
                            >
                                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    <TrendingUp className="w-7 h-7 text-green-600" />
                                    Budget Breakdown
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                                            <span className="text-slate-700 font-medium">Accommodation</span>
                                            <span className="text-slate-900 font-bold">${generatedItinerary.costBreakdown.categories.accommodation}/day</span>
                                        </div>
                                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                                            <span className="text-slate-700 font-medium">Food & Dining</span>
                                            <span className="text-slate-900 font-bold">${generatedItinerary.costBreakdown.categories.food}/day</span>
                                        </div>
                                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl">
                                            <span className="text-slate-700 font-medium">Activities</span>
                                            <span className="text-slate-900 font-bold">${generatedItinerary.costBreakdown.categories.activities}/day</span>
                                        </div>
                                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                                            <span className="text-slate-700 font-medium">Transportation</span>
                                            <span className="text-slate-900 font-bold">${generatedItinerary.costBreakdown.categories.transport}/day</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
                                            <div className="text-sm opacity-90 mb-2">Daily Cost per Person</div>
                                            <div className="text-4xl font-bold mb-4">${generatedItinerary.costBreakdown.daily}</div>
                                            <div className="border-t border-white/30 pt-4">
                                                <div className="text-sm opacity-90 mb-1">Total per Person</div>
                                                <div className="text-2xl font-bold">${generatedItinerary.costBreakdown.perPerson.toLocaleString()}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TripPlanner;
