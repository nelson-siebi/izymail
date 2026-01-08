import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Mail, Instagram, Twitter, Linkedin, Facebook, MessageSquare } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { settings = {} } = usePage().props;

    const sections = [
        {
            title: "Produit",
            links: [
                { name: "Fonctionnalités", href: "/#features" },
                { name: "Tarifs", href: "/#pricing" },
                { name: "Documentation", href: "/docs" },
                { name: "Nelius Pay", href: "https://nelius.pay" },
            ],
        },
        {
            title: "Entreprise",
            links: [
                { name: "À propos", href: "/about" },
                { name: "Contact", href: "/contact" },
                { name: "Carrières", href: "/careers" },
                { name: "Blog", href: "/blog" },
            ],
        },
        {
            title: "Légal",
            links: [
                { name: "Conditions", href: "/terms" },
                { name: "Confidentialité", href: "/privacy" },
                { name: "Cookies", href: "/cookies" },
            ],
        },
    ];

    const socialIcons = [
        { Icon: Facebook, key: 'social_facebook' },
        { Icon: Twitter, key: 'social_twitter' },
        { Icon: Instagram, key: 'social_instagram' },
        { Icon: Linkedin, key: 'social_linkedin' },
        { Icon: MessageSquare, key: 'social_whatsapp' },
    ];

    return (
        <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
                    <div className="lg:col-span-2 space-y-8">
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20 group-hover:rotate-6 transition-all duration-300">
                                <Mail className="w-5 h-5 text-white" strokeWidth={2.5} />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight uppercase">
                                {settings.site_name || 'Izymail'}
                            </span>
                        </Link>
                        <p className="text-slate-500 font-medium text-base leading-relaxed max-w-sm">
                            {settings.site_description || "Solution d'emailing professionnelle haute performance pour le marché africain."}
                        </p>
                        <div className="flex items-center gap-3">
                            {socialIcons.map(({ Icon, key }, i) => settings[key] && (
                                <a
                                    key={i}
                                    href={settings[key]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-xl bg-slate-900/50 border border-slate-800/50 flex items-center justify-center text-slate-500 hover:text-indigo-400 hover:border-indigo-500/30 transition-all duration-300"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {sections.map((section) => (section &&
                        <div key={section.title}>
                            <h4 className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em] mb-8">
                                {section.title}
                            </h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-xs font-medium text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-[10px] font-medium text-slate-600 uppercase tracking-widest">
                        © {currentYear} {settings.site_name || 'Izymail'}. {settings.footer_text || 'Fait avec passion en Afrique.'}
                    </p>
                    <div className="flex items-center gap-8">
                        <span className="text-[9px] font-bold text-slate-700 uppercase tracking-[0.3em]">Propulsé par Nelius Group</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
