import { useState } from "react";
import "./styles/cinemaForm.css";
import { useSearchMovies } from "../hooks/useSearchMovies";
import SearchMovieList from "./SearchMovieList";
import SearchError from "./SearchError";
import Spinner from "./Spinner";
import { useMovieDetails } from "../hooks/useMovieDetails";
import MovieDetailPreview from "./MovieDetailPreview";
import { DEFAULT_GENRE, GENRE_OPTIONS } from "../constants/genres";

const FALLBACK_TYPE = "Movie";

function normalizeType(type) {
  return type === "series" ? "TV Show" : "Movie";
}

function getPrimaryGenre(movieGenres) {
  if (!movieGenres) return DEFAULT_GENRE;

  const aliases = {
    "science fiction": "Sci-Fi",
  };

  const parsedGenres = movieGenres
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const matchedSupported = parsedGenres.find((item) => {
    const normalized = aliases[item.toLowerCase()] || item;
    return GENRE_OPTIONS.includes(normalized);
  });

  if (matchedSupported) {
    return aliases[matchedSupported.toLowerCase()] || matchedSupported;
  }

  return parsedGenres[0] || DEFAULT_GENRE;
}

function cleanMovieField(value) {
  if (!value || value === "N/A") return null;
  return value;
}

export default function CinemaForm({ onAddCinemas }) {
  const [title, setTitle] = useState("");
  const [cinemaType, setCinemaType] = useState(FALLBACK_TYPE);
  const [genre, setGenre] = useState(DEFAULT_GENRE);
  const [status, setStatus] = useState("Want to watch");
  const [rating, setRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedSearchMovieSummary, setSelectedSearchMovieSummary] =
    useState(null);

  const isMovieSelected = Boolean(selectedMovieId);
  const { movieDetail, isLoading, movieDetailError } =
    useMovieDetails(selectedMovieId);
  const hasLoadedMovieDetail = Boolean(
    selectedMovieId && movieDetail && !movieDetailError,
  );
  const isSearchSelectionLocked =
    Boolean(selectedMovieId) && (isLoading || hasLoadedMovieDetail);
  const { searchMovies, isSearching, searchError } = useSearchMovies(
    isMovieSelected ? "" : title,
  );
  const selectedSearchMovie =
    searchMovies.find((movie) => movie.imdbID === selectedMovieId) ||
    selectedSearchMovieSummary;
  const selectedTitle = isMovieSelected
    ? movieDetail?.Title || selectedSearchMovie?.Title || title
    : title;
  const selectedCinemaType =
    isMovieSelected && movieDetail?.Type
      ? normalizeType(movieDetail.Type)
      : cinemaType;
  const selectedGenre =
    isMovieSelected && movieDetail?.Genre
      ? getPrimaryGenre(movieDetail.Genre)
      : genre;
  const hasCustomGenreOption =
    isMovieSelected && selectedGenre && !GENRE_OPTIONS.includes(selectedGenre);
  const selectedPoster =
    cleanMovieField(movieDetail?.Poster) ||
    cleanMovieField(selectedSearchMovie?.Poster);

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

    const isSearchBasedEntry = hasLoadedMovieDetail;

    const newCinema = {
      id: crypto.randomUUID(),
      title: selectedTitle,
      type: selectedCinemaType,
      genre: selectedGenre,
      status,
      rating,
      poster: selectedPoster,
      imdbID: isSearchBasedEntry ? selectedMovieId : null,
      isSearchBased: isSearchBasedEntry,
      year:
        cleanMovieField(movieDetail?.Year) ||
        cleanMovieField(selectedSearchMovie?.Year),
      runtime: cleanMovieField(movieDetail?.Runtime),
      director: cleanMovieField(movieDetail?.Director),
      imdbRating: cleanMovieField(movieDetail?.imdbRating),
      plot: cleanMovieField(movieDetail?.Plot),
      dateAdded: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      comment,
    };

    onAddCinemas(newCinema);

    setTitle("");
    setCinemaType(FALLBACK_TYPE);
    setGenre(DEFAULT_GENRE);
    setStatus("Want to watch");
    setRating(null);
    setHoverRating(0);
    setComment("");
    setSelectedMovieId(null);
    setSelectedSearchMovieSummary(null);
    setErrors({});
  }

  function handleClickSearchMovie(selectedId) {
    setSelectedMovieId(selectedId);

    const selectedMovie = searchMovies.find(
      (movie) => movie.imdbID === selectedId,
    );

    if (selectedMovie) {
      setSelectedSearchMovieSummary(selectedMovie);
      setTitle(selectedMovie.Title);
      setCinemaType(normalizeType(selectedMovie.Type));
    }
  }

  function handleClearSelectedMovie() {
    setSelectedMovieId(null);
    setSelectedSearchMovieSummary(null);
    setCinemaType(FALLBACK_TYPE);
    setGenre(DEFAULT_GENRE);
    setTitle("");
  }

  return (
    <section className="cinema-form-wrapper">
      <div className="cinema-form-container">
        <p className="cinema-form-heading">Add entry</p>
        <form className="cinema-form" onSubmit={handleOnSubmit}>
          <div className="cinema-form-row">
            <div className="cinema-form-field">
              <input
                className={`cinema-form-input${errors.title ? " cinema-form-input--error" : ""}${isSearching && !isMovieSelected ? " cinema-form-input--loading" : ""}`}
                type="text"
                placeholder="Title (e.g. Interstellar)"
                name="title"
                value={title}
                disabled={isSearchSelectionLocked}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setSelectedMovieId(null);
                  setSelectedSearchMovieSummary(null);
                  if (errors.title)
                    setErrors((prev) => ({ ...prev, title: "" }));
                }}
              />
              {isSearching && !isMovieSelected && <Spinner />}
              {errors.title && (
                <span className="cinema-form-error">{errors.title}</span>
              )}
              {!isMovieSelected &&
                !isSearching &&
                !searchError &&
                searchMovies.length > 0 && (
                  <SearchMovieList
                    searchMovies={searchMovies}
                    onClickSearchMovie={handleClickSearchMovie}
                  />
                )}
              {!isMovieSelected && searchError && (
                <SearchError searchError={searchError} />
              )}
            </div>
            <select
              className="cinema-form-select"
              name="type"
              value={selectedCinemaType}
              disabled={isSearchSelectionLocked}
              onChange={(e) => setCinemaType(e.target.value)}
            >
              <option value="Movie">Movie</option>
              <option value="TV Show">TV Show</option>
            </select>
            <select
              className="cinema-form-select"
              name="genre"
              value={selectedGenre}
              disabled={isSearchSelectionLocked}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="" disabled>
                Genre
              </option>
              {hasCustomGenreOption && (
                <option value={selectedGenre}>{selectedGenre}</option>
              )}
              {GENRE_OPTIONS.map((supportedGenre) => (
                <option key={supportedGenre} value={supportedGenre}>
                  {supportedGenre}
                </option>
              ))}
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
            {isMovieSelected && (
              <button
                type="button"
                className="cinema-form-btn cinema-form-btn--subtle"
                onClick={handleClearSelectedMovie}
              >
                Clear selection
              </button>
            )}
            <button type="submit" className="cinema-form-btn">
              + Add
            </button>
          </div>

          <MovieDetailPreview
            movieDetail={movieDetail}
            isLoading={isLoading}
            movieDetailError={movieDetailError}
          />

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
