import React from "react";
import "../stylesheets/navbar.css";
import "../stylesheets/general.css";
import { Link } from "react-router-dom";
import FooterPage from "../components/Footer";
import NavbarClub from "../components/NavbarClub";

function EditCalendar() {
  return (
    <div>
      <NavbarClub />
      <div className="container center-sign margin-top calendar-section">
        <div className="center-title calendar-title">
          <div className="sign-up-title">
            <p>Edit Mode</p>
          </div>
        </div>
        <div className="calendar-input">
          <form className="when-input-style">
            <input
              type="date"
              id="date-input"
              name="date"
              // value={inputDate}
              // min={getDateInNiceFormat(new Date(Date.now()))}
              placeholder="dd-mm-yyyy"
              data-date=""
              // onChange={(e) => updateInputDate(e.target.value)}
              data-date-format="DD MMMM YYYY"
            />
          </form>
        </div>
        <div className="calendar-edit">
          <h4>Enter the number of courts available</h4>
          <div className="calendar-grid calendar-edit-grid">
            <div>
              <h6>8h-9h</h6>
            </div>
            <div className="form-div">
              <form className="when-input-style">
                <input
                  type="number"
                  id="num-input"
                  name="number"
                  min={0}
                  // value={inputDate}
                  // min={getDateInNiceFormat(new Date(Date.now()))}
                  placeholder="0"
                  // onChange={(e) => updateInputDate(e.target.value)}
                />
              </form>
            </div>
            <div>
              <h6>courts</h6>
            </div>
            <div>
              <h6>8h-9h</h6>
            </div>
            <div>
              <form className="when-input-style">
                <input
                  type="number"
                  id="num-input"
                  name="number"
                  min={0}
                  // value={inputDate}
                  // min={getDateInNiceFormat(new Date(Date.now()))}
                  placeholder="0"
                  // onChange={(e) => updateInputDate(e.target.value)}
                />
              </form>
            </div>
            <div>
              <h6>courts</h6>
            </div>
            <div>
              <h6>8h-9h</h6>
            </div>
            <div>
              <form className="when-input-style">
                <input
                  type="number"
                  id="num-input"
                  name="number"
                  min={0}
                  // value={inputDate}
                  // min={getDateInNiceFormat(new Date(Date.now()))}
                  placeholder="0"
                  // onChange={(e) => updateInputDate(e.target.value)}
                />
              </form>
            </div>
            <div>
              <h6>courts</h6>
            </div>
            <div>
              <h6>8h-9h</h6>
            </div>
            <div>
              <form className="when-input-style">
                <input
                  type="number"
                  id="num-input"
                  name="number"
                  min={0}
                  // value={inputDate}
                  // min={getDateInNiceFormat(new Date(Date.now()))}
                  placeholder="0"
                  // onChange={(e) => updateInputDate(e.target.value)}
                />
              </form>
            </div>
            <div>
              <h6>courts</h6>
            </div>
            <div>
              <h6>8h-9h</h6>
            </div>
            <div>
              <form className="when-input-style">
                <input
                  type="number"
                  id="num-input"
                  name="number"
                  min={0}
                  // value={inputDate}
                  // min={getDateInNiceFormat(new Date(Date.now()))}
                  placeholder="0"
                  // onChange={(e) => updateInputDate(e.target.value)}
                />
              </form>
            </div>
            <div>
              <h6>courts</h6>
            </div>
            <div>
              <h6>8h-9h</h6>
            </div>
            <div>
              <form className="when-input-style">
                <input
                  type="number"
                  id="num-input"
                  name="number"
                  min={0}
                  // value={inputDate}
                  // min={getDateInNiceFormat(new Date(Date.now()))}
                  placeholder="0"
                  // onChange={(e) => updateInputDate(e.target.value)}
                />
              </form>
            </div>
            <div>
              <h6>courts</h6>
            </div>
          </div>
        </div>
        <div className="edit-btn-section">
          <button className="sign-in-sumbit-button edit-btn2"> Cancel</button>
          <button className="sign-in-sumbit-button edit-btn2"> Confirm</button>
        </div>
      </div>
      <FooterPage />
    </div>
  );
}

export default EditCalendar;
