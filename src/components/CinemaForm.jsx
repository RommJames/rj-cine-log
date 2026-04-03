import { useState } from "react";
import "./styles/cinemaForm.css";

export default function CinemaForm() {
  const [status, setStatus] = useState("want-to-watch");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const isWatched = status === "watched";

  return (
    <section className="cinema-form-wrapper">
      <div className="cinema-form-container">
        <p className="cinema-form-heading">Add entry</p>
        <form className="cinema-form">
          <div className="cinema-form-row">
            <input
              className="cinema-form-input"
              type="text"
              placeholder="Title (e.g. Interstellar)"
              name="title"
            />
            <select className="cinema-form-select" name="type">
              <option value="movie">Movie</option>
              <option value="tv">TV Show</option>
            </select>
            <select className="cinema-form-select" name="genre">
              <option value="" disabled>
                Genre
              </option>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="drama">Drama</option>
              <option value="horror">Horror</option>
              <option value="sci-fi">Sci-Fi</option>
              <option value="thriller">Thriller</option>
              <option value="romance">Romance</option>
              <option value="animation">Animation</option>
              <option value="documentary">Documentary</option>
            </select>
            <select
              className="cinema-form-select"
              name="status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setRating(0);
              }}
            >
              <option value="want-to-watch">Want to watch</option>
              <option value="watching">Watching</option>
              <option value="watched">Watched</option>
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
                      onClick={() => setRating(star)}
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
              </div>
              <div className="cinema-form-comment">
                <span className="cinema-form-field-label">Your thoughts</span>
                <textarea
                  className="cinema-form-textarea"
                  name="comment"
                  placeholder="What did you think? (optional)"
                  rows={2}
                />
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
