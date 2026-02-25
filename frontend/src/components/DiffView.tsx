import React from 'react';

interface DiffViewProps {
    original: string;
    alternative: string;
}

const DiffView: React.FC<DiffViewProps> = ({ original, alternative }) => {
    // A simple diff view for the hackathon
    // In a real app we'd use a diff library to highlight exact word changes
    // For now, we present them side-by-side cleanly

    return (
        <div className="grid md:grid-cols-2 gap-4">
            {/* Original View */}
            <div className="bg-red-50/50 rounded-lg p-3 border border-red-100 flex flex-col">
                <span className="text-xs font-bold text-brand-red mb-2 uppercase tracking-wide">Original (Risky)</span>
                <p className="text-sm text-brand-slate whitespace-pre-wrap flex-1">{original}</p>
            </div>

            {/* Alternative View */}
            <div className="bg-teal-50/50 rounded-lg p-3 border border-teal-100 flex flex-col relative group">
                <span className="text-xs font-bold text-brand-teal mb-2 uppercase tracking-wide">Safe Alternative</span>
                <p className="text-sm text-brand-navy font-medium whitespace-pre-wrap flex-1">{alternative}</p>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(alternative);
                        // Optionally could add a toast here
                    }}
                    className="absolute top-2 right-2 bg-white border border-teal-200 text-brand-teal text-xs px-2 py-1 flex items-center gap-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-teal-50"
                >
                    Copy Code
                </button>
            </div>
        </div>
    );
};

export default DiffView;
