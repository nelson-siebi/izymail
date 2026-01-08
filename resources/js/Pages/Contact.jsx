import { Head, useForm, usePage } from "@inertiajs/react";
import SEO from "@/Components/SEO";
import PublicLayout from "@/Layouts/PublicLayout";
import { Button } from "@/Components/UI/Button";
import { Input } from "@/Components/UI/Input";
import { Textarea } from "@/Components/UI/Textarea";
import { Card } from "@/Components/UI/Card";
import { Mail, Phone, Send, HelpCircle } from "lucide-react";

export default function Contact() {
    const { settings = {} } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        message: ""
    });

    const { flash = {} } = usePage().props;

    const submit = (e) => {
        e.preventDefault();
        post("/contact", {
            onSuccess: () => {
                reset();
                if (flash.success) {
                    // You could add a toast here, but for now we rely on the flash appearing in the layout
                }
            },
        });
    };

    return (
        <PublicLayout>
            <SEO
                title="Contactez-nous"
                description="Notre équipe support est à votre écoute. Contactez-nous pour toute question technique ou commerciale sur Izymail."
            />
            <div className="max-w-7xl mx-auto px-6 py-24 relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
                            On est là <br /><span className="text-indigo-500">pour vous.</span>
                        </h1>
                        <p className="text-lg text-slate-400 font-medium mb-12 max-w-md leading-relaxed">Une question technique ? Un besoin spécifique pour votre entreprise ? Notre équipe vous répond en moins de 2h.</p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-6 group">
                                <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl group-hover:border-indigo-500/30 transition-colors">
                                    <Mail className="w-5 h-5 text-indigo-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Email</p>
                                    <p className="text-lg font-bold text-white">{settings.contact_email || 'contact@izymail.com'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 group">
                                <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl group-hover:border-indigo-500/30 transition-colors">
                                    <Phone className="w-5 h-5 text-indigo-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Téléphone / WhatsApp</p>
                                    <p className="text-lg font-bold text-white">{settings.contact_phone || '+237 676 676 120'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 group">
                                <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl group-hover:border-indigo-500/30 transition-colors">
                                    <HelpCircle className="w-5 h-5 text-indigo-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Support 24/7</p>
                                    <p className="text-lg font-bold text-white">Via Dashboard</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Card className="p-10 border-2 border-slate-800 shadow-3xl">
                        <form onSubmit={submit} className="space-y-8">
                            <Input
                                label="Votre Nom"
                                placeholder="Moussa Ndiaye"
                                value={data.name}
                                onChange={e => setData("name", e.target.value)}
                                error={errors.name}
                                required
                            />
                            <Input
                                label="Email de contact"
                                type="email"
                                placeholder="moussa@compagnie.sn"
                                value={data.email}
                                onChange={e => setData("email", e.target.value)}
                                error={errors.email}
                                required
                            />

                            <Textarea
                                label="Message"
                                placeholder="Comment pouvons-nous vous aider ?"
                                value={data.message}
                                onChange={e => setData("message", e.target.value)}
                                error={errors.message}
                                className="h-40"
                                required
                            />

                            <Button size="xl" className="w-full" disabled={processing}>
                                {processing ? "ENVOI EN COURS..." : "ENVOYER MAINTENANT"}
                                {!processing && <Send className="ml-3 w-5 h-5" />}
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </PublicLayout>
    );
}
