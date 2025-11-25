export default function ApodCard({ apod, onClickImage }) {
  if (!apod) return null;

  const isImage = apod.media_type === "image";

  return (
    <div>
      <div className="card-header">
        <div>
          <div className="small-label">Today’s Selection</div>
          <div className="card-title">{apod.title}</div>
        </div>
        <div className="small-label">{apod.date}</div>
      </div>

      {isImage ? (
        <img
          src={apod.url}
          alt={apod.title}
          className="apod-main-image"
          onClick={() => onClickImage(apod)}
        />
      ) : (
        <button className="btn" onClick={() => window.open(apod.url, "_blank")}>
          Open Video in New Tab
        </button>
      )}

      <div className="apod-meta-row">
        <span className="chip">
          <span>Type:</span>
          <strong>{apod.media_type.toUpperCase()}</strong>
        </span>
        {apod.copyright && (
          <span className="chip">
            <span>©</span>
            <span>{apod.copyright}</span>
          </span>
        )}
        {apod.hdurl && <span className="chip">HD Available</span>}
      </div>

      <p style={{ marginTop: "0.9rem", fontSize: "0.9rem", lineHeight: 1.6 }}>
        {apod.explanation}
      </p>
    </div>
  );
}
