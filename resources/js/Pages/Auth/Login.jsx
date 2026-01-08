import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";
import { Button } from "@/Components/UI/Button";
import { Input } from "@/Components/UI/Input";
import { Card } from "@/Components/UI/Card";
import { Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/Lib/utils";

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post("/login", {
            onFinish: () => reset("password"),
        });
    };

    return (
        <PublicLayout title="Connexion">
            <div className="flex items-center justify-center p-6 py-24 bg-slate-950 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-screen bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="w-full max-w-lg relative">
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
                            Heureux de vous revoir !
                        </h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <Card className="p-10 border-2 border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                            <form onSubmit={submit} className="space-y-8">
                                <Input
                                    label="Adresse Email"
                                    type="email"
                                    placeholder="nom@exemple.com"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                    error={errors.email}
                                    required
                                />

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] ml-1">
                                            Mot de passe
                                        </label>
                                        <Link href="/forgot-password" dclassName="text-[10px] font-bold text-indigo-500 uppercase tracking-widest hover:text-white transition-colors">
                                            Oublié ?
                                        </Link>
                                    </div>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        value={data.password}
                                        onChange={(e) => setData("password", e.target.value)}
                                        error={errors.password}
                                        required
                                    />
                                </div>

                                <div className="flex items-center">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 bg-slate-900 border border-slate-700 rounded-md checked:bg-indigo-600 focus:ring-0 transition-all cursor-pointer"
                                            checked={data.remember}
                                            onChange={(e) => setData("remember", e.target.checked)}
                                        />
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-300 transition-colors">
                                            Se souvenir de moi
                                        </span>
                                    </label>
                                </div>

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
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>AUTHENTIFICATION...</span>
                                        </div>
                                    ) : (
                                        <>
                                            SE CONNECTER MAINTENANT
                                            <ArrowRight className="ml-2 w-5 h-5" strokeWidth={2.5} />
                                        </>
                                    )}
                                </Button>
                            </form>

                            <div className="mt-10 pt-8 border-t border-slate-800/50 text-center text-sm font-medium">
                                <p className="text-slate-400 mb-4">Pas encore de compte ?</p>
                                <Link
                                    href="/register"
                                    className="text-indigo-500 font-bold uppercase tracking-widest hover:text-white transition-colors"
                                >
                                    CRÉER UN COMPTE GRATUIT
                                </Link>
                            </div>
                        </Card>
                    </motion.div>

                    <div className="mt-8 text-center text-slate-500 font-bold">
                        <Link href="/" className="hover:text-white transition-colors">
                            &larr; REVENIR À L'ACCUEIL
                        </Link>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
