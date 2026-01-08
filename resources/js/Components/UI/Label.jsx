import React from 'react';

export function Label({ htmlFor, children, className = '', ...props }) {
    return (
        <label
            htmlFor={htmlFor}
            className={`block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 ${className}`}
            {...props}
        >
            {children}
        </label>
    );
}
