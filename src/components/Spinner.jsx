export default function Spinner() {
  return (
    <span className="cinema-form-input-spinner" role="status" aria-live="polite">
      <span className="cinema-form-spinner" aria-hidden="true" />
      <span
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        Searching...
      </span>
    </span>
  );
}
