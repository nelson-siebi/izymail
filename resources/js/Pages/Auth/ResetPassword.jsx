import React, { useEffect } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/Components/UI/Button';
import { Input } from '@/Components/UI/Input';
import { Card } from '@/Components/UI/Card';
import { Lock, ArrowLeft } from 'lucide-react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post("/reset-password");
    };

    return (
        <PublicLayout>
            <Head title="Réinitialiser le mot de passe" />

            <div className="max-w-7xl mx-auto px-6 py-24 flex items-center justify-center min-h-[calc(100vh-200px)]">
                <Card className="max-w-md w-full p-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800 shadow-2xl">
                    <Link href="/login" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Retour connexion
                    </Link>

                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                            <Lock className="w-8 h-8 text-indigo-500" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white text-center mb-8 uppercase tracking-tight">Nouveau Mot de passe</h2>

                    <form onSubmit={submit} className="space-y-6">
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('email', e.target.value)}
                            label="Email"
                            error={errors.email}
                            disabled
                        />

                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            isFocused={true}
                            onChange={(e) => setData('password', e.target.value)}
                            label="Nouveau Mot de passe"
                            error={errors.password}
                        />

                        <Input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            label="Confirmer le mot de passe"
                            error={errors.password_confirmation}
                        />

                        <Button className="w-full" size="lg" disabled={processing}>
                            {processing ? "RÉINITIALISATION..." : "RÉINITIALISER LE MOT DE PASSE"}
                        </Button>
                    </form>
                </Card>
            </div>
        </PublicLayout>
    );
}
