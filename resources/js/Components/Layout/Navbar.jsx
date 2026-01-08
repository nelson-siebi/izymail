import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Menu, X, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/Components/UI/Button";
import { cn } from "@/Lib/utils";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { auth } = usePage().props;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Accueil", href: "/" },
        { name: "Fonctionnalités", href: "/#features" },
        { name: "Tarifs", href: "/#pricing" },
        { name: "Documentation", href: "/docs" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                scrolled
                    ? "bg-[#020617]/80 backdrop-blur-xl border-slate-800 py-4"
                    : "bg-transparent border-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20 group-hover:rotate-3 transition-transform">
                        <Mail className="w-5 h-5 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight uppercase">
                        Izymail
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[11px] font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-[0.2em]"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="hidden lg:flex items-center gap-6">
                    {auth.user ? (
                        <Link href="/dashboard">
                            <Button variant="primary" size="md" className="rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider">
                                DASHBOARD
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-[11px] font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-[0.2em]"
                            >
                                Connexion
                            </Link>
                            <Link href="/register">
                                <Button variant="primary" size="md" className="rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider">
                                    DÉMARRER
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    "fixed inset-0 top-[73px] bg-[#020617] transform transition-transform duration-300 lg:hidden z-40 overflow-y-auto px-6 py-10",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex flex-col gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-3xl font-black text-white italic uppercase tracking-tighter hover:text-indigo-500 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <hr className="border-slate-800" />
                    <div className="flex flex-col gap-4">
                        {auth.user ? (
                            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="w-full">
                                <Button variant="primary" size="lg" className="w-full">
                                    DASHBOARD
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <>
                                    <Link href="/login" onClick={() => setIsOpen(false)} className="w-full">
                                        <Button variant="outline" size="lg" className="w-full">
                                            CONNEXION
                                        </Button>
                                    </Link>
                                    <Link href="/register" onClick={() => setIsOpen(false)} className="w-full">
                                        <Button variant="primary" size="lg" className="w-full">
                                            CRÉER UN COMPTE
                                        </Button>
                                    </Link>
                                </>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
