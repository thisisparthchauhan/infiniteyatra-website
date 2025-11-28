import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogById } from '../data/blogs';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';

const BlogPost = () => {
    const { id } = useParams();
    const blog = getBlogById(id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!blog) {
        return (
            <div className="pt-32 pb-20 text-center min-h-screen">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Article Not Found</h2>
                <Link to="/blog" className="text-blue-600 hover:underline">Back to Travel Guides</Link>
            </div>
        );
    }

    return (
        <article className="pt-24 pb-20 bg-white min-h-screen">
            {/* Hero Image */}
            <div className="w-full h-[400px] md:h-[500px] relative mb-12">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                    <div className="container mx-auto max-w-4xl">
                        <span className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                            {blog.category}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {blog.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-base">
                            <span className="flex items-center gap-2">
                                <User size={18} />
                                {blog.author}
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar size={18} />
                                {blog.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock size={18} />
                                5 min read
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 max-w-3xl">
                <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors">
                    <ArrowLeft size={20} />
                    Back to Guides
                </Link>

                <div
                    className="prose prose-lg prose-slate max-w-none 
                        prose-headings:font-bold prose-headings:text-slate-900 
                        prose-p:text-slate-600 prose-p:leading-relaxed
                        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                        prose-img:rounded-2xl prose-img:shadow-lg"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Author Bio (Optional Placeholder) */}
                <div className="mt-16 p-8 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl">
                        {blog.author.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-lg">Written by {blog.author}</h4>
                        <p className="text-slate-500">Passionate traveler and storyteller sharing experiences from the Himalayas.</p>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogPost;
