import React, { useState, useEffect } from "react";
import NavbarMainPage from "../components/NavbarMainPage";
import FooterPage from "../components/Footer";
import "../stylesheets/profile.css";
import "../stylesheets/general.css";
import { Redirect } from "react-router-dom";
import { useDropzone } from "react-dropzone";

function Profile(props) {
  const [personnalInfos, setPersonnalInfos] = useState("");
  const [newFirstname, setNewFirstname] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [token, setToken] = useState("");
  const [type, setType] = useState("");

  const [refreshUser, setRefreshUser] = useState(false);

  const [imageToUpload, setImageToUpload] = useState("");

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

  function hideNavbar() {
    const navbar = document.querySelector(".navbarRight");
    const menuIcon = document.querySelector(".mobile-nav-menu-icon");
    const crossIcon = document.querySelector(".mobile-nav-cross-icon");
    navbar.classList.remove("nav-open");
    menuIcon.classList.remove("remove");
    crossIcon.classList.add("remove");
  }

  async function getPersonnalInfos(token) {
    var rawResponse = await fetch(`/users/infos/${token}`);
    var response = await rawResponse.json();
    console.log(response);
    if (response.status === "success") setPersonnalInfos(response.data.infos);
    if (response.data.infos?.image)
      setImageToUpload({
        preview: response.data.infos?.image,
      });
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
          image: imageToUpload?.new ? file.secure_url : imageToUpload?.preview,
        }),
      });
      var response = await rawResponse.json();
      console.log(response);

      setPhoneError("");
      if (response.status === "success") {
        await getPersonnalInfos(token);
        if (newFirstname.length > 0 || imageToUpload?.new) {
          if (newFirstname.length > 0)
            localStorage.setItem("username", JSON.stringify(newFirstname));
          if (imageToUpload?.new)
            localStorage.setItem("image", JSON.stringify(file.secure_url));
          setRefreshUser(!refreshUser);
        }

        setEmailError("");
        setNewFirstname("");
        setNewLastname("");
        setNewPhone("");
        setNewEmail("");
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
    setNewFirstname("");
    setNewLastname("");
    setNewPhone("");
    setNewEmail("");
    if (personnalInfos?.image)
      setImageToUpload({
        preview: personnalInfos?.image,
      });
    else setImageToUpload("");
  }

  useEffect(() => {
    const storage1 = localStorage.getItem("type");
    if (JSON.parse(storage1) !== "player") setType(false);
    const storage = localStorage.getItem("token");
    if (storage) {
      setToken(JSON.parse(storage));
      getPersonnalInfos(JSON.parse(storage));
    } else setToken(false);
  }, []);

  if (token === false || type === false) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <div>
        <NavbarMainPage refreshUser={refreshUser} />
        <div className=" profile-section" onClick={() => hideNavbar()}>
          <div className="reservation-main-title-section">
            <h1 className="overview-main-title">Personnal Informations</h1>
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
                  <p className="error-message">{phoneError}</p>
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

          <div className=" container reservation-buttons profile-btns">
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

export default Profile;
