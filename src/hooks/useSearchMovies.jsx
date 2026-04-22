import { useEffect, useState } from "react";

export function useSearchMovies(query) {
  const [searchMovies, setSearchMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setSearchError("");
          setIsSearching(true);

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${query}`,
            { signal: controller.signal },
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found");

          console.log(data);
          setSearchMovies(data.Search);
          setSearchError("");
        } catch (error) {
          if (error.name !== "AbortError") {
            console.log(error.message);
            setSearchError(error.message);
          }
        } finally {
          setIsSearching(false);
        }
      }

      if (query.length < 3) {
        setSearchMovies([]);
        setSearchError("");
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query],
  );

  return { searchMovies, isSearching, searchError };
}
