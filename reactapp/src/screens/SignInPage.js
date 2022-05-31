import React, { useState } from "react";
import NavbarHomePage from "../components/NavbarHomePage";
import FooterPage from "../components/Footer";
import { Redirect } from "react-router-dom";

import "../stylesheets/signpage.css";
import "../stylesheets/general.css";
import "../stylesheets/queries.css";

function CreateAccount(props) {
  const [isLogin, setIsLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function hideNavbar() {
    const navbar = document.querySelector(".navbarRight");
    const menuIcon = document.querySelector(".mobile-nav-menu-icon");
    const crossIcon = document.querySelector(".mobile-nav-cross-icon");
    navbar.classList.remove("nav-open");
    menuIcon.classList.remove("remove");
    crossIcon.classList.add("remove");
  }

  var handleSignIn = async () => {
    const login = {
      email,
      password,
    };

    const loginResponse = await fetch("/users/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    });

    const body = await loginResponse.json();
    console.log(body);

    // Il faut aller voir la ligne 86 dans users.js des routes en backend pour voir le status //
    if (body.status === "success") {
      setIsLogin(true);
      localStorage.setItem("token", JSON.stringify(body.data.user.token));
      localStorage.setItem("type", JSON.stringify("player"));
      localStorage.setItem(
        "username",
        JSON.stringify(body.data.user.firstname)
      );
      if (body.data.user?.image)
        localStorage.setItem("image", JSON.stringify(body.data.user?.image));
      // La ligne juste au dessus sert pour le redux //
    }

    if (email === "") setEmailError("Please provide an email");
    else if (
      body.status === "fail" &&
      body.message.indexOf("email not found") !== -1
    ) {
      setEmailError("User does not exist");
    } else setEmailError("");

    if (password === "") setPasswordError("Please enter your password");
    else if (
      body.status === "fail" &&
      body.message.indexOf("password incorrect") !== -1
    ) {
      setPasswordError("Wrong password");
    } else setPasswordError("");
  };

  if (isLogin) {
    return <Redirect to="/games" />;
  } else {
    return (
      <div>
        <NavbarHomePage />
        <div className="container center-sign" onClick={() => hideNavbar()}>
          <div className="center-title">
            <div className="sign-up-title">
              <p>Sign in</p>
            </div>
          </div>

          <div className="login-form">
            <form>
              <div className="inputDiv">
                <div className="login-account-form">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Email"
                  ></input>
                  <p>{emailError}</p>
                </div>
                <div className="login-account-form">
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Password"
                  ></input>
                  <p>{passwordError}</p>
                </div>
              </div>
            </form>
            <button
              className="sign-in-sumbit-button"
              onClick={() => handleSignIn()}
              type="submit"
            >
              {" "}
              SUBMIT
            </button>
          </div>
        </div>
        <FooterPage />
      </div>
    );
  }
}

export default CreateAccount;
