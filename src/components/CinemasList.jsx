import { useState } from "react";
import "./styles/cinemasList.css";

const TYPE_BADGE_CLASS = {
  Movie: "badge-movie",
  "TV Show": "badge-tv",
};

const STATUS_BADGE_CLASS = {
  Watched: "status-watched",
  Watching: "status-watching",
  "Want to watch": "status-want",
};

export default function CinemasList({ cinemas }) {
  const [modalEntry, setModalEntry] = useState(null);
  const [editEntry, setEditEntry] = useState(null);
  const [editStatus, setEditStatus] = useState("want-to-watch");
  const [editRating, setEditRating] = useState(0);
  const [editHoverRating, setEditHoverRating] = useState(0);

  const isEditWatched = editStatus === "watched";

  function openEditModal(entry) {
    const statusMap = {
      Watched: "watched",
      Watching: "watching",
      "Want to watch": "want-to-watch",
    };
    setEditEntry(entry);
    setEditStatus(statusMap[entry.status] ?? "want-to-watch");
    setEditRating(entry.rating ?? 0);
    setEditHoverRating(0);
  }

  function closeEditModal() {
    setEditEntry(null);
  }

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
          {cinemas.map((entry) => (
            <CinemaCard
              entry={entry}
              key={entry.id}
              setModalEntry={setModalEntry}
              openEditModal={openEditModal}
            />
          ))}

          {!cinemas.length && (
            <p className="cinemas-empty-state">
              No entries yet. Add your first film above.
            </p>
          )}
        </div>
      </div>

      {/* Detail modal */}
      {modalEntry && (
        <div
          className="cinema-modal-overlay"
          onClick={() => setModalEntry(null)}
        >
          <div className="cinema-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cinema-modal-header">
              <h2 className="cinema-modal-title">{modalEntry.title}</h2>
              <button
                type="button"
                className="cinema-modal-close"
                onClick={() => setModalEntry(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="cinema-modal-tags">
              <span
                className={`cinema-badge type-badge ${TYPE_BADGE_CLASS[modalEntry.type] ?? ""}`}
              >
                {modalEntry.type}
              </span>
              <span
                className={`cinema-badge status-badge ${STATUS_BADGE_CLASS[modalEntry.status] ?? ""}`}
              >
                {modalEntry.status}
              </span>
              <span className="cinema-genre-text">{modalEntry.genre}</span>
            </div>
            {modalEntry.rating && (
              <div className="cinema-modal-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`cinema-star ${star <= modalEntry.rating ? "filled" : "empty"}`}
                  >
                    ★
                  </span>
                ))}
                <span className="cinema-modal-rating-label">
                  {modalEntry.rating}.0 / 5
                </span>
              </div>
            )}
            <p className="cinema-modal-date">Added {modalEntry.dateAdded}</p>
            {modalEntry.status === "Watched" && modalEntry.comment && (
              <div className="cinema-modal-comment">
                <p className="cinema-modal-comment-label">Thoughts</p>
                <p className="cinema-modal-comment-text">
                  {modalEntry.comment}
                </p>
              </div>
            )}
            {modalEntry.status === "Watched" && !modalEntry.comment && (
              <p className="cinema-modal-no-comment">
                No thoughts added for this entry.
              </p>
            )}
            <div className="cinema-modal-footer">
              <button
                type="button"
                className="cinema-modal-edit-btn"
                onClick={() => {
                  setModalEntry(null);
                  openEditModal(modalEntry);
                }}
                aria-label="Edit entry"
              >
                ✎ Edit Entry
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Edit modal */}
      {editEntry && (
        <div className="cinema-modal-overlay" onClick={closeEditModal}>
          <div
            className="cinema-modal cinema-edit-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cinema-modal-header">
              <h2 className="cinema-modal-title">Edit Entry</h2>
              <button
                type="button"
                className="cinema-modal-close"
                onClick={closeEditModal}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form className="cinema-edit-form">
              <input
                className="cinema-edit-input"
                type="text"
                name="title"
                defaultValue={editEntry.title}
                placeholder="Title"
              />

              <div className="cinema-edit-selects">
                <select
                  className="cinema-edit-select"
                  name="type"
                  defaultValue={editEntry.type === "TV Show" ? "tv" : "movie"}
                >
                  <option value="movie">Movie</option>
                  <option value="tv">TV Show</option>
                </select>
                <select
                  className="cinema-edit-select"
                  name="genre"
                  defaultValue={editEntry.genre.toLowerCase()}
                >
                  <option value="action">Action</option>
                  <option value="animation">Animation</option>
                  <option value="comedy">Comedy</option>
                  <option value="documentary">Documentary</option>
                  <option value="drama">Drama</option>
                  <option value="horror">Horror</option>
                  <option value="romance">Romance</option>
                  <option value="sci-fi">Sci-Fi</option>
                  <option value="thriller">Thriller</option>
                </select>
                <select
                  className="cinema-edit-select"
                  name="status"
                  value={editStatus}
                  onChange={(e) => {
                    setEditStatus(e.target.value);
                    setEditRating(0);
                  }}
                >
                  <option value="want-to-watch">Want to watch</option>
                  <option value="watching">Watching</option>
                  <option value="watched">Watched</option>
                </select>
              </div>

              {isEditWatched && (
                <div className="cinema-edit-watched-section">
                  <div className="cinema-edit-rating">
                    <span className="cinema-edit-field-label">Your rating</span>
                    <div className="cinema-edit-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`cinema-edit-star ${
                            star <= (editHoverRating || editRating)
                              ? "active"
                              : ""
                          }`}
                          onClick={() => setEditRating(star)}
                          onMouseEnter={() => setEditHoverRating(star)}
                          onMouseLeave={() => setEditHoverRating(0)}
                          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                        >
                          ★
                        </button>
                      ))}
                      {editRating > 0 && (
                        <span className="cinema-edit-rating-label">
                          {editRating}.0
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="cinema-edit-comment">
                    <span className="cinema-edit-field-label">
                      Your thoughts
                    </span>
                    <textarea
                      className="cinema-edit-textarea"
                      name="comment"
                      defaultValue={editEntry.comment ?? ""}
                      placeholder="What did you think? (optional)"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              <div className="cinema-edit-actions">
                <button
                  type="button"
                  className="cinema-edit-cancel-btn"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>
                <button type="submit" className="cinema-edit-save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

function CinemaCard({ entry, setModalEntry, openEditModal }) {
  return (
    <div className="cinema-card">
      <div className="cinema-card-top">
        <button
          type="button"
          className="cinema-card-title-btn"
          onClick={() => setModalEntry(entry)}
        >
          {entry.title}
        </button>
        <div className="cinema-card-actions">
          <button
            type="button"
            className="cinema-action-btn cinema-edit-btn"
            onClick={() => openEditModal(entry)}
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
  );
}
