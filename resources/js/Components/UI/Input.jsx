import * as React from "react";
import { cn } from "@/Lib/utils";

const Input = React.forwardRef(({ className, type, label, error, ...props }, ref) => {
    return (
        <div className="w-full space-y-2">
            {label && (
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] ml-1">
                    {label}
                </label>
            )}
            <input
                type={type}
                className={cn(
                    "flex w-full bg-slate-950 border border-slate-800 px-5 py-3 rounded-2xl text-white font-medium placeholder:text-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 focus:outline-none transition-all disabled:opacity-50",
                    error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/20",
                    className
                )}
                ref={ref}
                {...props}
            />
            {error && (
                <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">
                    {error}
                </p>
            )}
        </div>
    );
});

Input.displayName = "Input";

export { Input };
