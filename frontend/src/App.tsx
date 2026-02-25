import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { Shield, Home, GitCompareArrows, FileText, Sparkles } from 'lucide-react';
import HomePage from './pages/HomePage';
import AnalysisPage from './pages/AnalysisPage';
import ComparePage from './pages/ComparePage';

function Navbar() {
  const location = useLocation();
  const isAnalysisPage = location.pathname.startsWith('/analysis');

  return (
    <nav className="sticky top-3 z-50 mx-auto max-w-3xl px-3">
      <div className="bg-brand-navy/90 backdrop-blur-xl text-white rounded-full px-4 py-2.5 shadow-lg shadow-brand-navy/20 border border-white/10 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 pl-1 group shrink-0">
          <div className="bg-brand-teal/20 p-1.5 rounded-full group-hover:bg-brand-teal/30 transition-colors">
            <Shield size={18} className="text-brand-teal" />
          </div>
          <span className="text-base font-bold tracking-wide hidden sm:inline">
            <span className="text-brand-teal">Clause</span>Guard
          </span>
        </NavLink>

        {/* Center Pill Nav */}
        <div className="flex items-center gap-1 bg-white/5 rounded-full px-1.5 py-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${isActive
                ? 'bg-brand-teal text-white shadow-sm shadow-brand-teal/40'
                : 'text-white/60 hover:text-white hover:bg-white/10'
              }`
            }
          >
            <Home size={15} />
            Scan
          </NavLink>
          <NavLink
            to="/compare"
            className={({ isActive }) =>
              `flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${isActive
                ? 'bg-brand-teal text-white shadow-sm shadow-brand-teal/40'
                : 'text-white/60 hover:text-white hover:bg-white/10'
              }`
            }
          >
            <GitCompareArrows size={15} />
            Compare
          </NavLink>
          {isAnalysisPage && (
            <div className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-brand-blue text-white shadow-sm shadow-brand-blue/40">
              <FileText size={15} />
              Report
            </div>
          )}
        </div>

        {/* AI Status Chip */}
        <div className="flex items-center gap-2 text-xs text-white/50 bg-white/5 px-3 py-1.5 rounded-full mr-1 shrink-0">
          <Sparkles size={12} className="text-brand-teal" />
          <span className="hidden sm:inline">AI Ready</span>
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-light text-slate">
        <Navbar />
        <main className="container mx-auto px-6 md:px-10 pt-8 pb-12">
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
