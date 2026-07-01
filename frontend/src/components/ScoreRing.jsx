const ScoreRing = ({ score = 0, label = 'Overall', size = 140 }) => {
  const radius = (size - 14) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(Math.max(score, 0), 100);
  const offset = circumference - (clamped / 100) * circumference;
  const color = clamped >= 75 ? '#2F8F5B' : clamped >= 50 ? '#E8A33D' : '#C4432B';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#DEDAD0" strokeWidth="8" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-3xl">{clamped}</span>
        <span className="font-mono text-[10px] uppercase tracking-wide text-inksoft">{label}</span>
      </div>
    </div>
  );
};

export default ScoreRing;
