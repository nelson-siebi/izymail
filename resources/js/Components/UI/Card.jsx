import { cn } from "@/Lib/utils";

export function Card({ className, children, ...props }) {
    return (
        <div
            className={cn(
                "bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function StatCard({ title, value, subValue, trend, trendValue, icon: Icon, className }) {
    return (
        <Card className={cn("relative overflow-hidden group", className)}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                        {title}
                    </p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-4xl md:text-5xl font-black text-white leading-none">
                            {value}
                        </h3>
                        {subValue && (
                            <span className="text-lg font-bold text-slate-500 uppercase">
                                {subValue}
                            </span>
                        )}
                    </div>
                </div>
                {Icon && (
                    <div className="p-3 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-indigo-500" />
                    </div>
                )}
            </div>

            {trend && (
                <div className="mt-6 flex items-center gap-2">
                    <span className={cn(
                        "text-xs font-bold px-2 py-0.5 rounded-full",
                        trend === 'up' ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                    )}>
                        {trend === 'up' ? '↗' : '↘'} {trendValue}
                    </span>
                    <span className="text-xs text-slate-600 font-bold uppercase">vs last month</span>
                </div>
            )}
        </Card>
    );
}
