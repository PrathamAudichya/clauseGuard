import React from 'react';
import { AlertCircle, FileWarning } from 'lucide-react';

interface RedFlagPanelProps {
    alerts?: any[];
    highRisks: any[];
}

const RedFlagPanel: React.FC<RedFlagPanelProps> = ({ alerts = [], highRisks }) => {
    const totalFlags = alerts.length + highRisks.length;

    return (
        <div className="rounded-xl border border-brand-red/20 bg-brand-red/5 p-5">
            <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="text-brand-red" size={24} />
                <h3 className="font-bold text-white">Critical Red Flags ({totalFlags})</h3>
            </div>

            {totalFlags === 0 ? (
                <div className="text-sm text-brand-green bg-brand-green/10 p-3.5 rounded-lg border border-brand-green/15">
                    No critical red flags detected.
                </div>
            ) : (
                <div className="space-y-3">
                    {highRisks.map((risk, idx) => (
                        <div key={`hr-${idx}`} className="flex items-start gap-3 rounded-lg border border-brand-red/15 bg-surface-200/90 p-3.5 transition-colors hover:border-brand-red/25">
                            <div className="mt-0.5"><FileWarning size={16} className="text-brand-red" /></div>
                            <div>
                                <h4 className="text-sm font-bold text-white leading-tight mb-1 line-clamp-1">{risk.original_text}</h4>
                                <p className="text-xs text-brand-slate line-clamp-2">{risk.explanation}</p>
                            </div>
                        </div>
                    ))}

                    {alerts.map((alert, idx) => (
                        <div key={`al-${idx}`} className="flex items-start gap-3 rounded-lg border border-brand-amber/15 bg-surface-200/90 p-3.5 transition-colors hover:border-brand-amber/25">
                            <div className="mt-0.5"><AlertCircle size={16} className="text-brand-amber" /></div>
                            <div>
                                <h4 className="text-sm font-bold text-white leading-tight mb-1">Compliance Issue: {alert.severity}</h4>
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
