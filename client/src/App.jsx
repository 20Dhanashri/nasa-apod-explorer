import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import TodaySection from "./components/TodaySection";
import DatePickerSection from "./components/DatePickerSection";
import GallerySection from "./components/GallerySection";
import ImageModal from "./components/ImageModal";
import StatsWidgets from "./components/StatsWidgets";
import NasaLibrarySection from "./components/NasaLibrarySection";
import {
  fetchTodayApod,
  fetchApodByDate,
  fetchRecentApods
} from "./api/apodApi";

export default function App() {
  const [todayApod, setTodayApod] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [selectedApod, setSelectedApod] = useState(null);

  const [loadingToday, setLoadingToday] = useState(false);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [loadingDate, setLoadingDate] = useState(false);

  const [errorToday, setErrorToday] = useState("");
  const [errorGallery, setErrorGallery] = useState("");

  const [theme, setTheme] = useState("light");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadToday();
    loadGallery();
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("theme-dark");
    } else {
      document.body.classList.remove("theme-dark");
    }
  }, [theme]);

  async function loadToday() {
    try {
      setLoadingToday(true);
      setErrorToday("");
      const data = await fetchTodayApod();
      setTodayApod(data);
    } catch (err) {
      setErrorToday("Failed to load today's APOD.");
      console.error(err);
    } finally {
      setLoadingToday(false);
    }
  }

  async function loadGallery() {
    try {
      setLoadingGallery(true);
      setErrorGallery("");
      const data = await fetchRecentApods(10);
      setGallery(data);
    } catch (err) {
      setErrorGallery("Failed to load recent APOD gallery.");
      console.error(err);
    } finally {
      setLoadingGallery(false);
    }
  }

  async function handleSelectDate(date) {
    try {
      setLoadingDate(true);
      const apod = await fetchApodByDate(date);
      setSelectedApod(apod);
    } catch (err) {
      alert("Could not fetch APOD for that date.");
      console.error(err);
    } finally {
      setLoadingDate(false);
    }
  }

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <Layout
      theme={theme}
      onToggleTheme={toggleTheme}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
    >
      <div className="dashboard-grid">
        {/* Today */}
        <TodaySection
          apod={todayApod}
          loading={loadingToday}
          error={errorToday}
          onClickImage={setSelectedApod}
        />

        {/* Date explorer panel */}
        <DatePickerSection
          onSelectDate={handleSelectDate}
          loading={loadingDate}
        />

        {/* Stats widgets */}
        <StatsWidgets items={gallery} theme={theme} />

        {/* APOD gallery with global search */}
        <GallerySection
          items={gallery}
          loading={loadingGallery}
          error={errorGallery}
          onSelectApod={setSelectedApod}
          searchTerm={searchTerm}
        />

        {/* NASA Image Library search */}
        <NasaLibrarySection onSelectItem={setSelectedApod} />
      </div>

      <ImageModal apod={selectedApod} onClose={() => setSelectedApod(null)} />
    </Layout>
  );
}
