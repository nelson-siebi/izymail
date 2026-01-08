import React, { useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Card } from "@/Components/UI/Card";
import { Button } from "@/Components/UI/Button";
import { Input } from "@/Components/UI/Input";
import {
    Key,
    Copy,
    RefreshCcw,
    AlertCircle,
    CheckCircle2,
    ShieldAlert,
    Trash2,
    Plus
} from "lucide-react";
import { cn } from "@/Lib/utils";

import { usePage } from "@inertiajs/react";

export default function ApiKeys({ tokens }) {
    const { flash } = usePage().props;
    const [copiedId, setCopiedId] = useState(null);
    const [showTokenModal, setShowTokenModal] = useState(false);
    const [newToken, setNewToken] = useState(null);
    const [justCopied, setJustCopied] = useState(false);

    React.useEffect(() => {
        if (flash.newToken) {
            setNewToken(flash.newToken);
            setShowTokenModal(true);
        }
    }, [flash.newToken]);
    const { data, setData, post, delete: destroy, processing, reset } = useForm({
        name: ""
    });

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setJustCopied(true);
        setTimeout(() => setJustCopied(false), 2000);
    };

    const handleGenerate = (e) => {
        e.preventDefault();
        post("/api-keys", {
            onSuccess: () => reset()
        });
    };

    const handleRevoke = (id) => {
        if (confirm("Êtes-vous sûr de vouloir révoquer cette clé ?")) {
            destroy(`/api-keys/${id}`);
        }
    };

    return (
        <AppLayout title="Clés API">
            <Head title="Clés API" />

            <div className="max-w-5xl space-y-8">
                <div>
                    <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-2">Intégration</p>
                    <h2 className="text-2xl font-bold text-white uppercase tracking-tight whitespace-pre-wrap">Authentification API</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Generate Key Form */}
                    <Card className="p-8 lg:col-span-1 bg-slate-900/50 backdrop-blur-xl border border-indigo-500/20">
                        <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-6 flex items-center gap-3">
                            <Plus className="w-5 h-5 text-indigo-500" /> Nouvelle Clé
                        </h3>
                        <form onSubmit={handleGenerate} className="space-y-6">
                            <Input
                                label="Nom de la clé"
                                placeholder="ex: Application Mobile"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                required
                            />
                            <Button type="submit" className="w-full" disabled={processing}>
                                {processing ? "Génération..." : "GÉNÉRER"}
                            </Button>
                        </form>
                    </Card>

                    {/* Keys List */}
                    <div className="lg:col-span-2 space-y-6">
                        {tokens.length === 0 ? (
                            <Card className="p-12 text-center bg-slate-900/50 backdrop-blur-xl border border-dashed border-slate-800">
                                <Key className="w-10 h-10 text-slate-700 mx-auto mb-4" />
                                <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">Aucune clé active</p>
                            </Card>
                        ) : (
                            tokens.map((token) => (
                                <Card key={token.id} className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl">
                                                <Key className="w-4 h-4 text-indigo-400" />
                                            </div>
                                            <div>
                                                <h4 className="text-base font-bold text-white uppercase tracking-tight leading-none mb-1">{token.name}</h4>
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">
                                                    Créée le {new Date(token.created_at).toLocaleDateString()} • Dernier usage: {token.last_used_at ? new Date(token.last_used_at).toLocaleDateString() : 'Jamais'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleRevoke(token.id)}
                                                className="text-red-500 border-red-500/20 hover:bg-red-500/10"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                </div>

                <Card className="p-10 bg-red-500/5 border border-dashed border-red-500/20 backdrop-blur-xl">
                    <div className="flex items-start gap-6">
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500">
                            <ShieldAlert className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white uppercase tracking-tight mb-2">Sécurité Recommandée</h4>
                            <p className="text-slate-400 font-medium text-sm leading-relaxed mb-6">
                                Les clés API donnent un accès total à l'envoi de mails via votre compte.
                                <span className="text-white"> Toute clé générée n'est affichée qu'une seule fois.</span>
                                Assurez-vous de la sauvegarder dans un endroit sûr.
                            </p>
                            <Link href="/docs">
                                <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-[0.2em] p-0 h-auto hover:bg-transparent">Lire la documentation &rarr;</Button>
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
            {/* Token Generation Modal */}
            {showTokenModal && newToken && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
                    <Card className="w-full max-w-xl p-0 relative bg-slate-900 border-2 border-indigo-500 shadow-[0_0_50px_-12px_rgba(99,102,241,0.3)] overflow-hidden">
                        <div className="p-8 bg-indigo-600 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Key className="w-32 h-32" />
                            </div>
                            <div className="relative z-10 text-center">
                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-lg">
                                    <Key className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-2">Clé API Générée</h2>
                                <p className="text-indigo-100 font-medium text-sm">Cette clé ne sera affichée qu'une seule fois.</p>
                            </div>
                        </div>

                        <div className="p-8 space-y-8">
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">Votre Token Privé</label>
                                <div className="relative group">
                                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-sm text-indigo-400 break-all leading-relaxed shadow-inner">
                                        {newToken}
                                    </div>
                                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors pointer-events-none rounded-xl"></div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    size="xl"
                                    className={cn(
                                        "flex-1 transition-all duration-300",
                                        justCopied ? "bg-green-500 hover:bg-green-600" : "bg-indigo-600 hover:bg-indigo-700"
                                    )}
                                    onClick={() => copyToClipboard(newToken)}
                                >
                                    {justCopied ? (
                                        <>
                                            <CheckCircle2 className="w-5 h-5 mr-2" /> COPIÉ !
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-5 h-5 mr-2" /> COPIER LA CLÉ
                                        </>
                                    )}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="xl"
                                    onClick={() => {
                                        setShowTokenModal(false);
                                        setNewToken(null);
                                    }}
                                >
                                    FERMER
                                </Button>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                <p className="text-xs text-amber-500/80 leading-relaxed font-medium">
                                    Assurez-vous de stocker cette clé dans un endroit sûr. Pour des raisons de sécurité, nous ne pourrons plus jamais vous l'afficher.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </AppLayout>
    );
}
