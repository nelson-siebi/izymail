import React, { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Card } from "@/Components/UI/Card";
import { Button } from "@/Components/UI/Button";
import { Input } from "@/Components/UI/Input";
import {
    Users as UsersIcon,
    Search,
    Trash2,
    ShieldCheck,
    Mail,
    ChevronLeft,
    ChevronRight,
    Edit3
} from "lucide-react";
import { cn } from "@/Lib/utils";

export default function UserManager({ users, plans, filters }) {
    const [search, setSearch] = useState(filters.search || "");
    const [showPlanModal, setShowPlanModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search !== (filters.search || "")) {
                router.get('/admin/users', { search }, { preserveState: true, replace: true });
            }
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const handleUpdatePlan = (planId) => {
        router.post(`/admin/users/${selectedUser.id}/plan`, {
            plan_id: planId
        }, {
            onSuccess: () => setShowPlanModal(false)
        });
    };

    const handleDelete = (id) => {
        if (confirm("Supprimer cet utilisateur ? Cette action est irréversible.")) {
            router.delete(`/admin/users/${id}`);
        }
    };

    return (
        <AppLayout title="Gestion Utilisateurs">
            <Head title="Admin - Utilisateurs" />

            <div className="space-y-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Nom ou email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-medium text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                        />
                    </div>
                </div>

                <Card className="p-0 overflow-hidden border border-slate-800 bg-slate-950/50 backdrop-blur-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-900/50 border-b border-slate-800">
                                    <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Utilisateur</th>
                                    <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Plan Actuel</th>
                                    <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Inscrit le</th>
                                    <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {users.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-indigo-500/[0.02] transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-9 h-9 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center font-bold text-indigo-400 text-sm">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-200 uppercase tracking-tight">{user.name}</div>
                                                    <div className="text-[10px] font-medium text-slate-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[10px] font-bold uppercase tracking-widest">
                                                {user.plans?.[0]?.name || "Aucun Plan"}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{new Date(user.created_at).toLocaleDateString()}</div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => { setSelectedUser(user); setShowPlanModal(true); }}
                                                    className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-500 hover:text-indigo-400 hover:border-indigo-500/30 transition-all"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-500 hover:text-red-500 hover:border-red-500/30 transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {users.links.length > 3 && (
                        <div className="p-6 bg-slate-900/30 border-t border-slate-800 flex justify-center gap-1.5">
                            {users.links.map((link, i) => (
                                <button
                                    key={i}
                                    onClick={() => link.url && router.get(link.url, { search }, { preserveState: true })}
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
                    )}
                </Card>
            </div>

            {/* Plan Assignment Modal */}
            {showPlanModal && selectedUser && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
                    <Card className="w-full max-w-lg p-10 relative bg-slate-900 border border-slate-800 shadow-3xl">
                        <button onClick={() => setShowPlanModal(false)} className="absolute top-8 right-8 p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-all">
                            <XCircle className="w-5 h-5" />
                        </button>

                        <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-2">Assigner un Plan</h2>
                        <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-10">{selectedUser.name}</p>

                        <div className="space-y-4">
                            {plans.map((plan) => (
                                <button
                                    key={plan.id}
                                    onClick={() => handleUpdatePlan(plan.id)}
                                    className={cn(
                                        "w-full p-6 border rounded-2xl text-left transition-all hover:translate-x-1",
                                        selectedUser.plans?.[0]?.id === plan.id
                                            ? "bg-indigo-600 border-indigo-400 shadow-xl shadow-indigo-600/20"
                                            : "bg-slate-800/50 border-slate-700 hover:border-indigo-500/30"
                                    )}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-white uppercase tracking-tight text-xl">{plan.name}</p>
                                            <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mt-1 opacity-70">{plan.max_mails_per_day} mails / jour</p>
                                        </div>
                                        {selectedUser.plans?.[0]?.id === plan.id && <ShieldCheck className="w-6 h-6 text-white" />}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </Card>
                </div>
            )}
        </AppLayout>
    );
}

const XCircle = ({ className, onClick }) => (
    <svg onClick={onClick} className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
);
