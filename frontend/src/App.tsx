import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { Shield, Home, GitCompareArrows, FileText } from 'lucide-react';
import HomePage from './pages/HomePage';
import AnalysisPage from './pages/AnalysisPage';
import ComparePage from './pages/ComparePage';

function Navbar() {
  const location = useLocation();
  const isAnalysisPage = location.pathname.startsWith('/analysis');

  return (
    <nav className="bg-brand-navy/95 backdrop-blur-md text-white sticky top-0 z-50 border-b border-white/5">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="bg-brand-teal/15 p-1.5 rounded-lg group-hover:bg-brand-teal/25 transition-colors">
              <Shield size={22} className="text-brand-teal" />
            </div>
            <span className="text-lg font-bold tracking-wide">
              <span className="text-brand-teal">Clause</span>Guard
            </span>
          </NavLink>

          {/* Center Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-1.5 py-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                  ? 'bg-brand-teal text-white shadow-sm shadow-brand-teal/30'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
                }`
              }
            >
              <Home size={15} />
              Scan
            </NavLink>
            <NavLink
              to="/compare"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                  ? 'bg-brand-teal text-white shadow-sm shadow-brand-teal/30'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
                }`
              }
            >
              <GitCompareArrows size={15} />
              Compare
            </NavLink>
            {isAnalysisPage && (
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-brand-blue text-white shadow-sm shadow-brand-blue/30">
                <FileText size={15} />
                Report
              </div>
            )}
          </div>

          {/* Right Side - Status */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-white/50 bg-white/5 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              AI Ready
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden flex items-center justify-center gap-2 pb-2 px-4">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${isActive
              ? 'bg-brand-teal text-white'
              : 'text-white/60 bg-white/5'
            }`
          }
        >
          <Home size={13} />
          Scan
        </NavLink>
        <NavLink
          to="/compare"
          className={({ isActive }) =>
            `flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${isActive
              ? 'bg-brand-teal text-white'
              : 'text-white/60 bg-white/5'
            }`
          }
        >
          <GitCompareArrows size={13} />
          Compare
        </NavLink>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-light text-slate">
        <Navbar />
        <main className="container mx-auto p-4 md:p-8">
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
