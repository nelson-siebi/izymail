import React, { useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Card } from "@/Components/UI/Card";
import { Button } from "@/Components/UI/Button";
import { Input } from "@/Components/UI/Input";
import {
    Package,
    Plus,
    Edit3,
    Trash2,
    CheckCircle2,
    XCircle,
    TrendingDown,
    X
} from "lucide-react";
import { formatCurrency, cn } from "@/Lib/utils";

export default function PlanManager({ plans }) {
    const [editingPlan, setEditingPlan] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        name: "",
        price: 0,
        max_mails_per_day: 1000,
        max_attachment_size_mb: 10,
        sandbox_limit: 100,
    });

    const openEdit = (plan) => {
        setEditingPlan(plan);
        setData({
            name: plan.name,
            price: plan.price,
            max_mails_per_day: plan.max_mails_per_day,
            max_attachment_size_mb: plan.max_attachment_size_mb,
            sandbox_limit: plan.sandbox_limit,
        });
        setShowModal(true);
    };

    const closePortal = () => {
        setShowModal(false);
        setEditingPlan(null);
        reset();
    };

    const handleDelete = (id) => {
        if (confirm("Supprimer ce plan ?")) {
            router.delete(`/admin/plans/${id}`);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingPlan) {
            patch(`/admin/plans/${editingPlan.id}`, {
                onSuccess: () => closePortal()
            });
        } else {
            post("/admin/plans", {
                onSuccess: () => closePortal()
            });
        }
    };

    return (
        <AppLayout title="Gestion des Plans">
            <Head title="Admin - Plans" />

            <div className="space-y-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-2">Monétisation</p>
                        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Offres & Tarifs</h2>
                    </div>
                    <Button onClick={() => setShowModal(true)} className="px-8">
                        <Plus className="mr-2 w-4 h-4" /> CRÉER UN PLAN
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <Card key={plan.id} className="relative flex flex-col group hover:border-indigo-500/30 transition-all bg-slate-950/50 backdrop-blur-xl border border-slate-800">
                            <div className="flex items-center justify-between mb-8">
                                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                                    <Package className="w-5 h-5 text-indigo-500" />
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">PRIX MENSUEL</p>
                                    <p className="text-2xl font-bold text-white uppercase tracking-tight">{formatCurrency(plan.price).split(' ')[0]} <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">FCFA</span></p>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-8 px-1 border-l-2 border-indigo-500">{plan.name}</h3>

                            <div className="space-y-4 mb-10 flex-1 px-5 py-6 bg-slate-900/30 rounded-2xl border border-slate-800/50">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Envois / Jour</span>
                                    <span className="text-sm font-bold text-slate-200">{plan.max_mails_per_day?.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">PJ Max</span>
                                    <span className="text-sm font-bold text-slate-200">{plan.max_attachment_size_mb} MB</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sandbox</span>
                                    <span className="text-sm font-bold text-slate-200">{plan.sandbox_limit}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="secondary" className="w-full" onClick={() => openEdit(plan)}>EDITER</Button>
                                <Button variant="danger" className="w-full" onClick={() => handleDelete(plan.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Modal for creating plan */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
                    <Card className="w-full max-w-2xl p-10 relative bg-slate-900 border border-slate-800 shadow-3xl">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-8 right-8 p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-10">
                            {editingPlan ? "Modifier le Plan" : "Nouveau Plan"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Input label="Nom du Plan" placeholder="Premium" value={data.name} onChange={e => setData('name', e.target.value)} required />
                                <Input label="Prix (FCFA)" type="number" placeholder="5000" value={data.price} onChange={e => setData('price', e.target.value)} required />
                                <Input label="Mails / Jour" type="number" placeholder="5000" value={data.max_mails_per_day} onChange={e => setData('max_mails_per_day', e.target.value)} required />
                                <Input label="PJ Max (MB)" type="number" placeholder="10" value={data.max_attachment_size_mb} onChange={e => setData('max_attachment_size_mb', e.target.value)} required />
                                <Input label="Limite Sandbox" type="number" placeholder="100" value={data.sandbox_limit} onChange={e => setData('sandbox_limit', e.target.value)} required />
                            </div>
                            <Button type="submit" size="xl" className="w-full uppercase tracking-widest text-xs font-bold" disabled={processing}>
                                {editingPlan ? "METTRE À JOUR" : "CRÉER LE PLAN"}
                            </Button>
                        </form>
                    </Card>
                </div>
            )}
        </AppLayout>
    );
}
