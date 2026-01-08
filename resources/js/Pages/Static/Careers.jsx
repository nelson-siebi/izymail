import React from "react";
import { Head } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";
import { Briefcase, Code, PenTool, Rocket } from "lucide-react";

export default function Careers() {
    return (
        <PublicLayout>
            <Head title="Carrières" />

            <div className="max-w-5xl mx-auto px-6 py-24 text-center">
                <Rocket className="w-16 h-16 text-indigo-500 mx-auto mb-8" />
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tight">Rejoignez l'Aventure.</h1>
                <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-16">Nous sommes toujours à la recherche de talents passionnés pour révolutionner l'emailing en Afrique.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {[
                        { icon: Code, title: "Engineering", count: "2 postes", desc: "Backend Laravel & Infrastructure Cloud." },
                        { icon: PenTool, title: "Design", count: "1 poste", desc: "UI/UX & Branding Product." },
                        { icon: Briefcase, title: "Business", count: "0 poste", desc: "Sales & Account Management." }
                    ].map((job, i) => (
                        <div key={i} className="p-10 bg-slate-900/50 border border-slate-800 rounded-[40px] hover:border-indigo-500/30 transition-all group">
                            <job.icon className="w-8 h-8 text-indigo-500 mb-6" />
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xl font-bold text-white uppercase tracking-tight">{job.title}</h3>
                                <span className="text-[10px] font-black text-slate-600 uppercase">{job.count}</span>
                            </div>
                            <p className="text-slate-500 text-sm font-medium">{job.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 p-12 bg-indigo-600/5 border border-indigo-500/20 rounded-[40px]">
                    <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">Candidature Spontanée ?</h2>
                    <p className="text-slate-400 mb-8">Envoyez votre CV et portfolio à <span className="text-white font-bold">careers@izymail.com</span></p>
                </div>
            </div>
        </PublicLayout>
    );
}
