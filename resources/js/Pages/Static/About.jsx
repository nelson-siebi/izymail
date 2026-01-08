import React from "react";
import { Head, usePage } from "@inertiajs/react";
import SEO from "@/Components/SEO";
import PublicLayout from "@/Layouts/PublicLayout";
import { Heart, Target, Users } from "lucide-react";

export default function About() {
    const { settings = {} } = usePage().props;

    return (
        <PublicLayout>
            <SEO
                title="À propos"
                description="Découvrez l'histoire de Izymail et notre mission de révolutionner l'emailing en Afrique."
            />

            <div className="max-w-4xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tight">
                        Notre <span className="text-indigo-500">Mission.</span>
                    </h1>
                    <p className="text-xl text-slate-400 font-medium leading-relaxed">
                        Construire l'infrastructure de communication du futur pour l'Afrique.
                    </p>
                </div>

                <div className="prose prose-invert max-w-none space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3 uppercase tracking-wider">
                            <Target className="w-6 h-6 text-indigo-500" />
                            Pourquoi {settings.site_name || 'Izymail'} ?
                        </h2>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            Le marché africain de la tech est en pleine explosion, mais les solutions d'emailing restent souvent trop chères, complexes à intégrer ou inadaptées aux moyens de paiement locaux. Izymail est né de la volonté de briser ces barrières.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-[32px]">
                            <h3 className="text-xl font-bold text-white mb-4 uppercase flex items-center gap-2">
                                <Heart className="w-5 h-5 text-red-500" /> Passion
                            </h3>
                            <p className="text-slate-400">Nous sommes des développeurs africains travaillant pour des entreprises africaines et globales.</p>
                        </div>
                        <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-[32px]">
                            <h3 className="text-xl font-bold text-white mb-4 uppercase flex items-center gap-2">
                                <Users className="w-5 h-5 text-blue-500" /> Accessibilité
                            </h3>
                            <p className="text-slate-400">L'emailing ne devrait pas être un luxe. Nous proposons des tarifs justes payables en Mobile Money.</p>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
