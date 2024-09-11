import React from "react";
import rainLogo from "../assets/RainLogo.svg";
import cloudyLogo from "../assets/Cloudy.svg";
import lightningLogo from "../assets/Lightning.svg";
import sunnyLogo from "../assets/SunnyLogo.png";
import hazeLogo from "../assets/haze.jpg"; // Add haze logo
import DateAndTime from "./DateAndTime";
import "../style/Style.css"
export default function WeatherLogo({ weather }) {
  return (
    <div className="upper-detail">
      {weather === "rain" && (
        <div className="logo">
          <img src={rainLogo} alt="Rain Logo" className="weather-logo" />
          <div className="weather-info">
            <h1>Rain</h1>
          </div>
        </div>
      )}

      {weather === "cloudy" && (
        <div className="logo">
          <img src={cloudyLogo} alt="Cloudy Logo" className="weather-logo" />
          <div className="weather-info">
            <h1>Cloudy</h1>
          </div>
        </div>
      )}

      {weather === "sunny" && (
        <div className="logo">
          <img src={sunnyLogo} alt="Sunny Logo" className="weather-logo" />
          <div className="weather-info">
            <h1>Sunny</h1>
          </div>
        </div>
      )}

      {weather === "thunderstorm" && (
        <div className="logo">
          <img src={lightningLogo} alt="Thunderstorm Logo" className="weather-logo" />
          <div className="weather-info">
            <h1>Thunderstorm</h1>
          </div>
        </div>
      )}

      {weather === "haze" && (
        <div className="logo">
          <img src={hazeLogo} alt="Haze Logo" className="weather-logo" />
          <div className="weather-info">
            <h1>Haze</h1>
          </div>
        </div>
      )}
       {weather === "mist" && (
        <div className="logo">
          <img src={hazeLogo} alt="Haze Logo" className="weather-logo" />
          <div className="weather-info">
            <h1>Mist</h1>
          </div>
        </div>
      )}

    </div>
  );
}
