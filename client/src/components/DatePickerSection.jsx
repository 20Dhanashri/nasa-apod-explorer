import { useState } from "react";

export default function DatePickerSection({ onSelectDate, loading }) {
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date) return;
    onSelectDate(date);
  };

  return (
    <section className="card">
      <div className="card-header">
        <div>
          <div className="small-label">Date Explorer</div>
          <div className="card-title">Browse Past APODs</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.6rem" }}>
        <label className="small-label" htmlFor="apod-date">
          Select a calendar date
        </label>
        <input
          id="apod-date"
          type="date"
          className="input"
          max={new Date().toISOString().slice(0, 10)}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Loading…" : "Load APOD for Date"}
        </button>
      </form>

      <p
        className="small-label"
        style={{ marginTop: "0.7rem", lineHeight: 1.4 }}
      >
        Tip: APOD archive starts from 16 June 1995.
      </p>
    </section>
  );
}
