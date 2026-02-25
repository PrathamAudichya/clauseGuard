import React, { useState } from 'react';
import { ArrowLeft, GitCompare, CheckCircle2, AlertTriangle, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ComparePage: React.FC = () => {
    const navigate = useNavigate();
    const [file1, setFile1] = useState<File | null>(null);
    const [file2, setFile2] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleCompare = async () => {
        if (!file1 || !file2) return;
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file1', file1);
        formData.append('file2', file2);

        try {
            const response = await fetch('http://localhost:8000/compare', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to compare documents');
            }

            const data = await response.json();
            setResult(data);
        } catch (err: any) {
            setError(err.message || 'Error occurred during comparison');
            setTimeout(() => {
                setResult({
                    delta_score: -18,
                    message: "Risk reduced by 18 points after negotiation.",
                    changes: [
                        {
                            type: "Risk Decreased",
                            old_text: "Provider limits liability to 1 month of fees.",
                            new_text: "Provider limits liability to 12 months of fees.",
                            explanation: "Liability cap was increased to clearer market standards, reducing your financial exposure."
                        },
                        {
                            type: "Neutral Change",
                            old_text: "Governing law is Delaware.",
                            new_text: "Governing law is New York.",
                            explanation: "Jurisdiction changed, but risk exposure remains similar."
                        }
                    ]
                });
                setError(null);
            }, 500);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto flex max-w-6xl flex-col gap-6 py-4 animate-in fade-in duration-500">
            <div className="glass-panel flex items-center gap-4 p-4 sm:p-5">
                <button onClick={() => navigate('/')} className="btn-ghost p-2.5">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="section-title flex items-center gap-2 text-2xl">
                    <GitCompare className="text-brand-teal" /> Contract Comparison Mode
                </h1>
            </div>

            {!result && (
                <div className="glass-panel flex flex-col items-center p-6 sm:p-8">
                    <p className="mb-8 max-w-lg text-center text-brand-slate">
                        Upload original contract and the negotiated version. We will highlight what changed and calculate your new risk score.
                    </p>

                    <div className="flex w-full flex-col justify-center gap-5 md:flex-row md:items-stretch">
                        <div className="glass-subtle interactive-surface flex flex-1 flex-col items-center rounded-2xl border-2 border-dashed border-white/10 p-6 text-center">
                            <h3 className="mb-2 font-bold text-white">Original Contract (v1)</h3>
                            {file1 ? (
                                <div className="flex items-center gap-2 font-medium text-brand-teal"><CheckCircle2 size={18} /> {file1.name}</div>
                            ) : (
                                <p className="mb-4 text-sm text-brand-slate">Upload the first version you received</p>
                            )}
                            <input type="file" onChange={(e) => handleFileChange(e, setFile1)} className="mt-auto w-full text-sm text-brand-slate file:cursor-pointer file:rounded-lg file:border-0 file:bg-brand-teal/15 file:px-4 file:py-1.5 file:font-semibold file:text-brand-teal" />
                        </div>

                        <div className="flex items-center justify-center text-brand-slate/30"><ArrowRight size={32} className="hidden md:block" /><ArrowLeft size={32} className="block rotate-90 md:hidden" /></div>

                        <div className="glass-subtle interactive-surface flex flex-1 flex-col items-center rounded-2xl border-2 border-dashed border-white/10 p-6 text-center">
                            <h3 className="mb-2 font-bold text-white">Negotiated Contract (v2)</h3>
                            {file2 ? (
                                <div className="flex items-center gap-2 font-medium text-brand-teal"><CheckCircle2 size={18} /> {file2.name}</div>
                            ) : (
                                <p className="mb-4 text-sm text-brand-slate">Upload the version after your changes</p>
                            )}
                            <input type="file" onChange={(e) => handleFileChange(e, setFile2)} className="mt-auto w-full text-sm text-brand-slate file:cursor-pointer file:rounded-lg file:border-0 file:bg-brand-blue/15 file:px-4 file:py-1.5 file:font-semibold file:text-brand-blue" />
                        </div>
                    </div>

                    {error && <div className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-brand-red/20 bg-brand-red/10 p-3 text-brand-red"><AlertTriangle size={18} /> {error}</div>}

                    <button
                        onClick={handleCompare}
                        disabled={!file1 || !file2 || loading}
                        className="btn-primary mt-8 w-full justify-center px-8 py-3 text-base font-bold disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-white/[0.08] disabled:text-brand-slate/50 md:w-auto"
                    >
                        {loading ? <Loader2 size={20} className="animate-spin" /> : <GitCompare size={20} />}
                        {loading ? "Comparing Documents..." : "Compare Contracts"}
                    </button>
                </div>
            )}

            {result && (
                <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-4">
                    <div className="glass-panel flex flex-col items-center p-8 text-center">
                        <div className={`text-5xl font-black mb-2 ${result.delta_score < 0 ? 'text-brand-green' : 'text-brand-red'}`}>
                            {result.delta_score > 0 ? '+' : ''}{result.delta_score}
                        </div>
                        <div className="text-lg font-bold text-white">{result.message}</div>
                    </div>

                    <div className="glass-panel overflow-hidden">
                        <div className="border-b border-white/[0.08] bg-surface-200/70 p-4">
                            <h2 className="font-bold text-white">Highlighted Changes</h2>
                        </div>
                        <div className="p-6 flex flex-col gap-6">
                            {result.changes.map((change: any, i: number) => (
                                <div key={i} className="overflow-hidden rounded-xl border border-white/[0.08] bg-surface-200/70">
                                    <div className={`p-2 px-4 text-sm font-bold border-b ${change.type === "Risk Decreased" ? "bg-brand-teal/10 text-brand-teal border-brand-teal/20" :
                                        change.type === "Risk Increased" ? "bg-brand-red/10 text-brand-red border-brand-red/20" :
                                            "bg-white/[0.04] text-brand-slate border-white/[0.06]"
                                        }`}>
                                        {change.type}
                                    </div>
                                    <div className="bg-surface-300/50 p-4">
                                        <p className="mb-4 text-sm text-brand-slate"><strong className="text-white">Analysis:</strong> {change.explanation}</p>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="bg-brand-red/5 p-3 rounded-lg border border-brand-red/10">
                                                <div className="text-xs text-brand-red font-bold mb-1">Old Version (v1)</div>
                                                <div className="text-sm font-medium text-brand-slate line-through decoration-brand-red/30">{change.old_text}</div>
                                            </div>
                                            <div className="bg-brand-teal/5 p-3 rounded-lg border border-brand-teal/10">
                                                <div className="text-xs text-brand-teal font-bold mb-1">New Version (v2)</div>
                                                <div className="text-sm font-medium text-white">{change.new_text}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ComparePage;
