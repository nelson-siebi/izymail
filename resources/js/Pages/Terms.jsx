import React from "react";
import { Head } from "@inertiajs/react";
import SEO from "@/Components/SEO";
import PublicLayout from "@/Layouts/PublicLayout";

export default function Terms() {
    return (
        <PublicLayout>
            <SEO
                title="Conditions d'Utilisation"
                description="Les conditions générales d'utilisation des services Izymail."
            />
            <div className="max-w-3xl mx-auto px-6 py-32">
                <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-16 uppercase">Conditions <span className="text-indigo-500">Générales.</span></h1>

                <div className="space-y-12 text-slate-500 font-medium leading-relaxed text-base">
                    <section>
                        <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4">1. Acceptation</h2>
                        <p>En utilisant Izymail, vous acceptez sans réserve les présentes conditions. Notre service est destiné à l'envoi d'emails professionnels uniquement.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4">2. Usage Interdit</h2>
                        <p>Le spam, le phishing et l'envoi de contenus illégaux sont strictement interdits. Tout compte identifié comme source de spam sera suspendu sans préavis ni remboursement.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4">3. Paiement</h2>
                        <p>Les abonnements sont facturés mensuellement via Nelsius Pay. Aucun remboursement ne sera effectué en cas de suspension pour non-respect des règles d'utilisation.</p>
                    </section>
                </div>
            </div>
        </PublicLayout>
    );
}
