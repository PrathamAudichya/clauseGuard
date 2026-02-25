import React, { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, AlertTriangle, ShieldAlert, FileText, Info } from 'lucide-react';
import DiffView from './DiffView';

interface ClauseListProps {
    clauses: any[];
    searchTerm?: string;
}

const ClauseList: React.FC<ClauseListProps> = ({ clauses, searchTerm = '' }) => {
    const [expanded, setExpanded] = useState<Record<number, boolean>>({});

    const toggleExpand = (index: number) => {
        setExpanded(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const getBadgeStyle = (level: string) => {
        switch (level) {
            case 'Low': return 'bg-brand-green/15 text-brand-green border-brand-green/20';
            case 'Medium': return 'bg-brand-amber/15 text-brand-amber border-brand-amber/20';
            case 'High': return 'bg-brand-blue/15 text-brand-blue border-brand-blue/20';
            case 'Critical': return 'bg-brand-red/15 text-brand-red border-brand-red/20';
            default: return 'bg-white/[0.06] text-brand-slate border-white/[0.08]';
        }
    };

    const getIcon = (level: string) => {
        switch (level) {
            case 'Low': return <CheckCircle2 size={16} className="text-brand-green" />;
            case 'Medium': return <Info size={16} className="text-brand-amber" />;
            case 'High': return <AlertTriangle size={16} className="text-brand-blue" />;
            case 'Critical': return <ShieldAlert size={16} className="text-brand-red" />;
            default: return <FileText size={16} className="text-brand-slate" />;
        }
    };

    const getLeftBorder = (level: string) => {
        switch (level) {
            case 'Critical': return 'border-l-brand-red';
            case 'High': return 'border-l-brand-blue';
            case 'Medium': return 'border-l-brand-amber';
            case 'Low': return 'border-l-brand-green';
            default: return 'border-l-brand-slate';
        }
    };

    return (
        <div className="flex flex-col gap-3">
            {clauses.map((clause, index) => {
                const isExpanded = expanded[index];
                const isRisky = clause.risk_level === 'High' || clause.risk_level === 'Critical';

                return (
                    <div
                        key={index}
                        className={`overflow-hidden rounded-xl border border-l-[3px] border-white/[0.08] bg-surface-200/90 transition-all duration-300 ${getLeftBorder(clause.risk_level)} ${isExpanded ? 'ring-1 ring-brand-teal/20' : 'hover:border-white/[0.14] hover:bg-surface-300/90'}`}
                    >
                        {/* Header */}
                        <div
                            className="p-4 cursor-pointer flex justify-between items-start gap-4"
                            onClick={() => toggleExpand(index)}
                        >
                            <div className="flex gap-3 items-start flex-1">
                                <div className="mt-1">{getIcon(clause.risk_level)}</div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className={`rounded border px-2 py-0.5 text-xs font-bold ${getBadgeStyle(clause.risk_level)}`}>
                                            {clause.risk_level} Risk
                                        </span>
                                        <span className="rounded bg-white/[0.06] px-2 py-0.5 text-xs font-semibold text-brand-slate">
                                            {clause.risk_category}
                                        </span>
                                        <span className="text-xs font-bold text-brand-slate/60 ml-auto">
                                            Score: {clause.risk_score}
                                        </span>
                                    </div>
                                    <p className={`text-sm text-brand-slate ${!isExpanded ? 'line-clamp-2' : ''} leading-relaxed`}>
                                        {searchTerm && searchTerm.trim() !== '' ? (
                                            <span dangerouslySetInnerHTML={{
                                                __html: clause.original_text.replace(
                                                    new RegExp(`(${searchTerm})`, 'gi'),
                                                    '<mark class="bg-brand-amber/30 text-white rounded px-1">$1</mark>'
                                                )
                                            }} />
                                        ) : (
                                            clause.original_text
                                        )}
                                    </p>
                                </div>
                            </div>
                            <button className="text-brand-slate/40 hover:text-white shrink-0 transition-colors">
                                {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                            </button>
                        </div>

                        {/* Expanded Content */}
                        {isExpanded && (
                            <div className="animate-in slide-in-from-top-2 border-t border-white/[0.06] bg-surface-300/60 p-4 pt-0 duration-200">

                                <div className="mb-4 mt-4 rounded-lg border border-white/[0.08] bg-surface-200/90 p-3.5">
                                    <p className="text-sm text-brand-slate leading-relaxed">
                                        <strong className="text-white">Why it's risky: </strong>
                                        {clause.explanation}
                                    </p>
                                </div>

                                {isRisky && clause.safer_alternative && (
                                    <div className="mt-6 mb-2">
                                        <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                            <CheckCircle2 size={16} className="text-brand-teal" />
                                            Suggested Safer Alternative
                                        </h4>
                                        <DiffView original={clause.original_text} alternative={clause.safer_alternative} />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ClauseList;
