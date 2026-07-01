import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="border-b border-line bg-paper/90 backdrop-blur sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-display italic text-xl tracking-tight">
          Resumé<span className="text-pen-blue not-italic">.</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6 font-mono text-xs uppercase tracking-wide">
          {user ? (
            <>
              <Link to="/upload" className="hover:text-pen-blue transition-colors">Analyze</Link>
              <Link to="/history" className="hover:text-pen-blue transition-colors">History</Link>
              <span className="hidden sm:inline text-inksoft normal-case font-body">{user.name}</span>
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="border border-ink px-3 py-1.5 rounded-sm hover:bg-ink hover:text-paper transition-colors"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-pen-blue transition-colors">Log in</Link>
              <Link
                to="/register"
                className="border border-ink px-3 py-1.5 rounded-sm hover:bg-ink hover:text-paper transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
