import React from "react";
import NavbarMainPage from "../components/NavbarMainPage";
import FooterPage from "../components/Footer";
import "../stylesheets/profile.css";
import "../stylesheets/general.css";

function Profile() {
  return (
    <div>
      <NavbarMainPage />
      <div className=" profile-section">
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
                  placeholder="Lebron"
                />
              </div>
              <div className="input-div">
                <label>Phone</label>
                <input
                  type="text"
                  id="infos-input"
                  name="phone"
                  placeholder="047912344261"
                />
              </div>
              <div className="input-div">
                <label>Last Name</label>
                <input
                  type="text"
                  id="infos-input"
                  name="lastname"
                  placeholder="James"
                />
              </div>
              <div className="input-div">
                <label>Email</label>
                <input
                  type="text"
                  id="infos-input"
                  name="email"
                  placeholder="king@gmail.com"
                />
              </div>
            </form>
          </div>
        </div>

        <div className="reservation-buttons">
          <button className="yellowButton profileBtn">Cancel</button>
          <button className="yellowButton profileBtn">Confirm</button>
        </div>
      </div>
      <FooterPage />
    </div>
  );
}

export default Profile;
