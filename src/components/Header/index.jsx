import { Link, useLocation } from "react-router-dom";
import Button from "../Shared/Button";
import "./index.css";

export default function Header() {
  const location = useLocation();
  const arr = ["/", "/commitee", "/clubs", "/umpires", "/news", "/sponsor"];
  const headerClass = arr.includes(location.pathname)
    ? "_header transparent"
    : "_header";

  return (
    <div className={headerClass}>
      <Link to="/">
        <h1 className="logo">
          MPCL
          <span>middlesex premieer cricket league</span>
        </h1>
      </Link>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/commitee">Commitee</Link>
        </li>
        <li>
          <Link to="/clubs">Clubs</Link>
        </li>{" "}
        <li>
          <Link to="/umpires">Umpires</Link>
        </li>{" "}
        <li>
          <Link to="/news">News</Link>
        </li>{" "}
        <li>
          <Link to="/sponsor">Sponsor</Link>
        </li>{" "}
        <li>
          <Link to="/login">Login</Link>
        </li>
        <Link to={"/registration"}>
          <Button>Join Now!</Button>
        </Link>
      </ul>
    </div>
  );
}
