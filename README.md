# 🎬 RJ Cine Log

A personal movie and TV show tracker built with React. Log everything you've watched, are currently watching, or plan to watch — with ratings, genres, poster previews, and your own thoughts. Powered by the OMDB API for real-time movie search and metadata.

🔗 [GitHub Repository](https://github.com/RommJames/rj-cine-log) &nbsp;|&nbsp; 🚀 [Live Demo](https://rj-cine-log.vercel.app/)

---

## 📖 About

**RJ Cine Log** is a clean, minimal watchlist app that lets you keep track of your cinema journey. Search for real movies and TV shows via the OMDB API, add them to your log, rate them on a 5-star scale, tag them with genres and watch statuses, and leave personal thoughts — all persisted in your browser's `localStorage` so your data survives page refreshes.

All entries are managed in-app with full support for adding, editing, deleting, filtering, and sorting — no sign-up or backend required.

---

## ✨ Features

- **OMDB Movie Search** — Search real movies and TV shows live via the OMDB API with loading indicators and error handling
- **Movie Detail Preview** — View poster images, director, plot, runtime, and metadata pills before adding an entry
- **Form Locking** — Title, type, and genre fields lock automatically when a movie is selected from search results
- **Add entries** — Log movies or TV shows with title, type, genre, and watch status
- **Watch statuses** — Track entries as _Want to Watch_, _Watching_, or _Watched_
- **Star ratings** — Rate watched titles from 1 to 5 stars
- **Personal thoughts** — Leave optional notes/reviews on watched entries
- **Edit & delete** — Update or remove any entry at any time via inline modals
- **Filter & sort** — Filter by type (Movie / TV Show) and status; sort by date added, title (A–Z), or rating
- **Watch summary** — At-a-glance stats showing total entries, watched count, and average rating
- **Persistent storage** — Watchlist is saved to `localStorage` and restored across sessions
- **Responsive UI** — Works across desktop and mobile screen sizes

---

## 🛠️ Technologies Used

| Technology                                               | Purpose                                                 |
| -------------------------------------------------------- | ------------------------------------------------------- |
| [React 19](https://react.dev/)                           | UI library & component architecture                     |
| [Vite 8](https://vite.dev/)                              | Build tool & dev server with HMR                        |
| [React Compiler](https://react.dev/learn/react-compiler) | Automatic memoisation & performance optimisation        |
| [ESLint 9](https://eslint.org/)                          | Code linting (with React Hooks & React Refresh plugins) |
| [Babel](https://babeljs.io/)                             | JavaScript transpilation via `@rolldown/plugin-babel`   |
| [OMDB API](https://www.omdbapi.com/)                     | Movie & TV show search and metadata                     |
| CSS Modules (vanilla CSS)                                | Component-scoped styling                                |
| `localStorage`                                           | Client-side data persistence                            |
| [Vercel](https://vercel.com/)                            | Deployment & hosting                                    |

---

## 🗂️ Project Structure

```
rj-cine-log/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── styles/                # Component-scoped CSS files
│   │   ├── App.jsx                # Root component & state management
│   │   ├── Header.jsx             # App header / branding
│   │   ├── WatchSummary.jsx       # Stats bar (total, watched, avg rating)
│   │   ├── CinemaForm.jsx         # Add new entry form with movie search integration
│   │   ├── CinemasList.jsx        # Entry cards, filters, sort, modals
│   │   ├── SearchMovie.jsx        # Search input component
│   │   ├── SearchMovieList.jsx    # Search results dropdown list
│   │   ├── SearchError.jsx        # Search error display
│   │   ├── MovieDetailPreview.jsx # Poster & metadata preview for selected movie
│   │   └── Spinner.jsx            # Loading spinner
│   ├── hooks/
│   │   ├── useLocalStorageState.jsx  # Persists state to localStorage
│   │   ├── useSearchMovies.jsx       # OMDB search with abort & error handling
│   │   └── useMovieDetails.jsx       # Fetches full movie metadata by ID
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm
- An [OMDB API key](https://www.omdbapi.com/apikey.aspx) (free tier available)

### Installation

```bash
# Clone the repository
git clone https://github.com/RommJames/rj-cine-log.git
cd rj-cine-log

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
