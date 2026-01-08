import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Card } from "@/Components/UI/Card";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/Components/UI/Table";
import { FileText, Download } from "lucide-react";
import { Button } from "@/Components/UI/Button";

export default function Invoices({ invoices = [] }) {
    return (
        <AppLayout title="Mes Factures">
            <Head title="Mes Factures" />

            <div className="max-w-5xl mx-auto space-y-8">
                <div className="flex items-center gap-4 mb-12">
                    <div className="p-4 bg-indigo-600 rounded-2xl shadow-lg">
                        <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Facturation</h2>
                        <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Historique de vos paiements Nelsius Pay</p>
                    </div>
                </div>

                <Card className="overflow-hidden border-2 border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                    {invoices.length === 0 ? (
                        <div className="p-20 text-center">
                            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FileText className="w-8 h-8 text-slate-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white uppercase mb-2">Aucune facture</h3>
                            <p className="text-slate-500 font-medium text-sm">Vos factures apparaîtront ici après vos premiers paiements.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-800">
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">ID Facture</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Date</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Montant</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Statut</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoices.map((inv) => (
                                        <tr key={inv.id} className="border-b border-slate-800/50 hover:bg-white/5 transition-colors">
                                            <td className="px-8 py-6 text-sm font-bold text-white">#INV-{inv.id}</td>
                                            <td className="px-8 py-6 text-sm font-bold text-slate-400">{inv.date}</td>
                                            <td className="px-8 py-6 text-sm font-black text-indigo-400 uppercase tracking-tighter">{inv.amount} FCFA</td>
                                            <td className="px-8 py-6">
                                                <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] font-black text-green-500 uppercase tracking-widest">PAYÉ</span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <Button size="sm" variant="outline" className="border-slate-700">
                                                    <Download className="w-4 h-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
            </div>
        </AppLayout>
    );
}
