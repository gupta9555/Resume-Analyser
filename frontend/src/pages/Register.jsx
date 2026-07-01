import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await register(name, email, password);
      navigate('/upload');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create your account.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-5 py-16 sm:py-24">
      <h1 className="font-display text-3xl sm:text-4xl mb-1">Create your account</h1>
      <p className="text-inksoft text-sm mb-8">Free feedback on your resume in under a minute.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-mono text-xs uppercase tracking-wide text-inksoft">Name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full border border-line rounded-sm px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-pen-blue/40 focus:border-pen-blue"
            placeholder="Jordan Lee"
          />
        </div>
        <div>
          <label className="font-mono text-xs uppercase tracking-wide text-inksoft">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border border-line rounded-sm px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-pen-blue/40 focus:border-pen-blue"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="font-mono text-xs uppercase tracking-wide text-inksoft">Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border border-line rounded-sm px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-pen-blue/40 focus:border-pen-blue"
            placeholder="At least 6 characters"
          />
        </div>
        {error && <p className="text-pen-red text-sm">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full bg-ink text-paper py-2.5 rounded-sm font-mono text-xs uppercase tracking-wide hover:bg-pen-blue transition-colors disabled:opacity-50"
        >
          {busy ? 'Creating account…' : 'Sign up'}
        </button>
      </form>

      <p className="text-sm text-inksoft mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-pen-blue underline underline-offset-2">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Register;
