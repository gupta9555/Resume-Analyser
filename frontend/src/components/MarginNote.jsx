const toneStyles = {
  green: { border: 'border-pen-green/50', bg: 'bg-[#F1FAF4]', dot: 'bg-pen-green' },
  red: { border: 'border-pen-red/50', bg: 'bg-[#FDF3F1]', dot: 'bg-pen-red' },
  amber: { border: 'border-pen-amber/50', bg: 'bg-[#FFF8EA]', dot: 'bg-pen-amber' },
  blue: { border: 'border-pen-blue/40', bg: 'bg-[#EEF1FF]', dot: 'bg-pen-blue' },
};

const MarginNote = ({ tone = 'blue', title, items = [] }) => {
  const t = toneStyles[tone] || toneStyles.blue;
  if (!items.length) return null;

  return (
    <div className={`paper-card ${t.bg} ${t.border} border rounded-sm p-4 sm:p-5`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`h-2 w-2 rounded-full ${t.dot}`} />
        <h3 className="font-mono text-xs uppercase tracking-wide text-inksoft">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm leading-relaxed pl-3 relative before:content-['—'] before:absolute before:left-0 before:text-inksoft/50">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarginNote;
