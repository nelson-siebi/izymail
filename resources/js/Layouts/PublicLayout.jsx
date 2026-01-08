import React from "react";
import Navbar from "@/Components/Layout/Navbar";
import Footer from "@/Components/Layout/Footer";
import { Head, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ShieldCheck, X, Phone } from "lucide-react";

export default function PublicLayout({ children, title }) {
    const { flash } = usePage().props;

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
            <Head title={title} />

            {/* Animated Flash Toasts */}
            <div className="fixed top-24 right-8 z-[60] flex flex-col gap-3 pointer-events-none">
                {flash.success && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="p-4 bg-slate-900 border border-slate-800 text-white rounded-2xl font-bold text-sm shadow-2xl pointer-events-auto flex items-center gap-3 min-w-[320px]"
                    >
                        <div className="w-8 h-8 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                            <ShieldCheck className="w-4 h-4 text-green-500" />
                        </div>
                        <span className="flex-1">{flash.success}</span>
                    </motion.div>
                )}
                {flash.error && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="p-4 bg-slate-900 border border-slate-800 text-white rounded-2xl font-bold text-sm shadow-2xl pointer-events-auto flex items-center gap-3 min-w-[320px]"
                    >
                        <div className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                            <X className="w-4 h-4 text-red-500" />
                        </div>
                        <span className="flex-1">{flash.error}</span>
                    </motion.div>
                )}
            </div>

            <Navbar />
            <main className="relative">{children}</main>

            {/* Floating WhatsApp Button */}
            <a
                href="https://wa.me/237676676120"
                target="_blank"
                rel="noreferrer"
                className="fixed bottom-8 right-8 z-50 p-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
                aria-label="Contact sur WhatsApp"
            >
                <Phone className="w-8 h-8 fill-current" />
                <span className="absolute right-full mr-4 bg-white text-slate-900 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                    Discuter sur WhatsApp
                </span>
            </a>

            <Footer />
        </div>
    );
}
