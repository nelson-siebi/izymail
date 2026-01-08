import React from "react";
import { Head, Link } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";
import { Calendar, ChevronRight } from "lucide-react";

export default function BlogIndex({ posts }) {
    return (
        <PublicLayout>
            <Head title="Blog" />

            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="text-center mb-20">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tight">Le <span className="text-indigo-500">Blog.</span></h1>
                    <p className="text-xl text-slate-400 font-medium">Actualités, tutoriels et nouveautés de l'emailing.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map(post => (
                        <div key={post.id} className="group bg-slate-900/50 border border-slate-800 rounded-[40px] overflow-hidden hover:border-indigo-500/30 transition-all shadow-xl">
                            <div className="aspect-video relative overflow-hidden">
                                <img
                                    src={post.image}
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 opacity-60"
                                    alt={post.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                            </div>
                            <div className="p-10 space-y-6">
                                <div className="flex items-center gap-2 text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                                    <Calendar className="w-3 h-3" />
                                    {post.date}
                                </div>
                                <h2 className="text-2xl font-bold text-white leading-tight uppercase tracking-tight group-hover:text-indigo-400 transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-slate-500 font-medium leading-relaxed line-clamp-2">
                                    {post.excerpt}
                                </p>
                                <Link
                                    href={`/blog/${post.id}`}
                                    className="inline-flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest hover:gap-4 transition-all"
                                >
                                    Lire la suite <ChevronRight className="w-4 h-4 text-indigo-500" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PublicLayout>
    );
}
