import React from "react";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page ">
        {/* {info div} */}
        <div className="info">
          <h1>
            Job <span> Tracking </span> app
          </h1>
          <p>
            I'm baby cornhole mlkshk master cleanse, artisan slow-carb activated
            charcoal bitters hoodie shabby chic chillwave jianbing readymade
            shoreditch mustache live-edge
          </p>
          <button className="btn btn-hero">Login/Register</button>
        </div>
        <img src={main} alt="job hunt" className="img main-img"></img>
      </div>
    </Wrapper>
  );
};

export default Landing;
