import React, { useState } from "react";
import "../stylesheets/navbar.css";
import "../stylesheets/queries.css";
import "../stylesheets/general.css";
import { Redirect } from "react-router-dom";
import NavbarHomePageClub from "../components/NavbarHomePageClub";
import FooterPage from "../components/Footer";

function ClubSignIn() {
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

    const loginResponse = await fetch("../clubs/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    });

    const response = await loginResponse.json();
    console.log(response);

    if (response.status === "success") {
      setIsLogin(true);
      localStorage.setItem("token", JSON.stringify(response.data.club.token));
      localStorage.setItem("type", JSON.stringify("club"));
      localStorage.setItem(
        "username",
        JSON.stringify(response.data.club.clubname)
      );
      if (response.data.club?.image)
        localStorage.setItem(
          "image",
          JSON.stringify(response.data.club?.image)
        );
    }

    if (email === "") setEmailError("Please provide an email");
    else if (
      response.status === "fail" &&
      response.message.indexOf("email not found") !== -1
    ) {
      setEmailError("User does not exist");
    } else setEmailError("");

    if (password === "") setPasswordError("Please enter your password");
    else if (
      response.status === "fail" &&
      response.message.indexOf("password incorrect") !== -1
    ) {
      setPasswordError("Wrong password");
    } else setPasswordError("");
  };

  if (isLogin) {
    return <Redirect to="/club/calendar" />;
  } else {
    return (
      <div>
        <NavbarHomePageClub />
        <div
          className="container center-sign margin-top"
          onClick={() => hideNavbar()}
        >
          <div className="center-title">
            <div className="sign-up-title sign-in-club-title">
              <p>Sign in as a club</p>
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

export default ClubSignIn;
