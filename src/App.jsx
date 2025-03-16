import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import News from "./components/News";
import Clubs from "./components/Clubs";
import Registration from "./pages/Registration";
import Hero from "./pages/Home/Hero";

import Commitee from "./components/Commitee";
import Umpires from "./components/Umpires";
import Club from "./pages/Club/Club";

function App() {
  return (
    <div className="__app">
      <Header></Header>
      <Routes>
        <Route
          path="/news"
          element={
            <div className="flex flex-col items-center gap-24">
              <Hero img={"/images/cricket.jpg"}>
                <h1 className="heading"> MPCL News</h1>
              </Hero>
              <News />
            </div>
          }
        />
        <Route
          path="/clubs"
          element={
            <div className="flex flex-col items-center gap-24">
              <Hero img={"/images/cricket.jpg"}>
                <h1 className="heading"> League Clubs</h1>
              </Hero>
              <Clubs />
            </div>
          }
        />
        <Route
          path="/commitee"
          element={
            <div className="flex flex-col items-center gap-24">
              <Hero img={"/images/cricket.jpg"}>
                <h1 className="heading"> MPCL Commitee</h1>
              </Hero>
              <Commitee />
            </div>
          }
        />
        <Route
          path="/umpires"
          element={
            <div className="flex flex-col items-center gap-24">
              <Hero img={"/images/cricket.jpg"}>
                <h1 className="heading"> Our Umpires</h1>
              </Hero>
              <Umpires />
            </div>
          }
        />
        <Route path="/registration" element={<Registration />} />
        <Route path="/club" element={<Club />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
