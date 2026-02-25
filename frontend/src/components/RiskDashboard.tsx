import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface RiskDashboardProps {
    data: any;
}

const RiskDashboard: React.FC<RiskDashboardProps> = ({ data }) => {
    // Aggregate data for the radar chart based on categories
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
        A: scores[cat] ? Math.round(scores[cat].max) : 0, // Using max risk per category
        fullMark: 100,
    }));

    // Calculate Risk Distribution (Low, Med, High, Crit)
    const distribution = { Low: 0, Medium: 0, High: 0, Critical: 0 };
    data.clauses.forEach((c: any) => {
        if (distribution[c.risk_level as keyof typeof distribution] !== undefined) {
            distribution[c.risk_level as keyof typeof distribution]++;
        }
    });

    return (
        <div className="flex flex-col gap-6">
            {/* Radar Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col items-center">
                <h3 className="font-bold text-brand-navy mb-4 self-start">Risk Landscape</h3>
                <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                            <PolarGrid stroke="#e2e8f0" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                            <Radar name="Risk Level" dataKey="A" stroke="#DC2626" fill="#DC2626" fillOpacity={0.6} isAnimationActive={true} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Distribution Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h3 className="font-bold text-brand-navy mb-4">Clause Risk Distribution</h3>
                <div className="flex h-4 w-full rounded-full overflow-hidden mb-2">
                    <div style={{ width: `${(distribution.Low / data.clauses.length) * 100}%` }} className="bg-brand-green"></div>
                    <div style={{ width: `${(distribution.Medium / data.clauses.length) * 100}%` }} className="bg-brand-amber text-opacity-80 bg-opacity-80"></div>
                    <div style={{ width: `${(distribution.High / data.clauses.length) * 100}%` }} className="bg-orange-500"></div>
                    <div style={{ width: `${(distribution.Critical / data.clauses.length) * 100}%` }} className="bg-brand-red"></div>
                </div>
                <div className="flex justify-between text-xs font-semibold">
                    <span className="text-brand-green">{distribution.Low} Safe</span>
                    <span className="text-brand-amber">{distribution.Medium} Medium</span>
                    <span className="text-orange-500">{distribution.High} High</span>
                    <span className="text-brand-red">{distribution.Critical} Critical</span>
                </div>
            </div>
        </div>
    );
};

export default RiskDashboard;
