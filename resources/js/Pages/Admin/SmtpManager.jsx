import React, { useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Card } from "@/Components/UI/Card";
import { Button } from "@/Components/UI/Button";
import { Input } from "@/Components/UI/Input";
import {
    Plus,
    Settings,
    Trash2,
    Search,
    Activity,
    Check,
    X,
    Server,
    ShieldCheck
} from "lucide-react";
import { cn } from "@/Lib/utils";

export default function SmtpManager({ servers }) {
    const [showModal, setShowModal] = useState(false);
    const [editingServer, setEditingServer] = useState(null);

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        host: "",
        port: 587,
        username: "",
        password: "",
        encryption: "tls",
        priority: 1,
        max_per_hour: 1000,
    });

    const openEdit = (server) => {
        setEditingServer(server);
        setData({
            host: server.host,
            port: server.port,
            username: server.username,
            password: "",
            encryption: server.encryption,
            priority: server.priority,
            max_per_hour: server.max_per_hour,
        });
        setShowModal(true);
    };

    const closePortal = () => {
        setShowModal(false);
        setEditingServer(null);
        reset();
    };

    const handleToggle = (id) => {
        router.patch(`/admin/smtp/${id}/toggle`);
    };

    const handleDelete = (id) => {
        if (confirm("Supprimer ce serveur SMTP ?")) {
            router.delete(`/admin/smtp/${id}`);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingServer) {
            patch(`/admin/smtp/${editingServer.id}`, {
                onSuccess: () => closePortal()
            });
        } else {
            post("/admin/smtp", {
                onSuccess: () => closePortal()
            });
        }
    };

    return (
        <AppLayout title="Gestion SMTP">
            <Head title="Admin - SMTP" />

            <div className="space-y-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-2">Configuration</p>
                        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Serveurs SMTP</h2>
                    </div>
                    <Button onClick={() => setShowModal(true)} className="px-8">
                        <Plus className="mr-2 w-4 h-4" /> AJOUTER UN SERVEUR
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servers.map((server) => (
                        <Card key={server.id} className="relative group hover:border-indigo-500/30 transition-all bg-slate-950/50 backdrop-blur-xl border border-slate-800">
                            <div className="flex items-center justify-between mb-8">
                                <div className="p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl">
                                    <Server className="w-5 h-5 text-indigo-500" />
                                </div>
                                <button
                                    onClick={() => handleToggle(server.id)}
                                    className={cn(
                                        "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:scale-105 transition-all border",
                                        server.active
                                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                                            : "bg-red-500/10 text-red-500 border-red-500/20"
                                    )}
                                >
                                    {server.active ? "Actif" : "Inactif"}
                                </button>
                            </div>

                            <div className="space-y-4 mb-10">
                                <div>
                                    <h4 className="text-xl font-bold text-white uppercase tracking-tight truncate border-l-2 border-indigo-500 px-2">{server.host}</h4>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2 ml-1">PORT: {server.port} | {server.encryption?.toUpperCase()}</p>
                                </div>
                                <div className="p-5 bg-slate-900/30 border border-slate-800/50 rounded-2xl">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Username</p>
                                    <p className="text-sm font-medium text-slate-300 truncate">{server.username}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="secondary" className="w-full" onClick={() => openEdit(server)}>EDITER</Button>
                                <Button variant="danger" className="w-full" onClick={() => handleDelete(server.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                                <div className="flex items-center gap-2 px-3 py-1 bg-indigo-600/90 backdrop-blur-sm text-white text-[8px] font-bold uppercase tracking-widest rounded-full shadow-lg shadow-black/20">
                                    PRIORITY: {server.priority}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
                    <Card className="w-full max-w-2xl p-10 relative bg-slate-900 border border-slate-800 shadow-3xl">
                        <button
                            onClick={closePortal}
                            className="absolute top-8 right-8 p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-10">
                            {editingServer ? "Modifier le Serveur" : "Nouveau Serveur SMTP"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Input label="Host" placeholder="smtp.mailtrap.io" value={data.host} onChange={e => setData('host', e.target.value)} required />
                                <Input label="Port" type="number" placeholder="587" value={data.port} onChange={e => setData('port', e.target.value)} required />
                                <Input label="Username" placeholder="api_key" value={data.username} onChange={e => setData('username', e.target.value)} required />
                                <Input label="Password" type="password" placeholder="••••••••" value={data.password} onChange={e => setData('password', e.target.value)} />
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Encryption</label>
                                    <select
                                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-3.5 text-white font-medium text-sm focus:outline-none focus:border-indigo-500/50 transition-all appearance-none"
                                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.5rem center', backgroundSize: '1rem' }}
                                        value={data.encryption}
                                        onChange={e => setData('encryption', e.target.value)}
                                    >
                                        <option value="tls">TLS</option>
                                        <option value="ssl">SSL</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                                <Input label="Priorité" type="number" placeholder="1" value={data.priority} onChange={e => setData('priority', e.target.value)} required />
                            </div>
                            <Button type="submit" size="xl" className="w-full uppercase tracking-widest text-xs font-bold" disabled={processing}>
                                {editingServer ? "METTRE À JOUR LE SERVEUR" : "ENREGISTRER LE SERVEUR"}
                            </Button>
                        </form>
                    </Card>
                </div>
            )}
        </AppLayout>
    );
}
