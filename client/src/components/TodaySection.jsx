import ApodCard from "./ApodCard";

export default function TodaySection({ apod, loading, error, onClickImage }) {
  return (
    <section className="card dashboard-full">
      {error && <div className="error-banner">{error}</div>}

      {loading && <p className="small-label">Fetching today’s APOD…</p>}

      {!loading && !error && apod && (
        <ApodCard apod={apod} onClickImage={onClickImage} />
      )}
    </section>
  );
}
