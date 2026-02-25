import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { Shield, Home, GitCompareArrows, FileText, Sparkles } from 'lucide-react';
import HomePage from './pages/HomePage';
import AnalysisPage from './pages/AnalysisPage';
import ComparePage from './pages/ComparePage';

function Navbar() {
  const location = useLocation();
  const isAnalysisPage = location.pathname.startsWith('/analysis');

  return (
    <nav className="sticky top-4 z-50 page-container">
      <div className="glass-panel px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3 sm:gap-6">
          <NavLink to="/" className="group flex items-center gap-2.5 shrink-0">
            <div className="rounded-xl bg-brand-teal/15 p-2.5 text-brand-teal transition-all duration-300 group-hover:bg-brand-teal/25 group-hover:shadow-lg group-hover:shadow-brand-teal/15">
              <Shield size={16} />
            </div>
            <span className="hidden text-base font-bold tracking-tight sm:inline">
              <span className="text-brand-teal">Clause</span>
              <span className="text-white">Guard</span>
            </span>
          </NavLink>

          <div className="glass-subtle flex min-w-0 flex-1 items-center gap-1 p-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex min-w-0 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-300 sm:px-5 ${isActive
                  ? 'bg-brand-teal text-white shadow-lg shadow-brand-teal/20'
                  : 'text-brand-slate hover:bg-white/[0.06] hover:text-white'
                }`
              }
            >
              <Home size={14} />
              <span className="hidden sm:inline">Scan</span>
            </NavLink>
            <NavLink
              to="/compare"
              className={({ isActive }) =>
                `flex min-w-0 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-300 sm:px-5 ${isActive
                  ? 'bg-brand-teal text-white shadow-lg shadow-brand-teal/20'
                  : 'text-brand-slate hover:bg-white/[0.06] hover:text-white'
                }`
              }
            >
              <GitCompareArrows size={14} />
              <span className="hidden sm:inline">Compare</span>
            </NavLink>
            {isAnalysisPage && (
              <div className="ml-auto flex items-center gap-2 rounded-lg bg-brand-blue/90 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-blue/20 sm:px-5">
                <FileText size={14} />
                <span className="hidden sm:inline">Report</span>
              </div>
            )}
          </div>

          <div className="hidden items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-brand-slate lg:flex">
            <Sparkles size={12} className="text-brand-teal" />
            AI Ready
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-teal opacity-60"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-teal"></span>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app-shell">
        <div className="ambient-canvas">
          <div className="ambient-orb -top-28 left-1/4 h-72 w-72 bg-brand-teal/20" />
          <div className="ambient-orb top-40 -right-20 h-80 w-80 bg-brand-blue/20" />
          <div className="ambient-orb -bottom-24 left-10 h-72 w-72 bg-brand-purple/20" />
        </div>
        <Navbar />
        <main className="page-container pb-16 pt-8 sm:pt-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analysis/:id" element={<AnalysisPage />} />
            <Route path="/compare" element={<ComparePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
