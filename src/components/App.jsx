import { useState } from "react";
import Header from "./Header";
import WatchSummary from "./WatchSummary";
import CinemaForm from "./CinemaForm";
import CinemasList from "./CinemasList";

function App() {
  return (
    <>
      <Header />
      <WatchSummary />
      <CinemaForm />
      <CinemasList />
    </>
  );
}

export default App;
