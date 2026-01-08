import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/Components/UI/Button';
import { Input } from '@/Components/UI/Input';
import { Card } from '@/Components/UI/Card';
import { KeyRound, ArrowLeft } from 'lucide-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post("/forgot-password");
    };

    return (
        <PublicLayout>
            <Head title="Mot de passe oublié" />

            <div className="max-w-7xl mx-auto px-6 py-24 flex items-center justify-center min-h-[calc(100vh-200px)]">
                <Card className="max-w-md w-full p-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800 shadow-2xl">
                    <Link href="/login" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Retour connexion
                    </Link>

                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                            <KeyRound className="w-8 h-8 text-indigo-500" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white text-center mb-4 uppercase tracking-tight">Mot de passe oublié ?</h2>

                    <div className="mb-8 text-sm text-slate-400 text-center leading-relaxed">
                        Pas de problème. Indiquez simplement votre adresse email et nous vous enverrons un lien de réinitialisation de mot de passe qui vous permettra d'en choisir un nouveau.
                    </div>

                    {status && (
                        <div className="mb-6 font-medium text-sm text-green-500 text-center bg-green-500/10 p-3 rounded-xl border border-green-500/20">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Entrez votre email"
                            label="Email"
                            error={errors.email}
                        />

                        <Button className="w-full" size="lg" disabled={processing}>
                            {processing ? "ENVOI..." : "ENVOYER LE LIEN DE RÉINITIALISATION"}
                        </Button>
                    </form>
                </Card>
            </div>
        </PublicLayout>
    );
}
