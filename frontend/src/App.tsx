import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AnalysisPage from './pages/AnalysisPage';
import ComparePage from './pages/ComparePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-light text-slate">
        <nav className="bg-brand-navy text-white p-4 flex justify-between items-center shadow-md">
          <div className="text-xl font-bold tracking-wider flex items-center gap-2">
            <span className="text-brand-teal">Shield</span>ClauseGuard
          </div>
          <div className="text-sm font-medium">HackSRM 7.0 Edition</div>
        </nav>
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
