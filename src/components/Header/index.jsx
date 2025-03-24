import { Link, useLocation } from "react-router-dom";
import Button from "../Shared/Button";
import "./index.css";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Header() {
  const location = useLocation();
  const arr = [
    "/",
    "/commitee",
    "/clubs",
    "/umpires",
    "/news",
    "/sponsor",
    "/history",
  ];
  const headerClass = arr.includes(location.pathname)
    ? "_header transparent"
    : "_header";

  const { user } = useContext(UserContext);
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
          <Link to="/history">History</Link>
        </li>
        {user?.role ? (
          <Link to="/mpcl-management-panel">
            <Button>MPCL-management</Button>
          </Link>
        ) : (
          <Link to={"/registration"}>
            <Button>Join Now!</Button>
          </Link>
        )}
      </ul>
    </div>
  );
}
