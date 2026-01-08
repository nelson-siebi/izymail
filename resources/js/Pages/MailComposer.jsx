import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Card } from "@/Components/UI/Card";
import { Button } from "@/Components/UI/Button";
import { Input } from "@/Components/UI/Input";
import { Textarea } from "@/Components/UI/Textarea";
import { Send, Upload, ShieldCheck, AlertCircle, XCircle } from "lucide-react";

export default function MailComposer() {
    const { auth } = usePage().props;
    const activePlan = auth.user?.plans?.find(p => p.pivot?.is_active);
    const isFreeLimit = !activePlan;

    const { data, setData, post, processing, errors, reset } = useForm({
        to: "",
        subject: "",
        content: "",
        sandbox: false,
        attachments: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post("/send", {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout title="Composer un Mail">
            <Head title="Envoyer un Email" />

            <div className="max-w-4xl">
                <form onSubmit={submit} className="space-y-8">
                    <Card className="p-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <Input
                                label="Destinataire"
                                type="email"
                                placeholder="client@exemple.afrique"
                                value={data.to}
                                onChange={(e) => setData("to", e.target.value)}
                                error={errors.to}
                                required
                            />
                            <Input
                                label="Objet du message"
                                type="text"
                                placeholder="Confirmation de commande..."
                                value={data.subject}
                                onChange={(e) => setData("subject", e.target.value)}
                                error={errors.subject}
                                required
                            />
                        </div>

                        <div className="mb-8">
                            <Textarea
                                label="Contenu HTML"
                                placeholder="<h1>Bonjour</h1>..."
                                value={data.content}
                                onChange={(e) => setData("content", e.target.value)}
                                error={errors.content}
                                className="min-h-[400px] font-mono text-sm"
                                required
                            />
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-8 pt-8 border-t border-slate-800/50">
                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-4 cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={data.sandbox}
                                            onChange={(e) => setData("sandbox", e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-12 h-6 bg-slate-800 rounded-full peer-checked:bg-indigo-500 transition-all shadow-inner"></div>
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6 shadow-md"></div>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-500 group-hover:text-white transition-colors uppercase tracking-widest">
                                        Mode Sandbox
                                    </span>
                                </label>

                                <div className="h-6 w-px bg-slate-800"></div>

                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <Upload className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />
                                    <span className="text-[10px] font-bold text-slate-500 group-hover:text-white transition-colors uppercase tracking-widest">Pièces Jointes</span>
                                    <input
                                        type="file"
                                        multiple
                                        className="hidden"
                                        onChange={(e) => {
                                            const files = Array.from(e.target.files);
                                            setData('attachments', files);
                                        }}
                                    />
                                </label>
                            </div>

                            <div className="md:ml-auto">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="min-w-[200px]"
                                    disabled={processing}
                                >
                                    {processing ? "ENVOI..." : "ENVOYER"}
                                    {!processing && <Send className="ml-2 w-4 h-4" />}
                                </Button>
                                {isFreeLimit && !data.sandbox && (
                                    <p className="text-[10px] font-bold text-indigo-500 uppercase mt-3 tracking-widest text-center">
                                        Quota : 100 mails / jour
                                    </p>
                                )}
                            </div>
                        </div>

                        {data.attachments.length > 0 && (
                            <div className="mt-6 flex flex-wrap gap-3">
                                {data.attachments.map((file, i) => (
                                    <div key={i} className="px-4 py-2 bg-slate-800 rounded-xl border border-slate-700 flex items-center gap-2 group">
                                        <span className="text-xs font-bold text-slate-400 max-w-[150px] truncate">{file.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => setData('attachments', data.attachments.filter((_, index) => index !== i))}
                                            className="text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <XCircle className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>

                    {isFreeLimit && !data.sandbox && (
                        <div className="p-6 bg-indigo-500/5 border border-indigo-500/20 rounded-3xl flex items-start gap-4 shadow-sm">
                            <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0" />
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">
                                    Quota Gratuit
                                </p>
                                <p className="text-xs font-medium text-slate-400 leading-relaxed uppercase tracking-widest">
                                    Limitée à 100 envois par jour. Pour plus, passez à un <a href="/subscription" className="text-indigo-400 underline hover:text-indigo-300 transition-colors">Plan Premium</a>.
                                </p>
                            </div>
                        </div>
                    )}

                    {data.sandbox && (
                        <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-3xl flex items-start gap-4 shadow-sm">
                            <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                            <p className="text-xs font-medium text-yellow-500/70 leading-relaxed uppercase tracking-wider">
                                Mode <span className="text-yellow-500 font-bold">Sandbox</span> : Les emails ne seront pas envoyés réellement.
                            </p>
                        </div>
                    )}
                </form>
            </div>
        </AppLayout>
    );
}
