import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const History = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/resume/history')
      .then((res) => setResumes(res.data.resumes))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
      <h1 className="font-display text-3xl sm:text-4xl mb-8">Past reviews</h1>

      {loading && <p className="font-mono text-xs uppercase text-inksoft">Loading…</p>}

      {!loading && resumes.length === 0 && (
        <p className="text-inksoft text-sm">
          Nothing here yet.{' '}
          <Link to="/upload" className="text-pen-blue underline underline-offset-2">
            Analyze your first resume
          </Link>
          .
        </p>
      )}

      <ul className="divide-y divide-line">
        {resumes.map((r) => (
          <li key={r._id} className="py-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-lg">{r.fileName}</p>
              <p className="font-mono text-xs uppercase tracking-wide text-inksoft mt-1">
                {r.targetRole || 'General review'} — {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="font-display text-2xl">{r.analysis.overallScore}</span>
              <span className="block font-mono text-[10px] uppercase text-inksoft">Score</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
