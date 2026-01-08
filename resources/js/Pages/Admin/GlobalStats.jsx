import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Card, StatCard } from "@/Components/UI/Card";
import {
    Users,
    Zap,
    ShieldCheck,
    AlertCircle,
    BarChart3,
    TrendingUp,
    Mail,
    Globe
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

const data = [
    { name: 'Mon', mails: 12400 },
    { name: 'Tue', mails: 15300 },
    { name: 'Wed', mails: 18900 },
    { name: 'Thu', mails: 22400 },
    { name: 'Fri', mails: 26800 },
    { name: 'Sat', mails: 32000 },
    { name: 'Sun', mails: 45000 },
];

const COLORS = ['#4F46E5', '#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE'];

export default function GlobalStats({ stats }) {
    const globalStats = stats;

    return (
        <AppLayout title="Statistiques Globales">
            <Head title="Admin - Stats" />

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <StatCard
                    title="Utilisateurs Totaux"
                    value={globalStats.totalUsers.toLocaleString()}
                    icon={Users}
                    trend="up"
                    trendValue="+5%"
                />
                <StatCard
                    title="Serveurs SMTP"
                    value={globalStats.activeSmtp}
                    icon={Globe}
                    className="bg-slate-900 border-indigo-500/20"
                />
                <StatCard
                    title="Volume Total"
                    value={globalStats.totalMailsSent.toLocaleString()}
                    subValue="Emails"
                    icon={Mail}
                    trend="up"
                    trendValue="+2%"
                />
                <StatCard
                    title="Délivrabilité"
                    value={`${globalStats.averageDeliverability}%`}
                    icon={ShieldCheck}
                    variant="indigo"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Traffic Chart */}
                <Card className="lg:col-span-2 p-10 h-[500px] flex flex-col bg-slate-950/50 backdrop-blur-xl border border-slate-800">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Trafic Plateforme</h3>
                            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Volume global des 7 derniers jours</p>
                        </div>
                    </div>

                    <div className="flex-1 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={globalStats.chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#475569"
                                    fontSize={10}
                                    fontWeight="bold"
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    stroke="#475569"
                                    fontSize={10}
                                    fontWeight="bold"
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(79, 70, 229, 0.05)' }}
                                    contentStyle={{
                                        backgroundColor: '#020617',
                                        border: '1px solid #1e293b',
                                        borderRadius: '16px',
                                        fontSize: '11px',
                                        fontWeight: 'bold',
                                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                                    }}
                                />
                                <Bar dataKey="mails" radius={[10, 10, 0, 0]}>
                                    {globalStats.chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.mails > 1000 ? '#4F46E5' : '#1e293b'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Business Insights */}
                <div className="space-y-8">
                    <Card className="p-8 bg-slate-950/50 backdrop-blur-xl border border-indigo-500/20">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Revenus Mensuels</h4>
                        <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-4xl font-bold text-white tracking-tight">{(globalStats.totalRevenue || 0).toLocaleString()}</span>
                            <span className="text-lg font-bold text-indigo-500 tracking-widest uppercase">FCFA</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-500 text-[10px] font-bold uppercase tracking-widest">
                            <TrendingUp className="w-4 h-4" /> Abonnements actifs
                        </div>
                    </Card>

                    <Card className="p-8 bg-slate-950/50 backdrop-blur-xl border border-slate-800">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">État SMTP</h4>
                        <div className="space-y-4">
                            {(globalStats.smtpStatuses || []).map((s, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-slate-900/30 rounded-2xl border border-slate-800/50 transition-colors hover:bg-slate-900/50">
                                    <div>
                                        <p className="text-xs font-bold text-slate-200 uppercase tracking-tight truncate max-w-[150px]">{s.name}</p>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{s.load} load</p>
                                    </div>
                                    <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${s.status === 'Healthy' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                        {s.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
