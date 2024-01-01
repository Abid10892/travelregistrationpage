import React from "react";
import background from "./image/airplane.png";

export default function ImageSection() {
  return (
    <div className="imageSection">
      <div className="logoContainer">
        <img src={background} alt="flight" className="logo" />
      </div>
      <div className="textContent">
        <h1>Altitude & Air</h1>
        <div className="line"></div>
        <p>
          We promise to ensure that your well-being is taken care of while
          travelling with us. Boasting top in class fleet inventory and a 5 star
          approval for our in-flight experience, you know you're getting the
          best from Altitude with no attitude.
        </p>
      </div>
    </div>
  );
}
