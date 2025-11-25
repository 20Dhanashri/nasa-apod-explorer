import { useState } from "react";
import { searchNasaLibrary } from "../api/nasaLibraryApi";

export default function NasaLibrarySection({ onSelectItem }) {
  const [query, setQuery] = useState("nebula");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      setLoading(true);
      setError("");
      const data = await searchNasaLibrary(query.trim(), 1);
      setResults(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load NASA image library results.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card dashboard-full">
      <div className="card-header">
        <div>
          <div className="small-label">NASA Image Library</div>
          <div className="card-title">Search Deep Space Imagery</div>
        </div>
      </div>

      <form
        onSubmit={handleSearch}
        style={{ display: "flex", gap: "0.6rem", marginBottom: "0.8rem" }}
      >
        <input
          type="text"
          className="input"
          placeholder="Search (e.g., nebula, galaxy, mars)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <div className="error-banner">{error}</div>}

      {!loading && results.length === 0 && !error && (
        <p className="small-label">No results yet. Try searching for a term.</p>
      )}

      {results.length > 0 && (
        <div className="gallery-grid nasa-grid">
          {results.map((item) => (
            <div
              key={item.nasa_id}
              className="gallery-card nasa-card"
              onClick={() => onSelectItem(item)}
            >
              <img src={item.url} alt={item.title} />
              <div className="gallery-card-body">
                <div className="gallery-title">{item.title}</div>
                <div className="gallery-date">
                  {item.date || "Unknown date"} · NASA Library
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
