import "./styles/cinemaForm.css";

export default function CinemaForm() {
  return (
    <section className="cinema-form-wrapper">
      <div className="cinema-form-container">
        <p className="cinema-form-heading">Add entry</p>
        <form className="cinema-form">
          <input
            className="cinema-form-input"
            type="text"
            placeholder="Title (e.g. Interstellar)"
            name="title"
          />
          <select className="cinema-form-select" name="type">
            <option value="movie">Movie</option>
            <option value="tv">TV Show</option>
          </select>
          <select className="cinema-form-select" name="genre">
            <option value="" disabled selected>
              Genre
            </option>
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="horror">Horror</option>
            <option value="sci-fi">Sci-Fi</option>
            <option value="thriller">Thriller</option>
            <option value="romance">Romance</option>
            <option value="animation">Animation</option>
            <option value="documentary">Documentary</option>
          </select>
          <select className="cinema-form-select" name="status">
            <option value="want-to-watch">Want to watch</option>
            <option value="watching">Watching</option>
            <option value="watched">Watched</option>
          </select>
          <button type="submit" className="cinema-form-btn">
            + Add
          </button>
        </form>
      </div>
    </section>
  );
}
