import React from "react";
import { Link } from "react-router-dom";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const navigateToRoot = () => {
    navigate("/register");
  };
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

          <button className="btn btn-hero" onClick={navigateToRoot}>
            Login/Register
          </button>
        </div>
        <img src={main} alt="job hunt" className="img main-img"></img>
      </div>
    </Wrapper>
  );
};

export default Landing;
