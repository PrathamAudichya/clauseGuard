import React from 'react';
import { Target, MessageSquare } from 'lucide-react';

interface NegoBriefProps {
    brief: Array<{ severity: string; clause_ref: string; point: string; }>;
}

const NegoBrief: React.FC<NegoBriefProps> = ({ brief }) => {
    return (
        <div className="glass-subtle p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-brand-teal/15 p-2.5 rounded-xl">
                    <Target className="text-brand-teal" size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">Negotiation Action Plan</h2>
                    <p className="text-sm text-brand-slate">What to say to the other party</p>
                </div>
            </div>

            <div className="space-y-4">
                {brief.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 rounded-lg border border-white/[0.08] bg-white/[0.04] p-4 transition-colors hover:bg-white/[0.06]">
                        <div className="bg-white/[0.08] p-2 rounded-lg mt-1">
                            <MessageSquare size={16} className="text-brand-teal" />
                        </div>
                        <div>
                            <div className="flex gap-2 items-center mb-1.5">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${item.severity === 'Critical' ? 'bg-brand-red/15 text-brand-red' : 'bg-brand-amber/15 text-brand-amber'
                                    }`}>
                                    {item.severity} Priority
                                </span>
                                <span className="text-xs text-brand-slate/50 truncate max-w-[200px]" title={item.clause_ref}>
                                    Ref: {item.clause_ref}
                                </span>
                            </div>
                            <p className="text-sm font-medium text-brand-slate leading-relaxed">
                                "{item.point}"
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NegoBrief;
