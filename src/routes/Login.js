import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { loginUser } from "../utils/API";

const Login = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useOutletContext();
  const navigate = useNavigate();

  async function submitLogin(event) {
    try {
      event.preventDefault();

      if (!loginUsername && !loginPassword) {
        setErrorMessage("Invalid username or password, try again or register");
      } else {
        setErrorMessage("");

        const user = {
          username: loginUsername,
          password: loginPassword
        }

        const response = await loginUser(user);

        if (response.error) {
          setErrorMessage(response.error.message);
        } else {
          setToken(response.token);
          localStorage.setItem("token", response.token);
          navigate("/profile");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="login">

      <h1>Login</h1>

      <form onSubmit={submitLogin}>

        <label>Username: </label>
        <input 
          className=""
          type="text" 
          value={loginUsername} 
          onChange={(event) => setLoginUsername(event.target.value)}>
        </input>

        <label>Password: </label>
        <input 
          className=""
          type="password" 
          value={loginPassword} 
          onChange={(event) => setLoginPassword(event.target.value)}>
        </input>

        <button type="submit">Login</button>
        <p>{errorMessage}</p>

      </form>

    </div>
  )
};

export default Login;