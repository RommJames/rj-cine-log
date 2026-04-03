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

export default function CinemasList({
  cinemas,
  onRemoveAll,
  onDeleteEntry,
  onEditEntry,
}) {
  const [modalEntry, setModalEntry] = useState(null);
  const [editEntry, setEditEntry] = useState(null);
  const [sortBy, setSortBy] = useState("date-added");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredAndSorted = [...cinemas]
    .filter((e) => filterType === "All" || e.type === filterType)
    .filter((e) => filterStatus === "All" || e.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === "title-az") return a.title.localeCompare(b.title);
      if (sortBy === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    });

  function openEditModal(entry) {
    setEditEntry(entry);
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
            <select
              className="cinemas-sort-select"
              name="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date-added">Date added</option>
              <option value="title-az">Title A–Z</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Filter pills */}
        <div className="cinemas-filters">
          <div className="cinemas-filter-group">
            {["All", "Movie", "TV Show"].map((type) => (
              <button
                key={type}
                type="button"
                className={`cinemas-filter-btn${filterType === type ? " is-active" : ""}`}
                onClick={() => setFilterType(type)}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="cinemas-filter-divider" />
          <div className="cinemas-filter-group">
            {["All", "Watched", "Watching", "Want to watch"].map((status) => (
              <button
                key={status}
                type="button"
                className={`cinemas-filter-btn${filterStatus === status ? " is-active" : ""}`}
                onClick={() => setFilterStatus(status)}
              >
                {status === "All" ? "All status" : status}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="cinemas-reset-btn"
            onClick={onRemoveAll}
          >
            Reset
          </button>
        </div>

        {/* Cards grid */}
        <div className="cinemas-cards">
          {filteredAndSorted.map((entry) => (
            <CinemaCard
              entry={entry}
              key={entry.id}
              setModalEntry={setModalEntry}
              openEditModal={openEditModal}
              onDeleteEntry={onDeleteEntry}
            />
          ))}

          {!cinemas.length && (
            <p className="cinemas-empty-state">
              No entries yet. Add your first film above.
            </p>
          )}
          {cinemas.length > 0 && !filteredAndSorted.length && (
            <p className="cinemas-empty-state">
              No entries match the current filters.
            </p>
          )}
        </div>
      </div>

      {/* Detail modal */}
      {modalEntry && (
        <DetailModal
          modalEntry={modalEntry}
          setModalEntry={setModalEntry}
          openEditModal={openEditModal}
        />
      )}
      {/* Edit modal */}
      {editEntry && (
        <EditEntryModal
          key={editEntry.id}
          closeEditModal={closeEditModal}
          editEntry={editEntry}
          onEditEntry={onEditEntry}
        />
      )}
    </section>
  );
}

function CinemaCard({ entry, setModalEntry, openEditModal, onDeleteEntry }) {
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
            onClick={() => onDeleteEntry(entry.id)}
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

function DetailModal({ modalEntry, setModalEntry, openEditModal }) {
  return (
    <div className="cinema-modal-overlay" onClick={() => setModalEntry(null)}>
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
            <p className="cinema-modal-comment-text">{modalEntry.comment}</p>
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
  );
}

function EditEntryModal({ closeEditModal, editEntry, onEditEntry }) {
  const [editForm, setEditForm] = useState(editEntry);
  const [editStatus, setEditStatus] = useState(editEntry.status);
  const [editRating, setEditRating] = useState(editEntry.rating ?? null);
  const [editHoverRating, setEditHoverRating] = useState(0);
  const [errors, setErrors] = useState({});

  const isEditWatched = editStatus === "Watched";

  function handleEditSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    if (!editForm.title.trim()) newErrors.title = "Title is required.";
    if (isEditWatched && !editRating)
      newErrors.rating = "Please select a rating.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onEditEntry(editEntry.id, editForm);
    closeEditModal();
  }

  function handleInputChange(e) {
    setEditForm((entry) => ({
      ...entry,
      [e.target.name]: e.target.value,
    }));
  }

  function handleStarRating(star) {
    setEditRating(star);
    setEditForm((entry) => ({ ...entry, rating: star }));
    if (errors.rating) setErrors((prev) => ({ ...prev, rating: "" }));
  }

  return (
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

        <form className="cinema-edit-form" onSubmit={handleEditSubmit}>
          <input
            className={`cinema-edit-input${errors.title ? " cinema-edit-input--error" : ""}`}
            type="text"
            name="title"
            value={editForm.title || ""}
            placeholder="Title"
            onChange={(e) => {
              handleInputChange(e);
              if (errors.title) setErrors((prev) => ({ ...prev, title: "" }));
            }}
          />
          {errors.title && (
            <span className="cinema-form-error">{errors.title}</span>
          )}

          <div className="cinema-edit-selects">
            <select
              className="cinema-edit-select"
              name="type"
              value={editForm.type || ""}
              onChange={handleInputChange}
            >
              <option value="Movie">Movie</option>
              <option value="TV Show">TV Show</option>
            </select>
            <select
              className="cinema-edit-select"
              name="genre"
              value={editForm.genre || ""}
              onChange={handleInputChange}
            >
              <option value="Action">Action</option>
              <option value="Animation">Animation</option>
              <option value="Comedy">Comedy</option>
              <option value="Documentary">Documentary</option>
              <option value="Drama">Drama</option>
              <option value="Horror">Horror</option>
              <option value="Romance">Romance</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Thriller">Thriller</option>
            </select>
            <select
              className="cinema-edit-select"
              name="status"
              value={editStatus}
              onChange={(e) => {
                const newStatus = e.target.value;
                setEditStatus(newStatus);
                setEditRating(null);
                setEditForm((entry) => ({
                  ...entry,
                  status: newStatus,
                  rating: null,
                  comment: newStatus === "Watched" ? entry.comment : null,
                }));
              }}
            >
              <option value="Want to watch">Want to watch</option>
              <option value="Watching">Watching</option>
              <option value="Watched">Watched</option>
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
                        star <= (editHoverRating || editRating) ? "active" : ""
                      }`}
                      onClick={() => handleStarRating(star)}
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
                {errors.rating && (
                  <span className="cinema-form-error">{errors.rating}</span>
                )}
              </div>
              <div className="cinema-edit-comment">
                <span className="cinema-edit-field-label">Your thoughts</span>
                <textarea
                  className="cinema-edit-textarea"
                  name="comment"
                  value={editForm.comment || ""}
                  placeholder="What did you think? (optional)"
                  rows={3}
                  onChange={handleInputChange}
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
  );
}
