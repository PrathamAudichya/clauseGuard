import React, { useEffect, useState } from 'react';
import UploadZone from '../components/UploadZone';
import { ShieldAlert, FileText, Scale, History, Trash2, ChevronRight } from 'lucide-react';
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

        // Sort by descending roughly (we don't have a date field, but we can just show them)
        setHistory(items.slice(0, 5));
    };

    const clearHistory = () => {
        if (window.confirm("Are you sure you want to clear your local analysis history?")) {
            const keys = Object.keys(localStorage).filter(k => k.startsWith('analysis_'));
            keys.forEach(k => localStorage.removeItem(k));
            setHistory([]);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-10">
            <div className="text-center max-w-3xl mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h1 className="text-5xl font-extrabold text-brand-navy mb-4 leading-tight">
                    Know What You Are Signing. <br />
                    <span className="text-brand-teal">Before You Sign It.</span>
                </h1>
                <p className="text-xl text-brand-slate mb-8">
                    Upload any contract. Get instant risk scores, red flags, safer alternatives,
                    and a negotiation brief — powered by AI, built for humans.
                </p>
            </div>

            <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-8 mb-16 animate-in zoom-in-95 duration-500 delay-150 fill-mode-both border border-gray-100">
                <UploadZone />
            </div>

            {history.length > 0 && (
                <div className="w-full max-w-3xl mb-16 animate-in fade-in transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2">
                            <History size={24} className="text-brand-teal" />
                            Recent Analyses
                        </h2>
                        <button onClick={clearHistory} className="text-sm text-brand-red flex items-center gap-1 hover:underline">
                            <Trash2 size={16} /> Clear History
                        </button>
                    </div>
                    <div className="grid gap-3">
                        {history.map((item, idx) => (
                            <div
                                key={idx}
                                onClick={() => navigate(`/analysis/${item.id}`)}
                                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:border-brand-blue hover:shadow-md transition-all group"
                            >
                                <div>
                                    <h3 className="font-bold text-brand-navy">{item.filename}</h3>
                                    <p className="text-sm text-brand-slate">{item.contract_type} • Score: {item.overall_score}</p>
                                </div>
                                <ChevronRight className="text-gray-300 group-hover:text-brand-blue transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-50 flex flex-col items-center text-center">
                    <div className="bg-blue-100 p-3 rounded-full text-brand-blue mb-4">
                        <ShieldAlert size={32} />
                    </div>
                    <h3 className="font-bold text-lg text-brand-navy mb-2">Spot Hidden Risks</h3>
                    <p className="text-brand-slate text-sm">Our AI detects one-sided clauses, missing standard protections, and unusual penalties within seconds.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-50 flex flex-col items-center text-center">
                    <div className="bg-teal-100 p-3 rounded-full text-brand-teal mb-4">
                        <Scale size={32} />
                    </div>
                    <h3 className="font-bold text-lg text-brand-navy mb-2">Fair Alternatives</h3>
                    <p className="text-brand-slate text-sm">Don't just find problems. Get instant, equitable clause rewrites you can pitch to the other side.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-50 flex flex-col items-center text-center">
                    <div className="bg-purple-100 p-3 rounded-full text-brand-purple mb-4">
                        <FileText size={32} />
                    </div>
                    <h3 className="font-bold text-lg text-brand-navy mb-2">Negotiation Brief</h3>
                    <p className="text-brand-slate text-sm">A ready-to-use action plan on exactly what to say to counterparty to reduce your exposure.</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
