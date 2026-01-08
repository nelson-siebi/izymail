import React from "react";
import { Head } from "@inertiajs/react";
import SEO from "@/Components/SEO";
import PublicLayout from "@/Layouts/PublicLayout";
import { Cookie } from "lucide-react";

export default function Cookies() {
    return (
        <PublicLayout>
            <SEO
                title="Cookies"
                description="Informations sur l'utilisation des cookies sur la plateforme Izymail."
            />

            <div className="max-w-3xl mx-auto px-6 py-24">
                <div className="flex items-center gap-4 mb-10">
                    <Cookie className="w-10 h-10 text-indigo-500" />
                    <h1 className="text-4xl font-bold text-white uppercase tracking-tight">Politique des Cookies.</h1>
                </div>

                <div className="space-y-12 text-slate-400 leading-relaxed">
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-white uppercase tracking-wider">Pourquoi des cookies ?</h2>
                        <p>Nous utilisons des cookies pour maintenir votre session active, mémoriser vos préférences et analyser l'utilisation du dashboard pour améliorer notre UI/UX.</p>
                    </section>
                </div>
            </div>
        </PublicLayout>
    );
}
