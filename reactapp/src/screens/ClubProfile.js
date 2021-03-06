import React, { useState, useEffect } from "react";
import "../stylesheets/navbar.css";
import "../stylesheets/general.css";
import "../stylesheets/profile.css";
import { Redirect } from "react-router-dom";
import FooterPage from "../components/Footer";
import NavbarClub from "../components/NavbarClub";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { divIcon } from "leaflet";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function ClubProfile() {
  const [token, setToken] = useState("");
  const [type, setType] = useState("");
  const [clubInfos, setClubInfos] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [refreshUser, setRefreshUser] = useState(false);

  const [mapPosition] = useState({ lat: 50.84, lng: 4.36 });
  // const [locationError, setLocationError] = useState("");
  const [position, setPosition] = useState(["", ""]);

  const [imageToUpload, setImageToUpload] = useState({ preview: "" });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "images/*",
    onDrop: (acceptedFiles) => {
      setImageToUpload(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
          new: true,
        })
      );
    },
  });

  const uploadImage = async (e) => {
    setImageToUpload(
      Object.assign(e.target.files[0], {
        preview: URL.createObjectURL(e.target.files[0]),
        new: true,
      })
    );
  };

  function hideNavBar() {
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
        <Popup>
          <div className="popup-current-position">
            <h1
              style={{
                color: "#74c0fc",
                fontSize: "1.2rem",
                fontWeight: 500,
              }}
            >
              Club Location
            </h1>
          </div>
        </Popup>
      </Marker>
    );
  }

  async function getClubInfos(token) {
    var rawResponse = await fetch(`/clubs/infos/${token}`);
    var response = await rawResponse.json();
    if (response.status === "success") {
      setClubInfos(response.data.infos);
      setPosition({
        lat: response.data.infos.latitude,
        lng: response.data.infos.longitude,
      });
      if (response.data.infos?.image)
        setImageToUpload({
          preview: response.data.infos?.image,
        });
    }
  }

  async function handleConfirm(token) {
    if (
      newPhone.length === 0 ||
      newPhone.match(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      )
    ) {
      let file;
      if (imageToUpload?.new) {
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

      var rawResponse = await fetch(`/clubs/infos/${token}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: newAddress.length > 0 ? newAddress : clubInfos.adress,
          phone: newPhone.length > 0 ? newPhone : clubInfos.phone,
          price: newPrice.length > 0 ? newPrice : clubInfos.price,
          email: newEmail.length > 0 ? newEmail : clubInfos.email,
          clubname: newName.length > 0 ? newName : clubInfos.name,
          latitude: position.lat,
          longitude: position.lng,
          image: imageToUpload?.new ? file.secure_url : imageToUpload?.preview,
        }),
      });
      var response = await rawResponse.json();

      if (response.status === "success") {
        await getClubInfos(token);
        if (
          newName.length > 0 ||
          imageToUpload?.new ||
          imageToUpload?.preview === ""
        ) {
          if (newName.length > 0)
            localStorage.setItem("username", JSON.stringify(newName));
          if (imageToUpload?.new)
            localStorage.setItem("image", JSON.stringify(file.secure_url));
          else if (imageToUpload?.preview === "")
            localStorage.setItem("image", JSON.stringify(""));
          setRefreshUser(!refreshUser);
        }
        setNewAddress("");
        setNewPhone("");
        setNewPrice("");
        setNewEmail("");
        setNewName("");
        setEmailError("");
      }

      if (response.status === "fail") {
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
    } else setPhoneError("Please provide a valid phone number");
  }

  function handleCancel() {
    setNewAddress("");
    setNewPhone("");
    setNewPrice("");
    setNewEmail("");
    setNewName("");
    setPosition({ lat: clubInfos.latitude, lng: clubInfos.longitude });
    if (clubInfos?.image)
      setImageToUpload({
        preview: clubInfos?.image,
      });
    else setImageToUpload({ preview: "" });
  }

  useEffect(() => {
    const storage1 = localStorage.getItem("type");
    if (JSON.parse(storage1) !== "club") setType(false);
    const storage = localStorage.getItem("token");
    if (storage) {
      setToken(JSON.parse(storage));
      getClubInfos(JSON.parse(storage));
    } else {
      setToken(false);
    }
  }, []);

  if (token === false || type === false) {
    return <Redirect to="/club/signin" />;
  } else {
    return (
      <div>
        <NavbarClub refreshUser={refreshUser} />
        <div
          className=" profile-section profile-section-club margin-top"
          onClick={() => hideNavBar()}
        >
          <div className="reservation-main-title-section club-profile-title">
            <h1 className="calendar-consultation-title">Club Informations</h1>
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
                    placeholder={clubInfos.address}
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
                    placeholder={clubInfos.phone}
                  />
                  <p className="error-message">{phoneError}</p>
                </div>
                <div className="input-div">
                  <label>Price (???/h)</label>
                  <input
                    type="number"
                    id="infos-input"
                    name="lastname"
                    min={0}
                    value={newPrice}
                    onChange={(e) => {
                      if (e.target.value < 0) e.target.value = 0;
                      setNewPrice(e.target.value);
                    }}
                    placeholder={clubInfos.price}
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
                    placeholder={clubInfos.clubname}
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
                    placeholder={clubInfos.email}
                  />
                  <p className="error-message">{emailError}</p>
                </div>
              </form>
              <div className="map-input-section">
                <p className="map-text">Set your location on the map:</p>{" "}
                <MapContainer
                  className="map-container-sign-up"
                  center={mapPosition}
                  zoom={6}
                  // onClick={(e) => console.log(e)}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  ></TileLayer>
                  <LocationMarker />
                  {/* {generatePopups(allClubs)} */}
                  {/* {renderCurrentPosition(mapPosition)} */}
                </MapContainer>
                {/* <p className="map-error">{locationError}</p> */}
              </div>
            </div>
          </div>

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
              {imageToUpload.preview === "" ? (
                <h3>No Image</h3>
              ) : (
                <img
                  src={imageToUpload.preview}
                  style={{ width: "300px" }}
                  alt=""
                />
              )}
              <button
                className={
                  imageToUpload.preview === ""
                    ? "delete-picture-btn remove"
                    : "delete-picture-btn"
                }
                onClick={() => setImageToUpload({ preview: "" })}
              >
                <FontAwesomeIcon className="x-icon" icon={faCircleXmark} />
              </button>
            </div>
          </div>

          <div className="reservation-buttons club-profile-btns">
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
