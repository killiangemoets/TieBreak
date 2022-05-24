import React, { useState, useEffect } from "react";
import "../stylesheets/navbar.css";
import "../stylesheets/general.css";
import "../stylesheets/profile.css";
import { Redirect } from "react-router-dom";
import FooterPage from "../components/Footer";
import NavbarClub from "../components/NavbarClub";

function ClubProfile() {
  const [token, setToken] = useState("");
  const [type, setType] = useState("");
  const [personnalInfos, setPersonnalInfos] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [emailError, setEmailError] = useState("");

  async function getPersonnalInfos(token) {
    var rawResponse = await fetch(`/clubs/infos/${token}`);
    var response = await rawResponse.json();
    if (response.status === "success") setPersonnalInfos(response.data.infos)
  }


  async function handleConfirm(token) {
    var rawResponse = await fetch(`/clubs/infos/${token}`, {
      method : "PATCH", 
      headers : {
        "Content-Type" : "application/json",  
      }, 
      body : JSON.stringify({
        address: newAddress.length > 0 ? newAddress : personnalInfos.adress,
        phone : newPhone.length > 0 ? newPhone : personnalInfos.phone,
        price : newPrice.length > 0 ? newPrice : personnalInfos.price,
        email : newEmail.length > 0 ? newEmail : personnalInfos.email, 
        name : newName.length > 0 ? newName : personnalInfos.name,
      })
    }); 
    var response = await rawResponse.json(); 
    setNewAddress(""); 
    setNewPhone(""); 
    setNewPrice(""); 
    setNewEmail(""); 
    setNewName("");   
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
    setNewAddress(""); 
    setNewPhone(""); 
    setNewPrice(""); 
    setNewEmail(""); 
    setNewName("");   
  }


  useEffect(() => {
    const storage1 = localStorage.getItem("type");
    if (JSON.parse(storage1) !== "club") setType(false);
    const storage = localStorage.getItem("token");
    if (storage) {
      setToken(JSON.parse(storage))
      getPersonnalInfos(JSON.parse(storage));
    } else {
      setToken(false);
  }}, []);


  if (token === false || type === false) {
    return <Redirect to="/club/signin" />;
  } else {
    return (
      <div>
        <NavbarClub />
        <div className=" profile-section profile-section-club margin-top">
          <div className="reservation-main-title-section">
            <hr className="horizontalRule4"></hr>
            <h1 id="title" className="reservation-main-title">
              Personnal Informations
            </h1>
            <hr className="horizontalRule4"></hr>
          </div>
          <div>
            <div className="club-infos-section">
              <form className="personnal-infos-form club-infos-form">
                <div className="input-div address-div">
                  <label>Address</label>
                  <input
                    type="text"
                    id="address-input"
                    name="firstname"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    placeholder={personnalInfos.address}
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
                  <label>Price</label>
                  <input
                    type="text"
                    id="infos-input"
                    name="lastname"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder={personnalInfos.price}
                  />
                </div>
                <div className="input-div">
                  <label>Name</label>
                  <input
                    type="text"
                    id="infos-input"
                    name="lastname"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder={personnalInfos.clubname}
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
              <div className="map-input-section">
                <p className="map-text">Set your location on the map:</p>

                <img
                  src="../../map.jpeg"
                  alt="calendar"
                  className="map-img map-input"
                ></img>
              </div>
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

export default ClubProfile;

