import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Card } from "@/Components/UI/Card";
import { Button } from "@/Components/UI/Button";
import {
    CreditCard,
    CheckCircle2,
    Zap,
    Activity,
    ChevronRight,
    ShieldCheck
} from "lucide-react";
import { formatCurrency, cn } from "@/Lib/utils";

export default function Subscription({ currentPlan, usage, availablePlans }) {
    const plan = currentPlan;
    const dailySent = usage?.dailySent || 0;
    const dailyLimit = usage?.dailyLimit || 100;
    const usagePercent = Math.min((dailySent / dailyLimit) * 100, 100);

    const handleUpgrade = (planId) => {
        router.post(`/subscription/upgrade/${planId}`);
    };

    return (
        <AppLayout title="Mon Abonnement">
            <Head title="Abonnement" />

            <div className="max-w-7xl space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Current Plan Card */}
                    <Card className={cn(
                        "lg:col-span-2 p-10 border shadow-2xl relative overflow-hidden transition-all duration-500",
                        plan ? "bg-indigo-600 border-indigo-500 shadow-indigo-600/20 text-white" : "bg-slate-900/50 border-slate-800 text-slate-400 backdrop-blur-xl"
                    )}>
                        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                            <Zap className="w-64 h-64 -translate-y-1/2 translate-x-1/2" />
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row gap-10">
                            <div className="flex-1">
                                <p className={cn(
                                    "text-[10px] font-bold uppercase tracking-[0.2em] mb-6",
                                    plan ? "text-indigo-200" : "text-slate-500"
                                )}>
                                    Plan Actuel
                                </p>
                                <h3 className={cn(
                                    "text-4xl font-bold uppercase tracking-tight mb-2",
                                    plan ? "text-white" : "text-slate-700"
                                )}>
                                    {plan?.name || "Aucun Plan"}
                                </h3>
                                <p className={cn(
                                    "text-2xl font-bold mb-8",
                                    plan ? "text-indigo-100" : "text-slate-500"
                                )}>
                                    {plan ? formatCurrency(plan.price) : "Limitation Sandbox"}
                                    <span className="text-xs tracking-widest uppercase ml-2 opacity-60">/ mois</span>
                                </p>

                                {plan ? (
                                    <div className="space-y-4 mb-10 bg-black/10 p-6 rounded-3xl border border-white/5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-bold text-indigo-100 uppercase tracking-widest">Utilisation Quotidienne</span>
                                            <span className="text-lg font-bold">{dailySent} / {dailyLimit.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                                            <div className="bg-white h-full transition-all duration-1000" style={{ width: `${usagePercent}%` }}></div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6 mb-10">
                                        <div className="p-6 rounded-3xl border border-slate-800 bg-slate-800/20">
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                                                Mode Gratuit : Accès limité à 100 emails / jour.
                                            </p>
                                        </div>
                                        <div className="space-y-4 bg-slate-800/20 p-6 rounded-3xl border border-slate-800/50">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Consomation Libre</span>
                                                <span className="text-lg font-bold text-slate-400">{dailySent} / {dailyLimit}</span>
                                            </div>
                                            <div className="w-full bg-slate-800/50 h-3 rounded-full overflow-hidden">
                                                <div className="bg-indigo-500 h-full transition-all duration-1000" style={{ width: `${usagePercent}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Card className="bg-white/5 border-white/10 p-8 md:w-80 shrink-0 backdrop-blur-xl">
                                <Link href="/settings" className="flex items-center gap-4 mb-6 text-indigo-300 hover:text-white transition-colors group">
                                    <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    <h4 className="font-bold uppercase text-xs tracking-widest">Sécurité & Factures</h4>
                                </Link>
                                <div className="space-y-4 mb-8">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Plateforme</p>
                                    <p className="text-xs font-bold text-white flex items-center gap-2">
                                        Nelsius Pay Gateway
                                        <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[8px] rounded-full border border-green-500/20">SSL</span>
                                    </p>
                                </div>
                                <Link href="/billing/invoices">
                                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 italic font-black text-[10px] tracking-[0.2em]">MES FACTURES</Button>
                                </Link>
                            </Card>
                        </div>
                    </Card>

                    {/* Stats or Promo */}
                    <Card className="p-10 bg-slate-900/50 backdrop-blur-xl border border-slate-800 flex flex-col justify-center text-center">
                        <Activity className="w-12 h-12 text-indigo-500 mx-auto mb-6" />
                        <h4 className="text-xl font-bold text-white uppercase tracking-tight mb-4">Besoin d'aide ?</h4>
                        <p className="text-slate-500 font-medium text-sm mb-8 leading-relaxed">Notre équipe technique vous accompagne pour l'intégration de votre API 24/7.</p>
                        <Link href="/contact">
                            <Button variant="secondary" className="w-full font-black text-[10px] tracking-[0.2em]">SUPPORT TECHNIQUE</Button>
                        </Link>
                    </Card>
                </div>

                {/* Available Plans Section */}
                <div>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-px flex-1 bg-slate-800/50"></div>
                        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">Plans Disponibles</h2>
                        <div className="h-px flex-1 bg-slate-800/50"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {availablePlans.map((p) => (
                            <Card key={p.id} className="p-10 bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 transition-all group backdrop-blur-xl">
                                <h4 className="text-xl font-bold text-white uppercase tracking-tight mb-2">{p.name}</h4>
                                <div className="flex items-baseline gap-2 mb-8">
                                    <span className="text-4xl font-bold text-white tracking-tight">{formatCurrency(p.price).split(' ')[0]}</span>
                                    <span className="text-lg font-bold text-indigo-500 uppercase tracking-widest">FCFA</span>
                                </div>

                                <ul className="space-y-4 mb-10">
                                    <li className="flex items-center gap-3 text-slate-500 font-medium text-sm">
                                        <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                                        {p.max_mails_per_day.toLocaleString()} emails / jour
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-500 font-medium text-sm">
                                        <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                                        Rotation SMTP active
                                    </li>
                                </ul>

                                <Button onClick={() => handleUpgrade(p.id)} className="w-full group-hover:bg-indigo-600 transition-colors">
                                    CHOISIR CE PLAN <ChevronRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
