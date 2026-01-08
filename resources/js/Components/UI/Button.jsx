import * as React from "react";
import { cn } from "@/Lib/utils";

const Button = React.forwardRef(({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
        primary: "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 hover:-translate-y-0.5 active:scale-95 active:translate-y-0",
        secondary: "bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 hover:border-slate-600",
        outline: "bg-transparent text-indigo-400 border border-indigo-500/30 hover:border-indigo-500 hover:bg-indigo-500/10",
        ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-slate-800",
        danger: "bg-red-600 text-white shadow-lg shadow-red-600/20 hover:bg-red-500",
    };

    const sizes = {
        sm: "px-4 py-2 text-xs",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base",
        xl: "px-10 py-5 text-lg font-bold uppercase tracking-tight",
    };

    return (
        <button
            ref={ref}
            className={cn(
                "inline-flex items-center justify-center rounded-2xl font-bold transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
});

Button.displayName = "Button";

export { Button };
