import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { registerUser } from "../utils/API";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token, navigate])

  async function submitRegistration(event) {
    try {
      event.preventDefault();

      if (!username) {
        setErrorMessage("Username is required");
      } else if (password.length < 8) {
        setErrorMessage("Password is too short, must be a minimum of 8 characters");
      } else if (password !== confirmPassword) {
        setErrorMessage("Passwords must match");
      } else {
        setErrorMessage("");
        const user = {
          username,
          password
        }
        const response = await registerUser(user);
        if (response.error) {
          setErrorMessage(response.error.message);
        } else {
          localStorage.setItem("token", response.token);
          setToken(response.token);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>

      <h1>Register</h1>

      <form onSubmit={submitRegistration}>

        <label>Enter A Username: </label>
        <input
          className=""
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}>
        </input>

        <label>Enter A Password: </label>
        <input
          className=""
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}>
        </input>

        <label>Confirm Password: </label>
        <input
          className=""
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}>
        </input>

        <button type="submit">Register</button>
        <p>{errorMessage}</p>
        
      </form>

    </div>
  )
};

export default Register;