import React, { useState, useEffect } from "react";
import UVWheel from "./UVWheel";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [uvIndex, setUvIndex] = useState(null);
  const [error, setError] = useState("");
  const [audio] = useState(new Audio("/musica/RISADA_FANTASMA.mp3"));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audio.loop = true;
    return () => {
      audio.pause();
    };
  }, [audio]);

  const fetchUV = async () => {
    if (!city) return;

    try {
      setError("");
      setUvIndex(null);

      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}&country=PT&count=1`
      );
      const geoData = await geoRes.json();

      if (!geoData?.results?.length) {
        setError("Cidade não encontrada em Portugal 😔");
        return;
      }

      const { latitude: lat, longitude: lon } = geoData.results[0];

      const forecastRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=uv_index&timezone=UTC`
      );
      const forecastData = await forecastRes.json();

      if (!forecastData?.hourly?.time || !forecastData?.hourly?.uv_index) {
        setError("Dados UV indisponíveis para esta localização.");
        return;
      }

      const now = new Date();
      const currentHourUTC = now.toISOString().slice(0, 13) + ":00";
      const times = forecastData.hourly.time;
      const uvs = forecastData.hourly.uv_index;

      let idx = times.indexOf(currentHourUTC);
      if (idx === -1) {
        idx = times.reduce(
          (best, t, i) =>
            Math.abs(new Date(t) - now) < Math.abs(new Date(times[best]) - now)
              ? i
              : best,
          0
        );
      }

      setUvIndex(uvs[idx]);
    } catch (err) {
      console.error(err);
      setError("Erro ao obter dados (ver consola).");
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((e) => console.warn("Audio play blocked:", e));
      setIsPlaying(true);
    }
  };

  return (
    <div className="App">
      {/* Vídeo de fundo */}
      <video autoPlay loop muted className="background">
        <source
          src="/videos/vecteezy_halloween-background-with-pumpkins-and-trees-animation_53586803.mp4"
          type="video/mp4"
        />
      </video>

      {/* Botão de som */}
      <button onClick={toggleAudio} className="sound-button">
        {isPlaying ? "🔇 Pausar Som" : "🔊 Ativar Som"}
      </button>

      <h1>Índice UV em Portugal</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Digite o nome da localidade..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchUV()}
        />
        <button onClick={fetchUV}>Pesquisar</button>
      </div>

      {error && <p className="error">{error}</p>}

      {uvIndex !== null && (
        <div className="uv-container">
          <UVWheel uvIndex={uvIndex} />
        </div>
      )}
    </div>
  );
}

export default App;
