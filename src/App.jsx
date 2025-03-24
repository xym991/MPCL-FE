import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Header from "./components/Header";
import Footer from "./components/Footer"; // Import the Footer component
import Home from "./pages/Home";
import News from "./components/News";
import Clubs from "./components/Clubs";
import Registration from "./pages/Registration";
import Hero from "./pages/Home/Hero";
import Management from "./pages/Management";
import Commitee from "./components/Commitee";
import Umpires from "./components/Umpires";
import Club from "./pages/Club/Club";
import About from "./pages/About/About";
import Login from "./pages/Login/Login"; // Import the Login component

function App() {
  return (
    <UserProvider>
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
          <Route path="/club/:id" element={<Club />} />
          <Route
            path="/history"
            element={
              <div className="flex flex-col items-center gap-24">
                <Hero img={"/images/cricket.jpg"}>
                  <h1 className="heading">History</h1>
                </Hero>
                <About />
              </div>
            }
          />
          <Route path="/login" element={<Login />} />{" "}
          {/* Add the login route */}
          <Route path="/mpcl-management-panel" element={<Management />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </UserProvider>
  );
}

export default App;
