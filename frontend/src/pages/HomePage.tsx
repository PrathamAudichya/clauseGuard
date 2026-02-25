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
        if (score >= 70) return 'text-brand-red bg-brand-red/10 border border-brand-red/20';
        if (score >= 40) return 'text-brand-amber bg-brand-amber/10 border border-brand-amber/20';
        return 'text-brand-green bg-brand-green/10 border border-brand-green/20';
    };

    return (
        <div className="mx-auto flex max-w-7xl flex-col gap-8 pb-8 pt-2 sm:gap-10">
            <section className="grid gap-8 lg:grid-cols-5 lg:gap-10">
                <div className="lg:col-span-2 flex flex-col justify-center">
                    <div className="section-kicker w-fit border-brand-teal/25 bg-brand-teal/10 text-brand-teal mb-5">
                        <Zap size={13} />
                        AI-Powered Legal Analysis
                    </div>
                    <h1 className="section-title text-4xl font-extrabold leading-tight sm:text-5xl">
                        Know what you are signing
                        <span className="mt-1 block text-brand-teal">before you sign it.</span>
                    </h1>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-slate">
                        Upload any contract and get instant risk scores, red flags, safer
                        alternatives, and a negotiation brief — in seconds.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <div className="glass-subtle interactive-surface flex cursor-default items-center gap-2 px-4 py-2.5 text-sm text-brand-slate">
                            <Lock size={13} className="text-brand-teal" />
                            End-to-end encrypted
                        </div>
                        <div className="glass-subtle interactive-surface flex cursor-default items-center gap-2 px-4 py-2.5 text-sm text-brand-slate">
                            <BarChart3 size={13} className="text-brand-blue" />
                            5-dim risk scoring
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3 glass-panel p-6 sm:p-8">
                    <UploadZone />
                </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <FeatureCard
                    icon={<ShieldAlert size={20} />}
                    iconBg="bg-brand-blue/10 text-brand-blue"
                    title="Spot Hidden Risks"
                    desc="Detects one-sided clauses, missing protections, and unusual penalties."
                />
                <FeatureCard
                    icon={<Scale size={20} />}
                    iconBg="bg-brand-teal/10 text-brand-teal"
                    title="Fair Alternatives"
                    desc="Get instant, equitable clause rewrites you can pitch to the other side."
                />
                <FeatureCard
                    icon={<FileText size={20} />}
                    iconBg="bg-brand-purple/10 text-brand-purple"
                    title="Negotiation Brief"
                    desc="A ready-to-use action plan on exactly what to say to reduce exposure."
                />
            </section>

            {history.length > 0 && (
                <section className="glass-panel overflow-hidden">
                    <div className="flex items-center justify-between border-b border-white/[0.08] bg-surface-200/60 px-5 py-4 sm:px-6">
                        <h3 className="section-title flex items-center gap-2 text-base">
                            <History size={18} className="text-brand-teal" />
                            Recent Analyses
                        </h3>
                        <button onClick={clearHistory} className="btn-ghost border-brand-red/20 bg-brand-red/5 px-3 py-1.5 text-brand-red hover:border-brand-red/35 hover:bg-brand-red/10">
                            <Trash2 size={14} />
                            Clear
                        </button>
                    </div>
                    <div className="divide-y divide-white/[0.06]">
                        {history.map((item, idx) => (
                            <div
                                key={idx}
                                onClick={() => navigate(`/analysis/${item.id}`)}
                                className="group flex cursor-pointer items-center justify-between px-5 py-4 transition-all duration-200 hover:bg-white/[0.04] sm:px-6"
                            >
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className={`rounded-lg px-2.5 py-1.5 text-sm font-bold ${getRiskColor(item.overall_score)}`}>
                                        {item.overall_score}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-white transition-colors group-hover:text-brand-teal">{item.filename}</p>
                                        <p className="mt-0.5 text-xs text-brand-slate">{item.contract_type}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            localStorage.removeItem(`analysis_${item.id}`);
                                            loadHistory();
                                        }}
                                        className="rounded-lg p-1.5 text-brand-slate/40 transition-all hover:bg-brand-red/10 hover:text-brand-red"
                                        title="Delete this analysis"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                    <ChevronRight size={16} className="text-brand-slate/35 transition-all group-hover:translate-x-0.5 group-hover:text-brand-teal" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

const FeatureCard = ({ icon, iconBg, title, desc }: { icon: React.ReactNode; iconBg: string; title: string; desc: string }) => (
    <div className="glass-subtle interactive-surface group flex cursor-default items-start gap-4 p-5">
        <div className={`shrink-0 rounded-xl p-2.5 transition-transform duration-300 group-hover:scale-110 ${iconBg}`}>
            {icon}
        </div>
        <div>
            <h3 className="mb-1 text-base font-bold text-white">{title}</h3>
            <p className="text-sm leading-relaxed text-brand-slate">{desc}</p>
        </div>
    </div>
);

export default HomePage;
