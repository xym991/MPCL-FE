import React, { useState, useContext } from "react";
import axios from "axios";
import paths from "../../utils/paths";
import Button from "../../components/Shared/Button";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";
import { UserContext } from "../../context/UserContext";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        paths.login,
        { email, password },
        { withCredentials: true }
      );

      // Fetch user details after login
      const userResponse = await axios.get(paths.get_current_user, {
        withCredentials: true,
      });
      setUser(userResponse.data);
      navigate("/");
      console.log("User details:", userResponse.data);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="login-page flex flex-col items-center justify-center min-h-screen">
      <div className="login-container bg-white p-8 rounded-md shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-semibold mb-4 text-center color-primary">
          Login
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="relative">
            <AlternateEmailIcon className="absolute left-3 top-3 text-primary" />
            <input
              type="email"
              placeholder="Email"
              className="border p-4 pl-10 w-full shadow"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <LockIcon className="absolute left-3 top-3 text-primary" />
            <input
              type="password"
              placeholder="Password"
              className="border p-4 pl-10 w-full shadow"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="bg-primary text-white px-4 py-4 rounded-md w-full"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
