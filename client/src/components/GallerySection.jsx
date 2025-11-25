export default function GallerySection({ items, loading, error, onSelectApod, searchTerm }) {
  const filtered = items.filter((apod) => {
    if (!searchTerm) return true;
    const haystack = `${apod.title} ${apod.explanation}`.toLowerCase();
    return haystack.includes(searchTerm.toLowerCase());
  });

  return (
    <section className="card dashboard-full">
      <div className="card-header">
        <div>
          <div className="small-label">Mission Log</div>
          <div className="card-title">Recent APOD Gallery</div>
        </div>
        <div className="card-subtitle">
          Showing {filtered.length} of {items.length} items
        </div>
      </div>

      {loading && <p className="small-label">Loading recent APODs…</p>}
      {error && <div className="error-banner">{error}</div>}

      {!loading && !error && (
        <div className="gallery-grid">
          {filtered.map((apod) => (
            <div
              key={apod.date}
              className="gallery-card gallery-card-animated"
              onClick={() => onSelectApod(apod)}
            >
              {apod.media_type === "image" ? (
                <img src={apod.url} alt={apod.title} />
              ) : (
                <div
                  style={{
                    height: 140,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.8rem"
                  }}
                >
                  🎬 Video APOD
                </div>
              )}
              <div className="gallery-card-body">
                <div className="gallery-title">{apod.title}</div>
                <div className="gallery-date">{apod.date}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
