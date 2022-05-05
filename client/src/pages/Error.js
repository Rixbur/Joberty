import React from "react";
import { Link } from "react-router-dom";
import errorImg from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

function Error() {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={errorImg} alt="error"></img>
        <h3>Ohh! Page not found!</h3>
        <p> We can't seem to find the page you're looking for</p>
        <Link to="/">Back home</Link>
      </div>
    </Wrapper>
  );
}

export default Error;
