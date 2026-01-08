import React from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Card, StatCard } from "@/Components/UI/Card";
import { Button } from "@/Components/UI/Button";
import {
    BarChart3,
    Send,
    AlertCircle,
    TrendingUp,
    Clock,
    ArrowRight,
    Inbox
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

export default function Dashboard({ stats }) {
    const dashboardStats = stats;
    const data = stats.chartData;

    return (
        <AppLayout title="Dashboard Overview">
            <Head title="Dashboard" />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <StatCard
                    title="Usage Journalier"
                    value={dashboardStats.dailySent}
                    subValue={`/ ${dashboardStats.dailyLimit}`}
                    icon={TrendingUp}
                    trend="up"
                    trendValue="+12%"
                    className="bg-indigo-600/10 border-indigo-500/20 shadow-none ring-1 ring-indigo-500/10"
                />
                <StatCard
                    title="Total Emails Envoyés"
                    value={dashboardStats.totalSent.toLocaleString()}
                    subValue="Emails"
                    icon={Inbox}
                    trend="up"
                    trendValue="+8%"
                />
                <StatCard
                    title="Erreurs d'envoi"
                    value={dashboardStats.failedCount}
                    subValue="Echecs"
                    icon={AlertCircle}
                    trend="down"
                    trendValue="-2%"
                    className="bg-slate-900 border-red-500/20"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <Card className="lg:col-span-2 p-10 h-[500px] flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Statistiques d'envoi</h3>
                            <p className="text-slate-500 font-medium uppercase text-[10px] tracking-[0.2em] mt-1">Volume des 7 derniers jours</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sent</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#475569"
                                    fontSize={10}
                                    fontWeight="bold"
                                    axisLine={false}
                                    tickLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    stroke="#475569"
                                    fontSize={10}
                                    fontWeight="bold"
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#0f172a',
                                        border: '2px solid #1e293b',
                                        borderRadius: '16px',
                                        fontSize: '12px',
                                        fontWeight: 'bold'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="sent"
                                    stroke="#4F46E5"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorSent)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Quick Actions / Recent info */}
                <div className="space-y-8">
                    <Card className="p-8">
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Action Rapide</h4>
                        <p className="text-slate-500 font-medium text-xs mb-6 leading-relaxed">Envoyez une campagne ou testez votre intégration immédiatement via l'éditeur.</p>
                        <Link href="/send">
                            <Button variant="primary" size="lg" className="w-full">
                                NOUVEAU MESSAGE <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </Card>

                    <Card className="p-8 border-indigo-500/20 bg-indigo-500/5">
                        <div className="flex items-center gap-4 mb-6">
                            <Clock className="w-6 h-6 text-indigo-500" />
                            <h4 className="text-lg font-bold text-white uppercase tracking-tight">Support Cloud</h4>
                        </div>
                        <p className="text-slate-400 font-bold text-sm mb-6">Serveur actif sur la région AF-WEST-1. Latence moyenne : 42ms.</p>
                        <Button variant="outline" size="md" className="w-full">
                            CHECK SYSTEM STATUS
                        </Button>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
