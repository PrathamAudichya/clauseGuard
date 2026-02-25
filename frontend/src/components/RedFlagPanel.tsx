import React from 'react';
import { AlertCircle, FileWarning } from 'lucide-react';

interface RedFlagPanelProps {
    alerts?: any[];
    highRisks: any[];
}

const RedFlagPanel: React.FC<RedFlagPanelProps> = ({ alerts = [], highRisks }) => {
    const totalFlags = alerts.length + highRisks.length;

    return (
        <div className="bg-red-50/30 rounded-xl shadow-sm border border-red-100 p-4">
            <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="text-brand-red" size={24} />
                <h3 className="font-bold text-brand-navy">Critical Red Flags ({totalFlags})</h3>
            </div>

            {totalFlags === 0 ? (
                <div className="text-sm text-brand-green bg-green-50 p-3 rounded border border-green-100">
                    No critical red flags detected.
                </div>
            ) : (
                <div className="space-y-3">
                    {highRisks.map((risk, idx) => (
                        <div key={`hr-${idx}`} className="bg-white p-3 rounded-lg border border-red-100 shadow-sm flex items-start gap-3 hover:border-red-300 transition-colors">
                            <div className="mt-0.5"><FileWarning size={16} className="text-brand-red" /></div>
                            <div>
                                <h4 className="text-sm font-bold text-brand-navy leading-tight mb-1 line-clamp-1">{risk.original_text}</h4>
                                <p className="text-xs text-brand-slate line-clamp-2">{risk.explanation}</p>
                            </div>
                        </div>
                    ))}

                    {alerts.map((alert, idx) => (
                        <div key={`al-${idx}`} className="bg-white p-3 rounded-lg border border-orange-200 shadow-sm flex items-start gap-3 hover:border-orange-300 transition-colors">
                            <div className="mt-0.5"><AlertCircle size={16} className="text-orange-500" /></div>
                            <div>
                                <h4 className="text-sm font-bold text-brand-navy leading-tight mb-1">Compliance Issue: {alert.severity}</h4>
                                <p className="text-xs text-brand-slate line-clamp-2">{alert.reason}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RedFlagPanel;
