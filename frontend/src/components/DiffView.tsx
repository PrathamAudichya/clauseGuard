import React from 'react';

interface DiffViewProps {
    original: string;
    alternative: string;
}

const DiffView: React.FC<DiffViewProps> = ({ original, alternative }) => {
    return (
        <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col rounded-lg border border-brand-red/15 bg-brand-red/5 p-3.5">
                <span className="text-xs font-bold text-brand-red mb-2 uppercase tracking-wide">Original (Risky)</span>
                <p className="text-sm text-brand-slate whitespace-pre-wrap flex-1 leading-relaxed">{original}</p>
            </div>

            <div className="group relative flex flex-col rounded-lg border border-brand-teal/15 bg-brand-teal/5 p-3.5">
                <span className="text-xs font-bold text-brand-teal mb-2 uppercase tracking-wide">Safe Alternative</span>
                <p className="text-sm text-white/90 font-medium whitespace-pre-wrap flex-1 leading-relaxed">{alternative}</p>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(alternative);
                    }}
                    className="absolute right-2 top-2 flex items-center gap-1 rounded-lg border border-brand-teal/20 bg-surface-300 px-2.5 py-1 text-xs text-brand-teal opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-brand-teal/10"
                >
                    Copy
                </button>
            </div>
        </div>
    );
};

export default DiffView;
