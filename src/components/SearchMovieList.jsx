import SearchMovie from "./SearchMovie";

export default function SearchMovieList({ searchMovies }) {
  return (
    <ul className="cinema-form-recommendations">
      {searchMovies?.map((rec) => (
        <SearchMovie rec={rec} />
      ))}
    </ul>
  );
}
