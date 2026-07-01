import { Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';
import History from './pages/History';

const Landing = () => (
  <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20 sm:py-32">
    <span className="font-mono text-xs uppercase tracking-wide text-pen-blue">AI-powered resume review</span>
    <h1 className="font-display text-4xl sm:text-6xl mt-3 leading-[1.05]">
      Every resume
      <br />
      <span className="italic">deserves a red pen.</span>
    </h1>
    <p className="text-inksoft mt-5 max-w-md">
      Upload your resume, get a scored breakdown, and see exactly what to fix — in the time
      it takes to read this sentence.
    </p>
    <Link
      to="/register"
      className="inline-block mt-8 bg-ink text-paper px-6 py-3 rounded-sm font-mono text-xs uppercase tracking-wide hover:bg-pen-blue transition-colors"
    >
      Start free review
    </Link>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <Upload />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
