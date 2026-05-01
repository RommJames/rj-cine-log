import { useEffect, useState } from "react";

export function useMovieDetails(selectedId) {
  const [movieDetail, setMovieDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [movieDetailError, setMovieDetailError] = useState("");

  useEffect(
    function () {
      if (!selectedId) {
        setMovieDetail(null);
        setMovieDetailError("");
        setIsLoading(false);
        return;
      }

      const controller = new AbortController();
      let ignore = false;

      async function fetchMovieDetail() {
        try {
          setMovieDetailError("");
          setMovieDetail(null);
          setIsLoading(true);

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${selectedId}`,
            { signal: controller.signal },
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movie");

          const data = await res.json();

          if (data.Response === "False")
            throw new Error(data.Error || "Movie not found");

          if (!ignore) {
            setMovieDetail(data);
            setMovieDetailError("");
          }
        } catch (error) {
          if (!ignore && error.name !== "AbortError") {
            setMovieDetail(null);
            setMovieDetailError(error.message);
          }
        } finally {
          if (!ignore) setIsLoading(false);
        }
      }

      fetchMovieDetail();

      return function () {
        ignore = true;
        controller.abort();
      };
    },
    [selectedId],
  );

  return { movieDetail, isLoading, movieDetailError };
}
