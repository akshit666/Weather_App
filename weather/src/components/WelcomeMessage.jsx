import React from "react";
import "../style/Style.css";

export default function WelcomeMessage() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = now.toLocaleDateString(undefined, options);
  const time = now.toLocaleTimeString();

  return (
    <div className="Welcome">
      <p>Welcome to Weather App</p>
      <p>{` ${date}`}</p>
      <p>{` ${time}`}</p>
    </div>
  );
}
 