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

      async function fetchMovieDetail() {
        try {
          setMovieDetailError("");
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

          setMovieDetail(data);
          setMovieDetailError("");
        } catch (error) {
          if (error.name !== "AbortError") {
            setMovieDetail(null);
            setMovieDetailError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      fetchMovieDetail();

      return function () {
        controller.abort();
      };
    },
    [selectedId],
  );

  return { movieDetail, isLoading, movieDetailError };
}
