import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Logout from "../components/Logout"

export default function Root() {

  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div>

      <header>

        <nav>

          {!token ? <Link className="links" to="login">Login</Link> : ""}
          {!token ? <Link className="links" to="register">Register</Link> : ""}
          {token ? <Link className="links" to="profile">Profile</Link> : null}
          <Link className="links" to="activities">Activities</Link>
          <Link className="links" to="routines">Routines</Link>
          {token ? <Logout setToken={setToken} /> : ""}
 
        </nav>


      </header>

      <main>

        <Outlet context={[token, setToken]}/>

      </main>

      <footer className="footer" >Copyright 2022</footer>

    </div>
  );
}