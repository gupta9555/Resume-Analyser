import { useState, useRef } from 'react';
import api from '../api/axios';
import ScoreRing from '../components/ScoreRing';
import MarginNote from '../components/MarginNote';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) setFile(dropped);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Add a PDF resume to analyze.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('targetRole', targetRole);
      const res = await api.post('/resume/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res.data.resume);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong while analyzing your resume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
      <div className="mb-10">
        <span className="font-mono text-xs uppercase tracking-wide text-pen-blue">Step one</span>
        <h1 className="font-display text-3xl sm:text-4xl mt-1">Get your resume marked up</h1>
        <p className="text-inksoft text-sm mt-2 max-w-lg">
          Drop in a PDF, tell us the role you're aiming for, and get a scored, line-by-line
          review back in seconds.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
        <form onSubmit={onSubmit} className="space-y-5">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={`paper-card cursor-pointer border-2 border-dashed rounded-sm px-6 py-14 text-center transition-colors ${
              dragOver ? 'border-pen-blue bg-[#EEF1FF]' : 'border-line'
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <p className="font-display text-lg">{file ? file.name : 'Drop your resume PDF here'}</p>
            <p className="font-mono text-xs uppercase tracking-wide text-inksoft mt-2">
              {file ? `${(file.size / 1024).toFixed(0)} KB — click to replace` : 'or click to browse'}
            </p>
          </div>

          <div>
            <label className="font-mono text-xs uppercase tracking-wide text-inksoft">
              Target role <span className="normal-case text-inksoft/60">(optional)</span>
            </label>
            <input
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Frontend Engineer"
              className="mt-1 w-full border border-line rounded-sm px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-pen-blue/40 focus:border-pen-blue"
            />
          </div>

          {error && <p className="text-pen-red text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-ink text-paper px-6 py-3 rounded-sm font-mono text-xs uppercase tracking-wide hover:bg-pen-blue transition-colors disabled:opacity-50"
          >
            {loading ? 'Reading your resume…' : 'Analyze resume'}
          </button>
        </form>

        <div className="min-h-[320px]">
          {!result && !loading && (
            <div className="paper-card border border-dashed border-line rounded-sm h-full min-h-[320px] flex items-center justify-center text-center px-8">
              <p className="text-inksoft text-sm">
                Your scored review and margin notes will appear here once analysis is done.
              </p>
            </div>
          )}

          {loading && (
            <div className="paper-card rounded-sm h-full min-h-[320px] flex items-center justify-center">
              <p className="font-mono text-xs uppercase tracking-wide text-inksoft animate-pulse">
                Marking up your resume…
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-5">
              <div className="paper-card rounded-sm p-6 flex items-center gap-6">
                <ScoreRing score={result.analysis.overallScore} label="Overall" size={110} />
                <ScoreRing score={result.analysis.atsScore} label="ATS match" size={110} />
              </div>

              {result.analysis.summary && (
                <p className="text-lg leading-relaxed italic font-display">“{result.analysis.summary}”</p>
              )}

              <MarginNote tone="green" title="Strengths" items={result.analysis.strengths} />
              <MarginNote tone="red" title="Weaknesses" items={result.analysis.weaknesses} />
              <MarginNote tone="amber" title="Missing keywords" items={result.analysis.missingKeywords} />
              <MarginNote tone="blue" title="Suggestions" items={result.analysis.suggestions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
