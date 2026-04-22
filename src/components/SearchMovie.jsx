export default function SearchMovie({ rec }) {
  return (
    <li key={rec.imdbId} className="cinema-form-rec-item">
      <div className="cinema-form-rec-poster">
        {rec.Poster && rec.Poster !== "N/A" ? (
          <img
            className="cinema-form-rec-poster-img"
            src={rec.Poster}
            alt={rec.Title}
          />
        ) : (
          <span className="cinema-form-rec-poster-fallback">?</span>
        )}
      </div>
      <div className="cinema-form-rec-info">
        <span className="cinema-form-rec-title">{rec.Title}</span>
        <div className="cinema-form-rec-meta">
          <span className="cinema-form-rec-year">{rec.Year}</span>
          <span className="cinema-form-rec-badge">{rec.Type}</span>
        </div>
      </div>
    </li>
  );
}
