import { useState } from "react";
import Header from "./Header";
import WatchSummary from "./WatchSummary";
import CinemaForm from "./CinemaForm";
import CinemasList from "./CinemasList";

const SAMPLE_ENTRIES = [
  {
    id: 1,
    title: "Interstellar",
    type: "Movie",
    genre: "Sci-Fi",
    status: "Watched",
    rating: 5,
    dateAdded: "Mar 1, 2026",
    comment:
      "A breathtaking journey through space and time. Nolan at his finest — the docking scene alone is worth the watch.",
  },
  {
    id: 2,
    title: "Breaking Bad",
    type: "TV Show",
    genre: "Drama",
    status: "Watching",
    rating: 4,
    dateAdded: "Mar 5, 2026",
    comment: null,
  },
  {
    id: 3,
    title: "Dune: Part Two",
    type: "Movie",
    genre: "Sci-Fi",
    status: "Watched",
    rating: 4,
    dateAdded: "Mar 10, 2026",
    comment:
      "Visually stunning. The desert cinematography is unlike anything I've seen. Chalamet carries the weight of the role perfectly.",
  },
  {
    id: 4,
    title: "Severance",
    type: "TV Show",
    genre: "Thriller",
    status: "Watching",
    rating: 5,
    dateAdded: "Mar 14, 2026",
    comment: null,
  },
  {
    id: 5,
    title: "Oppenheimer",
    type: "Movie",
    genre: "Drama",
    status: "Watched",
    rating: 4,
    dateAdded: "Mar 18, 2026",
    comment:
      "Dense but rewarding. Cillian Murphy is phenomenal. The Trinity test sequence is haunting.",
  },
  {
    id: 6,
    title: "Arcane",
    type: "TV Show",
    genre: "Animation",
    status: "Want to watch",
    rating: null,
    dateAdded: "Mar 22, 2026",
    comment: null,
  },
];

function App() {
  const [cinemas, setCinemas] = useState(SAMPLE_ENTRIES);

  function handleAddCinemas(addItems) {
    setCinemas([addItems, ...cinemas]);
  }

  function handleRemoveAll() {
    if (window.confirm("Clear all entries? This cannot be undone.")) {
      setCinemas([]);
    }
  }
  function handleDeleteEntry(id) {
    setCinemas(cinemas.filter((cinema) => cinema.id !== id));
  }

  function handleEditEntry(id, updatedEntry) {
    setCinemas((curr) =>
      curr.map((current) => (current.id === id ? updatedEntry : current)),
    );
  }
  return (
    <>
      <Header />
      <WatchSummary cinemas={cinemas} />
      <CinemaForm onAddCinemas={handleAddCinemas} />
      <CinemasList
        cinemas={cinemas}
        onRemoveAll={handleRemoveAll}
        onDeleteEntry={handleDeleteEntry}
        onEditEntry={handleEditEntry}
      />
    </>
  );
}

export default App;
