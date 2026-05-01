import SearchMovie from "./SearchMovie";

export default function SearchMovieList({ searchMovies, onClickSearchMovie }) {
  return (
    <ul className="cinema-form-recommendations">
      {searchMovies?.map((rec) => (
        <SearchMovie
          key={rec.imdbID}
          rec={rec}
          onClickSearchMovie={onClickSearchMovie}
        />
      ))}
    </ul>
  );
}
