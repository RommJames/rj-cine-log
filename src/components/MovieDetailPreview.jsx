function formatMovieType(type) {
  if (!type) return "";
  if (type === "series") return "TV Show";
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default function MovieDetailPreview({
  movieDetail,
  isLoading,
  movieDetailError,
}) {
  if (isLoading) {
    return (
      <div className="cinema-form-movie-detail cinema-form-movie-detail--loading">
        <span className="cinema-form-movie-detail-spinner" />
        <span className="cinema-form-movie-detail-loading-text">
          Loading movie details...
        </span>
      </div>
    );
  }

  if (movieDetailError) {
    return (
      <div className="cinema-form-movie-detail cinema-form-movie-detail--error">
        <span className="cinema-form-movie-detail-error-icon">!</span>
        <span className="cinema-form-movie-detail-error-text">
          {movieDetailError}
        </span>
      </div>
    );
  }

  if (!movieDetail) return null;

  const {
    Title,
    Type,
    Poster,
    Year,
    Runtime,
    Genre,
    imdbRating,
    Director,
    Plot,
  } = movieDetail;

  const hasPoster = Poster && Poster !== "N/A";

  return (
    <div className="cinema-form-movie-detail">
      <div className="cinema-form-movie-detail-poster-wrap">
        {hasPoster ? (
          <img
            className="cinema-form-movie-detail-poster"
            src={Poster}
            alt={Title}
          />
        ) : (
          <div className="cinema-form-movie-detail-poster-fallback">
            No poster
          </div>
        )}
      </div>

      <div className="cinema-form-movie-detail-content">
        <div className="cinema-form-movie-detail-header">
          <h3 className="cinema-form-movie-detail-title">{Title}</h3>
          <span className="cinema-form-movie-detail-type">
            {formatMovieType(Type)}
          </span>
        </div>

        <div className="cinema-form-movie-detail-meta">
          {Year && Year !== "N/A" && (
            <span className="cinema-form-movie-detail-pill">{Year}</span>
          )}
          {Runtime && Runtime !== "N/A" && (
            <span className="cinema-form-movie-detail-pill">{Runtime}</span>
          )}
          {Genre && Genre !== "N/A" && (
            <span className="cinema-form-movie-detail-pill">{Genre}</span>
          )}
          {imdbRating && imdbRating !== "N/A" && (
            <span className="cinema-form-movie-detail-pill">
              IMDb {imdbRating}
            </span>
          )}
        </div>

        {Director && Director !== "N/A" && (
          <p className="cinema-form-movie-detail-director">
            Directed by {Director}
          </p>
        )}

        {Plot && Plot !== "N/A" && (
          <p className="cinema-form-movie-detail-plot">{Plot}</p>
        )}
      </div>
    </div>
  );
}
