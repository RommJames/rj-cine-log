import { useEffect, useState } from "react";

export function useSearchMovies(query) {
  const [searchMovies, setSearchMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      let ignore = false;

      async function fetchMovies() {
        try {
          setSearchError("");
          setIsSearching(true);

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${encodeURIComponent(query.trim())}`,
            { signal: controller.signal },
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();

          if (data.Response === "False")
            throw new Error(data.Error || "Movie not found");

          if (!ignore) {
            setSearchMovies(data.Search);
            setSearchError("");
          }
        } catch (error) {
          if (!ignore && error.name !== "AbortError") {
            setSearchError(error.message);
          }
        } finally {
          if (!ignore) setIsSearching(false);
        }
      }

      if (query.trim().length < 3) {
        setSearchMovies([]);
        setSearchError("");
        setIsSearching(false);
        return;
      }

      const timeoutId = setTimeout(() => {
        fetchMovies();
      }, 400);

      return function () {
        ignore = true;
        clearTimeout(timeoutId);
        controller.abort();
      };
    },
    [query],
  );

  return { searchMovies, isSearching, searchError };
}
