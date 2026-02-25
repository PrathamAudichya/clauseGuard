import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import RiskDashboard from '../components/RiskDashboard';
import ClauseList from '../components/ClauseList';
import RedFlagPanel from '../components/RedFlagPanel';
import NegoBrief from '../components/NegoBrief';
import ReportExport from '../components/ReportExport';
import { ArrowLeft, ShieldCheck, AlertTriangle, Search, Filter } from 'lucide-react';

const AnalysisPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter & Search states
    const [searchTerm, setSearchTerm] = useState('');
    const [riskFilter, setRiskFilter] = useState('All');

    useEffect(() => {
        // For demo purposes, we load from localStorage or use a hardcoded demo object
        const isDemo = searchParams.get('demo') === 'true';

        setTimeout(() => {
            if (isDemo) {
                setData({
                    id: 'demo_12345',
                    filename: 'Acme_SaaS_Agreement_v2.pdf',
                    contract_type: 'SaaS / Software License',
                    type_confidence: 0.92,
                    overall_score: 78,
                    summary: [
                        "This is a 12-month software license agreement with auto-renewal.",
                        "You are agreeing to pay $5,000/month for 500 users.",
                        "The provider limits their liability to 1 month of fees.",
                        "You cannot terminate for convenience.",
                        "Provider can use your logo for marketing."
                    ],
                    clauses: [
                        {
                            original_text: "7.1 Limitation of Liability. IN NO EVENT SHALL PROVIDER BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES. PROVIDER'S TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY CUSTOMER IN THE ONE (1) MONTH PRECEDING THE CLAIM.",
                            risk_score: 95,
                            risk_level: "Critical",
                            risk_category: "Financial",
                            explanation: "This clause severely caps the provider's liability to just one month of fees, leaving you exposed if their software causes major business disruption or data breach.",
                            safer_alternative: "7.1 Limitation of Liability. IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR INDIRECT DAMAGES. EACH PARTY'S TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED THE TOTAL AMOUNTS PAID OR PAYABLE BY CUSTOMER IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.",
                            negotiation_point: "Request a mutual liability cap of 12 months fees, as 1 month is not market standard and exposes us to unacceptable risk."
                        },
                        {
                            original_text: "4.2 Auto-Renewal. This Agreement will automatically renew for successive one-year terms unless either party provides written notice of non-renewal at least ninety (90) days prior to the end of the then-current term.",
                            risk_score: 65,
                            risk_level: "High",
                            risk_category: "Termination",
                            explanation: "A 90-day notice period for non-renewal is unusually long and easy to miss, locking you into another year.",
                            safer_alternative: "4.2 Auto-Renewal. This Agreement will automatically renew for successive one-year terms unless either party provides written notice of non-renewal at least thirty (30) days prior to the end of the then-current term.",
                            negotiation_point: "Ask to reduce the non-renewal notice period from 90 days to 30 days to give us more flexibility."
                        },
                        {
                            original_text: "12. Governing Law. This Agreement shall be governed by the laws of the State of Delaware, without regard to its conflict of laws principles.",
                            risk_score: 30,
                            risk_level: "Medium",
                            risk_category: "Legal",
                            explanation: "Standard governing law clause, but you may prefer your local jurisdiction if you are not based in the US.",
                            safer_alternative: "12. Governing Law. This Agreement shall be governed by the laws of India.",
                            negotiation_point: "Consider requesting Indian law and exclusive jurisdiction of courts in [Your City] if you lack US legal representation."
                        },
                        {
                            original_text: "3.1 Payment Terms. All fees are due Net 15 from the date of invoice. Late payments will incur a 2% monthly interest charge.",
                            risk_score: 80,
                            risk_level: "High",
                            risk_category: "Financial",
                            explanation: "Net 15 is a very aggressive payment timeline. The 2% monthly late fee (24% APR) is highly punitive.",
                            safer_alternative: "3.1 Payment Terms. All fees are due Net 30 from the date of invoice. Late payments will incur a 1% monthly interest charge.",
                            negotiation_point: "Request standard Net 30 payment terms and reduce the late fee interest to 1% per month."
                        }
                    ],
                    negotiation_brief: [
                        { severity: "Critical", clause_ref: "7.1 Limitation of Liabi...", point: "Request a mutual liability cap of 12 months fees, as 1 month is not market standard." },
                        { severity: "High", clause_ref: "3.1 Payment Terms. All...", point: "Request standard Net 30 payment terms and reduce the late fee interest to 1% per month." }
                    ],
                    compliance_flags: [
                        { severity: "Medium", reason: "Data location is not specified, potential GDPR/Indian IT Act compliance issue.", clause_text: "General data processing terms." }
                    ]
                });
            } else {
                const localData = localStorage.getItem(`analysis_${id}`);
                if (localData) {
                    setData(JSON.parse(localData));
                } else {
                    setError("Analysis not found. Please upload the document again.");
                }
            }
            setLoading(false);
        }, 1000);
    }, [id, searchParams]);

    const filteredClauses = useMemo(() => {
        if (!data || !data.clauses) return [];
        return data.clauses.filter((c: any) => {
            const matchSearch = searchTerm === '' || c.original_text.toLowerCase().includes(searchTerm.toLowerCase());
            const matchFilter = riskFilter === 'All' || c.risk_level === riskFilter;
            return matchSearch && matchFilter;
        });
    }, [data, searchTerm, riskFilter]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                <div className="w-16 h-16 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mb-4"></div>
                <h2 className="text-2xl font-bold text-brand-navy">Loading Analysis...</h2>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="text-center py-20">
                <AlertTriangle className="mx-auto text-brand-red mb-4" size={48} />
                <h2 className="text-2xl font-bold text-brand-navy mb-2">Error</h2>
                <p className="text-brand-slate mb-6">{error}</p>
                <button onClick={() => navigate('/')} className="bg-brand-blue text-white px-6 py-2 rounded-lg">Go Back</button>
            </div>
        );
    }

    const getVerdictLabel = (score: number) => {
        if (score < 40) return { text: 'LOW RISK', color: 'bg-brand-green' };
        if (score < 70) return { text: 'MODERATE RISK', color: 'bg-brand-amber' };
        return { text: 'HIGH RISK', color: 'bg-brand-red' };
    };

    const verdict = getVerdictLabel(data.overall_score);

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
            {/* Top Header */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/')} className="text-brand-slate hover:text-brand-navy transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-brand-navy">{data.filename}</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-semibold bg-blue-100 text-brand-blue px-2 py-1 rounded">
                                {data.contract_type} ({(data.type_confidence * 100).toFixed(0)}% Match)
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ReportExport data={data} />
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-12 gap-6">
                {/* Left Column (Stats & Radar) */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-full h-2 ${verdict.color}`}></div>
                        <h2 className="text-sm font-bold text-brand-slate uppercase tracking-wider mt-2 mb-4">Overall Verdict</h2>

                        <div className="relative w-40 h-40 flex items-center justify-center mb-4">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100" />
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent"
                                    strokeDasharray="439.8" strokeDashoffset={439.8 - (439.8 * data.overall_score) / 100}
                                    className={`${data.overall_score >= 70 ? 'text-brand-red' : data.overall_score >= 40 ? 'text-brand-amber' : 'text-brand-green'} transition-all duration-1000 ease-out`} />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <span className="text-4xl font-black text-brand-navy">{data.overall_score}</span>
                                <span className="text-xs text-brand-slate font-medium">/ 100</span>
                            </div>
                        </div>

                        <div className={`px-4 py-1.5 rounded-full font-bold text-white text-sm tracking-wide ${verdict.color} animate-pulse`}>
                            {verdict.text}
                        </div>
                    </div>

                    <RiskDashboard data={data} />
                    <RedFlagPanel alerts={data.compliance_flags} highRisks={data.clauses.filter((c: any) => c.risk_score >= 80)} />
                </div>

                {/* Right Column (Summary & Clause List) */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-brand-navy flex items-center gap-2 mb-4">
                            <ShieldCheck className="text-brand-teal" />
                            What You Are Agreeing To (Plain English)
                        </h2>
                        <ul className="space-y-2">
                            {data.summary.map((point: string, idx: number) => (
                                <li key={idx} className="flex gap-3 text-brand-slate">
                                    <span className="text-brand-teal font-bold">•</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {data.negotiation_brief.length > 0 && (
                        <NegoBrief brief={data.negotiation_brief} />
                    )}

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[700px]">
                        <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h2 className="font-bold text-brand-navy whitespace-nowrap">Clause Analysis ({filteredClauses.length})</h2>

                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search clauses..."
                                        className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <select
                                        className="pl-9 pr-8 py-1.5 border border-gray-200 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/50 appearance-none"
                                        value={riskFilter}
                                        onChange={(e) => setRiskFilter(e.target.value)}
                                    >
                                        <option value="All">All Risks</option>
                                        <option value="Critical">Critical</option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 overflow-auto p-4 bg-gray-50/50">
                            {filteredClauses.length > 0 ? (
                                <ClauseList clauses={filteredClauses} searchTerm={searchTerm} />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-brand-slate">
                                    <p>No clauses match your current filters.</p>
                                    <button
                                        onClick={() => { setSearchTerm(''); setRiskFilter('All'); }}
                                        className="mt-2 text-brand-blue hover:underline text-sm font-medium"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisPage;
