import React, { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Card } from "@/Components/UI/Card";
import {
    CheckCircle2,
    XCircle,
    Clock,
    Search,
    Filter,
    Download,
    AlertTriangle,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { cn } from "@/Lib/utils";

export default function MailHistory({ logs, filters }) {
    const [search, setSearch] = useState(filters.search || "");
    const [status, setStatus] = useState(filters.status || "");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search !== (filters.search || "")) {
                router.get('/history', { search, status }, { preserveState: true, replace: true });
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        router.get('/history', { search, status: newStatus }, { preserveState: true });
    };

    const mailLogs = logs;

    const getStatusBadge = (status, sandbox) => {
        if (sandbox) return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase tracking-widest">
                <Clock className="w-3 h-3" /> Sandbox
            </span>
        );

        switch (status) {
            case 'sent':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-widest">
                        <CheckCircle2 className="w-3 h-3" /> Envoyé
                    </span>
                );
            case 'failed':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-widest">
                        <XCircle className="w-3 h-3" /> Échec
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-500/10 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                        <Clock className="w-3 h-3" /> En attente
                    </span>
                );
        }
    };

    return (
        <AppLayout title="Historique des Envois">
            <Head title="Historique" />

            <div className="space-y-8">
                {/* Toolbar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Chercher un destinataire..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-medium text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <select
                            value={status}
                            onChange={(e) => handleStatusChange(e.target.value)}
                            className="flex-1 md:flex-none bg-slate-950 border border-slate-800 rounded-2xl px-6 py-3.5 text-sm font-medium text-slate-300 hover:text-white transition-all focus:outline-none focus:border-indigo-500/50 appearance-none cursor-pointer pr-12 relative"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.5rem center', backgroundSize: '1rem' }}
                        >
                            <option value="">Tous les statuts</option>
                            <option value="sent">Envoyés</option>
                            <option value="failed">Échecs</option>
                            <option value="pending">En attente</option>
                        </select>
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl text-xs font-bold text-indigo-400 uppercase tracking-widest hover:bg-indigo-600/20 transition-all">
                            <Download className="w-4 h-4" /> Export CSV
                        </button>
                    </div>
                </div>

                {/* Logs Table */}
                <Card className="p-0 overflow-hidden border border-slate-800 bg-slate-950/50 backdrop-blur-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-900/50 border-b border-slate-800">
                                    <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Destinataire</th>
                                    <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sujet</th>
                                    <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Statut</th>
                                    <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {mailLogs.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-20 text-center font-medium text-slate-600 uppercase tracking-[0.2em] text-[10px]">
                                            Aucun log trouvé
                                        </td>
                                    </tr>
                                ) : (
                                    mailLogs.data.map((log) => (
                                        <tr key={log.id} className="hover:bg-indigo-500/[0.02] transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="font-bold text-slate-200 truncate max-w-[200px]">{log.to_email}</div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="text-sm font-medium text-slate-500 truncate max-w-[250px]">{log.subject}</div>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <div className="flex flex-col items-center">
                                                    {getStatusBadge(log.status, log.sandbox)}
                                                    {log.status === 'failed' && (
                                                        <div className="mt-1.5 text-[8px] font-bold text-red-500/70 uppercase tracking-widest">{log.error}</div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.1em]">{new Date(log.created_at).toLocaleString()}</div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {mailLogs.links.length > 3 && (
                        <div className="p-6 bg-slate-900/30 border-t border-slate-800 flex items-center justify-between">
                            <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                                Affichage de {mailLogs.from}-{mailLogs.to} sur {mailLogs.total}
                            </div>
                            <div className="flex items-center gap-1.5">
                                {mailLogs.links.map((link, i) => (
                                    <button
                                        key={i}
                                        onClick={() => link.url && router.get(link.url, { search, status }, { preserveState: true })}
                                        disabled={!link.url || link.active}
                                        className={cn(
                                            "min-w-[32px] h-[32px] flex items-center justify-center rounded-lg text-[10px] font-bold transition-all border",
                                            link.active
                                                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                                                : "bg-transparent border-slate-800 text-slate-500 hover:text-white hover:border-slate-700",
                                            !link.url && "opacity-30 cursor-not-allowed border-transparent"
                                        )}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </Card>

                {/* Info Box */}
                <div className="flex items-center gap-6 p-8 bg-indigo-500/5 border border-dashed border-indigo-500/20 rounded-3xl">
                    <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-indigo-500">
                        <AlertTriangle className="w-5 h-5" />
                    </div>
                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed uppercase tracking-wider">
                        Les journaux sont conservés pendant <span className="text-slate-200">30 jours</span> glissants selon votre plan. Exportez vos données mensuellement pour vos rapports.
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
