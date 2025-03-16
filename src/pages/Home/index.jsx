import React from "react";
import "./index.css";
import Hero from "./Hero";
import Patron from "./Patron";
import Clubs from "../../components/Clubs";
import News from "../../components/News";
import Commitee from "../../components/Commitee";
import Umpires from "../../components/Umpires";
import Sponsors from "../../components/Sponsors";
const Home = () => {
  return (
    <div className="__home">
      <Hero img={"/images/cricket.jpg"}>
        <h1>
          <b> Welcome To</b>
          Middlesex Premier <span>Cricket League</span>​
        </h1>
        <p>One of the largest Sunday league in the United Kingdom.</p>
      </Hero>

      <Patron></Patron>
      <div className="section">
        <h1 className="heading">MPCL News</h1>
        <News></News>
      </div>
      <div className="section">
        <h1 className="heading">League Clubs</h1>
        <Clubs></Clubs>
      </div>
      <div className="section">
        <h1 className="heading">MPCL Commitee </h1>
        <Commitee />
      </div>
      <div className="section">
        <h1 className="heading">Our Umpires</h1>
        <Umpires />
      </div>
    </div>
  );
};

export default Home;
