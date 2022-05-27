import React, { useState } from "react";
import "../stylesheets/navbar.css";
import "../stylesheets/queries.css";
import "../stylesheets/general.css";
import { Redirect } from "react-router-dom";
import NavbarHomePageClub from "../components/NavbarHomePageClub";
import FooterPage from "../components/Footer";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { divIcon } from "leaflet";

import { useDropzone } from "react-dropzone";

function CreateClubAccount() {
  const [isSignUp, setIsSignUp] = useState(false);

  const [mapPosition] = useState({ lat: 50.84, lng: 4.36 });

  const [address, setAddress] = useState("");
  const [clubname, setClubname] = useState("");
  const [price, setPrice] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [position, setPosition] = useState(["", ""]);

  const [addressError, setAddressError] = useState("");
  const [clubnameError, setClubnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [locationError, setLocationError] = useState("");

  const [files, setFiles] = useState([]);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageToUpload, setImageToUpload] = useState("");

  const uploadImage = async (e) => {
    // const files = e.target.files;
    // const data = new FormData();
    // data.append("file", files[0]);
    // data.append("upload_preset", "upload_pics");
    // setLoading(true);
    // const res = await fetch(
    //   "https://api.cloudinary.com/v1_1/djuuji1j9/image/upload",
    //   {
    //     method: "POST",
    //     body: data,
    //   }
    // );
    // const file = await res.json();

    // setImage(file.secure_url);

    // setLoading(false);

    setImageToUpload(
      Object.assign(e.target.files[0], {
        preview: URL.createObjectURL(e.target.files[0]),
      })
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "images/*",
    onDrop: (acceptedFiles) => {
      // setFiles(
      //   acceptedFiles.map((file) =>
      //     Object.assign(file, { preview: URL.createObjectURL(file) })
      //   )
      // );
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

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng);
        // console.log(e.latlng);
        map.locate();
      },
    });

    const customMarkerIcon = divIcon({
      html: `

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker">
        <path fill-opacity=".25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/>
        <path fill="#74c0fc" stroke="#333" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/>
      </svg>

      `,
      iconSize: [32, 32],
      className: "marker",
    });

    return position === null ? null : (
      <Marker position={position} icon={customMarkerIcon}>
        <Popup>Club Location</Popup>
      </Marker>
    );
  }

  async function handleSignUp() {
    if (
      password === confirmPassword &&
      password.length !== 0 &&
      phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
    ) {
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
      const file = await res.json();

      // setImage(file.secure_url);

      const newClub = {
        clubname,
        price,
        phone,
        email,
        address,
        password,
        latitude: position?.lat,
        longitude: position.lng,
        image: file.secure_url,
      };
      const rawResponse = await fetch("../clubs/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClub),
      });
      const response = await rawResponse.json();
      console.log(response);
      if (response.status === "success") {
        setIsSignUp(true);
        localStorage.setItem("token", JSON.stringify(response.data.club.token));
        localStorage.setItem("type", JSON.stringify("club"));
        localStorage.setItem(
          "username",
          JSON.stringify(response.data.club.clubname)
        );
      }

      if (clubname === "") setClubnameError("Please provide a club name");
      else setClubnameError("");

      if (price === "") setPriceError("Please provide a price");
      else setPriceError("");

      if (address === "") setAddressError("Please provide an address");
      else setAddressError("");

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

      if (!position) setLocationError("Please provide a location on the map");
      else setLocationError("");

      setPasswordError("");
      setConfirmPasswordError("");
    } else {
      if (clubname === "") setClubnameError("Please provide a club name");
      else setClubnameError("");

      if (address === "") setAddressError("Please provide an address");
      else setAddressError("");

      if (price === "") setPriceError("Please provide a price");
      else setPriceError("");

      if (email === "") setEmailError("Please provide an email");
      else setEmailError("");

      if (phone === "") setPhoneError("Please provide a phone number");
      else if (
        !phone.match(
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        )
      )
        setPhoneError("Please provide a valid phone number");
      else setPhoneError("");

      if (password === "") setPasswordError("Please provide a password");
      else setPasswordError("");

      if (confirmPassword === "")
        setConfirmPasswordError("Please confirm your password");
      else if (password !== confirmPassword)
        setConfirmPasswordError("Confirmation password is incorrect");
      else setConfirmPasswordError("");

      if (position[0] === "")
        setLocationError("Please provide a location on the map");
      else setLocationError("");
    }
  }

  if (isSignUp) {
    return <Redirect to="/club/calendar" />;
  } else {
    return (
      <div c>
        <NavbarHomePageClub />
        <div
          className="container center-sign margin-top"
          onClick={() => hideNavbar()}
        >
          <div className="center-title">
            <div className="sign-up-title sign-up-club-title">
              <p style={{ textAlign: "center" }}>Create Your Club Account</p>
            </div>
          </div>

          <div className="sign-up-club">
            <form>
              <div className="inputDiv">
                <div className="create-account-form">
                  <input
                    placeholder="Adress"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  ></input>
                  <p>{addressError} </p>
                </div>
                <div className="create-account-form">
                  <input
                    placeholder="Price (€/h)"
                    onChange={(e) => {
                      if (e.target.value < 0) e.target.value = 0;
                      setPrice(e.target.value);
                    }}
                    type="number"
                    value={price}
                    min={0}
                  ></input>
                  <p>{priceError}</p>
                </div>
                <div className="create-account-form">
                  <input
                    placeholder="Club Name"
                    type="text"
                    onChange={(e) => setClubname(e.target.value)}
                    value={clubname}
                  ></input>
                  <p>{clubnameError}</p>
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
            <div className="sign-up-map">
              <p className="map-text">Set your location on the map:</p>
              <MapContainer
                className="map-container-sign-up"
                center={mapPosition}
                zoom={6}
                onClick={(e) => console.log(e)}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                ></TileLayer>
                <LocationMarker />
                {/* {generatePopups(allClubs)} */}
                {/* {renderCurrentPosition(mapPosition)} */}
              </MapContainer>
              <p className="map-error">{locationError}</p>
            </div>
          </div>
          <h1 className="image-title">
            Add a picture of your club (optional):
          </h1>
          <div className="image-inputs">
            <div className="get-image">
              <div {...getRootProps()} className="drop-image">
                <p>Drop an image here</p>
                <input {...getInputProps()} placeholder="Drop an image here" />
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
          <div className="center-sign-up-club-btn">
            <button
              className="sign-up-sumbit-button sign-up-club-btn"
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

export default CreateClubAccount;
