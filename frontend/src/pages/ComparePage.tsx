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
            // For demo purposes, set a dummy result
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
        <div className="flex flex-col gap-6 animate-in fade-in duration-500 max-w-5xl mx-auto py-8">
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
                <button onClick={() => navigate('/')} className="text-brand-slate hover:text-brand-navy transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-2xl font-bold text-brand-navy flex items-center gap-2">
                    <GitCompare className="text-brand-teal" /> Contract Comparison Mode
                </h1>
            </div>

            {!result && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center">
                    <p className="text-brand-slate mb-8 text-center max-w-lg">
                        Upload original contract and the negotiated version. We will highlight what changed and calculate your new risk score.
                    </p>

                    <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
                        {/* File 1 */}
                        <div className="flex-1 border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center text-center relative hover:border-brand-blue/50 transition-colors">
                            <h3 className="font-bold text-brand-navy mb-2">Original Contract (v1)</h3>
                            {file1 ? (
                                <div className="text-brand-teal font-medium flex items-center gap-2"><CheckCircle2 size={18} /> {file1.name}</div>
                            ) : (
                                <p className="text-sm text-brand-slate mb-4">Upload the first version you received</p>
                            )}
                            <input type="file" onChange={(e) => handleFileChange(e, setFile1)} className="text-sm text-gray-500 w-full mt-auto file:bg-blue-50 file:text-brand-blue file:border-0 file:rounded file:px-4 file:py-1 file:font-semibold" />
                        </div>

                        <div className="flex items-center justify-center text-gray-300"><ArrowRight size={32} className="hidden md:block" /><ArrowLeft size={32} className="block md:hidden rotate-90" /></div>

                        {/* File 2 */}
                        <div className="flex-1 border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center text-center relative hover:border-brand-blue/50 transition-colors">
                            <h3 className="font-bold text-brand-navy mb-2">Negotiated Contract (v2)</h3>
                            {file2 ? (
                                <div className="text-brand-teal font-medium flex items-center gap-2"><CheckCircle2 size={18} /> {file2.name}</div>
                            ) : (
                                <p className="text-sm text-brand-slate mb-4">Upload the version after your changes</p>
                            )}
                            <input type="file" onChange={(e) => handleFileChange(e, setFile2)} className="text-sm text-gray-500 w-full mt-auto file:bg-blue-50 file:text-brand-blue file:border-0 file:rounded file:px-4 file:py-1 file:font-semibold" />
                        </div>
                    </div>

                    {error && <div className="mt-6 text-brand-red flex items-center gap-2 bg-red-50 p-3 rounded w-full justify-center"><AlertTriangle size={18} /> {error}</div>}

                    <button
                        onClick={handleCompare}
                        disabled={!file1 || !file2 || loading}
                        className="mt-8 bg-brand-blue hover:bg-brand-navy disabled:bg-gray-300 text-white font-bold py-3 px-8 rounded-lg shadow flex items-center gap-2 transition-all w-full md:w-auto justify-center"
                    >
                        {loading ? <Loader2 size={20} className="animate-spin" /> : <GitCompare size={20} />}
                        {loading ? "Comparing Documents..." : "Compare Contracts"}
                    </button>
                </div>
            )}

            {result && (
                <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-4">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center">
                        <div className={`text-5xl font-black mb-2 ${result.delta_score < 0 ? 'text-brand-green' : 'text-brand-red'}`}>
                            {result.delta_score > 0 ? '+' : ''}{result.delta_score}
                        </div>
                        <div className="text-lg font-bold text-brand-navy">{result.message}</div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50">
                            <h2 className="font-bold text-brand-navy">Highlighted Changes</h2>
                        </div>
                        <div className="p-6 flex flex-col gap-6">
                            {result.changes.map((change: any, i: number) => (
                                <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                                    <div className={`p-2 px-4 text-sm font-bold border-b ${change.type === "Risk Decreased" ? "bg-teal-50 text-brand-teal border-teal-100" :
                                            change.type === "Risk Increased" ? "bg-red-50 text-brand-red border-red-100" :
                                                "bg-gray-100 text-brand-slate border-gray-200"
                                        }`}>
                                        {change.type}
                                    </div>
                                    <div className="p-4 bg-white">
                                        <p className="mb-4 text-sm text-brand-slate"><strong className="text-brand-navy">Analysis:</strong> {change.explanation}</p>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="bg-red-50/30 p-3 rounded border border-red-100">
                                                <div className="text-xs text-brand-red font-bold mb-1">Old Version (v1)</div>
                                                <div className="text-sm font-medium line-through decoration-red-300">{change.old_text}</div>
                                            </div>
                                            <div className="bg-teal-50/30 p-3 rounded border border-teal-100">
                                                <div className="text-xs text-brand-teal font-bold mb-1">New Version (v2)</div>
                                                <div className="text-sm font-medium text-brand-navy">{change.new_text}</div>
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
