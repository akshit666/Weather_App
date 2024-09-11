import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import WeatherLogo from "./WeatherLogo";
import WeatherDetails from "./WeatherDetails";
import SunriseSunset from "./SunriseSunset";
import WelcomeMessage from "./WelcomeMessage";
import "../style/Style.css";

export default function WeatherCard() {
  const [weather, setWeather] = useState("");
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(""); // State for location
  const [inputValue, setInputValue] = useState(""); // State for input value
  const weatherApiKey = "904d5c935c447b438158509fa9fe2fd4";

  // Unified function to fetch weather data
  const fetchWeatherData = async (query, isCoords = false) => {
    try {
      const url = isCoords
        ? `https://api.openweathermap.org/data/2.5/weather?lat=${query.lat}&lon=${query.lon}&appid=${weatherApiKey}&units=metric` 
        : `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${weatherApiKey}&units=metric`;

      const response = await fetch(url);
      const data = await response.json();

      console.log("API Response:", data);

      if (data.cod !== 200) {
        setError("Unable to fetch weather data.");
        setWeatherData(null);
        setWeather("");
        return;
      }

      const mainWeather = data.weather[0].main.toLowerCase();
      let weatherCondition = "unknown";

      switch (mainWeather) {
      case "clear":
        weatherCondition = "sunny";
        break;
      case "clouds":
        weatherCondition = "cloudy";
        break;
      case "rain":
        weatherCondition = data.weather[0].description.includes("drizzle") ? "drizzle" : "rain";
        break;
      case "thunderstorm":
        weatherCondition = "thunderstorm";
        break;
      case "snow":
        weatherCondition = "snow";
        break;
      default:
        weatherCondition = "unknown";
        break;
    }


      setWeather(weatherCondition);
      setWeatherData({
        ...data,
        main: {
          ...data.main,
          temp: Math.round(data.main.temp),
          feels_like: Math.round(data.main.feels_like),
        },
      });
      setLocation(`${data.name}, ${data.sys.country}`);
      setError(null);
      setInputValue(`${data.name}, ${data.sys.country}`); // Update inputValue with location
    } catch (error) {
      setError("Error fetching data, please try again later.");
      console.error("Error fetching data:", error);
    }
  };

  // Request user's geolocation and fetch weather based on location
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchWeatherData({ lat: position.coords.latitude, lon: position.coords.longitude }, true);
          },
          (error) => {
            setError("Error getting location: " + error.message);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  const handleSearchChange = (event) => {
    setInputValue(event.target.value); // Update input value
    setCity(event.target.value); // Update city for search
  };

  const handleSearch = () => {
    if (!inputValue.trim()) {
      setError("Please enter a city name.");
      return;
    }
    fetchWeatherData(inputValue); // Use the input value for search
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  const convertTemp = (temp) => {
    return unit === "metric"
      ? Math.round(temp) 
      : Math.round((temp * 9) / 5 + 32); 
  };

  return (
    <>
      <div className={`Hero ${weather}`}>
        <div className="left">
          <WeatherLogo weather={weather} />
          {weatherData ? (
            <>
              <SunriseSunset weatherData={weatherData} />
            </>
          ) : (
            <WelcomeMessage /> 
          )}
        </div>

        <div className="right">
          <SearchBar
            handleSearchChange={handleSearchChange}
            handleSearch={handleSearch}
            error={error}
            location={inputValue} 
          />
          {weatherData && (
            <>
              <WeatherDetails
                weatherData={weatherData}
                unit={unit}
                toggleUnit={toggleUnit}
                convertTemp={convertTemp}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
