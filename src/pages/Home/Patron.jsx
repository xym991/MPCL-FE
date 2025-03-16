import React from "react";
import img from "../../assets/images/sunil-gavaskar.jpg";
const Patron = () => {
  return (
    <div className="_patron">
      <div className="patron-card">
        <p>
          <h1 className="heading">Sunil Gavasker - Patron</h1>
          Middlesex Premier Cricket League is one of the largest Sunday league
          in the country. It was founded in 1992 and in last 2 decades it has
          grown to 7 divisions with nearly 50 teams. MPCL also have an
          established Sunday knockout and Mid-Week T20 competitions which are
          very popular among the cricket community. All the MPCL games are
          officiated by League appointed umpires to ensure all matches have been
          played within the spirit of the game. League allows an overseas and
          first-class player to play to ensure local cricketers get a chance to
          compete with good players and improve their games. MPCL is recognised
          and affiliated by Middlesex Cricket Board and Club Cricket Conference.
          Please fill in New Club Application Form to join MPCL.
          <br />
          <br />
          Mr. Gavaskar has always taken keen interest in the Middlesex Premier
          Cricket League. He has been present at several games and functions
          organised by the MPCL since 1992. In 2004, Mr. Gavaskar agreed to act
          as a patron of the MPCL..
        </p>
        <img src={img} alt="" />
      </div>
    </div>
  );
};

export default Patron;
