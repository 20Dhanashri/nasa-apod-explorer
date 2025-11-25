export default function StatsWidgets({ items, theme }) {
  const total = items.length;
  const images = items.filter((i) => i.media_type === "image").length;
  const videos = items.filter((i) => i.media_type === "video").length;
  const uniqueAuthors = new Set(
    items
      .map((i) => i.copyright)
      .filter(Boolean)
  ).size;

  return (
    <section className="dashboard-full stats-grid">
      <div className="card stat-card">
        <div className="stat-label">Total APODs (window)</div>
        <div className="stat-value">{total}</div>
        <div className="stat-sub">From recent gallery</div>
      </div>

      <div className="card stat-card">
        <div className="stat-label">Images vs Videos</div>
        <div className="stat-value">
          {images} <span className="stat-small">img</span> ·{" "}
          {videos} <span className="stat-small">vid</span>
        </div>
        <div className="stat-sub">Media type distribution</div>
      </div>

      <div className="card stat-card">
        <div className="stat-label">Unique Contributors</div>
        <div className="stat-value">{uniqueAuthors}</div>
        <div className="stat-sub">Photographers / teams</div>
      </div>
    </section>
  );
}
