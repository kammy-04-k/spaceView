import React, { useEffect, useState } from "react";
import HeroCard from "../../components/HeroCard/HeroCard";
import ParamCard from "../../components/ParamCard/ParamCard";
import { fetchApod, fetchMultipleApod } from "../../services/ApodServices";
import type { ApodResponse } from "../../services/ApodServices";
import "./Home.css";

const Home: React.FC = () => {
  const [photo, setPhoto] = useState<ApodResponse | null>(null);
  const [multiplePhotos, setMultiplePhotos] = useState<ApodResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {
   multiplePhotos.forEach((photo) => {
    if (photo.media_type === "image") {
      const img = new Image();
      img.src = photo.url;
    }
  });
}, [multiplePhotos]);

useEffect(() => {
   loadPhoto();
}, []); 


const loadPhoto = async (date?: string) => {
  setLoading(true);
  try {
    const photo = await fetchApod(date);

    //   make sure it’s an image
    if (!photo || photo.media_type !== "image") {
      setError("No image available for this date");
      setPhoto(null);
      setMultiplePhotos([]); // clear out any previous images
      return;
    }

    setPhoto(photo);
    setMultiplePhotos([]);
    setError(null);
  } catch (err: any) {
    console.error(err);
    setError(err.message || "Unknown error");
  } finally {
    setLoading(false);
  }
};


  const loadMultiplePhotos = async (count: number) => {
    setLoading(true);
    try {
      const photos = await fetchMultipleApod(count);
      console.log("Fetched photos:", photos);
      setMultiplePhotos(photos);
      setPhoto(null);
      setCurrentIndex(0);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch multiple photos");
    } finally {
      setLoading(false);
    }
  };

  const nextPhoto = () => {
    if (currentIndex < multiplePhotos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevPhoto = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <main className="hero-main">
      {loading ? (
        <p className="loading-text">Loading NASA photo(s)...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : multiplePhotos.length > 0 ? (
        <div className="hero-card-wrapper">
          {multiplePhotos[currentIndex].media_type === "image" ? (
            <>
              <HeroCard
                title={multiplePhotos[currentIndex].title}
                image={multiplePhotos[currentIndex].url}
                description={multiplePhotos[currentIndex].explanation}
                copyright={multiplePhotos[currentIndex].copyright}
              />

              {/*  Only show arrows if it's an image */}
              <div className="nav-controls">
                <button
                  onClick={prevPhoto}
                  disabled={currentIndex === 0}
                  className="nav-arrow"
                >
                  ◀
                </button>
                <button
                  onClick={nextPhoto}
                  disabled={currentIndex === multiplePhotos.length - 1}
                  className="nav-arrow"
                >
                  ▶
                </button>
              </div>
            </>
          ) : (
            <div className="video-container">
              <h2>{multiplePhotos[currentIndex].title}</h2>
              <iframe
                src={multiplePhotos[currentIndex].url}
                title={multiplePhotos[currentIndex].title}
                width="700"
                height="400"
                frameBorder="0"
                allowFullScreen
              />
              <p className="video-description">
                {multiplePhotos[currentIndex].explanation}
              </p>
            </div>
          )}
        </div>
      ) : photo ? (
        photo.media_type === "image" ? (
          <HeroCard
            title={photo.title}
            image={photo.url}
            description={photo.explanation}
            copyright={photo.copyright}
          />
        ) : (
          <div className="video-container">
            <h2>{photo.title}</h2>
            <iframe
              src={photo.url}
              title={photo.title}
              width="700"
              height="400"
              frameBorder="0"
              allowFullScreen
            />
            <p className="video-description">{photo.explanation}</p>
          </div>
        )
      ) : null}

      <div className="param-card-container">
        <ParamCard title="Pick a day" showDateInput={true} onPickDate={loadPhoto} />
        <ParamCard
          title="Fetch multiple photos"
          showDateInput={false}
          showCountInput={true}
          onPickCount={loadMultiplePhotos}
        />
      </div>
    </main>
  );
};

export default Home;
