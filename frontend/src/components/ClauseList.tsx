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
            case 'Low': return 'bg-brand-green/10 text-brand-green border-brand-green/20';
            case 'Medium': return 'bg-brand-amber/10 text-brand-amber border-brand-amber/20';
            case 'High': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
            case 'Critical': return 'bg-brand-red/10 text-brand-red border-brand-red/20';
            default: return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    const getIcon = (level: string) => {
        switch (level) {
            case 'Low': return <CheckCircle2 size={16} className="text-brand-green" />;
            case 'Medium': return <Info size={16} className="text-brand-amber" />;
            case 'High': return <AlertTriangle size={16} className="text-orange-500" />;
            case 'Critical': return <ShieldAlert size={16} className="text-brand-red" />;
            default: return <FileText size={16} className="text-gray-400" />;
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
                        className={`bg-white rounded-lg border shadow-sm overflow-hidden transition-all duration-200 ${isExpanded ? 'ring-2 ring-brand-blue/20' : 'hover:border-brand-blue/30'}`}
                    >
                        {/* Header */}
                        <div
                            className="p-4 cursor-pointer flex justify-between items-start gap-4"
                            onClick={() => toggleExpand(index)}
                        >
                            <div className="flex gap-3 items-start flex-1">
                                <div className="mt-1">{getIcon(clause.risk_level)}</div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded border ${getBadgeStyle(clause.risk_level)}`}>
                                            {clause.risk_level} Risk
                                        </span>
                                        <span className="text-xs font-semibold text-brand-slate bg-gray-100 px-2 py-0.5 rounded">
                                            {clause.risk_category}
                                        </span>
                                        <span className="text-xs font-bold text-gray-500 ml-auto">
                                            Score: {clause.risk_score}
                                        </span>
                                    </div>
                                    <p className={`text-sm text-brand-navy ${!isExpanded ? 'line-clamp-2' : ''} leading-relaxed`}>
                                        {searchTerm && searchTerm.trim() !== '' ? (
                                            <span dangerouslySetInnerHTML={{
                                                __html: clause.original_text.replace(
                                                    new RegExp(`(${searchTerm})`, 'gi'),
                                                    '<mark class="bg-yellow-200 text-brand-navy rounded px-1">$1</mark>'
                                                )
                                            }} />
                                        ) : (
                                            clause.original_text
                                        )}
                                    </p>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-brand-navy shrink-0">
                                {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                            </button>
                        </div>

                        {/* Expanded Content */}
                        {isExpanded && (
                            <div className="p-4 pt-0 border-t border-gray-100 bg-gray-50/50 animate-in slide-in-from-top-2 duration-200">

                                <div className="mt-4 mb-4 bg-white p-3 rounded-md border border-gray-100 shadow-sm">
                                    <p className="text-sm text-brand-slate font-medium leading-relaxed">
                                        <strong className="text-brand-navy">Why it's risky: </strong>
                                        {clause.explanation}
                                    </p>
                                </div>

                                {isRisky && clause.safer_alternative && (
                                    <div className="mt-6 mb-2">
                                        <h4 className="text-sm font-bold text-brand-navy mb-2 flex items-center gap-2">
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
