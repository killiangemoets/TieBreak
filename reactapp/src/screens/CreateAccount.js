import React, { useState } from "react";
import NavbarHomePage from "../components/NavbarHomePage";
import FooterPage from "../components/Footer";
import { Redirect } from "react-router-dom";

import { useDropzone } from "react-dropzone";

import "../stylesheets/signpage.css";
import "../stylesheets/general.css";
import "../stylesheets/queries.css";

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
  const [imageToUpload, setImageToUpload] = useState("");

  const uploadImage = async (e) => {
    setImageToUpload(
      Object.assign(e.target.files[0], {
        preview: URL.createObjectURL(e.target.files[0]),
      })
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "images/*",
    onDrop: (acceptedFiles) => {
      setImageToUpload(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    },
  });

  function hideNavbar() {
    const navbar = document.querySelector(".navbarRight");
    const menuIcon = document.querySelector(".mobile-nav-menu-icon");
    const crossIcon = document.querySelector(".mobile-nav-cross-icon");
    navbar.classList.remove("nav-open");
    menuIcon.classList.remove("remove");
    crossIcon.classList.add("remove");
  }

  async function handleSignUp() {
    if (
      password === confirmPassword &&
      password.length !== 0 &&
      phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
    ) {
      console.log(imageToUpload);
      let file;
      if (imageToUpload?.preview) {
        const data = new FormData();
        data.append("file", imageToUpload);
        data.append("upload_preset", "upload_pics");
        // setLoading(true);
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/djuuji1j9/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        file = await res.json();
      }

      const newUser = {
        firstname,
        lastname,
        email,
        phone,
        password,
        image: imageToUpload?.preview ? file.secure_url : "",
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
        localStorage.setItem("type", JSON.stringify("player"));
        localStorage.setItem(
          "username",
          JSON.stringify(response.data.user.firstname)
        );
        localStorage.setItem(
          "image",
          JSON.stringify(response.data.user?.image)
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
      if (phone === "") setPhoneError("Please provide a phone number");
      else if (
        !phone.match(
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        )
      )
        setPhoneError("Please provide a valid phone number");
      else setPhoneError("");

      if (firstname === "") setFirstnameError("Please provide a firstname");
      else setFirstnameError("");

      if (lastname === "") setLastnameError("Please provide a lastname");
      else setLastnameError("");

      if (email === "") setEmailError("Please provide an email");
      else setEmailError("");

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
        <div
          className="container center-sign margin-top"
          onClick={() => hideNavbar()}
        >
          <div className="center-title">
            <div className="sign-up-title sign-up-title2">
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
            <h1 className="image-player-title image-title">
              Add a picture of your club (optional):
            </h1>
            <div className="image-inputs">
              <div className="get-image">
                <div {...getRootProps()} className="drop-image">
                  <p>Drop an image here</p>
                  <input
                    {...getInputProps()}
                    placeholder="Drop an image here"
                  />
                </div>
                <div>
                  <input
                    type="file"
                    name="file"
                    className="image-input"
                    placeholder="Upload an image"
                    onChange={uploadImage}
                  />
                </div>
              </div>
              <div className="overview-img">
                {imageToUpload === "" ? (
                  <h3>No Image</h3>
                ) : (
                  <img
                    src={imageToUpload.preview}
                    style={{ width: "300px" }}
                    alt=""
                  />
                )}
              </div>
            </div>
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
