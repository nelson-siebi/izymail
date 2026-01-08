import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Send,
    History,
    Key,
    CreditCard,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    Search,
    Mail,
    ShieldCheck,
    ChevronRight,
    Globe,
    Users
} from "lucide-react";
import { Button } from "@/Components/UI/Button";
import { cn } from "@/Lib/utils";

export default function AppLayout({ children, title }) {
    const { auth, flash } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Envoyer", href: "/send", icon: Send },
        { name: "Historique", href: "/history", icon: History },
        { name: "Clés API", href: "/api-keys", icon: Key },
        { name: "Abonnement", href: "/subscription", icon: CreditCard },
    ];

    const adminNav = [
        { name: "Stats Globales", href: "/admin/stats", icon: Globe },
        { name: "SMTP Servers", href: "/admin/smtp", icon: ShieldCheck },
        { name: "Plans", href: "/admin/plans", icon: Settings },
        { name: "Utilisateurs", href: "/admin/users", icon: Users },
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500 selection:text-white">
            {/* Mobile Sidebar Overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 md:hidden",
                    isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-72 bg-slate-900/50 backdrop-blur-3xl border-r border-slate-800/50 transition-transform duration-300 md:translate-x-0 overflow-y-auto scrollbar-none",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex flex-col min-h-full p-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 mb-12 group">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                            <Mail className="w-6 h-6 text-white" strokeWidth={2.5} />
                        </div>
                        <span className="text-2xl font-black text-white italic tracking-tighter uppercase">
                            Izymail
                        </span>
                    </Link>

                    {/* Nav */}
                    <nav className="flex-1 space-y-2">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 italic">Menu Principal</p>
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const active = usePage().url === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all group",
                                        active
                                            ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20"
                                            : "text-slate-400 hover:text-white hover:bg-slate-800"
                                    )}
                                >
                                    <Icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", active ? "text-white" : "text-slate-500 group-hover:text-indigo-400")} strokeWidth={2.5} />
                                    {item.name}
                                </Link>
                            );
                        })}

                        {/* Admin Section */}
                        {auth.user.is_admin && (
                            <div className="pt-10 mb-4">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 italic">Administration</p>
                                {adminNav.map((item) => {
                                    const Icon = item.icon;
                                    const active = usePage().url === item.href;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all group",
                                                active
                                                    ? "bg-slate-700 text-white shadow-xl"
                                                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                                            )}
                                        >
                                            <Icon className={cn("w-5 h-5", active ? "text-white" : "text-slate-500 group-hover:text-indigo-400")} strokeWidth={2.5} />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </nav>

                    {/* User Section */}
                    <div className="mt-auto pt-8 border-t-2 border-slate-800">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center font-black text-indigo-400 text-xl shadow-lg">
                                {auth.user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-black text-white truncate italic uppercase tracking-tighter">{auth.user?.name}</p>
                                <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest truncate">{auth.user?.plans?.[0]?.name || "Aucun Plan"}</p>
                            </div>
                        </div>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black text-red-500 hover:bg-red-500/10 transition-all text-xs uppercase italic tracking-widest"
                        >
                            <LogOut className="w-5 h-5" />
                            Déconnexion
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="md:ml-72 flex flex-col min-h-screen">
                {/* Topbar */}
                <header className="h-20 bg-slate-950/50 backdrop-blur-xl border-b border-slate-800/50 flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
                        >
                            <Menu className="w-7 h-7" />
                        </button>
                        <h1 className="text-xl font-bold text-white uppercase tracking-tight">
                            {title || "Overview"}
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden lg:flex relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-500" />
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="bg-[#020617] border-2 border-slate-800 rounded-2xl pl-12 pr-6 py-3 text-sm font-bold text-white focus:outline-none focus:border-indigo-600 transition-all w-64"
                            />
                        </div>
                        <button className="relative p-3 rounded-2xl bg-slate-800 border-2 border-slate-700 text-slate-400 hover:text-white transition-all shadow-lg active:scale-95">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 border-2 border-[#0f172a] rounded-full"></span>
                        </button>
                    </div>
                </header>

                {/* Scrollable Page Content */}
                <div className="p-8 md:p-12 flex-1">
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

                    <motion.div
                        key={usePage().url}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
