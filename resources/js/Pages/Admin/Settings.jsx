import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/UI/Button';
import { Input } from '@/Components/UI/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/UI/Card';
import { Label } from '@/Components/UI/Label';
import { Save, Globe, Mail, Phone, Share2 } from 'lucide-react';

export default function Settings({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
        site_name: settings.site_name || '',
        site_description: settings.site_description || '',
        contact_email: settings.contact_email || '',
        contact_phone: settings.contact_phone || '',
        social_facebook: settings.social_facebook || '',
        social_twitter: settings.social_twitter || '',
        social_instagram: settings.social_instagram || '',
        social_linkedin: settings.social_linkedin || '',
        social_whatsapp: settings.social_whatsapp || '',
        footer_text: settings.footer_text || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/settings');
    };

    return (
        <AppLayout>
            <Head title="Paramètres Généraux" />

            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight uppercase">Paramètres Généraux</h1>
                    <p className="text-slate-500 font-medium">Gérez les informations globales de votre plateforme.</p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <Card className="bg-slate-900/50 border-slate-800">
                        <CardHeader className="border-b border-slate-800 pb-6">
                            <CardTitle className="text-xl flex items-center gap-3 text-white uppercase tracking-tight">
                                <Globe className="w-5 h-5 text-indigo-500" />
                                Identité du Site
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="site_name">Nom du Site</Label>
                                <Input
                                    id="site_name"
                                    value={data.site_name}
                                    onChange={e => setData('site_name', e.target.value)}
                                    placeholder="Izymail"
                                />
                                {errors.site_name && <div className="text-red-500 text-xs">{errors.site_name}</div>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="site_description">Description</Label>
                                <textarea
                                    id="site_description"
                                    className="w-full bg-slate-950 border-slate-800 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    rows="3"
                                    value={data.site_description}
                                    onChange={e => setData('site_description', e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900/50 border-slate-800">
                        <CardHeader className="border-b border-slate-800 pb-6">
                            <CardTitle className="text-xl flex items-center gap-3 text-white uppercase tracking-tight">
                                <Mail className="w-5 h-5 text-indigo-500" />
                                Contact
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="contact_email">Email de Contact</Label>
                                <Input
                                    id="contact_email"
                                    value={data.contact_email}
                                    onChange={e => setData('contact_email', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="contact_phone">Téléphone</Label>
                                <Input
                                    id="contact_phone"
                                    value={data.contact_phone}
                                    onChange={e => setData('contact_phone', e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900/50 border-slate-800">
                        <CardHeader className="border-b border-slate-800 pb-6">
                            <CardTitle className="text-xl flex items-center gap-3 text-white uppercase tracking-tight">
                                <Share2 className="w-5 h-5 text-indigo-500" />
                                Réseaux Sociaux
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {['facebook', 'twitter', 'instagram', 'linkedin', 'whatsapp'].map(platform => (
                                <div key={platform} className="space-y-2">
                                    <Label htmlFor={`social_${platform}`} className="capitalize">{platform}</Label>
                                    <Input
                                        id={`social_${platform}`}
                                        value={data[`social_${platform}`]}
                                        onChange={e => setData(`social_${platform}`, e.target.value)}
                                        placeholder={`https://${platform}.com/...`}
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button type="submit" size="lg" disabled={processing} className="px-10">
                            <Save className="w-4 h-4 mr-2" />
                            SAUVEGARDER LES MODIFICATIONS
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
