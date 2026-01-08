import React from "react";
import { Head } from "@inertiajs/react";
import SEO from "@/Components/SEO";
import PublicLayout from "@/Layouts/PublicLayout";
import { ShieldCheck } from "lucide-react";

export default function Privacy() {
    return (
        <PublicLayout>
            <SEO
                title="Confidentialité"
                description="Consultez notre politique de confidentialité pour comprendre comment nous protégeons vos données chez Izymail."
            />

            <div className="max-w-3xl mx-auto px-6 py-24">
                <div className="flex items-center gap-4 mb-10">
                    <ShieldCheck className="w-10 h-10 text-indigo-500" />
                    <h1 className="text-4xl font-bold text-white uppercase tracking-tight">Confidentialité.</h1>
                </div>

                <div className="space-y-12 text-slate-400 leading-relaxed">
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-white uppercase tracking-wider">1. Collecte des données</h2>
                        <p>Nous collectons uniquement les informations nécessaires au bon fonctionnement de notre service d'emailing : nom, email, et logs d'envoi.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-white uppercase tracking-wider">2. Utilisation</h2>
                        <p>Vos données ne sont jamais vendues. Elles servent uniquement à assurer la délivrabilité de vos messages et à gérer votre abonnement.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-white uppercase tracking-wider">3. Sécurité</h2>
                        <p>Toutes les données sont chiffrées et stockées sur des serveurs sécurisés. L'accès à l'API est protégé par des tokens personnels révocables.</p>
                    </section>
                </div>
            </div>
        </PublicLayout>
    );
}
