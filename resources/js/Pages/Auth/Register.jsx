import React, { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";
import { Button } from "@/Components/UI/Button";
import { Input } from "@/Components/UI/Input";
import { Card } from "@/Components/UI/Card";
import { Mail, ArrowRight, User, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/Lib/utils";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        plan_id: new URLSearchParams(window.location.search).get('plan') || "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post("/register", {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <PublicLayout title="Créer un compte">
            <div className="flex items-center justify-center p-6 py-24 bg-slate-950 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-screen bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="w-full max-w-xl relative">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-3 mb-8 group">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-600/20 group-hover:rotate-3 transition-transform">
                                <Mail className="w-6 h-6 text-white" strokeWidth={2.5} />
                            </div>
                            <span className="text-3xl font-bold text-white tracking-tight uppercase">
                                Izymail
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-tight leading-tight">
                            Prêt à scaler ?
                        </h2>
                        <p className="mt-4 text-slate-500 font-medium uppercase tracking-[0.15em] text-[10px]">
                            Inscrivez-vous et commencez à envoyer vos emails
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Card className="p-10 border-2 border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                            <form onSubmit={submit} className="space-y-6">
                                <Input
                                    label="Nom Complet"
                                    type="text"
                                    placeholder="John Doe"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    error={errors.name}
                                    required
                                />

                                <Input
                                    label="Adresse Email"
                                    type="email"
                                    placeholder="john@companie.afrika"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                    error={errors.email}
                                    required
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Mot de passe"
                                        type="password"
                                        placeholder="••••••••"
                                        value={data.password}
                                        onChange={(e) => setData("password", e.target.value)}
                                        error={errors.password}
                                        required
                                    />
                                    <Input
                                        label="Confirmation"
                                        type="password"
                                        placeholder="••••••••"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData("password_confirmation", e.target.value)}
                                        error={errors.password_confirmation}
                                        required
                                    />
                                </div>

                                {data.plan_id && (
                                    <div className="p-4 bg-indigo-600/5 border border-indigo-500/20 rounded-2xl flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center">
                                            <ShieldCheck className="w-5 h-5 text-indigo-500" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Plan Sélectionné</p>
                                            <p className="text-sm font-bold text-indigo-400 uppercase tracking-tight">ID DU PLAN : {data.plan_id}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        size="xl"
                                        className={cn(
                                            "w-full transition-all duration-500",
                                            processing ? "opacity-70 scale-95" : "hover:shadow-2xl hover:shadow-indigo-600/20"
                                        )}
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <div className="flex items-center gap-3">
                                                <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>CRÉATION DU COMPTE...</span>
                                            </div>
                                        ) : (
                                            "DÉMARRER MON EXPÉRIENCE →"
                                        )}
                                    </Button>
                                </div>
                            </form>

                            <div className="mt-10 pt-8 border-t border-slate-800/50 text-center text-sm font-medium">
                                <p className="text-slate-400 mb-4">Déjà un compte ?</p>
                                <Link
                                    href="/login"
                                    className="text-indigo-500 font-bold uppercase tracking-widest hover:text-white transition-colors"
                                >
                                    SE CONNECTER ICI
                                </Link>
                            </div>
                        </Card>
                    </motion.div>

                    <p className="mt-12 text-center text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em] max-w-sm mx-auto leading-relaxed">
                        En créant un compte, vous acceptez nos <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">Conditions d'Utilisation</Link> et notre <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">Politique de Confidentialité</Link>.
                    </p>
                </div>
            </div>
        </PublicLayout>
    );
}
