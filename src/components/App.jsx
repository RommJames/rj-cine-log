import Header from "./Header";
import WatchSummary from "./WatchSummary";
import CinemaForm from "./CinemaForm";
import CinemasList from "./CinemasList";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

function App() {
  const [cinemas, setCinemas] = useLocalStorageState([], "myWatchlist");

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
