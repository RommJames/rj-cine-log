import rjlogo from "./../assets/rj-logo.png";
import "./styles/header.css";

export default function Header() {
  return (
    <header>
      <div className="header-left">
        <img src={rjlogo} alt="RJ CineLog logo" />
        <div className="web-app-title">
          <h1>RJ CineLog</h1>
          <p className="web-app-subtitle">Movie &amp; TV Show Tracker</p>
        </div>
      </div>
      <div className="header-right">
        <p className="watchlist-title">My Watchlist</p>
      </div>
    </header>
  );
}
