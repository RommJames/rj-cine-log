import "./styles/watchSummary.css";

export default function WatchSummary({ cinemas }) {
  const totalLogged = cinemas.length;

  const watchedCinemas = cinemas.filter(
    (cinema) => cinema.status == "Watched",
  ).length;

  const watchingCinemas = cinemas.filter(
    (cinema) => cinema.status == "Watching",
  ).length;

  const haveReviews = cinemas.filter((cinema) => cinema.rating);

  const avgRatings =
    haveReviews.reduce((acc, cinema) => acc + (cinema?.rating || 0), 0) /
      haveReviews.length || 0;

  return (
    <section className="watch-summary">
      <div className="summary-stat">
        <p className="stat-label">Total Logged</p>
        <span className="stat-value">{totalLogged}</span>
      </div>
      <div className="summary-divider" />
      <div className="summary-stat">
        <p className="stat-label">Watched</p>
        <span className="stat-value">{watchedCinemas}</span>
      </div>
      <div className="summary-divider" />
      <div className="summary-stat">
        <p className="stat-label">Watching</p>
        <span className="stat-value">{watchingCinemas}</span>
      </div>
      <div className="summary-divider" />
      <div className="summary-stat">
        <p className="stat-label">Avg Rating</p>
        <span className="stat-value">{avgRatings.toFixed(2)}</span>
      </div>
    </section>
  );
}
