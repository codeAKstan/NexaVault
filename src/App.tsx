import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import MarketsPage from './pages/MarketsPage';
import SignUpPage from './pages/SignUpPage';
import VaultsPage from './pages/VaultsPage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/markets" element={<MarketsPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/vaults" element={<VaultsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
