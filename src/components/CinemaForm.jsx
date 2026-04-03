import { useState } from "react";
import "./styles/cinemaForm.css";

export default function CinemaForm({ onAddCinemas }) {
  const [title, setTitle] = useState("");
  const [cinemaType, setCinemaType] = useState("Movie");
  const [genre, setGenre] = useState("Action");
  const [status, setStatus] = useState("Want to watch");
  const [rating, setRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});

  const isWatched = status === "Watched";

  function handleOnSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    if (isWatched && !rating) newErrors.rating = "Please select a rating.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newCinema = {
      id: crypto.randomUUID(),
      title,
      type: cinemaType,
      genre,
      status,
      rating,
      dateAdded: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      comment,
    };

    onAddCinemas(newCinema);

    setTitle("");
    setCinemaType("Movie");
    setGenre("Action");
    setStatus("Want to watch");
    setRating(null);
    setComment("");
    setErrors({});
  }

  return (
    <section className="cinema-form-wrapper">
      <div className="cinema-form-container">
        <p className="cinema-form-heading">Add entry</p>
        <form className="cinema-form" onSubmit={handleOnSubmit}>
          <div className="cinema-form-row">
            <div className="cinema-form-field">
              <input
                className={`cinema-form-input${errors.title ? " cinema-form-input--error" : ""}`}
                type="text"
                placeholder="Title (e.g. Interstellar)"
                name="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title)
                    setErrors((prev) => ({ ...prev, title: "" }));
                }}
              />
              {errors.title && (
                <span className="cinema-form-error">{errors.title}</span>
              )}
            </div>
            <select
              className="cinema-form-select"
              name="type"
              value={cinemaType}
              onChange={(e) => setCinemaType(e.target.value)}
            >
              <option value="Movie">Movie</option>
              <option value="TV Show">TV Show</option>
            </select>
            <select
              className="cinema-form-select"
              name="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="" disabled>
                Genre
              </option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Horror">Horror</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Thriller">Thriller</option>
              <option value="Romance">Romance</option>
              <option value="Animation">Animation</option>
              <option value="Documentary">Documentary</option>
            </select>
            <select
              className="cinema-form-select"
              name="status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setRating(null);
              }}
            >
              <option value="Want to watch">Want to watch</option>
              <option value="Watching">Watching</option>
              <option value="Watched">Watched</option>
            </select>
            <button type="submit" className="cinema-form-btn">
              + Add
            </button>
          </div>

          {isWatched && (
            <div className="cinema-form-watched-row">
              <div className="cinema-form-rating">
                <span className="cinema-form-field-label">Your rating</span>
                <div className="cinema-form-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`cinema-form-star ${
                        star <= (hoverRating || rating) ? "active" : ""
                      }`}
                      onClick={() => {
                        setRating(star);
                        if (errors.rating)
                          setErrors((prev) => ({ ...prev, rating: "" }));
                      }}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                    >
                      ★
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="cinema-form-rating-label">{rating}.0</span>
                  )}
                </div>
                {errors.rating && (
                  <span className="cinema-form-error">{errors.rating}</span>
                )}
              </div>
              <div className="cinema-form-comment">
                <span className="cinema-form-field-label">Your thoughts</span>
                <textarea
                  className="cinema-form-textarea"
                  name="comment"
                  placeholder="What did you think? (optional)"
                  rows={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
