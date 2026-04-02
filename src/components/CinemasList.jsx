import "./styles/cinemasList.css";

const SAMPLE_ENTRIES = [
  {
    id: 1,
    title: "Interstellar",
    type: "Movie",
    genre: "Sci-Fi",
    status: "Watched",
    rating: 5,
    dateAdded: "Mar 1, 2026",
  },
  {
    id: 2,
    title: "Breaking Bad",
    type: "TV Show",
    genre: "Drama",
    status: "Watching",
    rating: 4,
    dateAdded: "Mar 5, 2026",
  },
  {
    id: 3,
    title: "Dune: Part Two",
    type: "Movie",
    genre: "Sci-Fi",
    status: "Watched",
    rating: 4,
    dateAdded: "Mar 10, 2026",
  },
  {
    id: 4,
    title: "Severance",
    type: "TV Show",
    genre: "Thriller",
    status: "Watching",
    rating: 5,
    dateAdded: "Mar 14, 2026",
  },
  {
    id: 5,
    title: "Oppenheimer",
    type: "Movie",
    genre: "Drama",
    status: "Watched",
    rating: 4,
    dateAdded: "Mar 18, 2026",
  },
  {
    id: 6,
    title: "Arcane",
    type: "TV Show",
    genre: "Animation",
    status: "Want to watch",
    rating: null,
    dateAdded: "Mar 22, 2026",
  },
];

const TYPE_BADGE_CLASS = {
  Movie: "badge-movie",
  "TV Show": "badge-tv",
};

const STATUS_BADGE_CLASS = {
  Watched: "status-watched",
  Watching: "status-watching",
  "Want to watch": "status-want",
};

export default function CinemasList() {
  return (
    <section className="cinemas-list-wrapper">
      <div className="cinemas-list-container">
        {/* Header: title + sort */}
        <div className="cinemas-list-header">
          <h2 className="cinemas-list-title">Entries</h2>
          <div className="cinemas-sort-control">
            <span className="cinemas-sort-label">Sort:</span>
            <select className="cinemas-sort-select" name="sort">
              <option value="date-added">Date added</option>
              <option value="title-az">Title A–Z</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Filter pills */}
        <div className="cinemas-filters">
          <div className="cinemas-filter-group">
            <button type="button" className="cinemas-filter-btn is-active">
              All
            </button>
            <button type="button" className="cinemas-filter-btn">
              Movie
            </button>
            <button type="button" className="cinemas-filter-btn">
              TV Show
            </button>
          </div>
          <div className="cinemas-filter-divider" />
          <div className="cinemas-filter-group">
            <button type="button" className="cinemas-filter-btn is-active">
              All status
            </button>
            <button type="button" className="cinemas-filter-btn">
              Watched
            </button>
            <button type="button" className="cinemas-filter-btn">
              Watching
            </button>
            <button type="button" className="cinemas-filter-btn">
              Want to watch
            </button>
          </div>
          <button type="button" className="cinemas-reset-btn">
            Reset
          </button>
        </div>

        {/* Cards grid */}
        <div className="cinemas-cards">
          {SAMPLE_ENTRIES.map((entry) => (
            <div key={entry.id} className="cinema-card">
              <div className="cinema-card-top">
                <p className="cinema-card-title">{entry.title}</p>
                <div className="cinema-card-actions">
                  <button
                    type="button"
                    className="cinema-action-btn cinema-edit-btn"
                    aria-label="Edit entry"
                  >
                    ✎
                  </button>
                  <button
                    type="button"
                    className="cinema-action-btn cinema-delete-btn"
                    aria-label="Delete entry"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="cinema-card-tags">
                <span
                  className={`cinema-badge type-badge ${TYPE_BADGE_CLASS[entry.type] ?? ""}`}
                >
                  {entry.type}
                </span>
                <span
                  className={`cinema-badge status-badge ${STATUS_BADGE_CLASS[entry.status] ?? ""}`}
                >
                  {entry.status}
                </span>
                <span className="cinema-genre-text">{entry.genre}</span>
              </div>
              <div className="cinema-card-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`cinema-star ${entry.rating && star <= entry.rating ? "filled" : "empty"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="cinema-card-date">Added {entry.dateAdded}</p>
            </div>
          ))}

          {!SAMPLE_ENTRIES.length && (
            <p className="cinemas-empty-state">
              No entries yet. Add your first film above.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
