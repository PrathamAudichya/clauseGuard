import React from 'react';
import { Target, MessageSquare } from 'lucide-react';

interface NegoBriefProps {
    brief: Array<{ severity: string; clause_ref: string; point: string; }>;
}

const NegoBrief: React.FC<NegoBriefProps> = ({ brief }) => {
    return (
        <div className="bg-brand-navy rounded-xl shadow-md p-6 text-white bg-opacity-95 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')]">
            <div className="flex items-center gap-3 mb-6">
                <Target className="text-brand-teal" size={28} />
                <div>
                    <h2 className="text-xl font-bold">Negotiation Action Plan</h2>
                    <p className="text-sm text-blue-200">What to say to the other party</p>
                </div>
            </div>

            <div className="space-y-4">
                {brief.map((item, idx) => (
                    <div key={idx} className="bg-white/10 p-4 rounded-lg flex items-start gap-4">
                        <div className="bg-white/20 p-2 rounded-full mt-1">
                            <MessageSquare size={16} className="text-white" />
                        </div>
                        <div>
                            <div className="flex gap-2 items-center mb-1">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${item.severity === 'Critical' ? 'bg-brand-red text-white' : 'bg-orange-500 text-white'
                                    }`}>
                                    {item.severity} Priority
                                </span>
                                <span className="text-xs text-blue-200 truncate max-w-[200px]" title={item.clause_ref}>
                                    Ref: {item.clause_ref}
                                </span>
                            </div>
                            <p className="text-sm font-medium text-white leading-relaxed">
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
