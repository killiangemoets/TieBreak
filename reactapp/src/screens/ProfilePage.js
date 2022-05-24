import React, { useState, useEffect } from "react";
import NavbarMainPage from "../components/NavbarMainPage";
import FooterPage from "../components/Footer";
import "../stylesheets/profile.css";
import "../stylesheets/general.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function Profile(props) {
  const [personnalInfos, setPersonnalInfos] = useState("");
  const [newFirstname, setNewFirstname] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [token, setToken] = useState("");
  const [type, setType] = useState("");

  async function getPersonnalInfos(token) {
    var rawResponse = await fetch(`/users/infos/${token}`);
    var response = await rawResponse.json();
    console.log(response);
    if (response.status === "success") setPersonnalInfos(response.data.infos);
  }

  async function handleConfirm(token) {
    var rawResponse = await fetch(`/users/infos/${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname:
          newFirstname.length > 0 ? newFirstname : personnalInfos.firstname,
        lastname:
          newLastname.length > 0 ? newLastname : personnalInfos.lastname,
        phone: newPhone.length > 0 ? newPhone : personnalInfos.phone,
        email: newEmail.length > 0 ? newEmail : personnalInfos.email,
      }),
    });
    var response = await rawResponse.json();
    console.log(response);
    setNewFirstname("");
    setNewLastname("");
    setNewPhone("");
    setNewEmail("");
    if (response.status === "success") await getPersonnalInfos(token);
    setEmailError("");

    if (response.status === "fail") {
      console.log("---ERROR---");
      if (
        response.message?.message &&
        response.message.message?.indexOf("invalid email") !== -1
      )
        setEmailError("Please provide a valid email");
      else if (
        response.message?.codeName &&
        response.message.codeName?.indexOf("DuplicateKey") !== -1
      )
        setEmailError("This email is already used");
    }
  }

  function handleCancel() {
    setNewFirstname("");
    setNewLastname("");
    setNewPhone("");
    setNewEmail("");
  }

  useEffect(() => {
    const storage1 = localStorage.getItem("type");
    if (JSON.parse(storage1) !== "player") setType(false);
    const storage = localStorage.getItem("token");
    console.log(JSON.parse(storage));
    if (storage) setToken(JSON.parse(storage));
    else setToken(false);
    getPersonnalInfos(JSON.parse(storage));
  }, []);

  if (token === false || type === false) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <div>
        <NavbarMainPage />
        <div className=" profile-section margin-top">
          <div className="reservation-main-title-section">
            <hr className="horizontalRule4"></hr>
            <h1 id="title" className="reservation-main-title">
              Personnal Informations
            </h1>
            <hr className="horizontalRule4"></hr>
          </div>
          <div>
            <div className="personnal-infos">
              <form className="personnal-infos-form">
                <div className="input-div">
                  <label>First Name</label>
                  <input
                    type="text"
                    id="infos-input"
                    name="firstname"
                    value={newFirstname}
                    onChange={(e) => setNewFirstname(e.target.value)}
                    placeholder={personnalInfos.firstname}
                  />
                </div>
                <div className="input-div">
                  <label>Phone</label>
                  <input
                    type="text"
                    id="infos-input"
                    name="phone"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder={personnalInfos.phone}
                  />
                </div>
                <div className="input-div">
                  <label>Last Name</label>
                  <input
                    type="text"
                    id="infos-input"
                    name="lastname"
                    value={newLastname}
                    onChange={(e) => setNewLastname(e.target.value)}
                    placeholder={personnalInfos.lastname}
                  />
                </div>
                <div className="input-div">
                  <label>Email</label>
                  <input
                    type="text"
                    id="infos-input"
                    name="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder={personnalInfos.email}
                  />
                  <p className="error-message">{emailError}</p>
                </div>
              </form>
            </div>
          </div>

          <div className="reservation-buttons">
            <button
              className="yellowButton profileBtn"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
            <button
              className="yellowButton profileBtn"
              onClick={() => handleConfirm(token)}
            >
              Confirm
            </button>
          </div>
        </div>
        <FooterPage />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(Profile);
