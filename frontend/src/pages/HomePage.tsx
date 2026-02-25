import React, { useEffect, useState } from 'react';
import UploadZone from '../components/UploadZone';
import { ShieldAlert, FileText, Scale, History, Trash2, ChevronRight, Zap, Lock, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const [history, setHistory] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = () => {
        const keys = Object.keys(localStorage).filter(k => k.startsWith('analysis_'));
        const items = keys.map(k => {
            try { return JSON.parse(localStorage.getItem(k) || ''); } catch (e) { return null; }
        }).filter(Boolean);
        setHistory(items.slice(0, 5));
    };

    const clearHistory = () => {
        if (window.confirm("Clear all local analysis history?")) {
            const keys = Object.keys(localStorage).filter(k => k.startsWith('analysis_'));
            keys.forEach(k => localStorage.removeItem(k));
            setHistory([]);
        }
    };

    const getRiskColor = (score: number) => {
        if (score >= 70) return 'text-red-500 bg-red-50';
        if (score >= 40) return 'text-amber-500 bg-amber-50';
        return 'text-emerald-500 bg-emerald-50';
    };

    return (
        <div className="max-w-6xl mx-auto pt-8">
            {/* Hero + Upload — Side by Side on Desktop */}
            <div className="grid lg:grid-cols-5 gap-10 mb-12">
                {/* Left: Headline */}
                <div className="lg:col-span-2 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 bg-brand-teal/10 text-brand-teal text-xs font-semibold px-4 py-1.5 rounded-full w-fit mb-5">
                        <Zap size={13} />
                        AI-Powered Legal Analysis
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-brand-navy leading-tight mb-4">
                        Know What You're Signing.
                        <span className="text-brand-teal block mt-1">Before You Sign It.</span>
                    </h1>
                    <p className="text-base text-brand-slate leading-relaxed mb-8">
                        Upload any contract and get instant risk scores, red flags, safer
                        alternatives, and a negotiation brief — in seconds.
                    </p>

                    {/* Trust Chips */}
                    <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 text-sm text-brand-slate bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                            <Lock size={13} className="text-brand-teal" />
                            End-to-end encrypted
                        </div>
                        <div className="flex items-center gap-2 text-sm text-brand-slate bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                            <BarChart3 size={13} className="text-brand-blue" />
                            5-dim risk scoring
                        </div>
                    </div>
                </div>

                {/* Right: Upload Card */}
                <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                    <UploadZone />
                </div>
            </div>

            {/* Feature Pills */}
            <div className="grid lg:grid-cols-3 gap-5 mb-8">
                <FeatureCard
                    icon={<ShieldAlert size={20} />}
                    iconBg="bg-blue-50 text-brand-blue"
                    title="Spot Hidden Risks"
                    desc="Detects one-sided clauses, missing protections, and unusual penalties."
                />
                <FeatureCard
                    icon={<Scale size={20} />}
                    iconBg="bg-teal-50 text-brand-teal"
                    title="Fair Alternatives"
                    desc="Get instant, equitable clause rewrites you can pitch to the other side."
                />
                <FeatureCard
                    icon={<FileText size={20} />}
                    iconBg="bg-purple-50 text-purple-600"
                    title="Negotiation Brief"
                    desc="A ready-to-use action plan on exactly what to say to reduce exposure."
                />
            </div>

            {/* History */}
            {history.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50 bg-gray-50/50">
                        <h3 className="text-base font-bold text-brand-navy flex items-center gap-2">
                            <History size={18} className="text-brand-teal" />
                            Recent Analyses
                        </h3>
                        <button onClick={clearHistory} className="text-sm text-brand-red/70 hover:text-brand-red flex items-center gap-1.5 transition-colors">
                            <Trash2 size={14} />
                            Clear
                        </button>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {history.map((item, idx) => (
                            <div
                                key={idx}
                                onClick={() => navigate(`/analysis/${item.id}`)}
                                className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-blue-50/30 transition-colors group"
                            >
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className={`text-sm font-bold px-2.5 py-1.5 rounded-lg ${getRiskColor(item.overall_score)}`}>
                                        {item.overall_score}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-brand-navy truncate">{item.filename}</p>
                                        <p className="text-xs text-brand-slate mt-0.5">{item.contract_type}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            localStorage.removeItem(`analysis_${item.id}`);
                                            loadHistory();
                                        }}
                                        className="p-1.5 rounded-lg text-gray-400 hover:text-brand-red hover:bg-red-50 transition-all"
                                        title="Delete this analysis"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                    <ChevronRight size={16} className="text-gray-300 group-hover:text-brand-blue transition-colors" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

/* Small reusable feature card */
const FeatureCard = ({ icon, iconBg, title, desc }: { icon: React.ReactNode; iconBg: string; title: string; desc: string }) => (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md hover:border-gray-200 transition-all group">
        <div className={`p-2.5 rounded-xl shrink-0 ${iconBg} group-hover:scale-110 transition-transform`}>
            {icon}
        </div>
        <div>
            <h3 className="text-base font-bold text-brand-navy mb-1">{title}</h3>
            <p className="text-sm text-brand-slate leading-relaxed">{desc}</p>
        </div>
    </div>
);

export default HomePage;
