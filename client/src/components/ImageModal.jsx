export default function ImageModal({ apod, onClose }) {
  if (!apod) return null;

  const isImage = apod.media_type === "image";
  const isLibrary = apod.source === "nasa-library";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* LEFT: IMAGE / VIDEO */}
        <div className="modal-image-wrapper">
          {isImage ? (
            <img
              src={apod.hdurl || apod.url}
              alt={apod.title}
              className="modal-image"
            />
          ) : (
            <button className="btn" onClick={() => window.open(apod.url, "_blank")}>
              Open APOD Video
            </button>
          )}
        </div>

        {/* RIGHT: DETAILS */}
        <div className="modal-details">
          <div className="modal-header-row">
            <div>
              <div className="small-label">
                {isLibrary ? "NASA Image Library" : "APOD Details"}
              </div>
              <h2 style={{ fontSize: "1rem", marginTop: "0.2rem" }}>
                {apod.title}
              </h2>
              <p className="small-label" style={{ marginTop: "0.15rem" }}>
                {apod.date}
              </p>
            </div>
            <button className="btn close-btn" onClick={onClose}>
              Close
            </button>
          </div>

          <dl className="meta-list">
            <dt>Media Type</dt>
            <dd>{apod.media_type}</dd>

            {apod.copyright && (
              <>
                <dt>Credits</dt>
                <dd>{apod.copyright}</dd>
              </>
            )}

            {apod.hdurl && (
              <>
                <dt>HD Resource</dt>
                <dd>
                  <a href={apod.hdurl} target="_blank" rel="noreferrer">
                    Open HD Image
                  </a>
                </dd>
              </>
            )}
          </dl>

          <div
            style={{
              marginTop: "0.4rem",
              fontSize: "0.88rem",
              lineHeight: 1.6
            }}
          >
            {apod.explanation}
          </div>
        </div>
      </div>
    </div>
  );
}
