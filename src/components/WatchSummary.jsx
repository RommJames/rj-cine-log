import "./styles/watchSummary.css";

export default function WatchSummary() {
  return (
    <section className="watch-summary">
      <div className="summary-stat">
        <p className="stat-label">Total Logged</p>
        <span className="stat-value">6</span>
      </div>
      <div className="summary-divider" />
      <div className="summary-stat">
        <p className="stat-label">Watched</p>
        <span className="stat-value">3</span>
      </div>
      <div className="summary-divider" />
      <div className="summary-stat">
        <p className="stat-label">Watching</p>
        <span className="stat-value">2</span>
      </div>
      <div className="summary-divider" />
      <div className="summary-stat">
        <p className="stat-label">Avg Rating</p>
        <span className="stat-value">4.0</span>
      </div>
    </section>
  );
}
