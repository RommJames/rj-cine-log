export default function SearchError({ searchError }) {
  return (
    <div className="cinema-form-search-error">
      <span className="cinema-form-search-error-icon">⚠</span>
      <span className="cinema-form-search-error-text">{searchError}</span>
    </div>
  );
}
