interface Props {
  total: number;
  active: number;
  completed: number;
}

export function StatsBar({ total, active, completed }: Props) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="stats-bar">
      <div className="stats-bar__numbers">
        <span className="stat">📝 合計 <strong>{total}</strong></span>
        <span className="stat">⏳ 未完了 <strong>{active}</strong></span>
        <span className="stat">✅ 完了 <strong>{completed}</strong></span>
      </div>
      <div className="stats-bar__progress">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
        <span className="progress-label">{percent}%</span>
      </div>
    </div>
  );
}
