import React, { useState } from "react";
import NavbarHomePage from "../components/NavbarHomePage";
import FooterPage from "../components/Footer";
import { Redirect, Link } from "react-router-dom";

import "../stylesheets/signpage.css";
import "../stylesheets/general.css";

function CreateAccount() {
  const [isSignUp, setIsSignUp] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  async function handleSignUp() {
    if (password === confirmPassword && password.length !== 0) {
      const newUser = {
        firstname,
        lastname,
        email,
        phone,
        password,
      };
      const rawResponse = await fetch("users/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const response = await rawResponse.json();
      console.log(response);
      if (response.status === "success") {
        setIsSignUp(true);
        localStorage.setItem("token", JSON.stringify(response.data.user.token));
        localStorage.setItem("type", "player");
        localStorage.setItem(
          "username",
          JSON.stringify(response.data.user.firstname)
        );
      }
      if (firstname === "") setFirstnameError("Please provide a firstname");
      else setFirstnameError("");

      if (lastname === "") setLastnameError("Please provide a lastname");
      else setLastnameError("");

      if (email === "") setEmailError("Please provide an email");
      else if (
        response.status === "fail" &&
        response.message.indexOf("invalid email") !== -1
      )
        setEmailError("Please provide a valid email");
      else if (
        response.status === "fail" &&
        response.message.indexOf("E11000") !== -1
      )
        setEmailError("This email is already used");
      else setEmailError("");

      if (phone === "") setPhoneError("Please provide a phone number");
      else setPhoneError("");

      setPasswordError("");
      setConfirmPasswordError("");
    } else {
      if (firstname === "") setFirstnameError("Please provide a firstname");
      else setFirstnameError("");

      if (lastname === "") setLastnameError("Please provide a lastname");
      else setLastnameError("");

      if (email === "") setEmailError("Please provide an email");
      else setEmailError("");

      if (phone === "") setPhoneError("Please provide a phone number");
      else setPhoneError("");

      if (password === "") setPasswordError("Please provide a password");
      else setPasswordError("");

      if (confirmPassword === "")
        setConfirmPasswordError("Please confirm your password");
      else if (password !== confirmPassword)
        setConfirmPasswordError("Confirmation password is incorrect");
      else setConfirmPasswordError("");
    }
  }

  if (isSignUp) {
    return <Redirect to="/games" />;
  } else {
    return (
      <div>
        <NavbarHomePage />
        <div className="container center-sign margin-top">
          <div className="center-title">
            <div className="sign-up-title">
              <p>Create Your Account</p>
            </div>
          </div>

          <div className="sign-up-form">
            <form>
              <div className="inputDiv">
                <div className="create-account-form">
                  <input
                    placeholder="First Name"
                    onChange={(e) => setFirstname(e.target.value)}
                    value={firstname}
                  ></input>
                  <p>{firstnameError} </p>
                </div>
                <div className="create-account-form">
                  <input
                    placeholder="Last Name"
                    onChange={(e) => setLastname(e.target.value)}
                    value={lastname}
                  ></input>
                  <p>{lastnameError}</p>
                </div>
                <div className="create-account-form">
                  <input
                    placeholder="Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  ></input>
                  <p>{emailError}</p>
                </div>
                <div className="create-account-form">
                  <input
                    placeholder="Phone"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                  ></input>
                  <p>{phoneError}</p>
                </div>
                <div className="create-account-form">
                  <input
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  ></input>
                  <p>{passwordError}</p>
                </div>
                <div className="create-account-form">
                  <input
                    placeholder="Confirm Password"
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                  ></input>
                  <p>{confirmPasswordError}</p>
                </div>
              </div>
            </form>
            <button
              className="sign-up-sumbit-button"
              onClick={() => handleSignUp()}
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
