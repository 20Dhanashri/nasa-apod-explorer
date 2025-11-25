export default function Layout({ children, theme, onToggleTheme, searchTerm, onSearchChange }) {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  return (
    <div className="app-shell">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-mark">AP</div>
          <div className="sidebar-logo-text">
            <span>APOD Control</span>
            <span className="sub">Mission Console</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-link active">
            <span className="label">Dashboard</span>
            <span className="badge status-live">LIVE</span>
          </div>
          <div className="sidebar-link">
            <span className="label">Date Explorer</span>
          </div>
          <div className="sidebar-link">
            <span className="label">Gallery</span>
          </div>
        </nav>

        <div className="sidebar-footer">Data: NASA APOD • Local demo</div>
      </aside>

      {/* MAIN PANEL */}
      <div className="main-panel">
        <header className="topbar">
          <div className="topbar-left">
            <span className="topbar-title">NASA APOD Mission Control</span>
            <span className="topbar-subtitle">
              Astronomy Picture of the Day • {today}
            </span>
          </div>

          <div className="topbar-right">
            <input
              type="text"
              className="topbar-search"
              placeholder="Search APOD titles & descriptions…"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <button className="topbar-pill theme-toggle" onClick={onToggleTheme}>
              Theme: {theme === "dark" ? "Dark" : "Light"}
            </button>
            <div className="topbar-pill status-pill status-live">
              Status: Operational
            </div>
            <div className="avatar" />
          </div>
        </header>

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
