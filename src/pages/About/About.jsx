import React from "react";
import image1 from "../../assets/images/about-1.png";
import image2 from "../../assets/images/about-2.png";
import image3 from "../../assets/images/about-3.png";
import Patron from "../Home/Patron";

const About = () => {
  return (
    <div className="_about flex flex-col w-full gap-12">
      <Patron
        text={
          <>
            The Middlesex Premier Cricket League was set up in January 1992 by
            15 clubs who were then playing in the Middlesex Club Cricketers
            League. The MCCL were spread over several counties which led to a
            declining level of organisational support, lack of communications,
            poor grounds, lack of umpires & long travelling times on a Sunday
            which resulted in financial difficulties for the league.
          </>
        }
        img1={image1}
      ></Patron>
      <Patron
        text={
          <>
            The late Mr. Bipin Patel (Suraj Victor) and Mr. Jayesh Patel (Anson)
            were the principal leaders, who with the support of Mr. Arvind Patel
            (United Sports) laid the foundations for the Middlesex Premier
            Cricket League. The league has solid support in the committee with
            the likes of Mr. Dipu Patel (Neasden) Mr. Mohansinh Darbar (Rajput
            Samaj Sports Club) & Mr. Hari Balasubramaniam (Neasden & Lankians)
            who have all served on the committee in various posts for more many
            years.
          </>
        }
        img2={image2}
      ></Patron>
      <Patron
        text={
          <>
            The Middlesex Premier Cricket League started with 15 clubs and two
            divisions in 1992 which has grown to 39 clubs in 7 divisions. In
            2002 MPCL started a 2nd XI competition to encourage the youth and
            retain the experienced players and has grown to 2 divisions . Today
            MPCL not only playing league but also have established knockout
            competitions like the MPCL Cup, Plate & Mini Cup.
          </>
        }
        img1={image3}
      ></Patron>
    </div>
  );
};

export default About;
