import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/UI/Button';
import { Card } from '@/Components/UI/Card';
import { Mail, LogOut } from 'lucide-react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post("/email/verification-notification");
    };

    return (
        <PublicLayout>
            <Head title="Vérification Email" />

            <div className="max-w-7xl mx-auto px-6 py-24 flex items-center justify-center min-h-[calc(100vh-200px)]">
                <Card className="max-w-md w-full p-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800 shadow-2xl">
                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                            <Mail className="w-8 h-8 text-indigo-500" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white text-center mb-4 uppercase tracking-tight">Vérifiez votre email</h2>

                    <div className="mb-8 text-sm text-slate-400 text-center leading-relaxed">
                        Merci pour votre inscription ! Avant de commencer, pourriez-vous vérifier votre adresse email en cliquant sur le lien que nous venons de vous envoyer ? Si vous n'avez rien reçu, nous serons ravis de vous en envoyer un autre.
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="mb-6 font-medium text-sm text-green-500 text-center bg-green-500/10 p-3 rounded-xl border border-green-500/20">
                            Un nouveau lien de vérification a été envoyé à l'adresse email fournie lors de l'inscription.
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <Button className="w-full" size="lg" disabled={processing}>
                            {processing ? "ENVOI EN COURS..." : "RENVOYER L'EMAIL DE VÉRIFICATION"}
                        </Button>

                        <div className="flex items-center justify-center pt-4">
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="text-sm text-slate-500 hover:text-white transition-colors flex items-center gap-2 group"
                            >
                                <LogOut className="w-4 h-4 group-hover:text-red-500 transition-colors" />
                                Déconnexion
                            </Link>
                        </div>
                    </form>
                </Card>
            </div>
        </PublicLayout>
    );
}
