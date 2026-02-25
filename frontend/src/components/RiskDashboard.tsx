import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface RiskDashboardProps {
    data: any;
}

const RiskDashboard: React.FC<RiskDashboardProps> = ({ data }) => {
    const scores = data.clauses.reduce((acc: any, clause: any) => {
        const cat = clause.risk_category || 'Legal';
        if (!acc[cat]) acc[cat] = { total: 0, count: 0, max: 0 };
        acc[cat].total += clause.risk_score;
        acc[cat].count += 1;
        if (clause.risk_score > acc[cat].max) acc[cat].max = clause.risk_score;
        return acc;
    }, {});

    const radarData = ['Financial', 'Legal', 'Compliance', 'Enforceability', 'Termination'].map(cat => ({
        subject: cat,
        A: scores[cat] ? Math.round(scores[cat].max) : 0,
        fullMark: 100,
    }));

    const distribution = { Low: 0, Medium: 0, High: 0, Critical: 0 };
    data.clauses.forEach((c: any) => {
        if (distribution[c.risk_level as keyof typeof distribution] !== undefined) {
            distribution[c.risk_level as keyof typeof distribution]++;
        }
    });

    return (
        <div className="flex flex-col gap-6">
            <div className="glass-subtle flex flex-col items-center p-4">
                <h3 className="font-bold text-white mb-4 self-start">Risk Landscape</h3>
                <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                            <PolarGrid stroke="rgba(255,255,255,0.08)" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                            <Radar name="Risk Level" dataKey="A" stroke="#14B8A6" fill="#14B8A6" fillOpacity={0.3} isAnimationActive={true} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="glass-subtle p-4">
                <h3 className="font-bold text-white mb-4">Clause Risk Distribution</h3>
                <div className="flex h-3 w-full rounded-full overflow-hidden mb-3 bg-white/[0.04]">
                    <div style={{ width: `${(distribution.Low / data.clauses.length) * 100}%` }} className="bg-brand-green transition-all duration-500"></div>
                    <div style={{ width: `${(distribution.Medium / data.clauses.length) * 100}%` }} className="bg-brand-amber transition-all duration-500"></div>
                    <div style={{ width: `${(distribution.High / data.clauses.length) * 100}%` }} className="bg-brand-blue transition-all duration-500"></div>
                    <div style={{ width: `${(distribution.Critical / data.clauses.length) * 100}%` }} className="bg-brand-red transition-all duration-500"></div>
                </div>
                <div className="flex justify-between text-xs font-semibold">
                    <span className="text-brand-green">{distribution.Low} Safe</span>
                    <span className="text-brand-amber">{distribution.Medium} Medium</span>
                    <span className="text-brand-blue">{distribution.High} High</span>
                    <span className="text-brand-red">{distribution.Critical} Critical</span>
                </div>
            </div>
        </div>
    );
};

export default RiskDashboard;
