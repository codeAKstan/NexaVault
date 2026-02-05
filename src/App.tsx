import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Loader from './components/Loader';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const MarketsPage = lazy(() => import('./pages/MarketsPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const VaultsPage = lazy(() => import('./pages/VaultsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const SupportPage = lazy(() => import('./pages/SupportPage'));
const GovernancePage = lazy(() => import('./pages/GovernancePage'));

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/markets" element={<MarketsPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/vaults" element={<VaultsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/governance" element={<GovernancePage />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
