import React from "react";
import { Head, Link } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";
import SEO from "@/Components/SEO";
import { Button } from "@/Components/UI/Button";
import {
    Zap,
    ShieldCheck,
    BarChart3,
    RotateCw,
    Code2,
    Smartphone,
    CheckCircle2,
    ChevronRight,
    TrendingUp,
    Inbox
} from "lucide-react";
import { motion } from "framer-motion";
import { formatCurrency, cn } from "@/Lib/utils";

const features = [
    {
        icon: RotateCw,
        title: "Rotation SMTP",
        desc: "Basculez automatiquement entre plusieurs serveurs pour une délivrabilité maximale.",
        color: "text-indigo-500"
    },
    {
        icon: ShieldCheck,
        title: "Sandbox Mode",
        desc: "Testez vos intégrations sans envoyer de mails réels à vos clients.",
        color: "text-yellow-500"
    },
    {
        icon: BarChart3,
        title: "Analytics Pro",
        desc: "Suivez vos taux d'ouverture et d'échec en temps réel sur un dashboard clean.",
        color: "text-blue-500"
    },
    {
        icon: Code2,
        title: "API RESTful",
        desc: "Intégrez Izymail en 5 minutes avec notre documentation simple et claire.",
        color: "text-purple-500"
    },
    {
        icon: Smartphone,
        title: "Paiement Local",
        desc: "Payez via Orange, MTN ou Wave grâce à notre intégration Nelsius Pay.",
        color: "text-orange-500"
    },
    {
        icon: Zap,
        title: "Haute Disponibilité",
        desc: "Notre infrastructure est taillée pour le scale et la vitesse.",
        color: "text-cyan-500"
    }
];

export default function Landing({ plans }) {
    return (
        <PublicLayout>
            <SEO
                title="Infrastructure d'Emailing Pro pour l'Afrique"
                keywords="emailing, api email, smtp africain, nelsius, marketing email, transactional email"
            />

            {/* Hero Section */}
            <section className="relative pt-24 pb-32 md:pt-40 md:pb-48 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-indigo-900/40 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] bg-blue-900/30 rounded-full blur-[100px]"></div>
                </div>

                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-slate-900 border border-indigo-500/30 font-bold text-indigo-400 text-[10px] tracking-[0.2em] mb-8 uppercase">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-25"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            N°1 infrastructure email en Afrique
                        </span>

                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white mb-10 leading-[0.85] uppercase">
                            L'Emailing <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-400 to-indigo-500">Sans Limites.</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-14 font-medium leading-relaxed">
                            Délivrez vos messages instantanément, gérez vos SMTP et payez en{" "}
                            <span className="text-white border-b-2 border-indigo-500/50 pb-1">FCFA</span> locale.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/register">
                                <Button size="xl">COMMENCER GRATUITEMENT</Button>
                            </Link>
                            <Link href="#features">
                                <Button variant="secondary" size="xl">VOIR LA DÉMO</Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Hero Mockup */}
                    <motion.div
                        className="mt-24 relative max-w-5xl mx-auto p-3 bg-slate-900/50 backdrop-blur-3xl border border-slate-800 rounded-[40px] shadow-2xl overflow-hidden"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 1 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent z-10"></div>
                        <img
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2666&auto=format&fit=crop"
                            alt="Dashboard Preview"
                            className="w-full h-auto rounded-[32px] opacity-60"
                        />

                        {/* Floating Badge */}
                        <div className="absolute bottom-12 left-12 z-20 bg-slate-950/80 backdrop-blur-xl border border-slate-800 p-6 rounded-[32px] shadow-2xl text-left hidden md:block">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                                    <Inbox className="w-6 h-6 text-indigo-500" />
                                </div>
                                <div className="text-2xl font-bold text-white tracking-tight">99.8%</div>
                            </div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Taux de délivrabilité</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Social Proof */}
            {/* Social Proof */}
            <section className="py-20 border-y border-slate-800/50 bg-slate-950">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-[10px] font-bold text-slate-500 mb-12 uppercase tracking-[0.3em]">REJOIGNEZ LES MEILLEURES STARTUPS D'AFRIQUE</p>
                    <div className="flex flex-wrap justify-center items-center gap-16 grayscale opacity-20 hover:opacity-50 transition-opacity">
                        <span className="text-2xl font-bold text-white tracking-widest uppercase">NELSIUS</span>
                        <span className="text-2xl font-bold text-white tracking-widest uppercase">AFRIPAY</span>
                        <span className="text-2xl font-bold text-white tracking-widest uppercase">TECHHUB</span>
                        <span className="text-2xl font-bold text-white tracking-widest uppercase">DEVCORE</span>
                        <span className="text-2xl font-bold text-white tracking-widest uppercase">MAILFLOW</span>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <div className="text-indigo-500 font-bold uppercase tracking-widest text-[10px] mb-4">Fonctionnalités</div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight uppercase">Tout pour votre Inbox.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                className="p-10 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[40px] hover:border-indigo-500/30 transition-all duration-300 group shadow-lg"
                                whileHover={{ y: -5 }}
                            >
                                <div className={cn("w-14 h-14 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center mb-8 shadow-xl group-hover:scale-105 transition-transform", f.color)}>
                                    <f.icon className="w-6 h-6" strokeWidth={2} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{f.title}</h3>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Steps / How it works */}
            <section className="py-32 bg-slate-950 border-y border-slate-800/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight uppercase mb-8 leading-tight">Lancez-vous en <br /><span className="text-indigo-500">4 étapes.</span></h2>
                            <div className="space-y-12">
                                {[
                                    { n: "01", t: "Créez votre compte", d: "Inscrivez-vous en 30 secondes et choisissez votre plan." },
                                    { n: "02", t: "Configurez l'API", d: "Générez votre token et intégrez notre librairie cURL / Guzzle." },
                                    { n: "03", t: "Envoyez vos mails", d: "Utilisez la puissance de notre rotation SMTP intelligente." },
                                    { n: "04", t: "Suivez le succès", d: "Consultez vos logs et ajustez vos campagnes en temps réel." },
                                ].map((s, i) => (
                                    <div key={i} className="flex gap-8">
                                        <span className="text-6xl font-bold text-indigo-500/10 tracking-tighter leading-none">{s.n}</span>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">{s.t}</h4>
                                            <p className="text-slate-500 font-medium text-base">{s.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-indigo-600/5 blur-[100px] rounded-full"></div>
                            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-[40px] shadow-3xl relative overflow-hidden">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                                </div>
                                <code className="text-indigo-400 font-mono text-sm leading-relaxed block overflow-x-auto whitespace-pre">
                                    {`curl -X POST https://izymail.nelsius.com/api/send \\
  -H "Authorization: Bearer izy_..." \\
  -d "to=client@afrique.com" \\
  -d "subject=Flash Sale!" \\
  -d "content=<h1>Bravo!</h1>"`}
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-32 px-6 bg-slate-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tight">Paiement Simple.</h2>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">Facturé en FCFA via Nelsius Pay.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans?.map((plan, i) => (
                            <div key={plan.id} className={cn(
                                "bg-slate-900/50 backdrop-blur-xl border p-12 rounded-[40px] flex flex-col relative overflow-hidden group transition-all duration-300 hover:scale-[1.02]",
                                i === 1 ? 'border-indigo-500/50 shadow-2xl shadow-indigo-500/10' : 'border-slate-800'
                            )}>
                                {i === 1 && (
                                    <div className="absolute top-8 right-[-35px] bg-indigo-600 text-white font-bold px-12 py-2 rotate-45 text-[8px] shadow-xl uppercase tracking-widest">POPULAIRE</div>
                                )}

                                <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">{plan.name}</h3>
                                <div className="flex items-baseline gap-2 mb-10">
                                    <span className="text-5xl font-bold text-white tracking-tight">{formatCurrency(plan.price).split(' ')[0]}</span>
                                    <span className="text-xl font-bold text-indigo-500 uppercase tracking-widest">FCFA</span>
                                    <span className="text-slate-500 font-medium text-sm">/mois</span>
                                </div>

                                <ul className="space-y-5 mb-12 flex-1">
                                    <li className="flex items-center gap-4 text-slate-400 text-sm font-medium">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-500" strokeWidth={2.5} />
                                        <span>{plan.max_mails_per_day.toLocaleString()} emails / jour</span>
                                    </li>
                                    <li className="flex items-center gap-4 text-slate-400 text-sm font-medium">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-500" strokeWidth={2.5} />
                                        <span>Attachments {plan.max_attachment_size_mb}Mo</span>
                                    </li>
                                    <li className="flex items-center gap-4 text-slate-400 text-sm font-medium">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-500" strokeWidth={2.5} />
                                        <span>API Access inclus</span>
                                    </li>
                                </ul>

                                <Link href={`/register?plan=${plan.id}`}>
                                    <Button variant={i === 1 ? 'primary' : 'secondary'} size="lg" className="w-full">
                                        CHOISIR CE PLAN
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-40 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-indigo-600/5 -z-10 blur-[150px]"></div>
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tight uppercase mb-12 leading-none">
                        Prêt à passer <br />au <span className="text-indigo-500">niveau supérieur ?</span>
                    </h2>
                    <Link href="/register">
                        <Button size="xl" className="px-16 shadow-xl shadow-indigo-600/20">
                            DÉMARRER MAINTENANT <ChevronRight className="ml-2 w-6 h-6" strokeWidth={2.5} />
                        </Button>
                    </Link>
                    <p className="mt-12 text-slate-600 font-bold text-[10px] uppercase tracking-[0.3em]">Aucune carte bancaire requise. Paiement local.</p>
                </div>
            </section>
        </PublicLayout>
    );
}
