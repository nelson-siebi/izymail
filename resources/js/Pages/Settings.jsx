import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Card } from "@/Components/UI/Card";
import { Settings as SettingsIcon, Shield, User, Bell } from "lucide-react";
import { Button } from "@/Components/UI/Button";
import { Input } from "@/Components/UI/Input";

export default function Settings({ user }) {
    return (
        <AppLayout title="Paramètres">
            <Head title="Paramètres" />

            <div className="max-w-5xl mx-auto space-y-12">
                <div className="flex items-center gap-4 mb-12">
                    <div className="p-4 bg-indigo-600 rounded-2xl shadow-lg">
                        <SettingsIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Paramètres</h2>
                        <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Gérez votre profil et votre sécurité</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Navigation simple */}
                    <div className="space-y-2">
                        <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl bg-indigo-600 text-white font-bold shadow-xl">
                            <User className="w-5 h-5" /> Profil
                        </button>
                        <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-400 hover:bg-slate-800 font-bold transition-all">
                            <Shield className="w-5 h-5" /> Sécurité
                        </button>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-2 space-y-8">
                        <Card className="p-10 border-2 border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                            <h3 className="text-xl font-bold text-white uppercase mb-8">Informations Personnelles</h3>
                            <div className="space-y-6">
                                <Input label="Nom complet" value={user.name} disabled />
                                <Input label="Email" type="email" value={user.email} disabled />
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                                    Les informations de compte sont gérées au niveau du compte global Nelsius.
                                </p>
                            </div>
                        </Card>

                        <Card className="p-10 border-2 border-slate-800 bg-slate-900/50 backdrop-blur-xl border-dashed">
                            <h3 className="text-xl font-bold text-slate-500 uppercase mb-4">Sécurité avancée</h3>
                            <p className="text-sm text-slate-600 font-medium mb-8">L'authentification à deux facteurs et la gestion des sessions actives seront bientôt disponibles.</p>
                            <Button variant="outline" disabled className="border-slate-800 opacity-50">ACTIVER 2FA (SOON)</Button>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
