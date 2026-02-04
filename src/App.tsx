import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import MarketsPage from './pages/MarketsPage';
import SignUpPage from './pages/SignUpPage';
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
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
